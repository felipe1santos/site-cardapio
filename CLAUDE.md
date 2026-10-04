# Menuzia — site-cardapio

Site institucional do **Menuzia** (menuzia.com.br): cardápio digital sem comissão para hamburguerias e delivery. R$67/mês fixo. Host canônico: `https://menuzia.com.br` (sem www). App do cliente: `app.menuzia.com.br`.

Site **estático** (HTML/CSS puro, sem framework). Imagens em `.webp`. Deploy = subir os arquivos da raiz.

## ⭐ Foco atual: SEO LOCAL primeiro

Prioridade do projeto agora é **ranquear na busca local do Google** ("cardápio digital em <cidade>"), uma página por cidade da Grande Vitória/ES, com densidade de keyword por **bairro**.

**48 cidades feitas.** Grande Vitória/ES: Vila Velha, Serra, Vitória, Cariacica, Viana, Guarapari. Capitais: São Paulo, Rio, BH, Brasília, Curitiba, Porto Alegre, Salvador, Fortaleza, Recife, Goiânia, Manaus, Belém, São Luís, Natal, João Pessoa, Maceió, Teresina, Campo Grande, Cuiabá, Florianópolis. Grande SP: Guarulhos, Osasco, São Bernardo, Santo André, São Caetano, Diadema, Mauá, Barueri, Carapicuíba, Taboão da Serra, Mogi das Cruzes, Cotia. Interior/litoral SP: Campinas, Santos, São José dos Campos, Sorocaba, Ribeirão Preto. Outras: Niterói, Contagem, Uberlândia, Joinville, Londrina.
Slug: `cardapio-digital-<cidade>.html`. Hub: **`cidades.html`** (agrupado por UF, ES primeiro).

### Como criar/editar uma página de cidade
Geradas por **`genlocal.js`** → `node genlocal.js`. **Não editar o HTML da página direto** (é sobrescrito).

1. Adicione um objeto no array `cities` em `genlocal.js`. **Cidade nova = só dados** (não precisa escrever corpo nem FAQ): preencha `slug`, `city`, `region`, `physicalAddress: false`, `heroImg`, `heroAlt`, `title`, `h1`, `desc`, `keywords`, `bairrosTop` (≥9, vira schema `areaServed`), `bairrosTodos` (grid+footer), `chips` (sidebar).
   Fora do ES, preencha também: `prep` (`'em'`/`'na'`/`'no'`), `de` (`'do Rio de Janeiro'`), `toda`, `geo` (`'BR-SP'`), `stateName`, `metro`, `regiaoFrase` (`'todo o Brasil'`) e, se a cidade não usa "bairro", `bairroWord` (`'setor'` em Goiânia, `'região'` em Brasília). `nota` = 1–2 frases únicas da praça (evita conteúdo duplicado entre cidades).
   O corpo vem de `genBody(c)` e o FAQ de `genFaq(c)`; defina `body`/`faq` só para sobrescrever (VV/Serra/Vitória/Cariacica/Viana/Guarapari têm FAQ próprio, VV/Serra/Vitória têm body próprio).
2. Imagem de capa: adicione item em `getimg.js` (`wants[]`) e rode `PEXELS_KEY=xxxx node getimg.js`. As capitais nacionais hoje **reaproveitam as imagens `local-*.webp` existentes** — trocar por imagens próprias quando houver chave da Pexels.
   **Atalho (recomendado fora do ES):** use os builders `mkSP({...})` (cidades de SP) ou `mkBR({...})` no array — espalhados com `...mkSP({...})`. Basta `slug`, `city`, `heroImg`, `nota`, `bairrosTop` (≥9) e `bairrosTodos`; título, h1, description, keywords de cauda longa e chips saem prontos. Para fora de SP passe também `region`, `geo`, `stateName`, `metro` (e `metroFrase` quando "toda a X" não encaixar, ex.: `'todo o Vale do Paraíba'`).
3. `node genlocal.js` (gera as páginas + `cidades.html`) e `node gensitemap.js`.
4. Adicione a cidade no footer do `index.html` (o sitemap é gerado sozinho).

Cada página local/landing tem um bloco **visível** de cauda longa (`.lt-block` / `.lt-chips`) — cada termo é um link interno real. Nunca usar texto oculto pra empilhar keyword.

Cidades com endereço físico real: `physicalAddress: true` (usa o objeto `NAP`). Sem endereço (área de atendimento): `physicalAddress: false` → footer/schema viram "atendimento online em toda a cidade" (NAP consistente, sem fingir loja física — evita penalidade de NAP inconsistente).

### Footer de cidades no index.html
Bloco visível "Cardápio digital por cidade" no footer do `index.html` linka as 6 cidades + `cidades.html`. **Nunca usar texto oculto/transparente** pra empilhar cidades — é black-hat (hidden text), Google pune. Escala via páginas reais + hub, não keyword stuffing.

