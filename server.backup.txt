import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dns from 'dns';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables securely from .env file
dotenv.config();

// Fix DNS lookup for restricted networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.log('DNS config warning:', err.message);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Serve uploads folder statically so images can be accessed via URL
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Secure Environment Variables with Fallback Safety Check
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('Security Error: MONGO_URI is missing in .env file!');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('DB Error:', err.message));

// --- Database Schemas ---
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Super Admin' },
  permissions: { type: [String], default: ['all'] } // e.g., ['apks', 'media', 'categories', 'users']
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

// Media Schema
const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mediaType: { 
    type: String, 
    enum: ['icon', 'featured', 'screenshot', 'general'], 
    default: 'general' 
  },
  fileSize: { type: String },
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

const apkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  version: { type: String, required: true },
  packageName: { type: String, required: true },
  developer: { type: String, default: 'VibeShort Inc.' },
  category: { type: String, default: 'General' },
  apkSize: { type: String, default: '50 MB' },
  androidRequirement: { type: String, default: 'Android 5.0+' },
  appIcon: { type: String, default: '' },
  featuredImage: { type: String, default: '' },
  screenshots: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  features: { type: String, default: '' },
  whatsNew: { type: String, default: '' },
  downloadUrl: { type: String, required: true },
  mirrorDownloadUrl: { type: String, default: '' },
  officialWebsite: { type: String, default: '' },
  lastUpdated: { type: String, default: '' },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  downloadCount: { type: Number, default: 0 },
  seoTitle: String,
  metaDescription: String,
  focusKeyword: String,
  canonicalUrl: String,
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  robotsSettings: { type: String, default: 'index, follow' },
  schemaMarkup: String
}, { timestamps: true });

const Apk = mongoose.model('Apk', apkSchema);

const activityLogSchema = new mongoose.Schema({
  adminName: String,
  action: String,
  details: String,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

// --- Reusable Activity Log Helper Function ---
async function logActivity(adminName, action, details = '') {
  try {
    await ActivityLog.create({
      adminName,
      action,
      details,
      timestamp: new Date()
    });
  } catch (err) {
    console.log('Error logging activity:', err.message);
  }
}

// --- Auth Middleware ---
const verifyToken = (req, res, next) => {
  const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied. No token provided.' });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid Token' });
  }
};

// --- Routes ---

