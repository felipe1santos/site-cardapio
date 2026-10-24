// Gera as telas do painel usadas na home (seção "Gestão completa"), com DADOS FICTÍCIOS e coerentes
// entre si (faturamento ≈ R$ 81 mil/30 dias, funil, origem, caixa e precificação batem).
// Uso: node telas-src/gentelas.js  → telas-src/out/*.html → Chrome headless → assets/img/telas/*.webp
// Mapa de fundo da tela de rotas: tiles © OpenStreetMap (telas-src/mapa.png). Logos: recortes do próprio painel.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const DIR = __dirname, OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'assets/img/telas');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(IMG, { recursive: true });
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(f => fs.existsSync(f));

const brl = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = v => v.toLocaleString('pt-BR');
const pct = (v, d = 1) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';
const ic = (n, cls = '') => `<span class="ms ${cls}">${n}</span>`;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ================= DADOS (tudo deriva daqui) =================
const LOJA = 'Menuzia Burger';
const FAT = 81347.60, PDV = 6435.30, VITRINE = +(FAT - PDV).toFixed(2); // 74.912,30
const PED_VIT = 1198, PED_PDV = 112, PEDIDOS = PED_VIT + PED_PDV;      // 1.310
const TICKET = FAT / PEDIDOS;                                          // 62,10

// 30 dias: 25/09 → 24/10/2026, fim de semana mais forte, leve tendência de alta
const dias = [];
for (let i = 0; i < 30; i++) { const d = new Date(Date.UTC(2026, 8, 25 + i)); dias.push(d); }
const pesoDia = [1.25, .7, .75, .85, .95, 1.3, 1.45]; // dom..sáb
let w = dias.map((d, i) => pesoDia[d.getUTCDay()] * (0.9 + rnd() * 0.2) * (0.92 + 0.16 * i / 29));
const sw = w.reduce((a, b) => a + b);
let serie = w.map(x => Math.round(x / sw * FAT * 100) / 100);
serie[29] = +(FAT - serie.slice(0, 29).reduce((a, b) => a + b)).toFixed(2);
const anterior = serie.map((v, i) => v * (0.86 + rnd() * 0.08) * (i % 7 === 3 ? 1.1 : 1));
const ddmm = d => String(d.getUTCDate()).padStart(2, '0') + '/' + String(d.getUTCMonth() + 1).padStart(2, '0');
const mesCurto = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// Funil do cardápio online
const funil = [
  { t: 'Visitas', n: 18940, s: 'visitaram seu cardápio', var: '+18,4%', ant: '100% no período anterior' },
  { t: 'Visualizações', n: 9850, s: 'abriram algum item', var: '+16,9%', ant: '50% no período anterior' },
  { t: 'Sacola', n: 3420, s: 'adicionaram itens na sacola', var: '+21,3%', ant: '17% no período anterior' },
  { t: 'Checkout', n: 1720, s: 'iniciaram o checkout', var: '+19,7%', ant: '8,6% no período anterior' },
  { t: 'Pedidos', n: PED_VIT, s: 'concluíram o pedido', var: '+22,5%', ant: '5,8% no período anterior' },
];

// Origem das visitas (soma = funil): visitas, pedidos e ticket por origem; faturamento fecha em VITRINE
const origens = [
  { n: 'Instagram', c: '#E1306C', logo: 'insta', v: 6120, p: 214, t: 61.2 },
  { n: 'WhatsApp', c: '#22A35A', logo: 'whatsapp', v: 5480, p: 618, t: 63.9 },
  { n: 'Direto', c: '#7E9CC0', logo: 'link', v: 3910, p: 236, t: 64.4 },
  { n: 'Anúncio Meta', c: '#8B6FD6', logo: 'meta', v: 2150, p: 98, t: 58.7 },
  { n: 'Google', c: '#4285F4', logo: 'google', v: 980, p: 26, t: 60.1 },
  { n: 'Facebook', c: '#1877F2', logo: 'facebook', v: 300, p: 6, t: 55 },
];
{ const bruto = origens.map(o => o.p * o.t), sb = bruto.reduce((a, b) => a + b);
  origens.forEach((o, i) => o.f = Math.round(bruto[i] / sb * VITRINE * 100) / 100);
  origens[1].f = +(VITRINE - origens.filter((_, i) => i !== 1).reduce((a, o) => a + o.f, 0)).toFixed(2); }

// Caixa dos últimos 7 dias = últimos 7 pontos da série
const caixa = dias.slice(23).map((d, k) => {
  const v = serie[23 + k], din = Math.round(v * (0.1 + rnd() * 0.05)), car = Math.round(v * (0.27 + rnd() * 0.06) * 100) / 100;
  return { d, v, din, car, pix: +(v - din - car).toFixed(2), hora: `${17 + (k % 2)}:${String(12 + Math.floor(rnd() * 40)).padStart(2, '0')}` };
});

// Insumos (preço médio de mercado, out/2026)
const insumos = [
  ['Blend bovino 160g', 'R$ 52,90/kg', 'kg', 9], ['Pão brioche', 'R$ 1,35/un', 'un', 9], ['Queijo cheddar fatiado', 'R$ 46,90/kg', 'kg', 7],
  ['Bacon em fatias', 'R$ 42,90/kg', 'kg', 5], ['Peito de frango empanado', 'R$ 31,90/kg', 'kg', 2], ['Batata palito congelada', 'R$ 21,90/kg', 'kg', 4],
  ['Molho da casa', 'R$ 19,50/kg', 'kg', 8], ['Alface americana', 'R$ 6,90/un', 'un', 6], ['Tomate', 'R$ 8,49/kg', 'kg', 6],
  ['Cebola roxa', 'R$ 7,90/kg', 'kg', 4], ['Embalagem kraft + sacola', 'R$ 1,10/un', 'un', 12], ['Coca-Cola lata 350ml', 'R$ 3,29/un', 'un', 2],
];

// Produtos: preço e custo da ficha técnica → lucro, margem e preço sugerido (CMV alvo 38%)
const produtos = [
  ['🍔', 'Burger Cheddar Bacon', 'Lanches gourmet', 34.9, 12.24], ['🍔', 'Double Smash', 'Lanches gourmet', 39.9, 15.12],
  ['🍔', 'Burger Clássico', 'Lanches gourmet', 29.9, 9.86], ['🍗', 'Chicken Crispy', 'Lanches gourmet', 31.9, 10.31],
  ['🥗', 'Burger Veggie', 'Lanches gourmet', 32.9, 11.24], ['🍔', 'X-Salada', 'Lanches tradicionais', 24.9, 8.12],
  ['🍟', 'Batata frita média', 'Porções', 16.9, 4.21], ['🍟', 'Batata cheddar e bacon', 'Porções', 24.9, 8.63],
  ['🧅', 'Onion rings', 'Porções', 19.9, 5.42], ['👫', 'Combo Casal', 'Combos promocionais', 79.9, 28.47],
  ['👨‍👩‍👧', 'Combo Família', 'Combos promocionais', 139.9, 52.36], ['🥤', 'Milkshake 400ml', 'Sobremesas', 19.9, 6.14],
  ['🥫', 'Coca-Cola lata', 'Bebidas', 6.9, 3.29], ['💧', 'Água mineral', 'Bebidas', 4.0, 2.9],
].map(([e, n, c, p, cu]) => { const l = p - cu; return { e, n, c, p, cu, l, m: l / p * 100, sug: Math.ceil(cu / 0.38) - 0.1 }; });
const margemMedia = produtos.reduce((a, x) => a + x.m, 0) / produtos.length;
const margemBaixa = produtos.filter(x => x.m < 30).length;

