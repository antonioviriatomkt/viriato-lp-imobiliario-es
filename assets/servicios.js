/* ═══════════════════════════════════════════════════════════════════════
   SERVICIOS · ES — o corpo da página de serviços (18/08)

   Complementa `lp-arquitetos-es.html`, que é a landing que a campanha vai
   usar. Existe por uma razão concreta e não por simetria de site: a decisão de
   17/08 deixou o CTA «Ver servicio» dos seis cartões INERTE — «parece
   acionável e não é», e a consequência escrita era «ligar ou tirar antes de
   haver tráfego». Isto é o ligar.

   ── O que este ficheiro NÃO tem ────────────────────────────────────────
   Copy que já exista. Os seis serviços, o formulário inteiro, os rótulos de
   navegação, o rodapé, a confirmação e o aviso de privacidade são lidos de
   `assets/conteudo.js`, da entrada `arquitetos-es`. Se uma frase muda lá,
   muda aqui, e não há uma segunda versão a envelhecer — que é exatamente a
   razão pela qual o `assets/` existe desde 17/08.

   ── O que este ficheiro tem, e é novo ──────────────────────────────────
   `PAGINA`, aqui em baixo: o título, a linha de entrada, e os quatro passos de
   cada um dos seis serviços. ⚠️ Os passos são RASCUNHO — escritos a partir do
   que o vault já afirma (o argumento da leitura do projeto, o que o gerador de
   media produz, o que a FAQ já responde) e não validados por produção nem pelo
   comercial. Estão marcados na página com `.svc-borrador` e a marca sai quando
   alguém os assinar.

   ⚠️ Herda os bloqueios da landing, porque é a mesma campanha: preço por peça,
   rondas de revisão e prazo de concurso continuam ⟨pendientes⟩, o WhatsApp
   continua morto e o formulário continua sem endpoint. Nenhum deles é problema
   desta página resolver, e nenhum deixa de ser bloqueio por esta página
   existir.

   HTML é permitido nas strings e nada as escapa — escreve-se &amp; à mão.
   ═══════════════════════════════════════════════════════════════════════ */

/* Lido da casca, como na landing: o ficheiro não sabe qual é a variante, a
   página é que diz. Hoje só existe uma casca de serviços e é a castelhana. */
const V = document.body.dataset.variante || 'arquitetos-es';
const C   = (typeof CONTEUDO !== 'undefined') && CONTEUDO[V];
const COM = Object.assign({}, (typeof COMUM !== 'undefined' && COMUM) || {}, (C && C.comum) || {});
const UI  = Object.assign({}, ((typeof COMUM !== 'undefined' && COMUM.ui) || {}), (C && C.ui) || {});

