/* ═══════════════════════════════════════════════════════════════════════
   THE BODY, ONCE — assembled from assets/conteudo.js

   The landing page is this file. The shell (lp-arquitetos-es.html) carries
   only what a server has to serve for itself — <title>, <meta description>,
   the robots tag, the fonts — plus one attribute, `data-variante`, which picks
   the object to build from. The file is written for more than one variant
   because it was: two English shells for Germany shared it until 17/08, and
   they are out of this handover. The mechanism stays — it costs nothing and a
   PT-PT instance is the next thing anyone will want.

   Follows the Format Displays prototype, for the reason that prototype gives:
   a campaign page is the same eight sections with different words in them, and
   the moment there are two files there are two places to fix a bug. What is
   here is structure; every string is in conteudo.js.

   Nothing in these template strings is escaped — the copy is ours, it is
   allowed to carry markup, and it is written with &amp; by hand.

   ── UI strings (18/08) ─────────────────────────────────────────────────
   The claim above — «every string is in conteudo.js» — was not true. Eight
   words lived here in English: the empty option on every dropdown, the two
   arrow labels, the honeypot label, the hero's placeholder caption, the three
   fallback work cards, and the WhatsApp prototype warning. In one language
   nobody notices; the moment a Castilian page reads this same file they are
   eight English words on a paid Spanish landing page.

   They now come from `COMUM.ui`, which a variant may override — same contract
   as every other piece of copy in this build. `UI` is resolved at the top
   rather than inside the IIFE because three of the consumers (the WhatsApp
   handler, the dashboard alt text, the video card) run outside it.
   ═══════════════════════════════════════════════════════════════════════ */
const VARIANTE=document.body.dataset.variante;
const UI=Object.assign({},
  (typeof COMUM!=='undefined'&&COMUM.ui)||{},
  (typeof CONTEUDO!=='undefined'&&CONTEUDO[VARIANTE]&&CONTEUDO[VARIANTE].ui)||{});

