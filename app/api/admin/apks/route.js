import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Apk } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const apks = await Apk.find().sort({ createdAt: -1 });
    return NextResponse.json(apks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const body = await request.json();
    const newApk = await Apk.create(body);
    await logActivity('Admin', `Added new APK: ${newApk.name} v${newApk.version}`, `Package: ${newApk.packageName}`);
    return NextResponse.json({ message: 'APK added successfully', newApk }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
