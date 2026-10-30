// Gerador de LANDINGS POR PALAVRA-CHAVE / SEGMENTO — páginas na RAIZ do site.
// Uso: node gennicho.js   (depois: git add / commit / subir os arquivos)
// Mesma identidade visual do blog (blog/blog.css) e do genlocal.js.
// Keyword nova = só mais um objeto no array `niches`.
const fs = require('fs');
const SITE = 'https://menuzia.com.br';

// escapa texto para dentro de string JSON (JSON-LD)
const jsonStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();

// NAP — manter idêntico ao genlocal.js (consistência de NAP = sinal de ranking)
const NAP = {
  name: 'Menuzia',
  phoneDisplay: '(27) 99253-4407',
  phoneRaw: '5527992534407',
  email: 'contato@menuzia.com.br',
  hours: '24 horas por dia, todos os dias (sempre aberto)',
};

const B = 'blog/'; // raiz -> pasta blog

// Cluster de GESTÃO (PDV, caixa, mesas, motoboy, disparos, fidelidade, integração, marketing, CMV):
// chips de cauda longa compartilhados — todas as páginas do cluster se linkam entre si.
const LT_GESTAO = [
  ['sistema PDV para delivery', 'sistema-pdv-para-delivery.html'],
  ['controle de caixa e sangria', 'controle-de-caixa-para-restaurante.html'],
  ['sistema de mesas e comandas', 'sistema-de-mesas-e-comandas.html'],
  ['rota de motoboy para delivery', 'rota-de-motoboy-para-delivery.html'],
  ['disparo em massa no WhatsApp', 'disparo-whatsapp-para-delivery.html'],
  ['programa de fidelidade e ticket médio', 'programa-de-fidelidade-para-delivery.html'],
  ['cardápio digital integrado ao iFood', 'cardapio-digital-integrado-ifood.html'],
  ['marketing para delivery', 'blog/marketing/marketing-para-delivery.html'],
  ['como fazer anúncios para delivery', 'blog/marketing/como-fazer-anuncios-para-delivery.html'],
  ['como calcular CMV', 'blog/guias/como-calcular-cmv-restaurante.html'],
  ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
];

// Cluster de DORES (atendimento, erro, atraso, comissão, calote, lucro, recompra): chips cruzados.
const LT_DORES = [
  ['agente de IA para delivery', 'agente-de-ia-para-delivery.html'],
  ['como tirar pedidos pelo WhatsApp', 'tirar-pedidos-pelo-whatsapp.html'],
  ['status do pedido no WhatsApp', 'status-do-pedido-no-whatsapp.html'],
  ['como evitar pedido errado no delivery', 'pedido-errado-no-delivery.html'],
  ['tela de cozinha KDS', 'tela-de-cozinha-kds.html'],
  ['alternativa ao iFood', 'alternativa-ao-ifood.html'],
  ['pagamento online para delivery', 'pagamento-online-para-delivery.html'],
  ['ficha técnica e precificação', 'ficha-tecnica-e-precificacao.html'],
  ['CRM para restaurante', 'crm-para-restaurante.html'],
  ['cashback para delivery', 'cashback-para-delivery.html'],
  ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
];

// Preços atuais da home. Página com `plano` usa estes textos; sem `plano` segue o texto antigo (R$67, pendente).
// 'modulo' = Agente de IA, módulo pago sem preço público: não publica Offer nem valor.
const PLANOS = {
  basico: { preco: '97.00', meta: 'Plano Básico R$97/mês' },
  completo: { preco: '149.00', meta: 'Plano Completo R$149/mês' },
  modulo: { preco: null, meta: 'Módulo Agente de IA' },
};
const WA_CTA = `https://wa.me/${NAP.phoneRaw}?text=Ol%C3%A1!%20Quero%20conhecer%20o%20Menuzia.`;