// ================= LAYOUT =================
const CSS = `
:root{--azul:#0B6FC0;--azul-esc:#09528f;--tinta:#1f2937;--texto:#4b5563;--suave:#8a94a6;--linha:#e7ebf1;--fundo:#f4f6fa;--roxo:#9b51f0;--verde:#16a34a;--verde-esc:#0d6b3b;--laranja:#f08a24;--vermelho:#e5484d}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:100%;height:100%}
body{font-family:'Nunito',system-ui,sans-serif;color:var(--tinta);background:var(--fundo);-webkit-font-smoothing:antialiased;font-size:14px;overflow:hidden}
.ms{font-family:'Material Symbols Rounded';font-weight:normal;font-style:normal;font-size:22px;line-height:1;display:inline-block;-webkit-font-feature-settings:'liga';font-variation-settings:'FILL' 1,'wght' 500,'GRAD' 0,'opsz' 24;vertical-align:middle}
.app{display:flex;height:100%}
.side{width:232px;flex:none;background:#fff;border-right:1px solid var(--linha);display:flex;flex-direction:column;padding:12px 10px}
.loja{display:flex;align-items:center;gap:10px;padding:4px 6px 14px;border-bottom:1px solid var(--linha);margin:0 -10px 10px;padding-left:16px;padding-right:12px}
.loja img{width:34px;height:34px;border-radius:9px}
.loja b{font-weight:800;font-size:14px;display:block;line-height:1.1}
.aberto{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:800;color:var(--verde-esc);background:#dcfce7;border-radius:6px;padding:1px 7px;margin-top:3px}
.aberto::before{content:"";width:6px;height:6px;border-radius:50%;background:#22c55e}
.loja .ms{margin-left:auto;color:#3b82f6;font-size:21px}
.nav a{display:flex;align-items:center;gap:14px;padding:9px 12px;border-radius:9px;font-weight:700;font-size:14.5px;color:#253041;margin-bottom:2px}
.nav a .ms{font-size:21px;color:#253041}
.nav a.on{background:#e8eef7;color:#0b3d6e}.nav a.on .ms{color:var(--azul)}
.novo{font-size:10.5px;font-weight:800;color:#15803d;background:#dcfce7;border-radius:5px;padding:1px 6px;margin-left:auto}
.side .rodape{margin-top:auto;display:flex;align-items:center;gap:12px;padding:10px 12px;font-weight:700;color:#253041;border-top:1px solid var(--linha);margin-left:-10px;margin-right:-10px;padding-left:20px}
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.top{height:60px;flex:none;background:#fff;border-bottom:1px solid var(--linha);display:flex;align-items:center;padding:0 22px;gap:14px}
.top h1{font-size:20px;font-weight:700;color:var(--tinta)}.top h1 small{font-size:18px;font-weight:600;color:var(--texto)}
.top .dir{margin-left:auto;display:flex;align-items:center;gap:14px}
.imp{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:800;color:var(--verde-esc);background:#e9f9ef;border:1px solid #bbe9cc;border-radius:9px;padding:6px 11px}
.sup{display:flex;align-items:center;gap:6px;background:#fff4ea;color:#c2580d;font-weight:800;border-radius:9px;padding:8px 13px;font-size:13.5px}
.av{width:34px;height:34px;border-radius:50%;background:#0b3d6e;color:#fff;display:grid;place-items:center;font-weight:800;font-size:13px}
.cont{flex:1;padding:18px 22px;overflow:hidden}
.card{background:#fff;border:1px solid var(--linha);border-radius:14px;box-shadow:0 1px 2px rgba(16,24,40,.04)}
.sub{width:236px;flex:none;background:#fff;border-right:1px solid var(--linha);padding:14px 10px}
.sub a{display:flex;align-items:center;gap:13px;padding:9px 12px;border-radius:9px;font-weight:600;font-size:14.5px;color:#374151;margin-bottom:3px}
.sub a .ms{font-size:20px;color:#4b5563}.sub a.on{background:#eef1f6;color:#111827;font-weight:700}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:7px;font-weight:800;font-size:12px;padding:3px 9px}
.btn{display:inline-flex;align-items:center;gap:6px;border:1px solid #d6dce5;background:#fff;border-radius:9px;padding:8px 14px;font-weight:700;font-size:13.5px;color:#1f2937}
.btn.pri{background:var(--azul);border-color:var(--azul);color:#fff}
.inp{border:1px solid #d6dce5;border-radius:9px;padding:9px 13px;font-size:14px;color:#9aa3b2;background:#fff;display:flex;align-items:center;gap:8px}
table{border-collapse:collapse;width:100%}
.up{color:var(--verde)}.down{color:var(--vermelho)}
`;
const FONTES = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=block" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400..700,0..1,0&display=block" rel="stylesheet">`;
const SIMB = 'data:image/svg+xml;base64,' + Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#1F3F8A"/><g transform="translate(50 50) scale(.125) translate(-413 -502)"><circle cx="148" cy="640" r="52" fill="#EE6A2C"/><path d="M262 680 V430 A105 105 0 0 1 472 430 V680 M472 430 A105 105 0 0 1 682 430 V680" fill="none" stroke="#fff" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`).toString('base64');
const logo = n => 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, 'logos', n + '.png')).toString('base64');

const MENU = [['space_dashboard', 'Dashboard'], ['receipt_long', 'Painel de Pedidos'], ['point_of_sale', 'PDV'], ['table_restaurant', 'Mesas e Comandas'], ['soup_kitchen', 'KDS'], ['list_alt', 'Pedidos'], ['payments', 'Financeiro'], ['restaurant_menu', 'Cardápio'], ['group', 'Clientes'], ['campaign', 'Campanhas'], ['loyalty', 'Fidelidade'], ['extension', 'Integrações'], ['badge', 'Equipe'], ['settings', 'Ajustes']];
const side = ativo => `<aside class="side"><div class="loja"><img src="${SIMB}" alt=""><div><b>${LOJA}</b><span class="aberto">Aberto</span></div>${ic('notifications')}</div><nav class="nav">${MENU.map(([i, t]) => `<a class="${t === ativo ? 'on' : ''}">${ic(i)}${t}${t === 'Campanhas' ? '<span class="novo">Novo</span>' : ''}</a>`).join('')}</nav><div class="rodape">${ic('open_in_new')}Ver meu cardápio</div></aside>`;
const top = titulo => `<header class="top"><h1>${titulo}</h1><div class="dir"><span class="imp">${ic('print', '')}Impressora conectada</span><span class="sup">${ic('support_agent')}Suporte</span><span class="av">MB</span></div></header>`;
const SUBFIN = [['point_of_sale', 'Caixa'], ['swap_vert', 'Fluxo de Caixa'], ['two_wheeler', 'Acerto de Motoboys'], ['qr_code_2', 'Conferir Pix'], ['sync_alt', 'Movimentações'], ['calculate', 'Precificação / CMV'], ['request_quote', 'Contas e DRE'], ['monitoring', 'Dashboard'], ['shield', 'Auditoria e Alertas'], ['person_search', 'Risco por funcionário'], ['rule', 'Regras e limites']];
const subfin = ativo => `<aside class="sub">${SUBFIN.map(([i, t]) => `<a class="${t === ativo ? 'on' : ''}">${ic(i)}${t}</a>`).join('')}</aside>`;
const pagina = (corpo, extraCss = '') => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${FONTES}<style>${CSS}${extraCss}</style></head><body>${corpo}</body></html>`;
const spark = (cor, w = 74, h = 26) => { let d = ''; for (let i = 0; i <= 14; i++) { const y = h * 0.25 + rnd() * h * 0.6 - i * 0.6; d += (i ? 'L' : 'M') + (i * w / 14).toFixed(1) + ',' + Math.max(2, y).toFixed(1); } return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d}" fill="none" stroke="${cor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${w}" cy="${d.split(',').pop()}" r="2.6" fill="${cor}"/></svg>`; };

