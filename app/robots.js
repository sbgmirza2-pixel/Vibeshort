export default function robots() {
  const baseUrl = 'http:/vibeshortapk.com'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}