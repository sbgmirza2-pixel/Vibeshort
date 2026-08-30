import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB, logActivity, Admin, JWT_SECRET } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    let admin = await Admin.findOne({ email });
    if (!admin && email === 'stylishinsights@gmail.com') {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await Admin.create({
        username: 'Saleha Admin',
        email,
        password: hashedPassword,
        role: 'Super Admin',
        permissions: ['all'],
      });
    }

    if (!admin) {
      return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 400 });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role, permissions: admin.permissions }, JWT_SECRET, { expiresIn: '1d' });
    await logActivity(admin.username, 'Admin Logged In', `Email: ${email}`);

    const response = NextResponse.json({
      message: 'Login Successful',
      token,
      admin: { name: admin.username, role: admin.role, permissions: admin.permissions },
    });

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
