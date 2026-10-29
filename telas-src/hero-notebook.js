// Gera assets/img/hero/hero-notebook2.webp (1400x900, fundo transparente):
// notebook de frente com o cardápio da Bela Marmita + celular de frente com a tela de produto.
// Uso: node telas-src/hero-notebook.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const DIR = __dirname, OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'assets/img/hero');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(IMG, { recursive: true });
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(f => fs.existsSync(f));
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const RAIZ = path.join(DIR, '..');
const FONTES = `<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=block" rel="stylesheet">`;
const pagina = (corpo, css) => `<!doctype html><html><head><meta charset="utf-8">${FONTES}<style>*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent;overflow:hidden}${css}</style></head><body>${corpo}</body></html>`;

const BELA = b64(path.join(DIR, 'bela-marmita.png'), 'image/png');
const belaTela = (w, h) => { const e = Math.min(h / 961, w / 1600), dx = (w - 1882 * e) / 2; return `<div class="bela" style="width:1882px;height:961px;transform:translateX(${dx}px) scale(${e});transform-origin:0 0">
  <img src="${BELA}" width="1882" height="961">
  <div style="position:absolute;left:436px;top:622px;width:440px;height:34px;background:#F3F4F6;display:flex;align-items:center;gap:8px;font:600 17px Rubik;color:#15803D"><i style="width:10px;height:10px;border-radius:50%;background:#22C55E;display:inline-block"></i>Aberto agora · Entrega em 40–50 min</div>
  <div style="position:absolute;left:1400px;top:772px;width:340px;height:62px;background:#fff;display:flex;flex-direction:column;justify-content:center;font:500 16px Rubik;color:#1F2937;line-height:1.5"><b style="font-weight:600">Informe seu endereço de entrega</b><span style="color:#6B7280;font-size:15.5px">Entrega em 40–50 min · a partir de R$ 5,00</span></div>
</div>`; };
const BURGER = b64(path.join(RAIZ, 'assets/img/burger-destaque.webp'), 'image/webp');

// ---- geometria (px no canvas 1400x900) ----
const W = 1400, H = 900, CHAO = 890;            // base dos aparelhos em y=890 (10px de respiro)
const BASE_W = 1240, BASE_H = 26;               // base de alumínio
const TAMPA_W = 1090, BZ = 20, BZ_T = 26, BZ_B = 30; // tampa + bordas pretas
const TELA_W = TAMPA_W - 2 * BZ, TELA_H = Math.round(TELA_W * 961 / 1600);
const TAMPA_H = BZ_T + TELA_H + BZ_B;
const CEL_W = 292, CEL_H = 620, SOBRA = 52;     // celular passa 52px da borda direita da base
const GRUPO_W = BASE_W + SOBRA, X0 = Math.round((W - GRUPO_W) / 2);
const BASE_X = X0, BASE_Y = CHAO - BASE_H;
const TAMPA_X = BASE_X + (BASE_W - TAMPA_W) / 2, TAMPA_Y = BASE_Y - TAMPA_H + 2;
const CEL_X = X0 + GRUPO_W - CEL_W, CEL_Y = CHAO - CEL_H;

const check = on => on
  ? `<i class="ck on"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i>`
  : `<i class="ck"></i>`;
const add = (nome, preco, on) => `<div class="add">${check(on)}<span>${nome}</span><b>+ ${preco}</b></div>`;

const celular = `<div class="cel"><div class="cel-tela">
  <div class="status"><b>19:42</b><span class="ic"><i class="sig"><s></s><s></s><s></s><s></s></i><i class="bat"></i></span></div>
  <div class="foto"><img src="${BURGER}"><span class="voltar"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="#0F1B3D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="tag">Mais pedido</span></div>
  <div class="info">
    <h3>Smash Duplo Bacon</h3>
    <p>2 smashs de 90g, cheddar, bacon crocante e molho da casa no pão brioche.</p>
    <div class="preco">R$ 34,90</div>
    <div class="grp"><span>Adicionais</span><em>Opcional</em></div>
    ${add('Bacon extra', 'R$ 4,00', true)}
    ${add('Cheddar', 'R$ 3,00', false)}
    ${add('Molho especial', 'R$ 2,50', false)}
    <div class="obs">Alguma observação? Ex.: sem cebola</div>
  </div>
  <div class="rodape"><span class="qtd"><i>−</i><b>1</b><i class="mais">+</i></span><span class="btn"><span>Adicionar</span><b>R$ 34,90</b></span></div>
  <div class="home"></div>
</div><div class="ilha"></div><i class="bt b1"></i><i class="bt b2"></i><i class="bt b3"></i></div>`;

