import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import { connectDB, JWT_SECRET, Admin, Apk, Category, Media, ActivityLog } from '@/lib/admin-utils';

export const metadata = {
  title: 'Admin Dashboard — VibeShort',
  description: 'VibeShort admin panel for managing APKs, categories, media, and users.',
  robots: 'noindex, nofollow',
};

// Force dynamic so cookies() is always evaluated per-request
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // ── 1. Read cookie and verify JWT server-side ──────────────────────────────
  const cookieStore = await cookies();
  const token = cookieStore.get('adminToken')?.value;

  if (!token) {
    redirect('/admin');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect('/admin');
  }

  // ── 2. Fetch all dashboard data in parallel directly from DB ───────────────
  try {
    await connectDB();
  } catch {
    redirect('/admin');
  }

  const [
    apks,
    categories,
    mediaList,
    adminUsers,
    activityLogs,
    statsRaw,
  ] = await Promise.all([
    Apk.find().sort({ createdAt: -1 }).lean(),
    Category.find().sort({ createdAt: -1 }).lean(),
    Media.find().sort({ createdAt: -1 }).lean(),
    Admin.find().select('-password').sort({ createdAt: -1 }).lean(),
    ActivityLog.find().sort({ createdAt: -1 }).limit(50).lean(),
    Promise.all([
      Apk.countDocuments(),
      Apk.countDocuments({ status: 'published' }),
      Apk.countDocuments({ status: 'draft' }),
      Category.countDocuments(),
      Media.countDocuments(),
      Admin.countDocuments(),
      Apk.aggregate([{ $group: { _id: null, total: { $sum: '$downloadCount' } } }]),
    ]),
  ]);

  const [
    totalApks,
    publishedApks,
    draftApks,
    totalCategories,
    totalMedia,
    totalAdmins,
    downloadsResult,
  ] = statsRaw;

  const stats = {
    totalApks,
    publishedApks,
    draftApks,
    totalCategories,
    totalMedia,
    totalAdmins,
    totalDownloads: downloadsResult.length > 0 ? downloadsResult[0].total : 0,
  };

  // ── 3. Serialize Mongoose documents for client props (remove _id, dates etc) ─
  const serialise = (docs) =>
    JSON.parse(JSON.stringify(docs));

  const initialData = {
    stats,
    apks: serialise(apks),
    categories: serialise(categories),
    mediaList: serialise(mediaList),
    adminUsers: serialise(adminUsers),
    activityLogs: serialise(activityLogs),
  };

  // ── 4. Render the interactive client shell with pre-loaded data ─────────────
  return <AdminDashboardClient initialData={initialData} />;
}