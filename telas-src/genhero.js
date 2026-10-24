// Gera as 3 peças da vitrine da hero (PNG transparente → webp em assets/img/hero/):
//  - hero-notebook: notebook com o cardápio da Bela Marmita (cliente) — endereço do cliente removido
//  - hero-mesa: tablet + celular + comanda com QR Code (cardápio na mesa)
//  - hero-impressora: impressora térmica imprimindo pedido Menuzia + sacolas de delivery
// Uso: node telas-src/genhero.js [nome]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const DIR = __dirname, OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'assets/img/hero');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(IMG, { recursive: true });
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(f => fs.existsSync(f));
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const RAIZ = path.join(DIR, '..');
const FONTES = `<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=block" rel="stylesheet">`;
const pagina = (corpo, css) => `<!doctype html><html><head><meta charset="utf-8">${FONTES}<style>*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent;overflow:hidden}${css}</style></head><body>${corpo}</body></html>`;
const SIMB_SVG = (fundo, m = '#fff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="${fundo}"/><g transform="translate(50 50) scale(.125) translate(-413 -502)"><circle cx="148" cy="640" r="52" fill="#EE6A2C"/><path d="M262 680 V430 A105 105 0 0 1 472 430 V680 M472 430 A105 105 0 0 1 682 430 V680" fill="none" stroke="${m}" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
const simb = (f, m) => 'data:image/svg+xml;base64,' + Buffer.from(SIMB_SVG(f, m)).toString('base64');

// Tela da Bela Marmita (1882x961) com os ajustes: aberto agora + sem endereço do cliente
const BELA = b64(path.join(DIR, 'bela-marmita.png'), 'image/png');
// encaixa o conteúdo útil do print (x=150 a 1750) na tela (w x h) e centraliza
const belaTela = (w, h) => { const e = Math.min(h / 961, w / 1600), dx = (w - 1882 * e) / 2; return `<div class="bela" style="width:1882px;height:961px;transform:translateX(${dx}px) scale(${e});transform-origin:0 0">
  <img src="${BELA}" width="1882" height="961">
  <div style="position:absolute;left:436px;top:622px;width:440px;height:34px;background:#F3F4F6;display:flex;align-items:center;gap:8px;font:600 17px Rubik;color:#15803D"><i style="width:10px;height:10px;border-radius:50%;background:#22C55E;display:inline-block"></i>Aberto agora · Entrega em 40–50 min</div>
  <div style="position:absolute;left:1400px;top:772px;width:340px;height:62px;background:#fff;display:flex;flex-direction:column;justify-content:center;font:500 16px Rubik;color:#1F2937;line-height:1.5"><b style="font-weight:600">Informe seu endereço de entrega</b><span style="color:#6B7280;font-size:15.5px">Entrega em 40–50 min · a partir de R$ 5,00</span></div>
</div>`; };
const CEL = b64(path.join(RAIZ, 'assets/img/mockups/cel-home.webp'), 'image/webp');
const QR = b64(path.join(DIR, 'qr-menuzia.svg'), 'image/svg+xml');

const pecas = {};

// ---------- 1. Notebook com a Bela Marmita ----------
pecas['hero-notebook'] = { w: 1400, h: 860, html: pagina(`<div class="nb">
  <div class="tampa"><div class="cam"></div><div class="tela">${belaTela(1168, 732)}</div></div>
  <div class="base"><span></span></div></div>`, `
  .nb{position:absolute;left:0;top:0;width:1400px;height:860px}
  .tampa{position:absolute;left:84px;top:4px;width:1232px;height:808px;border-radius:38px 38px 10px 10px;background:linear-gradient(180deg,#24272e,#0d0f13);box-shadow:inset 0 0 0 2px #3c4049}
  .cam{position:absolute;left:50%;top:13px;width:9px;height:9px;margin-left:-4px;border-radius:50%;background:#1c2436;box-shadow:0 0 0 2px #0a0b0e}
  .tela{position:absolute;left:32px;top:36px;right:32px;bottom:40px;border-radius:6px;overflow:hidden;background:#F3F4F6}
  .bela{position:relative}.bela img{display:block}
  .base{position:absolute;left:0;top:806px;width:1400px;height:40px;border-radius:4px 4px 30px 30px;background:linear-gradient(180deg,#e9ecf1 0%,#b9bec8 40%,#8a909b 75%,#5c616b 100%);box-shadow:0 24px 40px -18px rgba(0,0,0,.6)}
  .base span{position:absolute;left:50%;top:0;width:210px;height:14px;margin-left:-105px;border-radius:0 0 14px 14px;background:linear-gradient(180deg,#9aa0aa,#c3c8d0)}`) };
// a tela precisa caber: 1168x732 → escala da Bela = 1168/1882

// ---------- 2. Mesa: tablet + celular + comanda QR ----------
pecas['hero-mesa'] = { w: 1400, h: 1000, html: pagina(`<div class="cena">
  <div class="tablet"><div class="tt">${belaTela(900, 580)}</div><i class="btn-h"></i></div>
  <img class="cel" src="${CEL}">
  <div class="comanda"><small>MESA</small><b>10</b><span>Escaneie e peça<br>direto da mesa</span><div class="qr"><img src="${QR}"></div><div class="marca"><img src="${simb('#1F3F8A')}">menuzia</div></div>
</div>`, `
  .cena{position:absolute;inset:0;perspective:2200px}
  .tablet{position:absolute;left:130px;top:200px;width:960px;height:640px;border-radius:44px;padding:30px;background:linear-gradient(145deg,#3a3e47,#0c0d11 60%);box-shadow:inset 0 0 0 3px #4b505a,0 60px 70px -30px rgba(0,0,0,.55);transform:rotateY(16deg) rotateX(4deg) rotateZ(-5deg);transform-origin:right center}
  .tt{width:100%;height:100%;border-radius:12px;overflow:hidden;background:#F3F4F6}
  .btn-h{position:absolute;left:12px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:#20252f}
  .cel{position:absolute;right:40px;top:60px;width:400px;filter:drop-shadow(0 40px 40px rgba(0,0,0,.45));transform:rotate(4deg)}
  .comanda{position:absolute;left:730px;top:520px;width:270px;height:400px;border-radius:26px;background:linear-gradient(160deg,#FFF8F1,#FCE7D6);border:3px solid #F6C9A8;box-shadow:0 40px 50px -20px rgba(0,0,0,.5),inset 0 0 0 8px rgba(255,255,255,.6);transform:rotate(-6deg);display:flex;flex-direction:column;align-items:center;padding:24px 20px;text-align:center;font-family:'Plus Jakarta Sans'}
  .comanda small{font-weight:800;font-size:16px;letter-spacing:.3em;color:#1F3F8A}
  .comanda b{font-weight:800;font-size:72px;line-height:.95;color:#0F1B3D;letter-spacing:-.04em}
  .comanda span{font-weight:700;font-size:15px;color:#475069;line-height:1.3;margin:6px 0 12px}
  .qr{width:150px;height:150px;background:#fff;border-radius:16px;padding:12px;box-shadow:0 6px 14px -6px rgba(15,27,61,.3)}.qr img{width:100%;height:100%;display:block}
  .marca{margin-top:auto;display:flex;align-items:center;gap:7px;font-weight:800;font-size:17px;color:#1F3F8A}.marca img{width:24px;height:24px}`) };

// ---------- 3. Impressora térmica com pedido Menuzia ----------
{
  const sacola = (x, y, r, s) => `<svg class="sac" style="left:${x}px;top:${y}px;width:${190 * s}px;transform:rotate(${r}deg)" viewBox="0 0 190 230"><defs><linearGradient id="k${x}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B98A55"/><stop offset=".55" stop-color="#D6AA74"/><stop offset="1" stop-color="#A97B48"/></linearGradient></defs>
    <path d="M18 34 L172 34 L184 222 Q184 228 178 228 L12 228 Q6 228 6 222 Z" fill="url(#k${x})"/>
    <path d="M18 34 L32 18 L46 34 L60 18 L74 34 L88 18 L102 34 L116 18 L130 34 L144 18 L158 34 L172 18 L172 34 Z" fill="#C79B66"/>
    <path d="M8 168 L182 168 L184 222 Q184 228 178 228 L12 228 Q6 228 6 222 Z" fill="#EE6A2C"/><path d="M8 168 L182 168 L182.6 178 L7.4 178 Z" fill="#D95A1E"/>
    <circle cx="95" cy="106" r="38" fill="#fff"/><g transform="translate(95 106) scale(.075) translate(-413 -502)"><circle cx="148" cy="640" r="52" fill="#EE6A2C"/><path d="M262 680 V430 A105 105 0 0 1 472 430 V680 M472 430 A105 105 0 0 1 682 430 V680" fill="none" stroke="#1F3F8A" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g>
    <text x="95" y="206" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="22" fill="#fff">menuzia</text></svg>`;
  const linhas = [['1x', 'Burger Cheddar Bacon', '34,90'], ['', '+ Bacon extra', '4,00'], ['1x', 'Batata cheddar e bacon', '24,90'], ['2x', 'Coca-Cola lata', '13,80']];
  pecas['hero-impressora'] = { w: 1100, h: 1000, html: pagina(`<div class="cena">
    ${sacola(820, 60, 14, .95)}${sacola(890, 560, -12, 1.05)}${sacola(10, 720, 10, 1)}
    <div class="chips"><img src="${simb('#1F3F8A')}"><span class="ok"><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M9 11.5l2 2 4-4.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
    <div class="papel"><div class="cupom">
      <div class="c">DELIVERY · PEDIDO #438</div><div class="c f">MENUZIA BURGER</div><div class="c s">24/10/2026 19:42 · via cardápio digital</div><hr>
      ${linhas.map(([q, n, v]) => `<div class="l"><span>${q} ${n}</span><span>${v}</span></div>`).join('')}<hr>
      <div class="l"><span>Taxa de entrega</span><span>5,00</span></div><div class="l t"><span>TOTAL</span><span>R$ 82,60</span></div>
      <div class="c pg">PAGO ONLINE · PIX</div><div class="c s">Mariana C. · Praia da Costa</div></div></div>
    <svg class="imp" viewBox="0 0 760 560" width="760" height="560">
      <defs><linearGradient id="tp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4e57"/><stop offset="1" stop-color="#2a2d33"/></linearGradient>
      <linearGradient id="fr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34373e"/><stop offset=".5" stop-color="#25282d"/><stop offset="1" stop-color="#17191d"/></linearGradient>
      <linearGradient id="ld" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1b1d22"/><stop offset="1" stop-color="#2e3138"/></linearGradient>
      <radialGradient id="sb"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="380" cy="536" rx="360" ry="22" fill="url(#sb)"/>
      <path d="M70 120 Q70 90 100 88 L660 88 Q690 90 690 120 L700 200 L60 200 Z" fill="url(#tp)"/>
      <path d="M60 200 L700 200 L716 488 Q716 520 684 520 L76 520 Q44 520 44 488 Z" fill="url(#fr)"/>
      <path d="M60 200 L700 200 L702 214 L58 214 Z" fill="#555a64" opacity=".7"/>
      <rect x="190" y="104" width="380" height="22" rx="8" fill="#0d0e11"/>
      <path d="M560 96 L660 96 Q684 98 686 122 L694 196 L580 196 Z" fill="url(#ld)" opacity=".8"/>
      <rect x="604" y="122" width="34" height="14" rx="7" fill="#3f434c"/><circle cx="612" cy="160" r="5" fill="#22C55E"/><circle cx="632" cy="160" r="5" fill="#EE6A2C"/>
      <rect x="296" y="300" width="168" height="10" rx="5" fill="#111216" opacity=".8"/>
      <rect x="112" y="440" width="70" height="40" rx="8" fill="#121317" stroke="#3a3e47" stroke-width="2"/><rect x="126" y="452" width="22" height="16" rx="3" fill="#2f333b"/>
      <text x="380" y="474" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="20" letter-spacing="6" fill="#4b505a">MENUZIA</text>
    </svg>
  </div>`, `
    .cena{position:absolute;inset:0}
    .imp{position:absolute;left:170px;top:400px;filter:drop-shadow(0 40px 40px rgba(0,0,0,.35))}
    .papel{position:absolute;left:372px;top:40px;width:356px;height:500px;perspective:900px}
    .cupom{position:absolute;inset:0;background:linear-gradient(180deg,#fff 0%,#fbfbfb 70%,#e9e9e9 100%);border-radius:6px 6px 0 0;padding:26px 24px;font-family:'JetBrains Mono';color:#1b1d22;font-size:13.5px;box-shadow:0 20px 30px -16px rgba(0,0,0,.35);transform:rotateX(8deg);transform-origin:bottom}
    .cupom::before{content:"";position:absolute;left:0;right:0;top:-10px;height:14px;background:radial-gradient(circle at 8px -2px,transparent 9px,#fff 10px) -8px 0/16px 14px repeat-x}
    .cupom .c{text-align:center;font-weight:700}.cupom .f{font-size:19px;font-weight:800;margin:4px 0}.cupom .s{font-size:11.5px;font-weight:500;color:#555}
    .cupom hr{border:0;border-top:2px dashed #b8b8b8;margin:12px 0}.cupom .l{display:flex;justify-content:space-between;gap:10px;margin:5px 0;font-weight:500}.cupom .t{font-weight:800;font-size:17px;margin-top:8px}
    .cupom .pg{margin:12px 0 6px;background:#1b1d22;color:#fff;padding:6px;border-radius:4px;letter-spacing:.06em}
    .chips{position:absolute;left:40px;top:60px;display:grid;gap:16px}.chips img,.chips .ok{width:118px;height:118px;border-radius:28px;box-shadow:0 20px 34px -14px rgba(15,27,61,.55)}
    .chips .ok{background:#EE6A2C;display:grid;place-items:center}.chips .ok svg{width:66px;height:66px}
    .sac{position:absolute;filter:drop-shadow(0 26px 26px rgba(0,0,0,.35))}`) };
}

(async () => {
  const so = process.argv[2];
  for (const [nome, t] of Object.entries(pecas)) {
    if (so && so !== nome) continue;
    const html = path.join(OUT, nome + '.html'), png = path.join(OUT, nome + '.png');
    fs.writeFileSync(html, t.html);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${t.w},${t.h}`, '--virtual-time-budget=8000', '--default-background-color=00000000', `--screenshot=${png}`, 'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
    await sharp(png).trim({ threshold: 1 }).webp({ quality: 88, alphaQuality: 95 }).toFile(path.join(IMG, nome + '.webp'));
    const m = await sharp(path.join(IMG, nome + '.webp')).metadata();
    console.log('ok', nome, m.width + 'x' + m.height);
  }
})();