(function(){
  const variante=VARIANTE;
  const c=(typeof CONTEUDO!=='undefined')&&CONTEUDO[variante];
  /* Fail loudly and in the page. A silent empty body on a paid landing page is
     money on fire, and this is exactly the kind of break a rename causes.

     English on purpose, and the one string that stays: it fires precisely when
     there is no copy object to read a translation from, and the only person who
     can ever see it is whoever mistyped `data-variante`. */
  if(!c){
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="wrap" style="padding:120px 0"><h1>Missing copy</h1>'+
      '<p>No CONTEUDO entry for <code>data-variante="'+(variante||'')+'"</code>.</p></div>');
    return;
  }

  /* The shared block, with the variant's overrides on top (18/08). Until the
     Castilian page there was one language and `COMUM` could be read directly;
     the moment there are two, the nav labels, the footer, the contact block and
     the thank-you are shared in STRUCTURE and not in wording. A variant that
     overrides nothing gets exactly what it got before. */
  const COM=Object.assign({},COMUM,c.comum||{});

  const WA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5v-.5c-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>';
  const LOGO='<svg viewBox="0.2 0.1 125.5 130.9" fill="currentColor" aria-hidden="true" focusable="false"><path d="M73.1,26.8l33.3,14L95.1,55.9L73.1,26.8z M52.7,0.1L42.3,13.6L84.5,70l-31.1,41.3L11.2,55.1l-11,14.7L46,131h13.8l35.2-46.8 l20.4,26.5L125.7,97l-20-27l17.5-23.3l-5.9-20.5L52.7,0.1z"/></svg>';
  const SETA='<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h11M9 4l4 4-4 4"/></svg>';

  const btnWa=(rotulo,classe)=>
    '<a href="#" class="btn btn-wa'+(classe?' '+classe:'')+'" data-cta="whatsapp">'+WA+' '+rotulo+'</a>';
  const btnChamada=(rotulo,classe)=>
    '<a href="#contact" class="btn '+(classe||'btn-s')+'" data-cta="call">'+rotulo+'</a>';

  /* A section head. The nav for the carousel is the only thing that ever rides
     alongside one, and since 17/08 it sits under the heading rather than out at
     the right edge — see the centring block in lp.css. */
  const cabeca=(s,extra)=>
    '<div class="shead"><div>'+
      (s.eyebrow?'<div class="eyebrow">'+s.eyebrow+'</div>':'')+
      '<h2>'+s.h2+'</h2>'+
    '</div>'+(s.lead?'<p>'+s.lead+'</p>':'')+(extra||'')+'</div>';

  const campo=f=>{
    const id='f-'+f.id, cls=f.full?' class="f-full"':'';
    let ctrl;
    if(f.tipo==='select')
      ctrl='<select id="'+id+'" name="'+f.id+'"><option value="">'+UI.selecionar+'</option>'+
           f.opcoes.map(o=>'<option>'+o+'</option>').join('')+'</select>';
    else if(f.tipo==='textarea')
      ctrl='<textarea id="'+id+'" name="'+f.id+'"'+(f.placeholder?' placeholder="'+f.placeholder+'"':'')+'></textarea>';
    else
      ctrl='<input id="'+id+'" name="'+f.id+'"'+(f.tipo?' type="'+f.tipo+'"':'')+
           (f.req?' required':'')+(f.auto?' autocomplete="'+f.auto+'"':'')+
           (f.placeholder?' placeholder="'+f.placeholder+'"':'')+'>';
    return '<div'+cls+'><label for="'+id+'">'+f.label+'</label>'+ctrl+'</div>';
  };

  /* Each section is built on its own and the variant says which ones it wants
     and in what order (`c.ordem`). Copy alone stopped being enough on 17/08:
     the architects' page is not the promoters' page with different words in it,
     it leads with the work and carries less furniture — which is a difference
     in composition, not in wording. */
  const S={};

/* HERO — the H1 carries the words that bought the click. The strip under it is
   optional: it reads as a keyword list, and on the architects' page — where the
   whole argument is that the work speaks — it is the first thing to go. */
S.hero=()=>
'<section class="hero'+(c.hero.calmo?' calmo':'')+'">'+
  '<div class="bg"><div class="phbox">'+UI.filme+'</div></div>'+
  '<div class="veil"></div>'+
  '<div class="wrap">'+
    '<h1>'+c.hero.h1+'</h1>'+
    (c.hero.servicos&&c.hero.servicos.length
      ? '<ul class="hero-svc">'+c.hero.servicos.map(s=>'<li>'+s+'</li>').join('')+'</ul>' : '')+
    (c.hero.lead?'<p class="hero-lead">'+c.hero.lead+'</p>':'')+
    '<div class="ctas">'+btnWa(COM.ctaWhatsapp)+btnChamada(c.hero.ctaChamada)+'</div>'+
  '</div>'+
  '<a href="'+c.hero.cueAlvo+'" class="scroll-cue" aria-label="'+c.hero.cue+'"><span class="rail"></span>'+c.hero.cue+'</a>'+
'</section>';

/* SERVICES — on traffic bought with component words the click arrives asking
   what the service is. `numerado` is the archviz-studio treatment: an index
   number, a name, one line, and the picture doing the rest. */
S.servicos=()=>
'<section class="sec'+(c.servicos.numerado?' tight':'')+'" id="services">'+
  '<div class="wrap">'+cabeca(c.servicos)+
    '<div class="comps'+(c.servicos.numerado?' numerado':'')+'">'+c.servicos.cartoes.map((k,i)=>
      '<div class="compc">'+
        '<div class="thumb" data-slot="'+k.slot+'"><div class="phbox'+(k.ph?' ph':'')+'">'+(k.ph||k.h3)+'</div></div>'+
        '<div class="body">'+
          (c.servicos.numerado?'<span class="cnum">('+String(i+1).padStart(3,'0')+')</span>':'')+
          '<h3>'+k.h3+'</h3><p>'+k.p+'</p>'+
          /* O CTA do cartão nasceu inerte a 17/08 — «parece acionável e não
             é», com a consequência escrita de «ligar ou tirar antes de haver
             tráfego». Desde 18/08 liga-se sozinho onde há destino: uma
             variante que declare `ctaAlvo` recebe um <a> para
             `ctaAlvo + slot`; as outras continuam a receber o <span>, porque
             um <a> para lado nenhum é o clique morto que as setas do
             carrossel já tinham obrigado a corrigir. */
          (c.servicos.ctaAlvo
            ? '<a class="ccta" href="'+c.servicos.ctaAlvo+k.slot+'">'+c.servicos.cta+' '+SETA+'</a>'
            : '<span class="ccta">'+c.servicos.cta+' '+SETA+'</span>')+
        '</div>'+
      '</div>').join('')+
    '</div>'+
  '</div>'+
'</section>';

/* WORK — filled from dados.js; the three cards below are the fallback that
   shows when no media is present. */
S.obra=()=>
'<section class="sec'+(c.obra.grande?' tight obra-grande':' tight')+'" id="work">'+
  '<div class="wrap">'+
    /* The arrows go where the band is: it is dragged, and a pair of buttons
       above a thing you already grabbed is furniture. Everything that drives
       them is guarded on their existence, so leaving them out is safe. */
    cabeca(c.obra,c.obra.setas===false?'':
      '<div class="sheadr"><div class="cnav">'+
      '<button class="cbtn" data-dir="-1" aria-label="'+UI.anterior+'">←</button>'+
      '<button class="cbtn" data-dir="1" aria-label="'+UI.seguinte+'">→</button></div></div>')+
    /* the .ph dash belongs to the text, not to the paragraph — on a block it
       draws a rule the width of the page and reads as a divider */
    (c.obra.nota?'<p class="obra-nota"><span class="ph">'+c.obra.nota+'</span></p>':'')+
    '<div class="cases'+(c.obra.grande?' grande':'')+'" id="work-rail">'+
      [1,2,3].map(n=>'<div class="case"><div class="phbox">'+UI.obraExemplo+' 0'+n+'</div>'+
        '<div class="cbody"><h3 class="ph">'+UI.obraNome+'</h3><div class="cmeta"><span class="ph">'+UI.obraLocal+'</span></div></div></div>').join('')+
    '</div>'+
  '</div>'+
'</section>';

/* POSITIONING — the one prose block either page gets, and the section where
   the two audiences disagree most: one is sold a decision, the other is sold
   the reading of a drawing. */
S.posicionamento=()=>
'<section class="sec pos sec-grafismo">'+
  '<div class="wrap">'+cabeca(c.posicionamento)+
    '<ul class="vs">'+c.posicionamento.linhas.map(l=>
      '<li'+(l.nos?' class="us"':'')+'><span class="who">'+l.quem+'</span><span class="them">'+l.diz+'</span></li>').join('')+
    '</ul>'+
  '</div>'+
'</section>';

/* FORM — mid-page and repeated at the close, the way Insca runs it in all five
   languages: the qualification lives in the fields, not in a follow-up call. */
S.contacto=()=>
'<section class="sec contact sec-claro" id="contact">'+
  '<div class="wrap cgrid">'+
    '<div>'+
      '<div class="eyebrow">'+c.contacto.eyebrow+'</div>'+
      '<h2 style="margin-bottom:16px">'+c.contacto.h2+'</h2>'+
      '<p>'+c.contacto.lead+'</p>'+
      '<div class="cinfo">'+COM.contactoInfo.map(([r,v])=>
        '<div><span>'+r+'</span><span class="ph">'+v+'</span></div>').join('')+'</div>'+
    '</div>'+
    '<form data-form="lead">'+
      c.contacto.campos.map(campo).join('')+
      '<div class="hp"><label for="f-website">'+UI.honeypot+'</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>'+
      '<div class="f-full"><button class="btn btn-p fsub" style="width:100%;justify-content:center">'+
        '<span class="rotulo">'+c.contacto.submit+'</span>'+
        '<span class="pendente" aria-hidden="true"><i></i></span>'+
      '</button></div>'+
      '<p class="fnote ph">'+COM.notaPrivacidade+'</p>'+
    '</form>'+
    /* aria-live for whoever does not see the swap happen: without it a screen
       reader is left in a form that is no longer there. */
    '<div class="obrigado" role="status" aria-live="polite">'+
      '<h3>'+COM.obrigado.h3+'</h3><p>'+COM.obrigado.p+'</p>'+
      '<p style="margin-top:14px" class="ph">'+COM.obrigado.nota+'</p>'+
    '</div>'+
  '</div>'+
'</section>';

/* PROCESS — four paragraphs on the promoters' page, where the reader is buying
   a way of working. `linha` compresses it to a strip of four labels: an
   architect commissioning a render does not need the method explained, and no
   studio they respect explains it. */
S.processo=()=>
'<section class="sec tight">'+
  '<div class="wrap">'+cabeca(c.processo)+
    '<div class="steps'+(c.processo.linha?' linha':'')+'">'+c.processo.passos.map(p=>
      '<div class="step"><span class="num">'+p.n+'</span><h3>'+p.h3+'</h3>'+
      (p.p?'<p>'+p.p+'</p>':'')+'</div>').join('')+
    '</div>'+
  '</div>'+
'</section>';

/* QUALIFICATION — kept deliberately: with WhatsApp as the primary CTA the
   friction is near zero, and a page that filters nobody hands the sales team a
   list nobody wants to call. Since 17/08 the last line of the not-for-you
   column is a link to the other page rather than a door closing. */
S.qualificacao=()=>
'<section class="sec">'+
  '<div class="wrap">'+cabeca(c.qualificacao)+
    '<div class="qual">'+
      '<div class="qcol yes"><h3>'+c.qualificacao.sim.h3+'</h3><ul>'+
        c.qualificacao.sim.itens.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>'+
      '<div class="qcol"><h3>'+c.qualificacao.nao.h3+'</h3><ul>'+
        c.qualificacao.nao.itens.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>'+
    '</div>'+
  '</div>'+
'</section>';

S.faq=()=>
'<section class="sec tight">'+
  '<div class="wrap">'+cabeca(c.faq)+
    '<div class="faq">'+c.faq.itens.map(f=>
      '<details><summary>'+f.q+'</summary><div class="ans'+(f.ph?' ph':'')+'">'+f.a+'</div></details>').join('')+
    '</div>'+
  '</div>'+
'</section>';

S.fecho=()=>
'<section class="sec tight">'+
  '<div class="wrap"><div class="cta-band">'+
    '<h3>'+c.fecho.h3+'</h3>'+
    /* The closing band wants the short label. It used to get it by stripping
       'Message us on ' off the long one — which is a sentence in English
       pretending to be a rule, and returns the whole string untouched in any
       other language. It is now its own piece of copy. */
    '<div class="ctas">'+btnWa(COM.ctaWhatsappCurto||COM.navWhatsapp)+btnChamada(c.fecho.ctaChamada,'btn-p')+'</div>'+
  '</div></div>'+
'</section>';

  /* The order is the variant's, and a name that is not in S is a typo worth
     hearing about rather than a section that silently vanishes.

     Built lazily, one function per section, so that dropping a section from a
     variant means dropping its copy too: a section left out of `ordem` is never
     called, and never reaches into a `c.<name>` that is no longer there. */
  const PADRAO=['hero','servicos','obra','posicionamento','contacto','processo','qualificacao','faq','fecho'];
  const pedida=c.ordem||PADRAO;
  const faltam=pedida.filter(n=>!S[n]);
  if(faltam.length)console.warn('lp.js: no section named',faltam.join(', '));
  /* Every section name is also the name of its copy, so a variant drops a
     section by dropping its copy — there is no second place to remember. The
     warning above still fires for a name that matches no builder at all, which
     is a typo; a name with a builder and no copy is a deliberate omission. */
  const ordem=pedida.filter(n=>S[n]&&c[n]);

  const corpo=
'<header>'+
  '<div class="wrap nav">'+
    '<span class="logo" role="img" aria-label="Viriato">'+LOGO+'</span>'+
    '<div class="navr">'+btnChamada(COM.navChamada,'btn-s btn-sm')+btnWa(COM.navWhatsapp,'btn-sm')+'</div>'+
  '</div>'+
'</header>'+
'<main>'+ordem.map(n=>S[n]?S[n]():'').join('')+'</main>'+
'<footer><div class="wrap fbot"><span>'+COM.rodape+'</span><span>'+COM.rodapeLegal+'</span></div></footer>'+
/* mobile only */
'<div class="sticky">'+btnChamada(COM.stickyChamada)+btnWa(COM.navWhatsapp)+'</div>';

  document.body.insertAdjacentHTML('afterbegin',corpo);
})();