const telas = {};

// ---------- 1. Dashboard ----------
{
  const W = 1110, H = 250, max = 4500, X = i => 76 + i * (W - 94) / 29, Y = v => 14 + (1 - v / max) * (H - 40);
  const linha = s => s.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join('');
  const area = linha(serie) + `L${X(29)},${Y(0)}L${X(0)},${Y(0)}Z`;
  const ticks = [0, 1500, 3000, 4500].map(v => `<line x1="76" x2="${W - 18}" y1="${Y(v)}" y2="${Y(v)}" stroke="#eef1f5"/><text x="68" y="${Y(v) + 4}" text-anchor="end">${v ? 'R$ ' + int(v) : 'R$ 0'}</text>`).join('');
  const xl = dias.map((d, i) => i % 2 === 0 ? `<text x="${X(i)}" y="${H + 2}" text-anchor="middle">${d.getUTCDate()} ${mesCurto[d.getUTCMonth()]}</text>` : '').join('');
  const lucro = 27904.30;
  const css = `.tabs{display:flex;gap:6px;margin-bottom:12px}.tabs span{padding:8px 15px;border-radius:9px;font-weight:700;color:#374151}.tabs .on{background:#e3eefa;color:var(--azul-esc)}
  .big{display:flex;align-items:baseline;gap:12px}.big b{font-size:30px;font-weight:800;letter-spacing:-.01em}.big em{font-style:normal;font-weight:800;color:var(--verde);font-size:14px}.big small{color:var(--texto);font-weight:600;font-size:14px}
  .lucro{display:flex;gap:18px;margin-top:4px;font-size:13.5px;font-weight:700;color:var(--texto)}.lucro b{color:var(--verde-esc)}
  svg.g text{font-size:11.5px;fill:#6b7280;font-family:Nunito}
  .leg{display:flex;gap:18px;font-size:13px;font-weight:700;margin-top:4px}.leg i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:6px;vertical-align:-1px}
  .funil{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:14px}
  .f{overflow:hidden;display:flex;flex-direction:column}.f .in{padding:13px 15px 10px}.f h4{font-size:14px;font-weight:700;color:#374151}.f .n{font-size:27px;font-weight:800;line-height:1.15}.f .s{font-size:12px;color:var(--suave)}
  .f .row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px;font-weight:800;color:var(--verde)}
  .f .barra{background:linear-gradient(180deg,#a463f5,#8b46ea);color:#fff;padding:9px 15px;margin-top:auto;position:relative}.f .barra b{font-size:17px;display:block}.f .barra span{font-size:12px;opacity:.9}
  .tempo{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:14px 18px;margin-top:14px}.tempo h4{grid-column:1/-1;font-size:15px;font-weight:800}.tempo h4 small{display:block;font-weight:600;font-size:12.5px;color:var(--suave)}
  .tp{display:flex;align-items:center;gap:12px}.tp .bola{width:40px;height:40px;border-radius:50%;display:grid;place-items:center}.tp span{font-size:13px;color:var(--texto);font-weight:600}.tp b{display:block;font-size:22px;font-weight:800}`;
  const altura = [100, 52, 18, 9.1, 6.3];
  telas.dashboard = { w: 1440, h: 930, html: pagina(`<div class="app">${side('Dashboard')}<div class="main">${top('Dashboard')}<div class="cont">
    <div class="card" style="padding:16px 18px 12px"><div class="tabs"><span class="on">Faturamento</span><span>Pedidos</span><span>Ticket médio</span><span>Lucro</span></div>
      <div class="big"><b>${brl(FAT)}</b><em>▲ 12,4%</em><small>vs. período anterior · ${int(PEDIDOS)} pedidos · ticket médio ${brl(TICKET)}</small></div>
      <div class="lucro"><span>Lucro estimado (ficha técnica): <b>${brl(lucro)}</b></span><span>CMV médio: <b>33,6%</b></span></div>
      <svg class="g" width="${W}" height="${H + 8}" viewBox="0 0 ${W} ${H + 8}" style="margin-top:6px"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b86d9" stop-opacity=".28"/><stop offset="1" stop-color="#2b86d9" stop-opacity=".03"/></linearGradient></defs>${ticks}<path d="${linha(anterior)}" fill="none" stroke="#a7b0bd" stroke-width="1.6" stroke-dasharray="3 4"/><path d="${area}" fill="url(#ga)"/><path d="${linha(serie)}" fill="none" stroke="#1f7fd6" stroke-width="2.4" stroke-linejoin="round"/>${xl}</svg>
      <div class="leg"><span><i style="background:#1f7fd6"></i>Faturamento</span><span><i style="background:#a7b0bd"></i>Período anterior</span></div></div>
    <div class="funil">${funil.map((f, i) => `<div class="card f"><div class="in"><h4>${f.t}</h4><div class="n">${int(f.n)}</div><div class="s">${f.s}</div><div class="row"><span>↗ ${f.var}</span>${spark('#22a35a')}</div></div><div class="barra" style="padding-top:${8 + (5 - i) * 9}px"><b>${pct(altura[i], i ? 1 : 0).replace(',0%', '%')}</b><span>${f.ant}</span></div></div>`).join('')}</div>
    <div class="card tempo"><h4>Análise de tempo<small>Tempo médio entre as etapas do funil de conversão</small></h4>
      ${[['visibility', '#f1e8ff', '#8b46ea', 'Visita → Visualização', '41s'], ['shopping_bag', '#fff1e3', '#ea7a12', 'Visualização → Sacola', '52s'], ['credit_card', '#e6f0fb', '#1f6fb5', 'Sacola → Checkout', '1min 38s'], ['check_circle', '#e3f7ea', '#16a34a', 'Checkout → Pedido', '58s']].map(([i, bg, c, t, v]) => `<div class="tp"><span class="bola" style="background:${bg};color:${c}">${ic(i)}</span><div><span>${t}</span><b>${v}</b></div></div>`).join('')}</div>
  </div></div></div>`, css) };
}

