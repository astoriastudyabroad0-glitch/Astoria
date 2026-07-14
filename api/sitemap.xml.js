import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { data: posts } = await supabase
    .from('blogs') // update table name if different
    .select('slug, created_at')
    .order('created_at', { ascending: false })

  const staticPages = [
    { url: '/', priority: '1.0' },
    { url: '/about', priority: '0.8' },
    { url: '/services', priority: '0.8' },
    { url: '/countries', priority: '0.8' },
    { url: '/blogs', priority: '0.8' },
    { url: '/contact', priority: '0.7' },
  ]

  const base = 'https://www.astoriaonline.online'

  const staticUrls = staticPages.map(p => `
  <url>
    <loc>${base}${p.url}</loc>
    <priority>${p.priority}</priority>
  </url>`).join('')

  const blogUrls = (posts || []).map(post => `
  <url>
    <loc>${base}/blogs/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=3600')
  res.status(200).send(xml)
}