/* ---- smooth scroll (Lenis) ---- */
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
let lenis=null;
if(!reduced&&window.Lenis){
  lenis=new Lenis({duration:1.1,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
  const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};
  requestAnimationFrame(raf);
}
function smoothScrollTo(target){
  if(lenis)lenis.scrollTo(target);
  else target.scrollIntoView({behavior:reduced?'auto':'smooth'});
}
/* Horizontal gestures inside the carousel must reach the browser, not Lenis. */
document.querySelectorAll('.cases').forEach(track=>{
  track.addEventListener('wheel',e=>{
    if(Math.abs(e.deltaX)>Math.abs(e.deltaY))e.stopPropagation();
  },{capture:true});
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  const sel=a.getAttribute('href');
  if(sel==='#')return;
  a.addEventListener('click',e=>{
    const target=document.querySelector(sel);
    if(!target)return;
    e.preventDefault();
    smoothScrollTo(target);
  });
});

/* ---- FAQ: <details> doesn't animate on its own ---- */
document.querySelectorAll('.faq details').forEach(d=>{
  const summary=d.querySelector('summary'),panel=d.querySelector('.ans');
  if(!summary||!panel)return;
  summary.addEventListener('click',e=>{
    if(reduced)return;
    e.preventDefault();
    if(d.dataset.busy)return;
    d.dataset.busy='1';
    const opening=!d.open;
    if(opening)d.open=true;
    const full=panel.getBoundingClientRect().height;
    const pad=getComputedStyle(panel).paddingBottom;
    panel.style.overflow='hidden';
    const anim=panel.animate({
      height:opening?['0px',full+'px']:[full+'px','0px'],
      paddingBottom:opening?['0px',pad]:[pad,'0px'],
      opacity:opening?[0,1]:[1,0]
    },{duration:opening?340:250,easing:'cubic-bezier(.23,1,.32,1)',fill:'forwards'});
    anim.onfinish=()=>{
      if(!opening)d.open=false;
      anim.cancel();
      panel.style.overflow='';panel.style.height='';panel.style.paddingBottom='';
      delete d.dataset.busy;
    };
  });
});

/* ---- carousel arrows ----
   Além de andar, as setas passam a saber quando não há para onde. A sincronia
   corre no scroll (passivo — não bloqueia o gesto), no resize, e outra vez
   depois de os cartões reais entrarem, que acontece mais abaixo neste script. */
function sincronizarSetas(track){
  const sec=track.closest('section'); if(!sec)return;
  const [ant,seg]=sec.querySelectorAll('.cbtn'); if(!ant||!seg)return;
  const fim=track.scrollWidth-track.clientWidth;
  ant.disabled=track.scrollLeft<=1;
  // -1 de folga: com scroll-snap e larguras fracionárias o scrollLeft final
  // fica meio pixel abaixo do máximo e o botão nunca chegava a desligar
  seg.disabled=track.scrollLeft>=fim-1;
}
document.querySelectorAll('.cases').forEach(track=>{
  track.addEventListener('scroll',()=>sincronizarSetas(track),{passive:true});
  addEventListener('resize',()=>sincronizarSetas(track));
  sincronizarSetas(track);
});
document.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>{
  const track=b.closest('section').querySelector('.cases');
  const slide=track.querySelector('.case');
  if(!slide)return;
  track.scrollBy({left:(slide.getBoundingClientRect().width+16)*Number(b.dataset.dir),behavior:'smooth'});
});

