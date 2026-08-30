import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Apk } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const body = await request.json();
    const updatedApk = await Apk.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedApk) {
      return NextResponse.json({ error: 'APK not found' }, { status: 404 });
    }

    await logActivity('Admin', `Updated APK: ${updatedApk.name} v${updatedApk.version}`, `Slug: ${updatedApk.slug}`);
    return NextResponse.json({ message: 'APK updated successfully', updatedApk });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const deletedApk = await Apk.findByIdAndDelete(params.id);
    if (!deletedApk) {
      return NextResponse.json({ error: 'APK not found' }, { status: 404 });
    }

    await logActivity('Admin', `Deleted APK: ${deletedApk.name}`, `Version: ${deletedApk.version}`);
    return NextResponse.json({ message: 'APK deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
