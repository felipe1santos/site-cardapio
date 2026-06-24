// Gerador de PÁGINAS LOCAIS (SEO local) — uma página por cidade na RAIZ do site.
// Uso: node genlocal.js   (depois: git add / commit)
// Padrão ouro do blog (blog/blog.css) + footer profissional com NAP + bairros + sidebar de busca rápida.
// Páginas saem na raiz: /cardapio-digital-<cidade>.html  (sinal local mais forte).
const fs = require('fs');
const SITE = 'https://menuzia.com.br';
const PUBLISHED = '2026-06-24';
const MODIFIED = '2026-06-24';

// ============================================================
//  NAP — Nome, Endereço, Telefone (consistência = ranking local)
//  >>> PREENCHER COM DADOS REAIS DE VILA VELHA <<<
// ============================================================
const NAP = {
  name: 'Menuzia',
  phoneDisplay: '(27) 99253-4407',
  phoneRaw: '5527992534407',                 // wa.me (55 + DDD + número)
  email: 'contato@menuzia.com.br',           // confirmar (usuário passou site, não e-mail)
  hasPhysicalAddress: true,
  street: 'Rua Olíbia Moreira Rodrigues',    // sem número informado
  district: 'Jardim Marilândia',
  city: 'Vila Velha',
  region: 'ES',
  postalCode: '29112-015',
  hours: '24 horas por dia, todos os dias (sempre aberto)',
};