/* ---- CTAs ------------------------------------------------------------
   Placeholders on purpose, and loud about it. A wa.me link needs a real
   number and a real person behind it; the vault has had "who answers
   WhatsApp, and how fast" open as a launch blocker since 10/08. Wiring a
   plausible-looking number here would hide that, and could send a stranger
   a message. Same for the booking link. Both stay dead until the number,
   the owner and the response-time commitment exist.
   ------------------------------------------------------------------- */
document.querySelectorAll('[data-cta="whatsapp"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    alert(UI.avisoWhatsapp);
  });
});

/* ---- form ----
   O envio a sério ainda não existe: falta o handover server-side para o CRM.
   O que existe já é o percurso — pendente, depois confirmação — porque é isso
   que tem de estar desenhado antes de se ligar o endpoint, e não depois.
   Quando o endpoint chegar, troca-se o espera() pelo fetch e mais nada. */
const form=document.querySelector('[data-form="lead"]');
const bloco=form&&form.closest('.cgrid');
if(form)form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(bloco.classList.contains('form-envia'))return;   // trava o segundo clique
  bloco.classList.add('form-envia');
  await new Promise(r=>setTimeout(r,reduced?350:900));
  bloco.classList.remove('form-envia');
  bloco.classList.add('form-feito');
  /* leva o foco para a confirmação — sem isto o teclado fica preso num
     formulário que já não está no ecrã */
  const ok=bloco.querySelector('.obrigado');
  ok.setAttribute('tabindex','-1'); ok.focus({preventScroll:true});
});

