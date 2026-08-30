import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, ActivityLog } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
