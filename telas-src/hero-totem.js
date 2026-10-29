// Gera 2 peças da hero (PNG transparente → webp em assets/img/hero/), vista frontal reta:
//  - hero-gestao (700x1000): tablet retrato com o dashboard de gestão (dados de gentelas.js)
//  - hero-totem (600x1300): totem de autoatendimento com cardápio + maquininha
// Uso: node telas-src/hero-totem.js [nome]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const DIR = __dirname, OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'assets/img/hero');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(IMG, { recursive: true });
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(f => fs.existsSync(f));
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const RAIZ = path.join(DIR, '..');
const FONTES = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=block" rel="stylesheet">`;
const pagina = (corpo, css) => `<!doctype html><html><head><meta charset="utf-8">${FONTES}<style>*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent;overflow:hidden}body{font-family:Inter;-webkit-font-smoothing:antialiased}${css}</style></head><body>${corpo}</body></html>`;
const SIMB_SVG = (fundo, m = '#fff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="${fundo}"/><g transform="translate(50 50) scale(.125) translate(-413 -502)"><circle cx="148" cy="640" r="52" fill="#EE6A2C"/><path d="M262 680 V430 A105 105 0 0 1 472 430 V680 M472 430 A105 105 0 0 1 682 430 V680" fill="none" stroke="${m}" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
const simb = (f, m) => 'data:image/svg+xml;base64,' + Buffer.from(SIMB_SVG(f, m)).toString('base64');
const BURGER = b64(path.join(RAIZ, 'assets/img/burger-destaque.webp'), 'image/webp');

const AZUL = '#0A4D94', ROXO = '#A855F7', VERM = '#E73A47';
const pecas = {};

// ---------- 1. Tablet retrato com o dashboard ----------
{
  // dados coerentes com gentelas.js: FAT 81.347,60 / 1.310 pedidos / ticket 62,10 (últimos 14 dias no gráfico)
  const barras = [2210, 1630, 1780, 1990, 2240, 3120, 3460, 2950, 1720, 1840, 2080, 2390, 3310, 3640];
  const dias = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  const max = 4000;
  const funil = [['Visitas', 18940, 100], ['Sacola', 3420, 18.1], ['Checkout', 1720, 9.1], ['Pedidos', 1198, 6.3]];
  const pedidos = [['#1310', 'Mariana C.', 'Delivery', '82,60', 'Saiu p/ entrega', '#2563EB', '#DBEAFE'], ['#1309', 'Mesa 04', 'Salão', '146,30', 'Em preparo', '#B45309', '#FEF3C7'], ['#1308', 'Rafael S.', 'Retirada', '54,80', 'Pronto', '#15803D', '#DCFCE7']];
  const n = v => v.toLocaleString('pt-BR');
  const kpi = (t, v, d, ic) => `<div class="kpi"><div class="kt"><span>${t}</span><i>${ic}</i></div><b>${v}</b><em>▲ ${d} <small>vs. 30 dias ant.</small></em></div>`;
  const icS = p => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${AZUL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const tela = `<div class="dash">
    <div class="top"><img src="${simb(AZUL)}"><div class="loja"><b>Menuzia Burger</b><span>Visão geral · Painel de gestão</span></div><div class="per">Últimos 30 dias ▾</div><div class="av">MB</div></div>
    
    <div class="kpis">
      <div class="kpi big"><div class="kt"><span>Faturamento</span><i>${icS('<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>')}</i></div><b>R$ 81.347,60</b><em>▲ 18,2% <small>vs. 30 dias anteriores</small></em></div>
      ${kpi('Pedidos', '1.310', '22,5%', icS('<path d="M6 2h12l2 6H4z"/><path d="M4 8v13h16V8"/><path d="M9 12a3 3 0 0 0 6 0"/>'))}
      ${kpi('Ticket médio', 'R$ 62,10', '3,1%', icS('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>'))}
    </div>
    <div class="card graf"><div class="ch"><b>Vendas por dia</b><span class="leg"><i></i>Últimos 14 dias</span></div>
      <div class="area"><div class="grid">${[4, 3, 2, 1, 0].map(k => `<div><span>${k ? k + 'k' : '0'}</span></div>`).join('')}</div>
      <div class="bars">${barras.map((v, i) => `<div class="bc"><div class="bar${i === 13 ? ' hl' : ''}" style="height:${(v / max * 100).toFixed(1)}%">${i === 13 ? `<em>R$ ${n(v)}</em>` : ''}</div><span>${dias[i]}/10</span></div>`).join('')}</div></div></div>
    <div class="row2">
      <div class="card fun"><div class="ch"><b>Funil do cardápio</b></div>
        ${funil.map(([t, v, p], i) => `<div class="fl"><div class="fh"><span>${t}</span><b>${n(v)}</b></div><div class="fb"><i style="width:${Math.max(p, 7)}%;opacity:${1 - i * .18}"></i></div></div>`).join('')}
        <div class="conv">Conversão <b>6,3%</b> <em>▲ 0,4 p.p.</em></div></div>
      <div class="card lin"><div class="ch"><b>Pedidos/hora</b><span class="hj">Hoje</span></div>
        <svg viewBox="0 0 220 120" width="100%" height="90" preserveAspectRatio="none"><defs><linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ROXO}" stop-opacity=".28"/><stop offset="1" stop-color="${ROXO}" stop-opacity="0"/></linearGradient></defs>
          <g stroke="#EEF0F4" stroke-width="1"><line x1="0" y1="20" x2="220" y2="20"/><line x1="0" y1="55" x2="220" y2="55"/><line x1="0" y1="90" x2="220" y2="90"/></g>
          <path d="M0 98 L27 92 L55 70 L82 80 L110 60 L137 38 L165 22 L192 34 L220 52 L220 110 L0 110Z" fill="url(#la)"/>
          <path d="M0 98 L27 92 L55 70 L82 80 L110 60 L137 38 L165 22 L192 34 L220 52" fill="none" stroke="${ROXO}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="165" cy="22" r="5" fill="#fff" stroke="${ROXO}" stroke-width="3"/></svg>
        <div class="hx"><span>18h</span><span>19h</span><span>20h</span><span>21h</span><span>22h</span></div>
        <div class="pico">Pico às <b>20h40</b> · 38 pedidos</div></div>
    </div>
    <div class="card ped"><div class="ch"><b>Pedidos recentes</b><span class="vt">Ver todos</span></div>
      ${pedidos.map(([id, c, o, v, s, cor, bg]) => `<div class="pr"><span class="id">${id}</span><div class="pc"><b>${c}</b><span>${o}</span></div><span class="st" style="color:${cor};background:${bg}">${s}</span><b class="pv">R$ ${v}</b></div>`).join('')}
    </div>
  </div>`;
  pecas['hero-gestao'] = { w: 700, h: 1000, html: pagina(`<div class="tab"><i class="cam"></i><div class="scr">${tela}</div></div>`, `
    .tab{position:absolute;left:10px;top:10px;width:680px;height:980px;border-radius:52px;background:linear-gradient(160deg,#2b2e35,#0b0c0f 55%,#16181d);box-shadow:inset 0 0 0 2px #444851,inset 0 0 0 5px #0a0b0d}
    .cam{position:absolute;left:50%;top:13px;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#1a2235;box-shadow:0 0 0 2px #050608}
    .scr{position:absolute;left:28px;top:34px;right:28px;bottom:34px;border-radius:24px;overflow:hidden;background:#F6F7F9}
    .dash{padding:18px 20px;color:#0F172A;height:100%;display:flex;flex-direction:column;gap:12px}
    .top{display:flex;align-items:center;gap:11px}.top img{width:38px;height:38px}
    .loja b{display:block;font:800 16px 'Plus Jakarta Sans';color:#0F172A}.loja span{font:500 12px Inter;color:#64748B}
    .per{margin-left:auto;font:600 12.5px Inter;color:${AZUL};background:#fff;border:1px solid #DCE3EE;padding:8px 12px;border-radius:10px}
    .av{width:36px;height:36px;border-radius:50%;background:${AZUL};color:#fff;display:grid;place-items:center;font:700 13px Inter}
    h2{font:800 22px 'Plus Jakarta Sans';letter-spacing:-.02em;margin-top:2px}
    .kpis{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .kpi{background:#fff;border-radius:16px;padding:12px 16px;box-shadow:0 1px 2px rgba(15,23,42,.06),0 0 0 1px #E8ECF2}
    .kpi.big{grid-column:1/3;background:${AZUL};box-shadow:none;color:#fff}
    .kt{display:flex;justify-content:space-between;align-items:center;font:600 13px Inter;color:#64748B}
    .kt i{width:28px;height:28px;border-radius:8px;background:#EAF1FA;display:grid;place-items:center}
    .kpi.big .kt{color:#C8DAF0}.kpi.big .kt i{background:rgba(255,255,255,.95)}
    .kpi b{display:block;font:800 25px 'Plus Jakarta Sans';letter-spacing:-.02em;margin:6px 0 4px}.kpi.big b{font-size:36px}
    .kpi em{font:700 12px Inter;font-style:normal;color:#16A34A}.kpi em small{font-weight:500;color:#94A3B8;font-size:11.5px}
    .kpi.big em{color:#86EFAC}.kpi.big em small{color:#B7CDEA}
    .card{background:#fff;border-radius:16px;padding:14px 16px;box-shadow:0 1px 2px rgba(15,23,42,.06),0 0 0 1px #E8ECF2}
    .ch{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.ch b{font:700 14.5px 'Plus Jakarta Sans'}
    .leg{font:500 11.5px Inter;color:#64748B;display:flex;align-items:center;gap:6px}.leg i{width:10px;height:10px;border-radius:3px;background:${ROXO}}
    .area{position:relative;height:136px;margin-top:22px}
    .grid{position:absolute;left:0;right:0;top:0;bottom:20px;display:flex;flex-direction:column;justify-content:space-between}
    .grid div{border-top:1px dashed #E5E8EE;height:0;position:relative}.grid span{position:absolute;left:0;top:-7px;font:500 10.5px Inter;color:#94A3B8}
    .bars{position:absolute;left:26px;right:0;top:0;bottom:0;display:flex;gap:6px;align-items:flex-end}
    .bc{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
    .bc>span{font:500 9.5px Inter;color:#94A3B8;height:20px;line-height:20px;white-space:nowrap}
    .bar{width:100%;max-height:calc(100% - 20px);border-radius:6px 6px 2px 2px;background:#D9C2FB;position:relative}
    .bar.hl{background:${ROXO}}.bar em{position:absolute;bottom:calc(100% + 5px);right:0;font:700 10.5px Inter;font-style:normal;color:#fff;background:#0F172A;padding:3px 7px;border-radius:6px;white-space:nowrap}
    .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .fl{margin-bottom:6px}.fh{display:flex;justify-content:space-between;font:500 12px Inter;color:#475569;margin-bottom:4px}.fh b{font-weight:700;color:#0F172A}
    .fb{height:8px;border-radius:5px;background:#F1F3F7}.fb i{display:block;height:100%;border-radius:5px;background:${AZUL}}
    .conv{font:500 12px Inter;color:#64748B;margin-top:4px}.conv b{color:#0F172A;font-weight:800}.conv em{font-style:normal;color:#16A34A;font-weight:700}
    .hj{font:600 11px Inter;color:${ROXO};background:#F3E8FF;padding:3px 9px;border-radius:20px}
    .lin svg{display:block}.lin svg path,.lin svg line,.lin svg circle{vector-effect:non-scaling-stroke}.hx{display:flex;justify-content:space-between;font:500 10.5px Inter;color:#94A3B8;margin-top:2px}
    .pico{font:500 12px Inter;color:#64748B;margin-top:6px}.pico b{color:#0F172A}
    .ped{flex:1;min-height:0}.vt{font:600 12px Inter;color:${AZUL}}
    .pr{display:flex;align-items:center;gap:12px;padding:8px 0;border-top:1px solid #F0F2F5}
    .id{font:700 12px Inter;color:#64748B;width:44px}.pc{flex:1}.pc b{display:block;font:700 13px Inter}.pc span{font:500 11.5px Inter;color:#94A3B8}
    .st{font:700 11px Inter;padding:4px 10px;border-radius:20px}.pv{font:800 13.5px Inter;width:78px;text-align:right}`) };
}

// ---------- 2. Totem de autoatendimento ----------
{
  const cats = [['Burgers', 1], ['Combos', 0], ['Porções', 0], ['Bebidas', 0]];
  // recortes da mesma foto (object-position diferente) + filtros para variar
  const itens = [['Cheddar Bacon', '34,90', '50% 55%', 'none', 'Mais pedido'], ['Smash Duplo', '29,90', '30% 45%', 'saturate(1.15)', ''], ['Clássico Salada', '27,90', '70% 50%', 'hue-rotate(-8deg) saturate(1.1)', ''], ['Combo Família', '89,90', '50% 35%', 'saturate(1.2) contrast(1.05)', '-15%']];
  const tela = `<div class="ui">
    <div class="hd"><img src="${simb(AZUL)}"><div><b>Menuzia Burger</b><span>Autoatendimento · Totem 02</span></div><div class="lang">PT ▾</div></div>
    <div class="ban"><img src="${BURGER}"><div class="bt"><small>COMBO DO DIA</small><b>Cheddar Bacon<br>+ batata + refri</b><span>R$ 44,90</span></div></div>
    <div class="cats">${cats.map(([c, a]) => `<span class="${a ? 'on' : ''}">${c}</span>`).join('')}</div>
    <div class="sec">Burgers <small>12 itens</small></div>
    <div class="gr">${itens.map(([nm, p, pos, f, tag]) => `<div class="it"><div class="ph"><img src="${BURGER}" style="object-position:${pos};filter:${f}">${tag ? `<em class="${tag.startsWith('-') ? 'off' : ''}">${tag}</em>` : ''}</div><b>${nm}</b><div class="pp"><span>R$ ${p}</span><i>+</i></div></div>`).join('')}</div>
    <div class="cart"><div class="ci"><i>3</i><div><span>Seu pedido</span><b>R$ 92,70</b></div></div></div>
    <div class="bts"><div class="cn">Cancelar</div><div class="fn">Finalizar pedido</div></div>
  </div>`;
  pecas['hero-totem'] = { w: 600, h: 1300, html: pagina(`<div class="k">
    <div class="corpo"><i class="cam"></i><div class="scr">${tela}</div>
      <div class="painel">
        <div class="pos"><div class="pt"><div class="pd"><img src="${simb(AZUL)}"><span>Aproxime ou<br>insira o cartão</span></div></div><div class="pk">${Array.from({ length: 12 }, (_, i) => `<i class="${i === 9 ? 'r' : i === 11 ? 'g' : i === 10 ? '' : ''}"></i>`).join('')}</div></div>
        <div class="prt"><span></span></div>
        <div class="nfc"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#9AA3B2" stroke-width="2" stroke-linecap="round"><path d="M8.5 8.5a5 5 0 0 1 0 7M12 6a8.5 8.5 0 0 1 0 12M15.5 3.5a12 12 0 0 1 0 17"/></svg></div>
        <div class="marca"><img src="${simb('#ffffff', AZUL)}">menuzia</div>
      </div>
    </div>
    <div class="col"></div>
    <div class="base"></div>
  </div>`, `
    .k{position:absolute;inset:0}
    .corpo{position:absolute;left:70px;top:10px;width:460px;height:1050px;border-radius:30px;background:linear-gradient(90deg,#141518 0%,#2a2d33 8%,#1b1d21 50%,#2a2d33 92%,#141518 100%);box-shadow:inset 0 0 0 2px #3a3e46,inset 0 0 0 5px #0b0c0e}
    .cam{position:absolute;left:50%;top:14px;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#1a2235;box-shadow:0 0 0 2px #050608}
    .scr{position:absolute;left:20px;top:34px;width:420px;height:746px;border-radius:10px;overflow:hidden;background:#F6F7F9}
    .painel{position:absolute;left:20px;top:796px;width:420px;height:238px;border-radius:14px;background:linear-gradient(180deg,#25282e,#17191d);box-shadow:inset 0 0 0 1px #343840}
    .pos{position:absolute;left:24px;top:22px;width:150px;height:196px;border-radius:16px;background:linear-gradient(180deg,#3b3f47,#26292f);box-shadow:inset 0 0 0 2px #4a4f59,0 8px 14px -6px rgba(0,0,0,.6);padding:12px}
    .pt{height:74px;border-radius:8px;background:#0c1220;padding:6px;box-shadow:inset 0 0 0 2px #050608}
    .pd{height:100%;border-radius:4px;background:linear-gradient(180deg,#123a6b,${AZUL});display:flex;align-items:center;gap:7px;padding:0 7px;color:#fff;font:600 10.5px/1.25 Inter}.pd img{width:22px;height:22px}
    .pk{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}
    .pk i{height:18px;border-radius:5px;background:#555b66;box-shadow:inset 0 -2px 0 #3d424b}.pk i.r{background:${VERM};box-shadow:inset 0 -2px 0 #a8222e}.pk i.g{background:#22A35A;box-shadow:inset 0 -2px 0 #137a3f}
    .prt{position:absolute;left:200px;top:40px;width:196px;height:40px;border-radius:10px;background:#101114;box-shadow:inset 0 0 0 2px #3a3e46;display:grid;place-items:center}
    .prt span{width:150px;height:6px;border-radius:3px;background:#000;box-shadow:0 1px 0 #3a3e46}
    .nfc{position:absolute;left:200px;top:100px;width:196px;height:50px;border-radius:10px;border:2px dashed #3d424b;display:flex;align-items:center;justify-content:center;gap:8px}
    .marca{position:absolute;left:200px;top:172px;width:196px;display:flex;align-items:center;justify-content:center;gap:8px;font:800 19px 'Plus Jakarta Sans';color:#E6EBF3;letter-spacing:-.01em}.marca img{width:26px;height:26px}
    .col{position:absolute;left:225px;top:1058px;width:150px;height:186px;background:linear-gradient(90deg,#111214 0%,#2e3137 20%,#1d1f23 55%,#2a2d33 85%,#111214 100%)}
    .base{position:absolute;left:40px;top:1240px;width:520px;height:50px;border-radius:14px 14px 22px 22px;background:linear-gradient(180deg,#3b3f47 0%,#24272c 35%,#121316 100%);box-shadow:inset 0 2px 0 #50555f}
    .ui{height:100%;display:flex;flex-direction:column;padding:14px 16px 14px;gap:10px;color:#0F172A}
    .hd{display:flex;align-items:center;gap:10px}.hd img{width:40px;height:40px}.hd b{display:block;font:800 16px 'Plus Jakarta Sans'}.hd span{font:500 11.5px Inter;color:#64748B}
    .lang{margin-left:auto;font:700 11.5px Inter;color:${AZUL};border:1px solid #DCE3EE;background:#fff;padding:6px 10px;border-radius:9px}
    .ban{position:relative;height:150px;border-radius:16px;overflow:hidden;flex:none}.ban img{width:100%;height:100%;object-fit:cover;display:block}
    .ban::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,30,62,.88) 0%,rgba(8,30,62,.55) 45%,rgba(8,30,62,0) 75%)}
    .bt{position:absolute;left:18px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;color:#fff;z-index:1}
    .bt small{font:800 10.5px Inter;letter-spacing:.14em;color:#FDBA74}.bt b{font:800 20px/1.15 'Plus Jakarta Sans';margin:5px 0 9px}
    .bt span{align-self:flex-start;font:800 15px Inter;background:${VERM};padding:5px 11px;border-radius:9px}
    .cats{display:flex;gap:7px;flex:none}.cats span{font:600 12px Inter;color:#334155;background:#fff;border:1px solid #E2E8F0;padding:7px 11px;border-radius:20px;white-space:nowrap}
    .cats span.on{background:${AZUL};border-color:${AZUL};color:#fff}
    .sec{font:800 16px 'Plus Jakarta Sans'}.sec small{font:500 12px Inter;color:#94A3B8;margin-left:4px}
    .gr{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .it{background:#fff;border-radius:14px;padding:8px;box-shadow:0 1px 2px rgba(15,23,42,.06),0 0 0 1px #E8ECF2}
    .ph{position:relative;height:82px;border-radius:10px;overflow:hidden}.ph img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.6)}
    .ph em{position:absolute;left:6px;top:6px;font:700 10px Inter;font-style:normal;color:#fff;background:${AZUL};padding:3px 7px;border-radius:6px}.ph em.off{background:${VERM}}
    .it b{display:block;font:700 13px Inter;margin:7px 2px 3px}
    .pp{display:flex;justify-content:space-between;align-items:center;padding:0 2px}.pp span{font:800 14px Inter;color:${AZUL}}
    .pp i{width:26px;height:26px;border-radius:8px;background:${AZUL};color:#fff;display:grid;place-items:center;font:700 18px/1 Inter;font-style:normal}
    .cart{margin-top:auto}.ci{display:flex;align-items:center;gap:10px;background:#EAF1FA;border-radius:12px;padding:8px 12px}
    .ci i{width:30px;height:30px;border-radius:50%;background:${AZUL};color:#fff;display:grid;place-items:center;font:800 13px Inter;font-style:normal}
    .ci span{display:block;font:500 11px Inter;color:#64748B}.ci b{font:800 15px Inter;color:#0F172A}
    .bts{display:grid;grid-template-columns:1fr 1.6fr;gap:10px}
    .bts div{height:48px;border-radius:12px;display:grid;place-items:center;font:700 15px Inter}
    .cn{background:#E5E7EB;color:#374151}.fn{background:${AZUL};color:#fff;box-shadow:0 6px 14px -6px rgba(10,77,148,.6)}`) };
}

(async () => {
  const so = process.argv[2];
  for (const [nome, t] of Object.entries(pecas)) {
    if (so && so !== nome) continue;
    const html = path.join(OUT, nome + '.html'), png2 = path.join(OUT, nome + '@2x.png'), png = path.join(OUT, nome + '.png');
    fs.writeFileSync(html, t.html);
    // renderiza em 2x e reduz (texto mais nítido); canvas final exato w x h
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2', `--window-size=${t.w},${t.h}`, '--virtual-time-budget=8000', '--default-background-color=00000000', `--screenshot=${png2}`, 'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
    await sharp(png2).resize(t.w, t.h, { kernel: 'lanczos3' }).png().toFile(png);
    await sharp(png).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(IMG, nome + '.webp'));
    const m = await sharp(path.join(IMG, nome + '.webp')).metadata();
    const { info } = await sharp(png).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
    console.log('ok', nome, m.width + 'x' + m.height, 'bbox', `x=${-info.trimOffsetLeft} y=${-info.trimOffsetTop} w=${info.width} h=${info.height}`);
  }
})();
