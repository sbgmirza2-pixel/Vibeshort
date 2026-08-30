import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, verifyAdminToken, logActivity, Admin } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const id = params.id;
    const { username, email, role, permissions, password } = await request.json();
    const updateData = { username, email, role, permissions };

    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await Admin.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!updated) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    await logActivity('Admin', `Updated admin user: ${username}`, `Role: ${role}`);
    return NextResponse.json({ message: 'Admin updated successfully', admin: updated });
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

    const deleted = await Admin.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    await logActivity('Admin', `Deleted admin user: ${deleted.username}`, `Email: ${deleted.email}`);
    return NextResponse.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
