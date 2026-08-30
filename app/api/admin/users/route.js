import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, verifyAdminToken, logActivity, Admin } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    return NextResponse.json(admins);
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

    const { username, email, password, role, permissions } = await request.json();
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password || 'default123', 10);
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Editor',
      permissions: permissions || ['apks'],
    });

    await logActivity('Admin', `Created new admin user: ${username}`, `Role: ${role}`);
    return NextResponse.json({ message: 'Admin user created successfully', admin: newAdmin }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