/* ── copy própria da página ─────────────────────────────────────────────── */
const PAGINA = {
  volver:  'Renders de Arquitectura',      /* rótulo do sinal, que volta à landing */
  eyebrow: 'Qué producimos',
  h1:      'Servicios',
  /* Uma linha, e diz a mesma coisa que a landing diz em duas palavras: seis
     peças, um solo equipo, y el modelo del estudio como punto de partida. */
  lead:    'Seis piezas para el mismo proyecto, producidas por un solo equipo. Partimos de tu modelo y de tu fecha de entrega — no de una plantilla.',
  nota:    '…aquí es donde se amplía, no donde termina.',
  indice:  'Índice',
  contactoNav: 'Contacto',
  borrador:'Borrador · sin validar',

  /* ── os quatro passos, por serviço ────────────────────────────────────
     Quatro e não cinco: a referência corre a quatro e quatro é o que cabe numa
     leitura antes de a pessoa desistir. A chave é o `slot` do serviço, o mesmo
     que `conteudo.js` usa e o mesmo que `dados.js` marca em `aparece_em` — uma
     só chave para copy, media e âncora. */
  pasos: {
    imagens: [
      {h:'Lectura',    p:'Antes de modelar leemos el proyecto: planos, secciones y lo que ya esté decidido sobre materiales. Casi todo lo que sale mal en una imagen sale mal aquí, y es un problema de lectura y no de render.'},
      {h:'Encuadre',   p:'Elegimos punto de vista, hora y luz contigo, sobre planta. Es la decisión que más cambia la imagen y la más barata de cambiar: mover una cámara cuesta una llamada, rehacer un render cuesta una semana.'},
      {h:'Producción', p:'Trabajamos desde tu modelo siempre que sea utilizable. Lo que reconstruimos es lo que el render necesita y el modelo no lleva: contexto, vegetación, y todo lo que se dibujó como símbolo y no como cosa.'},
      {h:'Revisión y entrega', p:'Una ronda sobre imagen en baja, y la siguiente ya en alta. <span class="ph">⟨número de rondas incluidas y qué cuenta como ronda — decisión comercial⟩</span> Entrega en alta resolución y en los recortes que necesites.'}
    ],
    identidade: [
      {h:'Nombre y posición', p:'La promoción como producto y no como número de parcela: qué es, para quién y qué la separa de lo que se vende a doscientos metros.'},
      {h:'Sistema gráfico',   p:'Marca, tipografía, color y rejilla. Un sistema, no un logotipo suelto — porque lo que viene después son veinte piezas que tienen que parecer la misma cosa.'},
      {h:'Piezas',            p:'Plantas comerciales, dosier, vallas de obra y el material que el comercial lleva a la mesa. Las mismas imágenes, la misma dirección de arte.'},
      {h:'Artes finales',     p:'Archivos abiertos y cerrados, con sangre y perfil, listos para imprenta. <span class="ph">⟨propiedad de los archivos y fuentes — dirección⟩</span>'}
    ],
    visitas: [
      {h:'Escena',      p:'La misma escena de los renders, preparada para recorrerse. No es un modelo aparte: si el interior cambia, cambia en los dos sitios a la vez.'},
      {h:'Recorrido',   p:'Definimos por dónde se entra, qué se ve primero y dónde se detiene. Un tour sin recorrido pensado es una habitación en la que el visitante se pierde en diez segundos.'},
      {h:'Interacción', p:'Acabados alternativos, mediciones y las vistas desde la ventana según la planta. Lo que el comprador pregunta en una reunión, respondido dentro de la propia visita.'},
      {h:'Publicación', p:'Un enlace que abre en el navegador, sin instalar nada. Sirve en la mesa de ventas y sirve enviado a distancia, que son los dos usos reales.'}
    ],
    website: [
      {h:'Estructura',  p:'Una sola pregunta ordena la web: qué tiene que pasar para que alguien deje sus datos. Todo lo demás — plantas, galería, ubicación — se ordena detrás de eso.'},
      {h:'Diseño',      p:'Sobre las imágenes que ya existen, con la identidad que ya se decidió. La web no es un proyecto gráfico nuevo, es el mismo puesto en pantalla.'},
      {h:'Desarrollo',  p:'Rápida en móvil, porque ahí es donde se abre. Formulario conectado a quien contesta, y no a un buzón que nadie mira.'},
      {h:'Lanzamiento', p:'Medición desde el primer día, con consentimiento. <span class="ph">⟨dominio, alojamiento y quién lo mantiene después — a definir con el cliente⟩</span>'}
    ],
    performance: [
      {h:'Investigación', p:'Qué se busca de verdad, en qué idioma y a qué coste. Antes de abrir una cuenta ya sabemos si hay demanda o si la campaña va a comprar clics que no existen.'},
      {h:'Cuenta y campañas', p:'Google y Meta contra el lanzamiento, no contra las impresiones. Grupos separados por intención, negativos desde el primer día.'},
      {h:'Creatividades', p:'Salen del material que ya se produjo — imágenes, vídeo, tour. Es la ventaja de que todo lo haga el mismo equipo: la campaña no espera por el material ni lo contradice.'},
      {h:'Medición',      p:'La solicitud es la cifra de la que informamos. Un panel con lo que costó cada una y de dónde vino. <span class="ph">⟨quién responde las solicitudes y en qué plazo — comercial⟩</span>'}
    ],
    video: [
      {h:'Concepto',    p:'Qué tiene que entender quien lo vea, y en cuántos segundos. Un feed no da tres minutos: la primera decisión es qué se cuenta y qué se deja fuera.'},
      {h:'Luz y cámara', p:'Animación sobre el modelo, rodaje real, o las dos cosas montadas para que no se note dónde acaba una. Misma dirección de arte que las imágenes fijas.'},
      {h:'Montaje',     p:'Ritmo, color y sonido. La música y el silencio son parte de la pieza, no algo que se pone encima al final.'},
      {h:'Formatos',    p:'Vertical, cuadrado y horizontal desde el mismo montaje, con y sin rótulos. Sale una vez y sirve en los cinco sitios donde se va a publicar.'}
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════════════
   MONTAGEM
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  /* Falha alto e dentro da página, como a landing: uma página em branco num
     sítio que recebe cliques pagos é dinheiro a arder. */
  if (!C) {
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="wrap" style="padding:120px 0"><h1>Missing copy</h1>' +
      '<p>No CONTEUDO entry for <code>' + V + '</code>. Is assets/conteudo.js loaded?</p></div>');
    return;
  }

  const SERVICIOS = COM.servicos || [];

  const WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5v-.5c-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>';
  const LOGO = '<svg viewBox="0.2 0.1 125.5 130.9" fill="currentColor" aria-hidden="true" focusable="false"><path d="M73.1,26.8l33.3,14L95.1,55.9L73.1,26.8z M52.7,0.1L42.3,13.6L84.5,70l-31.1,41.3L11.2,55.1l-11,14.7L46,131h13.8l35.2-46.8 l20.4,26.5L125.7,97l-20-27l17.5-23.3l-5.9-20.5L52.7,0.1z"/></svg>';

  const btnWa = (rotulo, classe) =>
    '<a href="#" class="btn btn-wa' + (classe ? ' ' + classe : '') + '" data-cta="whatsapp">' + WA + ' ' + rotulo + '</a>';
  const btnChamada = (rotulo, classe) =>
    '<a href="#contact" class="btn ' + (classe || 'btn-s') + '" data-cta="call">' + rotulo + '</a>';

  const campo = f => {
    const id = 'f-' + f.id, cls = f.full ? ' class="f-full"' : '';
    let ctrl;
    if (f.tipo === 'select')
      ctrl = '<select id="' + id + '" name="' + f.id + '"><option value="">' + UI.selecionar + '</option>' +
             f.opcoes.map(o => '<option>' + o + '</option>').join('') + '</select>';
    else if (f.tipo === 'textarea')
      ctrl = '<textarea id="' + id + '" name="' + f.id + '"' + (f.placeholder ? ' placeholder="' + f.placeholder + '"' : '') + '></textarea>';
    else
      ctrl = '<input id="' + id + '" name="' + f.id + '"' + (f.tipo ? ' type="' + f.tipo + '"' : '') +
             (f.req ? ' required' : '') + (f.auto ? ' autocomplete="' + f.auto + '"' : '') +
             (f.placeholder ? ' placeholder="' + f.placeholder + '"' : '') + '>';
    return '<div' + cls + '><label for="' + id + '">' + f.label + '</label>' + ctrl + '</div>';
  };

  /* ── header ──
     A pastilha da landing, com uma diferença: aqui o sinal é um link e volta
     à landing. Numa landing o sinal não leva a lado nenhum de propósito — um
     caminho só — mas esta página é um desvio DENTRO desse caminho, e quem
     desce por ela tem de ter como voltar sem carregar no «atrás». */
  const header =
'<header>' +
  '<div class="wrap nav">' +
    '<a class="logo" href="lp-arquitetos-es.html" aria-label="' + PAGINA.volver + '">' + LOGO + '</a>' +
    '<div class="navr">' + btnChamada(COM.navChamada, 'btn-s btn-sm') + btnWa(COM.navWhatsapp, 'btn-sm') + '</div>' +
  '</div>' +
'</header>';

  const cabeca =
'<section class="pg-head">' +
  '<div class="wrap">' +
    '<div>' +
      '<div class="eyebrow">' + PAGINA.eyebrow + '</div>' +
      '<h1>' + PAGINA.h1 + '</h1>' +
      '<p class="lead">' + PAGINA.lead + '</p>' +
    '</div>' +
    '<p class="nota">' + PAGINA.nota + '</p>' +
  '</div>' +
'</section>';

  const menu =
'<nav class="svc-nav" aria-label="' + PAGINA.indice + '">' +
  '<div class="eyebrow">' + PAGINA.indice + '</div>' +
  '<ul>' +
    SERVICIOS.map(s => '<li><a href="#' + s.slot + '">' + s.h3 + '</a></li>').join('') +
    '<li class="sep-li"><span class="sep"></span></li>' +
    '<li><a href="#contact">' + PAGINA.contactoNav + '</a></li>' +
  '</ul>' +
'</nav>';

  const bloco = (s, i) => {
    const pasos = PAGINA.pasos[s.slot] || [];
    return (
'<article class="svc-block" id="' + s.slot + '">' +
  '<div class="svc-head">' +
    '<div><span class="cnum">(' + String(i + 1).padStart(3, '0') + ')</span><h2>' + s.h3 + '</h2></div>' +
    '<p>' + s.p + '</p>' +
  '</div>' +
  /* Dois lugares de média por serviço. Ficam com o proxy fotográfico se não
     houver obra marcada com este componente — nunca com uma imagem de outro. */
  '<div class="svc-media" data-slot="' + s.slot + '">' +
    [0, 1].map(n =>
      '<figure class="svc-fig">' +
        '<div class="thumb"><div class="phbox' + (s.ph ? ' ph' : '') + '">' + (s.ph || s.h3) + '</div></div>' +
        '<figcaption></figcaption>' +
      '</figure>').join('') +
  '</div>' +
  (pasos.length
    ? '<div class="svc-steps">' + pasos.map((p, k) =>
        '<details>' +
          '<summary><span class="sn">' + String(k + 1).padStart(2, '0') + '</span>' +
          '<span class="st">' + p.h + '</span></summary>' +
          '<div class="ans">' + p.p + '</div>' +
        '</details>').join('') + '</div>'
    : '') +
'</article>');
  };

  const corpo =
'<section class="sec" style="padding-top:0">' +
  '<div class="wrap">' +
    '<div class="svc-layout">' + menu +
      '<div>' +
        '<span class="svc-borrador">' + PAGINA.borrador + '</span>' +
        SERVICIOS.map(bloco).join('') +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>';

  /* ── formulário ──
     Markup igual ao da landing, letra por letra, para a `lp.css` o vestir sem
     uma linha nova: mesma secção clara, mesma grelha, mesmos estados de envio
     e de confirmação. O que muda é nada. */
  const contacto =
'<section class="sec contact sec-claro" id="contact">' +
  '<div class="wrap cgrid">' +
    '<div>' +
      '<div class="eyebrow">' + C.contacto.eyebrow + '</div>' +
      '<h2 style="margin-bottom:16px">' + C.contacto.h2 + '</h2>' +
      '<p>' + C.contacto.lead + '</p>' +
      '<div class="cinfo">' + COM.contactoInfo.map(([r, v]) =>
        '<div><span>' + r + '</span><span class="ph">' + v + '</span></div>').join('') + '</div>' +
    '</div>' +
    '<form data-form="lead">' +
      C.contacto.campos.map(campo).join('') +
      '<div class="hp"><label for="f-website">' + UI.honeypot + '</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>' +
      '<div class="f-full"><button class="btn btn-p fsub" style="width:100%;justify-content:center">' +
        '<span class="rotulo">' + C.contacto.submit + '</span>' +
        '<span class="pendente" aria-hidden="true"><i></i></span>' +
      '</button></div>' +
      '<p class="fnote ph">' + COM.notaPrivacidade + '</p>' +
    '</form>' +
    '<div class="obrigado" role="status" aria-live="polite">' +
      '<h3>' + COM.obrigado.h3 + '</h3><p>' + COM.obrigado.p + '</p>' +
      '<p style="margin-top:14px" class="ph">' + COM.obrigado.nota + '</p>' +
    '</div>' +
  '</div>' +
'</section>';

  const fecho =
'<section class="sec tight">' +
  '<div class="wrap"><div class="cta-band">' +
    '<h3>' + C.fecho.h3 + '</h3>' +
    '<div class="ctas">' + btnWa(COM.ctaWhatsappCurto || COM.navWhatsapp) + btnChamada(C.fecho.ctaChamada, 'btn-p') + '</div>' +
  '</div></div>' +
'</section>';

  document.body.insertAdjacentHTML('afterbegin',
    header +
    '<main>' + cabeca + corpo + contacto + fecho + '</main>' +
    '<footer><div class="wrap fbot"><span>' + COM.rodape + '</span><span>' + COM.rodapeLegal + '</span></div></footer>' +
    '<div class="sticky">' + btnChamada(COM.stickyChamada) + btnWa(COM.navWhatsapp) + '</div>');
})();