Cada página de cidade tem: `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList` schema, footer profissional com **NAP** e lista de **todos os bairros**, sidebar com chips de busca rápida. Reaproveita `blog/blog.css` (estilos locais foram anexados lá: `.local-footer`, `.bairros-grid`, `.side-chips`, `.faq`).

### NAP (Nome/Endereço/Telefone)
Editar o objeto `NAP` no topo de `genlocal.js`. Consistência de NAP entre páginas = sinal de ranking local. Se não houver endereço físico, deixar `hasPhysicalAddress: false` (footer mostra "atendimento online em toda a cidade").

## Landings por palavra-chave / segmento (`gennicho.js`)
Páginas na raiz para intenções de busca não-geográficas. Geradas por **`node gennicho.js`** — **não editar o HTML direto**. Keyword nova = mais um objeto no array `niches` (`slug`, `cat`, `heroImg`, `heroAlt`, `title`, `h1`, `desc`, `keywords`, `body`, `faq`, `lt` opcional = chips de cauda longa; sem `lt` usa `LT_PADRAO`). Schema: `Service` + `Offer` R$67 + `FAQPage` + `BreadcrumbList`. Depois: `node gensitemap.js` e adicionar no footer do `index.html`.

Feitas — **segmento**: delivery, restaurante, whatsapp, pizzaria, confeitaria, lanchonete, marmitaria, restaurante-iniciante. **Preço/comparativo**: `cardapio-digital-mais-barato` ("mais barato do mercado"), `cardapio-digital-sem-comissao`, `cardapio-digital-preco` (quanto custa cada modelo), `cardapio-digital-mensalidade-fixa`, `melhor-cardapio-digital`, `cardapio-digital-gratis`, `cardapio-digital-pdf`, `cardapio-digital-99food`.
Divisão de intenção no cluster de preço (evita canibalização): `cardapio-digital-barato.html` = oferta/captura · `mais-barato` = comparativo de modelos · `preco` = tabela de faixas do mercado · `mensalidade-fixa` = custo fixo x variável · `melhor-cardapio-digital` = checklist de escolha.

Cuidado com **canibalização**: quando existir post de blog do mesmo tema (pizzaria, grátis), a landing raiz fica com a intenção comercial e o post com a informacional, e os dois se linkam.

## Blog (`blog/`)
Gerado por **`genblog.js`** → `node genblog.js`. **Não editar HTML do blog direto.** Artigos em `blog/<categoria>/*.html` + `blog/index.html`. Schemas (Article, BreadcrumbList, ItemList), og tags, hero images e links internos vêm do array `posts` em `genblog.js`. Campos opcionais por post: `published`/`modified` (ISO, senão usa o padrão de jun/2026) e `faq: [{q,a}]` (FAQ visível + `FAQPage` schema).

Categoria **`tutoriais/`** (cat `Tutorial`): guias de operação que ajudam o lead — impressora térmica (configurar, qual comprar, não imprime), KDS, organizar cozinha, taxa de entrega por bairro, WhatsApp Business, complementos/adicionais, Pix. Heroes `tut-*.webp` são screenshots reais do painel (cortados 1200x675). Ao citar o produto, só descrever telas que existem (Ajustes › Impressão/Entrega/Integrações, Painel de Pedidos Kanban, Logística, Cardápio › Complementos/Tamanhos/Order Bump).

## Imagens
- **Blog/locais:** API Pexels via `getimg.js` (sharp → webp 1200w em `assets/img/blog/`). Token Pexels no script (`PEXELS_KEY` ou hardcoded).
- **Imagens normais:** `conv.js` converte `*.png` da raiz → webp 1400w em `assets/img/`.

## Padrões
- Links internos: caminhos root-absolutos no corpo (`/blog/...`), reescritos pelos geradores pra relativo conforme a profundidade da página.
- Links de home/marca/CTA: URL absoluta do site (`SITE`).
- Identidade visual: azul `#1d3e73` / `#0084D6`, vermelho CTA `#C62828`, amarelo `#FBBF24`. Fonte Inter.

## Arquivos-chave
| Arquivo | O quê |
|---|---|
| `index.html` | Landing principal (editada à mão) |
| `cardapio-digital-barato.html` | Landing de captura (à mão) |
| `cardapio-digital-<cidade>.html` | Páginas locais → `genlocal.js` |
| `genlocal.js` | Gerador de páginas de cidade (SEO local) |
| `gennicho.js` | Gerador de landings por palavra-chave/segmento |
| `genblog.js` | Gerador do blog |
| `getimg.js` | Baixa imagens da Pexels → webp |
| `conv.js` | Converte PNG → webp |
| `blog/blog.css` | CSS do blog + páginas locais |
| `gensitemap.js` | Gera `sitemap.xml` varrendo os HTML (rodar depois de qualquer gerador) |
| `sitemap.xml` / `robots.txt` | SEO técnico (`sitemap.xml` é **gerado**, não editar à mão) |
