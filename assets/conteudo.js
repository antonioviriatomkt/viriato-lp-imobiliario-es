/* ═══════════════════════════════════════════════════════════════════════
   LA COPY — lp-arquitetos-es.html y servicios-es.html
   Las dos páginas son el mismo cuerpo (assets/lp.js, assets/servicios.js) con
   el objeto `arquitetos-es` de aquí. Nada estructural vive en este fichero y
   nada editorial vive en aquéllos: si una frase tiene que cambiar, cambia
   aquí, una vez.

   ── A quién habla ──────────────────────────────────────────────────────
   Al ESTUDIO DE ARQUITECTURA español, y vende la PIEZA al precio de la pieza.
   La subasta española se compra en lenguaje de componente — `renders
   arquitectura` 720/mes es el término mayor del grupo B1 — y esa intención es
   de arquitecto, no de promotor. El lado promotor está fuera de España por
   decisión: `marketing inmobiliario` se dirige a agencias, ~70/30
   (research/2026-08-17-espanha-serp-e-concorrencia §6).

   ⚠️ Lo que este fichero no puede decidir, y es comercial: la página vende
   POR PIEZA. Precio, rondas de revisión y plazo de concurso están todos
   ⟨pendientes⟩ a propósito y son las tres primeras preguntas de este
   comprador. Ver el bloque de la variante, más abajo.

   ── Nota para quien reciba esto ────────────────────────────────────────
   El prototipo original tenía tres variantes: `promotores` y `arquitetos`, en
   inglés y para Alemania, y ésta. Alemania salió el 17/08 y España se quedó
   con el presupuesto; las dos inglesas se han quitado de esta entrega y sólo
   queda la castellana. Por eso `COMUM`, abajo, está en inglés: es la base
   compartida que aquella estructura tenía, y la variante castellana la
   sobreescribe entera en su bloque `comum`. Nada en inglés llega a pantalla
   — está verificado — pero si se añade una clave nueva a `COMUM` hay que
   añadirla también a `comum`, o saldrá en inglés.

   HTML is allowed in these strings and nothing escapes them: write &amp; and
   &nbsp; by hand. ⟨angle brackets⟩ mark a placeholder waiting on a decision —
   they are styled by `.ph` and are meant to be visible in review.
   ═══════════════════════════════════════════════════════════════════════ */

/* La base compartida, heredada de la estructura de tres variantes. En inglés
   por eso mismo, y sin efecto en pantalla: la variante castellana sobreescribe
   cada una de estas claves en su bloque `comum`. Ver la nota del cabecero. */