/* ═══════════════════════════════════════════════════════════════════════
   COMPORTAMENTO — o mesmo da landing, e por isso mesmo curto
   ═══════════════════════════════════════════════════════════════════════ */
const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  const sel = a.getAttribute('href');
  if (sel === '#') return;
  a.addEventListener('click', e => {
    const alvo = document.querySelector(sel);
    if (!alvo) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(alvo, { offset: -104 });
    else alvo.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
});

/* ── acordeão ──
   <details> não anima sozinho. Mesma mecânica da FAQ da landing, sobre `.ans`. */
document.querySelectorAll('.svc-steps details').forEach(d => {
  const summary = d.querySelector('summary'), panel = d.querySelector('.ans');
  if (!summary || !panel) return;
  summary.addEventListener('click', e => {
    if (reduced) return;
    e.preventDefault();
    if (d.dataset.busy) return;
    d.dataset.busy = '1';
    const abrindo = !d.open;
    if (abrindo) d.open = true;
    const full = panel.getBoundingClientRect().height;
    const pad = getComputedStyle(panel).paddingBottom;
    panel.style.overflow = 'hidden';
    const anim = panel.animate({
      height: abrindo ? ['0px', full + 'px'] : [full + 'px', '0px'],
      paddingBottom: abrindo ? ['0px', pad] : [pad, '0px'],
      opacity: abrindo ? [0, 1] : [1, 0]
    }, { duration: abrindo ? 340 : 250, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' });
    anim.onfinish = () => {
      if (!abrindo) d.open = false;
      anim.cancel();
      panel.style.overflow = ''; panel.style.height = ''; panel.style.paddingBottom = '';
      delete d.dataset.busy;
    };
  });
});

/* ── CTAs ──
   Mortos por decisão, e pela mesma razão da landing: não há número de
   WhatsApp, não há pessoa nomeada e não há compromisso de resposta. Um link
   plausível esconderia isso e podia mandar mensagem a um desconhecido. */
document.querySelectorAll('[data-cta="whatsapp"]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); alert(UI.avisoWhatsapp); });
});

/* ── formulário ──
   Percurso desenhado, envio por ligar: quando existir o endpoint troca-se o
   `setTimeout` pelo `fetch` e mais nada. */
(function () {
  const form = document.querySelector('[data-form="lead"]');
  const bloco = form && form.closest('.cgrid');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (bloco.classList.contains('form-envia')) return;
    bloco.classList.add('form-envia');
    await new Promise(r => setTimeout(r, reduced ? 350 : 900));
    bloco.classList.remove('form-envia');
    bloco.classList.add('form-feito');
    const ok = bloco.querySelector('.obrigado');
    ok.setAttribute('tabindex', '-1'); ok.focus({ preventScroll: true });
  });
})();