/* ═══════════════════════════════════════════════════════════════════════
   DATA → PAGE
   Same contract as the sector prototype: a slot is only replaced when the
   file actually exists. No dados.js, empty PROJETOS or missing media and
   the placeholder stays — the page never shows a broken image.
   ═══════════════════════════════════════════════════════════════════════ */
const DADOS=(typeof PROJETOS!=='undefined'&&PROJETOS)||[];
const CFG=(typeof SETOR!=='undefined'&&SETOR)||{};

/* ── Destaques da campanha ───────────────────────────────────────────────
   Que empreendimento ocupa os lugares que valem mais: o primeiro cartão da
   obra e cada miniatura de componente. É escolha editorial da campanha e vive
   aqui, não no `ordem` do projeto.json — esse é ordem de arquivo e comanda os
   carrosséis da página de setor. Mexer lá para acertar aqui arrastava a outra
   página atrás.

   Um slug que não exista, ou que não tenha o media preciso, é ignorado sem
   ruído e o lugar volta à ordem normal. */
const DESTAQUE={
  obra:      'va-villa-heaven-vale-do-lobo',   // 1.º cartão de «Selected work»
  imagens:   'vanguard-comporta',              // miniatura de «3D visualisation»
};

function pintar(box,src,m34,alt){
  if(!box||!src)return false;
  const pic=document.createElement('picture');
  if(m34){const s=document.createElement('source');s.media='(max-width:1000px)';s.srcset=m34;pic.appendChild(s)}
  const i=document.createElement('img');
  i.src=src;i.alt=alt||'';i.loading='lazy';i.decoding='async';
  pic.appendChild(i);
  box.classList.add('tem-media');box.textContent='';box.appendChild(pic);
  return true;
}
const CODEC={av1:'video/mp4; codecs="av01.0.09M.08"',h264:'video/mp4; codecs="avc1.640028"'};
const olhoVideo=new IntersectionObserver(es=>es.forEach(e=>{
  if(reduced)return;
  if(e.isIntersecting)e.target.play().catch(()=>{});
  else e.target.pause();
}),{threshold:.25});
function pintarVideo(box,fontes,poster,alt){
  const uteis=fontes.filter(f=>f&&f.src);
  if(!box||!uteis.length)return false;
  const v=document.createElement('video');
  v.muted=v.loop=v.playsInline=true;
  v.setAttribute('aria-label',alt||'');
  v.preload='metadata';
  if(poster)v.poster=poster;
  uteis.forEach(f=>{const s=document.createElement('source');s.src=f.src;s.type=f.type;v.appendChild(s)});
  /* entra em fade em vez de cortar do gradiente para o frame 0 */
  v.classList.add('a-entrar');
  v.addEventListener('loadeddata',()=>v.classList.add('pronto'),{once:true});
  box.classList.add('tem-media');box.textContent='';box.appendChild(v);
  olhoVideo.observe(v);
  return true;
}

