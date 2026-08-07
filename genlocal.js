// Gerador de PÁGINAS LOCAIS (SEO local) — uma página por cidade na RAIZ do site.
// Uso: node genlocal.js   (depois: git add / commit)
// Padrão ouro do blog (blog/blog.css) + footer profissional com NAP + bairros + sidebar de busca rápida.
// Páginas saem na raiz: /cardapio-digital-<cidade>.html  (sinal local mais forte).
const fs = require('fs');
const SITE = 'https://menuzia.com.br';
// escapa texto para dentro de string JSON (JSON-LD) — aspas em "grátis" quebram o schema
const jsonStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();
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
//  Cidades
//  Campos opcionais (defaults em norm()): prep, de, toda, geo, stateName,
//  metro, regiaoFrase, bairroWord, nota, faq (genFaq), body (genBody).
// ============================================================
const cities = [
  {
    slug: 'cardapio-digital-vila-velha.html',
    city: 'Vila Velha',
    region: 'ES',
    gentilico: 'Vila Velha',
    physicalAddress: true,   // sede real em VV (Jardim Marilândia)
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

  {
    slug: 'cardapio-digital-serra.html',
    city: 'Serra',
    region: 'ES',
    gentilico: 'Serra',
    prep: 'na',
    de: 'da Serra',
    toda: 'toda a Serra',
    physicalAddress: false,
    heroImg: 'local-serra.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery na Serra, ES',
    title: 'Cardápio Digital na Serra (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital na Serra (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery na Serra (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Laranjeiras, Serra Sede, Jardim Limoeiro, Carapina e toda a Serra.',
    keywords: 'cardápio digital na serra, cardápio digital serra es, sistema de delivery serra, cardápio digital para restaurante serra, cardápio online serra, delivery sem comissão serra, alternativa ao ifood serra, cardápio digital laranjeiras, cardápio digital carapina, cardápio digital jardim limoeiro, qr code cardápio serra, cardápio digital para hamburgueria serra',
    bairrosTop: ['Laranjeiras', 'Serra Sede', 'Jardim Limoeiro', 'Carapina', 'Manguinhos', 'Jacaraípe', 'Nova Almeida', 'Feu Rosa', 'Civit', 'Colina de Laranjeiras', 'Cidade Continental', 'Barcelona'],
    bairrosTodos: ['Laranjeiras', 'Serra Sede', 'Jardim Limoeiro', 'Jardim Tropical', 'Parque Residencial Laranjeiras', 'Carapina', 'Carapina Grande', 'Eurico Salles', 'Civit', 'Manguinhos', 'Nova Almeida', 'Jacaraípe', 'Feu Rosa', 'Vila Nova de Colares', 'Cidade Continental', 'Barcelona', 'Porto Canoa', 'André Carloni', 'Bairro de Fátima', 'Castelândia', 'Colina de Laranjeiras', 'Planalto Serrano', 'Novo Horizonte', 'Maringá', 'Parque das Gaivotas', 'José de Anchieta'],
    chips: ['cardápio digital Serra', 'delivery sem comissão Serra', 'sair do iFood Serra', 'cardápio Laranjeiras', 'cardápio digital Carapina', 'QR Code cardápio Serra', 'cardápio Jacaraípe', 'sistema delivery Serra Sede'],
    faq: [
      ['O Menuzia atende restaurantes na Serra?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda a Serra</strong> — de Laranjeiras e Carapina a Jacaraípe, Nova Almeida e Feu Rosa. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital na Serra?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita na Serra.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro da Serra. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro da Serra?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Laranjeiras, Serra Sede, Jardim Limoeiro, Carapina, Cidade Continental e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
    body: `<p>Se você tem um restaurante, hamburgueria ou delivery na <strong>Serra</strong>, já sabe quanto a comissão das plataformas pesa no fim do mês. Um <strong>cardápio digital próprio</strong> resolve isso: o cliente pede pelo seu link, o pedido cai direto no seu WhatsApp e <strong>todo o lucro fica com você</strong>. Sem taxa por pedido, sem perder a sua base de clientes.</p>

<p>O Menuzia é a plataforma de cardápio digital sem comissão que atende delivery em toda a Grande Vitória — e este guia é focado em quem vende na <strong>Serra (ES)</strong>, de Laranjeiras a Jacaraípe.</p>

<h2>Por que restaurantes da Serra estão trocando o iFood pelo cardápio próprio</h2>
<p>A comissão do iFood vai de 12% a mais de 30% por pedido. Para um delivery que fatura bem em Laranjeiras ou na Cidade Continental, isso vira milhares de reais por mês indo embora — e a lista de clientes continua sendo da plataforma, não sua.</p>
<ul>
  <li><strong>Sem comissão:</strong> R$67/mês fixo, venda quanto vender.</li>
  <li><strong>Base de clientes sua:</strong> quem pede em Carapina, Jardim Limoeiro ou Feu Rosa entra na <em>sua</em> lista pra sempre.</li>
  <li><strong>Pedido direto no caixa:</strong> sem intermediário entre você e o cliente da Serra.</li>
</ul>
<p>Veja o passo a passo completo de <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> sem perder clientes.</p>

<h2>Cardápio digital para delivery em qualquer bairro da Serra</h2>
<p>O cardápio do Menuzia funciona 100% online — não importa se o seu delivery fica em <strong>Laranjeiras</strong>, <strong>Carapina</strong>, na <strong>Serra Sede</strong>, em <strong>Jacaraípe</strong> ou em <strong>Nova Almeida</strong>. Você define a taxa de entrega por bairro, conecta o WhatsApp e começa a receber pedidos no mesmo dia.</p>
<p>É ideal para hamburguerias, pizzarias, açaíterias, restaurantes e lanchonetes que querem profissionalizar o delivery sem depender do iFood. Veja <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">como criar um cardápio digital para hamburgueria</a> passo a passo.</p>

<div class="bairros-block">
  <h2>Atendemos todo o delivery da Serra</h2>
  <p>O Menuzia configura o cardápio digital de restaurantes e deliverys nestes e em todos os bairros da Serra:</p>
  <ul class="bairros-grid">
{{BAIRROS_GRID}}
  </ul>
</div>

<h2>Quanto custa um cardápio digital na Serra</h2>
<p>No Menuzia é <strong>R$67/mês fixo, sem comissão por pedido</strong> — com configuração feita pela nossa equipe e suporte incluso. Compare: um delivery na Serra que fatura R$25 mil/mês pagando 18% de comissão joga fora R$4.500 todo mês. Com um plano fixo, esse dinheiro volta pro seu caixa. Entenda em <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a> e se <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>Como começar na Serra (passo a passo)</h2>
<ol>
  <li><strong>Você assina o Menuzia</strong> por R$67/mês.</li>
  <li><strong>Nossa equipe monta o seu cardápio digital</strong> com fotos, categorias e taxa de entrega por bairro da Serra.</li>
  <li><strong>Conectamos o WhatsApp</strong> e o robô de atendimento 24h.</li>
  <li><strong>Você divulga o link</strong> na bio do Instagram, no status do WhatsApp e em panfletos com QR Code pela cidade.</li>
  <li><strong>Os pedidos caem direto no seu caixa</strong> — e cada cliente vira base sua pra disparar <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanhas de WhatsApp</a>.</li>
</ol>`,
  },

  {
    slug: 'cardapio-digital-vitoria.html',
    city: 'Vitória',
    region: 'ES',
    gentilico: 'Vitória',
    physicalAddress: false,
    heroImg: 'local-vitoria.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery em Vitória, ES',
    title: 'Cardápio Digital em Vitória (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital em Vitória (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery em Vitória (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Praia do Canto, Jardim Camburi, Jardim da Penha, Centro e toda Vitória.',
    keywords: 'cardápio digital em vitória, cardápio digital vitória es, sistema de delivery vitória, cardápio digital para restaurante vitória, cardápio online vitória, delivery sem comissão vitória, alternativa ao ifood vitória, cardápio digital praia do canto, cardápio digital jardim camburi, cardápio digital jardim da penha, qr code cardápio vitória, cardápio digital para hamburgueria vitória',
    bairrosTop: ['Praia do Canto', 'Jardim Camburi', 'Jardim da Penha', 'Mata da Praia', 'Bento Ferreira', 'Centro', 'Santa Lúcia', 'Praia do Suá', 'Enseada do Suá', 'Barro Vermelho', 'Maruípe', 'Goiabeiras'],
    bairrosTodos: ['Praia do Canto', 'Jardim Camburi', 'Jardim da Penha', 'Mata da Praia', 'Bento Ferreira', 'Centro de Vitória', 'Santa Lúcia', 'Praia do Suá', 'Enseada do Suá', 'Barro Vermelho', 'Jucutuquara', 'Maruípe', 'Itararé', 'São Pedro', 'Goiabeiras', 'República', 'Ilha do Boi', 'Ilha do Frade', 'Consolação', 'Fradinhos', 'Santa Helena', 'Santo Antônio', 'Tabuazeiro', 'Jabour', 'Bairro de Lourdes'],
    chips: ['cardápio digital Vitória', 'delivery sem comissão Vitória', 'sair do iFood Vitória', 'cardápio Praia do Canto', 'cardápio digital Jardim Camburi', 'QR Code cardápio Vitória', 'cardápio Jardim da Penha', 'sistema delivery Centro Vitória'],
    faq: [
      ['O Menuzia atende restaurantes em Vitória?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda Vitória</strong> — da Praia do Canto e Jardim Camburi ao Centro, Maruípe e São Pedro. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital em Vitória?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita em Vitória.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro de Vitória. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro de Vitória?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Praia do Canto, Jardim da Penha, Jardim Camburi, Centro, Maruípe e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
    body: `<p>Se você tem um restaurante, hamburgueria ou delivery em <strong>Vitória</strong>, já sabe quanto a comissão das plataformas pesa no fim do mês. Um <strong>cardápio digital próprio</strong> resolve isso: o cliente pede pelo seu link, o pedido cai direto no seu WhatsApp e <strong>todo o lucro fica com você</strong>. Sem taxa por pedido, sem perder a sua base de clientes.</p>

<p>O Menuzia é a plataforma de cardápio digital sem comissão que atende delivery em toda a Grande Vitória — e este guia é focado em quem vende na capital <strong>Vitória (ES)</strong>, da Praia do Canto a Jardim Camburi.</p>

<h2>Por que restaurantes de Vitória estão trocando o iFood pelo cardápio próprio</h2>
<p>A comissão do iFood vai de 12% a mais de 30% por pedido. Para um delivery que fatura bem na Praia do Canto ou em Jardim Camburi, isso vira milhares de reais por mês indo embora — e a lista de clientes continua sendo da plataforma, não sua.</p>
<ul>
  <li><strong>Sem comissão:</strong> R$67/mês fixo, venda quanto vender.</li>
  <li><strong>Base de clientes sua:</strong> quem pede em Jardim da Penha, Mata da Praia ou Bento Ferreira entra na <em>sua</em> lista pra sempre.</li>
  <li><strong>Pedido direto no caixa:</strong> sem intermediário entre você e o cliente de Vitória.</li>
</ul>
<p>Veja o passo a passo completo de <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> sem perder clientes.</p>

<h2>Cardápio digital para delivery em qualquer bairro de Vitória</h2>
<p>O cardápio do Menuzia funciona 100% online — não importa se o seu delivery fica na <strong>Praia do Canto</strong>, em <strong>Jardim Camburi</strong>, em <strong>Jardim da Penha</strong>, no <strong>Centro</strong> ou em <strong>Maruípe</strong>. Você define a taxa de entrega por bairro, conecta o WhatsApp e começa a receber pedidos no mesmo dia.</p>
<p>É ideal para hamburguerias, pizzarias, açaíterias, restaurantes e lanchonetes que querem profissionalizar o delivery sem depender do iFood. Veja <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">como criar um cardápio digital para hamburgueria</a> passo a passo.</p>

<div class="bairros-block">
  <h2>Atendemos todo o delivery de Vitória</h2>
  <p>O Menuzia configura o cardápio digital de restaurantes e deliverys nestes e em todos os bairros de Vitória:</p>
  <ul class="bairros-grid">
{{BAIRROS_GRID}}
  </ul>
</div>

<h2>Quanto custa um cardápio digital em Vitória</h2>
<p>No Menuzia é <strong>R$67/mês fixo, sem comissão por pedido</strong> — com configuração feita pela nossa equipe e suporte incluso. Compare: um delivery em Vitória que fatura R$25 mil/mês pagando 18% de comissão joga fora R$4.500 todo mês. Com um plano fixo, esse dinheiro volta pro seu caixa. Entenda em <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a> e se <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>Como começar em Vitória (passo a passo)</h2>
<ol>
  <li><strong>Você assina o Menuzia</strong> por R$67/mês.</li>
  <li><strong>Nossa equipe monta o seu cardápio digital</strong> com fotos, categorias e taxa de entrega por bairro de Vitória.</li>
  <li><strong>Conectamos o WhatsApp</strong> e o robô de atendimento 24h.</li>
  <li><strong>Você divulga o link</strong> na bio do Instagram, no status do WhatsApp e em panfletos com QR Code pela cidade.</li>
  <li><strong>Os pedidos caem direto no seu caixa</strong> — e cada cliente vira base sua pra disparar <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanhas de WhatsApp</a>.</li>
</ol>`,
  },

  {
    slug: 'cardapio-digital-cariacica.html',
    city: 'Cariacica',
    region: 'ES',
    prep: 'em',
    toda: 'toda Cariacica',
    physicalAddress: false,
    heroImg: 'local-cariacica.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery em Cariacica, ES',
    title: 'Cardápio Digital em Cariacica (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital em Cariacica (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery em Cariacica (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Campo Grande, Jardim América, Alto Lage, Itacibá e toda Cariacica.',
    keywords: 'cardápio digital em cariacica, cardápio digital cariacica es, sistema de delivery cariacica, cardápio digital para restaurante cariacica, cardápio online cariacica, delivery sem comissão cariacica, alternativa ao ifood cariacica, cardápio digital campo grande cariacica, cardápio digital jardim américa, qr code cardápio cariacica, cardápio digital para hamburgueria cariacica',
    bairrosTop: ['Campo Grande', 'Jardim América', 'Alto Lage', 'Itacibá', 'Porto de Santana', 'Cariacica Sede', 'Itanguá', 'Nova Rosa da Penha', 'Vila Capixaba', 'Santana', 'Castelo Branco', 'Jardim de Alah'],
    bairrosTodos: ['Campo Grande', 'Jardim América', 'Alto Lage', 'Itacibá', 'Porto de Santana', 'Cariacica Sede', 'Itanguá', 'Nova Rosa da Penha', 'Vila Capixaba', 'Santana', 'Castelo Branco', 'Jardim de Alah', 'Flexal', 'Bela Aurora', 'Padre Gabriel', 'São Geraldo', 'Nova Brasília', 'Vasco da Gama', 'Mocambo', 'Bandeirantes', 'Rio Marinho', 'Sotema', 'Bubu', 'Tucum', 'Cocal', 'Operário'],
    chips: ['cardápio digital Cariacica', 'delivery sem comissão Cariacica', 'sair do iFood Cariacica', 'cardápio Campo Grande', 'cardápio digital Itacibá', 'QR Code cardápio Cariacica', 'cardápio Alto Lage', 'sistema delivery Cariacica Sede'],
    faq: [
      ['O Menuzia atende restaurantes em Cariacica?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda Cariacica</strong> — de Campo Grande e Jardim América a Itacibá, Alto Lage e Porto de Santana. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital em Cariacica?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita em Cariacica.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro de Cariacica. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro de Cariacica?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Campo Grande, Jardim América, Alto Lage, Itacibá e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
  },

  {
    slug: 'cardapio-digital-viana.html',
    city: 'Viana',
    region: 'ES',
    prep: 'em',
    toda: 'toda Viana',
    physicalAddress: false,
    heroImg: 'local-viana.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery em Viana, ES',
    title: 'Cardápio Digital em Viana (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital em Viana (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery em Viana (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Marcílio de Noronha, Vila Bethânia, Universal, Industrial e toda Viana.',
    keywords: 'cardápio digital em viana, cardápio digital viana es, sistema de delivery viana, cardápio digital para restaurante viana, cardápio online viana, delivery sem comissão viana, alternativa ao ifood viana, cardápio digital marcílio de noronha, cardápio digital vila bethânia, qr code cardápio viana, cardápio digital para hamburgueria viana',
    bairrosTop: ['Marcílio de Noronha', 'Vila Bethânia', 'Universal', 'Industrial', 'Areinha', 'Canaã', 'Nova Bethânia', 'Vale do Sol', 'Bom Pastor', 'Ipanema', 'Centro de Viana', 'Jucu'],
    bairrosTodos: ['Marcílio de Noronha', 'Vila Bethânia', 'Universal', 'Industrial', 'Areinha', 'Canaã', 'Nova Bethânia', 'Vale do Sol', 'Bom Pastor', 'Ipanema', 'Centro de Viana', 'Jucu', 'Morada de Bethânia', 'Vila Nova', 'Primavera', 'Conjunto Vila Nova', 'Nova Esperança', 'Santa Clara', 'Bananeiras', 'Soteco de Viana', 'Vinhático', 'Caçaroca'],
    chips: ['cardápio digital Viana', 'delivery sem comissão Viana', 'sair do iFood Viana', 'cardápio Marcílio de Noronha', 'cardápio digital Vila Bethânia', 'QR Code cardápio Viana', 'cardápio Universal', 'sistema delivery Centro Viana'],
    faq: [
      ['O Menuzia atende restaurantes em Viana?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda Viana</strong> — de Marcílio de Noronha e Vila Bethânia a Universal, Industrial e Areinha. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital em Viana?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita em Viana.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro de Viana. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro de Viana?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Marcílio de Noronha, Vila Bethânia, Universal, Industrial e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
  },

  {
    slug: 'cardapio-digital-guarapari.html',
    city: 'Guarapari',
    region: 'ES',
    prep: 'em',
    toda: 'toda Guarapari',
    physicalAddress: false,
    heroImg: 'local-guarapari.webp',
    heroAlt: 'Cardápio digital para restaurantes e delivery em Guarapari, ES',
    title: 'Cardápio Digital em Guarapari (ES) sem Comissão | Menuzia',
    h1: 'Cardápio digital em Guarapari (ES): venda direto, sem pagar comissão',
    desc: 'Cardápio digital próprio para restaurantes, hamburguerias e delivery em Guarapari (ES). Sem comissão por pedido, com WhatsApp e base de clientes sua. Atendemos Centro, Praia do Morro, Muquiçaba, Meaípe e toda Guarapari.',
    keywords: 'cardápio digital em guarapari, cardápio digital guarapari es, sistema de delivery guarapari, cardápio digital para restaurante guarapari, cardápio online guarapari, delivery sem comissão guarapari, alternativa ao ifood guarapari, cardápio digital praia do morro, cardápio digital meaípe, qr code cardápio guarapari, cardápio digital para hamburgueria guarapari',
    bairrosTop: ['Centro', 'Praia do Morro', 'Muquiçaba', 'Kubitschek', 'Meaípe', 'Itapebussu', 'Setiba', 'Nova Guarapari', 'Ipiranga', 'Santa Mônica', 'Perocão', 'Bela Vista'],
    bairrosTodos: ['Centro de Guarapari', 'Praia do Morro', 'Muquiçaba', 'Kubitschek', 'Meaípe', 'Itapebussu', 'Setiba', 'Nova Guarapari', 'Ipiranga', 'Santa Mônica', 'Perocão', 'Bela Vista', 'Olaria', 'Jabaraí', 'Adalberto Simão Nader', 'Lameirão', 'Sol Nascente', 'Camurugi', 'Village do Sol', 'Enseada Azul', 'Praia do Riacho', 'Elival'],
    chips: ['cardápio digital Guarapari', 'delivery sem comissão Guarapari', 'sair do iFood Guarapari', 'cardápio Praia do Morro', 'cardápio digital Meaípe', 'QR Code cardápio Guarapari', 'cardápio Muquiçaba', 'sistema delivery Centro Guarapari'],
    faq: [
      ['O Menuzia atende restaurantes em Guarapari?', 'Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>toda Guarapari</strong> — do Centro e Praia do Morro a Meaípe, Muquiçaba e Setiba. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.'],
      ['Quanto custa um cardápio digital em Guarapari?', 'O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. Você paga o mesmo vendendo 10 ou 10 mil pedidos — diferente do iFood, que cobra uma porcentagem de cada venda feita em Guarapari. Ideal também para o pico de verão na Praia do Morro.'],
      ['Preciso de loja física para ter o cardápio digital?', 'Não. Funciona com o seu delivery em qualquer bairro de Guarapari. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.'],
      ['Dá para configurar entrega por bairro de Guarapari?', 'Sim. Você define a <strong>taxa de entrega por bairro</strong> — Centro, Praia do Morro, Muquiçaba, Meaípe e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.'],
    ],
  },

  // ============================================================
  //  Capitais nacionais (expansão fora do ES) — sem endereço físico:
  //  atendimento 100% online, NAP consistente (nunca fingir loja física).
  // ============================================================
  {
    slug: 'cardapio-digital-sao-paulo.html',
    city: 'São Paulo',
    region: 'SP',
    prep: 'em',
    de: 'de São Paulo',
    toda: 'toda São Paulo',
    geo: 'BR-SP',
    stateName: 'São Paulo',
    metro: 'Grande São Paulo',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-vila-velha-2.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em São Paulo, SP',
    title: 'Cardápio Digital Barato em São Paulo (SP) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em São Paulo (SP): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em São Paulo (SP): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Moema, Pinheiros, Tatuapé, Santana e toda São Paulo.',
    keywords: 'cardápio digital barato são paulo, cardápio digital em são paulo, cardápio digital sp, sistema de delivery são paulo, cardápio digital para restaurante são paulo, cardápio online são paulo, delivery sem comissão são paulo, alternativa ao ifood são paulo, cardápio digital moema, cardápio digital pinheiros, cardápio digital tatuapé, qr code cardápio são paulo, cardápio digital para hamburgueria sp',
    nota: 'São Paulo é a praça mais cara do país para vender por aplicativo: com o volume de pedidos da cidade, cada ponto percentual de comissão vira milhares de reais por mês.',
    bairrosTop: ['Moema', 'Pinheiros', 'Vila Mariana', 'Tatuapé', 'Itaim Bibi', 'Santana', 'Vila Madalena', 'Perdizes', 'Brooklin', 'Mooca', 'Santo Amaro', 'Ipiranga'],
    bairrosTodos: ['Moema', 'Pinheiros', 'Vila Mariana', 'Tatuapé', 'Itaim Bibi', 'Santana', 'Vila Madalena', 'Perdizes', 'Brooklin', 'Mooca', 'Santo Amaro', 'Ipiranga', 'Morumbi', 'Jabaquara', 'Lapa', 'Butantã', 'Penha', 'Bela Vista', 'Consolação', 'Campo Belo', 'Saúde', 'Vila Prudente', 'Freguesia do Ó', 'Casa Verde', 'Interlagos', 'Vila Olímpia', 'Higienópolis', 'Aclimação'],
    chips: ['cardápio digital barato São Paulo', 'delivery sem comissão SP', 'sair do iFood São Paulo', 'cardápio digital Moema', 'cardápio digital Pinheiros', 'QR Code cardápio SP', 'cardápio Tatuapé', 'sistema delivery Santana'],
  },

  {
    slug: 'cardapio-digital-rio-de-janeiro.html',
    city: 'Rio de Janeiro',
    region: 'RJ',
    prep: 'no',
    de: 'do Rio de Janeiro',
    toda: 'todo o Rio de Janeiro',
    geo: 'BR-RJ',
    stateName: 'Rio de Janeiro',
    metro: 'Grande Rio',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-serra.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery no Rio de Janeiro, RJ',
    title: 'Cardápio Digital Barato no Rio de Janeiro (RJ) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato no Rio de Janeiro (RJ): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery no Rio de Janeiro (RJ): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Copacabana, Barra da Tijuca, Tijuca, Botafogo e todo o Rio.',
    keywords: 'cardápio digital barato rio de janeiro, cardápio digital no rio de janeiro, cardápio digital rj, sistema de delivery rio de janeiro, cardápio digital para restaurante rio, cardápio online rio de janeiro, delivery sem comissão rio, alternativa ao ifood rio de janeiro, cardápio digital copacabana, cardápio digital barra da tijuca, cardápio digital tijuca, qr code cardápio rj',
    nota: 'No Rio, delivery de praia e bairro de alto giro convivem: quem vende em Copacabana no verão sente na conta o quanto a comissão por pedido custa em alta temporada.',
    bairrosTop: ['Copacabana', 'Barra da Tijuca', 'Tijuca', 'Botafogo', 'Ipanema', 'Méier', 'Recreio dos Bandeirantes', 'Campo Grande', 'Jacarepaguá', 'Flamengo', 'Vila Isabel', 'Madureira'],
    bairrosTodos: ['Copacabana', 'Barra da Tijuca', 'Tijuca', 'Botafogo', 'Ipanema', 'Leblon', 'Méier', 'Recreio dos Bandeirantes', 'Campo Grande', 'Jacarepaguá', 'Flamengo', 'Vila Isabel', 'Madureira', 'Bangu', 'Centro do Rio', 'Laranjeiras', 'Grajaú', 'Penha', 'Ilha do Governador', 'Santa Teresa', 'Freguesia', 'Taquara', 'Realengo', 'Copacabana Posto 6', 'Humaitá', 'Catete', 'Irajá'],
    chips: ['cardápio digital barato Rio', 'delivery sem comissão RJ', 'sair do iFood Rio de Janeiro', 'cardápio digital Copacabana', 'cardápio Barra da Tijuca', 'QR Code cardápio RJ', 'cardápio Tijuca', 'sistema delivery Botafogo'],
  },

  {
    slug: 'cardapio-digital-belo-horizonte.html',
    city: 'Belo Horizonte',
    region: 'MG',
    prep: 'em',
    de: 'de Belo Horizonte',
    toda: 'toda Belo Horizonte',
    geo: 'BR-MG',
    stateName: 'Minas Gerais',
    metro: 'Grande BH',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-vitoria.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Belo Horizonte, MG',
    title: 'Cardápio Digital Barato em Belo Horizonte (MG) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Belo Horizonte (MG): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Belo Horizonte (MG): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Savassi, Buritis, Pampulha, Funcionários e toda BH.',
    keywords: 'cardápio digital barato belo horizonte, cardápio digital em bh, cardápio digital mg, sistema de delivery belo horizonte, cardápio digital para restaurante bh, cardápio online belo horizonte, delivery sem comissão bh, alternativa ao ifood belo horizonte, cardápio digital savassi, cardápio digital buritis, cardápio digital pampulha, qr code cardápio bh',
    nota: 'BH é uma das capitais que mais pede delivery de bar e hamburgueria no país — e é onde um cardápio próprio com WhatsApp costuma pagar a mensalidade no primeiro fim de semana.',
    bairrosTop: ['Savassi', 'Funcionários', 'Buritis', 'Pampulha', 'Lourdes', 'Cidade Nova', 'Santa Efigênia', 'Prado', 'Sion', 'Barreiro', 'Belvedere', 'Castelo'],
    bairrosTodos: ['Savassi', 'Funcionários', 'Buritis', 'Pampulha', 'Lourdes', 'Cidade Nova', 'Santa Efigênia', 'Prado', 'Sion', 'Barreiro', 'Belvedere', 'Castelo', 'Santa Tereza', 'Floresta', 'Gutierrez', 'Serra', 'Padre Eustáquio', 'Venda Nova', 'Santo Antônio', 'Anchieta', 'Ouro Preto', 'Céu Azul', 'São Bento', 'Carlos Prates', 'Centro de BH', 'Nova Suíça'],
    chips: ['cardápio digital barato BH', 'delivery sem comissão BH', 'sair do iFood Belo Horizonte', 'cardápio digital Savassi', 'cardápio digital Buritis', 'QR Code cardápio MG', 'cardápio Pampulha', 'sistema delivery Funcionários'],
  },

  {
    slug: 'cardapio-digital-brasilia.html',
    city: 'Brasília',
    region: 'DF',
    prep: 'em',
    de: 'de Brasília',
    toda: 'todo o Distrito Federal',
    geo: 'BR-DF',
    stateName: 'Distrito Federal',
    metro: 'Distrito Federal',
    regiaoFrase: 'todo o Brasil',
    bairroWord: 'região',
    physicalAddress: false,
    heroImg: 'local-cariacica.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Brasília, DF',
    title: 'Cardápio Digital Barato em Brasília (DF) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Brasília (DF): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Brasília (DF): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Asa Sul, Asa Norte, Águas Claras, Taguatinga e todo o DF.',
    keywords: 'cardápio digital barato brasília, cardápio digital em brasília, cardápio digital df, sistema de delivery brasília, cardápio digital para restaurante brasília, cardápio online brasília, delivery sem comissão df, alternativa ao ifood brasília, cardápio digital asa sul, cardápio digital águas claras, cardápio digital taguatinga, qr code cardápio df',
    nota: 'Em Brasília o delivery se organiza por região administrativa e quadra — configurar taxa de entrega por região é o que separa o pedido que dá lucro do pedido que dá prejuízo.',
    bairrosTop: ['Asa Sul', 'Asa Norte', 'Águas Claras', 'Taguatinga', 'Lago Sul', 'Sudoeste', 'Guará', 'Ceilândia', 'Vicente Pires', 'Lago Norte', 'Samambaia', 'Sobradinho'],
    bairrosTodos: ['Asa Sul', 'Asa Norte', 'Águas Claras', 'Taguatinga', 'Lago Sul', 'Lago Norte', 'Sudoeste', 'Guará', 'Ceilândia', 'Samambaia', 'Vicente Pires', 'Sobradinho', 'Gama', 'Planaltina', 'Núcleo Bandeirante', 'Cruzeiro', 'Octogonal', 'Park Sul', 'Jardim Botânico', 'Recanto das Emas', 'Santa Maria', 'Riacho Fundo', 'Setor Noroeste', 'São Sebastião'],
    chips: ['cardápio digital barato Brasília', 'delivery sem comissão DF', 'sair do iFood Brasília', 'cardápio digital Asa Sul', 'cardápio Águas Claras', 'QR Code cardápio DF', 'cardápio Taguatinga', 'sistema delivery Asa Norte'],
  },

  {
    slug: 'cardapio-digital-curitiba.html',
    city: 'Curitiba',
    region: 'PR',
    prep: 'em',
    de: 'de Curitiba',
    toda: 'toda Curitiba',
    geo: 'BR-PR',
    stateName: 'Paraná',
    metro: 'Grande Curitiba',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-viana.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Curitiba, PR',
    title: 'Cardápio Digital Barato em Curitiba (PR) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Curitiba (PR): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Curitiba (PR): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Batel, Água Verde, Santa Felicidade, Portão e toda Curitiba.',
    keywords: 'cardápio digital barato curitiba, cardápio digital em curitiba, cardápio digital pr, sistema de delivery curitiba, cardápio digital para restaurante curitiba, cardápio online curitiba, delivery sem comissão curitiba, alternativa ao ifood curitiba, cardápio digital batel, cardápio digital água verde, cardápio digital santa felicidade, qr code cardápio curitiba',
    nota: 'Curitiba tem inverno longo e pico de delivery à noite: quem tem cardápio próprio dispara promoção no WhatsApp em dia frio e enche a cozinha sem pagar comissão.',
    bairrosTop: ['Batel', 'Água Verde', 'Bigorrilho', 'Santa Felicidade', 'Portão', 'Cabral', 'Rebouças', 'Juvevê', 'Cristo Rei', 'Boa Vista', 'Bacacheri', 'Centro'],
    bairrosTodos: ['Batel', 'Água Verde', 'Bigorrilho', 'Santa Felicidade', 'Portão', 'Cabral', 'Rebouças', 'Juvevê', 'Cristo Rei', 'Boa Vista', 'Bacacheri', 'Centro de Curitiba', 'Champagnat', 'Mercês', 'Ahú', 'Hauer', 'Pinheirinho', 'Cajuru', 'Sítio Cercado', 'Uberaba', 'Novo Mundo', 'Xaxim', 'Capão Raso', 'Jardim Botânico'],
    chips: ['cardápio digital barato Curitiba', 'delivery sem comissão PR', 'sair do iFood Curitiba', 'cardápio digital Batel', 'cardápio Água Verde', 'QR Code cardápio PR', 'cardápio Santa Felicidade', 'sistema delivery Portão'],
  },

  {
    slug: 'cardapio-digital-porto-alegre.html',
    city: 'Porto Alegre',
    region: 'RS',
    prep: 'em',
    de: 'de Porto Alegre',
    toda: 'toda Porto Alegre',
    geo: 'BR-RS',
    stateName: 'Rio Grande do Sul',
    metro: 'Grande Porto Alegre',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-guarapari.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Porto Alegre, RS',
    title: 'Cardápio Digital Barato em Porto Alegre (RS) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Porto Alegre (RS): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Porto Alegre (RS): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Moinhos de Vento, Menino Deus, Petrópolis, Cidade Baixa e toda POA.',
    keywords: 'cardápio digital barato porto alegre, cardápio digital em porto alegre, cardápio digital rs, sistema de delivery porto alegre, cardápio digital para restaurante poa, cardápio online porto alegre, delivery sem comissão porto alegre, alternativa ao ifood porto alegre, cardápio digital moinhos de vento, cardápio digital cidade baixa, cardápio digital menino deus, qr code cardápio rs',
    nota: 'Em Porto Alegre a concorrência de hamburgueria e bar é alta e a margem é apertada: tirar a comissão do meio costuma ser o ajuste mais rápido no lucro do mês.',
    bairrosTop: ['Moinhos de Vento', 'Menino Deus', 'Petrópolis', 'Cidade Baixa', 'Bom Fim', 'Bela Vista', 'Higienópolis', 'Tristeza', 'Partenon', 'Auxiliadora', 'Santana', 'Ipanema'],
    bairrosTodos: ['Moinhos de Vento', 'Menino Deus', 'Petrópolis', 'Cidade Baixa', 'Bom Fim', 'Bela Vista', 'Higienópolis', 'Tristeza', 'Partenon', 'Auxiliadora', 'Santana', 'Ipanema', 'Centro Histórico', 'Rio Branco', 'Jardim Botânico', 'Azenha', 'Sarandi', 'Cavalhada', 'Restinga', 'Teresópolis', 'Passo d\'Areia', 'Cristal', 'Vila Nova', 'Jardim Itu'],
    chips: ['cardápio digital barato Porto Alegre', 'delivery sem comissão RS', 'sair do iFood Porto Alegre', 'cardápio Moinhos de Vento', 'cardápio digital Cidade Baixa', 'QR Code cardápio RS', 'cardápio Menino Deus', 'sistema delivery Petrópolis'],
  },

  {
    slug: 'cardapio-digital-salvador.html',
    city: 'Salvador',
    region: 'BA',
    prep: 'em',
    de: 'de Salvador',
    toda: 'toda Salvador',
    geo: 'BR-BA',
    stateName: 'Bahia',
    metro: 'Grande Salvador',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-vila-velha.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Salvador, BA',
    title: 'Cardápio Digital Barato em Salvador (BA) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Salvador (BA): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Salvador (BA): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Barra, Pituba, Rio Vermelho, Itaigara e toda Salvador.',
    keywords: 'cardápio digital barato salvador, cardápio digital em salvador, cardápio digital ba, sistema de delivery salvador, cardápio digital para restaurante salvador, cardápio online salvador, delivery sem comissão salvador, alternativa ao ifood salvador, cardápio digital barra, cardápio digital pituba, cardápio digital rio vermelho, qr code cardápio bahia',
    nota: 'Salvador tem delivery forte o ano inteiro e explode em temporada e festa: com cardápio próprio, cada cliente da alta temporada vira base sua para o resto do ano.',
    bairrosTop: ['Barra', 'Pituba', 'Rio Vermelho', 'Itaigara', 'Ondina', 'Caminho das Árvores', 'Imbuí', 'Costa Azul', 'Stella Maris', 'Itapuã', 'Brotas', 'Graça'],
    bairrosTodos: ['Barra', 'Pituba', 'Rio Vermelho', 'Itaigara', 'Ondina', 'Caminho das Árvores', 'Imbuí', 'Costa Azul', 'Stella Maris', 'Itapuã', 'Brotas', 'Graça', 'Federação', 'Canela', 'Cabula', 'Pernambués', 'Paralela', 'Patamares', 'Piatã', 'Amaralina', 'Nazaré', 'Bonfim', 'Cajazeiras', 'Vitória', 'Pituaçu'],
    chips: ['cardápio digital barato Salvador', 'delivery sem comissão BA', 'sair do iFood Salvador', 'cardápio digital Barra', 'cardápio digital Pituba', 'QR Code cardápio Salvador', 'cardápio Rio Vermelho', 'sistema delivery Itaigara'],
  },

  {
    slug: 'cardapio-digital-fortaleza.html',
    city: 'Fortaleza',
    region: 'CE',
    prep: 'em',
    de: 'de Fortaleza',
    toda: 'toda Fortaleza',
    geo: 'BR-CE',
    stateName: 'Ceará',
    metro: 'Grande Fortaleza',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-serra.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Fortaleza, CE',
    title: 'Cardápio Digital Barato em Fortaleza (CE) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Fortaleza (CE): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Fortaleza (CE): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Aldeota, Meireles, Cocó, Papicu e toda Fortaleza.',
    keywords: 'cardápio digital barato fortaleza, cardápio digital em fortaleza, cardápio digital ce, sistema de delivery fortaleza, cardápio digital para restaurante fortaleza, cardápio online fortaleza, delivery sem comissão fortaleza, alternativa ao ifood fortaleza, cardápio digital aldeota, cardápio digital meireles, cardápio digital cocó, qr code cardápio fortaleza',
    nota: 'Fortaleza é uma das capitais com maior uso de WhatsApp para pedir comida — atender no canal que o cliente já usa custa menos e converte mais que anúncio.',
    bairrosTop: ['Aldeota', 'Meireles', 'Cocó', 'Papicu', 'Varjota', 'Benfica', 'Montese', 'Messejana', 'Edson Queiroz', 'Parquelândia', 'Dionísio Torres', 'Fátima'],
    bairrosTodos: ['Aldeota', 'Meireles', 'Cocó', 'Papicu', 'Varjota', 'Benfica', 'Montese', 'Messejana', 'Edson Queiroz', 'Parquelândia', 'Dionísio Torres', 'Fátima', 'Praia de Iracema', 'Joaquim Távora', 'Centro de Fortaleza', 'Água Fria', 'Cambeba', 'Sapiranga', 'Passaré', 'Parangaba', 'Antônio Bezerra', 'Barra do Ceará', 'Mucuripe', 'José Bonifácio'],
    chips: ['cardápio digital barato Fortaleza', 'delivery sem comissão CE', 'sair do iFood Fortaleza', 'cardápio digital Aldeota', 'cardápio digital Meireles', 'QR Code cardápio CE', 'cardápio Cocó', 'sistema delivery Papicu'],
  },

  {
    slug: 'cardapio-digital-recife.html',
    city: 'Recife',
    region: 'PE',
    prep: 'no',
    de: 'do Recife',
    toda: 'todo o Recife',
    geo: 'BR-PE',
    stateName: 'Pernambuco',
    metro: 'Grande Recife',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-vitoria.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery no Recife, PE',
    title: 'Cardápio Digital Barato no Recife (PE) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato no Recife (PE): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery no Recife (PE): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Boa Viagem, Espinheiro, Casa Forte, Graças e todo o Recife.',
    keywords: 'cardápio digital barato recife, cardápio digital no recife, cardápio digital pe, sistema de delivery recife, cardápio digital para restaurante recife, cardápio online recife, delivery sem comissão recife, alternativa ao ifood recife, cardápio digital boa viagem, cardápio digital casa forte, cardápio digital espinheiro, qr code cardápio recife',
    nota: 'Boa Viagem sozinha concentra um volume enorme de pedidos por app no Recife — é onde a diferença entre pagar comissão e ter cardápio próprio aparece mais rápido no caixa.',
    bairrosTop: ['Boa Viagem', 'Espinheiro', 'Casa Forte', 'Graças', 'Pina', 'Torre', 'Madalena', 'Rosarinho', 'Aflitos', 'Imbiribeira', 'Boa Vista', 'Santo Amaro'],
    bairrosTodos: ['Boa Viagem', 'Espinheiro', 'Casa Forte', 'Graças', 'Pina', 'Torre', 'Madalena', 'Rosarinho', 'Aflitos', 'Imbiribeira', 'Boa Vista', 'Santo Amaro', 'Várzea', 'Cordeiro', 'Tamarineira', 'Jaqueira', 'Parnamirim', 'Setúbal', 'Ibura', 'Afogados', 'Encruzilhada', 'Prado', 'Bongi', 'Iputinga'],
    chips: ['cardápio digital barato Recife', 'delivery sem comissão PE', 'sair do iFood Recife', 'cardápio Boa Viagem', 'cardápio digital Casa Forte', 'QR Code cardápio PE', 'cardápio Espinheiro', 'sistema delivery Pina'],
  },

  {
    slug: 'cardapio-digital-goiania.html',
    city: 'Goiânia',
    region: 'GO',
    prep: 'em',
    de: 'de Goiânia',
    toda: 'toda Goiânia',
    geo: 'BR-GO',
    stateName: 'Goiás',
    metro: 'Grande Goiânia',
    regiaoFrase: 'todo o Brasil',
    physicalAddress: false,
    heroImg: 'local-cariacica.webp',
    heroAlt: 'Cardápio digital barato para restaurantes e delivery em Goiânia, GO',
    title: 'Cardápio Digital Barato em Goiânia (GO) sem Comissão | Menuzia',
    h1: 'Cardápio digital barato em Goiânia (GO): venda direto, sem comissão',
    desc: 'Cardápio digital barato para restaurantes, hamburguerias e delivery em Goiânia (GO): R$67/mês fixo, sem comissão por pedido, pedidos no WhatsApp. Atendemos Setor Bueno, Setor Marista, Jardim Goiás, Setor Oeste e toda Goiânia.',
    keywords: 'cardápio digital barato goiânia, cardápio digital em goiânia, cardápio digital go, sistema de delivery goiânia, cardápio digital para restaurante goiânia, cardápio online goiânia, delivery sem comissão goiânia, alternativa ao ifood goiânia, cardápio digital setor bueno, cardápio digital setor marista, cardápio digital jardim goiás, qr code cardápio goiânia',
    nota: 'Em Goiânia o delivery se organiza por setor: definir a taxa de entrega setor a setor evita corrida longa que come toda a margem do pedido.',
    bairroWord: 'setor',
    bairrosTop: ['Setor Bueno', 'Setor Marista', 'Jardim Goiás', 'Setor Oeste', 'Setor Sul', 'Setor Central', 'Setor Aeroporto', 'Alto da Glória', 'Setor Coimbra', 'Setor Pedro Ludovico', 'Parque Amazônia', 'Setor Campinas'],
    bairrosTodos: ['Setor Bueno', 'Setor Marista', 'Jardim Goiás', 'Setor Oeste', 'Setor Sul', 'Setor Central', 'Setor Aeroporto', 'Alto da Glória', 'Setor Coimbra', 'Setor Pedro Ludovico', 'Parque Amazônia', 'Setor Campinas', 'Vila Nova', 'Jardim América', 'Setor Universitário', 'Cidade Jardim', 'Setor Nova Suíça', 'Faiçalville', 'Jardim Guanabara', 'Setor Leste Vila Nova', 'Negrão de Lima', 'Vera Cruz', 'Setor Criméia', 'Goiânia 2'],
    chips: ['cardápio digital barato Goiânia', 'delivery sem comissão GO', 'sair do iFood Goiânia', 'cardápio Setor Bueno', 'cardápio Setor Marista', 'QR Code cardápio GO', 'cardápio Jardim Goiás', 'sistema delivery Setor Oeste'],
  },
];

// Defaults (cidade nova = só dados). ES continua com os valores antigos.
cities.forEach(c => {
  c.prep = c.prep || 'em';
  c.de = c.de || `de ${c.city}`;
  c.toda = c.toda || `toda ${c.city}`;
  c.geo = c.geo || 'BR-ES';
  c.stateName = c.stateName || 'Espírito Santo';
  c.metro = c.metro || 'Grande Vitória';
  c.regiaoFrase = c.regiaoFrase || 'toda a Grande Vitória';
  c.bairroWord = c.bairroWord || 'bairro';
  c.bairroWordPl = c.bairroWord === 'região' ? 'regiões' : c.bairroWord + 's';
  c.metroFrase = c.metroFrase || (c.region === 'DF' ? `todo o ${c.metro}` : `toda a ${c.metro}`);
  c.faq = c.faq || genFaq(c);   // genFaq é declaração de função (hoisted)
});

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
<meta name="geo.region" content="${c.geo}">
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
  const addr = c.physicalAddress
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
  "name": "${NAP.name} — Cardápio digital ${c.prep} ${c.city}",
  "description": "${jsonStr(c.desc)}",
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
  "areaServed": { "@type": "City", "name": "${c.city}", "containedInPlace": { "@type": "State", "name": "${c.stateName}" } },
  "url": "${SITE}${url}",
  "offers": { "@type": "Offer", "price": "67.00", "priceCurrency": "BRL" }
}
</script>`;

const faqLd = (c) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${c.faq.map(([q, a]) => `    { "@type": "Question", "name": "${jsonStr(q)}", "acceptedAnswer": { "@type": "Answer", "text": "${jsonStr(a.replace(/<[^>]+>/g, ''))}" } }`).join(',\n')}
  ]
}
</script>`;

const breadcrumbLd = (c, url) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "${SITE}/" },
    { "@type": "ListItem", "position": 2, "name": "Cardápio digital ${c.prep} ${c.city}", "item": "${SITE}${url}" }
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

const ctaBox = (c) => `<div class="cta-box">
  <h3>Tenha seu cardápio digital ${c.prep} ${c.city} hoje</h3>
  <p>Pare de pagar comissão. R$67/mês fixo, nós configuramos pra você e damos suporte.</p>
  <a href="${SITE}/#precos" class="btn-vermelho">Criar Meu Cardápio Agora →</a>
</div>`;

const faqSection = (c) => `<div class="faq">
  <h2>Perguntas frequentes — cardápio digital ${c.prep} ${c.city}</h2>
${c.faq.map(([q, a]) => `  <div class="faq-item">
    <h3>${q}</h3>
    <p>${a}</p>
  </div>`).join('\n')}
</div>`;

const sidebar = (c) => {
  // mesma UF primeiro (relevância local), depois outras capitais — lista curta + hub
  const mesmaUf = cities.filter(o => o.slug !== c.slug && o.region === c.region).slice(0, 5);
  const outrasUf = cities.filter(o => o.slug !== c.slug && o.region !== c.region).slice(0, 5);
  const outras = [...mesmaUf, ...outrasUf]
    .map(o => `      <li><a href="${o.slug}"><span class="side-cat">${o.region}</span>Cardápio digital ${o.prep} ${o.city}</a></li>`).join('\n')
    + `\n      <li><a href="cidades.html"><span class="side-cat">Brasil</span>Ver todas as cidades atendidas</a></li>`;
  return `<aside class="sidebar">
  <div class="sidebar-box">
    <h3>Busca rápida</h3>
    <div class="side-chips">
${c.chips.map(t => `      <a href="${SITE}/#precos">${t}</a>`).join('\n')}
    </div>
  </div>
  ${outras ? `<div class="sidebar-box">
    <h3>Outras cidades</h3>
    <ul>
${outras}
    </ul>
  </div>` : ''}
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
};

const localFooter = (c) => {
  const enderecoLinha = c.physicalAddress
    ? `<li>📍 ${NAP.street} — ${NAP.district}, ${NAP.city}/${NAP.region}${NAP.postalCode ? ', ' + NAP.postalCode : ''}</li>`
    : `<li>📍 Atendimento online em ${c.toda} e região metropolitana (${c.region})</li>`;
  return `<footer class="local-footer">
  <div class="lf-grid">
    <div class="lf-col">
      <div class="footer-logo">menuzia</div>
      <p>Cardápio digital sem comissão para restaurantes, hamburguerias e delivery ${c.prep} ${c.city} e em ${c.metroFrase}.</p>
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
      <h4>${c.bairroWordPl.charAt(0).toUpperCase() + c.bairroWordPl.slice(1)} ${c.de} que atendemos</h4>
      <div class="lf-bairros">
        ${c.bairrosTodos.map(b => `<span>${b}</span>`).join(' · ')}
      </div>
    </div>
  </div>
  <div class="lf-bottom">
    <a href="${SITE}/">Início</a> · <a href="${B}index.html">Blog</a> · <a href="${SITE}/#precos">Preços</a> · <a href="${SITE}/#duvidas">Dúvidas</a><br>
    © 2026 Menuzia. Cardápio digital sem comissão ${c.prep} ${c.city} (${c.region}) — hamburguerias, pizzarias e delivery.
  </div>
</footer>`;
};

// Corpo padrão gerado a partir dos dados da cidade (pra escalar: cidade nova = só dados).
// Requer: c.prep ('em'/'na'), c.toda (ex: 'toda a Serra'), c.bairrosTop (>=6).
// Cidades com body próprio (c.body) ignoram isto.
function genBody(c) {
  const b = c.bairrosTop, p = c.prep, bw = c.bairroWord, bwp = c.bairroWordPl;
  return `<p>Se você tem um restaurante, hamburgueria ou delivery ${p} <strong>${c.city}</strong>, já sabe quanto a comissão das plataformas pesa no fim do mês. Um <strong>cardápio digital próprio e barato</strong> resolve isso: o cliente pede pelo seu link, o pedido cai direto no seu WhatsApp e <strong>todo o lucro fica com você</strong>. Sem taxa por pedido, sem perder a sua base de clientes.</p>

<p>O Menuzia é a plataforma de cardápio digital sem comissão que atende delivery em ${c.regiaoFrase} — e este guia é focado em quem vende ${p} <strong>${c.city} (${c.region})</strong>, de ${b[0]} a ${b[5]}.</p>
${c.nota ? `<p>${c.nota}</p>\n` : ''}
<h2>Por que restaurantes ${c.de} estão trocando o iFood pelo cardápio próprio</h2>
<p>A comissão do iFood vai de 12% a mais de 30% por pedido. Para um delivery que fatura bem em ${b[0]} ou ${b[1]}, isso vira milhares de reais por mês indo embora — e a lista de clientes continua sendo da plataforma, não sua.</p>
<ul>
  <li><strong>Sem comissão:</strong> R$67/mês fixo, venda quanto vender.</li>
  <li><strong>Base de clientes sua:</strong> quem pede em ${b[2]}, ${b[3]} ou ${b[4]} entra na <em>sua</em> lista pra sempre.</li>
  <li><strong>Pedido direto no caixa:</strong> sem intermediário entre você e o cliente ${c.de}.</li>
</ul>
<p>Veja o passo a passo completo de <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> sem perder clientes.</p>

<h2>Cardápio digital para delivery em qualquer ${bw} ${c.de}</h2>
<p>O cardápio do Menuzia funciona 100% online — não importa se o seu delivery fica em <strong>${b[0]}</strong>, <strong>${b[1]}</strong>, em <strong>${b[2]}</strong>, em <strong>${b[3]}</strong> ou em <strong>${b[5]}</strong>. Você define a taxa de entrega por ${bw}, conecta o WhatsApp e começa a receber pedidos no mesmo dia.</p>
<p>É ideal para hamburguerias, pizzarias, açaíterias, restaurantes e lanchonetes que querem profissionalizar o delivery sem depender do iFood. Veja <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">como criar um cardápio digital para hamburgueria</a> passo a passo.</p>

<div class="bairros-block">
  <h2>Atendemos todo o delivery ${c.de}</h2>
  <p>O Menuzia configura o cardápio digital de restaurantes e deliverys nestes e em ${bw === 'região' ? 'todas as regiões' : 'todos os ' + bwp} ${c.de}:</p>
  <ul class="bairros-grid">
{{BAIRROS_GRID}}
  </ul>
</div>

<h2>Cardápio digital barato ${p} ${c.city}: quanto custa de verdade</h2>
<p>No Menuzia é <strong>R$67/mês fixo, sem comissão por pedido</strong> — com configuração feita pela nossa equipe e suporte incluso. Compare: um delivery ${p} ${c.city} que fatura R$25 mil/mês pagando 18% de comissão joga fora R$4.500 todo mês. Com um plano fixo, esse dinheiro volta pro seu caixa.</p>
<p>É por isso que "barato" aqui não é cardápio ruim: é <strong>custo previsível</strong>. Você sabe exatamente quanto vai pagar no mês, venda 50 ou 5.000 pedidos. Veja o <a href="/cardapio-digital-barato.html">plano de cardápio digital barato</a>, entenda <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a> e se <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>Como começar ${p} ${c.city} (passo a passo)</h2>
<ol>
  <li><strong>Você assina o Menuzia</strong> por R$67/mês.</li>
  <li><strong>Nossa equipe monta o seu cardápio digital</strong> com fotos, categorias e taxa de entrega por ${bw} ${c.de}.</li>
  <li><strong>Conectamos o WhatsApp</strong> e o robô de atendimento 24h.</li>
  <li><strong>Você divulga o link</strong> na bio do Instagram, no status do WhatsApp e em panfletos com QR Code pela cidade.</li>
  <li><strong>Os pedidos caem direto no seu caixa</strong> — e cada cliente vira base sua pra disparar <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanhas de WhatsApp</a>.</li>
</ol>`;
}

// FAQ padrão (cidade nova = só dados). Cidades com c.faq próprio ignoram isto.
function genFaq(c) {
  const b = c.bairrosTop, p = c.prep, bw = c.bairroWord;
  return [
    [`O Menuzia atende restaurantes ${p} ${c.city}?`, `Sim. O Menuzia atende restaurantes, hamburguerias, pizzarias, açaíterias e qualquer delivery em <strong>${c.toda}</strong> — de ${b[0]} e ${b[1]} a ${b[6]}, ${b[7]} e ${b[8]}. Tudo é online: nossa equipe configura o seu cardápio digital remotamente e dá suporte.`],
    [`Quanto custa um cardápio digital ${p} ${c.city}?`, `O Menuzia custa <strong>R$67 por mês, valor fixo, sem comissão por pedido</strong>. É um dos cardápios digitais mais baratos ${p} ${c.city} justamente porque o preço não sobe quando você vende mais — diferente do iFood, que cobra uma porcentagem de cada venda.`],
    [`Existe cardápio digital grátis ${p} ${c.city}?`, `Existem opções "grátis" que cobram comissão por pedido ou limitam recursos essenciais (WhatsApp, taxa por ${bw}, relatórios). Na prática, o grátis costuma sair mais caro que R$67/mês assim que o volume de pedidos cresce.`],
    [`Preciso de loja física para ter o cardápio digital?`, `Não. Funciona com o seu delivery em qualquer ${bw} ${c.de}. O cliente abre o link do cardápio no celular, escolhe e o pedido cai direto no seu WhatsApp e no seu caixa, sem aplicativo.`],
    [`Dá para configurar entrega por ${bw} ${c.de}?`, `Sim. Você define a <strong>taxa de entrega por ${bw}</strong> — ${b[0]}, ${b[1]}, ${b[2]}, ${b[3]} e os demais — além de raio de entrega, pagamento (Pix, cartão, dinheiro) e horários.`],
  ];
}

function page(c) {
  const url = '/' + c.slug;
  const bairrosGrid = c.bairrosTodos.map(b => `    <li>${b}</li>`).join('\n');
  const body = (c.body || genBody(c))
    .replace('{{BAIRROS_GRID}}', bairrosGrid)
    .replace(/href="\/blog\//g, `href="${B}`)
    .replace(/href="\/#/g, `href="${SITE}/#`)
    .replace(/href="\/"/g, `href="${SITE}/"`)
    .replace(/href="\/(cardapio-|cidades)/g, 'href="$1');   // páginas da raiz -> relativo
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
  <div class="breadcrumb"><a href="${SITE}/">Início</a> › <a href="cidades.html">Cidades</a> › Cardápio digital ${c.prep} ${c.city}</div>
  <span class="cat">${c.city} · ${c.region}</span>
  <h1>${c.h1}</h1>
  <div class="meta">Atendemos restaurantes e delivery em ${c.toda} · Equipe Menuzia</div>
  <figure class="artigo-hero">
    <img src="assets/img/blog/${c.heroImg}" alt="${c.heroAlt}" width="1200" height="675" loading="eager" fetchpriority="high" decoding="async">
  </figure>
  ${body}
  ${faqSection(c)}
  ${ctaBox(c)}
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

// ------------------------------------------------------------
//  HUB /cidades.html — índice de todas as cidades (link interno + escala)
// ------------------------------------------------------------
function hub() {
  const url = '/cidades.html';
  const title = 'Cardápio Digital Barato por Cidade no Brasil | Menuzia';
  const desc = 'Cardápio digital barato e sem comissão por cidade: São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Curitiba, Porto Alegre, Salvador, Fortaleza, Recife, Goiânia e toda a Grande Vitória/ES. R$67/mês fixo.';
  const keywords = 'cardápio digital por cidade, cardápio digital barato, cardápio digital brasil, cardápio digital são paulo, cardápio digital rio de janeiro, cardápio digital belo horizonte, delivery sem comissão, cardápio digital espírito santo';
  const head_ = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="Menuzia">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#1d3e73">
<meta name="geo.region" content="BR">
<link rel="canonical" href="${SITE}${url}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<title>${title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:image" content="${SITE}/assets/img/blog/${cities[0].heroImg}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Menuzia">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}blog.css">`;
  const itemList = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
${cities.map((c, i) => `    { "@type": "ListItem", "position": ${i + 1}, "url": "${SITE}/${c.slug}", "name": "Cardápio digital ${c.prep} ${c.city}" }`).join(',\n')}
  ]
}
</script>`;
  const card = c => `    <a class="post-card" href="${c.slug}">
      <img class="post-card-img" src="assets/img/blog/${c.heroImg}" alt="${c.heroAlt}" width="600" height="338" loading="lazy" decoding="async">
      <div class="post-card-body">
        <span class="cat">${c.city} · ${c.region}</span>
        <h3>Cardápio digital ${c.prep} ${c.city}</h3>
        <p>Cardápio digital barato e sem comissão para delivery ${c.prep} ${c.city}. Pedidos no WhatsApp, base de clientes sua, R$67/mês fixo.</p>
        <span class="ler">Ver ${c.city} →</span>
      </div>
    </a>`;
  // agrupado por UF (ES primeiro — praça de origem), depois capitais
  const ufOrder = [...new Set(cities.map(c => c.region))];
  const ufNome = { ES: 'Espírito Santo — Grande Vitória', SP: 'São Paulo', RJ: 'Rio de Janeiro', MG: 'Minas Gerais', DF: 'Distrito Federal', PR: 'Paraná', RS: 'Rio Grande do Sul', BA: 'Bahia', CE: 'Ceará', PE: 'Pernambuco', GO: 'Goiás' };
  const cards = ufOrder.map(uf => `<h2 style="max-width:1180px;margin:36px auto 0;padding:0 24px;font-size:22px;color:#1d3e73;">${ufNome[uf] || uf}</h2>
<div class="blog-grid">
${cities.filter(c => c.region === uf).map(card).join('\n')}
</div>`).join('\n');
  return `${head_}
${itemList}
</head>
<body>
${header()}
<section class="blog-hero">
  <h1>Cardápio digital barato por cidade</h1>
  <p>Atendemos delivery em todo o Brasil — da Grande Vitória às maiores capitais. Escolha a sua cidade e venda direto, sem pagar comissão por pedido. R$67/mês fixo.</p>
</section>
${cards}
<footer class="local-footer">
  <div class="lf-grid">
    <div class="lf-col">
      <div class="footer-logo">menuzia</div>
      <p>Cardápio digital barato e sem comissão para restaurantes, hamburguerias e delivery. Atendimento 100% online em todo o Brasil.</p>
    </div>
    <div class="lf-col">
      <h4>Contato</h4>
      <ul class="lf-nap">
        <li>📱 <a href="https://wa.me/${NAP.phoneRaw}">${NAP.phoneDisplay}</a> (WhatsApp)</li>
        <li>✉️ <a href="mailto:${NAP.email}">${NAP.email}</a></li>
        <li>🕐 ${NAP.hours}</li>
      </ul>
    </div>
    <div class="lf-col">
      <h4>Cidades atendidas</h4>
      <div class="lf-bairros">${cities.map(c => `<a href="${c.slug}">${c.city}/${c.region}</a>`).join(' · ')}</div>
    </div>
  </div>
  <div class="lf-bottom">
    <a href="${SITE}/">Início</a> · <a href="${B}index.html">Blog</a> · <a href="${SITE}/#precos">Preços</a> · <a href="cardapio-digital-barato.html">Cardápio digital barato</a><br>
    © 2026 Menuzia. Cardápio digital barato e sem comissão para delivery em todo o Brasil.
  </div>
</footer>
</body>
</html>`;
}
fs.writeFileSync('cidades.html', hub());
console.log('wrote cidades.html');
