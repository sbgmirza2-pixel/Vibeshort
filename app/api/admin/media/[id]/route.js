import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Media, saveUploadedBlob } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const mediaItem = await Media.findById(params.id);
    if (!mediaItem) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('image');
    if (!file) {
      return NextResponse.json({ error: 'No replacement file provided' }, { status: 400 });
    }

    const oldFilename = mediaItem.url.split('/').pop();
    const oldPath = path.join(process.cwd(), 'public', 'uploads', oldFilename);
    if (oldFilename && fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    const newUrl = await saveUploadedBlob(file, 'uploads');
    mediaItem.filename = file.name;
    mediaItem.url = newUrl;
    mediaItem.fileSize = `${((file.size || 0) / (1024 * 1024)).toFixed(2)} MB`;
    await mediaItem.save();

    await logActivity('Admin', `Replaced media file: ${mediaItem.filename}`, `ID: ${params.id}`);
    return NextResponse.json({ message: 'Media replaced successfully', media: mediaItem });
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

    const mediaItem = await Media.findById(params.id);
    if (!mediaItem) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    const filename = mediaItem.url.split('/').pop();
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
    if (filename && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(params.id);
    await logActivity('Admin', `Deleted media file: ${mediaItem.filename}`, `ID: ${params.id}`);
    return NextResponse.json({ message: 'Media deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
