import { blogsData } from '@/data/blogs';

export default async function sitemap() {
  const baseUrl = 'http://vibeshortapk.com/'; 
  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/about-us',
    '/contact-us',
    '/disclaimer',
    '/terms-and-conditions',
    '/faqs',
    '/download',
  '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Blog pages
  const blogPages = blogsData.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}