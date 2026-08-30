import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, Admin, Category, Media, Apk } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const totalApks = await Apk.countDocuments();
    const publishedApks = await Apk.countDocuments({ status: 'published' });
    const draftApks = await Apk.countDocuments({ status: 'draft' });
    const totalCategories = await Category.countDocuments();
    const totalMedia = await Media.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    const totalDownloadsResult = await Apk.aggregate([
      { $group: { _id: null, total: { $sum: '$downloadCount' } } },
    ]);
    const totalDownloads = totalDownloadsResult.length > 0 ? totalDownloadsResult[0].total : 0;

    return NextResponse.json({
      totalApks,
      publishedApks,
      draftApks,
      totalCategories,
      totalMedia,
      totalAdmins,
      totalDownloads,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