// ============================================================
//  Cidades (adicione Serra e Vitória depois, mesmo formato)
// ============================================================
const cities = [
  {
    slug: 'cardapio-digital-vila-velha.html',
    city: 'Vila Velha',
    region: 'ES',
    gentilico: 'Vila Velha',
    heroImg: 'local-vila-velha.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery em Vila Velha, ES',
    title: 'Cardápio Digital em Vila Velha (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital em Vila Velha (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery em Vila Velha (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Praia da Costa, Itapuã, Itaparica, Centro e toda Vila Velha.',
    keywords: 'cardápio digital em vila velha, cardápio digital vila velha es, sistema de delivery vila velha, cardápio digital para restaurante vila velha, cardápio online vila velha, delivery sem comissão vila velha, alternativa ao ifood vila velha, cardápio digital praia da costa, cardápio digital itapuã, cardápio digital itaparica, qr code cardápio vila velha, cardápio digital para hamburgueria vila velha',
    // bairros principais (alto volume de delivery) — entram no corpo, footer e schema
    bairrosTop: ['Praia da Costa', 'Itapuã', 'Itaparica', 'Coqueiral de Itaparica', 'Centro', 'Glória', 'Soteco', 'Cobilândia', 'Divino Espírito Santo', 'Aribiri', 'IBES', 'São Torquato'],
    bairrosTodos: ['Praia da Costa', 'Itapuã', 'Itaparica', 'Coqueiral de Itaparica', 'Centro de Vila Velha', 'Glória', 'Soteco', 'Cobilândia', 'Divino Espírito Santo', 'Aribiri', 'IBES', 'São Torquato', 'Boa Vista', 'Jardim Colorado', 'Jardim Marilândia', 'Santa Mônica', 'Riviera da Barra', 'Barra do Jucu', 'Interlagos', 'Ponta da Fruta', 'Terra Vermelha', 'Vale Encantado', 'Cocal', 'Jockey de Itaparica', 'Vila Garrido', 'Santos Dumont'],
    // chips de busca rápida (sidebar)
    chips: ['cardápio digital Vila Velha', 'delivery sem comissão ES', 'sair do iFood Vila Velha', 'cardápio Praia da Costa', 'cardápio digital Itapuã', 'QR Code cardápio ES', 'cardápio Itaparica', 'sistema delivery Centro VV'],
    faq: [
      ['O Menuzia atende restaurantes em Vila Velha?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda Vila Velha</strong> — de Praia da Costa e Itapuã à Cobilândia, Barra do Jucu e Interlagos. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital em Vila Velha?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita em Vila Velha.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro de Vila Velha. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro de Vila Velha?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Praia da Costa, Itaparica, Centro, IBES, San Torquato e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
    // corpo (HTML). Links /blog/... e / são reescritos pra caminhos corretos da raiz.
    body: `<p>Se você tem um restaurante, hamburgueria ou delivery em <strong>Vila Velha</strong>, já sabe quanto a comissão das plataformas pesa no fim do mês. Um <strong>cardápio digital próprio</strong> resolve isso: o cliente pede pelo seu link, o pedido cai direto no seu WhatsApp e <strong>todo o lucro fica com você</strong>. Sem taxa por pedido, sem perder a sua base de clientes.</p>

<p>O Menuzia é a plataforma de cardápio digital sem comissão que atende delivery em toda a Grande Vitória — e este guia é focado em quem vende em <strong>Vila Velha (ES)</strong>, de Praia da Costa a Barra do Jucu.</p>

<h2>Por que restaurantes de Vila Velha estão trocando o iFood pelo cardápio próprio</h2>
<p>A comissão do iFood vai de 12% a mais de 30% por pedido. Para um delivery que fatura bem na Praia da Costa ou no Centro de Vila Velha, isso vira milhares de reais por mês indo embora — e a lista de clientes continua sendo da plataforma, não sua.</p>
<ul>
  <li><strong>Sem comissão:</strong> R$67/mês fixo, venda quanto vender.</li>
  <li><strong>Base de clientes sua:</strong> quem pede em Itapuã, Itaparica ou Cobilândia entra na <em>sua</em> lista pra sempre.</li>
  <li><strong>Pedido direto no caixa:</strong> sem intermediário entre você e o cliente de Vila Velha.</li>
</ul>
<p>Veja o passo a passo completo de <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> sem perder clientes.</p>

<h2>Cardápio digital para delivery em qualquer bairro de Vila Velha</h2>
<p>O cardápio do Menuzia funciona 100% online — não importa se o seu delivery fica na <strong>Praia da Costa</strong>, em <strong>Itapuã</strong>, no <strong>Centro</strong>, na <strong>Cobilândia</strong> ou na <strong>Barra do Jucu</strong>. Você define a taxa de entrega por bairro, conecta o WhatsApp e começa a receber pedidos no mesmo dia.</p>
<p>É ideal para hamburguerias, pizzarias, açaíterias, restaurantes e lanchonetes que querem profissionalizar o delivery sem depender do iFood. Veja <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">como criar um cardápio digital para hamburgueria</a> passo a passo.</p>

<div class="bairros-block">
  <h2>Atendemos todo o delivery de Vila Velha</h2>
  <p>O Menuzia configura o cardápio digital de restaurantes e deliverys nestes e em todos os bairros de Vila Velha:</p>
  <ul class="bairros-grid">
{{BAIRROS_GRID}}
  </ul>
</div>

<h2>Quanto custa um cardápio digital em Vila Velha</h2>
<p>No Menuzia é <strong>R$67/mês fixo, sem comissão por pedido</strong> — com configuração feita pela nossa equipe e suporte incluso. Compare: um delivery em Vila Velha que fatura R$25 mil/mês pagando 18% de comissão joga fora R$4.500 todo mês. Com um plano fixo, esse dinheiro volta pro seu caixa. Entenda em <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a> e se <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>Como começar em Vila Velha (passo a passo)</h2>
<ol>
  <li><strong>Você assina o Menuzia</strong> por R$67/mês.</li>
  <li><strong>Nossa equipe monta o seu cardápio digital</strong> com fotos, categorias e taxa de entrega por bairro de Vila Velha.</li>
  <li><strong>Conectamos o WhatsApp</strong> e o robô de atendimento 24h.</li>
  <li><strong>Você divulga o link</strong> na bio do Instagram, no status do WhatsApp e em panfletos com QR Code pela cidade.</li>
  <li><strong>Os pedidos caem direto no seu caixa</strong> — e cada cliente vira base sua pra disparar <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanhas de WhatsApp</a>.</li>
</ol>`,
  },
];

// ------------------------------------------------------------
//  Templates compartilhados (mesma identidade do blog)
// ------------------------------------------------------------
const B = 'blog/'; // raiz -> pasta blog

const head = (c, url) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${c.desc}">
<meta name="keywords" content="${c.keywords}">
<meta name="author" content="Menuzia">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#1d3e73">
<meta name="geo.region" content="BR-ES">
<meta name="geo.placename" content="${c.city}">
<link rel="canonical" href="${SITE}${url}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<title>${c.title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.desc}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:image" content="${SITE}/assets/img/blog/${c.heroImg}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Menuzia">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${c.title}">
<meta name="twitter:description" content="${c.desc}">
<meta name="twitter:image" content="${SITE}/assets/img/blog/${c.heroImg}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}blog.css">`;

const localBusinessLd = (c, url) => {
  const addr = NAP.hasPhysicalAddress
    ? `,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${NAP.street}",
    "addressLocality": "${NAP.city}",
    "addressRegion": "${NAP.region}",
    "postalCode": "${NAP.postalCode}",
    "addressCountry": "BR"
  }`
    : `,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${c.city}",
    "addressRegion": "${c.region}",
    "addressCountry": "BR"
  }`;
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${NAP.name} — Cardápio digital em ${c.city}",
  "description": "${c.desc}",
  "url": "${SITE}${url}",
  "image": "${SITE}/assets/img/blog/${c.heroImg}",
  "telephone": "+${NAP.phoneRaw}",
  "email": "${NAP.email}",
  "priceRange": "R$67/mês",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }${addr},
  "areaServed": [
${c.bairrosTop.map(b => `    { "@type": "Place", "name": "${b}, ${c.city} - ${c.region}" }`).join(',\n')}
  ]
}
</script>`;
};

