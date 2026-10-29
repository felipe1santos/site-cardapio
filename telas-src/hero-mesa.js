// Gera 2 peças da hero (PNG transparente → webp em assets/img/hero/), vista frontal reta:
//  - hero-qr: display de acrílico preto com QR (MESA 10) + celular em pé com o cardápio
//  - hero-tablet: tablet na horizontal em suporte de mesa com o cardápio da Bela Marmita
// Uso: node telas-src/hero-mesa.js [nome]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const DIR = __dirname, OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'assets/img/hero');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(IMG, { recursive: true });
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(f => fs.existsSync(f));
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const RAIZ = path.join(DIR, '..');
const FONTES = `<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">`;
const pagina = (corpo, css) => `<!doctype html><html><head><meta charset="utf-8">${FONTES}<style>*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent;overflow:hidden}${css}</style></head><body>${corpo}</body></html>`;
const SIMB_SVG = (fundo, m = '#fff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="${fundo}"/><g transform="translate(50 50) scale(.125) translate(-413 -502)"><circle cx="148" cy="640" r="52" fill="#EE6A2C"/><path d="M262 680 V430 A105 105 0 0 1 472 430 V680 M472 430 A105 105 0 0 1 682 430 V680" fill="none" stroke="${m}" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
const simb = (f, m) => 'data:image/svg+xml;base64,' + Buffer.from(SIMB_SVG(f, m)).toString('base64');

const BELA = b64(path.join(DIR, 'bela-marmita.png'), 'image/png');
const belaTela = (w, h) => { const e = Math.min(h / 961, w / 1600), dx = (w - 1882 * e) / 2; return `<div class="bela" style="width:1882px;height:961px;transform:translateX(${dx}px) scale(${e});transform-origin:0 0">
  <img src="${BELA}" width="1882" height="961">
  <div style="position:absolute;left:436px;top:622px;width:440px;height:34px;background:#F3F4F6;display:flex;align-items:center;gap:8px;font:600 17px Rubik;color:#15803D"><i style="width:10px;height:10px;border-radius:50%;background:#22C55E;display:inline-block"></i>Aberto agora · Entrega em 40–50 min</div>
  <div style="position:absolute;left:1400px;top:772px;width:340px;height:62px;background:#fff;display:flex;flex-direction:column;justify-content:center;font:500 16px Rubik;color:#1F2937;line-height:1.5"><b style="font-weight:600">Informe seu endereço de entrega</b><span style="color:#6B7280;font-size:15.5px">Entrega em 40–50 min · a partir de R$ 5,00</span></div>
</div>`; };
const CEL = b64(path.join(RAIZ, 'assets/img/mockups/cel-home.webp'), 'image/webp');
const QR = b64(path.join(DIR, 'qr-menuzia.svg'), 'image/svg+xml');

const pecas = {};

// ---------- 1. Display QR de acrílico + celular ----------
// display: x 24..424, painel y 150..858, base 852..892 | celular: x 392..688 (296x601), y 291..892
pecas['hero-qr'] = { w: 700, h: 900, html: pagina(`<div class="cena">
  <div class="sombra s1"></div><div class="sombra s2"></div>
  <div class="disp">
    <div class="painel">
      <div class="brilho"></div>
      <div class="marca"><img src="${simb('#0A4D94')}"><span>menuzia</span></div>
      <div class="mesa"><small>MESA</small><b>10</b></div>
      <div class="qr"><img src="${QR}"></div>
      <div class="cta">Escaneie e peça</div>
      <div class="sub">Cardápio digital · direto da mesa</div>
    </div>
    <div class="base"><i></i></div>
  </div>
  <img class="cel" src="${CEL}">
</div>`, `
  .cena{position:absolute;inset:0}
  .sombra{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.42),rgba(0,0,0,0))}
  .s1{left:14px;top:874px;width:420px;height:26px}
  .s2{left:392px;top:876px;width:300px;height:24px}
  .disp{position:absolute;left:24px;top:150px;width:400px;height:742px}
  .painel{position:absolute;left:22px;top:0;width:356px;height:708px;border-radius:18px 18px 4px 4px;overflow:hidden;
    background:linear-gradient(180deg,#1d2027 0%,#0b0c10 45%,#050608 100%);
    box-shadow:inset 0 0 0 2px #3a3e48,inset 0 2px 0 3px rgba(255,255,255,.08),inset 0 -10px 18px rgba(0,0,0,.6);
    display:flex;flex-direction:column;align-items:center;padding-top:38px;font-family:'Plus Jakarta Sans';color:#fff;text-align:center}
  .brilho{position:absolute;left:-120px;top:-60px;width:220px;height:900px;transform:rotate(18deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.07) 45%,rgba(255,255,255,.11) 50%,rgba(255,255,255,0));pointer-events:none}
  .marca{display:flex;align-items:center;gap:10px;font-weight:800;font-size:30px;letter-spacing:-.02em}
  .marca img{width:44px;height:44px;border-radius:10px}
  .mesa{margin-top:30px;display:flex;align-items:baseline;gap:12px}
  .mesa small{font-weight:800;font-size:26px;letter-spacing:.22em;color:#C4B5FD}
  .mesa b{font-weight:800;font-size:76px;line-height:1;letter-spacing:-.03em}
  .qr{margin-top:22px;width:250px;height:250px;background:#fff;border-radius:18px;padding:18px;box-shadow:0 0 0 4px #A855F7}
  .qr img{width:100%;height:100%;display:block}
  .cta{margin-top:30px;font-weight:800;font-size:30px;letter-spacing:-.01em}
  .sub{margin-top:8px;font-family:Inter;font-weight:600;font-size:16px;color:#9CA3AF}
  .base{position:absolute;left:0;top:702px;width:400px;height:40px;border-radius:8px 8px 6px 6px;
    background:linear-gradient(180deg,#4a4e58 0%,#23262d 18%,#111317 60%,#060708 100%);box-shadow:inset 0 0 0 1.5px #3a3e48}
  .base i{position:absolute;left:22px;right:22px;top:0;height:7px;background:linear-gradient(180deg,#000,rgba(0,0,0,0))}
  .cel{position:absolute;left:392px;top:291px;width:296px;height:601px;filter:drop-shadow(-10px 14px 18px rgba(0,0,0,.35))}`) };

// ---------- 2. Tablet na horizontal em suporte ----------
// tablet: x 22..978, y 150..746 | haste: x 466..534, y 700..872 | base: x 320..680, y 860..892
pecas['hero-tablet'] = { w: 1000, h: 900, html: pagina(`<div class="cena">
  <div class="sombra"></div>
  <div class="haste"><i></i></div>
  <div class="base"></div>
  <div class="garra"></div>
  <div class="tablet"><div class="cam"></div><div class="tt">${belaTela(900, 540)}</div></div>
  <div class="lip l"></div><div class="lip r"></div>
</div>`, `
  .cena{position:absolute;inset:0}
  .sombra{position:absolute;left:290px;top:874px;width:420px;height:26px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.45),rgba(0,0,0,0))}
  .haste{position:absolute;left:466px;top:700px;width:68px;height:172px;border-radius:4px;
    background:linear-gradient(90deg,#7d838e 0%,#c9cdd4 28%,#eceef2 48%,#bfc4cc 70%,#737984 100%)}
  .haste i{position:absolute;left:0;right:0;top:46px;height:22px;background:linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,0))}
  .base{position:absolute;left:320px;top:860px;width:360px;height:32px;border-radius:12px 12px 16px 16px;
    background:linear-gradient(180deg,#f4f6f9 0%,#d3d7de 30%,#a3a9b3 72%,#6c727d 100%);box-shadow:inset 0 1px 0 #fff}
  .garra{position:absolute;left:400px;top:700px;width:200px;height:62px;border-radius:0 0 14px 14px;
    background:linear-gradient(180deg,#5d636d,#9aa0aa 40%,#c7cbd2 60%,#8d939d)}
  .tablet{position:absolute;left:22px;top:150px;width:956px;height:596px;border-radius:40px;padding:28px;
    background:linear-gradient(160deg,#2c2f36,#0b0c10 55%,#121419);
    box-shadow:inset 0 0 0 2.5px #474c56,inset 0 0 0 6px #0a0b0e,0 30px 40px -24px rgba(0,0,0,.55)}
  .lip{position:absolute;top:722px;width:46px;height:36px;border-radius:0 0 10px 10px;background:linear-gradient(180deg,#6b717b,#b6bbc3 55%,#7f858f);box-shadow:0 4px 8px -4px rgba(0,0,0,.5)}
  .lip.l{left:300px}.lip.r{left:654px}
  .cam{position:absolute;left:50%;top:11px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#1c2436;box-shadow:0 0 0 2px #050608}
  .tt{width:900px;height:540px;border-radius:10px;overflow:hidden;background:#F3F4F6}
  .bela{position:relative}.bela img{display:block}`) };

(async () => {
  const so = process.argv[2];
  for (const [nome, t] of Object.entries(pecas)) {
    if (so && so !== nome) continue;
    const html = path.join(OUT, nome + '.html'), png = path.join(OUT, nome + '.png');
    fs.writeFileSync(html, t.html);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${t.w},${t.h}`, '--virtual-time-budget=8000', '--default-background-color=00000000', `--screenshot=${png}`, 'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
    await sharp(png).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(IMG, nome + '.webp'));
    const m = await sharp(path.join(IMG, nome + '.webp')).metadata();
    console.log('ok', nome, m.width + 'x' + m.height);
  }
})();
