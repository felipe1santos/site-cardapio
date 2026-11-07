// ===== CONFIGURAÇÃO =====
const WHATSAPP = '5527992534407'; // DDI + DDD + número, só dígitos
const FIM_PROMO = new Date('2027-01-01T23:59:59-03:00'); // promoção vale durante todo o dia 01/01/2027
// ===================================================

const texto = encodeURIComponent('Olá! Quero solicitar uma demonstração do Menuzia.');
document.querySelectorAll('[data-demo]').forEach((a) => {
  const msg = a.dataset.plano ? encodeURIComponent(`Olá! Quero o plano ${a.dataset.plano} do Menuzia.`) : texto;
  a.href = `https://wa.me/${WHATSAPP}?text=${msg}`;
  a.target = '_blank';
  a.rel = 'noopener';
});

document.getElementById('ano').textContent = new Date().getFullYear();

// Cronômetro com virada de placar
const crono = document.getElementById('crono');
const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const placas = Object.fromEntries([...crono.querySelectorAll('[data-u]')].map((el) => [el.dataset.u, {
  el,
  cima: el.querySelector('.f-c span'),
  baixo: el.querySelector('.f-b span'),
  dobraCima: el.querySelector('.f-fc span'),
  dobraBaixo: el.querySelector('.f-fb span'),
  valor: '',
}]));
function virar(p, novo) {
  if (p.valor === novo) return;
  const velho = p.valor;
  p.valor = novo;
  if (!velho || reduzMovimento) {
    p.cima.textContent = novo;
    p.baixo.textContent = novo;
    return;
  }
  p.el.classList.remove('vira');
  p.dobraCima.textContent = velho;
  p.dobraBaixo.textContent = novo;
  p.cima.textContent = novo;
  p.baixo.textContent = velho;
  void p.el.offsetWidth; // reinicia a animação
  p.el.classList.add('vira');
  setTimeout(() => {
    if (p.valor === novo) p.baixo.textContent = novo;
    p.el.classList.remove('vira'); // vermelho só durante a troca
  }, 460);
}
function tick() {
  const resta = FIM_PROMO - Date.now();
  if (resta <= 0) {
    clearInterval(relogio);
    crono.className = 'crono fim';
    crono.textContent = 'Promoção encerrada';
    return;
  }
  const seg = Math.floor(resta / 1000);
  virar(placas.d, String(Math.floor(seg / 86400)).padStart(2, '0'));
  virar(placas.h, String(Math.floor(seg / 3600) % 24).padStart(2, '0'));
  virar(placas.m, String(Math.floor(seg / 60) % 60).padStart(2, '0'));
  virar(placas.s, String(seg % 60).padStart(2, '0'));
}
const relogio = setInterval(tick, 1000);
tick();

// Funções: botões abaixo do mockup trocam a tela e o texto
const fnBotoes = [...document.querySelectorAll('.fn-lista button')];
const fnTelas = [...document.querySelectorAll('.fn-tela img')];
const fnTextos = [...document.querySelectorAll('.fn-desc p')];
function abrirFuncao(i) {
  fnBotoes.forEach((b, n) => b.setAttribute('aria-pressed', String(n === i)));
  fnTextos.forEach((p, n) => { p.hidden = n !== i; });
  fnTelas.forEach((img, n) => {
    img.classList.toggle('ativa', n === i);
    if (n === i) img.removeAttribute('aria-hidden');
    else img.setAttribute('aria-hidden', 'true');
    img.loading = 'eager'; // evita tela em branco na troca
  });
}
fnBotoes.forEach((b, i) => b.addEventListener('click', () => abrirFuncao(i)));
abrirFuncao(0);

// Impressora e mensagens disparam quando entram na tela
const aoVer = new IntersectionObserver((itens) => {
  itens.forEach((it) => it.target.classList.toggle('toca', it.isIntersecting));
}, { threshold: 0.3 });
document.querySelectorAll('[data-toca]').forEach((el) => aoVer.observe(el));