/* ── hero ── */
(function(){
  const box=document.querySelector('.hero .bg .phbox');
  if(!box)return;
  if(CFG.heroVideo){
    const v=document.createElement('video');
    v.autoplay=v.muted=v.loop=v.playsInline=true;
    if(CFG.heroPoster)v.poster=CFG.heroPoster;
    if(CFG.heroWebm){const s=document.createElement('source');s.src=CFG.heroWebm;s.type='video/webm';v.appendChild(s)}
    const s=document.createElement('source');s.src=CFG.heroVideo;s.type='video/mp4';v.appendChild(s);
    box.classList.add('tem-media');box.textContent='';box.appendChild(v);
  } else pintar(box,CFG.heroPoster,CFG.heroPoster34,'');
})();

/* ── work rail ──
   Everything marked as an image project, deduplicated by slug. No case
   pages on a campaign page, so the cards are <div> and not <a>: a card that
   looks clickable and goes nowhere costs more than a card that doesn't. */
(function(){
  const track=document.getElementById('work-rail');
  if(!track)return;
  const lista=DADOS.filter(p=>p.aparece_em&&p.aparece_em.imagens&&p.media&&p.media.card16);
  if(!lista.length)return;                 // no data: the three examples stay
  /* o destaque sobe ao primeiro lugar; os outros mantêm a ordem entre si */
  const i=lista.findIndex(p=>p.slug===DESTAQUE.obra);
  if(i>0)lista.unshift(lista.splice(i,1)[0]);
  track.textContent='';
  lista.forEach(p=>{
    const el=document.createElement('div');
    el.className='case';
    el.innerHTML='<div class="phbox"></div><div class="cbody"><h3></h3><div class="cmeta"><span></span></div></div>';
    el.querySelector('h3').textContent=p.nome||p.slug;
    el.querySelector('.cmeta span').textContent=[p.localizacao,(p.ficha||{}).promotor].filter(Boolean).join(' · ');
    pintar(el.querySelector('.phbox'),p.media.card16,p.media.card34,p.nome);
    track.appendChild(el);
  });
  /* os cartões só existem agora, por isso a largura do rail acabou de mudar —
     as setas têm de voltar a decidir se estão numa ponta */
  sincronizarSetas(track);
})();

/* ── entrada do hero ──
   Espera pelo primeiro frame do filme para o texto pousar por cima de imagem
   e não de um rectângulo vazio. O timeout é a rede de segurança: com o vídeo
   em cache o loadeddata pode já ter passado, e numa ligação má não se deixa
   o hero escondido à espera dele. O que vier primeiro ganha. */
(function(){
  const hero=document.querySelector('.hero'); if(!hero)return;
  const abrir=()=>hero.classList.add('pronto');
  const v=hero.querySelector('video');
  if(v&&v.readyState<2)v.addEventListener('loadeddata',()=>setTimeout(abrir,150),{once:true});
  else requestAnimationFrame(abrir);
  setTimeout(abrir,1200);
})();

/* ── barra fixa do telemóvel ──
   Entra quando o hero sai do ecrã. Enquanto o hero está à vista os dois CTA
   dele já estão à mão e a barra só duplicava o WhatsApp e tapava conteúdo. */
(function(){
  const barra=document.querySelector('.sticky'),hero=document.querySelector('.hero');
  if(!barra||!hero)return;
  new IntersectionObserver(([e])=>barra.classList.toggle('on',!e.isIntersecting),
    {threshold:0}).observe(hero);
})();

/* ── component thumbnails ──
   Each card borrows the first development that carries that component. The
   virtual tour takes its video, for the same reason the sector page does:
   the movement is the piece. */
