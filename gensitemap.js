// Gerador do sitemap.xml — varre os HTML da raiz e do blog/.
// Uso: node gensitemap.js   (rodar SEMPRE depois de genlocal.js / gennicho.js / genblog.js)
// Prioridade sai do tipo da página; lastmod sai da data de modificação do arquivo.
const fs = require('fs');
const path = require('path');
const SITE = 'https://menuzia.com.br';

const ymd = (d) => new Date(d).toISOString().slice(0, 10);

// lista recursiva de .html
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = [
  ...fs.readdirSync('.').filter(f => f.endsWith('.html')),
  ...walk('blog'),
].map(f => f.split(path.sep).join('/'));

function meta(file) {
  const html = fs.readFileSync(file, 'utf8');
  const isCity = html.includes('"@type": "LocalBusiness"');
  const isPost = file.startsWith('blog/') && file !== 'blog/index.html';
  const img = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  const loc = file === 'index.html' ? `${SITE}/` : `${SITE}/${file}`;

  let priority = 0.7, changefreq = 'monthly';
  if (file === 'index.html') { priority = 1.0; changefreq = 'weekly'; }
  else if (file === 'cardapio-digital-barato.html') { priority = 0.9; changefreq = 'weekly'; }
  else if (file === 'cidades.html') { priority = 0.9; changefreq = 'weekly'; }
  else if (file === 'blog/index.html') { priority = 0.8; changefreq = 'weekly'; }
  else if (file === 'politica-de-privacidade.html') { priority = 0.3; changefreq = 'yearly'; }
  else if (isCity) { priority = 0.9; }
  else if (!isPost && !file.startsWith('blog/')) { priority = 0.85; }  // landings de keyword
  else { priority = 0.7; }

  return { loc, priority, changefreq, img, lastmod: ymd(fs.statSync(file).mtime) };
}

const urls = files.map(meta).sort((a, b) => b.priority - a.priority || a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${u.img ? `
    <image:image><image:loc>${u.img}</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('sitemap.xml', xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