// 1. Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Seed main admin if missing
    let admin = await Admin.findOne({ email });
    if (!admin && email === 'stylishinsights@gmail.com') {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await Admin.create({ 
        username: 'Saleha Admin', 
        email, 
        password: hashedPassword, 
        role: 'Super Admin', 
        permissions: ['all'] 
      });
    }

    if (!admin) return res.status(400).json({ error: 'Invalid Email or Password' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid Email or Password' });

    const token = jwt.sign({ id: admin._id, role: admin.role, permissions: admin.permissions }, JWT_SECRET, { expiresIn: '1d' });

    await logActivity(admin.username, 'Admin Logged In', `Email: ${email}`);

    res.cookie('adminToken', token, { httpOnly: true }).json({
      message: 'Login Successful',
      token,
      admin: { name: admin.username, role: admin.role, permissions: admin.permissions }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Dashboard Stats Route (Protected)
app.get('/api/admin/dashboard-stats', verifyToken, async (req, res, next) => {
  try {
    const totalApks = await Apk.countDocuments();
    const publishedApks = await Apk.countDocuments({ status: 'published' });
    const draftApks = await Apk.countDocuments({ status: 'draft' });
    const totalCategories = await Category.countDocuments();
    const totalMedia = await Media.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    const totalDownloadsResult = await Apk.aggregate([
      { $group: { _id: null, total: { $sum: '$downloadCount' } } }
    ]);
    const totalDownloads = totalDownloadsResult.length > 0 ? totalDownloadsResult[0].total : 0;

    res.json({
      totalApks,
      publishedApks,
      draftApks,
      totalCategories,
      totalMedia,
      totalAdmins,
      totalDownloads
    });
  } catch (err) {
    next(err);
  }
});

// --- Admin Users Management Routes ---
app.get('/api/admin/users', verifyToken, async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/users/add', verifyToken, async (req, res, next) => {
  try {
    const { username, email, password, role, permissions } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Admin with this email already exists' });

    const hashedPassword = await bcrypt.hash(password || 'default123', 10);
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Editor',
      permissions: permissions || ['apks']
    });

    await logActivity('Admin', `Created new admin user: ${username}`, `Role: ${role}`);
    res.status(201).json({ message: 'Admin user created successfully', admin: newAdmin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/admin/users/edit/:id', verifyToken, async (req, res, next) => {
  try {
    const { username, email, role, permissions, password } = req.body;
    const updateData = { username, email, role, permissions };
    
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ error: 'Admin user not found' });

    await logActivity('Admin', `Updated admin user: ${username}`, `Role: ${role}`);
    res.json({ message: 'Admin updated successfully', admin: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/admin/users/delete/:id', verifyToken, async (req, res, next) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Admin user not found' });

    await logActivity('Admin', `Deleted admin user: ${deleted.username}`, `Email: ${deleted.email}`);
    res.json({ message: 'Admin user deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// --- Activity Logs Fetch Route ---
app.get('/api/admin/activity-logs', verifyToken, async (req, res, next) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

// --- Categories Management Routes ---
app.get('/api/admin/categories', verifyToken, async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/category/add', verifyToken, async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    const newCategory = await Category.create({ name, slug, description });
    await logActivity('Admin', `Added new category: ${newCategory.name}`, `Slug: ${slug}`);
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to add category' });
  }
});

app.put('/api/admin/category/edit/:id', verifyToken, async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    const updated = await Category.findByIdAndUpdate(req.params.id, { name, slug, description }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    await logActivity('Admin', `Updated category: ${updated.name}`, `Slug: ${slug}`);
    res.json({ message: 'Category updated successfully', category: updated });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to update category' });
  }
});

app.delete('/api/admin/category/delete/:id', verifyToken, async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    await logActivity('Admin', `Deleted category: ${deleted.name}`, `Slug: ${deleted.slug}`);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// --- Media Management Routes ---
app.get('/api/admin/media', verifyToken, async (req, res, next) => {
  try {
    const mediaFiles = await Media.find().sort({ createdAt: -1 });
    res.json(mediaFiles);
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/media/upload', verifyToken, upload.array('images'), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
    const mediaType = req.body.mediaType || 'general';
    const savedMediaList = [];

    for (const file of req.files) {
      const fileUrl = `http://localhost:${PORT}/uploads/${file.filename}`;
      const newMedia = await Media.create({
        filename: file.originalname,
        url: fileUrl,
        mediaType: mediaType,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      savedMediaList.push(newMedia);
    }
    await logActivity('Admin', `Uploaded ${savedMediaList.length} media file(s)`, `Type: ${mediaType}`);
    res.status(201).json({ message: 'Media uploaded successfully', media: savedMediaList });
  } catch (err) {
    next(err);
  }
});

app.put('/api/admin/media/replace/:id', verifyToken, upload.single('image'), async (req, res, next) => {
  try {
    const mediaItem = await Media.findById(req.params.id);
    if (!mediaItem) return res.status(404).json({ error: 'Media not found' });
    if (!req.file) return res.status(400).json({ error: 'No replacement file provided' });

    try {
      const oldFilename = mediaItem.url.split('/').pop();
      const oldPath = path.join(uploadDir, oldFilename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    } catch (e) {
      console.log('Error deleting old file:', e.message);
    }

    mediaItem.filename = req.file.originalname;
    mediaItem.url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    mediaItem.fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
    await mediaItem.save();
    await logActivity('Admin', `Replaced media file: ${mediaItem.filename}`, `ID: ${req.params.id}`);
    res.json({ message: 'Media replaced successfully', media: mediaItem });
  } catch (err) {
    next(err);
  }
});

app.delete('/api/admin/media/delete/:id', verifyToken, async (req, res, next) => {
  try {
    const mediaItem = await Media.findById(req.params.id);
    if (!mediaItem) return res.status(404).json({ error: 'Media not found' });

    try {
      const filename = mediaItem.url.split('/').pop();
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (e) {
      console.log('Error deleting file from disk:', e.message);
    }

    await Media.findByIdAndDelete(req.params.id);
    await logActivity('Admin', `Deleted media file: ${mediaItem.filename}`, `ID: ${req.params.id}`);
    res.json({ message: 'Media deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// --- APK Management Routes ---
app.post('/api/admin/apk/add', verifyToken, async (req, res, next) => {
  try {
    const newApk = await Apk.create(req.body);
    await logActivity('Admin', `Added new APK: ${newApk.name} v${newApk.version}`, `Package: ${newApk.packageName}`);
    res.status(201).json({ message: 'APK added successfully', newApk });
  } catch (err) {
    next(err);
  }
});

app.get('/api/admin/apks', verifyToken, async (req, res, next) => {
  try {
    const apks = await Apk.find().sort({ createdAt: -1 });
    res.json(apks);
  } catch (err) {
    next(err);
  }
});

app.put('/api/admin/apk/edit/:id', verifyToken, async (req, res, next) => {
  try {
    const updatedApk = await Apk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApk) return res.status(404).json({ error: 'APK not found' });
    await logActivity('Admin', `Updated APK: ${updatedApk.name} v${updatedApk.version}`, `Slug: ${updatedApk.slug}`);
    res.json({ message: 'APK updated successfully', updatedApk });
  } catch (err) {
    next(err);
  }
});

app.delete('/api/admin/apk/delete/:id', verifyToken, async (req, res, next) => {
  try {
    const deletedApk = await Apk.findByIdAndDelete(req.params.id);
    if (!deletedApk) return res.status(404).json({ error: 'APK not found' });
    await logActivity('Admin', `Deleted APK: ${deletedApk.name}`, `Version: ${deletedApk.version}`);
    res.json({ message: 'APK deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Robots & Sitemap
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://vibeshort.com/sitemap.xml`);
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const apks = await Apk.find({ status: 'published' }).select('slug updatedAt');
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <url>\n    <loc>https://vibeshort.com</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    apks.forEach(apk => {
      xml += `  <url>\n    <loc>https://vibeshort.com/apk/${apk.slug}</loc>\n    <lastmod>${new Date(apk.updatedAt).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    res.type('application/xml').send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});
// --- Global Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error('Server Error Stack:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500 
    ? 'Internal Server Error' 
    : err.message;

  res.status(statusCode).json({ error: message });
});

// --- Server Listener (Ye sabse last mein rahega) ---
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});