(function(){
  document.querySelectorAll('.compc .thumb').forEach(slot=>{
    const tipo=slot.dataset.slot;
    const temComponente=x=>x.aparece_em&&x.aparece_em[tipo];
    /* destaque primeiro; se não houver, ou se o escolhido não tiver este
       componente, cai no primeiro da lista como antes */
    const p=DADOS.find(x=>x.slug===DESTAQUE[tipo]&&temComponente(x))
          ||DADOS.find(temComponente);
    if(!p)return;
    const m=p.media||{},box=slot.querySelector('.phbox');
    const proprio={identidade:['ident16','ident34'],website:['web16','web34']}[tipo];
    const c16=(proprio&&m[proprio[0]])?m[proprio[0]]:m.card16;
    const c34=(proprio&&m[proprio[1]])?m[proprio[1]]:m.card34;
    /* Three of the four accept video, and for the same reason: the movement is
       the piece. A tour is walking the house, a brochure is being leafed, a
       website is being scrolled — still, each one is just a photograph of a
       thing. `fallback:false` on the website says: if there is no first-frame
       poster, use none. The others can fall back to their own still, but the
       website's nearest still is a photo of the villa, and flashing that before
       a recording of a web page is a worse jump than a moment of empty box. */
    const FILME={visitas:{av1:m.visitaAv1,h264:m.visitaMp4,poster:m.visitaPoster},
                 identidade:{av1:m.identAv1,h264:m.identMp4},
                 website:{av1:m.webAv1,h264:m.webMp4,poster:m.webPoster,fallback:false}}[tipo];
    const video=FILME&&pintarVideo(box,
      [{src:FILME.av1,type:CODEC.av1},{src:FILME.h264,type:CODEC.h264}],
      FILME.poster||(FILME.fallback===false?null:c16),p.nome);
    if(!video)pintar(box,c16,c34,p.nome);
  });
})();

/* ── the performance card ──
   The only picture on the page that is not Viriato's own work: no development
   is tagged with this component, so there is nothing of ours to show. Stock,
   from Unsplash, and chosen for what is legible on the screen — CTR, cost per
   conversion, quality score — so the card is read by its numbers rather than
   by the desk it sits on. Replace it with a real campaign dashboard as soon as
   one can be shown, and this line does not change: it reads from SETOR. */
(function(){
  const box=document.querySelector('.compc .thumb[data-slot="performance"] .phbox');
  if(!box||!CFG.servicoPerformance)return;
  if(pintar(box,CFG.servicoPerformance,null,UI.painelCampanha))box.classList.remove('ph');
})();

/* ── the video card ──
   It points at the hero reel rather than carrying a cut of its own: no trimmed
   derivative to regenerate when the reel is re-cut, and nothing new to add to
   the served media. It is a second <video> on the same URL, so it does
   issue its own request — `preload=metadata` keeps that to the header until
   the card is scrolled to, and past that it is the CDN's cache policy, not
   this page, that decides whether any bytes move. Locally it is a second full
   200: python's http.server serves no cache policy and no ranges.

   What it does not borrow is the length: 17 s is a reel, and this is a
   thumbnail. It loops the opening CORTE seconds, which is where the film
   establishes the development before it starts moving through it. The reset
   rides on `loop`, already set by pintarVideo, and olhoVideo still pauses the
   whole thing off-screen and leaves it on the poster under reduced motion.

   A cut of its own would be the lighter answer on a phone — 8.6 MB of 1920×1080
   to fill a 400px box is the cost of not having one. When it exists, put it in
   SETOR and this block reads it instead: the hero file is the stand-in. */
(function(){
  const CORTE=6;
  const box=document.querySelector('.compc .thumb[data-slot="video"] .phbox');
  if(!box||!CFG.heroVideo)return;
  if(!pintarVideo(box,[{src:CFG.heroVideo,type:CODEC.h264}],CFG.heroPoster,UI.filme))return;
  box.classList.remove('ph');
  const v=box.querySelector('video');
  v.addEventListener('timeupdate',()=>{if(v.currentTime>=CORTE)v.currentTime=0});
})();

/* ── the work band ──
   Runs last: the rail it works on is filled from dados.js above, and this needs
   the real cards, not the three fallbacks.

   Four behaviours, and they are all one idea — the band has exactly one card in
   the middle, and everything is a way of choosing it:

   · it CYCLES, by holding three copies of the set and jumping the scroll
     position back by one set whenever it drifts out of the middle one. The jump
     is invisible because what is either side of it is identical. That is what
     lets the first card open in the centre with something already to its left;
   · a side card CENTRES when clicked;
   · a drag settles onto the nearest card when the mouse is RELEASED, and not
     before — resizing cards under a moving hand was the thing that read wrong;
   · a wheel or trackpad settles the same way, once it stops.

   Native scroll-snap is off for this band. Every one of the above ends in a
   scrollTo, and snap spent its time arguing with them. */
