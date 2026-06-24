// Baixa imagens da API Pexels e converte pra webp 1200w em assets/img/blog/
// Uso: node getimg.js
// Cada item: { out, query } -> pega 1ª foto landscape do Pexels.
const fs = require('fs');
const https = require('https');
const sharp = require('sharp');

const KEY = process.env.PEXELS_KEY; // export PEXELS_KEY=... antes de rodar (não commitar a chave)
if (!KEY) { console.error('Defina PEXELS_KEY no ambiente: PEXELS_KEY=xxxx node getimg.js'); process.exit(1); }
const OUT_DIR = 'assets/img/blog';
fs.mkdirSync(OUT_DIR, { recursive: true });

// Adicione novas cidades aqui conforme criar páginas locais.
const wants = [
  { out: 'local-vila-velha.webp', query: 'brazilian street food delivery restaurant' },
  { out: 'local-vila-velha-2.webp', query: 'food delivery motorcycle courier city' },
  { out: 'local-serra.webp', query: 'hamburger restaurant kitchen delivery' },
  { out: 'local-vitoria.webp', query: 'pizza restaurant counter delivery brazil' },
  { out: 'local-cariacica.webp', query: 'fast food kitchen cook delivery' },
  { out: 'local-viana.webp', query: 'food delivery bag scooter city' },
  { out: 'local-guarapari.webp', query: 'acai bowl smoothie shop counter' },
];

function getJSON(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { Authorization: KEY } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    }).on('error', rej);
  });
}
function download(url) {
  return new Promise((res, rej) => {
    https.get(url, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}

(async () => {
  for (const w of wants) {
    const dest = OUT_DIR + '/' + w.out;
    if (fs.existsSync(dest)) { console.log('skip (existe) ' + dest); continue; }
    const api = `https://api.pexels.com/v1/search?query=${encodeURIComponent(w.query)}&per_page=1&orientation=landscape`;
    const j = await getJSON(api);
    if (!j.photos || !j.photos.length) { console.log('SEM RESULTADO: ' + w.query); continue; }
    const src = j.photos[0].src.large2x || j.photos[0].src.original;
    const buf = await download(src);
    await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
    console.log(`ok ${w.out}  (${j.photos[0].photographer}) ${(fs.statSync(dest).size/1024).toFixed(0)}KB`);
  }
})();