// ---------- 2. Resumo do período + origem ----------
{
  const tot = origens.reduce((a, o) => a + o.v, 0), totP = origens.reduce((a, o) => a + o.p, 0);
  let ang = -90; const R = 88, r = 58, cx = 110, cy = 110;
  const arco = o => { const a0 = ang * Math.PI / 180, a1 = (ang += o.v / tot * 360) * Math.PI / 180, g = (a1 - a0) > Math.PI ? 1 : 0, p = (a, rr) => (cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2);
    return `<path d="M${p(a0, R)}A${R},${R} 0 ${g} 1 ${p(a1, R)}L${p(a1, r)}A${r},${r} 0 ${g} 0 ${p(a0, r)}Z" fill="${o.c}" stroke="#fff" stroke-width="2"/>`; };
  const icone = { insta: `<svg viewBox="0 0 24 24" width="18" height="18"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".4" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/><circle cx="12" cy="12" r="4.4" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="#fff"/></svg>`,
    whatsapp: `<img src="${logo('whatsapp')}" width="18">`, link: ic('link', 'lk'), meta: `<img src="${logo('meta')}" width="20">`, facebook: `<img src="${logo('facebook')}" width="18">`,
    google: `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853"/><path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z" fill="#FBBC05"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z" fill="#EA4335"/></svg>` };
  const css = `body{background:var(--fundo)}.cont{padding:18px}
  .res{padding:18px 20px}.res h3,.org h3{font-size:16px;font-weight:800}.res h3 small,.org h3 small{display:block;font-size:12.5px;font-weight:600;color:var(--suave)}
  .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 26px;margin-top:16px}.k{display:flex;gap:12px}.k .bola{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;flex:none}
  .k h5{font-size:13.5px;font-weight:600;color:var(--texto)}.k b{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}.k p{font-size:12px;color:var(--suave);font-weight:600}.k .v{font-size:12px;font-weight:800}
  .cli{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:14px 0}.cli .card{padding:15px 18px}.cli h5{font-size:15px;font-weight:700}.cli p{font-size:12.5px;color:var(--suave)}.cli b{font-size:28px;font-weight:800;display:block;margin-top:8px}.cli b small{font-size:14px;color:var(--texto);font-weight:600}
  .org{padding:16px 20px}.org .cab{display:flex;justify-content:space-between;align-items:flex-start}.seg{display:flex;border:1px solid #cfd8e3;border-radius:10px;padding:3px}.seg span{padding:7px 14px;border-radius:7px;font-weight:700;font-size:13.5px}.seg .on{background:var(--azul);color:#fff}
  .og{display:grid;grid-template-columns:260px 1fr;gap:22px;margin-top:14px;align-items:start}
  .og svg text{font-family:Nunito}.lg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12.5px;font-weight:700;justify-content:center;margin-top:10px}.lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px}
  th{background:#f5f7fa;text-align:right;font-weight:700;color:#4b5563;font-size:13px;padding:11px 14px}th:first-child,td:first-child{text-align:left}
  td{padding:10px 14px;border-top:1px solid #eef1f5;text-align:right;font-weight:600;font-size:13.5px}td .o{display:flex;align-items:center;gap:9px}td .o i{width:10px;height:10px;border-radius:3px;display:inline-block}
  .lk{font-size:18px;color:#64748b}tr.t td{font-weight:800;border-top:2px solid #e2e7ee}.conv{font-weight:800}`;
  telas.resumo = { w: 1240, h: 862, html: pagina(`<div class="cont">
    <div class="card res"><h3>Resumo do período<small>Últimos 30 dias, comparado com o período anterior de mesmo tamanho</small></h3><div class="kp">
      <div class="k"><span class="bola" style="background:#e3f7ea;color:#16a34a">${ic('payments')}</span><div><h5>Faturamento</h5><b>${brl(FAT)} ${spark('#22a35a', 64, 22)}</b><p>Vitrine ${brl(VITRINE)} (${int(PED_VIT)}) · PDV/balcão ${brl(PDV)} (${PED_PDV})</p><span class="v up">↗ +12,4% vs. período anterior</span></div></div>
      <div class="k"><span class="bola" style="background:#fff1e3;color:#ea7a12">${ic('confirmation_number')}</span><div><h5>Ticket médio</h5><b>${brl(TICKET)} ${spark('#22a35a', 64, 22)}</b><span class="v up">↗ +3,1% vs. período anterior</span></div></div>
      <div class="k"><span class="bola" style="background:#f1e8ff;color:#8b46ea">${ic('two_wheeler')}</span><div><h5>Tempo médio na rua</h5><b>27min</b><p>1.084 entregas medidas · do pedido feito à entrega 46min</p><span class="v up">↘ −8,2% vs. período anterior</span></div></div>
      <div class="k"><span class="bola" style="background:#e6f0fb;color:#1f6fb5">${ic('check_circle')}</span><div><h5>Taxa de conclusão</h5><b>97%</b><span class="v up">↗ +1,2% vs. período anterior</span></div></div>
      <div class="k"><span class="bola" style="background:#fdf6d8;color:#b7791f">${ic('schedule')}</span><div><h5>Horário de pico</h5><b>19h – 21h</b><p>sexta e sábado concentram 38% das vendas</p></div></div>
      <div class="k"><span class="bola" style="background:#fff1e3;color:#ea7a12">${ic('shopping_cart')}</span><div><h5>Itens por pedido</h5><b>2,4</b></div></div>
    </div></div>
    <div class="cli"><div class="card"><h5>Clientes no período</h5><p>Pessoas diferentes que pediram no recorte selecionado</p><b>742</b></div><div class="card"><h5>Clientes novos</h5><p>Fizeram o primeiro pedido dentro do período</p><b>268 <small>(36%)</small></b></div><div class="card"><h5>Clientes recorrentes</h5><p>Já haviam pedido antes e voltaram</p><b>474 <small>(64%)</small></b></div></div>
    <div class="card org"><div class="cab"><h3>Origem das visitas<small>De onde vêm as visitas e os pedidos do cardápio online (Instagram, WhatsApp, Google, QR Code...) no período escolhido.</small></h3><div class="seg"><span class="on">Visitas</span><span>Pedidos</span><span>Faturamento</span></div></div>
      <div class="og"><div><svg width="220" height="220" viewBox="0 0 220 220" style="display:block;margin:0 auto">${origens.map(arco).join('')}<text x="110" y="110" text-anchor="middle" font-size="25" font-weight="800" fill="#1f2937">${int(tot)}</text><text x="110" y="130" text-anchor="middle" font-size="13" fill="#6b7280" font-weight="600">visitas</text></svg><div class="lg">${origens.map(o => `<span><i style="background:${o.c}"></i>${o.n}</span>`).join('')}</div></div>
      <table><thead><tr><th>Origem</th><th>Visitas</th><th>Pedidos</th><th>Conversão</th><th>Faturamento</th></tr></thead><tbody>${origens.map(o => `<tr><td><span class="o"><i style="background:${o.c}"></i>${icone[o.logo]}${o.n}</span></td><td>${int(o.v)}</td><td>${int(o.p)}</td><td class="conv">${pct(o.p / o.v * 100)}</td><td>${brl(o.f)}</td></tr>`).join('')}<tr class="t"><td>Total</td><td>${int(tot)}</td><td>${int(totP)}</td><td>${pct(totP / tot * 100)}</td><td>${brl(VITRINE)}</td></tr></tbody></table></div></div>
  </div>`, css) };
}

