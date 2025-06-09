
import { useEffect } from 'react';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const generateSitemap = (urls: SitemapURL[]): string => {
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;
};

export const useSitemapGeneration = () => {
  useEffect(() => {
    const generateAndServeSitemap = async () => {
      try {
        // Fetch dynamic retreat data
        const { fetchSanghosRetreats } = await import('@/lib/data');
        const retreats = await fetchSanghosRetreats();
        
        const baseUrl = 'https://sanghos.com';
        const currentDate = new Date().toISOString().split('T')[0];
        
        const staticUrls: SitemapURL[] = [
          {
            loc: baseUrl,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 1.0
          },
          {
            loc: `${baseUrl}/retreats`,
            lastmod: currentDate,
            changefreq: 'daily',
            priority: 0.9
          },
          {
            loc: `${baseUrl}/about`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.8
          },
          {
            loc: `${baseUrl}/instructors`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.7
          },
          {
            loc: `${baseUrl}/community`,
            lastmod: currentDate,
            changefreq: 'daily',
            priority: 0.8
          },
          {
            loc: `${baseUrl}/community-teaser`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.6
          },
          {
            loc: `${baseUrl}/contact`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.5
          },
          {
            loc: `${baseUrl}/login`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.3
          },
          {
            loc: `${baseUrl}/signup`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.3
          }
        ];

        // Add dynamic retreat URLs
        const retreatUrls: SitemapURL[] = retreats.map(retreat => ({
          loc: `${baseUrl}/retreat/${retreat.id}`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: 0.8
        }));

        // Add instructor URLs (if we have instructor data)
        const instructorUrls: SitemapURL[] = retreats
          .map(retreat => retreat.instructor)
          .filter((instructor, index, self) => 
            index === self.findIndex(i => i.id === instructor.id)
          )
          .map(instructor => ({
            loc: `${baseUrl}/instructor/${instructor.id}`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.6
          }));

        const allUrls = [...staticUrls, ...retreatUrls, ...instructorUrls];
        const sitemapXML = generateSitemap(allUrls);
        
        // Store sitemap for serving (in a real app, this would be saved to public/sitemap.xml)
        console.log('Generated sitemap with', allUrls.length, 'URLs');
        
        // In production, you would save this to public/sitemap.xml
        // For now, we'll just log it
        if (process.env.NODE_ENV === 'development') {
          console.log('Sitemap XML:', sitemapXML);
        }
        
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateAndServeSitemap();
  }, []);
};

export default useSitemapGeneration;