/* ── barra fixa do telemóvel ──
   A landing entra com ela quando o hero sai do ecrã. Aqui não há hero — o
   cabeçalho da página é curto e os CTA dele não existem — por isso entra assim
   que se começa a descer. */
(function () {
  const barra = document.querySelector('.sticky'), marca = document.querySelector('.pg-head');
  if (!barra || !marca) return;
  new IntersectionObserver(([e]) => barra.classList.toggle('on', !e.isIntersecting),
    { threshold: 0 }).observe(marca);
})();

/* ═══════════════════════════════════════════════════════════════════════
   DATA → PÁGINA
   Mesmo contrato do protótipo de setor e da landing: um lugar só é
   substituído quando o ficheiro existe mesmo. Sem dados.js, sem obra marcada
   com o componente ou sem media, o proxy fotográfico fica — a página nunca
   mostra uma imagem partida nem a obra errada debaixo do serviço errado.
   ═══════════════════════════════════════════════════════════════════════ */
const DADOS = (typeof PROJETOS !== 'undefined' && PROJETOS) || [];
const CFG   = (typeof SETOR !== 'undefined' && SETOR) || {};

/* Os mesmos destaques da landing, e pela mesma razão: o lugar que mais se vê
   de cada componente é escolha editorial da campanha. Um slug que não exista
   é ignorado sem ruído e o lugar volta à ordem de arquivo. */