const COMUM = {
  /* ── Interface strings (18/08) ──────────────────────────────────────────
     These were hard-coded in lp.js until the Castilian page arrived and made
     them visible for what they are: eight English words that would have
     shipped on a paid Spanish landing page — the empty option on nine
     dropdowns, the two carousel labels, the honeypot label, the hero caption,
     the three fallback work cards and the WhatsApp warning.

     They live here because the file header says every string does. A variant
     overrides what it needs with its own `ui` block; anything it leaves out
     falls back to these. */
  ui: {
    selecionar:     'Select',
    anterior:       'Previous',
    seguinte:       'Next',
    honeypot:       'Leave this empty',
    filme:          'Opening film',
    obraExemplo:    'Development',
    obraNome:       '⟨Development⟩',
    obraLocal:      '⟨Location⟩',
    painelCampanha: 'Campaign dashboard',
    avisoWhatsapp:  'Prototype — the WhatsApp number and the person answering it are still to be set.'
  },

  navChamada:   'Book a call',
  navWhatsapp:  'WhatsApp',
  ctaWhatsapp:  'Message us on WhatsApp',
  /* The closing band's label. It used to be derived by stripping 'Message us
     on ' off the line above — a rule that only holds in English. */
  ctaWhatsappCurto: 'WhatsApp',
  stickyChamada:'Book a call',
  rodape:       '© 2026 Viriato',
  rodapeLegal:  '<a href="#" class="ph">⟨Privacy⟩</a> · <a href="#" class="ph">⟨Cookies⟩</a>',
  /* The work rail is filled from dados.js and shows the same six developments
     to both audiences: it is the only proof either page has, and an architect
     judging whether we can draw is served by it exactly as well.

     Since 17/08 it is also the same BAND on both — full width, one card centred
     between two, dragged, cycling, no arrows. It was built for the architects
     on the grounds that the picture is the product there; the promoters' page
     turns out to want it for a plainer reason, which is that six developments
     shown large are the best thing either page has to show. */
  obra: {
    eyebrow: 'Selected work',
    h2:      'The building, before the building.',
    grande:  true,
    setas:   false
  },

  /* ── The six services, once (17/08) ────────────────────────────────────
     One list for both pages. Two lists were two things to keep true, and they
     had already drifted into naming the same work differently — "3D
     visualisation" here, "Exterior CGI" and "Interior CGI" there.

     What stays per audience is the treatment, not the list: the promoters get
     cards with a 16:9 crop, the architects get a numbered index with a 4:5 one.
     Heading, eyebrow and CTA label are per audience too — they frame the same
     six things for a different reader.

     A side effect worth having: every one of these six has media behind it.
     The architects' own list had three slots — competition boards, plan
     graphics, interior CGI — that no development in dados.js is tagged with,
     so half that grid was hatched placeholder at full size. */
  servicos: [
    {slot:'imagens',     h3:'3D visualisation',
     p:'Exteriors, interiors and aerials. CGI and photography under one art direction, so the campaign doesn\'t look like two suppliers.'},
    {slot:'identidade',  h3:'Identity &amp; print',
     p:'Name, identity, floor plans, brochure and site hoardings — the development as a product, not a plot number.'},
    {slot:'visitas',     h3:'Virtual tours',
     p:'The buyer walks the unit before it exists. Built for a sales meeting and for a link sent at a distance.'},
    {slot:'website',     h3:'Sales website',
     p:'Website and landing pages wired to the enquiry, so the material and the sale are the same system.'},
    {slot:'performance', h3:'Digital performance marketing', ph:'⟨Performance marketing⟩',
     p:'Google and Meta campaigns run against the launch, not against impressions. The enquiry is the number we report on.'},
    {slot:'video',       h3:'Video', ph:'⟨Video⟩',
     p:'Film and animated CGI for the launch — the piece that carries the development on a feed, where a still stops nobody.'}
  ],
  /* Contact details are pending for both pages and for the same reason: the
     number and the person who answers are still undecided. */
  contactoInfo: [
    ['WhatsApp',    '⟨number — pending⟩'],
    ['Email',       '⟨sales email⟩'],
    ['Answered by', '⟨name · role · response-time commitment⟩']
  ],
  obrigado: {
    h3: 'Thank you — that\'s with us.',
    p:  'We read every one of these ourselves. You\'ll hear back from a person, not an autoresponder.',
    nota:'⟨prototype — nothing was sent. Response-time commitment goes here once the sales team has agreed one.⟩'
  },
  notaPrivacidade: '⟨privacy line + link to the privacy policy — required before this page takes a single submission⟩'
};

