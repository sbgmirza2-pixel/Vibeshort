export default function robots() {
  const baseUrl = 'https://vibeshortapk.com'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // API routes crawl na hon
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}