// Robô: simulação de atendimento dentro do celular
// O robô tira o pedido inteiro na conversa: itens, endereço, pagamento e status.
// *texto* vira negrito, como no WhatsApp. extra: link | pix | arquivo.
const ROTEIRO = [
  { quem: 'cliente', txt: 'Oi, boa noite!', hora: '21:14' },
  { quem: 'robo', txt: 'Boa noite! 😊 Seja muito bem-vindo ao *Angus Burguer* 🍔\nFaça seu pedido pelo nosso WhatsApp 👇', hora: '21:14',
    link: { url: 'app.menuzia.com.br/loja/angus', titulo: 'Angus Burguer · Cardápio', sub: 'Peça online, sem complicação' } },
  { quem: 'cliente', txt: 'Quero um X-Tudo', hora: '21:15' },
  { quem: 'robo', txt: 'Tá ok, vamos fazer o pedido por aqui mesmo!\n✅ *1x X-Tudo* anotado\nQuer um adicional ou uma bebida pra acompanhar? 🥤', hora: '21:15' },
  { quem: 'cliente', txt: 'Quero uma Coca lata, somente', hora: '21:15' },
  { quem: 'robo', txt: 'Fechado! 📝 *1x X-Tudo* e *1x Coca lata*\nMantenho o mesmo endereço?\n📍 Rua das Palmeiras, 120 · Praia da Costa\nOu prefere retirar na loja? 🏪', hora: '21:16' },
  { quem: 'cliente', txt: 'Mesmo endereço', hora: '21:16' },
  { quem: 'robo', txt: 'Ok! 🛵 Total com entrega: *R$ 43,90*\nForma de pagamento: Pix, débito ou crédito? 💳', hora: '21:16' },
  { quem: 'cliente', txt: 'Pix', hora: '21:17' },
  { quem: 'robo', txt: 'Aqui está seu Pix 👇 Pague pelo QR Code ou pelo código copia e cola.', hora: '21:17', pix: 'R$ 43,90' },
  { quem: 'cliente', arquivo: 'comprovante-pix.pdf', hora: '21:18' },
  { quem: 'robo', txt: 'Pagamento confirmado ✅\nSeu pedido *#438* já está em preparo 👨‍🍳\nVamos atualizá-lo por aqui assim que ele sair para entrega 🛵', hora: '21:18' },
  { quem: 'cliente', txt: 'Obrigado 👍', hora: '21:18' },
];
const zap = document.getElementById('zap');
const zapStatus = document.getElementById('zap-status');
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
let zapVisivel = false;
let execucao = 0; // cada troca de aba invalida a conversa em andamento
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt) e.textContent = txt;
  return e;
};
function comNegrito(alvo, txt) {
  txt.split(/(\*[^*]+\*)/).forEach((p) => {
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) alvo.append(el('b', '', p.slice(1, -1)));
    else if (p) alvo.append(p);
  });
}
// QR decorativo: 21x21 com os três quadrados de canto e miolo pseudoaleatório fixo
const QR_SVG = (() => {
  const n = 21;
  const canto = (x, y) => [[0, 0], [n - 7, 0], [0, n - 7]].some(([cx, cy]) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7);
  const marca = (x, y) => {
    for (const [cx, cy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
      const dx = x - cx, dy = y - cy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx > 1 && dx < 5 && dy > 1 && dy < 5);
    }
    return false;
  };
  let s = 438, d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const on = canto(x, y) ? marca(x, y) : (s >> 16) % 2 === 1;
    if (on) d += `M${x} ${y}h1v1h-1z`;
  }
  return `<svg viewBox="-1 -1 23 23" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><path d="${d}" fill="#0F1B3D"/></svg>`;
})();
function balao(f) {
  const b = el('div', f.quem === 'cliente' ? 'msg cliente' : 'msg');
  if (f.arquivo) {
    const a = el('div', 'zap-arq');
    a.append(el('span', 'zap-arq-ic', 'PDF'));
    const t = el('div');
    t.append(el('b', '', f.arquivo), el('small', '', '1 página · 84 kB'));
    a.append(t);
    b.append(a);
  }
  if (f.txt) {
    const t = el('span', 'msg-txt');
    comNegrito(t, f.txt);
    b.append(t);
  }
  if (f.pix) {
    const p = el('div', 'zap-pix');
    const qr = el('div', 'zap-qr');
    qr.innerHTML = QR_SVG;
    p.append(qr, el('b', '', `Pix · ${f.pix}`), el('span', 'zap-pix-btn', '📋 Copiar código Pix'));
    b.append(p);
  }
  if (f.link) {
    const l = el('div', 'zap-prev');
    const marca = el('span', 'zap-prev-img');
    marca.textContent = '🍔';
    const info = el('div');
    info.append(el('b', '', f.link.titulo), el('small', '', f.link.sub));
    l.append(marca, info);
    b.append(l, el('span', 'zap-url', `https://${f.link.url}`));
  }
  const meta = el('span', 'msg-meta', f.hora);
  if (f.quem === 'cliente') meta.append(el('i', 'lido', '✓✓'));
  b.append(meta);
  return b;
}
async function rodarRobo(id) {
  zap.replaceChildren();
  for (const fala of ROTEIRO) {
    while (!zapVisivel) {
      await pausa(300);
      if (id !== execucao) return;
    }
    if (fala.quem === 'robo') {
      const d = document.createElement('div');
      d.className = 'msg dig';
      d.innerHTML = '<i></i><i></i><i></i>';
      zap.append(d);
      zapStatus.textContent = 'digitando...';
      await pausa(1300);
      d.remove();
      zapStatus.textContent = 'online';
    } else {
      await pausa(1100);
    }
    if (id !== execucao) return;
    zap.append(balao(fala));
    await pausa(700);
    if (id !== execucao) return;
  }
  await pausa(3000);
  if (id === execucao) mostrarCanal('disparos');
}