const DESTAQUE = { imagens: 'vanguard-comporta' };

function pintar(box, src, alt) {
  if (!box || !src) return false;
  const i = document.createElement('img');
  i.src = src; i.alt = alt || ''; i.loading = 'lazy'; i.decoding = 'async';
  box.classList.add('tem-media'); box.textContent = ''; box.appendChild(i);
  return true;
}
const CODEC = { av1: 'video/mp4; codecs="av01.0.09M.08"', h264: 'video/mp4; codecs="avc1.640028"' };
const olhoVideo = new IntersectionObserver(es => es.forEach(e => {
  if (reduced) return;
  if (e.isIntersecting) e.target.play().catch(() => {});
  else e.target.pause();
}), { threshold: .25 });
function pintarVideo(box, fontes, poster, alt) {
  const uteis = fontes.filter(f => f && f.src);
  if (!box || !uteis.length) return false;
  const v = document.createElement('video');
  v.muted = v.loop = v.playsInline = true;
  v.setAttribute('aria-label', alt || '');
  v.preload = 'metadata';
  if (poster) v.poster = poster;
  uteis.forEach(f => { const s = document.createElement('source'); s.src = f.src; s.type = f.type; v.appendChild(s); });
  v.classList.add('a-entrar');
  v.addEventListener('loadeddata', () => v.classList.add('pronto'), { once: true });
  box.classList.add('tem-media'); box.textContent = ''; box.appendChild(v);
  olhoVideo.observe(v);
  return true;
}

