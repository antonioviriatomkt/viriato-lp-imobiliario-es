# Landing page — Imobiliário · Arquitetos · Espanha (castelhano)

Entrega para desenvolvimento. É o protótipo da **landing da campanha paga de
Espanha** — a única versão em castelhano — mais a **página de serviços** que lhe
está pendurada, e as **guidelines de imagem gráfica** que definem a identidade.

Sem build e sem dependências de instalação: são ficheiros estáticos.

```bash
python3 -m http.server 8000     # e abrir http://localhost:8000/lp-arquitetos-es.html
```

## As duas páginas

| Ficheiro | O que é |
|---|---|
| `lp-arquitetos-es.html` | **A landing.** É para aqui que apontam os cinco grupos de anúncios |
| `servicios-es.html` | **Página de serviços.** É o destino do «Ver servicio» dos seis cartões da landing — sem ela aquele clique morre |

Comprador-alvo: o **ateliê de arquitetura** espanhol. A página vende a **peça**,
ao preço da peça — não o lançamento inteiro. O lado promotor está fora de
Espanha por decisão: `marketing inmobiliario` dirige-se a agências imobiliárias,
não a promotores.

As duas páginas são **cascas**: `<title>`, `<meta>` e um `data-variante` no
`<body>`. O corpo, os estilos e a copy vivem em `assets/`.

## Estrutura

| Ficheiro | O que é |
|---|---|
| `assets/lp.js` | O corpo da landing, montado a partir da copy, mais o comportamento |
| `assets/lp.css` | Os estilos da landing — e a base da página de serviços |
| `assets/servicios.js` | O corpo da página de serviços |
| `assets/servicios.css` | Só o que a página de serviços tem e a landing não — cabeçalho, índice lateral, bloco de serviço, passos. Não redefine um único token |
| `assets/conteudo.js` | **A copy.** É aqui que se escreve. Nada estrutural vive aqui e nada editorial vive nos outros |
| `dados.js` | Os empreendimentos (`PROJETOS`) e o hero (`SETOR`) — é o que enche a faixa de obra e o media dos seis serviços |
| `media/` | Os derivados servidos: recortes de cartão, casos, identidade, visita, hero |
| `guidelines/` | O PDF de imagem gráfica de 14/08 — a identidade que estas páginas seguem |
| `vercel.json` | `cleanUrls` + `noindex` + cache longa no `media/` |

O `slot` de cada serviço (`imagens`, `identidade`, `visitas`, `website`,
`performance`, `video`) é a chave única: comanda a copy, o media e a âncora
entre as duas páginas.

## Notas de implementação

- **`noindex, nofollow`** nas duas páginas, e repetido em cabeçalho no
  `vercel.json`. É deliberado: atacam os mesmos termos que a página de setor
  permanente e canibalizavam-se. Manter em produção.
- **Os URL finais de anúncios não podem ter `.html`** — daí o `cleanUrls`.
- **O corpo é montado em JavaScript** porque isto é um protótipo. Em produção
  deve ser servido pelo servidor; o `<title>` e as `<meta>` já chegam com o
  documento de propósito, que é o que a plataforma de anúncios lê.
- **Duas dependências externas por CDN:** `lenis` (unpkg) para o scroll e Google
  Fonts (DM Sans). Ambas a alojar no domínio antes de haver tráfego real —
  Google Fonts por CDN é um problema de RGPD em Espanha.
- **`assets/conteudo.js` tem um bloco `COMUM` em inglês.** É a base partilhada
  que restou de quando havia três variantes (duas inglesas, para a Alemanha,
  retiradas desta entrega). A variante castelhana sobreescreve-a inteira no seu
  bloco `comum` e **nada em inglês chega a ecrã** — verificado. Mas se se
  acrescentar uma chave nova ao `COMUM`, tem de se acrescentar também ao
  `comum`, ou sai em inglês.

## O que não está aqui

- A **página de setor permanente** e as **duas landings inglesas** do protótipo
  original — fora de âmbito.
- Os **originais de media** que alimentam os geradores de recortes (renders a
  20 MB, masters de brochura, o master do reel do hero). O que está aqui são os
  derivados servidos, ~45 MB. Um clone serve a página; só não regenera recortes.
- O `visita.av1.mp4`: 41 MB para os mesmos 42 s que o `visita.mp4` faz em 13 MB
  — a exportação AV1 saiu mal. A entrada está a `null` no `dados.js` de
  propósito, para o browser cair no MP4 em vez de apanhar um 404.
