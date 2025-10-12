import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mehrabacademy.com';
  const currentDate = new Date(); // Use current server time
  
  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/joinnow`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quranapp`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]
}