document.querySelectorAll('.cases.grande').forEach(faixa=>{
  const originais=[...faixa.querySelectorAll('.case')];
  if(!originais.length)return;

  /* Three copies, so there is always a set either side to jump into. Below
     three cards it is not worth it — and with one or two the clones would be
     visible as repeats inside a single screen. */
  const ciclico=originais.length>=3;
  if(ciclico){
    const copiar=c=>{const k=c.cloneNode(true);k.dataset.copia='1';k.setAttribute('aria-hidden','true');return k};
    originais.forEach(c=>faixa.appendChild(copiar(c)));
    [...originais].reverse().forEach(c=>faixa.insertBefore(copiar(c),faixa.firstChild));
  }
  const todos=()=>[...faixa.querySelectorAll('.case')];
  /* The real set sits in the middle; this is the card the page opens on. On the
     architects' page dados.js has already hoisted DESTAQUE.obra to the front,
     so the first real card is the featured development. */
  const inicial=()=>todos()[ciclico?originais.length:0];

  let conjunto=0;
  const medir=()=>{
    const t=todos();
    conjunto=ciclico?t[originais.length].offsetLeft-t[0].offsetLeft:0;
  };

  const alvoDe=c=>c.offsetLeft-(faixa.clientWidth-c.offsetWidth)/2;

  const marcar=c=>todos().forEach(x=>x.classList.toggle('no-centro',x===c));

  const maisPerto=()=>{
    const r=faixa.getBoundingClientRect(), meio=r.left+r.width/2;
    let escolhido=null, melhor=Infinity;
    todos().forEach(c=>{
      const cr=c.getBoundingClientRect();
      const d=Math.abs(cr.left+cr.width/2-meio);
      if(d<melhor){melhor=d;escolhido=c}
    });
    return escolhido;
  };

  /* Jump back into the middle set once the band has drifted half a set out of
     it. Returns how far it moved, because a drag in progress has to have its
     own origin shifted by the same amount or the card would leap under the
     hand. */
  const reciclar=()=>{
    if(!ciclico||!conjunto)return 0;
    let d=0;
    if(faixa.scrollLeft<conjunto*0.5)d=conjunto;
    else if(faixa.scrollLeft>conjunto*1.5)d=-conjunto;
    if(d)faixa.scrollLeft+=d;
    return d;
  };

  let animando=null;
  const centrar=(c,suave)=>{
    if(!c)return;
    marcar(c);                       /* the size change starts with the move */
    const alvo=alvoDe(c);
    if(suave&&!reduced){
      faixa.scrollTo({left:alvo,behavior:'smooth'});
      clearTimeout(animando);
      /* Held for the length of the smooth scroll so nothing re-centres under
         it; the recycle waits until it has landed. */
      animando=setTimeout(()=>{animando=null;reciclar()},560);
    }else{
      faixa.scrollLeft=alvo;
      reciclar();
    }
  };

  let arrastando=false, xInicio=0, scrollInicio=0, percorrido=0, assentar=null;

  faixa.addEventListener('scroll',()=>{
    if(arrastando){reciclar();return}      /* no re-marking under a moving hand */
    if(animando)return;
    /* wheel or trackpad: settle once it has stopped */
    clearTimeout(assentar);
    assentar=setTimeout(()=>{reciclar();centrar(maisPerto(),true)},140);
  },{passive:true});

  addEventListener('resize',()=>{medir();centrar(maisPerto(),false)});

  faixa.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse'||e.button!==0)return;
    arrastando=true; percorrido=0;
    xInicio=e.clientX; scrollInicio=faixa.scrollLeft;
    clearTimeout(assentar); clearTimeout(animando); animando=null;
    faixa.classList.add('a-arrastar');
    faixa.setPointerCapture(e.pointerId);
  });
  faixa.addEventListener('pointermove',e=>{
    if(!arrastando)return;
    e.preventDefault();
    const dx=e.clientX-xInicio;
    percorrido=Math.max(percorrido,Math.abs(dx));
    faixa.scrollLeft=scrollInicio-dx;
    scrollInicio+=reciclar();        /* keep the origin with the content */
  });
  const largar=e=>{
    if(!arrastando)return;
    arrastando=false;
    faixa.classList.remove('a-arrastar');
    try{faixa.releasePointerCapture(e.pointerId)}catch(_){}
    centrar(maisPerto(),true);       /* the one moment the sizes change */
  };
  faixa.addEventListener('pointerup',largar);
  faixa.addEventListener('pointercancel',largar);
  faixa.addEventListener('dragstart',e=>e.preventDefault());

  /* Click a side card to bring it in. Guarded on distance travelled: the end of
     a drag is also a click, and without this every drag would be followed by
     the band sliding somewhere nobody asked for. */
  faixa.addEventListener('click',e=>{
    if(percorrido>6){percorrido=0;return}
    const c=e.target.closest('.case');
    if(c&&!c.classList.contains('no-centro'))centrar(c,true);
  });

  medir();
  centrar(inicial(),false);
});