// ---------- 3. Despacho de rotas ----------
{
  // posições em px da tela (1440x900); mapa = telas-src/mapa.png deslocado
  const loja = [640, 582];
  const peds = [
    { id: 438, n: 'Mariana Costa', end: 'Av. Champagnat, 1450', b: 'Praia da Costa', pg: 'PIX', v: 74.8, st: 'rota', min: 18, xy: [1010, 470], mb: 'Diego' },
    { id: 439, n: 'Rafael Lima', end: 'Rua Henrique Moscoso, 820', b: 'Centro', pg: 'CARTÃO', v: 58.9, st: 'rota', min: 14, xy: [800, 780], mb: 'Diego' },
    { id: 440, n: 'Juliana Rocha', end: 'Rua Ceará, 312', b: 'Praia da Costa', pg: 'PIX', v: 112.7, st: 'aguardando', min: 9, xy: [1000, 655] },
    { id: 441, n: 'Pedro Henrique', end: 'Rua Sete de Setembro, 95', b: 'Centro', pg: 'DINHEIRO', v: 46.8, st: 'aguardando', min: 6, xy: [520, 660], troco: 'Troco R$ 50' },
    { id: 442, n: 'Camila Souza', end: 'Rua Goiânia, 410', b: 'Itapuã', pg: 'PIX', v: 89.6, st: 'aguardando', min: 4, xy: [905, 865] },
    { id: 436, n: 'Lucas Fernandes', end: 'Rua Luciano das Neves, 1210', b: 'Divino Espírito Santo', pg: 'CARTÃO', v: 63.9, st: 'entregue', min: 41, xy: [470, 560] },
  ];
  const cor = { aguardando: '#f5a524', rota: '#1f6fd6', entregue: '#16a34a' };
  const rot = { aguardando: 'Aguardando', rota: 'Em rota', entregue: 'Entregue' };
  const mbs = [['Diego Martins', 2, 'rota', 'DM', '#1f6fd6'], ['Thiago Alves', 0, 'livre', 'TA', '#16a34a'], ['Bruno Ramos', 0, 'livre', 'BR', '#16a34a'], ['André Souza', 1, 'voltando', 'AS', '#8b5cf6']];
  const pin = p => `<div class="pin" style="left:${p.xy[0]}px;top:${p.xy[1]}px;--c:${cor[p.st]}"><span>#${p.id}</span></div>`;
  const css = `body{background:#dfe5ec}.mapa{position:absolute;inset:0;background:url(../mapa.png) -230px -380px/auto;filter:grayscale(.55) saturate(.75) brightness(1.03) contrast(.96)}
  .tinta{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(16,62,120,.06))}
  .bar{position:absolute;left:14px;right:14px;top:12px;height:64px;background:#fff;border-radius:14px;box-shadow:0 8px 24px -12px rgba(15,30,60,.35);display:flex;align-items:center;padding:0 18px;gap:10px}
  .bar h2{font-size:18px;font-weight:800}.bar h2 small{display:block;font-size:12.5px;font-weight:600;color:var(--suave)}
  .fl{margin-left:auto;display:flex;gap:8px;align-items:center}.fl em{font-style:normal;font-size:11.5px;font-weight:800;color:#6b7280;letter-spacing:.04em;margin-right:4px}
  .f{display:flex;align-items:center;gap:7px;border-radius:9px;padding:7px 11px;font-weight:800;font-size:12px;letter-spacing:.02em;color:#fff}.f i{font-style:normal;background:rgba(255,255,255,.28);border-radius:6px;padding:0 6px}
  .lista{position:absolute;left:14px;top:88px;width:336px;bottom:14px;background:#fff;border-radius:14px;box-shadow:0 10px 30px -12px rgba(15,30,60,.4);overflow:hidden}
  .lista .h{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;background:#0f1b3d;color:#fff;font-weight:800}.lista .h i{font-style:normal;background:rgba(255,255,255,.18);border-radius:999px;padding:1px 9px;font-size:12px}
  .pd{margin:9px 10px 0;border:1px solid var(--linha);border-left:4px solid var(--c);border-radius:11px;padding:9px 11px}
  .pd .l1{display:flex;align-items:center;gap:8px}.pd .id{background:var(--c);color:#fff;font-weight:800;font-size:11.5px;border-radius:6px;padding:1px 6px}.pd b{font-size:14px;font-weight:800}.pd .t{margin-left:auto;font-size:11.5px;font-weight:700;color:var(--suave)}
  .pd .e{font-size:12.5px;color:var(--texto);margin:4px 0 6px}.pd .l3{display:flex;align-items:center;gap:6px}.tag{font-size:10.5px;font-weight:800;border-radius:5px;padding:2px 7px;letter-spacing:.02em}
  .pd .val{margin-left:auto;font-weight:800;font-size:14px}.st{font-size:10.5px;font-weight:800;color:var(--c)}
  .ent{position:absolute;right:14px;top:88px;width:300px;background:#fff;border-radius:14px;box-shadow:0 10px 30px -12px rgba(15,30,60,.4);overflow:hidden}
  .ent .h{display:flex;justify-content:space-between;align-items:center;padding:13px 15px;background:#0f1b3d;color:#fff;font-weight:800}.ent .h i{font-style:normal;background:#22c55e;border-radius:999px;padding:1px 9px;font-size:12px}
  .mb{display:flex;align-items:center;gap:10px;padding:10px 14px;border-top:1px solid #eef1f5}.mb .a{width:34px;height:34px;border-radius:50%;color:#fff;font-weight:800;font-size:12px;display:grid;place-items:center;position:relative}.mb .a::after{content:"";position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-radius:50%;background:#22c55e;border:2px solid #fff}
  .mb b{font-size:13.5px;font-weight:800;display:block}.mb small{font-size:11.5px;color:var(--suave);font-weight:700}.mb .n{margin-left:auto;background:#eef6ff;color:#1f6fd6;font-weight:800;border-radius:8px;padding:3px 9px;font-size:12px}
  .pin{position:absolute;transform:translate(-50%,-100%);filter:drop-shadow(0 6px 8px rgba(15,30,60,.35))}
  .pin span{display:block;background:var(--c);color:#fff;font-weight:900;font-size:12.5px;padding:5px 9px;border-radius:10px;border:2px solid #fff;position:relative}
  .pin span::after{content:"";position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);border:6px solid transparent;border-top-color:var(--c);border-bottom:0}
  .pin::after{content:"";position:absolute;left:50%;bottom:-13px;width:10px;height:10px;transform:translateX(-50%);border-radius:50%;background:var(--c);border:2px solid #fff;box-shadow:0 0 0 6px color-mix(in srgb,var(--c) 22%,transparent)}
  .lojapin{position:absolute;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:#0f1b3d;border:3px solid #fff;display:grid;place-items:center;color:#fff;box-shadow:0 0 0 10px rgba(15,27,61,.15),0 10px 20px -6px rgba(0,0,0,.5)}.lojapin .ms{font-size:26px}
  .lojatag{position:absolute;transform:translate(-50%,0);background:#0f1b3d;color:#fff;font-weight:800;font-size:11.5px;border-radius:7px;padding:3px 8px;white-space:nowrap}
  .moto{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;background:#fff;border-radius:999px;padding:3px 10px 3px 3px;box-shadow:0 8px 18px -8px rgba(15,30,60,.55);font-weight:800;font-size:12px}
  .moto .ms{width:28px;height:28px;border-radius:50%;background:#1f6fd6;color:#fff;display:grid;place-items:center;font-size:18px}
  .pop{position:absolute;width:260px;background:#fff;border-radius:14px;box-shadow:0 18px 40px -14px rgba(15,30,60,.55);padding:14px 16px;transform:translate(-50%,-100%)}
  .pop::after{content:"";position:absolute;left:50%;bottom:-8px;transform:translateX(-50%) rotate(45deg);width:16px;height:16px;background:#fff}.pop.lado{transform:translate(0,-50%)}.pop.lado::after{left:-7px;top:50%;bottom:auto;transform:translateY(-50%) rotate(45deg)}
  .pop .h{display:flex;align-items:center;gap:8px;font-weight:800}.pop .h em{font-style:normal;margin-left:auto;font-size:11px;background:#fff4dc;color:#a16207;border-radius:6px;padding:2px 7px}
  .pop p{font-size:12.5px;color:var(--texto);margin-top:3px}.pop .acao{display:flex;gap:8px;margin-top:10px}.pop .acao span{flex:1;text-align:center;border-radius:9px;padding:7px;font-weight:800;font-size:12.5px}
  .zoom{position:absolute;right:14px;bottom:30px;background:#fff;border-radius:10px;box-shadow:0 6px 16px -8px rgba(0,0,0,.4);display:grid}.zoom span{width:38px;height:38px;display:grid;place-items:center;font-size:22px;font-weight:700;color:#374151}.zoom span+span{border-top:1px solid #eee}
  .attr{position:absolute;right:0;bottom:0;background:rgba(255,255,255,.85);font-size:10.5px;padding:2px 8px;color:#555}`;
  const motoPos = [[905, 540, 'Diego'], [455, 700, 'André']];
  const rota = `<svg style="position:absolute;inset:0" width="1440" height="900"><path d="M${loja[0]},${loja[1]} C760,560 860,520 905,540 S990,490 1010,470" fill="none" stroke="#1f6fd6" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" opacity=".9"/><path d="M905,540 C880,650 820,730 800,780" fill="none" stroke="#1f6fd6" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" opacity=".55"/></svg>`;
  const pop = peds[2];
  telas.rotas = { w: 1440, h: 900, html: pagina(`<div class="mapa"></div><div class="tinta"></div>${rota}
    <div class="lojapin" style="left:${loja[0]}px;top:${loja[1]}px">${ic('storefront')}</div><div class="lojatag" style="left:${loja[0]}px;top:${loja[1] + 32}px">${LOJA}</div>
    ${peds.map(pin).join('')}${motoPos.map(([x, y, n]) => `<div class="moto" style="left:${x}px;top:${y}px">${ic('two_wheeler')}${n}</div>`).join('')}
    <div class="pop lado" style="left:${pop.xy[0] + 26}px;top:${pop.xy[1] - 30}px"><div class="h">#${pop.id} · ${pop.n}<em>${pop.min} min</em></div><p>${pop.end} · ${pop.b}</p><p>${pop.pg} · <b>${brl(pop.v)}</b> · 2,1 km da loja</p><div class="acao"><span style="background:#1f6fd6;color:#fff">Atribuir motoboy</span><span style="background:#eef1f5">Ver pedido</span></div></div>
    <div class="bar"><h2>Despacho de rotas<small>Visão do dia — marque os pedidos e atribua a um entregador</small></h2><div class="fl"><em>VER NO MAPA</em>
      <span class="f" style="background:#0f1b3d">${ic('visibility', '')}TODOS <i>${peds.length}</i></span><span class="f" style="background:${cor.aguardando}">AGUARDANDO <i>3</i></span><span class="f" style="background:${cor.rota}">EM ROTA <i>2</i></span><span class="f" style="background:${cor.entregue}">ENTREGUES <i>31</i></span><span class="f" style="background:#0B6FC0">${ic('add')}MOTOBOY</span></div></div>
    <div class="lista"><div class="h">Pedidos de hoje <i>${peds.length}</i></div>${peds.map(p => `<div class="pd" style="--c:${cor[p.st]}"><div class="l1"><span class="id">#${p.id}</span><b>${p.n}</b><span class="t">há ${p.min} min</span></div><div class="e">${p.end} · ${p.b}</div><div class="l3"><span class="tag" style="background:#eef4ff;color:#1f5fbf">${p.pg}</span>${p.troco ? `<span class="tag" style="background:#fff4dc;color:#a16207">${p.troco}</span>` : ''}<span class="st">${rot[p.st]}${p.mb ? ' · ' + p.mb : ''}</span><span class="val">${brl(p.v)}</span></div></div>`).join('')}</div>
    <div class="ent"><div class="h">Entregadores <i>4 online</i></div>${mbs.map(([n, q, s, a, c]) => `<div class="mb"><span class="a" style="background:${c}">${a}</span><div><b>${n}</b><small>${s === 'rota' ? 'Em rota · 2 entregas' : s === 'voltando' ? 'Voltando pra loja' : 'Disponível na loja'}</small></div><span class="n">${q} ${ic('inventory_2', '')}</span></div>`).join('')}</div>
    <div class="zoom"><span>+</span><span>−</span></div><div class="attr">© OpenStreetMap</div>`, css) };
}

// ---------- 4. Fluxo de caixa ----------
{
  const t = k => caixa.reduce((a, c) => a + c[k], 0);
  const css = `.resumo{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;font-weight:600;color:var(--texto);margin-bottom:12px}.resumo b{color:var(--tinta);font-weight:800;margin-left:3px}.resumo .ms{font-size:17px;margin-right:2px}
  .filtros{display:flex;gap:10px;align-items:center;margin-bottom:12px}.filtros .dir{margin-left:auto;display:flex;gap:8px}
  .tab{overflow:hidden}th{background:#f5f7fa;text-align:right;font-weight:700;color:#4b5563;font-size:13px;padding:12px 14px;white-space:nowrap}th:nth-child(-n+3),td:nth-child(-n+3){text-align:left}
  td{padding:11px 14px;border-top:1px solid #eef1f5;text-align:right;font-weight:600;font-size:13.5px;white-space:nowrap}td small{display:block;font-size:11.5px;color:#b45309;font-weight:600;white-space:normal;max-width:150px}td.d b{font-weight:800}
  .stt{background:#0d6b3b;color:#fff;font-weight:800;font-size:12px;border-radius:7px;padding:4px 9px}.stt.ab{background:#1f6fd6}
  td .ab2{font-size:12px;color:var(--suave);display:block}tr.tot td{background:#e9f4fd;font-weight:800;border-top:2px solid #cfe3f6}.ok{color:var(--verde);font-weight:800}`;
  const fatSemana = t('v');
  telas.fluxo = { w: 1440, h: 820, html: pagina(`<div class="app">${side('Financeiro')}<div class="main">${top('Financeiro <small>› Fluxo de Caixa</small>')}<div style="display:flex;flex:1;min-height:0">${subfin('Fluxo de Caixa')}<div class="cont">
    <div class="resumo"><span>${ic('trending_up', 'up')}Vendido<b>${brl(fatSemana)}</b></span><span>${ic('payments', 'up')}Recebido<b>${brl(fatSemana)}</b></span><span>${ic('account_balance_wallet')}Dinheiro<b>${brl(t('din'))}</b></span><span>${ic('qr_code_2')}Pix<b>${brl(t('pix'))}</b></span><span>${ic('credit_card')}Cartão<b>${brl(t('car'))}</b></span><span>${ic('task_alt', 'up')}Diferenças<b class="ok">R$ 0,00</b></span></div>
    <div class="filtros"><span class="inp" style="color:#1f2937;font-weight:700">7 dias ${ic('expand_more')}</span><span class="inp" style="color:#1f2937">${ddmm(caixa[0].d)}/2026</span>a<span class="inp" style="color:#1f2937">${ddmm(caixa[6].d)}/2026</span><span class="btn">${ic('filter_list')}Filtros</span><div class="dir"><span class="btn">${ic('bar_chart')}</span><span class="btn">${ic('download')}CSV</span><span class="btn">${ic('picture_as_pdf')}PDF</span></div></div>
    <div class="card tab"><table><thead><tr><th>Data</th><th>Status</th><th>Abertura</th><th>Vendido</th><th>Dinheiro</th><th>Pix</th><th>Cartão</th><th>Diferença</th></tr></thead><tbody>
      ${caixa.slice().reverse().map((c, k) => `<tr><td class="d"><b>${ddmm(c.d)}/2026</b><small>${k === 0 ? 'Turno aberto agora' : 'Fechado às 05h00'}</small></td><td><span class="stt ${k === 0 ? 'ab' : ''}">${k === 0 ? 'Aberto' : 'Fechado'}</span></td><td>Automático (1ª venda)<span class="ab2">${ddmm(c.d)}, ${c.hora}</span></td><td><b>${brl(c.v)}</b></td><td>${brl(c.din)}</td><td>${brl(c.pix)}</td><td>${brl(c.car)}</td><td class="ok">R$ 0,00</td></tr>`).join('')}
      <tr class="tot"><td>Totais (7 turnos)</td><td></td><td></td><td>${brl(fatSemana)}</td><td>${brl(t('din'))}</td><td>${brl(t('pix'))}</td><td>${brl(t('car'))}</td><td class="ok">R$ 0,00</td></tr></tbody></table></div>
  </div></div></div></div>`, css) };
}

// ---------- 5. Insumos ----------
{
  const css = `.bar{display:flex;gap:10px;margin-bottom:14px}.bar .inp{width:300px}.bar .dir{margin-left:auto;display:flex;gap:10px}
  .ins{display:flex;align-items:center;gap:14px;padding:12px 16px;margin-bottom:8px}.ins .ic{width:38px;height:38px;border-radius:10px;background:#eef4fb;color:#1f6fb5;display:grid;place-items:center}
  .ins b{font-size:15px;font-weight:800;display:block}.ins small{font-size:12.5px;color:var(--suave);font-weight:600}.ins .p{margin-left:auto;font-weight:800;font-size:15px;margin-right:6px}.ins .btn{padding:7px 12px}
  .dica{display:flex;gap:10px;align-items:center;background:#eaf3fd;border:1px solid #cde2f7;color:#0b4f8a;border-radius:12px;padding:10px 14px;font-weight:700;font-size:13.5px;margin-bottom:14px}`;
  const icn = ['lunch_dining', 'bakery_dining', 'egg', 'kebab_dining', 'set_meal', 'tapas', 'water_drop', 'eco', 'nutrition', 'eco', 'takeout_dining', 'local_drink'];
  telas.insumos = { w: 1440, h: 870, html: pagina(`<div class="app">${side('Financeiro')}<div class="main">${top('Financeiro <small>› Precificação / CMV</small>')}<div style="display:flex;flex:1;min-height:0">${subfin('Precificação / CMV')}<div class="cont">
    <div class="bar"><span class="inp">${ic('search')}Buscar insumo</span><div class="dir"><span class="btn pri">${ic('add')}Novo insumo</span><span class="btn" style="min-width:150px">Insumos ${ic('expand_more')}</span></div></div>
    <div class="dica">${ic('lightbulb')}Atualize o preço do insumo e o custo de todas as fichas técnicas que usam ele é recalculado na hora.</div>
    ${insumos.slice(0, 10).map(([n, p, u, q], i) => `<div class="card ins"><span class="ic">${ic(icn[i])}</span><div><b>${n}</b><small>${p.replace('/', ' por 1 ')} · usado em ${q} produtos</small></div><span class="p">${p}</span><span class="btn">${ic('history')}Histórico</span><span class="btn">Editar</span></div>`).join('')}
  </div></div></div></div>`, css) };
}

// ---------- 6. Precificação ----------
{
  const ficha = [['Pão brioche', '1 un', 1.35], ['Blend bovino', '120 g', 6.35], ['Queijo cheddar', '30 g', 1.41], ['Bacon em fatias', '25 g', 1.07], ['Molho da casa', '25 g', 0.49], ['Alface e tomate', '—', 0.47], ['Embalagem kraft + sacola', '1 un', 1.10]];
  const cf = ficha.reduce((a, x) => a + x[2], 0); // = custo do Burger Cheddar Bacon (12,41)... ajustado abaixo
  const bc = produtos[0], taxa = +(bc.p * 0.0349).toFixed(2), lucroReal = bc.p - bc.cu - taxa;
  const css = `.chips{display:flex;gap:8px;margin-bottom:12px;align-items:center}.chips .c{display:flex;align-items:center;gap:6px;border:1px dashed #d4dbe5;border-radius:10px;padding:6px 11px;font-size:13px;font-weight:700;color:var(--texto)}.chips .c b{color:var(--tinta)}.chips .dir{margin-left:auto}
  .filtros{display:flex;gap:10px;margin-bottom:12px}
  .tab{overflow:hidden}th{background:#f5f7fa;text-align:right;font-weight:700;color:#4b5563;font-size:13px;padding:11px 12px}th:nth-child(-n+3),td:nth-child(-n+3){text-align:left}
  td{padding:7px 12px;border-top:1px solid #eef1f5;text-align:right;font-weight:700;font-size:13.5px;white-space:nowrap}
  td .pr{display:flex;align-items:center;gap:10px;font-weight:800;text-transform:uppercase;font-size:13px}td .pr i{font-style:normal;width:32px;height:32px;border-radius:8px;background:#f4f1ec;display:grid;place-items:center;font-size:18px}
  td.cat{color:#6b7280;font-weight:600;text-transform:uppercase;font-size:12.5px}.at{background:#0d6b3b;color:#fff;border-radius:6px;padding:3px 8px;font-size:11.5px;font-weight:800}
  .mg{display:inline-block;min-width:58px;text-align:center;border-radius:7px;padding:3px 8px;font-weight:800;font-size:12.5px}.mg.b{background:#dcfce7;color:#0d6b3b}.mg.m{background:#fef3c7;color:#92400e}.mg.r{background:#fee2e2;color:#b91c1c}
  .sg{color:#6b7280}.sg.alto{color:#b91c1c}.lc{color:var(--verde-esc)}
  .ficha{margin-top:14px;padding:16px 20px;display:grid;grid-template-columns:1.25fr 1fr;gap:10px 30px;border-color:#cfe0f3;box-shadow:0 18px 40px -22px rgba(15,30,60,.35)}.ficha h4{grid-column:1/-1}.ficha ul{margin:0}
  .ficha h4{font-size:15px;font-weight:800;display:flex;align-items:center;gap:8px}.ficha h4 em{font-style:normal;margin-left:auto;font-size:11.5px;color:#0b4f8a;background:#e6f0fb;border-radius:6px;padding:2px 8px}
  .ficha ul{list-style:none;margin:10px 0;font-size:13px}.ficha li{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed #eceff4;color:var(--texto);font-weight:600}.ficha li span:last-child{color:var(--tinta);font-weight:700}
  .ficha .tt{display:flex;justify-content:space-between;font-weight:700;font-size:13.5px;padding:3px 0}.ficha .lr{margin-top:8px;background:linear-gradient(135deg,#0d6b3b,#16a34a);color:#fff;border-radius:11px;padding:11px 14px;display:flex;justify-content:space-between;align-items:center}
  .ficha .lr b{font-size:22px;font-weight:900}.ficha .lr small{display:block;font-size:12px;opacity:.9;font-weight:700}`;
  // ajusta o último item da ficha pra fechar exatamente no custo cadastrado
  if (Math.abs(cf - bc.cu) > 0.005) throw new Error('ficha não fecha: ' + cf);
  telas.precificacao = { w: 1440, h: 940, html: pagina(`<div class="app">${side('Financeiro')}<div class="main">${top('Financeiro <small>› Precificação / CMV</small>')}<div style="display:flex;flex:1;min-height:0;position:relative">${subfin('Precificação / CMV')}<div class="cont">
    <div class="chips"><span class="c">${ic('check_circle', 'up')}Com ficha <b>35</b></span><span class="c">${ic('warning', '')}Sem ficha <b>0</b></span><span class="c">${ic('trending_up', 'up')}Margem média <b>${pct(margemMedia, 0)}</b></span><span class="c" style="border-color:#f5b4b4">${ic('trending_down', 'down')}Margem baixa (&lt; 30%) <b>${margemBaixa}</b></span><span class="btn dir" style="min-width:160px">Precificação ${ic('expand_more')}</span></div>
    <div class="filtros"><span class="inp" style="width:220px">${ic('search')}Buscar produto</span><span class="inp" style="color:#1f2937">Todas as categorias ${ic('expand_more')}</span><span class="inp" style="color:#1f2937">Todos os status ${ic('expand_more')}</span><span class="inp" style="color:#1f2937">Menor margem primeiro ${ic('expand_more')}</span><span class="btn" style="margin-left:auto">${ic('download')}CSV</span></div>
    <div class="card tab"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Status</th><th>Preço</th><th>Custo</th><th>Lucro</th><th>Margem</th><th>Sugerido</th></tr></thead><tbody>
      ${produtos.slice().sort((a, b) => a.m - b.m).slice(0, 8).map(x => `<tr><td><span class="pr"><i>${x.e}</i>${x.n}</span></td><td class="cat">${x.c}</td><td><span class="at">Ativo</span></td><td>${brl(x.p)}</td><td>${brl(x.cu)}</td><td class="lc">${brl(x.l)}</td><td><span class="mg ${x.m < 30 ? 'r' : x.m < 55 ? 'm' : 'b'}">${pct(x.m, 0)}</span></td><td class="sg ${x.sug > x.p + 0.5 ? 'alto' : ''}">${brl(x.sug)}</td></tr>`).join('')}
    </tbody></table></div>
    <div class="card ficha"><h4>${ic('receipt_long', '')}Ficha técnica · ${bc.n}<em>CMV ${pct(bc.cu / bc.p * 100, 1)}</em></h4><ul>${ficha.map(([n, q, v]) => `<li><span>${n} · ${q}</span><span>${brl(v)}</span></li>`).join('')}</ul>
      <div><div class="tt"><span>Custo da ficha</span><span>${brl(bc.cu)}</span></div><div class="tt"><span>Taxa do cartão (3,49%)</span><span>${brl(taxa)}</span></div><div class="tt"><span>Preço de venda</span><span>${brl(bc.p)}</span></div>
      <div class="lr"><div><small>Lucro real por venda</small><b>${brl(lucroReal)}</b></div><div style="text-align:right"><small>margem real</small><b>${pct(lucroReal / bc.p * 100, 0)}</b></div></div></div></div></div>
  </div></div>`, css) };
}

// ---------- 7. Integrações ----------
{
  const card = (l, n, st, extra = '') => `<div class="card it"><img src="${logo(l)}" alt=""><div><b>${n}</b><span class="${st === 'Ativa' ? 'at' : 'dp'}">${st === 'Ativa' ? '● ' : ''}${st}</span>${extra}</div>${ic('chevron_right', 'sx')}</div>`;
  const css = `.cont{overflow:hidden}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.it{display:flex;align-items:center;gap:16px;padding:16px 18px;min-height:84px}.it img{width:52px;height:52px;object-fit:contain;flex:none}
  .it b{display:block;font-size:16.5px;font-weight:700;margin-bottom:4px}.at{font-size:12px;font-weight:800;color:#15803d;background:#dcfce7;border-radius:6px;padding:2px 8px}.dp{font-size:12px;font-weight:800;color:#7e22ce;background:#f3e8ff;border-radius:6px;padding:2px 8px}
  .sx{margin-left:auto;color:#9aa3b2;font-size:26px}h5{font-size:12.5px;letter-spacing:.06em;color:#6b7280;font-weight:800;margin:20px 0 4px}h3{font-size:19px;font-weight:700;margin:12px 0 10px;color:#374151}
  .sug{display:flex;align-items:center;gap:6px;border:1px solid #d6dce5;border-radius:9px;padding:6px 12px;font-weight:700;font-size:13px;color:#374151}`;
  telas.integracoes = { w: 1440, h: 830, html: pagina(`<div class="app">${side('Integrações')}<div class="main"><header class="top"><h1>Integrações</h1><div class="dir"><span class="sug">${ic('lightbulb')}Sugerir integração</span><span class="imp">${ic('print')}Impressora conectada</span><span class="sup">${ic('support_agent')}Suporte</span><span class="av">MB</span></div></header><div class="cont">
    <h5>CONECTADAS</h5><div class="grid" style="margin-top:8px">${card('whatsapp', 'WhatsApp', 'Ativa')}${card('facebook', 'Facebook Pixel', 'Ativa')}${card('meta', 'API de Conversões (Meta)', 'Ativa')}</div>
    <h5>INTEGRAÇÕES DISPONÍVEIS</h5>
    <h3>Pagamentos e medição</h3><div class="grid">${card('mercadopago', 'Mercado Pago', 'Disponível')}${card('ga', 'Google Analytics / Tag Manager', 'Disponível')}</div>
    <h3>Pedidos de apps</h3><div class="grid">${card('ifood', 'iFood', 'Disponível')}${card('keeta', 'Keeta', 'Disponível')}${card('99food', '99Food', 'Disponível')}${card('aiqfome', 'aiqfome', 'Disponível')}</div>
    <h3>Entregas</h3><div class="grid">${card('uber', 'Uber Direct', 'Disponível')}${card('lalamove', 'Lalamove', 'Disponível')}${card('foody', 'Foody Delivery', 'Disponível')}</div>
  </div></div></div>`, css) };
}

// ================= RENDER =================
(async () => {
  const so = process.argv[2];
  for (const [nome, t] of Object.entries(telas)) {
    if (so && so !== nome) continue;
    const html = path.join(OUT, nome + '.html'), png = path.join(OUT, nome + '.png');
    fs.writeFileSync(html, t.html);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2', `--window-size=${t.w},${t.h}`, '--virtual-time-budget=8000', '--default-background-color=00000000', `--screenshot=${png}`, 'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
    await sharp(png).resize({ width: Math.min(t.w * 2, 2000) }).webp({ quality: 86 }).toFile(path.join(IMG, nome + '.webp'));
    console.log('ok', nome, t.w + 'x' + t.h);
  }
  console.log({ FAT, VITRINE, PEDIDOS, TICKET: TICKET.toFixed(2), soma30: serie.reduce((a, b) => a + b).toFixed(2), semana: caixa.reduce((a, c) => a + c.v, 0).toFixed(2), margemMedia: margemMedia.toFixed(1), margemBaixa });
})();