// ============================================================
//  Landings (uma por intenção de busca)
// ============================================================
const niches = [
  {
    slug: 'cardapio-digital-para-delivery.html',
    cat: 'Delivery',
    heroImg: 'local-vila-velha-2.webp',
    heroAlt: 'Entregador saindo com pedido feito pelo cardápio digital para delivery',
    title: 'Cardápio Digital para Delivery sem Comissão | R$67/mês | Menuzia',
    h1: 'Cardápio digital para delivery: receba pedidos sem pagar comissão',
    desc: 'Cardápio digital para delivery por R$67/mês fixo, sem comissão por pedido. Pedido cai no WhatsApp, taxa de entrega por bairro, base de clientes sua. Nós configuramos pra você.',
    keywords: 'cardápio digital para delivery, cardápio online para delivery, sistema de delivery próprio, plataforma de delivery sem comissão, cardápio digital delivery whatsapp, aplicativo de delivery próprio, cardápio digital para entrega',
    body: `<p>Um <strong>cardápio digital para delivery</strong> é o link onde o seu cliente escolhe, monta o pedido e envia — sem baixar aplicativo e sem passar por plataforma nenhuma. O pedido cai no seu WhatsApp e no seu painel, e o dinheiro inteiro entra no seu caixa.</p>

<h2>O que muda quando o delivery é seu</h2>
<ul>
  <li><strong>Sem comissão por pedido:</strong> R$67/mês fixo, venda 50 ou 5.000.</li>
  <li><strong>Base de clientes sua:</strong> nome, telefone e histórico ficam com você — não com a plataforma.</li>
  <li><strong>Taxa de entrega por bairro:</strong> corrida longa deixa de comer a margem.</li>
  <li><strong>Sem disputa de vitrine:</strong> ninguém coloca o concorrente ao lado do seu produto.</li>
</ul>

<h2>Como funciona na prática</h2>
<ol>
  <li>Você assina e manda fotos e itens; <strong>nossa equipe monta o cardápio</strong>.</li>
  <li>Conectamos o WhatsApp e o robô de atendimento 24h.</li>
  <li>Você divulga o link (bio do Instagram, status, QR Code na embalagem).</li>
  <li>Pedido entra → cozinha recebe → motoboy sai com a rota → cliente entra na sua base.</li>
</ol>

<h2>O que vem incluso</h2>
<ul>
  <li>Cardápio digital com categorias, fotos, adicionais e observações do cliente</li>
  <li>Painel de pedidos em tempo real e impressão automática</li>
  <li>Taxa de entrega por bairro e raio de entrega</li>
  <li>Pagamento no Pix, cartão e dinheiro (com troco)</li>
  <li>Campanhas de WhatsApp e robô de atendimento</li>
  <li>Gestão de motoboy com GPS e relatório de vendas</li>
</ul>

<h2>Quanto custa</h2>
<p><strong>R$67/mês, fixo, sem comissão.</strong> Um delivery que fatura R$20 mil/mês pagando 18% de comissão entrega R$3.600 por mês pra plataforma. No plano fixo, esse valor volta pro caixa. Veja a conta em <a href="/blog/precos/cardapio-digital-barato-quanto-custa.html">cardápio digital barato: quanto custa</a>.</p>

<h2>Serve pro meu tipo de delivery?</h2>
<p>Sim — hamburgueria, pizzaria, açaíteria, marmitaria, japonês, confeitaria, lanchonete, food truck. Veja as versões por segmento: <a href="/cardapio-digital-para-pizzaria.html">pizzaria</a>, <a href="/cardapio-digital-para-confeitaria.html">confeitaria</a> e <a href="/cardapio-digital-para-restaurante.html">restaurante</a>.</p>

<h2>E se eu já vendo por aplicativo?</h2>
<p>Não precisa desligar nada no primeiro dia. Mantenha o app como vitrine e vá migrando a base com cupom e <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code na embalagem</a>. O caminho completo está em <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a>.</p>`,
    faq: [
      ['Preciso de site pra ter cardápio digital para delivery?', 'Não. O cardápio já é um link pronto (ex.: seurestaurante.menuzia.com.br). Você coloca esse link na bio do Instagram, no status do WhatsApp e em QR Code impresso.'],
      ['O pedido chega no WhatsApp?', 'Sim. O pedido cai no seu WhatsApp e no painel de pedidos ao mesmo tempo, com itens, endereço, forma de pagamento e taxa de entrega já calculada.'],
      ['Tem taxa por pedido?', 'Não. São <strong>R$67 por mês, valor fixo</strong>. Nenhuma porcentagem sobre a venda, independente do volume de pedidos.'],
      ['Quanto tempo leva pra começar a vender?', 'Nossa equipe monta o cardápio e conecta o WhatsApp para você — normalmente dá para começar a receber pedidos no mesmo dia em que os produtos e fotos são enviados.'],
      ['Dá pra cobrar taxa de entrega diferente por bairro?', 'Sim. Você define valor por bairro e raio máximo de entrega, além de horários de funcionamento e tempo médio de preparo.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-restaurante.html',
    cat: 'Restaurante',
    heroImg: 'blog-sem-comissao.webp',
    heroAlt: 'Dono de restaurante conferindo pedidos no cardápio digital pelo tablet',
    title: 'Cardápio Digital para Restaurante: Salão e Delivery | R$67/mês | Menuzia',
    h1: 'Cardápio digital para restaurante: salão, QR Code na mesa e delivery',
    desc: 'Cardápio digital para restaurante por R$67/mês sem comissão: QR Code na mesa, pedidos no WhatsApp, delivery próprio e cardápio atualizado em segundos, sem reimprimir nada.',
    keywords: 'cardápio digital para restaurante, cardápio digital qr code mesa, cardápio online restaurante, cardápio digital para bar, sistema de pedidos para restaurante, cardápio digital sem comissão restaurante',
    body: `<p>No restaurante, o <strong>cardápio digital</strong> resolve dois problemas ao mesmo tempo: o cliente do salão pede pelo QR Code da mesa e o cliente de casa pede pelo mesmo link, sem intermediário e sem comissão.</p>

<h2>No salão: QR Code na mesa</h2>
<p>O cliente aponta a câmera, abre o cardápio com foto de cada prato e chama o garçom já decidido. Mudou o preço do dia? Você altera no painel e <strong>todas as mesas veem na hora</strong> — sem reimprimir cardápio, sem etiqueta colada por cima do preço antigo.</p>
<ul>
  <li>Prato esgotado desaparece do cardápio com um clique</li>
  <li>Foto em todo item — o que tem foto vende mais</li>
  <li>Sugestão de entrada, bebida e sobremesa aumentando o ticket</li>
  <li>Cardápio em página leve, abre rápido até com internet ruim</li>
</ul>

<h2>No delivery: o mesmo cardápio, sem comissão</h2>
<p>O link que está na mesa é o mesmo que você manda no Instagram e no WhatsApp. O pedido de entrega cai no seu painel com endereço e taxa por bairro calculada. Nada de porcentagem por venda: <strong>R$67/mês fixo</strong>.</p>

<h2>Por que sair da comissão importa mais em restaurante</h2>
<p>Restaurante trabalha com margem apertada e ticket médio maior que lanchonete. Em um pedido de R$120, 18% de comissão são R$21,60 — quase o custo do prato. Multiplique por 300 pedidos/mês e a conta fica clara. Compare em <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>O que está incluso</h2>
<ul>
  <li>Cardápio digital + QR Code pronto para imprimir</li>
  <li>Painel de pedidos, impressão automática e dashboard de vendas</li>
  <li>Campanhas de WhatsApp para a sua base de clientes</li>
  <li>Robô de atendimento 24h para dúvidas e status do pedido</li>
  <li>Configuração feita pela nossa equipe e suporte incluso</li>
</ul>

<h2>Comece pelo básico</h2>
<p>Cardápio curto e bem fotografado converte mais que cardápio gigante. Se você está montando do zero, vale ler <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">o passo a passo de criação</a> — o método serve para qualquer restaurante. Atendemos em <a href="/cidades.html">todo o Brasil</a>.</p>`,
    faq: [
      ['Serve para restaurante que só atende no salão?', 'Sim. Você pode usar apenas o QR Code na mesa, com o cardápio sempre atualizado e sem custo de reimpressão. O delivery fica disponível para quando quiser ligar.'],
      ['O cliente precisa instalar aplicativo?', 'Não. O cardápio abre no navegador do celular ao escanear o QR Code ou clicar no link.'],
      ['Consigo mudar preço e tirar prato do dia rapidamente?', 'Sim. A alteração no painel aparece imediatamente para todos os clientes, no salão e no delivery.'],
      ['Tem comissão sobre as vendas do salão ou do delivery?', 'Não. São R$67 por mês, valor fixo, sem taxa por pedido em nenhum dos dois canais.'],
      ['Funciona para bar e cafeteria?', 'Sim. O mesmo cardápio atende bar, cafeteria, restaurante por quilo, japonês e churrascaria — com categorias, adicionais e observações do cliente.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-whatsapp.html',
    cat: 'WhatsApp',
    heroImg: 'blog-whatsapp.webp',
    heroAlt: 'Pedido do cardápio digital chegando no WhatsApp do restaurante',
    title: 'Cardápio Digital para WhatsApp: Pedido Direto no Chat | Menuzia',
    h1: 'Cardápio digital para WhatsApp: o pedido cai direto no seu chat',
    desc: 'Cardápio digital integrado ao WhatsApp: o cliente monta o pedido no link e ele chega pronto no seu chat, com endereço, taxa e pagamento. R$67/mês, sem comissão.',
    keywords: 'cardápio digital para whatsapp, cardápio digital whatsapp grátis, cardápio no whatsapp, pedido pelo whatsapp delivery, link de cardápio para whatsapp, catálogo whatsapp restaurante, robô de atendimento whatsapp delivery',
    body: `<p>O seu cliente já vive no WhatsApp. Um <strong>cardápio digital para WhatsApp</strong> aproveita isso: ele abre o seu link, monta o pedido com fotos e adicionais, e o pedido chega <strong>formatado e completo</strong> no seu chat — sem aquele vai e volta de "tem X?", "quanto é a entrega?", "manda o cardápio".</p>

<h2>O problema do cardápio em foto ou PDF no WhatsApp</h2>
<ul>
  <li>Cliente pergunta preço item por item e você digita a mesma resposta 40 vezes por dia</li>
  <li>Pedido chega picado, em várias mensagens, e vira erro na cozinha</li>
  <li>Você calcula taxa e troco na mão, na correria</li>
  <li>Foto de cardápio antigo continua circulando por meses</li>
</ul>
<p>Se você usa PDF hoje, leia <a href="/cardapio-digital-pdf.html">por que cardápio em PDF não funciona no celular</a>.</p>

<h2>Como fica com o cardápio digital</h2>
<ol>
  <li>Você manda o link (ou o cliente escaneia o QR Code).</li>
  <li>Ele escolhe itens, adicionais, forma de pagamento e endereço.</li>
  <li>O pedido chega pronto no seu WhatsApp e no painel, com total e taxa já somados.</li>
  <li>O contato dele entra na <strong>sua base</strong> automaticamente.</li>
</ol>

<h2>Robô de atendimento 24h</h2>
<p>O robô responde cardápio, horário de funcionamento, taxa de entrega e status do pedido enquanto você está na chapa. À noite e no domingo ele continua vendendo.</p>

<h2>Campanha de WhatsApp: a venda mais barata que existe</h2>
<p>Com a base sua, você dispara promoção de terça, lançamento e reativação de quem sumiu — com texto, imagem e áudio, segmentado por frequência de compra. O método está em <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">como fazer campanha de WhatsApp para delivery</a>.</p>

<h2>Existe cardápio digital para WhatsApp grátis?</h2>
<p>Existem opções gratuitas — em geral com marca de terceiro, sem taxa por bairro, sem robô e sem base exportável; algumas cobram comissão por pedido, o que costuma sair bem mais caro que uma mensalidade fixa. A comparação honesta está em <a href="/cardapio-digital-gratis.html">cardápio digital grátis</a>. No Menuzia é <strong>R$67/mês fixo, sem comissão</strong>, com tudo incluso e configuração feita pela nossa equipe.</p>`,
    faq: [
      ['O cardápio digital funciona junto com o WhatsApp Business?', 'Sim. O pedido montado no cardápio chega no número que você usa hoje, inclusive no WhatsApp Business.'],
      ['O cliente precisa sair do WhatsApp para pedir?', 'Ele abre o link do cardápio (que pode ser enviado pelo próprio chat), monta o pedido e volta com tudo pronto — sem instalar nada.'],
      ['Tem cardápio digital para WhatsApp grátis?', 'Há versões gratuitas, mas costumam limitar recursos essenciais (taxa por bairro, robô, base de clientes) ou cobrar comissão por pedido. No Menuzia o valor é fixo: R$67 por mês, sem taxa por venda.'],
      ['O robô de atendimento responde sozinho?', 'Sim, 24 horas por dia: cardápio, horário, taxa de entrega, formas de pagamento e status do pedido — e passa para você quando o cliente pede atendimento humano.'],
      ['Consigo disparar promoção para quem já comprou?', 'Sim. Todo cliente que pede entra na sua base e você dispara campanhas segmentadas com texto, imagem e áudio, sem limite de envios.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-pizzaria.html',
    cat: 'Pizzaria',
    heroImg: 'local-vitoria.webp',
    heroAlt: 'Pizza pronta para o delivery pedida pelo cardápio digital de pizzaria',
    title: 'Cardápio Digital para Pizzaria: Meio a Meio e Borda | R$67/mês | Menuzia',
    h1: 'Cardápio digital para pizzaria: meio a meio, borda e combos sem comissão',
    desc: 'Cardápio digital para pizzaria com tamanhos, meio a meio, borda recheada, adicionais e combos. Pedido no WhatsApp, taxa por bairro e R$67/mês fixo, sem comissão por pedido.',
    keywords: 'cardápio digital para pizzaria, cardápio digital pizzaria, sistema para pizzaria delivery, cardápio online pizzaria meio a meio, cardápio digital com borda recheada, delivery de pizza sem comissão, pdv para pizzaria',
    body: `<p>Pizzaria tem o cardápio mais complicado do delivery: tamanho, sabor, <strong>meio a meio</strong>, borda, adicional e combo com refrigerante. Um <strong>cardápio digital para pizzaria</strong> bem configurado tira o erro de pedido da cozinha e aumenta o ticket sem ninguém precisar vender.</p>

<h2>Meio a meio sem confusão</h2>
<p>O cliente escolhe o tamanho, marca dois sabores e o sistema aplica a sua regra de preço — <strong>maior valor entre os dois</strong> (padrão do mercado) ou média. A regra fica visível no cardápio, o que acaba com discussão no WhatsApp na hora de pagar.</p>

<h2>Borda, adicional e combo: onde o ticket sobe</h2>
<ul>
  <li><strong>Borda:</strong> catupiry, cheddar, chocolate — opcional pago, escolhido em um toque.</li>
  <li><strong>Adicionais:</strong> bacon, extra de queijo, azeitona, sem cebola.</li>
  <li><strong>Combo:</strong> pizza grande + refrigerante 2L em destaque no topo, que é de onde sai a maior parte do pedido de sexta e sábado.</li>
</ul>

<h2>Fim de semana sem fila de forno bagunçada</h2>
<p>Você define tempo de preparo diferente para o horário de pico, pausa o cardápio quando a fila estourar e volta com um clique. O pedido sai impresso automaticamente e o motoboy sai com a rota no GPS.</p>

<h2>Comissão dói mais em ticket alto</h2>
<p>Pizza tem ticket alto: em um pedido de R$95, 18% de comissão são R$17,10 — por pedido. São milhares de reais por mês que ficam com a plataforma. Com <strong>R$67/mês fixo</strong> a conta muda de lado. Veja <a href="/cardapio-digital-barato.html">o plano</a> e a conta detalhada em <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a>.</p>

<h2>QR Code na caixa: o cliente volta direto</h2>
<p>Quem já comeu a sua pizza é o mais fácil de trazer de volta. Adesivo com QR Code na caixa e a frase "peça direto e ganhe 10% off" migra a base sem brigar com ninguém — passo a passo em <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code para cardápio digital</a> e detalhes de montagem no <a href="/blog/guias/cardapio-digital-para-pizzaria.html">guia de cardápio para pizzaria</a>.</p>`,
    faq: [
      ['O cardápio digital calcula meio a meio automaticamente?', 'Sim. Você escolhe a regra (maior valor entre os sabores ou média) e o sistema aplica sozinho, mostrando o preço final antes de o cliente confirmar.'],
      ['Dá para cobrar borda recheada e adicionais?', 'Sim. Borda, adicionais e opcionais entram com preço próprio e podem ser obrigatórios ou opcionais em cada tamanho.'],
      ['Consigo pausar os pedidos quando a fila de forno estourar?', 'Sim. Você pausa o cardápio ou aumenta o tempo de preparo no pico e volta ao normal com um clique.'],
      ['Quanto custa para uma pizzaria?', 'R$67 por mês, valor fixo, sem comissão por pedido — independente de quantas pizzas você vender no mês.'],
      ['O pedido sai impresso na cozinha?', 'Sim, com impressão automática, além de aparecer no painel em tempo real e no WhatsApp.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-confeitaria.html',
    cat: 'Confeitaria',
    heroImg: 'local-guarapari.webp',
    heroAlt: 'Doces e bolos de confeitaria vendidos pelo cardápio digital',
    title: 'Cardápio Digital para Confeitaria e Doceria sem Comissão | Menuzia',
    h1: 'Cardápio digital para confeitaria: encomendas, bolos e doces por unidade',
    desc: 'Cardápio digital para confeitaria e doceria: encomenda com data de retirada, bolo por tamanho e sabor, docinho por cento e pedido no WhatsApp. R$67/mês, sem comissão.',
    keywords: 'cardápio digital para confeitaria, cardápio digital doceria, catálogo digital de bolos, sistema de encomenda de bolo, cardápio online confeitaria, vender doce pelo whatsapp, cardápio digital para bolo no pote',
    body: `<p>Confeitaria não vende igual hamburgueria: tem <strong>encomenda com data</strong>, bolo por tamanho e sabor, docinho por cento, kit festa e brigadeiro no pote. Um <strong>cardápio digital para confeitaria</strong> organiza tudo isso no lugar do caderno e das 200 mensagens no WhatsApp.</p>

<h2>Encomenda com data, não só pronta-entrega</h2>
<p>Você separa o que é <strong>pronta-entrega</strong> do que é <strong>encomenda</strong>, define prazo mínimo (ex.: 48h) e o cliente escolhe a data de retirada ou entrega no próprio pedido. Fim do "consigo pra sábado?" repetido cinquenta vezes por semana.</p>

<h2>Bolo do jeito que confeitaria vende</h2>
<ul>
  <li><strong>Tamanho:</strong> P, M, G ou por kg — cada um com o seu preço.</li>
  <li><strong>Sabor de massa e recheio</strong> como opção obrigatória.</li>
  <li><strong>Extras pagos:</strong> topo personalizado, vela, embalagem de presente.</li>
  <li><strong>Observação do cliente:</strong> nome no bolo, restrição alimentar.</li>
</ul>

<h2>Docinho por cento e kit festa</h2>
<p>Venda por cento, por meio cento ou em kit fechado, com quantidade mínima por item. O cliente monta a caixa sozinha e você recebe o pedido já somado, sem calcular na mão.</p>

<h2>Foto vende doce</h2>
<p>Confeitaria é venda por imagem: cada item com foto boa, categoria organizada (bolos, tortas, docinhos, bolo no pote, salgados) e destaque para os campeões. Um catálogo limpo aumenta o ticket sem esforço de venda.</p>

<h2>Por que não pagar comissão</h2>
<p>Encomenda de festa tem ticket alto e margem sensível a insumo (chocolate, frutas vermelhas, embalagem). Entregar 15% a 20% de um pedido de R$400 é dinheiro que faltaria no seu lucro. No Menuzia é <strong>R$67/mês fixo</strong>. Veja <a href="/cardapio-digital-barato.html">o plano</a> ou compare em <a href="/blog/comparativos/cardapio-digital-gratis-vale-a-pena.html">cardápio digital grátis vale a pena</a>.</p>

<h2>Divulgação que funciona pra doceria</h2>
<p>Link fixo na bio do Instagram, story com o cardápio da semana e <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code</a> na caixa e no cartãozinho de agradecimento. Quem comprou no aniversário volta no Dia das Mães — e você avisa por <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanha de WhatsApp</a>.</p>`,
    faq: [
      ['Dá para trabalhar com encomenda e data de entrega?', 'Sim. Você define prazo mínimo por produto e o cliente escolhe a data de retirada ou entrega dentro do pedido.'],
      ['Consigo vender bolo por tamanho e sabor?', 'Sim. Tamanho vira variação de preço e massa/recheio viram opções obrigatórias, com extras pagos como topo personalizado e embalagem de presente.'],
      ['E docinho por cento?', 'Você vende por cento, meio cento ou kit, com quantidade mínima por item e total calculado automaticamente.'],
      ['Preciso ter loja física?', 'Não. Funciona para confeitaria que produz em casa, atende por encomenda e entrega ou combina retirada.'],
      ['Quanto custa?', 'R$67 por mês, valor fixo, sem comissão por pedido — inclusive nas encomendas de festa, que costumam ter ticket alto.'],
    ],
  },

  {
    slug: 'cardapio-digital-gratis.html',
    cat: 'Preços',
    heroImg: 'blog-precos.webp',
    heroAlt: 'Comparação entre cardápio digital grátis e plano fixo sem comissão',
    title: 'Cardápio Digital Grátis para Delivery: Vale a Pena? | Menuzia',
    h1: 'Cardápio digital grátis para delivery: onde ele cobra de você',
    desc: 'Cardápio digital grátis para delivery existe, mas costuma cobrar comissão por pedido ou travar recursos. Veja a conta real e compare com um plano fixo de R$67/mês sem comissão.',
    keywords: 'cardápio digital grátis, cardápio digital para delivery grátis, criar cardápio digital gratuito, cardápio online grátis, cardápio digital grátis para whatsapp, cardápio digital gratuito vale a pena',
    body: `<p>Procurar <strong>cardápio digital grátis para delivery</strong> faz todo sentido quando se está começando. Só que grátis raramente é de graça — o custo muda de lugar. Aqui está onde ele costuma aparecer, sem enrolação.</p>

<h2>As 4 formas de o "grátis" cobrar</h2>
<ol>
  <li><strong>Comissão por pedido:</strong> o modelo mais comum. Sem mensalidade, com 10% a 30% de cada venda.</li>
  <li><strong>Recurso travado:</strong> taxa por bairro, cupom, relatório, impressão e robô só no plano pago.</li>
  <li><strong>Marca de terceiro no seu cardápio:</strong> o cliente memoriza a plataforma, não você.</li>
  <li><strong>Base de clientes que não é sua:</strong> sem contato exportável, você aluga o cliente todo mês.</li>
</ol>

<h2>A conta que decide</h2>
<table>
  <tr><th>Faturamento/mês</th><th>Grátis com 15% de comissão</th><th>Plano fixo R$67</th></tr>
  <tr><td>R$3.000</td><td>R$450</td><td>R$67</td></tr>
  <tr><td>R$10.000</td><td>R$1.500</td><td>R$67</td></tr>
  <tr><td>R$25.000</td><td>R$3.750</td><td>R$67</td></tr>
</table>
<p>O ponto de virada chega cedo: a partir de mais ou menos R$500 de faturamento mensal pelo canal, a comissão já supera uma mensalidade fixa baixa.</p>

<h2>Quando o grátis realmente serve</h2>
<p>Nas primeiras semanas, para testar cardápio, medir demanda e descobrir o que vende. Abaixo de 30 pedidos por mês, a comissão ainda é pequena e o grátis segura a operação.</p>

<h2>Checklist antes de aceitar um plano gratuito</h2>
<ul>
  <li>Tem taxa por pedido? De quanto?</li>
  <li>Consigo exportar os meus clientes?</li>
  <li>O pedido cai no meu WhatsApp?</li>
  <li>Dá pra configurar taxa de entrega por bairro?</li>
  <li>Tem limite de produtos, fotos ou pedidos?</li>
</ul>

<h2>A alternativa: preço fixo e sem comissão</h2>
<p>No Menuzia são <strong>R$67 por mês, sem taxa por pedido</strong>, com cardápio, painel, campanhas de WhatsApp, robô 24h, gestão de motoboy e configuração feita pela nossa equipe. Com ticket médio de R$45, <strong>dois pedidos pagam o mês</strong>. Veja <a href="/cardapio-digital-barato.html">o plano completo</a>, a análise em <a href="/blog/comparativos/cardapio-digital-gratis-vale-a-pena.html">cardápio digital grátis vale a pena</a> e a versão para <a href="/cardapio-digital-para-whatsapp.html">WhatsApp</a>.</p>`,
    faq: [
      ['Existe cardápio digital grátis de verdade?', 'Existem planos gratuitos, sim — mas quase sempre com comissão por pedido, recursos travados ou marca de terceiro no cardápio. O custo aparece conforme o volume de pedidos cresce.'],
      ['Quando o grátis passa a sair caro?', 'A partir do momento em que a comissão do mês supera uma mensalidade fixa. Com 15% de comissão, isso acontece já perto de R$500 de faturamento pelo canal.'],
      ['O Menuzia tem plano grátis?', 'Não. O modelo é R$67 por mês, valor fixo, sem comissão por pedido — com configuração feita pela nossa equipe e suporte incluso.'],
      ['Dá para migrar do plano grátis sem perder clientes?', 'Sim. Você divulga o novo link com cupom de desconto e QR Code na embalagem, migrando a base aos poucos, sem desligar nada de uma vez.'],
      ['Em quanto tempo o plano fixo se paga?', 'Com ticket médio de R$45, dois pedidos no mês já cobrem a mensalidade. O que você deixaria de pagar em comissão vira lucro.'],
    ],
  },

  {
    slug: 'cardapio-digital-pdf.html',
    cat: 'Comparativo',
    heroImg: 'blog-hero.webp',
    heroAlt: 'Cliente tentando ler cardápio em PDF no celular, com zoom e texto pequeno',
    title: 'Cardápio Digital em PDF: Por Que Não Funciona (e o Que Usar) | Menuzia',
    h1: 'Cardápio digital em PDF: por que ele trava a sua venda',
    desc: 'Cardápio em PDF pesa, dá zoom, não aceita pedido e desatualiza. Veja por que o PDF não é cardápio digital de verdade e como trocar por um link que recebe pedido no WhatsApp.',
    keywords: 'cardápio digital pdf, cardápio em pdf para whatsapp, criar cardápio digital pdf, cardápio pdf ou digital, transformar cardápio pdf em digital, cardápio digital interativo',
    body: `<p>Quase todo delivery começa mandando o <strong>cardápio em PDF</strong> no WhatsApp. Funciona? Mais ou menos — e o custo aparece em pedido perdido, não na fatura.</p>

<h2>Os 6 problemas do cardápio em PDF</h2>
<ol>
  <li><strong>Pesa e demora a abrir</strong> no celular, ainda mais com internet fraca.</li>
  <li><strong>Obriga zoom e arrasto</strong> pra ler o preço — cliente cansa antes de decidir.</li>
  <li><strong>Não recebe pedido:</strong> depois de ler, ele ainda tem que digitar tudo pra você.</li>
  <li><strong>Não calcula nada:</strong> taxa de entrega, adicional e troco saem na mão.</li>
  <li><strong>Desatualiza:</strong> o PDF de março continua circulando com o preço de março.</li>
  <li><strong>Não é indexado direito:</strong> conteúdo preso em arquivo não trabalha pra você no Google.</li>
</ol>

<h2>PDF não é cardápio digital — é cardápio impresso em arquivo</h2>
<p>Cardápio digital de verdade é um <strong>link</strong> que abre rápido, funciona como página, atualiza em tempo real e <strong>fecha o pedido</strong>. O cliente escolhe item, adicional, forma de pagamento e endereço; você recebe tudo pronto no WhatsApp e no painel.</p>

<table>
  <tr><th>&nbsp;</th><th>Cardápio em PDF</th><th>Cardápio digital (link)</th></tr>
  <tr><td>Abrir no celular</td><td>Download e zoom</td><td>Abre direto, leve</td></tr>
  <tr><td>Atualizar preço</td><td>Refazer e reenviar</td><td>Um clique, vale na hora</td></tr>
  <tr><td>Fechar pedido</td><td>Cliente digita tudo</td><td>Pedido pronto e somado</td></tr>
  <tr><td>Taxa por bairro</td><td>Cálculo manual</td><td>Automático</td></tr>
  <tr><td>Base de clientes</td><td>Nenhuma</td><td>Cada pedido vira contato seu</td></tr>
</table>

<h2>Como trocar o PDF sem perder tempo</h2>
<ol>
  <li>Mande os itens, preços e fotos que você já tem — inclusive o próprio PDF.</li>
  <li><strong>Nossa equipe monta o cardápio digital</strong> a partir disso.</li>
  <li>Você recebe o link e o <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code</a> prontos.</li>
  <li>Troca o PDF pelo link na bio, no status e na resposta automática do WhatsApp.</li>
</ol>

<h2>Quanto custa</h2>
<p><strong>R$67/mês fixo, sem comissão por pedido.</strong> Veja <a href="/cardapio-digital-barato.html">o plano</a>, a versão para <a href="/cardapio-digital-para-whatsapp.html">WhatsApp</a> e a de <a href="/cardapio-digital-para-delivery.html">delivery</a>.</p>`,
    faq: [
      ['Posso continuar usando o cardápio em PDF?', 'Pode, mas ele não fecha pedido nem calcula taxa: o cliente ainda precisa digitar tudo no chat. O PDF serve como material de apoio, não como canal de venda.'],
      ['Vocês transformam o meu PDF em cardápio digital?', 'Sim. Você envia o PDF com itens, preços e fotos e a nossa equipe monta o cardápio digital a partir dele.'],
      ['O cardápio digital abre mais rápido que o PDF?', 'Sim. É uma página leve, feita para celular, que abre sem download e sem precisar de zoom.'],
      ['O cardápio digital aparece no Google?', 'A página do seu cardápio é indexável e pode ser divulgada por link, diferente de um arquivo PDF preso em conversa de WhatsApp.'],
      ['Quanto custa trocar o PDF por um cardápio digital?', 'R$67 por mês, valor fixo, sem comissão por pedido, com a montagem feita pela nossa equipe.'],
    ],
  },

  {
    slug: 'cardapio-digital-99food.html',
    cat: 'Comparativo',
    heroImg: 'blog-delivery-ifood.webp',
    heroAlt: 'Entregador de aplicativo de delivery representando alternativa ao 99Food',
    title: 'Cardápio Digital x 99Food: Como Vender sem Comissão | Menuzia',
    h1: 'Cardápio digital e 99Food: use o app como vitrine e venda no seu link',
    desc: 'Comparativo entre vender pelo 99Food e ter cardápio digital próprio: comissão por pedido x R$67/mês fixo, base de clientes e como usar os dois canais juntos sem perder margem.',
    keywords: 'cardápio digital para 99 food, 99food comissão, alternativa ao 99food, cardápio digital próprio x 99food, vender sem comissão 99food, delivery próprio 99food ifood',
    body: `<p>O <strong>99Food</strong> — como qualquer aplicativo de delivery — é vitrine: traz cliente novo que não te conhecia. O que ele não é: o seu canal de venda principal. A diferença entre os dois define a sua margem no fim do mês.</p>

<h2>Vitrine e canal próprio fazem coisas diferentes</h2>
<table>
  <tr><th>&nbsp;</th><th>Aplicativo (99Food e similares)</th><th>Cardápio digital próprio</th></tr>
  <tr><td>Custo</td><td>Percentual sobre cada pedido</td><td>R$67/mês fixo</td></tr>
  <tr><td>Cliente novo</td><td>Sim, é a força do app</td><td>Vem da sua divulgação</td></tr>
  <tr><td>Base de clientes</td><td>Fica com a plataforma</td><td>Fica com você</td></tr>
  <tr><td>Concorrente ao lado</td><td>Sempre</td><td>Nunca</td></tr>
  <tr><td>Recompra</td><td>Depende do app</td><td>Campanha no seu WhatsApp</td></tr>
</table>

<h2>A estratégia que funciona: usar os dois</h2>
<ol>
  <li><strong>Mantenha o app ligado</strong> para captar quem ainda não te conhece.</li>
  <li><strong>Coloque um cupom</strong> na embalagem: "peça direto no nosso link e ganhe 10% off".</li>
  <li><strong>Leve a recompra pro seu canal</strong>, onde não há comissão.</li>
  <li><strong>Guarde todo cliente na sua base</strong> e reative por WhatsApp.</li>
</ol>
<p>O passo a passo detalhado (inclusive como não perder cliente na migração) está em <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> — vale igual para o 99Food.</p>

<h2>A conta da comissão</h2>
<p>Faturando R$20 mil/mês por aplicativo a 18%, são <strong>R$3.600 por mês</strong> em comissão. O mesmo faturamento pelo canal próprio custa R$67. Cada pedido que migra da vitrine para o seu link é margem de volta. Compare em <a href="/blog/comparativos/cardapio-digital-sem-comissao-vale-a-pena.html">cardápio digital sem comissão vale a pena</a>.</p>

<h2>O que você precisa pro canal próprio funcionar</h2>
<ul>
  <li>Cardápio digital com <a href="/cardapio-digital-para-whatsapp.html">pedido caindo no WhatsApp</a></li>
  <li>Taxa de entrega por bairro e gestão de motoboy</li>
  <li><a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code</a> na embalagem e no balcão</li>
  <li>Base de clientes própria + campanhas de WhatsApp</li>
</ul>
<p>Tudo isso entra nos <strong>R$67/mês</strong> do Menuzia, sem comissão. Veja <a href="/cardapio-digital-barato.html">o plano</a> ou a página da <a href="/cidades.html">sua cidade</a>.</p>`,
    faq: [
      ['Preciso sair do 99Food para ter cardápio digital próprio?', 'Não. O recomendado é manter o aplicativo como vitrine no começo e migrar a recompra para o seu link, onde não há comissão.'],
      ['Qual a diferença de custo entre os dois?', 'O aplicativo cobra um percentual de cada pedido; o cardápio próprio custa R$67 por mês, fixo, independente do volume vendido.'],
      ['Consigo levar meus clientes do app para o meu cardápio?', 'Sim, com cupom de desconto e QR Code na embalagem do pedido. É a forma mais barata e eficiente de migrar a base.'],
      ['Quem entrega no cardápio próprio?', 'Você usa entregador próprio ou parceiro por corrida. O sistema traz gestão de motoboy com GPS e impressão automática do pedido.'],
      ['Vale a pena para quem vende pouco?', 'Se você faz poucos pedidos por mês, mantenha o app como vitrine e já comece a construir a base própria em paralelo — a troca compensa assim que a comissão mensal passa de R$67.'],
    ],
  },

  // ============================================================
  //  Intenção de PREÇO — "mais barato do mercado" e variações
  // ============================================================
  {
    slug: 'cardapio-digital-mais-barato.html',
    cat: 'Preços',
    heroImg: 'blog-precos.webp',
    heroAlt: 'Comparativo de preço entre cardápios digitais do mercado brasileiro',
    title: 'Cardápio Digital Mais Barato do Mercado: R$67/mês sem Comissão | Menuzia',
    h1: 'Cardápio digital mais barato do mercado: a conta que ninguém mostra',
    desc: 'Qual é o cardápio digital mais barato do mercado? Compare os 3 modelos de cobrança (comissão, mensalidade e grátis) e veja por que R$67/mês fixo sem comissão sai mais barato na prática.',
    keywords: 'cardápio digital mais barato do mercado, cardápio digital mais barato, qual o cardápio digital mais barato, cardápio digital barato para delivery, cardápio digital mais em conta, cardápio digital baratinho, cardápio digital preço baixo, plataforma de cardápio digital mais barata, cardápio digital econômico, cardápio digital barato sem comissão',
    lt: [
      ['cardápio digital mais barato do mercado', '#'],
      ['qual o cardápio digital mais barato', 'cardapio-digital-preco.html'],
      ['cardápio digital barato para delivery', 'cardapio-digital-barato.html'],
      ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
      ['cardápio digital grátis vale a pena', 'cardapio-digital-gratis.html'],
      ['cardápio digital com mensalidade fixa', 'cardapio-digital-mensalidade-fixa.html'],
      ['melhor cardápio digital custo-benefício', 'melhor-cardapio-digital.html'],
      ['cardápio digital para quem está começando', 'cardapio-digital-para-restaurante-iniciante.html'],
      ['cardápio digital barato em São Paulo', 'cardapio-digital-sao-paulo.html'],
      ['cardápio digital barato no Rio de Janeiro', 'cardapio-digital-rio-de-janeiro.html'],
      ['cardápio digital barato em Guarulhos', 'cardapio-digital-guarulhos.html'],
      ['cardápio digital barato por cidade', 'cidades.html'],
    ],
    body: `<p>Quem procura o <strong>cardápio digital mais barato do mercado</strong> quase sempre compara a coisa errada: o valor da mensalidade. O que decide o custo real é <strong>o modelo de cobrança</strong> — porque um plano de R$0 com 20% de comissão custa muito mais que R$67 fixos já no primeiro mês razoável de vendas.</p>

<h2>Os 3 modelos de preço do mercado</h2>
<table>
  <tr><th>Modelo</th><th>Como cobra</th><th>Custo real com R$20 mil/mês</th></tr>
  <tr><td>Marketplace (iFood, apps)</td><td>12% a 30% por pedido</td><td>R$2.400 a R$6.000</td></tr>
  <tr><td>Plataforma "grátis"</td><td>Comissão menor + recursos travados</td><td>R$1.000 a R$3.000</td></tr>
  <tr><td>Mensalidade fixa (Menuzia)</td><td>R$67/mês, sem taxa por pedido</td><td>R$67</td></tr>
</table>
<p>O barato de verdade é o custo que <strong>não cresce quando você vende mais</strong>. Comissão é o oposto disso: quanto melhor o seu mês, maior a conta.</p>

<h2>Por que R$67 fixos é o menor custo por pedido</h2>
<p>Divida a mensalidade pelo volume: com 100 pedidos no mês, o Menuzia custa <strong>R$0,67 por pedido</strong>. Com 500 pedidos, R$0,13. Com 1.000, R$0,067. Já a comissão custa o mesmo percentual no pedido 1 e no pedido 1.000 — ela nunca dilui.</p>
<table>
  <tr><th>Pedidos/mês</th><th>Custo por pedido (Menuzia)</th><th>Custo por pedido (18% em ticket de R$45)</th></tr>
  <tr><td>100</td><td>R$0,67</td><td>R$8,10</td></tr>
  <tr><td>300</td><td>R$0,22</td><td>R$8,10</td></tr>
  <tr><td>800</td><td>R$0,08</td><td>R$8,10</td></tr>
</table>

<h2>"Barato" que sai caro: o que checar antes de assinar</h2>
<ul>
  <li><strong>Tem taxa por pedido?</strong> Se tem, o preço anunciado não é o preço final.</li>
  <li><strong>O que é cobrado à parte?</strong> Robô de WhatsApp, impressão, cupom e relatório costumam virar upsell.</li>
  <li><strong>Quem monta o cardápio?</strong> Se for você, o custo escondido é o seu tempo — no Menuzia a equipe monta.</li>
  <li><strong>A base de clientes é sua?</strong> Sem contato exportável você aluga o cliente todo mês.</li>
  <li><strong>Tem fidelidade ou multa?</strong> Barato com contrato longo é caro travado.</li>
</ul>

<h2>Quanto custa o Menuzia</h2>
<p><strong>R$67 por mês, valor fixo, sem comissão por pedido.</strong> Inclui cardápio digital com fotos, painel de pedidos, taxa de entrega por bairro, pagamento no Pix/cartão/dinheiro, campanhas de WhatsApp, robô de atendimento 24h, gestão de motoboy e <strong>configuração feita pela nossa equipe</strong>. Com ticket médio de R$45, <strong>dois pedidos pagam o mês inteiro</strong>.</p>

<h2>Barato não é cardápio ruim — é custo previsível</h2>
<p>O que faz um cardápio digital ser bom é converter: abrir rápido no celular, ter foto em todo item, fechar o pedido sem fricção e mandar direto pro WhatsApp. Nada disso depende de pagar percentual. Veja a comparação completa em <a href="/cardapio-digital-preco.html">preço de cardápio digital</a>, o <a href="/melhor-cardapio-digital.html">checklist do melhor custo-benefício</a> e o <a href="/cardapio-digital-barato.html">plano de cardápio digital barato</a>.</p>

<h2>Funciona na minha cidade?</h2>
<p>Sim — o atendimento é 100% online, em todo o Brasil. Veja as páginas de <a href="/cardapio-digital-sao-paulo.html">São Paulo</a>, <a href="/cardapio-digital-rio-de-janeiro.html">Rio de Janeiro</a>, <a href="/cardapio-digital-belo-horizonte.html">Belo Horizonte</a> ou <a href="/cidades.html">todas as cidades atendidas</a>.</p>`,
    faq: [
      ['Qual é o cardápio digital mais barato do mercado?', 'Depende do modelo de cobrança. Entre plataformas que cobram comissão e plataformas de mensalidade fixa, a fixa fica mais barata assim que o faturamento pelo canal passa de poucas centenas de reais. O Menuzia custa R$67 por mês, valor fixo, sem taxa por pedido.'],
      ['R$67 por mês tem taxa escondida?', 'Não. Não há comissão por pedido, taxa de instalação nem cobrança por recurso: cardápio, painel, taxa por bairro, campanhas de WhatsApp, robô 24h e suporte estão inclusos.'],
      ['Cardápio digital barato funciona igual aos caros?', 'O que faz o cardápio vender é abrir rápido, ter foto, calcular taxa e fechar o pedido no WhatsApp. Isso não depende de preço alto — depende de a plataforma ser feita para celular e ser bem configurada.'],
      ['A partir de quantos pedidos vale a pena sair da comissão?', 'Com ticket médio de R$45 e comissão de 18%, cada pedido custa cerca de R$8. Com 9 pedidos no mês a comissão já supera R$67 — daí para cima, tudo o que você deixa de pagar vira lucro.'],
      ['Tem fidelidade ou multa por cancelar?', 'Não. É mensal. Você continua enquanto fizer sentido para a sua operação.'],
    ],
  },

  {
    slug: 'cardapio-digital-sem-comissao.html',
    cat: 'Sem comissão',
    heroImg: 'blog-sem-comissao.webp',
    heroAlt: 'Dono de delivery calculando o quanto pagava de comissão por pedido',
    title: 'Cardápio Digital sem Comissão por Pedido | R$67/mês | Menuzia',
    h1: 'Cardápio digital sem comissão: 100% da venda entra no seu caixa',
    desc: 'Cardápio digital sem comissão por pedido: R$67/mês fixo, pedido direto no WhatsApp, base de clientes sua. Veja quanto a comissão do aplicativo custa por mês e como parar de pagar.',
    keywords: 'cardápio digital sem comissão, delivery sem comissão, cardápio digital sem taxa por pedido, plataforma de delivery sem comissão, sistema de delivery sem comissão, cardápio digital sem taxa, vender delivery sem comissão, cardápio próprio sem comissão, cardápio digital sem percentual por venda',
    lt: [
      ['cardápio digital sem comissão', '#'],
      ['delivery sem comissão', 'cardapio-digital-para-delivery.html'],
      ['cardápio digital sem taxa por pedido', 'cardapio-digital-mensalidade-fixa.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['quanto custa cardápio digital', 'cardapio-digital-preco.html'],
      ['alternativa ao iFood', 'blog/estrategia/como-sair-do-ifood-e-vender-direto.html'],
      ['alternativa ao 99Food', 'cardapio-digital-99food.html'],
      ['cardápio digital no WhatsApp', 'cardapio-digital-para-whatsapp.html'],
      ['sem comissão em São Paulo', 'cardapio-digital-sao-paulo.html'],
      ['sem comissão em Belo Horizonte', 'cardapio-digital-belo-horizonte.html'],
      ['sem comissão por cidade', 'cidades.html'],
    ],
    body: `<p><strong>Cardápio digital sem comissão</strong> é aquele em que o pedido vai do cliente direto para você — sem plataforma tirando um percentual no meio. Você paga uma mensalidade fixa e pronto: <strong>a venda inteira entra no seu caixa</strong>.</p>

<h2>Quanto a comissão custa de verdade</h2>
<table>
  <tr><th>Faturamento no canal</th><th>Comissão de 18%</th><th>Menuzia (fixo)</th><th>Diferença no ano</th></tr>
  <tr><td>R$8.000/mês</td><td>R$1.440</td><td>R$67</td><td>R$16.476</td></tr>
  <tr><td>R$20.000/mês</td><td>R$3.600</td><td>R$67</td><td>R$42.396</td></tr>
  <tr><td>R$40.000/mês</td><td>R$7.200</td><td>R$67</td><td>R$85.596</td></tr>
</table>
<p>Repare no padrão: a comissão sobe junto com o seu esforço. Você contrata mais gente, melhora o produto, vende mais — e paga mais por isso.</p>

<h2>O que muda sem comissão</h2>
<ul>
  <li><strong>Margem previsível:</strong> o custo da plataforma é o mesmo em janeiro e em dezembro.</li>
  <li><strong>Preço mais competitivo:</strong> sem repassar 20% ao app, dá para baixar o preço ou aumentar a porção.</li>
  <li><strong>Base de clientes sua:</strong> telefone, histórico e endereço ficam com você — dá para chamar de volta quando quiser.</li>
  <li><strong>Sem concorrente na sua vitrine:</strong> ninguém coloca o hambúrguer do vizinho ao lado do seu.</li>
  <li><strong>Promoção que você decide:</strong> cupom, combo e frete grátis sem regra de plataforma.</li>
</ul>

<h2>Como funciona o Menuzia</h2>
<ol>
  <li>Você assina por <strong>R$67/mês, sem taxa por pedido</strong>.</li>
  <li>Nossa equipe monta o cardápio com fotos, categorias, adicionais e taxa por bairro.</li>
  <li>Conectamos o WhatsApp e o robô de atendimento 24h.</li>
  <li>Você divulga o link na bio, no status e em QR Code na embalagem.</li>
  <li>Pedido cai no painel e no WhatsApp — e o cliente vira contato seu.</li>
</ol>

<h2>Dá pra usar junto com o aplicativo?</h2>
<p>Dá, e é o caminho mais seguro. Mantenha o app como vitrine para cliente novo e migre a recompra para o seu link com cupom e QR Code na embalagem. O passo a passo está em <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a> e a comparação em <a href="/cardapio-digital-99food.html">cardápio digital x 99Food</a>.</p>

<h2>Sem comissão e barato ao mesmo tempo</h2>
<p>Existe plataforma sem comissão que cobra R$200, R$300 por mês. O Menuzia é <strong>R$67/mês fixo</strong> com a montagem feita pela nossa equipe — por isso aparece nas buscas por <a href="/cardapio-digital-mais-barato.html">cardápio digital mais barato do mercado</a>. Veja também <a href="/cardapio-digital-preco.html">o comparativo de preços</a> e as páginas por <a href="/cidades.html">cidade</a>.</p>`,
    faq: [
      ['O que é um cardápio digital sem comissão?', 'É um cardápio próprio em que o pedido vai direto do cliente para o seu WhatsApp e painel, sem nenhuma plataforma cobrando percentual sobre a venda. Você paga apenas uma mensalidade fixa.'],
      ['O Menuzia cobra alguma taxa por pedido?', 'Não. São R$67 por mês, valor fixo, independentemente de quantos pedidos você receber.'],
      ['Vou perder os clientes que já vêm do aplicativo?', 'Não precisa desligar o app. A migração é gradual: cupom no seu link, QR Code na embalagem e divulgação nas redes. O cliente que migra passa a ser seu.'],
      ['Preciso de CNPJ para usar?', 'Não é exigido. O cardápio funciona para delivery caseiro, food truck, MEI ou empresa constituída.'],
      ['Quanto tempo leva para começar?', 'Nossa equipe monta o cardápio e conecta o WhatsApp — normalmente dá para receber pedidos no mesmo dia em que os produtos e fotos são enviados.'],
    ],
  },

  {
    slug: 'cardapio-digital-preco.html',
    cat: 'Preços',
    heroImg: 'blog-hero.webp',
    heroAlt: 'Tabela de preços de cardápio digital comparando planos e comissões',
    title: 'Preço de Cardápio Digital em 2026: Quanto Custa Cada Modelo | Menuzia',
    h1: 'Preço de cardápio digital: quanto custa cada modelo em 2026',
    desc: 'Quanto custa um cardápio digital em 2026? Veja a faixa de preço de cada modelo (grátis, comissão, mensalidade), o custo por pedido de cada um e qual compensa pelo seu volume.',
    keywords: 'preço cardápio digital, quanto custa cardápio digital, cardápio digital preço mensal, valor de cardápio digital, cardápio digital quanto custa por mês, mensalidade cardápio digital, planos de cardápio digital, tabela de preço cardápio digital',
    lt: [
      ['quanto custa um cardápio digital', '#'],
      ['preço de cardápio digital por mês', 'cardapio-digital-mensalidade-fixa.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['cardápio digital barato', 'cardapio-digital-barato.html'],
      ['cardápio digital grátis existe?', 'cardapio-digital-gratis.html'],
      ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
      ['melhor cardápio digital', 'melhor-cardapio-digital.html'],
      ['quanto custa cardápio digital próprio', 'blog/precos/quanto-custa-cardapio-digital-proprio.html'],
      ['cardápio digital para começar do zero', 'cardapio-digital-para-restaurante-iniciante.html'],
      ['preço por cidade', 'cidades.html'],
    ],
    body: `<p>O <strong>preço de um cardápio digital</strong> varia menos pelo produto e mais pela forma de cobrança. Abaixo estão as faixas praticadas no mercado brasileiro em 2026 e o custo real de cada uma para o seu volume de pedidos.</p>

<h2>Faixas de preço por modelo</h2>
<table>
  <tr><th>Modelo</th><th>Preço anunciado</th><th>Onde cobra de verdade</th></tr>
  <tr><td>Grátis</td><td>R$0</td><td>Comissão por pedido, recursos travados ou marca de terceiro</td></tr>
  <tr><td>Marketplace</td><td>Sem mensalidade</td><td>12% a 30% de cada venda</td></tr>
  <tr><td>Mensalidade básica</td><td>R$50 a R$120</td><td>Sem comissão; alguns cobram robô e impressão à parte</td></tr>
  <tr><td>Mensalidade completa</td><td>R$150 a R$400</td><td>Sem comissão, com módulos de PDV e fiscal</td></tr>
  <tr><td>Menuzia</td><td>R$67/mês</td><td>Nada à parte: sem comissão e com montagem inclusa</td></tr>
</table>

<h2>O que realmente importa: custo por pedido</h2>
<p>Mensalidade dilui, comissão não. Com ticket médio de R$45:</p>
<table>
  <tr><th>Pedidos/mês</th><th>Comissão 18%</th><th>Mensalidade R$67</th><th>Mensalidade R$250</th></tr>
  <tr><td>50</td><td>R$405</td><td>R$67</td><td>R$250</td></tr>
  <tr><td>200</td><td>R$1.620</td><td>R$67</td><td>R$250</td></tr>
  <tr><td>600</td><td>R$4.860</td><td>R$67</td><td>R$250</td></tr>
</table>
<p>Ou seja: a partir de <strong>cerca de 9 pedidos por mês</strong>, uma mensalidade de R$67 já é mais barata que 18% de comissão.</p>

<h2>O que deve estar incluso no preço</h2>
<ul>
  <li>Cardápio com fotos, categorias, adicionais e observações</li>
  <li>Painel de pedidos em tempo real e impressão automática</li>
  <li>Taxa de entrega por bairro e raio de entrega</li>
  <li>Pedido chegando no WhatsApp e robô de atendimento</li>
  <li>Campanhas para a sua base e relatório de vendas</li>
  <li>Configuração inicial feita por alguém que não seja você</li>
</ul>
<p>Se algum desses itens for cobrado à parte, some ao preço anunciado antes de comparar.</p>

<h2>Quanto custa o Menuzia</h2>
<p><strong>R$67/mês, fixo, sem comissão</strong>, com tudo da lista acima incluso e cardápio montado pela nossa equipe. Detalhes do plano em <a href="/cardapio-digital-barato.html">cardápio digital barato</a>. Para entender a conta do próprio negócio, veja <a href="/blog/precos/quanto-custa-cardapio-digital-proprio.html">quanto custa um cardápio digital próprio</a> e <a href="/blog/precos/cardapio-digital-barato-quanto-custa.html">cardápio digital barato: quanto custa</a>.</p>`,
    faq: [
      ['Quanto custa um cardápio digital por mês em 2026?', 'A faixa comum de mensalidade vai de R$50 a R$400, além dos modelos que não cobram mensalidade e ficam com 12% a 30% de cada pedido. O Menuzia custa R$67 por mês, sem comissão.'],
      ['Cardápio digital barato entrega menos recursos?', 'Nem sempre. O que muda o preço costuma ser o modelo comercial, não o produto. Compare a lista de recursos inclusos antes de olhar o valor.'],
      ['Existe taxa de instalação ou setup?', 'No Menuzia, não. A montagem do cardápio é feita pela nossa equipe e está inclusa na mensalidade.'],
      ['Qual modelo compensa para quem está começando?', 'Abaixo de cerca de 9 pedidos por mês, a comissão sai barata. Acima disso, a mensalidade fixa passa a ser mais econômica — e a diferença cresce a cada pedido.'],
      ['O preço muda se eu vender mais?', 'Não. R$67 é o valor fixo mensal, com 50 ou 5.000 pedidos.'],
    ],
  },

  {
    slug: 'cardapio-digital-mensalidade-fixa.html',
    cat: 'Preços',
    heroImg: 'local-vitoria.webp',
    heroAlt: 'Calculadora e caderno de custos de um delivery com mensalidade fixa',
    title: 'Cardápio Digital com Mensalidade Fixa (sem Taxa por Pedido) | Menuzia',
    h1: 'Cardápio digital com mensalidade fixa: custo que não cresce com a venda',
    desc: 'Cardápio digital com mensalidade fixa de R$67 e nenhuma taxa por pedido. Entenda por que custo fixo protege a margem do delivery e quando ele fica mais barato que comissão.',
    keywords: 'cardápio digital mensalidade fixa, cardápio digital sem taxa por pedido, cardápio digital valor fixo, plano fixo cardápio digital, cardápio digital sem percentual, delivery com mensalidade fixa, sistema de delivery valor fixo',
    lt: [
      ['cardápio digital com mensalidade fixa', '#'],
      ['cardápio digital sem taxa por pedido', 'cardapio-digital-sem-comissao.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['quanto custa cardápio digital', 'cardapio-digital-preco.html'],
      ['cardápio digital grátis', 'cardapio-digital-gratis.html'],
      ['cardápio digital para delivery', 'cardapio-digital-para-delivery.html'],
      ['melhor cardápio digital', 'melhor-cardapio-digital.html'],
      ['cidades atendidas', 'cidades.html'],
    ],
    body: `<p><strong>Mensalidade fixa</strong> significa que o seu custo de plataforma é uma linha previsível na planilha: R$67, todo mês, independente de quanto você vender. É o oposto da comissão, que é uma linha que sobe exatamente quando o seu negócio vai bem.</p>

<h2>Custo fixo x custo variável na prática</h2>
<p>Todo delivery já tem custo variável demais: insumo, embalagem, combustível, entregador. Colocar a plataforma também no variável significa que <strong>um mês bom traz uma conta ruim</strong>.</p>
<table>
  <tr><th>Mês</th><th>Faturamento</th><th>Comissão 18%</th><th>Mensalidade fixa</th></tr>
  <tr><td>Fraco</td><td>R$6.000</td><td>R$1.080</td><td>R$67</td></tr>
  <tr><td>Normal</td><td>R$15.000</td><td>R$2.700</td><td>R$67</td></tr>
  <tr><td>Pico (Dia dos Namorados, Copa)</td><td>R$32.000</td><td>R$5.760</td><td>R$67</td></tr>
</table>
<p>No mês de pico, a comissão leva quase seis mil reais. A mensalidade fixa leva R$67 — o resto fica com quem trabalhou.</p>

<h2>Quando o fixo passa a ser mais barato</h2>
<p>Com ticket médio de R$45 e comissão de 18%, cada pedido custa cerca de R$8,10. A partir de <strong>9 pedidos no mês</strong>, R$67 fixos já saem mais em conta — e a diferença cresce a cada pedido novo.</p>

<h2>O que está incluso nos R$67</h2>
<ul>
  <li>Cardápio digital com fotos, adicionais e observações do cliente</li>
  <li>Painel de pedidos, impressão automática e relatórios</li>
  <li>Taxa de entrega por bairro, raio de entrega e horários</li>
  <li>Pedido no WhatsApp, robô de atendimento 24h e campanhas</li>
  <li>Gestão de motoboy e montagem do cardápio pela nossa equipe</li>
</ul>
<p>Sem taxa de setup, sem cobrança por módulo, sem fidelidade.</p>

<h2>Planeje o mês com número certo</h2>
<p>Custo fixo deixa você fazer conta antes de vender: quanto precisa faturar para pagar a plataforma, qual margem sobra por pedido, quanto pode investir em promoção. Veja o comparativo em <a href="/cardapio-digital-preco.html">preço de cardápio digital</a>, a versão sem percentual em <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a> e o <a href="/cardapio-digital-mais-barato.html">cardápio digital mais barato do mercado</a>.</p>`,
    faq: [
      ['O que é mensalidade fixa em cardápio digital?', 'É um valor mensal que não muda com o volume de vendas. No Menuzia são R$67 por mês, sem nenhuma taxa por pedido.'],
      ['Se eu vender muito, o preço sobe?', 'Não. O valor é o mesmo com 50 ou 5.000 pedidos no mês.'],
      ['E se eu vender pouco em um mês?', 'A mensalidade continua R$67. Com ticket médio de R$45, dois pedidos já cobrem o valor.'],
      ['Tem taxa de instalação?', 'Não. A montagem do cardápio é feita pela nossa equipe e está inclusa.'],
      ['Tem contrato de fidelidade?', 'Não. A cobrança é mensal e você cancela quando quiser.'],
    ],
  },

  {
    slug: 'melhor-cardapio-digital.html',
    cat: 'Comparativo',
    heroImg: 'blog-delivery-ifood.webp',
    heroAlt: 'Dono de restaurante comparando plataformas de cardápio digital no notebook',
    title: 'Melhor Cardápio Digital para Delivery: Checklist de Escolha | Menuzia',
    h1: 'Melhor cardápio digital para delivery: o checklist antes de assinar',
    desc: 'Como escolher o melhor cardápio digital para o seu delivery: 10 critérios objetivos de custo, conversão e propriedade da base de clientes — e onde o Menuzia entra por R$67/mês sem comissão.',
    keywords: 'melhor cardápio digital, melhor plataforma de cardápio digital, melhor cardápio digital para delivery, qual cardápio digital escolher, melhor cardápio digital custo benefício, comparativo cardápio digital, melhor sistema de delivery próprio',
    lt: [
      ['melhor cardápio digital para delivery', '#'],
      ['qual cardápio digital escolher', 'cardapio-digital-preco.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
      ['cardápio digital grátis vale a pena', 'cardapio-digital-gratis.html'],
      ['cardápio digital x 99Food', 'cardapio-digital-99food.html'],
      ['cardápio digital em PDF', 'cardapio-digital-pdf.html'],
      ['cardápio digital no WhatsApp', 'cardapio-digital-para-whatsapp.html'],
      ['cardápio digital por cidade', 'cidades.html'],
    ],
    body: `<p>Não existe "melhor cardápio digital" no absoluto — existe o que resolve o seu tipo de operação pelo menor custo total. Este é o checklist objetivo que separa plataforma boa de vitrine cara.</p>

<h2>Os 10 critérios que decidem</h2>
<ol>
  <li><strong>Cobra comissão?</strong> Se cobra, o preço final depende do seu sucesso. Prefira valor fixo.</li>
  <li><strong>A base de clientes é sua?</strong> Você consegue exportar telefone e histórico?</li>
  <li><strong>O pedido cai no WhatsApp?</strong> É onde o cliente brasileiro já está.</li>
  <li><strong>Abre rápido no celular?</strong> Cardápio pesado perde pedido antes do carrinho.</li>
  <li><strong>Taxa por bairro e raio de entrega:</strong> sem isso, a corrida longa come a margem.</li>
  <li><strong>Adicionais e observações:</strong> hambúrguer sem cebola, ponto da carne, borda recheada.</li>
  <li><strong>Quem monta o cardápio?</strong> Montagem inclusa economiza dias do seu tempo.</li>
  <li><strong>Campanha para a base:</strong> disparo no WhatsApp é o marketing mais barato do delivery.</li>
  <li><strong>Relatório de vendas:</strong> saber o que mais sai muda o cardápio e o preço.</li>
  <li><strong>Fidelidade e multa:</strong> plano bom não precisa prender ninguém.</li>
</ol>

<h2>Como o Menuzia se sai no checklist</h2>
<table>
  <tr><th>Critério</th><th>Menuzia</th></tr>
  <tr><td>Comissão por pedido</td><td>Nenhuma — R$67/mês fixo</td></tr>
  <tr><td>Base de clientes</td><td>Sua, com histórico e campanhas</td></tr>
  <tr><td>Pedido no WhatsApp</td><td>Sim, com robô 24h</td></tr>
  <tr><td>Taxa por bairro</td><td>Sim, com raio de entrega</td></tr>
  <tr><td>Montagem do cardápio</td><td>Feita pela nossa equipe</td></tr>
  <tr><td>Fidelidade</td><td>Não tem</td></tr>
</table>

<h2>Erros comuns na escolha</h2>
<ul>
  <li>Comparar só a mensalidade e ignorar a comissão.</li>
  <li>Escolher pelo painel bonito e descobrir que o cliente não fecha o pedido.</li>
  <li>Aceitar plano "grátis" que segura a sua lista de clientes.</li>
  <li>Contratar módulo fiscal e PDV que a operação ainda não usa.</li>
</ul>

<h2>Melhor custo-benefício</h2>
<p>Se o critério for custo total por pedido com todos os recursos essenciais inclusos, o caminho passa por mensalidade baixa e zero comissão. Veja <a href="/cardapio-digital-mais-barato.html">o comparativo de preço mais barato do mercado</a>, o detalhamento em <a href="/cardapio-digital-preco.html">preço de cardápio digital</a> e comece por <a href="/cardapio-digital-para-delivery.html">cardápio digital para delivery</a>.</p>`,
    faq: [
      ['Qual o melhor cardápio digital para delivery pequeno?', 'O que cobra pouco e fixo, entrega pedido no WhatsApp e permite taxa por bairro. Para operação pequena, comissão é o pior formato porque consome margem justamente quando ela é menor.'],
      ['Vale mais a pena um sistema completo com PDV?', 'Só se você já usa PDV e emissão fiscal no balcão. Para delivery e salão simples, o cardápio com painel de pedidos resolve por uma fração do preço.'],
      ['Como comparar plataformas de forma justa?', 'Some mensalidade + comissão estimada do seu faturamento + módulos cobrados à parte. Compare esse total, não o preço de vitrine.'],
      ['O melhor cardápio digital precisa de aplicativo próprio?', 'Não. Aplicativo exige o cliente instalar algo — o link e o QR Code convertem mais e custam muito menos.'],
      ['Dá para trocar de plataforma depois?', 'Dá. Sem fidelidade, a troca é só refazer o cardápio e redirecionar a divulgação. Ter a base de clientes exportável facilita muito.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-restaurante-iniciante.html',
    cat: 'Iniciante',
    heroImg: 'blog-hamburgueria.webp',
    heroAlt: 'Dono de delivery iniciante montando o primeiro cardápio digital',
    title: 'Cardápio Digital para Restaurante Iniciante: Comece por R$67/mês | Menuzia',
    h1: 'Cardápio digital para restaurante iniciante: como começar sem errar o custo',
    desc: 'Está começando um delivery ou restaurante? Veja como montar o primeiro cardápio digital, o que evitar no começo e por que R$67/mês fixo protege a margem de quem ainda tem pouco volume.',
    keywords: 'cardápio digital para restaurante iniciante, cardápio digital para quem está começando, primeiro cardápio digital, cardápio digital para delivery iniciante, como começar um delivery, cardápio digital para pequeno restaurante, cardápio digital para delivery caseiro, cardápio digital para MEI',
    lt: [
      ['cardápio digital para restaurante iniciante', '#'],
      ['cardápio digital para quem está começando', '#'],
      ['cardápio digital para delivery caseiro', 'cardapio-digital-para-delivery.html'],
      ['cardápio digital para MEI', 'cardapio-digital-barato.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['cardápio digital grátis para começar', 'cardapio-digital-gratis.html'],
      ['quanto custa começar um delivery', 'blog/estrategia/montar-delivery-proprio-gastando-pouco.html'],
      ['cardápio digital para lanchonete', 'cardapio-digital-para-lanchonete.html'],
      ['cardápio digital para marmitaria', 'cardapio-digital-para-marmitaria.html'],
      ['cardápio digital na minha cidade', 'cidades.html'],
    ],
    body: `<p>Quem está <strong>começando um restaurante ou delivery</strong> tem duas restrições: pouco dinheiro e pouco tempo. As duas apontam para o mesmo lugar — comece com custo fixo baixo, cardápio enxuto e pedido no WhatsApp.</p>

<h2>Os 3 erros mais caros de quem começa</h2>
<ol>
  <li><strong>Entrar só por aplicativo.</strong> Traz pedido rápido, mas você não fica com o cliente nem com a margem.</li>
  <li><strong>Cardápio gigante no primeiro mês.</strong> Mais itens = mais estoque parado, mais erro na cozinha e cliente indeciso.</li>
  <li><strong>Contratar sistema caro demais.</strong> PDV, fiscal e integração completa antes de ter volume viram custo fixo sem retorno.</li>
</ol>

<h2>O que basta para começar de verdade</h2>
<ul>
  <li>Um <strong>link de cardápio</strong> com 8 a 15 itens bem fotografados</li>
  <li>Pedido caindo no <strong>WhatsApp</strong> e no painel</li>
  <li><strong>Taxa de entrega por bairro</strong> configurada desde o primeiro dia</li>
  <li>Pagamento em <strong>Pix, cartão e dinheiro</strong></li>
  <li><strong>QR Code</strong> para embalagem, panfleto e balcão</li>
</ul>

<h2>Comece com poucos itens (e venda mais)</h2>
<p>Cardápio curto vende melhor no começo: a cozinha erra menos, o insumo gira e o cliente decide rápido. Suba item novo só quando o atual estiver saindo bem. O passo a passo prático está em <a href="/blog/guias/como-criar-cardapio-digital-para-hamburgueria.html">como criar um cardápio digital</a>.</p>

<h2>A conta de quem está começando</h2>
<p>Com 60 pedidos no primeiro mês e ticket de R$40, você fatura R$2.400. Em um app com 18% de comissão, R$432 vão embora. No plano fixo de <strong>R$67</strong>, sobram R$365 — que pagam embalagem, gás ou o primeiro impulsionamento no Instagram.</p>

<h2>Não faça sozinho</h2>
<p>No Menuzia, <strong>nossa equipe monta o cardápio</strong> a partir das suas fotos e da lista de preços — inclusive de um PDF ou de um print antigo. Você não perde a primeira semana mexendo em painel. Veja <a href="/cardapio-digital-pdf.html">como sair do cardápio em PDF</a> e o <a href="/cardapio-digital-barato.html">plano completo</a>.</p>

<h2>Primeiros clientes sem gastar com anúncio</h2>
<ol>
  <li>Link do cardápio na bio do Instagram e no status do WhatsApp.</li>
  <li>QR Code impresso na embalagem e no balcão.</li>
  <li>Grupo de bairro e condomínio: link + foto do carro-chefe.</li>
  <li>Cupom de primeira compra para quem vier pelo seu link.</li>
  <li>Depois do primeiro mês, <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanha de WhatsApp</a> para quem já pediu.</li>
</ol>`,
    faq: [
      ['Preciso de CNPJ para ter cardápio digital?', 'Não é exigido. Funciona para delivery caseiro, MEI ou empresa. Você pode formalizar depois sem trocar de cardápio.'],
      ['Quantos itens devo colocar no começo?', 'Entre 8 e 15. Cardápio curto reduz erro na cozinha, evita estoque parado e acelera a decisão do cliente.'],
      ['Vale começar por aplicativo de delivery?', 'Como vitrine, sim — mas comece já com o seu link em paralelo, para não construir uma base de clientes que pertence a outra empresa.'],
      ['Preciso saber mexer em sistema?', 'Não. Nossa equipe monta o cardápio e conecta o WhatsApp. Você só envia fotos, itens e preços.'],
      ['Quanto custa começar?', 'R$67 por mês, sem comissão e sem taxa de instalação. Com ticket médio de R$45, dois pedidos pagam a mensalidade.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-lanchonete.html',
    cat: 'Lanchonete',
    heroImg: 'local-vila-velha-2.webp',
    heroAlt: 'Lanchonete preparando pedidos recebidos pelo cardápio digital',
    title: 'Cardápio Digital para Lanchonete sem Comissão | R$67/mês | Menuzia',
    h1: 'Cardápio digital para lanchonete: pedido no WhatsApp e fila menor no balcão',
    desc: 'Cardápio digital para lanchonete por R$67/mês sem comissão: combos, adicionais, pedido no WhatsApp e QR Code no balcão. Ticket baixo pede custo fixo, não percentual por pedido.',
    keywords: 'cardápio digital para lanchonete, cardápio online lanchonete, cardápio digital para lanches, cardápio digital para trailer de lanche, cardápio digital para food truck, sistema de pedidos lanchonete, cardápio digital barato para lanchonete',
    lt: [
      ['cardápio digital para lanchonete', '#'],
      ['cardápio digital para food truck', '#'],
      ['cardápio digital para hamburgueria', 'blog/guias/como-criar-cardapio-digital-para-hamburgueria.html'],
      ['cardápio digital para delivery', 'cardapio-digital-para-delivery.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
      ['cardápio digital no WhatsApp', 'cardapio-digital-para-whatsapp.html'],
      ['QR Code para cardápio', 'blog/guias/qr-code-para-cardapio-digital.html'],
      ['cardápio digital na minha cidade', 'cidades.html'],
    ],
    body: `<p>Lanchonete vive de <strong>ticket baixo e giro alto</strong> — e é exatamente o perfil que mais sofre com comissão percentual. Em um lanche de R$28, 20% são R$5,60: praticamente o custo do pão, da carne e do queijo juntos.</p>

<h2>O que o cardápio digital resolve na lanchonete</h2>
<ul>
  <li><strong>Fila menor no balcão:</strong> QR Code na mesa e no caixa, cliente pede pelo celular.</li>
  <li><strong>Menos erro de pedido:</strong> adicional, ponto e "sem cebola" chegam escritos, não gritados.</li>
  <li><strong>Combo que aumenta ticket:</strong> lanche + bebida + fritas sugeridos na hora do carrinho.</li>
  <li><strong>Item esgotado some na hora:</strong> acabou o X-Tudo? Um clique e ninguém mais pede.</li>
  <li><strong>Pedido no WhatsApp:</strong> sem digitar comanda no chat, sem somar preço na mão.</li>
</ul>

<h2>Adicionais: onde a lanchonete ganha margem</h2>
<p>Bacon extra, cheddar, ovo, dobro de carne, borda, molho. No cardápio digital cada adicional tem preço próprio e entra automático na conta — é o item de maior margem da casa e o que mais some quando o pedido é anotado por WhatsApp na correria.</p>

<h2>Horário e cardápio separados</h2>
<p>Café da manhã, almoço executivo e lanche da noite podem ter cardápios e horários diferentes no mesmo link. O cliente vê só o que está disponível agora.</p>

<h2>Quanto custa</h2>
<p><strong>R$67/mês fixo, sem comissão por pedido.</strong> Com ticket de R$28, dois lanches e meio pagam o mês. Compare com o percentual do aplicativo em <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a> e veja o <a href="/cardapio-digital-mais-barato.html">comparativo do mais barato do mercado</a>.</p>

<h2>Serve para trailer e food truck?</h2>
<p>Serve. Não precisa de loja física nem de ponto fixo: o link é o mesmo, você muda o endereço de retirada e o raio de entrega quando muda de praça. Veja também <a href="/cardapio-digital-para-restaurante-iniciante.html">como começar do zero</a> e as <a href="/cidades.html">cidades atendidas</a>.</p>`,
    faq: [
      ['Serve para lanchonete que só atende no balcão?', 'Serve. O QR Code no balcão e nas mesas já reduz fila e erro de pedido, mesmo sem delivery ativado.'],
      ['Dá para montar combos e adicionais?', 'Sim. Cada item pode ter adicionais com preço próprio, opções obrigatórias e observações do cliente.'],
      ['Consigo tirar um lanche do ar quando acaba o insumo?', 'Sim, com um clique. O item some do cardápio na hora, para todos os clientes.'],
      ['E se eu tiver cardápio diferente por horário?', 'Você configura disponibilidade por horário: café, almoço e lanche da noite aparecem apenas no período certo.'],
      ['Quanto custa para uma lanchonete pequena?', 'R$67 por mês, valor fixo, sem comissão. Com ticket de R$28, cerca de três lanches cobrem a mensalidade.'],
    ],
  },

  {
    slug: 'cardapio-digital-para-marmitaria.html',
    cat: 'Marmitaria',
    heroImg: 'blog-whatsapp.webp',
    heroAlt: 'Marmitas prontas para entrega organizadas por pedidos do cardápio digital',
    title: 'Cardápio Digital para Marmitaria: Pedido Antecipado e Rota | Menuzia',
    h1: 'Cardápio digital para marmitaria: pedido antecipado, rota certa e zero comissão',
    desc: 'Cardápio digital para marmitaria por R$67/mês sem comissão: cardápio do dia, pedido antecipado no WhatsApp, plano semanal e taxa de entrega por bairro para fechar a rota do almoço.',
    keywords: 'cardápio digital para marmitaria, cardápio digital marmitex, cardápio do dia digital, sistema de pedidos para marmitaria, cardápio digital para quentinha, marmitaria delivery sem comissão, cardápio digital para comida caseira',
    lt: [
      ['cardápio digital para marmitaria', '#'],
      ['cardápio do dia digital', '#'],
      ['cardápio digital para quentinha', '#'],
      ['cardápio digital para comida caseira', 'cardapio-digital-para-restaurante.html'],
      ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
      ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
      ['campanha de WhatsApp para delivery', 'blog/marketing/campanha-whatsapp-para-delivery.html'],
      ['cardápio digital para quem está começando', 'cardapio-digital-para-restaurante-iniciante.html'],
      ['cardápio digital na minha cidade', 'cidades.html'],
    ],
    body: `<p>Marmitaria é o delivery mais previsível que existe: o mesmo cliente, no mesmo horário, quase todo dia útil. O <strong>cardápio digital</strong> transforma essa previsibilidade em rota fechada e produção certa — sem entregar percentual do almoço para aplicativo.</p>

<h2>Cardápio do dia sem mandar foto no grupo</h2>
<p>Em vez de postar a foto do quadro branco todo dia, você atualiza o <strong>cardápio do dia</strong> no painel e manda um único link. O cliente vê o prato de hoje, escolhe tamanho (P, M, G), acompanhamento e já fecha o pedido.</p>

<h2>Pedido antecipado = produção sem sobra</h2>
<ul>
  <li>Abra os pedidos na noite anterior ou às 8h e feche às 10h30.</li>
  <li>Você produz a quantidade exata — menos desperdício, menos falta.</li>
  <li>A rota do motoboy sai organizada por bairro, não por ordem de chegada no WhatsApp.</li>
</ul>

<h2>Taxa por bairro fecha a conta do almoço</h2>
<p>Marmita tem ticket baixo e janela curta. Uma entrega fora do raio destrói a margem do pedido inteiro. No cardápio digital você define <strong>taxa por bairro, raio máximo e pedido mínimo</strong> — e o cliente distante já vê o custo antes de fechar.</p>

<h2>Plano semanal e cliente fixo</h2>
<p>Quem almoça com você toda terça vale muito mais que um pedido avulso. Com a base de clientes na sua mão dá para oferecer <strong>pacote de 5 ou 20 marmitas</strong>, avisar o cardápio da semana e recuperar quem sumiu — tudo por <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">campanha de WhatsApp</a>, sem pagar mídia.</p>

<h2>Quanto custa</h2>
<p><strong>R$67/mês fixo, sem comissão.</strong> Com marmita a R$22, três pedidos pagam o mês. Em um aplicativo com 18%, cada marmita deixa quase R$4 pelo caminho — em 400 marmitas, R$1.600 por mês. Veja <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a>, o <a href="/cardapio-digital-preco.html">comparativo de preços</a> e as <a href="/cidades.html">cidades atendidas</a>.</p>`,
    faq: [
      ['Dá para trocar o cardápio todo dia?', 'Sim. Você edita o cardápio do dia no painel e o link continua o mesmo — não precisa mandar foto nova para cada cliente.'],
      ['Consigo abrir e fechar pedidos por horário?', 'Sim. Você define a janela de pedidos (por exemplo, das 8h às 10h30) e o cardápio fica indisponível fora dela.'],
      ['Funciona para plano semanal ou mensal de marmitas?', 'Funciona. Você cadastra pacotes como itens do cardápio e usa a base de clientes para renovar por WhatsApp.'],
      ['Dá para cobrar taxa diferente por bairro?', 'Sim, além de raio máximo de entrega e valor mínimo de pedido — essencial para não perder dinheiro em entrega longa.'],
      ['Preciso de cozinha industrial ou CNPJ?', 'Não. Funciona para marmitaria caseira, MEI ou empresa constituída.'],
    ],
  },

  // ======================= CLUSTER DE GESTÃO =======================
  {
    slug: 'sistema-pdv-para-delivery.html',
    cat: 'PDV',
    heroImg: 'tut-painel.webp',
    heroAlt: 'Painel do sistema PDV para delivery com pedidos de balcão, telefone e mesa',
    title: 'Sistema PDV para Delivery e Restaurante | R$67/mês | Menuzia',
    h1: 'Sistema PDV para delivery: balcão, telefone e mesa num painel só',
    desc: 'Sistema PDV para delivery e restaurante por R$67/mês fixo: PDV touch no tablet, pedidos de balcão, telefone e mesa no mesmo painel do cardápio digital, caixa por operador e impressão na cozinha.',
    keywords: 'sistema pdv para delivery, pdv para restaurante, pdv para lanchonete, sistema de caixa para delivery, pdv touch tablet, frente de caixa para restaurante, pdv para hamburgueria, sistema pdv barato',
    lt: LT_GESTAO,
    body: `<p>Um <strong>sistema PDV para delivery</strong> (ponto de venda, ou frente de caixa) é onde a equipe lança os pedidos que <em>não</em> chegam pelo cardápio digital: o cliente do balcão, o pedido por telefone, a mesa que chamou o garçom. Quando o PDV é um sistema separado do delivery, você passa a ter dois caixas, dois relatórios e pedido perdido entre um e outro.</p>

<h2>O problema de ter PDV e delivery separados</h2>
<ul>
  <li><strong>Cozinha recebendo de dois lugares:</strong> uma comanda sai da impressora do PDV, outra do WhatsApp, outra do app — e a ordem de preparo vira palpite.</li>
  <li><strong>Fechamento de caixa que não bate:</strong> o faturamento do dia fica espalhado e ninguém sabe quanto entrou de cada canal.</li>
  <li><strong>Cliente do balcão some:</strong> quem comprou no balcão não entra na base de clientes e nunca recebe uma campanha.</li>
</ul>

<h2>Como funciona o PDV do Menuzia</h2>
<p>O PDV roda <strong>em tela cheia no tablet, no computador ou no celular</strong> — sem instalar programa. A pessoa do caixa ou o garçom lança o pedido em poucos toques, com os mesmos produtos, adicionais e tamanhos do cardápio digital. O pedido cai no <strong>mesmo painel de pedidos</strong> (recebido, preparando, pronto) junto com o que veio do cardápio online e dos marketplaces, e sai na impressora da cozinha automaticamente.</p>
<ul>
  <li>Pedidos de <strong>balcão, telefone e mesa</strong> no mesmo lugar</li>
  <li><strong>Abertura e fechamento de caixa por operador</strong> — cada turno responde pelo seu caixa (veja <a href="/controle-de-caixa-para-restaurante.html">controle de caixa e sangria</a>)</li>
  <li><strong>Impressão automática</strong> na cozinha, sem redigitar nada</li>
  <li>Faturamento separado por canal: vitrine (cardápio digital), PDV e mesas</li>
  <li>Integra com <a href="/sistema-de-mesas-e-comandas.html">mesas e comandas com QR Code</a> e com a <a href="/rota-de-motoboy-para-delivery.html">gestão de motoboys</a></li>
</ul>

<h2>PDV no tablet x computador de caixa</h2>
<p>Hamburgueria pequena costuma resolver tudo com <strong>um tablet no balcão</strong>: lança o pedido, recebe e acompanha a fila. Quem tem salão coloca o mesmo PDV no celular do garçom. Como é tudo no navegador, trocar de aparelho é só fazer login — não existe licença por máquina.</p>

<h2>Quanto custa um sistema PDV para delivery</h2>
<p>PDV de restaurante costuma ser cobrado à parte do cardápio digital, às vezes por terminal. No Menuzia o PDV faz parte do mesmo plano: <strong>R$67/mês fixo, sem comissão por pedido</strong>, com cardápio digital, painel, impressão, mesas e motoboy no pacote. Compare as faixas do mercado em <a href="/cardapio-digital-preco.html">quanto custa um cardápio digital</a>.</p>

<h2>Para quem é</h2>
<p>Hamburguerias, pizzarias, lanchonetes, açaíterias e restaurantes que vendem no balcão <em>e</em> no delivery e querem um caixa só. Se você ainda organiza a operação, leia também <a href="/blog/tutoriais/como-organizar-cozinha-de-delivery.html">como organizar a cozinha do delivery</a> e <a href="/blog/tutoriais/o-que-e-kds-tela-de-cozinha.html">o que é KDS (tela de cozinha)</a>.</p>`,
    faq: [
      ['Preciso comprar um computador para usar o PDV?', 'Não. O PDV roda no navegador em tela cheia: tablet, notebook, computador ou celular. Basta fazer login no painel.'],
      ['O pedido lançado no PDV vai para a cozinha?', 'Sim. Ele entra no mesmo painel de pedidos do cardápio digital e dos marketplaces e é impresso automaticamente na impressora da cozinha.'],
      ['Dá para ter mais de um operador de caixa?', 'Sim. A abertura e o fechamento de caixa são feitos por operador, o que facilita conferir cada turno.'],
      ['O PDV é cobrado à parte?', 'Não. O PDV faz parte do plano de <strong>R$67/mês fixo</strong>, sem taxa por pedido e sem cobrança por terminal.'],
      ['Funciona para pedido por telefone?', 'Funciona. A atendente lança o pedido no PDV com endereço e forma de pagamento, e ele segue o mesmo fluxo de cozinha e entrega do delivery.'],
    ],
  },

  {
    slug: 'controle-de-caixa-para-restaurante.html',
    cat: 'Financeiro',
    heroImg: 'blog-precos.webp',
    heroAlt: 'Dono de restaurante conferindo o fechamento de caixa e a sangria do dia',
    title: 'Controle de Caixa para Restaurante: Sangria e Fechamento | Menuzia',
    h1: 'Controle de caixa para restaurante e delivery: abertura, sangria e fechamento sem furo',
    desc: 'Como fazer controle de caixa no restaurante e no delivery: abertura com fundo de troco, sangria, suprimento, fechamento por operador e conferência de Pix, cartão e dinheiro dos motoboys.',
    keywords: 'controle de caixa para restaurante, sangria de caixa, como fazer sangria, fechamento de caixa delivery, gestão financeira restaurante, controle financeiro delivery, abertura e fechamento de caixa, suprimento de caixa',
    lt: LT_GESTAO,
    body: `<p>Quase todo delivery que "fatura bem e não sobra dinheiro" tem o mesmo problema: <strong>o caixa não é fechado de verdade</strong>. Entra Pix, cartão, dinheiro na mão do motoboy, troco que saiu da gaveta — e no fim do dia ninguém sabe dizer se faltou R$5 ou R$500. Controle de caixa é rotina, não software caro.</p>

<h2>Os 4 movimentos do caixa</h2>
<table>
  <tr><th>Movimento</th><th>O que é</th><th>Exemplo</th></tr>
  <tr><td><strong>Abertura</strong></td><td>Valor em dinheiro que o operador recebe para começar o turno (fundo de troco)</td><td>R$150 em notas pequenas e moedas</td></tr>
  <tr><td><strong>Suprimento</strong></td><td>Dinheiro que <em>entra</em> na gaveta sem ser venda</td><td>Mais R$50 de troco no meio do pico</td></tr>
  <tr><td><strong>Sangria</strong></td><td>Dinheiro que <em>sai</em> da gaveta sem ser troco</td><td>Retirar R$800 para o cofre, pagar o gás</td></tr>
  <tr><td><strong>Fechamento</strong></td><td>Contagem final comparada com o que o sistema diz que deveria ter</td><td>Esperado R$1.240, contado R$1.235</td></tr>
</table>

<h2>Como fazer sangria do jeito certo</h2>
<ol>
  <li><strong>Defina um teto de gaveta</strong> (ex.: R$600). Passou disso, faz sangria — menos dinheiro exposto, menos prejuízo se der problema.</li>
  <li><strong>Toda sangria tem registro:</strong> valor, horário, quem retirou e o motivo. Pagamento de fornecedor com dinheiro do caixa também é sangria.</li>
  <li><strong>Duas pessoas conferem</strong> quando o valor for alto.</li>
  <li>O dinheiro da sangria vai para envelope identificado ou cofre, nunca para o bolso "pra devolver depois".</li>
</ol>

<h2>Fechamento: a conta que tem que bater</h2>
<p><strong>Dinheiro esperado = abertura + vendas em dinheiro + suprimentos − sangrias.</strong> Compare com o dinheiro contado. Depois confira separadamente:</p>
<ul>
  <li><strong>Pix:</strong> total no sistema x total no extrato do banco (veja <a href="/blog/tutoriais/como-receber-pix-no-delivery.html">como receber Pix no delivery com segurança</a>).</li>
  <li><strong>Cartão:</strong> total no sistema x relatório da maquininha ou do pagamento online.</li>
  <li><strong>Motoboys:</strong> o dinheiro que cada entregador recebeu na porta precisa voltar para o caixa.</li>
</ul>

<h2>Como o Menuzia ajuda no controle financeiro</h2>
<ul>
  <li><strong>Abertura e fechamento de caixa por operador</strong> no <a href="/sistema-pdv-para-delivery.html">PDV</a> — cada turno responde pelo seu caixa.</li>
  <li><strong>Faturamento por forma de pagamento</strong> (Pix, cartão, dinheiro) e separado por canal: cardápio digital, PDV e mesas.</li>
  <li><strong>Fechamento de caixa dos entregadores</strong> na tela de Logística: quanto dinheiro está com cada motoboy, troco levado e valor a receber (veja <a href="/rota-de-motoboy-para-delivery.html">rota e controle de motoboy</a>).</li>
  <li>Ticket médio, itens por pedido, horário de pico e comparação com o período anterior.</li>
</ul>

<h2>O furo que não aparece no caixa: comissão</h2>
<p>Caixa bater não significa margem boa. Se 30% das vendas passam por aplicativo com comissão, esse dinheiro nem chega na gaveta. Calcule o seu <a href="/blog/guias/como-calcular-cmv-restaurante.html">CMV</a> e o peso das taxas, e compare com um <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a> por R$67/mês fixo.</p>`,
    faq: [
      ['O que é sangria de caixa?', 'É a retirada de dinheiro da gaveta que não é troco: levar o excesso para o cofre, pagar um fornecedor ou uma despesa. Toda sangria deve ser registrada com valor, horário, responsável e motivo.'],
      ['Qual a diferença entre sangria e suprimento?', 'Sangria é dinheiro que sai do caixa; suprimento é dinheiro que entra no caixa sem ser venda, como reforço de troco.'],
      ['Como calcular o valor esperado no fechamento?', 'Abertura + vendas em dinheiro + suprimentos − sangrias. O resultado deve bater com o dinheiro contado na gaveta.'],
      ['Como controlar o dinheiro que fica com o motoboy?', 'No Menuzia, a tela de Logística mostra quanto cada entregador tem em mãos, o troco levado e o valor a receber, e faz o fechamento de caixa dos entregadores.'],
      ['Dá para separar o faturamento do delivery e do balcão?', 'Sim. O relatório separa o faturamento por canal (cardápio digital, PDV e mesas) e por forma de pagamento.'],
    ],
  },

  {
    slug: 'sistema-de-mesas-e-comandas.html',
    cat: 'Mesas',
    heroImg: 'blog-hamburgueria.webp',
    heroAlt: 'Mesa de restaurante com QR Code para pedido direto na comanda digital',
    title: 'Sistema de Mesas e Comandas com QR Code | Sem Papel | Menuzia',
    h1: 'Sistema de mesas e comandas com QR Code: salão e delivery no mesmo painel',
    desc: 'Controle de mesas e comandas sem papel: QR Code por mesa, pedido direto na comanda, mapa de mesas em tempo real (livre, ocupada, em limpeza), conta por mesa e delivery no mesmo sistema. R$67/mês.',
    keywords: 'sistema de mesas e comandas, controle de mesas restaurante, comanda digital, comanda eletrônica, qr code na mesa, cardápio digital para mesa, gestão de mesas e delivery, sistema de comanda para bar',
    lt: LT_GESTAO,
    body: `<p>Comanda de papel funciona até o primeiro sábado cheio: letra que ninguém entende, item que não chegou na cozinha, mesa que pagou e saiu sem ninguém conferir. Um <strong>sistema de mesas e comandas</strong> resolve isso — e quando ele é o mesmo sistema do delivery, o salão e a entrega param de brigar pela cozinha.</p>

<h2>Como funciona a comanda com QR Code</h2>
<ol>
  <li>Cada mesa ganha um <strong>QR Code próprio</strong> (o sistema gera a folha pronta para imprimir).</li>
  <li>O cliente aponta a câmera, abre o cardápio e pede — sem baixar aplicativo.</li>
  <li>O pedido cai <strong>direto na comanda daquela mesa</strong> e sai na impressora da cozinha.</li>
  <li>O garçom só entrega. Quem preferir pedir ao garçom, ele lança pelo <a href="/sistema-pdv-para-delivery.html">PDV no celular</a>.</li>
  <li>No fim, a conta da mesa está pronta: é só receber e fechar.</li>
</ol>

<h2>Mapa de mesas em tempo real</h2>
<p>No painel você vê o salão inteiro com o status de cada mesa: <strong>livre, aguardando, ocupada e em limpeza</strong>. Dá para saber na hora quem está esperando há muito tempo e qual mesa pode receber o próximo cliente.</p>

<h2>O que vem incluso</h2>
<ul>
  <li>QR Code por mesa, com folha pronta para imprimir</li>
  <li>Conta e pagamentos por mesa</li>
  <li>Comandas de balcão e <strong>totem de autoatendimento</strong></li>
  <li>Cardápio rodando também em tablet na mesa</li>
  <li>Pedidos de mesa, delivery e marketplaces na mesma fila da cozinha</li>
  <li>Faturamento das mesas separado do delivery no relatório</li>
</ul>

<h2>Mesa + delivery: por que no mesmo sistema</h2>
<p>Restaurante que tem salão e delivery em sistemas diferentes vive com duas filas de cozinha e dois fechamentos. Com tudo no mesmo painel, a cozinha vê a ordem real dos pedidos e o <a href="/controle-de-caixa-para-restaurante.html">fechamento de caixa</a> sai num lugar só. Leia como montar o QR Code em <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code para cardápio digital</a>.</p>

<h2>Comanda digital aumenta o ticket</h2>
<p>Cliente que pede pelo celular vê foto, adicional e sugestão "peça também" em cada item — e pede mais sobremesa e bebida do que pediria esperando o garçom passar. Veja estratégias em <a href="/programa-de-fidelidade-para-delivery.html">fidelidade e ticket médio</a>.</p>

<h2>Quanto custa</h2>
<p>Mesas e comandas estão no mesmo plano do cardápio digital: <strong>R$67/mês fixo</strong>, sem taxa por pedido e sem cobrança por mesa. Veja o <a href="/cardapio-digital-para-restaurante.html">cardápio digital para restaurante</a>.</p>`,
    faq: [
      ['O cliente precisa baixar aplicativo para pedir na mesa?', 'Não. Ele aponta a câmera para o QR Code da mesa e o cardápio abre no navegador do celular.'],
      ['O pedido da mesa vai direto para a cozinha?', 'Sim. Ele entra na comanda da mesa, aparece no painel e é impresso automaticamente na cozinha.'],
      ['Dá para o garçom lançar o pedido?', 'Dá. O garçom usa o PDV no celular ou tablet e o pedido vai para a mesma comanda.'],
      ['Consigo ver quais mesas estão ocupadas?', 'Sim. O mapa de mesas mostra em tempo real se cada mesa está livre, aguardando, ocupada ou em limpeza.'],
      ['Tem custo por mesa ou por QR Code?', 'Não. Mesas, comandas e QR Codes fazem parte do plano de R$67/mês fixo.'],
    ],
  },

  {
    slug: 'rota-de-motoboy-para-delivery.html',
    cat: 'Entregas',
    heroImg: 'tut-logistica.webp',
    heroAlt: 'Tela de logística mostrando motoboys em rota e entregas em tempo real',
    title: 'Rota de Motoboy para Delivery: App do Entregador e GPS | Menuzia',
    h1: 'Rota de motoboy para delivery: entregador com rota, troco e GPS no celular',
    desc: 'Gestão de motoboy para delivery: rota no Google Maps, troco e valor a receber no celular do entregador, acompanhamento em tempo real e fechamento de caixa por motoboy. R$67/mês fixo.',
    keywords: 'rota de motoboy, roteirização de entregas delivery, aplicativo para entregador, app para motoboy delivery, gestão de motoboy, controle de entregadores, rastrear motoboy delivery, sistema de entrega para restaurante',
    lt: LT_GESTAO,
    body: `<p>No pico de sexta à noite, a entrega é onde o delivery perde dinheiro: motoboy que sai com um pedido só, endereço errado, troco que não confere, cliente ligando "cadê meu lanche?". Organizar a <strong>rota de motoboy</strong> é a forma mais barata de entregar mais rápido sem contratar mais gente.</p>

<h2>Como montar uma rota de entrega eficiente</h2>
<ol>
  <li><strong>Agrupe por região:</strong> pedidos do mesmo bairro ou do mesmo eixo saem juntos. Duas entregas no mesmo caminho custam quase o tempo de uma.</li>
  <li><strong>Defina um limite por saída</strong> (ex.: até 3 pedidos) para o primeiro cliente não esfriar esperando o último.</li>
  <li><strong>Ordem de entrega = ordem do caminho</strong>, não ordem de chegada do pedido.</li>
  <li><strong>Raio e taxa por bairro</strong> combinados com a rota: bairro longe paga mais e entra em rota própria (veja <a href="/blog/tutoriais/como-configurar-taxa-de-entrega-por-bairro.html">como configurar taxa de entrega por bairro</a>).</li>
  <li><strong>Pedido pronto só sai com tudo conferido:</strong> bebida, molho, troco.</li>
</ol>

<h2>Aplicativo para entregadores do Menuzia</h2>
<p>Seus motoboys acessam <strong>pedidos, rota e valor de troco direto pelo celular</strong>. Acaba a papelada e a comanda rabiscada.</p>
<ul>
  <li><strong>Rota inteligente:</strong> o endereço abre direto no Google Maps</li>
  <li><strong>Controle de caixa:</strong> troco, forma de pagamento e valor a receber em cada entrega</li>
  <li><strong>Tempo real:</strong> o motoboy marca "Entregue" e o painel atualiza na hora</li>
  <li><strong>GPS:</strong> você vê onde cada entregador está no mapa e quem está em rota</li>
  <li>Quantas entregas cada um fez e <strong>quanto dinheiro está com cada um</strong> — base para o <a href="/controle-de-caixa-para-restaurante.html">fechamento de caixa</a></li>
</ul>

<h2>Motoboy fixo, freelancer ou por corrida?</h2>
<p>Quem está começando costuma pagar por entrega ou diária e só fixa entregador quando o volume é previsível. Seja qual for o modelo, ter o registro de quantas entregas cada um fez evita discussão no acerto. O app funciona para entregador próprio e para parceiro.</p>

<h2>Cliente avisado não liga</h2>
<p>Quando o pedido sai para entrega, o cliente pode receber aviso automático no WhatsApp — menos ligação, menos mensagem "já saiu?". Veja <a href="/blog/tutoriais/como-configurar-whatsapp-business-para-delivery.html">como configurar o WhatsApp Business para delivery</a>.</p>

<h2>Quanto custa</h2>
<p>A gestão de motoboys está no plano do cardápio digital: <strong>R$67/mês fixo</strong>, sem cobrança por entregador e sem taxa por pedido. Organize também a produção com <a href="/blog/tutoriais/como-organizar-cozinha-de-delivery.html">como organizar a cozinha de delivery</a>.</p>`,
    faq: [
      ['O motoboy precisa instalar um aplicativo?', 'Ele acessa os pedidos e a rota pelo celular. O endereço de cada entrega abre direto no Google Maps.'],
      ['Consigo ver onde o entregador está?', 'Sim. A tela de Logística mostra no mapa onde cada entregador está, quem está em rota e quantas entregas cada um fez.'],
      ['Como controlar o troco e o dinheiro do motoboy?', 'Cada entrega mostra troco, forma de pagamento e valor a receber. No painel você vê quanto dinheiro está com cada entregador e faz o fechamento de caixa deles.'],
      ['Cobra por entregador cadastrado?', 'Não. A gestão de motoboys faz parte do plano de R$67/mês fixo.'],
      ['Funciona com motoboy freelancer?', 'Funciona. O app serve para entregador próprio ou parceiro — o registro de entregas ajuda no acerto no fim do dia.'],
    ],
  },

  {
    slug: 'disparo-whatsapp-para-delivery.html',
    cat: 'Disparos',
    heroImg: 'tut-campanhas.webp',
    heroAlt: 'Tela de campanhas para disparo em massa de mensagens no WhatsApp para clientes do delivery',
    title: 'Disparo em Massa no WhatsApp para Delivery | Campanhas | Menuzia',
    h1: 'Disparo em massa no WhatsApp para delivery: venda de novo para quem já comprou',
    desc: 'Ferramenta de disparo em massa no WhatsApp para delivery: base de clientes própria, segmentação por frequência de compra, imagem, texto e áudio, agendamento de campanhas. R$67/mês fixo.',
    keywords: 'disparo em massa whatsapp, disparo de mensagens para delivery, disparo whatsapp restaurante, campanha whatsapp delivery, envio em massa whatsapp clientes, ferramenta de disparo whatsapp, whatsapp marketing delivery',
    lt: LT_GESTAO,
    body: `<p>O cliente mais barato de conquistar é o que <strong>já comprou de você</strong>. O problema é que, no aplicativo, a lista de clientes é da plataforma. No cardápio digital próprio, todo cliente que pede entra na <strong>sua base</strong> — e o <strong>disparo de mensagens no WhatsApp</strong> transforma essa base em pedido.</p>

<h2>O que dá para fazer com disparo em massa</h2>
<ul>
  <li><strong>Disparo para toda a base</strong> com um clique</li>
  <li><strong>Segmentação por frequência de compra:</strong> quem pede toda semana, quem sumiu há 30 dias, quem comprou uma vez só</li>
  <li><strong>Imagem, texto e áudio</strong> (áudio PTT, aquele que aparece como gravado na hora)</li>
  <li><strong>Agendamento de campanhas</strong> — monta na segunda, dispara na sexta às 18h</li>
  <li>Combina com <a href="/programa-de-fidelidade-para-delivery.html">programa de fidelidade e cupons</a></li>
</ul>

<h2>4 disparos que mais vendem no delivery</h2>
<ol>
  <li><strong>Reativação:</strong> "Faz tempo que você não pede 😢 Hoje tem frete grátis pra você" — só para quem não compra há 30+ dias.</li>
  <li><strong>Dia parado:</strong> combo especial na terça ou quarta, quando a cozinha está ociosa.</li>
  <li><strong>Lançamento:</strong> o lanche novo chega primeiro para quem já é cliente.</li>
  <li><strong>Pré-pico:</strong> lembrete às 18h de sexta com foto do carro-chefe.</li>
</ol>
<p>O passo a passo com exemplos de texto está em <a href="/blog/marketing/campanha-whatsapp-para-delivery.html">como fazer campanha de WhatsApp para delivery</a>.</p>

<h2>Como não ser bloqueado</h2>
<ul>
  <li>Dispare para <strong>quem já é cliente</strong> — nunca compre lista.</li>
  <li><strong>Uma a duas mensagens por semana</strong>, no máximo. Mais que isso vira spam.</li>
  <li>Sempre com algo de valor: desconto, novidade, brinde.</li>
  <li>Segmentar é melhor que mandar para todo mundo: mensagem certa para o cliente certo é bloqueada menos.</li>
</ul>

<h2>Disparo + robô de atendimento</h2>
<p>O mesmo WhatsApp conectado ao Menuzia tem robô que tira pedido, mandando o link do cardápio, e envia avisos automáticos de status do pedido. O cliente que recebeu a campanha clica e pede em segundos. Veja o <a href="/cardapio-digital-para-whatsapp.html">cardápio digital para WhatsApp</a>.</p>

<h2>Quanto custa</h2>
<p>Disparos estão no plano: <strong>R$67/mês fixo</strong>, sem comissão por pedido. Uma campanha de reativação que traga 5 pedidos já paga o mês. Para atrair cliente novo (que ainda não está na base), veja <a href="/blog/marketing/como-fazer-anuncios-para-delivery.html">como fazer anúncios para delivery</a>.</p>`,
    faq: [
      ['De onde vem a lista de clientes para o disparo?', 'Todo cliente que faz pedido no seu cardápio digital entra automaticamente na sua base, com nome, telefone e histórico de compras. A lista é sua.'],
      ['Dá para mandar só para quem parou de comprar?', 'Sim. A segmentação por frequência de compra permite disparar só para quem não pede há um tempo, para os clientes mais fiéis ou para quem comprou uma vez.'],
      ['Posso mandar foto e áudio?', 'Pode. A campanha aceita imagem, texto e áudio PTT.'],
      ['Consigo agendar a campanha?', 'Sim. Você agenda o disparo para o dia e horário que quiser.'],
      ['Quantas mensagens por semana é o ideal?', 'Uma a duas por semana, sempre com algo de valor. Mais que isso aumenta o risco de bloqueio e de o cliente sair da lista.'],
    ],
  },

  {
    slug: 'programa-de-fidelidade-para-delivery.html',
    cat: 'Fidelidade',
    heroImg: 'blog-sem-comissao.webp',
    heroAlt: 'Cliente fiel pedindo de novo no cardápio digital com cupom de fidelidade',
    title: 'Programa de Fidelidade e Ticket Médio no Delivery | Menuzia',
    h1: 'Programa de fidelidade para delivery: como fazer o cliente voltar e aumentar o ticket médio',
    desc: 'Como criar programa de fidelidade para delivery e aumentar o ticket médio: cupons, order bump ("peça também"), combos, adicionais e campanhas de WhatsApp. Tudo no cardápio digital de R$67/mês.',
    keywords: 'programa de fidelidade para delivery, como aumentar ticket médio, ticket médio delivery, fidelizar clientes delivery, cupom de desconto delivery, order bump restaurante, cartão fidelidade digital, como vender mais no delivery',
    lt: LT_GESTAO,
    body: `<p>Faturamento de delivery é uma conta simples: <strong>número de pedidos × ticket médio</strong>. Dá para crescer trazendo cliente novo (caro) ou fazendo o cliente atual <strong>voltar mais vezes</strong> e <strong>gastar um pouco mais em cada pedido</strong> (barato). Fidelidade e ticket médio são as duas alavancas do segundo caminho.</p>

<h2>Como calcular o ticket médio</h2>
<p><strong>Ticket médio = faturamento do período ÷ número de pedidos.</strong> R$30.000 em 750 pedidos = R$40. Subir para R$44 (10%) com os mesmos pedidos = R$3.000 a mais no mês, sem gastar um real com anúncio. O relatório do Menuzia mostra ticket médio, itens por pedido e horário de pico, comparando com o período anterior.</p>

<h2>6 jeitos de aumentar o ticket médio</h2>
<ol>
  <li><strong>Order bump ("peça também"):</strong> ao adicionar o lanche, o cardápio sugere batata, bebida ou sobremesa. É a técnica com maior retorno.</li>
  <li><strong>Adicionais pagos bem fotografados:</strong> bacon extra, cheddar, borda recheada. Veja <a href="/blog/tutoriais/como-cadastrar-complementos-e-adicionais-no-cardapio.html">como cadastrar complementos e adicionais</a>.</li>
  <li><strong>Combos com desconto pequeno:</strong> lanche + batata + bebida por menos que a soma — o cliente sobe de 1 para 3 itens.</li>
  <li><strong>Tamanhos:</strong> P, M e G, com o M como "mais pedido" (o famoso efeito isca).</li>
  <li><strong>Pedido mínimo para frete grátis</strong> um pouco acima do ticket atual.</li>
  <li><strong>Cardápio enxuto e com foto:</strong> menos dúvida, mais clique.</li>
</ol>

<h2>Programa de fidelidade que funciona no delivery</h2>
<ul>
  <li><strong>Recompensa alcançável:</strong> se o cliente pede 2 vezes por mês, fidelidade de "20 pedidos" não motiva ninguém. Prefira metas curtas.</li>
  <li><strong>Brinde, não só desconto:</strong> sobremesa ou batata grátis custa pouco no seu <a href="/blog/guias/como-calcular-cmv-restaurante.html">CMV</a> e vale muito na percepção do cliente.</li>
  <li><strong>Cupom de volta:</strong> cupom válido só no próximo pedido, com prazo curto, puxa a recompra.</li>
  <li><strong>Avise pelo WhatsApp:</strong> "faltam 2 pedidos pro seu lanche grátis" — use o <a href="/disparo-whatsapp-para-delivery.html">disparo segmentado</a>.</li>
</ul>
<p>No Menuzia você tem <strong>cupons, programa de fidelidade e order bump</strong> no mesmo cardápio digital, e a base de clientes é sua — no aplicativo, o cliente fiel é fiel à plataforma.</p>

<h2>Fidelidade não funciona se você paga comissão em cada recompra</h2>
<p>No app, o cliente que volta 10 vezes gera 10 comissões. No canal próprio, a recompra sai a custo fixo. Por isso a fidelidade rende mais no <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a> — R$67/mês fixo, venda quanto vender.</p>`,
    faq: [
      ['Como calcular o ticket médio do delivery?', 'Divida o faturamento do período pelo número de pedidos. Exemplo: R$30.000 em 750 pedidos = ticket médio de R$40.'],
      ['O que é order bump?', 'É a sugestão "peça também" que aparece quando o cliente adiciona um item: batata, bebida ou sobremesa com um clique. É uma das formas mais simples de aumentar o ticket médio.'],
      ['Qual o melhor tipo de programa de fidelidade para delivery?', 'O que tem recompensa alcançável em poucos pedidos e é lembrado pelo WhatsApp. Brindes de baixo custo, como sobremesa ou batata, costumam funcionar melhor que descontos grandes.'],
      ['O Menuzia tem cupom e fidelidade?', 'Sim. Cupons, programa de fidelidade e order bump fazem parte do plano de R$67/mês fixo.'],
      ['Dá para ver o ticket médio no sistema?', 'Sim. O relatório mostra ticket médio, itens por pedido, horário de pico e comparação com o período anterior.'],
    ],
  },

  {
    slug: 'cardapio-digital-integrado-ifood.html',
    cat: 'Integração',
    heroImg: 'tut-integracoes.webp',
    heroAlt: 'Tela de integrações do cardápio digital com iFood, 99Food e aiqfome',
    title: 'Cardápio Digital Integrado ao iFood, 99Food e aiqfome | Menuzia',
    h1: 'Cardápio digital integrado ao iFood e 99Food: todos os pedidos num painel só',
    desc: 'Cardápio digital integrado ao iFood, 99Food e aiqfome: pedidos dos marketplaces e do seu link próprio no mesmo painel e na mesma impressora. Use o app como vitrine e o canal próprio sem comissão. R$67/mês.',
    keywords: 'cardápio digital integrado ao ifood, integração ifood, sistema integrado ifood 99food, integração 99food, integração aiqfome, receber pedidos ifood e whatsapp no mesmo lugar, gestor de pedidos ifood, sistema para delivery integrado',
    lt: LT_GESTAO,
    body: `<p>Quem vende em mais de um aplicativo conhece a cena: um tablet para o iFood, outro para o 99Food, o celular apitando com pedido do WhatsApp — e alguém redigitando tudo na comanda da cozinha. Um <strong>cardápio digital integrado ao iFood</strong> junta tudo isso num lugar só.</p>

<h2>O que a integração faz</h2>
<ul>
  <li>Pedidos do <strong>iFood, 99Food e aiqfome</strong> entram no <strong>mesmo painel de pedidos</strong> do seu cardápio digital, do <a href="/sistema-pdv-para-delivery.html">PDV</a> e das <a href="/sistema-de-mesas-e-comandas.html">mesas</a></li>
  <li><strong>Mesma impressora:</strong> todos os pedidos saem na cozinha no mesmo formato</li>
  <li>Uma fila de produção só — a cozinha prepara na ordem real</li>
  <li>Faturamento consolidado para comparar quanto vem de cada canal</li>
</ul>

<h2>A estratégia: app como vitrine, link como canal</h2>
<p>O marketplace é bom para <strong>ser encontrado</strong> por quem ainda não te conhece. O problema é depender dele para tudo: a comissão incide em cada pedido, inclusive na recompra do cliente que já é seu. O caminho que dá mais margem:</p>
<ol>
  <li>Continue no iFood e no 99Food para ganhar cliente novo.</li>
  <li>Coloque um <a href="/blog/guias/qr-code-para-cardapio-digital.html">QR Code na embalagem</a> levando para o seu cardápio próprio, com um cupom de primeira compra.</li>
  <li>Quem pede no seu link entra na sua base e passa a receber <a href="/disparo-whatsapp-para-delivery.html">campanhas no WhatsApp</a>.</li>
  <li>A recompra acontece no canal sem comissão.</li>
</ol>
<p>Comparativo completo em <a href="/cardapio-digital-99food.html">cardápio digital x 99Food</a> e o passo a passo em <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a>.</p>

<h2>Outras integrações</h2>
<ul>
  <li><strong>Mercado Pago:</strong> Pix e cartão online no checkout, direto na sua conta</li>
  <li><strong>Facebook Pixel e API de Conversões (Meta):</strong> saiba quais anúncios geram pedidos (veja <a href="/blog/marketing/como-fazer-anuncios-para-delivery.html">como fazer anúncios para delivery</a>)</li>
  <li><strong>Google Analytics / Tag Manager:</strong> acessos e conversões no GA4</li>
  <li><strong>WhatsApp:</strong> robô, notificações de status e disparos</li>
</ul>

<h2>Quanto custa</h2>
<p><strong>R$67/mês fixo</strong>, com as integrações inclusas e sem comissão sobre os pedidos do seu cardápio. A comissão do marketplace continua sendo cobrada pelo marketplace nos pedidos feitos lá — por isso vale levar a recompra para o canal próprio.</p>`,
    faq: [
      ['O Menuzia integra com o iFood?', 'Sim. Os pedidos do iFood, do 99Food e do aiqfome entram no mesmo painel de pedidos do Menuzia e saem na mesma impressora da cozinha.'],
      ['Preciso sair do iFood para usar o cardápio digital?', 'Não. A recomendação é usar o marketplace como vitrine para cliente novo e o cardápio próprio para a recompra, sem comissão.'],
      ['A integração cobra taxa por pedido?', 'O Menuzia não cobra comissão: são R$67/mês fixos. A comissão dos pedidos feitos dentro do iFood ou do 99Food continua sendo cobrada por eles.'],
      ['Os pedidos do marketplace imprimem automaticamente?', 'Sim. Todos os pedidos, de qualquer canal, saem na mesma impressora no mesmo formato.'],
      ['Integra com Facebook Pixel e Google Analytics?', 'Sim. Há integração com Facebook Pixel, API de Conversões da Meta e Google Analytics/Tag Manager para medir quais anúncios geram pedidos.'],
    ],
  },

  {
    slug: 'agente-de-ia-para-delivery.html',
    cat: 'Agente de IA',
    plano: 'modulo',
    heroImg: 'tut-whatsapp.webp',
    heroAlt: 'Atendimento de delivery no WhatsApp feito por agente de inteligência artificial',
    title: 'Agente de IA para Delivery: Atendente no WhatsApp 24h | Menuzia',
    h1: 'Agente de IA para delivery: um atendente no WhatsApp que conversa e fecha o pedido',
    desc: 'Agente de IA para delivery: conversa no WhatsApp, entende texto e áudio, consulta seu cardápio real, calcula a taxa e fecha o pedido sozinho.',
    keywords: 'agente de ia para delivery, agente de ia para restaurante, atendimento com ia no whatsapp, inteligência artificial para restaurante, atendente virtual delivery, ia para delivery, chatbot com ia para restaurante, ia que anota pedido',
    lt: LT_DORES,
    body: `<p>Sexta, 20h: a chapa está cheia, o WhatsApp não para e cada minuto sem resposta é um cliente indo pedir em outro lugar. Um <strong>agente de IA para delivery</strong> assume essa conversa: lê o que o cliente escreveu, entende o que ele quer e conduz o pedido até o fim, como um bom atendente faria.</p>

<h2>Robô de menu x agente de IA</h2>
<p>O robô tradicional funciona por opções: "digite 1 para cardápio". O <strong>Agente de IA do Menuzia</strong> entende frases soltas, como "me vê dois x-bacon sem cebola e uma coca", e segue a conversa de onde ela parou. Os dois trabalham juntos no mesmo número: o robô cuida do automático e a IA entra na conversa livre.</p>

<h2>O que o agente faz no WhatsApp</h2>
<ul>
  <li><strong>Tira dúvidas do cardápio</strong> consultando os itens e preços reais da sua loja</li>
  <li><strong>Anota o pedido pela conversa</strong>, com complementos, adicionais e observações</li>
  <li><strong>Calcula a taxa de entrega</strong> pelo sistema, sem conta de cabeça</li>
  <li><strong>Oferece o "peça também"</strong> uma vez, depois que o cliente diz que é só isso</li>
  <li><strong>Entende áudio:</strong> a mensagem de voz do cliente é transcrita e tratada como texto</li>
  <li><strong>Envia o Pix copia e cola</strong> na hora, quando essa é a forma de pagamento</li>
  <li><strong>Informa o status</strong> de um pedido já feito</li>
</ul>

<h2>A IA não pode inventar preço</h2>
<p>Esse é o medo de todo dono, e com razão. Por isso o agente segue regras fixas:</p>
<ul>
  <li>Só cita item e preço que vieram do seu cardápio naquele momento.</li>
  <li>Total e taxa vêm do sistema, nunca de um cálculo da IA.</li>
  <li>Não dá desconto, não promete brinde e não faz exceção.</li>
  <li>Se perguntarem, diz que é o atendente virtual da loja.</li>
  <li>Sem a informação, chama uma pessoa da loja em vez de chutar.</li>
</ul>

<h2>Você ensina, ele aprende as regras da casa</h2>
<p>Estacionamento, aceita vale-refeição, tem opção sem glúten: você cadastra as respostas no <strong>Conhecimento da loja</strong> e o agente passa a usá-las, mesmo que o cliente pergunte de outro jeito.</p>

<h2>Quando o humano entra</h2>
<p>Reclamação séria, pedido fora do comum ou cliente que quer falar com alguém: o agente chama sua equipe e avisa o cliente. Mudanças em pedido já feito ficam registradas para a loja confirmar quando for o caso.</p>

<h2>Como contratar</h2>
<p>O Agente de IA é um módulo do Menuzia, liberado pela nossa equipe na sua loja, sem comissão sobre os pedidos. Fale com a gente para ver as condições. Quer entender o fluxo completo? Veja <a href="/tirar-pedidos-pelo-whatsapp.html">como tirar pedidos pelo WhatsApp</a>.</p>`,
    faq: [
      ['A IA do Menuzia inventa preço ou item?', 'Não. O agente só cita itens e preços devolvidos pelo seu cardápio naquele momento, e o total e a taxa são calculados pelo sistema.'],
      ['O agente de IA entende áudio do cliente?', 'Sim. Com o Agente de IA ligado, o áudio recebido no WhatsApp é transcrito e a conversa segue normalmente.'],
      ['O cliente sabe que está falando com uma IA?', 'Se perguntar, sim. A regra do agente é dizer que é o atendente virtual da loja e nunca fingir ser uma pessoa.'],
      ['E se a IA não souber responder?', 'Ela chama uma pessoa da loja e avisa o cliente que alguém vai confirmar a informação, sem chutar a resposta.'],
      ['O agente de IA cobra comissão por pedido?', 'Não. O Menuzia não cobra comissão por pedido. O Agente de IA é um módulo liberado pela nossa equipe; fale com a gente para ver as condições.'],
    ],
  },

  {
    slug: 'tirar-pedidos-pelo-whatsapp.html',
    cat: 'Pedidos no WhatsApp',
    plano: 'modulo',
    heroImg: 'blog-whatsapp.webp',
    heroAlt: 'Cliente fazendo pedido de delivery pela conversa do WhatsApp',
    title: 'Como Tirar Pedidos pelo WhatsApp Automaticamente | Menuzia',
    h1: 'Como tirar pedidos pelo WhatsApp: sem digitar, sem esquecer item, sem perder cliente',
    desc: 'Tirar pedidos pelo WhatsApp na mão gera erro e fila. Veja como automatizar pela conversa ou pelo link, com taxa e pagamento, sem redigitar.',
    keywords: 'tirar pedidos pelo whatsapp, como tirar pedidos pelo whatsapp, automatizar pedidos whatsapp, receber pedidos pelo whatsapp, robô que tira pedido no whatsapp, anotar pedido whatsapp automático, pedido whatsapp delivery',
    lt: LT_DORES,
    body: `<p>Tirar pedido pelo WhatsApp parece simples até o movimento subir. Uma pessoa responde cinco conversas ao mesmo tempo, pergunta o bairro, soma a taxa de cabeça, copia tudo para a comanda e, no meio disso, alguém fica sem resposta. O problema não é o WhatsApp: é fazer <strong>à mão</strong> um trabalho repetitivo.</p>

<h2>O que trava o pedido feito à mão</h2>
<ul>
  <li><strong>Pergunta repetida:</strong> "tem o quê?", "quanto é a entrega?", "aceita cartão?"</li>
  <li><strong>Pedido picado</strong> em várias mensagens, fácil de perder um item</li>
  <li><strong>Redigitação</strong> no caixa e na cozinha</li>
  <li><strong>Espera:</strong> no pico, a resposta atrasa e o cliente vai para outro lugar</li>
</ul>

<h2>Os 3 jeitos de automatizar</h2>
<h3>1. Pelo link do cardápio</h3>
<p>O cliente recebe o link, monta o pedido com fotos e adicionais, e tudo chega pronto no painel. É o caminho do <a href="/cardapio-digital-para-whatsapp.html">cardápio digital para WhatsApp</a>.</p>
<h3>2. Com robô de atendimento</h3>
<p>O robô responde na hora, manda o link e cuida das mensagens automáticas. Bom para quem já tem cliente acostumado a pedir pelo cardápio.</p>
<h3>3. Com agente de IA, pela própria conversa</h3>
<p>Muita gente prefere escrever ou mandar áudio. O <a href="/agente-de-ia-para-delivery.html">Agente de IA</a> anota o pedido ali mesmo, sem o cliente abrir nada.</p>

<h2>Como fica o pedido pela conversa</h2>
<ol>
  <li>O cliente diz o que quer, por texto ou áudio.</li>
  <li>O sistema confere no cardápio e pergunta uma coisa por vez: complementos, adicionais, "mais alguma coisa?".</li>
  <li>Pergunta se é entrega ou retirada, pega o endereço e mostra taxa e tempo.</li>
  <li>Registra pagamento e troco, e manda o resumo com o total.</li>
  <li>O cliente confirma e o pedido entra no painel com número, sem ninguém redigitar.</li>
</ol>

<h2>Depois do "pode mandar"</h2>
<p>O pedido segue para a cozinha e o cliente recebe os avisos de <a href="/status-do-pedido-no-whatsapp.html">status no WhatsApp</a>. Se pagar por Pix, recebe o copia e cola na hora; veja <a href="/pagamento-online-para-delivery.html">pagamento online para delivery</a>.</p>

<h2>Dica para começar</h2>
<p>Antes de automatizar, deixe nome, preço, adicionais e taxa por bairro corretos: a automação repete o que está cadastrado. Veja <a href="/blog/tutoriais/como-configurar-whatsapp-business-para-delivery.html">como configurar o WhatsApp Business</a> e <a href="/blog/tutoriais/como-configurar-taxa-de-entrega-por-bairro.html">a taxa de entrega por bairro</a>.</p>`,
    faq: [
      ['Dá para receber pedido pelo WhatsApp sem digitar nada?', 'Sim. Com o cardápio digital, o pedido chega pronto. Com o Agente de IA, a própria conversa vira pedido no painel, sem redigitação.'],
      ['O cliente precisa baixar aplicativo?', 'Não. Ele pede pelo WhatsApp que já usa ou pelo link do cardápio, que abre no navegador.'],
      ['Dá para pedir por áudio no WhatsApp?', 'Sim, com o Agente de IA ligado. O áudio é transcrito e a conversa continua normalmente.'],
      ['E se o cliente mudar o pedido no meio da conversa?', 'Antes de confirmar, a alteração atualiza o resumo. Depois de confirmado, a solicitação fica registrada para a loja quando for preciso aprovar.'],
      ['Qual a diferença entre o robô e o Agente de IA?', 'O robô segue fluxos automáticos e manda o link do cardápio. O Agente de IA entende frases livres e anota o pedido pela conversa.'],
    ],
  },

  {
    slug: 'status-do-pedido-no-whatsapp.html',
    cat: 'Status do pedido',
    plano: 'completo',
    heroImg: 'tut-painel.webp',
    heroAlt: 'Painel de pedidos que dispara aviso de status no WhatsApp do cliente',
    title: 'Status do Pedido no WhatsApp Automático para Delivery | Menuzia',
    h1: 'Status do pedido no WhatsApp: acabe com o "cadê meu pedido?"',
    desc: 'Avisos automáticos de status do pedido no WhatsApp: recebido, aceito, pronto, saiu para entrega e entregue. Menos cobrança no chat.',
    keywords: 'status do pedido whatsapp, notificação de pedido whatsapp, cadê meu pedido delivery, aviso automático pedido delivery, acompanhar pedido delivery whatsapp, mensagem automática delivery, cliente reclamando demora delivery',
    lt: LT_DORES,
    body: `<p>"Moço, cadê meu pedido?" Essa mensagem chega na pior hora, tira alguém da produção e quase sempre tem a mesma resposta: "já está saindo". Quase ninguém cobra por maldade. O cliente pergunta porque <strong>não sabe o que está acontecendo</strong>. Quando o <strong>status do pedido chega no WhatsApp</strong> sozinho, boa parte dessa cobrança deixa de existir.</p>

<h2>Quais avisos o cliente recebe</h2>
<ul>
  <li><strong>Pedido recebido:</strong> assim que entra na loja</li>
  <li><strong>Pedido aceito:</strong> com resumo de itens, total e pagamento</li>
  <li><strong>Pronto:</strong> para retirada, ou pronto e aguardando a saída</li>
  <li><strong>Saiu para entrega:</strong> quando o entregador sai</li>
  <li><strong>Entregue:</strong> fecha o ciclo</li>
  <li><strong>Pedido agendado e pedido alterado:</strong> para os casos fora do fluxo normal</li>
</ul>

<h2>Sem trabalho a mais para a equipe</h2>
<p>Ninguém digita nada. Quando o pedido muda de coluna no painel, o aviso sai. Quem já move o pedido para acompanhar a produção passa a informar o cliente sem nenhum clique extra.</p>

<h2>Do seu jeito</h2>
<p>Dá para trocar o texto das etapas, desligar uma etapa ou desligar os avisos para um tipo de pedido (entrega, retirada ou consumo no local). Quem quer poucos avisos deixa só o essencial; quem tem marca informal escreve com a própria voz.</p>

<h2>Por que isso vende mais</h2>
<ul>
  <li><strong>Menos interrupção</strong> no pico: quem responde cobrança não está produzindo.</li>
  <li><strong>Espera mais tranquila:</strong> saber que o pedido saiu muda a percepção do tempo.</li>
  <li><strong>Confiança na primeira compra:</strong> principalmente de quem veio do aplicativo.</li>
  <li><strong>Marca presente:</strong> cada aviso leva o nome da loja para o WhatsApp do cliente.</li>
</ul>

<h2>Se o problema é o atraso, não o aviso</h2>
<p>Aviso informa, mas não acelera. Se o pedido atrasa de verdade, olhe a produção com a <a href="/tela-de-cozinha-kds.html">tela de cozinha</a>, a <a href="/rota-de-motoboy-para-delivery.html">rota de motoboy</a> e o guia de <a href="/blog/tutoriais/como-organizar-cozinha-de-delivery.html">organização da cozinha</a>.</p>

<h2>Quanto custa</h2>
<p>O robô de atendimento no WhatsApp faz parte do <strong>plano Completo, R$149/mês</strong>, sem comissão por pedido e sem fidelidade.</p>`,
    faq: [
      ['Quais status o cliente recebe no WhatsApp?', 'Recebido, aceito com resumo, pronto, saiu para entrega e entregue, além de avisos de pedido agendado e pedido alterado.'],
      ['Preciso enviar as mensagens manualmente?', 'Não. Elas saem automaticamente quando o pedido muda de etapa no painel.'],
      ['Posso mudar o texto das mensagens?', 'Sim, nas etapas personalizáveis. Também dá para desligar uma etapa ou um tipo de pedido.'],
      ['Funciona para retirada no balcão?', 'Sim. Há avisos separados para entrega, retirada e consumo no local.'],
      ['O cliente precisa instalar algo?', 'Não. Ele recebe os avisos no WhatsApp que já usa.'],
    ],
  },

  {
    slug: 'pedido-errado-no-delivery.html',
    cat: 'Pedido errado',
    plano: 'basico',
    heroImg: 'tut-impressora.webp',
    heroAlt: 'Comanda impressa automaticamente para evitar pedido errado no delivery',
    title: 'Pedido Errado no Delivery: Como Evitar e Parar de Refazer | Menuzia',
    h1: 'Pedido errado no delivery: como eliminar a causa e parar de pagar duas vezes',
    desc: 'Pedido errado custa o lanche refeito, a segunda corrida e o cliente. Veja de onde vêm os erros e como evitar com pedido estruturado e conferência.',
    keywords: 'pedido errado delivery, como evitar erro de pedido, erro de pedido no delivery, pedido trocado delivery, reduzir erros na cozinha delivery, comanda automática delivery, impressão automática de pedidos',
    lt: LT_DORES,
    body: `<p>Um <strong>pedido errado no delivery</strong> sai caro três vezes: você refaz o produto, paga outra corrida e ainda arrisca perder o cliente. E a causa raramente é falta de atenção da equipe: é o caminho que a informação percorre até a cozinha.</p>

<h2>A conta de um erro</h2>
<p>Exemplo: lanche de R$35 com custo de R$12, mais R$8 de nova entrega. Refazer custa R$20 e consome o lucro de outro pedido. Com 3 erros por dia, são cerca de R$1.800 por mês, sem contar o cliente que não volta. Faça a conta com os seus números: calcule o custo real de cada item pelo <a href="/blog/guias/como-calcular-cmv-restaurante.html">CMV</a>.</p>

<h2>De onde vêm os erros</h2>
<ol>
  <li><strong>Pedido em texto livre:</strong> "sem cebola" no meio de oito mensagens.</li>
  <li><strong>Redigitação:</strong> cada cópia é uma nova chance de errar.</li>
  <li><strong>Comanda à mão:</strong> letra ruim, abreviação que só uma pessoa entende.</li>
  <li><strong>Vários canais:</strong> tablet de um app, celular de outro, papel no meio.</li>
  <li><strong>Saída sem conferência:</strong> sacola trocada na hora do pico.</li>
</ol>

<h2>Como eliminar cada causa</h2>
<ul>
  <li><strong>Pedido estruturado:</strong> tamanho, sabor e adicionais viram opções, não texto. O <a href="/blog/tutoriais/como-cadastrar-complementos-e-adicionais-no-cardapio.html">cadastro de complementos</a> é onde isso começa.</li>
  <li><strong>Campo de observação:</strong> "sem cebola" fica ligado ao item certo.</li>
  <li><strong>Impressão automática:</strong> o pedido sai na cozinha sem ninguém redigitar. Veja <a href="/blog/tutoriais/como-configurar-impressora-termica-para-delivery.html">como configurar a impressora térmica</a>.</li>
  <li><strong>Um painel para todos os canais:</strong> link próprio, <a href="/cardapio-digital-integrado-ifood.html">iFood, 99Food e aiqfome</a> no mesmo fluxo.</li>
  <li><strong>Tela de cozinha:</strong> com <a href="/tela-de-cozinha-kds.html">KDS</a>, cada pedido passa por fila, preparo e pronto.</li>
</ul>

<h2>Rotina de conferência em 15 segundos</h2>
<ol>
  <li>Compare número do pedido e nome na comanda e na sacola.</li>
  <li>Confira quantidade de itens e bebidas.</li>
  <li>Leia as observações em voz alta.</li>
  <li>Grampeie a comanda na sacola antes de entregar ao motoboy.</li>
</ol>

<h2>Errou mesmo assim?</h2>
<p>Responda rápido, peça desculpas e resolva sem discussão. Depois anote a causa: erro que se repete é falha de processo, e não de pessoa.</p>

<h2>Quanto custa</h2>
<p>Cardápio, painel, impressão automática e KDS estão no <strong>plano Básico, R$97/mês</strong>, sem comissão por pedido.</p>`,
    faq: [
      ['Qual a principal causa de pedido errado no delivery?', 'Em geral, a informação passada à mão: pedido em texto solto, redigitação e comanda manuscrita. Tornar o pedido estruturado elimina boa parte dos erros.'],
      ['Como evitar sacola trocada?', 'Conferindo número do pedido, nome, quantidade e observações antes de entregar ao motoboy, com a comanda presa à sacola.'],
      ['Impressão automática reduz erros?', 'Sim, porque tira a etapa de redigitar. O pedido sai igual ao que o cliente escolheu.'],
      ['Pedidos do iFood saem na mesma impressora?', 'Sim. Pedidos de iFood, 99Food e aiqfome entram no mesmo painel e na mesma impressora.'],
      ['O erro do cliente ao pedir também é evitado?', 'Opções obrigatórias e o resumo antes de confirmar reduzem esse tipo de erro, mas a conferência final continua importante.'],
    ],
  },

  {
    slug: 'tela-de-cozinha-kds.html',
    cat: 'KDS',
    plano: 'basico',
    heroImg: 'tut-cardapio.webp',
    heroAlt: 'Sistema de pedidos usado para organizar a produção da cozinha do restaurante',
    title: 'Tela de Cozinha KDS para Restaurante e Delivery | Menuzia',
    h1: 'Tela de cozinha KDS: pare de perder a ordem dos pedidos no pico',
    desc: 'Tela de cozinha KDS para restaurante e delivery: fila, preparo e prontos em tempo real, cronômetro por cor e filtro por setor.',
    keywords: 'tela de cozinha, kds para restaurante, kitchen display system, sistema kds, tela de pedidos cozinha, monitor de cozinha restaurante, kds delivery, organizar pedidos na cozinha, pedido atrasado cozinha',
    lt: LT_DORES,
    body: `<p>Comandas penduradas, uma caindo atrás da chapa e ninguém sabe qual pedido é o mais antigo. No pico, a cozinha perde a ordem, e é assim que o pedido das 20h sai depois do das 20h15. A <strong>tela de cozinha KDS</strong> troca o papel por uma fila visível, que todo mundo enxerga igual.</p>
<p>Quer entender o conceito antes? Leia <a href="/blog/tutoriais/o-que-e-kds-tela-de-cozinha.html">o que é KDS</a>. Esta página mostra como ele funciona no Menuzia.</p>

<h2>Como funciona</h2>
<ol>
  <li>A loja aceita o pedido no painel e ele aparece em <strong>Na fila</strong>.</li>
  <li>A cozinha toca em <strong>Começar preparo</strong>.</li>
  <li>Ao terminar, toca em <strong>Pronto</strong>, e o pedido fica disponível para despacho.</li>
  <li>Tocou errado? <strong>Voltar</strong> desfaz o engano.</li>
</ol>

<h2>O atraso aparece antes da reclamação</h2>
<p>Cada pedido tem um <strong>cronômetro por cor</strong>: verde, amarelo e vermelho, com limites padrão de 10 e 20 minutos que você pode ajustar conforme o seu preparo. Quem olha a tela sabe na hora o que priorizar.</p>

<h2>Feito para cozinha de verdade</h2>
<ul>
  <li><strong>Filtro por setor:</strong> chapa vê a chapa, bar vê o bar (setores vêm das categorias do cardápio)</li>
  <li><strong>Riscar itens</strong> conforme ficam prontos</li>
  <li><strong>Modo escuro e fonte grande</strong> para ler de longe</li>
  <li><strong>Tempo real:</strong> usa os mesmos eventos do painel de pedidos</li>
</ul>

<h2>Todos os canais na mesma fila</h2>
<p>O pedido do link próprio, do salão e dos <a href="/cardapio-digital-integrado-ifood.html">marketplaces integrados</a> entra no mesmo fluxo. A cozinha prepara na ordem real, e não na ordem de qual aparelho apitou primeiro.</p>

<h2>Preciso abandonar a impressora?</h2>
<p>Não. Muitas operações usam os dois: KDS na produção e comanda para conferir e prender na sacola. Comece pelo que resolve o seu gargalo; a <a href="/blog/tutoriais/melhor-impressora-termica-para-delivery.html">impressora térmica</a> continua útil.</p>

<h2>Menos erro, cliente mais calmo</h2>
<p>O KDS ataca a ordem de produção. Para o restante, veja <a href="/pedido-errado-no-delivery.html">como evitar pedido errado</a> e <a href="/status-do-pedido-no-whatsapp.html">avisos de status no WhatsApp</a>.</p>

<h2>Quanto custa</h2>
<p>O KDS está no <strong>plano Básico, R$97/mês</strong>, sem comissão por pedido. Basta uma tela com navegador na cozinha.</p>`,
    faq: [
      ['O que é KDS?', 'KDS é a sigla de Kitchen Display System: uma tela que mostra os pedidos na cozinha, no lugar da comanda de papel.'],
      ['Que equipamento preciso para o KDS?', 'Uma tela com navegador na cozinha, como um tablet ou monitor com computador.'],
      ['Dá para separar por setor?', 'Sim. O filtro por setor usa as categorias do cardápio, então cada estação vê o que é seu.'],
      ['Posso mudar o tempo de alerta?', 'Sim. O padrão é amarelo a partir de 10 minutos e vermelho depois de 20, e você pode ajustar.'],
      ['Posso usar KDS e impressora juntos?', 'Sim. A impressão automática continua disponível e muitas lojas usam os dois.'],
    ],
  },

  {
    slug: 'alternativa-ao-ifood.html',
    cat: 'Alternativa ao iFood',
    plano: 'basico',
    heroImg: 'blog-delivery-ifood.webp',
    heroAlt: 'Dono de restaurante comparando marketplace com canal próprio de delivery',
    title: 'Alternativa ao iFood: Venda Direto sem Comissão | Menuzia',
    h1: 'Alternativa ao iFood: como vender direto e pagar menos sem sumir do mapa',
    desc: 'Procurando alternativa ao iFood? Compare marketplaces, WhatsApp e canal próprio sem comissão e veja como migrar a recompra sem perder pedidos.',
    keywords: 'alternativa ao ifood, alternativas ao ifood, opção ao ifood para restaurante, sair do ifood, taxa do ifood alta, comissão ifood restaurante, concorrente do ifood, delivery sem ifood, vender sem ifood',
    lt: LT_DORES,
    body: `<p>Quem busca <strong>alternativa ao iFood</strong> normalmente não quer abandonar o aplicativo no susto: quer parar de pagar comissão sobre o cliente que já é seu. Essa diferença muda a estratégia. O iFood traz demanda; o erro é depender dele para tudo.</p>

<h2>Quanto a comissão pesa</h2>
<p>Guias e reportagens de 2026 citam 12% de comissão no plano em que a loja entrega e 23% quando o iFood entrega, mais cerca de 3,2% sobre pagamentos online e mensalidade acima de certo faturamento. Os valores mudam: confira os seus no contrato e no app.</p>
<p>Com essas taxas, R$30.000 por mês em pedidos pagam R$3.600 a R$6.900 só de comissão, antes da taxa de pagamento. Veja mais contas em <a href="/cardapio-digital-sem-comissao.html">cardápio digital sem comissão</a>.</p>

<h2>Quais são as alternativas</h2>
<ul>
  <li><strong>Outros marketplaces:</strong> 99Food, aiqfome e outros. Ampliam alcance, mas o modelo segue sendo plataforma; verifique condições atuais e cobertura na sua cidade. Veja o <a href="/cardapio-digital-99food.html">comparativo com 99Food</a>.</li>
  <li><strong>WhatsApp manual:</strong> sem comissão, mas limitado pela sua capacidade de responder.</li>
  <li><strong>Canal próprio:</strong> cardápio digital com link seu, preço fixo e base de clientes sua.</li>
  <li><strong>Todos juntos:</strong> o caminho que costuma dar mais margem.</li>
</ul>

<h2>Comparação rápida</h2>
<ul>
  <li><strong>Encontrar cliente novo:</strong> marketplace ganha. No canal próprio, você leva o tráfego.</li>
  <li><strong>Custo da recompra:</strong> canal próprio ganha, com custo fixo.</li>
  <li><strong>Dados do cliente:</strong> canal próprio ganha, porque a lista fica com você.</li>
  <li><strong>Sua marca:</strong> canal próprio ganha, sem concorrente ao lado.</li>
</ul>

<h2>O caminho sem perder faturamento</h2>
<ol>
  <li>Continue no marketplace como vitrine.</li>
  <li>Monte o canal próprio e conecte os marketplaces ao <a href="/cardapio-digital-integrado-ifood.html">mesmo painel</a>.</li>
  <li>Divulgue o link fora do app: bio, Google, status e cartão na loja, respeitando as regras do contrato de cada plataforma.</li>
  <li>Dê um motivo para pedir direto, como cupom ou <a href="/cashback-para-delivery.html">cashback</a>.</li>
  <li>Reative a base com <a href="/disparo-whatsapp-para-delivery.html">campanhas no WhatsApp</a>.</li>
</ol>
<p>Passo a passo completo em <a href="/blog/estrategia/como-sair-do-ifood-e-vender-direto.html">como sair do iFood e vender direto</a>.</p>

<h2>O que muda com o Menuzia</h2>
<p>Cardápio próprio, PDV, mesas, impressão e integrações por <strong>R$97/mês no Básico</strong>, sem comissão. No <strong>Completo, R$149/mês</strong>, entram robô no WhatsApp, disparos e sistema financeiro.</p>`,
    faq: [
      ['Qual a melhor alternativa ao iFood?', 'Para a maioria das lojas, é manter o marketplace para ganhar clientes novos e usar um canal próprio sem comissão para a recompra.'],
      ['Preciso sair do iFood para usar o Menuzia?', 'Não. Os pedidos do iFood, do 99Food e do aiqfome entram no mesmo painel do seu cardápio próprio.'],
      ['Quanto o iFood cobra de comissão?', 'Fontes de 2026 citam 12% quando a loja entrega e 23% quando o iFood entrega, além de taxa de pagamento online. Confira os valores do seu contrato no app.'],
      ['O canal próprio traz cliente sozinho?', 'Não. Você precisa divulgar por redes sociais, Google, WhatsApp e anúncios. A vantagem é que o cliente conquistado fica com você.'],
      ['O Menuzia cobra comissão?', 'Não. O valor é fixo: R$97/mês no Básico ou R$149/mês no Completo, sem fidelidade.'],
    ],
  },

  {
    slug: 'pagamento-online-para-delivery.html',
    cat: 'Pagamento online',
    plano: 'basico',
    heroImg: 'blog-precos.webp',
    heroAlt: 'Pagamento online por Pix e cartão em pedido de delivery',
    title: 'Pagamento Online para Delivery: Pix e Cartão no Pedido | Menuzia',
    h1: 'Pagamento online para delivery: Pix confirmado no pedido, sem conferir comprovante',
    desc: 'Pagamento online para delivery com Pix e cartão via Mercado Pago. Confirmação automática no pedido, sem comprovante falso e sem conferir print.',
    keywords: 'pagamento online para delivery, pix automático delivery, pix no cardápio digital, golpe do comprovante pix delivery, comprovante falso pix, cartão online delivery, pagamento no cardápio digital, mercado pago delivery',
    lt: LT_DORES,
    body: `<p>O cliente manda um print, a equipe está na correria e o pedido sai. Horas depois, o dinheiro não está na conta. Conferir comprovante à mão é lento e abre espaço para <strong>comprovante falso</strong>. Com <strong>pagamento online no delivery</strong>, quem confirma é o sistema, e não um olhar apressado em um print.</p>

<h2>Os problemas do pagamento manual</h2>
<ul>
  <li><strong>Comprovante falso ou editado</strong> no WhatsApp</li>
  <li><strong>Pix sem identificação:</strong> valor na conta sem saber de qual pedido é</li>
  <li><strong>Troco e dinheiro</strong> circulando com o motoboy</li>
  <li><strong>Conferência no fechamento</strong> que toma tempo</li>
</ul>

<h2>Como funciona no Menuzia</h2>
<ol>
  <li>Você conecta a sua conta do <strong>Mercado Pago</strong>.</li>
  <li>O cliente escolhe Pix ou cartão ao fechar o pedido.</li>
  <li>No Pix, recebe o código copia e cola.</li>
  <li>O Mercado Pago avisa o sistema, que <strong>consulta o pagamento direto na API</strong> antes de confirmar.</li>
  <li>O pedido aparece como pago no painel.</li>
</ol>
<p>A confirmação é registrada uma única vez, mesmo que o aviso chegue repetido, e o sistema verifica periodicamente pagamentos pendentes.</p>

<h2>O dinheiro é seu desde o início</h2>
<p>O pagamento cai na <strong>sua conta do Mercado Pago</strong>. O Menuzia não fica com percentual do pedido. As tarifas do Mercado Pago seguem as condições da sua conta.</p>

<h2>Também funciona pelo WhatsApp</h2>
<p>Quem pede pelo <a href="/agente-de-ia-para-delivery.html">Agente de IA</a> recebe o Pix copia e cola na própria conversa. Assim, o <a href="/tirar-pedidos-pelo-whatsapp.html">pedido pelo WhatsApp</a> já sai pago.</p>

<h2>Dinheiro e maquininha continuam</h2>
<p>Parte dos clientes vai continuar pagando na entrega. O sistema mostra forma de pagamento e troco, e você define quais formas aceita em cada canal. O acerto com entregadores está em <a href="/rota-de-motoboy-para-delivery.html">rota de motoboy</a> e o fechamento, em <a href="/controle-de-caixa-para-restaurante.html">controle de caixa</a>.</p>

<h2>Cuidados com Pix sem integração</h2>
<p>Se ainda recebe por chave Pix, confira no extrato do banco, e não no print, antes de liberar o pedido. Mais dicas em <a href="/blog/tutoriais/como-receber-pix-no-delivery.html">como receber Pix com segurança</a>.</p>

<h2>Quanto custa</h2>
<p>Pix e cartão online estão no <strong>plano Básico, R$97/mês</strong>, sem comissão por pedido.</p>`,
    faq: [
      ['O Pix é confirmado automaticamente?', 'Sim. Com o Pix online via Mercado Pago, o sistema consulta o pagamento e confirma o pedido sem conferência de comprovante.'],
      ['Isso acaba com o golpe do comprovante falso?', 'No Pix online, a confirmação vem do Mercado Pago, e não de um print. Em pagamentos fora do sistema, continue conferindo no extrato.'],
      ['O dinheiro passa pelo Menuzia?', 'O pagamento vai para a sua conta do Mercado Pago. O Menuzia não cobra percentual sobre o pedido.'],
      ['Preciso de conta no Mercado Pago?', 'Sim. O pagamento online usa a sua conta do Mercado Pago, que é conectada ao sistema.'],
      ['Ainda posso aceitar dinheiro e cartão na entrega?', 'Sim. Você define quais formas de pagamento aceita em cada canal.'],
    ],
  },

  {
    slug: 'ficha-tecnica-e-precificacao.html',
    cat: 'Precificação',
    plano: 'completo',
    heroImg: 'blog-hero.webp',
    heroAlt: 'Dono de restaurante calculando ficha técnica e preço de venda',
    title: 'Ficha Técnica e Precificação para Restaurante e Delivery | Menuzia',
    h1: 'Ficha técnica e precificação: descubra quanto você lucra em cada produto',
    desc: 'Vende muito e não sobra dinheiro? Monte a ficha técnica, calcule custo, margem e preço sugerido por produto. O custo acompanha o preço dos insumos, sem planilha.',
    keywords: 'ficha técnica restaurante, precificação de cardápio, sistema de ficha técnica, como precificar lanche, calcular preço de venda restaurante, lucro por produto delivery, controle de insumos restaurante, planilha ficha técnica',
    lt: LT_DORES,
    body: `<p>"Vendo muito e não sobra dinheiro." Em muitos casos, o problema está aqui: o preço foi definido olhando o concorrente, e não o custo. Sem <strong>ficha técnica</strong>, um produto campeão de vendas pode estar pagando quase nada. Quando pão, carne e embalagem sobem, a margem some sem ninguém perceber.</p>

<h2>O que é ficha técnica</h2>
<p>É a receita com números: cada ingrediente, quantidade usada e custo. Somando tudo, você tem o <strong>custo real por produto</strong>, que é a base para definir preço e calcular o <a href="/blog/guias/como-calcular-cmv-restaurante.html">CMV</a>.</p>

<h2>Como calcular em 4 passos</h2>
<ol>
  <li><strong>Liste os itens:</strong> inclua molho, guardanapo e embalagem.</li>
  <li><strong>Calcule o custo de cada um:</strong> R$50 por kg, usando 150 g, dá R$7,50.</li>
  <li><strong>Some o custo total</strong> do produto.</li>
  <li><strong>Defina o preço</strong> pela margem desejada, considerando taxas de cartão e canal.</li>
</ol>

<h3>Exemplo</h3>
<p>Se um lanche custa R$14 e é vendido a R$35, a margem bruta é de R$21 (60%). Antes de chamar isso de lucro, ainda faltam taxa de pagamento, comissão de marketplace, mão de obra e custos fixos.</p>

<h2>Por que a planilha falha</h2>
<ul>
  <li>Fica desatualizada na primeira alta de preço.</li>
  <li>Exige atualizar produto por produto.</li>
  <li>Fica separada das vendas do dia a dia.</li>
</ul>

<h2>Como funciona no Menuzia</h2>
<ul>
  <li><strong>Cadastro de insumos</strong> com preço, unidade de compra e conversão</li>
  <li><strong>Ficha técnica por produto</strong>, com custo calculado a partir dos insumos</li>
  <li><strong>Margem e preço sugerido</strong>, com opção de arredondamento</li>
  <li><strong>Recálculo:</strong> mudou o insumo, o custo das fichas acompanha</li>
  <li><strong>Você decide:</strong> o preço de venda nunca muda sozinho</li>
</ul>

<h2>Lucro é mais que preço</h2>
<p>Precificação boa se junta com <a href="/controle-de-caixa-para-restaurante.html">controle de caixa</a>, ticket médio e redução de <a href="/cardapio-digital-sem-comissao.html">comissões</a>. Uma pequena mudança no produto mais vendido costuma pesar mais que ajustar dezenas de itens pouco pedidos.</p>

<h2>Quanto custa</h2>
<p>Insumos, ficha técnica e lucro real estão no sistema financeiro do <strong>plano Completo, R$149/mês</strong>, sem comissão por pedido.</p>`,
    faq: [
      ['O que precisa ter em uma ficha técnica?', 'Ingredientes, quantidade usada, custo de cada item, embalagem e rendimento da receita.'],
      ['Como calcular o preço de venda?', 'Parta do custo da ficha técnica e aplique a margem desejada, considerando taxas de pagamento, comissões e custos da operação.'],
      ['Quando atualizar a ficha técnica?', 'Sempre que um insumo mudar de preço ou a receita mudar. No Menuzia, o custo acompanha o preço do insumo cadastrado.'],
      ['O sistema muda meu preço automaticamente?', 'Não. Ele mostra custo, margem e preço sugerido, mas quem decide é você.'],
      ['Qual a diferença entre ficha técnica e CMV?', 'A ficha técnica mostra o custo de um produto. O CMV mostra o custo das mercadorias vendidas em relação ao faturamento do período.'],
    ],
  },

  {
    slug: 'crm-para-restaurante.html',
    cat: 'CRM',
    plano: 'basico',
    heroImg: 'tut-campanhas.webp',
    heroAlt: 'Base de clientes do restaurante organizada para campanhas no WhatsApp',
    title: 'CRM para Restaurante e Delivery: Sua Base de Clientes | Menuzia',
    h1: 'CRM para restaurante: saiba quem compra de você e traga o cliente de volta',
    desc: 'Não sabe quem são seus clientes? Tenha nome, telefone e histórico de compras em uma base sua, importe e exporte planilhas e use os dados em campanhas e fidelidade.',
    keywords: 'crm para restaurante, crm para delivery, cadastro de clientes restaurante, base de clientes delivery, gestão de clientes restaurante, histórico de compras cliente, como recuperar clientes delivery, clientes que sumiram',
    lt: LT_DORES,
    body: `<p>Se o seu principal canal fosse fechar amanhã, para quantos clientes você conseguiria mandar uma mensagem? Muita loja vende há anos e não tem resposta, porque a relação ficou no aplicativo ou em conversas perdidas no celular. Um <strong>CRM para restaurante</strong> é a memória do negócio: quem comprou, o quê e quando.</p>

<h2>O custo de não conhecer o cliente</h2>
<ul>
  <li>Você só nota que um cliente sumiu quando o movimento já caiu.</li>
  <li>Promoção vai para todo mundo, ou para ninguém.</li>
  <li>O melhor cliente recebe o mesmo tratamento de quem pediu uma vez.</li>
  <li>Se a equipe muda, o conhecimento vai junto.</li>
</ul>

<h2>Como a base se forma</h2>
<p>Quem pede no seu <a href="/cardapio-digital-para-delivery.html">cardápio digital</a> entra na sua base com nome, telefone e histórico de compras. Você não precisa pedir cadastro em papel, e a lista passa a crescer com a operação.</p>

<h2>Já tem clientes em planilha?</h2>
<p>O Menuzia <strong>importa CSV</strong> de planilhas, reconhece as colunas mais comuns e padroniza telefones. Também dá para <strong>exportar a base</strong> em planilha completa ou no formato de públicos do Meta Ads, para usar em <a href="/blog/marketing/como-fazer-anuncios-para-delivery.html">anúncios para delivery</a>.</p>

<h2>4 listas que todo delivery deveria ter</h2>
<ol>
  <li><strong>Frequentes:</strong> reconheça, sem precisar dar desconto.</li>
  <li><strong>Sumidos há 30 dias:</strong> a mensagem de reativação vai aqui.</li>
  <li><strong>Compraram uma vez:</strong> a segunda compra é a mais difícil de conseguir.</li>
  <li><strong>Maior ticket:</strong> bons candidatos para lançamentos.</li>
</ol>

<h2>Da informação para o pedido</h2>
<ul>
  <li><strong>Disparos segmentados:</strong> veja <a href="/disparo-whatsapp-para-delivery.html">disparo no WhatsApp</a>, no plano Completo.</li>
  <li><strong>Fidelidade e cupons:</strong> veja <a href="/programa-de-fidelidade-para-delivery.html">programa de fidelidade</a>.</li>
  <li><strong>Crédito para a próxima compra:</strong> veja <a href="/cashback-para-delivery.html">cashback para delivery</a>.</li>
</ul>

<h2>Respeite os dados</h2>
<p>Nome e telefone são dados pessoais. Use-os para falar sobre sua loja, dê opção de sair da lista, não compre listas e limite o acesso da equipe. Em caso de dúvida sobre a LGPD, consulte um profissional.</p>

<h2>Quanto custa</h2>
<p>A base de clientes vem com o <strong>plano Básico, R$97/mês</strong>. Disparos entram no <strong>Completo, R$149/mês</strong>. Sem comissão por pedido.</p>`,
    faq: [
      ['O que é CRM para restaurante?', 'É a organização dos dados dos clientes, como contato e histórico de compras, para vender melhor e trazer quem sumiu de volta.'],
      ['Os dados dos clientes são meus?', 'Sim. A base do seu canal próprio fica com você e pode ser exportada em planilha.'],
      ['Consigo importar minha lista atual?', 'Sim. O Menuzia importa arquivos CSV, inclusive exportados do Excel, e padroniza os telefones.'],
      ['Clientes do iFood entram na base?', 'A base é formada principalmente pelos pedidos do seu canal próprio. Por isso vale levar a recompra para o seu link.'],
      ['Posso usar a base em anúncios?', 'Sim. A exportação tem um formato próprio para públicos do Meta Ads.'],
    ],
  },

  {
    slug: 'cashback-para-delivery.html',
    cat: 'Cashback',
    plano: 'basico',
    heroImg: 'blog-sem-comissao.webp',
    heroAlt: 'Cliente recebendo cashback para usar no próximo pedido do delivery',
    title: 'Cashback para Delivery: Faça o Cliente Voltar a Comprar | Menuzia',
    h1: 'Cashback para delivery: dê um motivo para o cliente voltar',
    desc: 'Como usar cashback no delivery para trazer o cliente de volta: crédito por item, com validade e uso automático no próximo pedido.',
    keywords: 'cashback para delivery, cashback restaurante, programa de cashback delivery, como fazer cashback, sistema de cashback para restaurante, cliente não volta delivery, recompra delivery, cashback ou cupom',
    lt: LT_DORES,
    body: `<p>O cliente pediu uma vez, gostou e nunca mais voltou. Muitas vezes não foi por insatisfação: ele apenas esqueceu de você. O <strong>cashback para delivery</strong> dá um motivo concreto para o segundo pedido, porque o cliente sai da compra com um crédito que tem prazo para usar.</p>

<h2>Cashback ou desconto?</h2>
<ul>
  <li><strong>Desconto</strong> reduz a venda de agora, inclusive para quem compraria de qualquer jeito.</li>
  <li><strong>Cashback</strong> preserva o preço de hoje e só custa se o cliente voltar.</li>
</ul>
<p>Outros formatos também têm espaço: veja o <a href="/programa-de-fidelidade-para-delivery.html">programa de fidelidade</a> para metas por pedido e cupons.</p>

<h2>Como funciona no Menuzia</h2>
<ol>
  <li>Você escolhe <strong>o item</strong> que gera cashback.</li>
  <li>Define o valor: <strong>em reais por unidade ou em % do valor</strong>.</li>
  <li>Define <strong>por quantos dias</strong> o crédito vale.</li>
  <li>O crédito nasce quando o pedido é <strong>entregue</strong>.</li>
  <li>No próximo pedido, ele é <strong>usado automaticamente</strong>, no cardápio ou com o Agente de IA.</li>
</ol>
<p>O crédito abate apenas o subtotal, nunca o frete, e expira sozinho no prazo definido.</p>

<h2>Como definir o valor sem perder margem</h2>
<p>Comece pela margem: use sua <a href="/ficha-tecnica-e-precificacao.html">ficha técnica</a> antes de escolher o percentual. Exemplo: em um combo de R$50 com 5% de cashback, o custo máximo é de R$2,50, e apenas se o cliente voltar.</p>
<ul>
  <li><strong>Escolha itens com boa margem</strong>, não necessariamente os mais baratos.</li>
  <li><strong>Use validade curta:</strong> 15 a 30 dias costuma criar urgência, mas teste no seu ritmo de recompra.</li>
  <li><strong>Evite valores irrisórios:</strong> crédito de centavos não muda comportamento.</li>
</ul>

<h2>Avise o cliente</h2>
<p>Cashback esquecido não traz ninguém de volta. Mencione o benefício no cardápio, na embalagem e nas <a href="/disparo-whatsapp-para-delivery.html">campanhas de WhatsApp</a>. Se quer levar quem compra no marketplace para o seu canal, combine com <a href="/alternativa-ao-ifood.html">a estratégia de venda direta</a>.</p>

<h2>Sem comissão, a recompra rende mais</h2>
<p>No marketplace, cada recompra gera nova comissão. No canal próprio, o custo é fixo: o que você investe em cashback fica no relacionamento com o cliente. Acompanhe quem volta na sua <a href="/crm-para-restaurante.html">base de clientes</a>.</p>

<h2>Quanto custa</h2>
<p>Cupons, fidelidade e cashback ficam na área de Fidelidade do <strong>plano Básico, R$97/mês</strong>, sem comissão por pedido.</p>`,
    faq: [
      ['O que é cashback no delivery?', 'É um crédito gerado em uma compra para o cliente usar no próximo pedido, dentro de um prazo definido pela loja.'],
      ['Quando o crédito fica disponível?', 'Quando o pedido é marcado como entregue.'],
      ['O cliente precisa digitar um código?', 'Não. O crédito é aplicado automaticamente no próximo pedido.'],
      ['O cashback pode pagar o frete?', 'Não. Ele abate somente o subtotal dos itens.'],
      ['O cashback vale para todos os produtos?', 'Você escolhe quais itens geram cashback e define valor ou percentual e validade de cada regra.'],
    ],
  },
];

// ------------------------------------------------------------
//  Templates (mesma identidade do blog e das páginas locais)
// ------------------------------------------------------------
const head = (n, url) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${n.desc}">
<meta name="keywords" content="${n.keywords}">
<meta name="author" content="Menuzia">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#1d3e73">
<link rel="canonical" href="${SITE}${url}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<title>${n.title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${n.title}">
<meta property="og:description" content="${n.desc}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:image" content="${SITE}/assets/img/blog/${n.heroImg}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Menuzia">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${n.title}">
<meta name="twitter:description" content="${n.desc}">
<meta name="twitter:image" content="${SITE}/assets/img/blog/${n.heroImg}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}blog.css">`;

const serviceLd = (n, url) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "${jsonStr(n.h1)}",
  "name": "${jsonStr(n.title)}",
  "description": "${jsonStr(n.desc)}",
  "provider": {
    "@type": "Organization",
    "name": "Menuzia",
    "url": "${SITE}/",
    "telephone": "+${NAP.phoneRaw}",
    "email": "${NAP.email}"
  },
  "areaServed": { "@type": "Country", "name": "Brasil" },
  "url": "${SITE}${url}",
  "image": "${SITE}/assets/img/blog/${n.heroImg}"${n.plano === 'modulo' ? '' : `,
  "offers": {
    "@type": "Offer",
    "price": "${n.plano ? PLANOS[n.plano].preco : '67.00'}",
    "priceCurrency": "BRL",
    "url": "${SITE}/#precos",
    "availability": "https://schema.org/InStock"
  }`}
}
</script>`;

const faqLd = (n) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${n.faq.map(([q, a]) => `    { "@type": "Question", "name": "${jsonStr(q)}", "acceptedAnswer": { "@type": "Answer", "text": "${jsonStr(a.replace(/<[^>]+>/g, ''))}" } }`).join(',\n')}
  ]
}
</script>`;

const breadcrumbLd = (n, url) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "${SITE}/" },
    { "@type": "ListItem", "position": 2, "name": "${jsonStr(n.h1)}", "item": "${SITE}${url}" }
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

const ctaBox = (n) => n.plano ? `<div class="cta-box">
  <h3>Fale com um especialista do Menuzia</h3>
  <p>Sem comissão por pedido e sem fidelidade. Planos a partir de R$97/mês, com configuração feita pela nossa equipe.</p>
  <a href="${WA_CTA}" data-crm-form class="btn-vermelho">Quero conhecer o Menuzia →</a>
</div>` : `<div class="cta-box">
  <h3>Pare de pagar comissão por pedido</h3>
  <p>Cardápio digital próprio por R$67/mês fixo. Nossa equipe configura pra você e o suporte está incluso.</p>
  <a href="${SITE}/#precos" class="btn-vermelho">Criar Meu Cardápio Agora →</a>
</div>`;

const faqSection = (n) => `<div class="faq">
  <h2>Perguntas frequentes</h2>
${n.faq.map(([q, a]) => `  <div class="faq-item">
    <h3>${q}</h3>
    <p>${a}</p>
  </div>`).join('\n')}
</div>`;

const sidebar = (n) => {
  const outras = niches.filter(o => o.slug !== n.slug)
    .map(o => `      <li><a href="${o.slug}"><span class="side-cat">${o.cat}</span>${o.h1.split(':')[0]}</a></li>`).join('\n');
  return `<aside class="sidebar">
  <div class="sidebar-box">
    <h3>Outras soluções</h3>
    <ul>
${outras}
    </ul>
  </div>
  <div class="sidebar-box">
    <h3>Mais no blog</h3>
    <ul>
      <li><a href="${B}precos/cardapio-digital-barato-quanto-custa.html"><span class="side-cat">Preços</span>Cardápio digital barato: quanto custa</a></li>
      <li><a href="${B}estrategia/como-sair-do-ifood-e-vender-direto.html"><span class="side-cat">Estratégia</span>Como sair do iFood e vender direto</a></li>
      <li><a href="${B}guias/qr-code-para-cardapio-digital.html"><span class="side-cat">Guia</span>QR Code para cardápio digital</a></li>
    </ul>
  </div>
  <div class="sidebar-cta">
    <h3>Menuzia</h3>
    <p>Cardápio digital sem comissão, ${n.plano ? 'planos a partir de R$97/mês' : 'R$67/mês fixo'}. Nós configuramos pra você.</p>
    <a href="${n.plano ? WA_CTA : SITE + '/#precos'}"${n.plano ? ' data-crm-form' : ''} class="btn-site">${n.plano ? 'Falar com especialista' : 'Criar Cardápio'} →</a>
  </div>
</aside>`;
};

const footer = (n) => `<footer class="local-footer">
  <div class="lf-grid">
    <div class="lf-col">
      <div class="footer-logo">menuzia</div>
      <p>Cardápio digital sem comissão para restaurantes, hamburguerias, pizzarias, confeitarias e delivery. Atendimento 100% online em todo o Brasil.</p>
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
      <h4>Soluções</h4>
      <div class="lf-bairros">${niches.map(o => `<a href="${o.slug}">${o.cat}</a>`).join(' · ')}</div>
    </div>
  </div>
  <div class="lf-bottom">
    <a href="${SITE}/">Início</a> · <a href="${B}index.html">Blog</a> · <a href="cidades.html">Cidades</a> · <a href="cardapio-digital-barato.html">Cardápio digital barato</a> · <a href="${SITE}/#precos">Preços</a><br>
    © 2026 Menuzia. Cardápio digital sem comissão — ${n.plano ? 'planos a partir de R$97/mês' : 'R$67/mês fixo'}.
  </div>
</footer>`;

// Bloco VISÍVEL de cauda longa. Cada termo vira link interno real
// (o item da própria página aponta pro CTA). Nada de texto oculto.
const LT_PADRAO = [
  ['cardápio digital mais barato do mercado', 'cardapio-digital-mais-barato.html'],
  ['cardápio digital sem comissão', 'cardapio-digital-sem-comissao.html'],
  ['quanto custa um cardápio digital', 'cardapio-digital-preco.html'],
  ['cardápio digital com mensalidade fixa', 'cardapio-digital-mensalidade-fixa.html'],
  ['melhor cardápio digital para delivery', 'melhor-cardapio-digital.html'],
  ['cardápio digital grátis vale a pena', 'cardapio-digital-gratis.html'],
  ['cardápio digital para quem está começando', 'cardapio-digital-para-restaurante-iniciante.html'],
  ['cardápio digital barato', 'cardapio-digital-barato.html'],
  ['cardápio digital por cidade', 'cidades.html'],
];
const ltBlock = (n) => {
  const items = (n.lt || LT_PADRAO).filter(([, href]) => href !== n.slug);
  return `<div class="lt-block">
  <h2>Buscas relacionadas</h2>
  <p>O que donos de restaurante e delivery pesquisam antes de contratar — cada busca leva para a página que responde a ela:</p>
  <div class="lt-chips">
${items.map(([t, href]) => `    <a href="${href === '#' ? SITE + '/#precos' : href}">${t}</a>`).join('\n')}
  </div>
</div>`;
};

function page(n) {
  const url = '/' + n.slug;
  const body = n.body
    .replace(/href="\/blog\//g, `href="${B}`)
    .replace(/href="\/#/g, `href="${SITE}/#`)
    .replace(/href="\/"/g, `href="${SITE}/"`)
    .replace(/href="\/([a-z0-9-]+\.html)/g, 'href="$1');   // páginas da raiz -> relativo
  return `${head(n, url)}
${serviceLd(n, url)}
${faqLd(n)}
${breadcrumbLd(n, url)}
</head>
<body>
${header()}
<div class="artigo-wrap">
<article class="artigo">
  <div class="breadcrumb"><a href="${SITE}/">Início</a> › ${n.cat}</div>
  <span class="cat">${n.cat}</span>
  <h1>${n.h1}</h1>
  <div class="meta">${n.plano ? PLANOS[n.plano].meta : 'R$67/mês fixo'} · Sem comissão por pedido · Equipe Menuzia</div>
  <figure class="artigo-hero">
    <img src="assets/img/blog/${n.heroImg}" alt="${n.heroAlt}" width="1200" height="675" loading="eager" fetchpriority="high" decoding="async">
  </figure>
  ${body}
  ${ltBlock(n)}
  ${faqSection(n)}
  ${ctaBox(n)}
</article>
${sidebar(n)}
</div>
${footer(n)}
<script src="/assets/js/crm-form.js" data-offer="4b235100-bbed-413b-869d-c713ecebf15e" data-phone="5527992534407" defer></script>
</body>
</html>`;
}

niches.forEach(n => {
  fs.writeFileSync(n.slug, page(n));
  console.log('wrote ' + n.slug);
});
