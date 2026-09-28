export default function robots() {
  const baseUrl = 'https://vibeshort.com'; // Apna domain yahan update kar lein

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // API routes crawl na hon
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}