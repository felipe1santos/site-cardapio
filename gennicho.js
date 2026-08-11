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
  ${ltBlock(n)}
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
