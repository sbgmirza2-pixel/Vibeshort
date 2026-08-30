import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Category } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
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

    const { name, slug, description } = await request.json();
    const newCategory = await Category.create({ name, slug, description });
    await logActivity('Admin', `Added new category: ${newCategory.name}`, `Slug: ${slug}`);
    return NextResponse.json({ message: 'Category added successfully', category: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
