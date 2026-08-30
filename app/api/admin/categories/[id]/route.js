import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Category } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const { name, slug, description } = await request.json();
    const updated = await Category.findByIdAndUpdate(params.id, { name, slug, description }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    await logActivity('Admin', `Updated category: ${updated.name}`, `Slug: ${slug}`);
    return NextResponse.json({ message: 'Category updated successfully', category: updated });
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

    const deleted = await Category.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    await logActivity('Admin', `Deleted category: ${deleted.name}`, `Slug: ${deleted.slug}`);
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
