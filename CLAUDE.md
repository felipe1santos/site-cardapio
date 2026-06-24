# Menuzia — site-cardapio

Site institucional do **Menuzia** (menuzia.com.br): cardápio digital sem comissão para hamburguerias e delivery. R$67/mês fixo. Host canônico: `https://menuzia.com.br` (sem www). App do cliente: `app.menuzia.com.br`.

Site **estático** (HTML/CSS puro, sem framework). Imagens em `.webp`. Deploy = subir os arquivos da raiz.

## ⭐ Foco atual: SEO LOCAL primeiro

Prioridade do projeto agora é **ranquear na busca local do Google** ("cardápio digital em <cidade>"), uma página por cidade da Grande Vitória/ES, com densidade de keyword por **bairro**.

- ✅ **Vila Velha** — `cardapio-digital-vila-velha.html` (feito)
- ⏳ **Serra** — `cardapio-digital-serra.html` (próximo)
- ⏳ **Vitória** — `cardapio-digital-vitoria.html`

### Como criar/editar uma página de cidade
Geradas por **`genlocal.js`** → `node genlocal.js`. **Não editar o HTML da página direto** (é sobrescrito).

1. Edite o array `cities` em `genlocal.js` (copie o bloco de Vila Velha).
2. Preencha: `slug`, `city`, `bairrosTop` (12 principais → entram no schema `areaServed`), `bairrosTodos` (grid no corpo + footer), `chips` (busca rápida na sidebar), `faq` (vira `FAQPage` schema), `body`.
3. Pegue imagem de capa: adicione item em `getimg.js` (`wants[]`) e rode `node getimg.js` (API Pexels → webp 1200w em `assets/img/blog/`).
4. `node genlocal.js`
5. Adicione a URL em `sitemap.xml` (priority 0.9).

Cada página de cidade tem: `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList` schema, footer profissional com **NAP** e lista de **todos os bairros**, sidebar com chips de busca rápida. Reaproveita `blog/blog.css` (estilos locais foram anexados lá: `.local-footer`, `.bairros-grid`, `.side-chips`, `.faq`).

### NAP (Nome/Endereço/Telefone)
Editar o objeto `NAP` no topo de `genlocal.js`. Consistência de NAP entre páginas = sinal de ranking local. Se não houver endereço físico, deixar `hasPhysicalAddress: false` (footer mostra "atendimento online em toda a cidade").

## Blog (`blog/`)
Gerado por **`genblog.js`** → `node genblog.js`. **Não editar HTML do blog direto.** Artigos em `blog/<categoria>/*.html` + `blog/index.html`. Schemas (Article, BreadcrumbList, ItemList), og tags, hero images e links internos vêm do array `posts` em `genblog.js`.

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
| `genblog.js` | Gerador do blog |
| `getimg.js` | Baixa imagens da Pexels → webp |
| `conv.js` | Converte PNG → webp |
| `blog/blog.css` | CSS do blog + páginas locais |
| `sitemap.xml` / `robots.txt` | SEO técnico |