const CONTEUDO = {

/* ══════════════════════════════════════════════════════════════════════
   ARQUITECTOS · ES — the page the campaign that will actually run needs.
   New on 18/08.

   ── Why this one and not the two built last week ───────────────────────
   Germany left on 17/08 and Spain took the whole ~70% budget
   (decisions/2026-08-17-espanha-substitui-meta-portugal). That decision left
   `lp-arquitetos-en.html` without a market and `lp-en.html` without a channel:
   neither of the two pages built last week serves the campaign that is going
   to run. This is the third, and it is copy over the shared body — which is
   what `assets/` was built for on 17/08.

   ── What is NOT a translation ──────────────────────────────────────────
   Five things changed on purpose, and each one has a reason in the build
   sheet (paid-advertising/imobiliario-es-google-search-build):

   1. THE H1 IS `Renders de Arquitectura`, not a rendering of «Architectural
      Visualisation». Spain does not say archviz — it says `render` and
      `infografía` (§6, the twelve keywords). `renders arquitectura` is B1's
      largest term at 720/mo, and the same two words read correctly to the
      geo groups too: the person typing `render 3d barcelona` is looking for
      exactly this. Message match is what the click is paying for.

   2. ONE PAGE FOR ALL FIVE AD GROUPS — no city variant in the H1 (§10). A
      server-rendered «Barcelona» would buy a little message match and cost
      five pages for 130 clicks. If any group ever earns its own page it will
      be Barcelona, and only with data.

   3. THE LOCAL-SUPPLIER OBJECTION IS ANSWERED IN THE FAQ, NOT IN THE
      HEADLINE (§8.1). Google puts a local pack on every commercial Spanish
      SERP, so the objection is real — but «internacional» raises it instead
      of settling it, and drops us in the cheap-offshore drawer on a SERP
      already full of AI and price questions. What the page says instead is
      the true, small thing: one hour away, on the clock and on a plane.
      ⚠️ The real answer to a local-pack market is a Google Business listing,
      which is not copy and is still 🟡 in §11.

   4. THE DEVELOPER LINE IN «Esto no es para ti» HAS NO LINK. On the English
      pages that last line is a signpost to the other page; in Spanish there
      is no other page, and the developer side is out of Spain by decision
      (research/2026-08-17-espanha-serp-e-concorrencia §6: `marketing
      inmobiliario` addresses estate agencies, ~70/30, not developers). It
      stays as a statement of scope, dead like the WhatsApp button — decided
      by António, 18/08.

   5. THE PRIVACY LINE NAMES RGPD AND LOPDGDD. Spain is EEA; §9.2 of the
      build sheet already makes Consent Mode v2 non-optional for measurement,
      and the same law governs the form.

   ── The three ⟨pendientes⟩ ─────────────────────────────────────────────
   🔴 Price per piece, revision rounds and competition turnaround are the
   three first questions this buyer asks, and all three are still commercial
   decisions (build sheet §0, §11 — due 21/08). They are ⟨pending⟩ here on
   purpose and visible in review. THIS PAGE DOES NOT GO LIVE WITHOUT THEM —
   and note the price block also gates the temporary price negatives of §7.2,
   which come off the account the day the answer exists.
   ══════════════════════════════════════════════════════════════════════ */
'arquitetos-es': {
  variante: 'arquitetos-es',

  ordem: ['hero','obra','servicos','contacto','qualificacao','faq','fecho'],

  /* Shared structure, Castilian wording. Everything not listed here falls
     back to COMUM, which is English — so anything added to COMUM later has to
     be added here too. That is the cost of one shared file for two languages,
     and it is cheaper than two files for one page. */
  comum: {
    navChamada:       'Reservar llamada',
    navWhatsapp:      'WhatsApp',
    ctaWhatsapp:      'Escríbenos por WhatsApp',
    ctaWhatsappCurto: 'WhatsApp',
    stickyChamada:    'Reservar llamada',
    rodape:           '© 2026 Viriato',
    rodapeLegal:      '<a href="#" class="ph">⟨Privacidad⟩</a> · <a href="#" class="ph">⟨Cookies⟩</a>',

    /* 🔴 All three pending, and the third is a launch blocker in its own
       right: nobody has been named to answer a Spanish lead, in Castilian,
       within an agreed time. Build sheet §11. */
    contactoInfo: [
      ['WhatsApp',    '⟨número — pendiente⟩'],
      ['Email',       '⟨email comercial⟩'],
      ['Te responde', '⟨nombre · cargo · compromiso de respuesta, en castellano⟩']
    ],

    obrigado: {
      h3: 'Gracias — ya está con nosotros.',
      p:  'Las leemos nosotros, una a una. Te contesta una persona, no un autorespondedor.',
      nota:'⟨prototipo — no se ha enviado nada. El compromiso de tiempo de respuesta va aquí en cuanto el comercial acuerde uno.⟩'
    },

    notaPrivacidade: '⟨aviso de privacidad + enlace a la política — RGPD y LOPDGDD. Obligatorio antes de que esta página reciba un solo envío.⟩',

    /* The same six as both English pages, in Castilian. The list is shared by
       decision of 17/08 and the reason holds here: every one of the six has
       media behind it in dados.js, so none of the grid is hatched.
       ⚠️ `Marketing de resultados`, never `marketing inmobiliario` — in Spain
       that term addresses estate agencies and this page speaks to an
       architect (build sheet §8, copy rule 3). */
    servicos: [
      {slot:'imagens',     h3:'Renders 3D',
       p:'Exteriores, interiores y vistas aéreas. CGI y fotografía con una sola dirección de arte, para que el proyecto no parezca de dos proveedores.'},
      {slot:'identidade',  h3:'Identidad e impresión',
       p:'Nombre, identidad, plantas, dosier y vallas de obra — la promoción como producto, no como número de parcela.'},
      {slot:'visitas',     h3:'Tours virtuales',
       p:'Se recorre la vivienda antes de que exista. Pensado para una reunión de venta y para un enlace enviado a distancia.'},
      {slot:'website',     h3:'Web de ventas',
       p:'Web y landing pages conectadas a la solicitud, para que el material y la venta sean el mismo sistema.'},
      {slot:'performance', h3:'Marketing de resultados', ph:'⟨Marketing de resultados⟩',
       p:'Campañas de Google y Meta contra el lanzamiento, no contra las impresiones. La solicitud es la cifra de la que informamos.'},
      {slot:'video',       h3:'Vídeo', ph:'⟨Vídeo⟩',
       p:'Película y CGI animado — la pieza que lleva la promoción en un feed, donde una imagen fija no detiene a nadie.'}
    ]
  },

  /* Interface strings. Eight of these were English inside lp.js until 18/08;
     see the note at the top of this file. */
  ui: {
    selecionar:     'Selecciona',
    anterior:       'Anterior',
    seguinte:       'Siguiente',
    honeypot:       'Deja esto vacío',
    filme:          'Película de apertura',
    obraExemplo:    'Promoción',
    obraNome:       '⟨Promoción⟩',
    obraLocal:      '⟨Ubicación⟩',
    painelCampanha: 'Panel de campaña',
    avisoWhatsapp:  'Prototipo — el número de WhatsApp y la persona que responde están todavía por definir.'
  },

  hero: {
    calmo: true,
    /* Three words, and they are the words the click was bought with —
       `renders arquitectura`, 720/mo, the largest term in group B1 and the
       one term that also reads right to Barcelona, Madrid and Valencia. See
       note 1 at the top of this variant. */
    h1: 'Renders de Arquitectura',
    /* The six services are the subtitle. Filled after the literal from
       `comum.servicos`, not typed again — the promoters' page still carries a
       strip of seven that are not its six below, and that mismatch exists
       precisely because the two lists were typed twice. */
    servicos: null,
    /* Matches the RSA line that will be bringing the traffic here —
       `Dinos tu Fecha de Entrega`, pinned in all five ad groups. */
    ctaChamada: 'Hablemos de la fecha',
    cue:     'Ver el trabajo',
    cueAlvo: '#work'
  },

  obra: {
    eyebrow: 'Trabajo seleccionado',
    /* An architect judging a visualiser is looking at one thing. */
    h2:      'Fíjate en la luz.',
    grande:  true,
    setas:   false,
    /* ⚠️ The work in dados.js is Portuguese — Algarve, Comporta. That is
       honest and it is what we have; it is also, on a page whose weakest
       point is «you are not from here», worth watching. If the term report
       shows real proximity demand (§8.1: `estudio`, `oficina`, `cerca de mí`)
       the answer is Iberian work in this band, not an adjective in a title. */
    nota:    '⟨n proyectos · n ciudades — el recuento real, de producción⟩'
  },

  servicos: {
    eyebrow: 'Qué producimos',
    h2: 'Seis cosas, y la imagen dice el resto.',
    cta: 'Ver servicio',
    /* 18/08 — the one variant with somewhere to send the click. `ctaAlvo` is a
       prefix and lp.js appends the card's `slot`, which is also the anchor id
       on servicios-es.html: one key for the copy, the media and the link.

       This closes the dead CTA of 17/08 («parece acionável e não é · ligar ou
       tirar antes de haver tráfego») on this page only. The two English pages
       have no services page, so they keep the inert <span> — an <a> that goes
       nowhere is worse than a label that never claimed to. */
    ctaAlvo: 'servicios-es.html#',
    numerado: true,
    cartoes: null   /* filled below from comum.servicos — see the line after CONTEUDO */
  },

  contacto: {
    eyebrow: 'Envíanos el proyecto',
    /* Word for word the fourth description of every RSA in the build sheet
       («Cuéntanos qué entregas y cuándo»). The visitor reads the same
       sentence in the ad and at the top of the form. */
    h2: 'Cuéntanos qué entregas y cuándo.',
    lead: 'La fecha es lo primero que decide si podemos ayudarte. Mándala con los planos y tendrás un sí o un no claro, no una propuesta a los tres días.',
    submit: 'Preguntar por la fecha',
    campos: [
      {id:'name',    label:'Nombre*',              req:true, auto:'name'},
      {id:'company', label:'Estudio*',             req:true, auto:'organization'},
      {id:'email',   label:'Email profesional*',   req:true, tipo:'email', auto:'email'},
      {id:'phone',   label:'Teléfono / WhatsApp',  tipo:'tel', auto:'tel'},
      /* Keeps the students and freelancers out of the sales inbox — the terms
         this campaign buys attract both, which is why §7.1 negatives `curso`,
         `máster`, `becas` and `prácticas` on day one. The field catches
         whoever gets through anyway. */
      {id:'role',    label:'Tu cargo', tipo:'select',
       opcoes:['Socio / dirección','Arquitecto de proyecto','Responsable de concursos','Visualizador interno','Estudiante','Otro']},
      {id:'country', label:'País del proyecto', placeholder:'España, Portugal, …'},
      {id:'project', label:'Proyecto y ubicación', full:true, placeholder:'Nombre del proyecto, ciudad'},
      /* What it is FOR changes the piece more than what it is OF: a
         competition board and a client presentation are the same building and
         not the same job. This is the field the estimate is built on. */
      {id:'purpose', label:'¿Para qué es?', tipo:'select',
       opcoes:['Concurso','Licencia de obra','Presentación a cliente','Portfolio del estudio','Marketing para la promotora','Otro']},
      {id:'deadline',label:'Fecha de entrega', tipo:'select',
       opcoes:['Menos de 2 semanas','2–4 semanas','1–2 meses','Más de 2 meses','Todavía sin fecha']},
      {id:'model',   label:'¿Qué nos puedes enviar?', full:true, tipo:'select',
       opcoes:['Revit','ArchiCAD','Rhino','SketchUp','3ds Max','Solo planos 2D','Nada modelado todavía']},
      {id:'need',    label:'¿Qué necesitas?', full:true, tipo:'textarea',
       placeholder:'Cuántas imágenes, en qué formato, y qué tiene que entender el jurado o el cliente.'}
    ]
  },

  qualificacao: {
    eyebrow: 'Encaje',
    h2: 'Merecemos tu tiempo si…',
    sim: {h3:'Esto es para ti', itens:[
      'Hay una entrega, un jurado o una reunión con cliente, y tiene fecha.',
      'Puedes enviarnos un modelo — Revit, ArchiCAD, Rhino, SketchUp — o un juego de planos completo.',
      'Quieres que la imagen sirva al proyecto, no que lo rescate.',
      'Una sola persona del estudio decide sobre las imágenes.',
      'El encargo es de <span class="ph">⟨mínimo — decisión comercial⟩</span> o más.'
    ]},
    /* The last line has no link, and that is the decision of 18/08: in
       Spanish there is no developer page to send anyone to, and the developer
       side is out of this market. A signpost pointing nowhere just loses the
       click — the same reasoning that put the link there on the English
       pages puts it away here. */
    nao: {h3:'Esto no es para ti', itens:[
      'La entrega es mañana. Preferimos decir que no antes que fallarte.',
      'El proyecto todavía se mueve por debajo del render.',
      'Compras solo por precio por imagen.',
      'Necesitas que alguien diseñe el edificio, o que termine de diseñarlo.',
      'Eres la promotora y lo que necesitas es el lanzamiento entero. Eso también lo hacemos, y no es esta página.'
    ]}
  },

  faq: {
    h2: 'Preguntas que hacen los estudios.',
    itens: [
      {q:'¿Qué necesitáis para empezar?',
       a:'El modelo en cualquiera de los formatos habituales, el juego de planos, y lo que ya tengáis decidido sobre materiales. Si el modelo todavía no está, los planos bastan para presupuestar — no bastan para empezar.'},
      {q:'¿Podéis llegar a la fecha de un concurso?',
       a:'⟨Plazos reales por pieza, y el punto a partir del cual dejamos de decir que sí — producción, a confirmar antes de que esta página reciba tráfico.⟩', ph:true},
      {q:'¿Cuántas rondas de revisión incluís?',
       a:'⟨Rondas de revisión por pieza y qué cuenta como ronda — decisión comercial. Es la primera pregunta de todos los estudios y la página no debería estar viva sin ella.⟩', ph:true},
      {q:'¿Trabajáis desde nuestro modelo o lo reconstruís?',
       a:'Desde el vuestro, siempre que sea utilizable — es vuestro edificio y la geometría ya está decidida. Lo que reconstruimos es lo que el render necesita y el modelo no lleva: contexto, vegetación, y todo lo que se dibujó como símbolo y no como cosa.'},
      {q:'¿Las imágenes son nuestras?',
       a:'⟨Propiedad de los archivos, fuentes 3D y licencia de imagen — dirección. Un estudio publica en premios y en prensa, que es una licencia más amplia que la que necesita una promotora.⟩', ph:true},
      {q:'¿Cuánto cuesta?',
       a:'⟨Precio por pieza y por paquete — decisión comercial, y la que esta página no puede abrir sin ella. Mientras siga pendiente, `precio`, `cuánto cuesta` y `tarifas` están negativizados en la cuenta (§7.2 de la hoja de construcción).⟩', ph:true},
      /* 🎯 THE ONE THAT MATTERS. Google shows a local pack on every commercial
         Spanish SERP, so the platform itself classifies these queries as
         local — the objection is real and it is not answered in a headline
         (build sheet §8.1). The answer is the true, small thing: one hour on
         the clock, and the same working day. What is still ⟨pending⟩ is the
         part that would settle it — who picks up, in Castilian, and when. */
      {q:'Estáis en Portugal. ¿Eso importa?',
       /* ⚠️ Every clause here is checkable. An earlier draft said «a una hora,
          en el reloj y en avión» — the clock is right and the flight is not
          (Lisbon–Barcelona is over two hours), and an invented number on the
          one answer whose whole job is credibility is the worst place to put
          one. What is left is the true part, and it is the part that matters:
          the same working day. */
       a:'Para el trabajo, no: el modelo llega igual desde Barcelona que desde Lisboa. Hay una hora de diferencia y la jornada es la misma — cuando escribes a media mañana, hay alguien delante. Importa para lo que haya que fotografiar en obra. <span class="ph">⟨quién atiende en castellano y en qué plazo · política de desplazamientos — comercial y operaciones⟩</span>'}
    ]
  },

  fecho: {h3:'¿Tienes una entrega cerca?', ctaChamada:'Hablemos de la fecha'}
}

};

/* The Castilian variant reads its own six services twice — once as the grid,
   once as the hero strip — the same way the English pages read COMUM's. It is
   wired here rather than inline because `comum` does not exist yet while the
   object literal is still being built. One list, two places, no drift. */
(function(){
  const es = CONTEUDO['arquitetos-es'];
  es.servicos.cartoes = es.comum.servicos;
  es.hero.servicos    = es.comum.servicos.map(s => s.h3);
})();