const html = pagina(`<div class="cena">
  <div class="sombra"></div>
  <div class="tampa"><div class="cam"></div><div class="tela">${belaTela(TELA_W, TELA_H)}</div><div class="brilho"></div></div>
  <div class="base"><span></span></div>
  ${celular}
</div>`, `
  .cena{position:absolute;left:0;top:0;width:${W}px;height:${H}px}
  .sombra{position:absolute;left:${BASE_X + 40}px;top:${CHAO - 14}px;width:${GRUPO_W - 60}px;height:14px;border-radius:50%;background:rgba(15,27,61,.35);filter:blur(7px)}
  .tampa{position:absolute;left:${TAMPA_X}px;top:${TAMPA_Y}px;width:${TAMPA_W}px;height:${TAMPA_H}px;border-radius:26px 26px 6px 6px;background:linear-gradient(180deg,#1d1f24,#0b0c0f);box-shadow:inset 0 0 0 1.5px #3a3d45,inset 0 0 0 4px #0a0b0d}
  .cam{position:absolute;left:50%;top:10px;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;background:#1a2233;box-shadow:0 0 0 1.5px #050608}
  .tela{position:absolute;left:${BZ}px;top:${BZ_T}px;width:${TELA_W}px;height:${TELA_H}px;border-radius:4px;overflow:hidden;background:#F3F4F6}
  .bela{position:relative}.bela img{display:block}
  .brilho{position:absolute;left:${BZ}px;top:${BZ_T}px;width:${TELA_W}px;height:${TELA_H}px;border-radius:4px;background:linear-gradient(115deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,0) 38%);pointer-events:none}
  .base{position:absolute;left:${BASE_X}px;top:${BASE_Y}px;width:${BASE_W}px;height:${BASE_H}px;border-radius:3px 3px 22px 22px / 3px 3px 18px 18px;background:linear-gradient(180deg,#f1f3f6 0%,#d3d7de 30%,#a9afb9 70%,#7b818c 100%);box-shadow:inset 0 1px 0 #fff}
  .base span{position:absolute;left:50%;top:0;width:180px;height:9px;margin-left:-90px;border-radius:0 0 10px 10px;background:linear-gradient(180deg,#a3a9b3,#c9cdd4)}

  .cel{position:absolute;left:${CEL_X}px;top:${CEL_Y}px;width:${CEL_W}px;height:${CEL_H}px;border-radius:46px;background:#0c0d10;padding:11px;box-shadow:inset 0 0 0 2px #3b3e46,inset 0 0 0 4px #15161a,0 30px 40px -18px rgba(15,27,61,.55),0 8px 16px -6px rgba(0,0,0,.35)}
  .bt{position:absolute;width:3px;border-radius:2px;background:#2a2c32}.b1{left:-2px;top:120px;height:30px}.b2{left:-2px;top:166px;height:52px}.b3{right:-2px;top:176px;height:76px}
  .ilha{position:absolute;left:50%;top:22px;width:88px;height:25px;margin-left:-44px;border-radius:13px;background:#000}
  .cel-tela{position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#fff;font-family:Inter;color:#0F1B3D;display:flex;flex-direction:column}
  .status{position:absolute;left:0;right:0;top:0;height:46px;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:4px 26px 0 30px;color:#fff;font:700 13px Inter;text-shadow:0 1px 3px rgba(0,0,0,.35)}
  .status .ic{display:flex;align-items:center;gap:5px}
  .sig{display:flex;align-items:flex-end;gap:1.5px;height:10px}.sig s{display:block;width:3px;background:#fff;border-radius:1px}.sig s:nth-child(1){height:4px}.sig s:nth-child(2){height:6px}.sig s:nth-child(3){height:8px}.sig s:nth-child(4){height:10px}
  .bat{display:block;width:21px;height:10px;border-radius:3px;border:1.5px solid rgba(255,255,255,.9);position:relative}.bat::after{content:"";position:absolute;left:1.5px;top:1.5px;bottom:1.5px;width:12px;background:#fff;border-radius:1px}
  .foto{position:relative;height:246px;flex:none;overflow:hidden}
  .foto img{width:100%;height:100%;object-fit:cover;object-position:50% 55%;display:block}
  .foto::before{content:"";position:absolute;inset:0 0 auto 0;height:70px;background:linear-gradient(180deg,rgba(0,0,0,.35),transparent);z-index:1}
  .voltar{position:absolute;left:14px;top:52px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.95);display:grid;place-items:center;z-index:2;box-shadow:0 2px 6px rgba(0,0,0,.2)}.voltar svg{width:17px;height:17px}
  .tag{position:absolute;left:14px;bottom:12px;z-index:2;background:#A855F7;color:#fff;font:700 10.5px Inter;letter-spacing:.02em;padding:4px 9px;border-radius:20px}
  .info{padding:14px 16px 0;flex:1;min-height:0;overflow:hidden;margin-top:-14px;background:#fff;border-radius:16px 16px 0 0;position:relative;z-index:2}
  .info h3{font:800 18.5px 'Plus Jakarta Sans';letter-spacing:-.02em;line-height:1.15}
  .info p{font:500 11.5px/1.4 Inter;color:#5B6478;margin-top:5px}
  .preco{font:800 17px 'Plus Jakarta Sans';color:#0A4D94;margin-top:6px}
  .grp{display:flex;justify-content:space-between;align-items:center;margin:9px -16px 2px;padding:7px 16px;background:#F3F5F9;font:700 12px Inter}
  .grp em{font-style:normal;font:600 10px Inter;color:#5B6478;background:#E3E7EF;padding:2px 7px;border-radius:10px}
  .add{display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid #EEF0F4;font:600 12px Inter}
  .add span{flex:1}.add b{font-weight:700;color:#0F1B3D}
  .obs{margin-top:8px;border:1.5px solid #E3E7EF;border-radius:10px;padding:7px 10px;font:500 11px Inter;color:#9AA2B1}
  .ck{width:18px;height:18px;border-radius:5px;border:1.8px solid #C3C9D4;display:grid;place-items:center;flex:none}
  .ck.on{background:#0A4D94;border-color:#0A4D94}.ck svg{width:12px;height:12px}
  .rodape{flex:none;display:flex;gap:8px;align-items:center;padding:10px 12px 22px;border-top:1px solid #EEF0F4;background:#fff}
  .qtd{display:flex;align-items:center;gap:9px;border:1.5px solid #DDE1E8;border-radius:12px;height:42px;padding:0 9px;font:700 14px Inter}
  .qtd i{font-style:normal;font-size:17px;color:#9AA2B1;line-height:1}.qtd i.mais{color:#E73A47}
  .btn{flex:1;height:42px;border-radius:12px;background:#0A4D94;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 13px;font:700 13px Inter;box-shadow:0 6px 14px -6px rgba(10,77,148,.6)}
  .btn b{font-weight:800}
  .home{position:absolute;left:50%;bottom:8px;width:104px;height:4px;margin-left:-52px;border-radius:3px;background:#0F1B3D}`);

(async () => {
  const nome = 'hero-notebook2';
  const hf = path.join(OUT, nome + '.html'), png = path.join(OUT, nome + '.png');
  fs.writeFileSync(hf, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${W},${H}`, '--virtual-time-budget=8000', '--default-background-color=00000000', `--screenshot=${png}`, 'file:///' + hf.replace(/\\/g, '/')], { stdio: 'ignore' });
  await sharp(png).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(IMG, nome + '.webp'));
  const m = await sharp(path.join(IMG, nome + '.webp')).metadata();
  console.log('ok', nome, m.width + 'x' + m.height);
  console.log('notebook', { x: BASE_X, y: TAMPA_Y, w: BASE_W, h: CHAO - TAMPA_Y, tela: { x: TAMPA_X + BZ, y: TAMPA_Y + BZ_T, w: TELA_W, h: TELA_H } });
  console.log('celular', { x: CEL_X, y: CEL_Y, w: CEL_W, h: CEL_H });
})();
