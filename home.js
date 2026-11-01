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
const ROTEIRO = [
  ['cliente', 'Oi, vocês estão abertos?'],
  ['robo', 'Olá! Sou o atendente virtual da Menuzia Burger. Estamos abertos até as 23h.'],
  ['robo', 'Aqui está nosso cardápio:', 'Ver cardápio'],
  ['cliente', 'Dá para pagar no Pix?'],
  ['robo', 'Dá sim! Você paga com Pix ou cartão no próprio link.'],
  ['cliente', 'Pronto, fiz o pedido!'],
  ['robo', 'Recebi o pedido #438. A entrega leva de 40 a 50 min, e eu aviso aqui quando sair.'],
];
const zap = document.getElementById('zap');
const zapStatus = document.getElementById('zap-status');
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
let zapVisivel = false;
let execucao = 0; // cada troca de aba invalida a conversa em andamento
function balao([quem, txt, link]) {
  const b = document.createElement('div');
  b.className = quem === 'cliente' ? 'msg cliente' : 'msg';
  b.textContent = txt;
  if (link) {
    const l = document.createElement('span');
    l.className = 'link';
    l.textContent = link;
    b.append(l);
  }
  return b;
}
async function rodarRobo(id) {
  zap.replaceChildren();
  for (const fala of ROTEIRO) {
    while (!zapVisivel) {
      await pausa(300);
      if (id !== execucao) return;
    }
    if (fala[0] === 'robo') {
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
  zap.append(...ROTEIRO.slice(-5).map(balao));
} else {
  new IntersectionObserver(([it]) => { zapVisivel = it.isIntersecting; }, { threshold: 0.3 }).observe(zap);
}

// Vídeos do Instagram: setas para quando não couberem na tela
const faixa = document.querySelector('.cartas');
const passo = () => faixa.querySelector('.reel').offsetWidth + 20;
document.getElementById('v-ant').addEventListener('click', () => faixa.scrollBy({ left: -passo() }));
document.getElementById('v-prox').addEventListener('click', () => faixa.scrollBy({ left: passo() }));
