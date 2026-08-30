import { NextResponse } from 'next/server';
import { connectDB, verifyAdminToken, logActivity, Media, saveUploadedBlob } from '@/lib/admin-utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const decoded = await verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Access Denied. No token provided.' }, { status: 401 });
    }

    const mediaFiles = await Media.find().sort({ createdAt: -1 });
    return NextResponse.json(mediaFiles);
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

    const formData = await request.formData();
    const files = formData.getAll('images').filter(Boolean);
    const mediaType = formData.get('mediaType') || 'general';

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const savedMediaList = [];
    for (const file of files) {
      const url = await saveUploadedBlob(file, 'uploads');
      const newMedia = await Media.create({
        filename: file.name,
        url,
        mediaType,
        fileSize: `${((file.size || 0) / (1024 * 1024)).toFixed(2)} MB`,
      });
      savedMediaList.push(newMedia);
    }

    await logActivity('Admin', `Uploaded ${savedMediaList.length} media file(s)`, `Type: ${mediaType}`);
    return NextResponse.json({ message: 'Media uploaded successfully', media: savedMediaList }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