document.querySelectorAll('.svc-media').forEach(grelha => {
  const tipo = grelha.dataset.slot;
  const figs = [...grelha.querySelectorAll('.svc-fig')];

  /* ── os dois serviços sem obra ────────────────────────────────────────
     `performance` não tem empreendimento nenhum marcado — a imagem é de banco
     e vem do SETOR, como na landing, e é a única desta página que não é obra
     da Viriato. `video` empresta o reel do hero e corre os primeiros segundos,
     que é onde o filme apresenta o empreendimento antes de andar por dentro
     dele. Um corte próprio continua a ser a resposta leve no telemóvel.
     Ambos ocupam um lugar só: não há um segundo para encher. */
  if (tipo === 'performance' || tipo === 'video') {
    grelha.classList.add('uma');
    figs.slice(1).forEach(f => f.remove());
    const box = figs[0].querySelector('.phbox');
    if (tipo === 'performance' && CFG.servicoPerformance) {
      if (pintar(box, CFG.servicoPerformance, UI.painelCampanha)) {
        box.classList.remove('ph');
        figs[0].querySelector('figcaption').textContent = UI.painelCampanha;
      }
    } else if (tipo === 'video' && CFG.heroVideo) {
      if (pintarVideo(box, [{ src: CFG.heroVideo, type: CODEC.h264 }], CFG.heroPoster, UI.filme)) {
        box.classList.remove('ph');
        figs[0].querySelector('figcaption').textContent = UI.filme;
        const v = box.querySelector('video');
        const CORTE = 6;
        v.addEventListener('timeupdate', () => { if (v.currentTime >= CORTE) v.currentTime = 0; });
      }
    }
    return;
  }

  /* Obras marcadas com este componente, com o destaque à cabeça. */
  const lista = DADOS.filter(p => p.aparece_em && p.aparece_em[tipo] && p.media);
  const i = lista.findIndex(p => p.slug === DESTAQUE[tipo]);
  if (i > 0) lista.unshift(lista.splice(i, 1)[0]);
  if (!lista.length) { grelha.classList.add('uma'); figs.slice(1).forEach(f => f.remove()); return; }
  if (lista.length === 1) { grelha.classList.add('uma'); figs.slice(1).forEach(f => f.remove()); }

  lista.slice(0, figs.length).forEach((p, n) => {
    const fig = figs[n], box = fig.querySelector('.phbox'), m = p.media || {};
    /* Identidade e website têm recorte próprio; o resto usa o cartão 16:9. */
    const proprio = { identidade: 'ident16', website: 'web16' }[tipo];
    const src = (proprio && m[proprio]) ? m[proprio] : m.card16;
    /* Três dos seis aceitam vídeo, e pela mesma razão da landing: o movimento
       é a peça. Um tour é percorrer a casa, um dossier é folheá-lo, uma web é
       fazer-lhe scroll — parados, os três são a fotografia de uma coisa. */
    const FILME = {
      visitas:    { av1: m.visitaAv1, h264: m.visitaMp4, poster: m.visitaPoster },
      identidade: { av1: m.identAv1,  h264: m.identMp4 },
      website:    { av1: m.webAv1,    h264: m.webMp4, poster: m.webPoster, fallback: false }
    }[tipo];
    const video = FILME && pintarVideo(box,
      [{ src: FILME.av1, type: CODEC.av1 }, { src: FILME.h264, type: CODEC.h264 }],
      FILME.poster || (FILME.fallback === false ? null : src), p.nome);
    const ok = video || pintar(box, src, p.nome);
    if (ok) {
      box.classList.remove('ph');
      fig.querySelector('figcaption').textContent =
        [p.nome, p.localizacao, (p.ficha || {}).promotor].filter(Boolean).join(' · ');
    }
  });
  /* Um lugar sem obra por trás não fica com um proxy pendurado ao lado de uma
     imagem verdadeira: sai. Dois lugares e uma obra lê-se como falta; um lugar
     e uma obra lê-se como uma escolha. */
  figs.forEach(f => {
    if (!f.querySelector('.phbox.tem-media')) { f.remove(); grelha.classList.add('uma'); }
  });
});

/* ── item ativo do índice ──
   `rootMargin` de topo negativo põe a linha de decisão à altura do header, e
   não no bordo do ecrã: sem isso o item mudava quando o bloco seguinte
   espreitava por baixo do vidro, que é antes de se conseguir ler o título. */
(function () {
  const links = [...document.querySelectorAll('.svc-nav a')];
  const alvos = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!alvos.length) return;
  const marcar = el => links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + el.id));
  /* Um observador só, partilhado pelos sete alvos. Quando há mais do que um a
     cortar a faixa, ganha o que está mais acima — que é o que se está a ler. */
  const obs = new IntersectionObserver(entradas => {
    const visiveis = entradas.filter(e => e.isIntersecting);
    if (visiveis.length) marcar(visiveis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target);
  }, { rootMargin: '-116px 0px -62% 0px', threshold: 0 });
  alvos.forEach(el => obs.observe(el));
})();