// Disparos e atendimento: um passa para o outro sozinho, e as abas escolhem
const canais = {
  disparos: { painel: document.getElementById('disparos'), aba: document.getElementById('aba-disparos') },
  atendimento: { painel: document.getElementById('atendimento'), aba: document.getElementById('aba-atendimento') },
};
function mostrarCanal(nome) {
  const id = ++execucao;
  Object.entries(canais).forEach(([n, { painel, aba }]) => {
    painel.classList.toggle('ativo', n === nome);
    painel.inert = n !== nome;
    aba.setAttribute('aria-selected', String(n === nome));
  });
  if (nome === 'atendimento' && !reduzMovimento) rodarRobo(id);
}
Object.entries(canais).forEach(([n, { aba }]) => aba.addEventListener('click', () => {
  if (aba.getAttribute('aria-selected') !== 'true') mostrarCanal(n);
}));
document.querySelector('.d-fone').addEventListener('animationend', (e) => {
  if (e.animationName === 'd-fone') setTimeout(() => {
    if (canais.disparos.painel.classList.contains('ativo')) mostrarCanal('atendimento');
  }, 1500);
});
if (reduzMovimento) {
  zap.append(...ROTEIRO.slice(-4).map(balao));
} else {
  new IntersectionObserver(([it]) => { zapVisivel = it.isIntersecting; }, { threshold: 0.3 }).observe(zap);
}

// Vídeos do Instagram: setas para quando não couberem na tela
const faixa = document.querySelector('.cartas');
const passo = () => faixa.querySelector('.reel').offsetWidth + 20;
document.getElementById('v-ant').addEventListener('click', () => faixa.scrollBy({ left: -passo() }));
document.getElementById('v-prox').addEventListener('click', () => faixa.scrollBy({ left: passo() }));
