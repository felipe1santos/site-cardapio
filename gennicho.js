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
  "image": "${SITE}/assets/img/blog/${n.heroImg}",
  "offers": {
    "@type": "Offer",
    "price": "67.00",
    "priceCurrency": "BRL",
    "url": "${SITE}/#precos",
    "availability": "https://schema.org/InStock"
  }
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

const ctaBox = () => `<div class="cta-box">
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
    <p>Cardápio digital sem comissão, R$67/mês fixo. Nós configuramos pra você.</p>
    <a href="${SITE}/#precos" class="btn-site">Criar Cardápio →</a>
  </div>
</aside>`;
};

const footer = () => `<footer class="local-footer">
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
    © 2026 Menuzia. Cardápio digital sem comissão — R$67/mês fixo.
  </div>
</footer>`;

function page(n) {
  const url = '/' + n.slug;
  const body = n.body
    .replace(/href="\/blog\//g, `href="${B}`)
    .replace(/href="\/#/g, `href="${SITE}/#`)
    .replace(/href="\/"/g, `href="${SITE}/"`)
    .replace(/href="\/(cardapio-|cidades)/g, 'href="$1');   // páginas da raiz -> relativo
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
  <div class="meta">R$67/mês fixo · Sem comissão por pedido · Equipe Menuzia</div>
  <figure class="artigo-hero">
    <img src="assets/img/blog/${n.heroImg}" alt="${n.heroAlt}" width="1200" height="675" loading="eager" fetchpriority="high" decoding="async">
  </figure>
  ${body}
  ${faqSection(n)}
  ${ctaBox()}
</article>
${sidebar(n)}
</div>
${footer()}
</body>
</html>`;
}

niches.forEach(n => {
  fs.writeFileSync(n.slug, page(n));
  console.log('wrote ' + n.slug);
});