const serviceLd = (c, url) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Cardápio digital sem comissão para delivery",
  "provider": { "@type": "Organization", "name": "Menuzia", "url": "${SITE}/" },
  "areaServed": { "@type": "City", "name": "${c.city}", "containedInPlace": { "@type": "State", "name": "Espírito Santo" } },
  "url": "${SITE}${url}",
  "offers": { "@type": "Offer", "price": "67.00", "priceCurrency": "BRL" }
}
</script>`;

const faqLd = (c) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${c.faq.map(([q, a]) => `    { "@type": "Question", "name": "${q}", "acceptedAnswer": { "@type": "Answer", "text": "${a.replace(/<[^>]+>/g, '')}" } }`).join(',\n')}
  ]
}
</script>`;

const breadcrumbLd = (c, url) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "${SITE}/" },
    { "@type": "ListItem", "position": 2, "name": "Cardápio digital em ${c.city}", "item": "${SITE}${url}" }
  ]
}
</script>`;

const header = () => `<header class="header">
  <a href="${SITE}/" class="logo">menuzia</a>
  <nav class="nav">
    <a href="${SITE}/#funcionalidades">Funcionalidades</a>
    <a href="${SITE}/#precos">Preços</a>
    <a href="${SITE}/#duvidas">Dúvidas</a>
    <a href="${B}index.html">Blog</a>
  </nav>
  <a href="${SITE}/#precos" class="btn-header-cta">Criar Cardápio</a>
</header>`;

const ctaBox = `<div class="cta-box">
  <h3>Tenha seu cardápio digital em Vila Velha hoje</h3>
  <p>Pare de pagar comissão. R$67/mês fixo, nós configuramos pra você e damos suporte.</p>
  <a href="${SITE}/#precos" class="btn-vermelho">Criar Meu Cardápio Agora →</a>
</div>`;

const faqSection = (c) => `<div class="faq">
  <h2>Perguntas frequentes — cardápio digital em ${c.city}</h2>
${c.faq.map(([q, a]) => `  <div class="faq-item">
    <h3>${q}</h3>
    <p>${a}</p>
  </div>`).join('\n')}
</div>`;

const sidebar = (c) => `<aside class="sidebar">
  <div class="sidebar-box">
    <h3>Busca rápida</h3>
    <div class="side-chips">
