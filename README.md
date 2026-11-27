# Landing page — Imobiliário · Portugal

Cópia estática da landing em produção em **viriato.com.pt/landing/pt** e da
página de serviços **viriato.com.pt/landing/pt/renders-3d**, tirada a 24/11/2026.
Substitui o protótipo de Espanha (castelhano), que fica no histórico do git.

Sem build e sem dependências: são ficheiros estáticos, servidos pela Vercel.

## Páginas

| URL | Ficheiro |
|---|---|
| `/` | redireciona para `/landing/pt` |
| `/landing/pt` | `landing/pt.html` — a landing |
| `/landing/pt/renders-3d` | `landing/pt/renders-3d.html` — serviços |
| `/landing/pt/identidade-e-impressao`, `/visitas-virtuais`, `/website-de-vendas`, `/lancamento-e-pos-lancamento`, `/video` | a mesma página de serviços, com o serviço respetivo destacado no índice (é assim em produção) |

## Estrutura

Os caminhos são os mesmos do site em produção:

| Pasta | O que é |
|---|---|
| `styles/mainnew.css` | a folha de estilos do site inteiro (não só da landing) |
| `scripts/` | `main.js`, `forms.js`, `cookies.js`, jQuery |
| `cookies/pt.html` | o fragmento do banner de cookies que o `cookies.js` vai buscar a `/cookies/pt` |
| `images/`, `video/`, `media/` | imagens, vídeos e posters |
| `fonts/indivisible/` + `styles/fonts.css` | Indivisible (Thin, Regular, Bold) — substitui a DM Sans de produção. O peso 300 usa a Regular: a Thin é demasiado fina em texto corrido |
| `styles/landing.css` | Alterações da landing (hero, Thinking 360° Launch/Experience/Growth) por cima do `mainnew.css`, que se mantém igual ao de produção |
| `scripts/tiers.js` | Thinking 360°: slider de imagens de cada pack, acordeão de serviços (um aberto de cada vez) e "Pedir proposta …", que pré-seleciona o pack no formulário. Layout dos serviços da homepage do viriato.com.pt (V-SHOW®, CGI Images); as imagens são provisórias |
| `scripts/galeria.js` | Popup de imagens dos Projetos Selecionados. As listas de imagens vêm da galeria da Marketing Suite (`viriato.com.pt/aw/`, ex. `#vh-1`); as imagens carregam de lá, uma de cada vez. Evergreen Village e Evergreen Pure não têm galeria |

## O que difere da produção

- **`<base href>`** passou de `https://viriato.com.pt/landing` para `/landing`, e
  os URL absolutos de ficheiros e das páginas copiadas passaram a relativos —
  para servir tudo daqui.
- **Continuam a apontar para viriato.com.pt:** canonical, `og:*`, links para
  páginas que não estão aqui (políticas, acessibilidade, `/landing/es`, `/en`),
  e o **formulário** (`action="https://viriato.com.pt/pt/email"`).
- **Duas imagens** (Clux Comporta, Natura Village) vinham de deployments antigos
  do protótipo em `*.vercel.app`; agora estão em `media/projetos/`.
- **`noindex`** em cabeçalho (`vercel.json`), para esta cópia não competir com
  viriato.com.pt no Google.

## Mantido tal como em produção

- Google Tag Manager (`GTM-MZC6CVJ`), consentimento, reCAPTCHA, WhatsApp.
- Referências que já dão 404 em produção: `video/hero.webp`, vários favicons em
  `images/new/`, e `slider.js`/`filters.js` (comentados no HTML).
- `lenis` por CDN (unpkg).

## Riscos conhecidos

- **Formulário:** envia por AJAX para viriato.com.pt a partir de outro domínio —
  é provável que o browser o bloqueie (CORS) ou que o servidor o recuse.
- **Banner de cookies:** o `cookies.js` usa jQuery quando o fragmento chega, mas
  o jQuery só carrega no fim da página. Em produção o servidor é lento o
  suficiente para não se notar; numa CDN rápida o banner pode não aparecer.
