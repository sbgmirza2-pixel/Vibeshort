import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in the environment variables.');
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });
};

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Super Admin' },
  permissions: { type: [String], default: ['all'] },
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
}, { timestamps: true });

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mediaType: {
    type: String,
    enum: ['icon', 'featured', 'screenshot', 'general'],
    default: 'general',
  },
  fileSize: { type: String },
}, { timestamps: true });

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
  schemaMarkup: String,
}, { timestamps: true });

const activityLogSchema = new mongoose.Schema({
  adminName: String,
  action: String,
  details: String,
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
export const Apk = mongoose.models.Apk || mongoose.model('Apk', apkSchema);
export const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);

export async function logActivity(adminName, action, details = '') {
  try {
    await ActivityLog.create({
      adminName,
      action,
      details,
      timestamp: new Date(),
    });
  } catch (error) {
    console.log('Error logging activity:', error.message);
  }
}

export async function verifyAdminToken(request) {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('adminToken')?.value;
  const authHeader = request.headers.get('authorization');
  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function ensureUploadDirectory() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
}

export function saveBlobFile(file, folder = 'uploads') {
  const uploadDir = path.join(process.cwd(), 'public', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const safeName = (file.name || 'upload').replace(/\s+/g, '-');
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
  const filePath = path.join(uploadDir, uniqueName);
  const buffer = Buffer.from(file.arrayBuffer ? file.arrayBuffer() : file.buffer);

  return new Promise((resolve, reject) => {
    Promise.resolve(buffer)
      .then((data) => {
        fs.writeFile(filePath, data, (err) => {
          if (err) reject(err);
          else resolve(`/uploads/${uniqueName}`);
        });
      })
      .catch(reject);
  });
}

export async function saveUploadedBlob(file, folder = 'uploads') {
  const arrayBuffer = await file.arrayBuffer();
  const uploadDir = path.join(process.cwd(), 'public', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const safeName = (file.name || 'upload').replace(/\s+/g, '-');
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
  const filePath = path.join(uploadDir, uniqueName);

  await fs.promises.writeFile(filePath, Buffer.from(arrayBuffer));
  return `/${folder}/${uniqueName}`;
}

export { connectDB, JWT_SECRET };