${c.chips.map(t => `      <a href="${SITE}/#precos">${t}</a>`).join('\n')}
    </div>
  </div>
  <div class="sidebar-box">
    <h3>Mais no blog</h3>
    <ul>
      <li><a href="${B}estrategia/como-sair-do-ifood-e-vender-direto.html"><span class="side-cat">Estratégia</span>Como sair do iFood e vender direto</a></li>
      <li><a href="${B}guias/como-criar-cardapio-digital-para-hamburgueria.html"><span class="side-cat">Guia</span>Como criar um cardápio digital para hamburgueria</a></li>
      <li><a href="${B}precos/quanto-custa-cardapio-digital-proprio.html"><span class="side-cat">Preços</span>Quanto custa um cardápio digital próprio</a></li>
    </ul>
  </div>
  <div class="sidebar-cta">
    <h3>Menuzia em ${c.city}</h3>
    <p>Cardápio digital sem comissão para o seu delivery. Nós configuramos pra você.</p>
    <a href="${SITE}/#precos" class="btn-site">Criar Cardápio →</a>
  </div>
</aside>`;

const localFooter = (c) => {
  const enderecoLinha = NAP.hasPhysicalAddress
    ? `<li>📍 ${NAP.street} — ${NAP.district}, ${NAP.city}/${NAP.region}${NAP.postalCode ? ', ' + NAP.postalCode : ''}</li>`
    : `<li>📍 Atendimento online em toda ${c.city} e Grande Vitória/${c.region}</li>`;
  return `<footer class="local-footer">
  <div class="lf-grid">
    <div class="lf-col">
      <div class="footer-logo">menuzia</div>
      <p>Cardápio digital sem comissão para restaurantes, hamburguerias e delivery em ${c.city} e em toda a Grande Vitória.</p>
    </div>
    <div class="lf-col">
      <h4>Contato</h4>
      <ul class="lf-nap">
        <li>📱 <a href="https://wa.me/${NAP.phoneRaw}">${NAP.phoneDisplay}</a> (WhatsApp)</li>
        <li>✉️ <a href="mailto:${NAP.email}">${NAP.email}</a></li>
        <li>🕐 ${NAP.hours}</li>
        ${enderecoLinha}
      </ul>
    </div>
    <div class="lf-col">
      <h4>Bairros de ${c.city} que atendemos</h4>
      <div class="lf-bairros">
        ${c.bairrosTodos.map(b => `<span>${b}</span>`).join(' · ')}
      </div>
    </div>
  </div>
  <div class="lf-bottom">
    <a href="${SITE}/">Início</a> · <a href="${B}index.html">Blog</a> · <a href="${SITE}/#precos">Preços</a> · <a href="${SITE}/#duvidas">Dúvidas</a><br>
    © 2026 Menuzia. Cardápio digital sem comissão em ${c.city} (${c.region}) — hamburguerias, pizzarias e delivery.
  </div>
</footer>`;
};

function page(c) {
  const url = '/' + c.slug;
  const bairrosGrid = c.bairrosTodos.map(b => `    <li>${b}</li>`).join('\n');
  const body = c.body
    .replace('{{BAIRROS_GRID}}', bairrosGrid)
    .replace(/href="\/blog\//g, `href="${B}`)
    .replace(/href="\/#/g, `href="${SITE}/#`)
    .replace(/href="\/"/g, `href="${SITE}/"`);
  return `${head(c, url)}
${localBusinessLd(c, url)}
${serviceLd(c, url)}
${faqLd(c)}
${breadcrumbLd(c, url)}
</head>
<body>
${header()}
<div class="artigo-wrap">
<article class="artigo">
  <div class="breadcrumb"><a href="${SITE}/">Início</a> › Cardápio digital em ${c.city}</div>
  <span class="cat">${c.city} · ${c.region}</span>
  <h1>${c.h1}</h1>
  <div class="meta">Atendemos restaurantes e delivery em toda ${c.city} · Equipe Menuzia</div>
  <figure class="artigo-hero">
    <img src="assets/img/blog/${c.heroImg}" alt="${c.heroAlt}" width="1200" height="675" loading="eager" fetchpriority="high" decoding="async">
  </figure>
  ${body}
  ${faqSection(c)}
  ${ctaBox}
</article>
${sidebar(c)}
</div>
${localFooter(c)}
</body>
</html>`;
}

cities.forEach(c => {
  fs.writeFileSync(c.slug, page(c));
  console.log('wrote ' + c.slug);
});
