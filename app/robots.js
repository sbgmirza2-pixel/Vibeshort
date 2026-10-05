export default function robots() {
  const baseUrl = 'http://vibeshortapk.com'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // API routes crawl na hon
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}