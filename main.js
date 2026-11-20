/* ============ CONFIGURAÇÃO — ajuste nomes de arquivos aqui ============ */
const CONTACT_EMAIL = "contato@seudominio.com.br"; // TROCAR pelo e-mail real do Hebert

const WHATSAPP_NUMBER = "";  // TROCAR: DDI+DDD+número, ex.: "5571999999999"

// Vídeos do showreel (relativos à pasta do projeto). Os maiores ficam por último.
const REEL = [
  "Ativação de Marca.mov",
  "ATIVAÇÃO DE MARCA (DIA DI CLIENTE).mp4",
  "Vídeo 2  MATHEUS .mp4",
  "SaveClip.App_AQNKTxgPIbdF5qvb_bw04KaEiLlHPOYLrn46yubNGw15labdM9gULIQUOqaWyVslZRXMo2zibXdonHUa92eDGYivMZTt87fauFklANE.mp4",
  "Criativo Nicolas.MOV",
  "FILME VIT X FLU 06.11.MOV",
  "Video 2.mov",
  "ITAÚ - MODO PROTEGIDO v1.mp4"
];
const REEL_SECONDS = 6;                 // tempo de cada cena
const ACTIVATION_VIDEO = "ATIVAÇÃO DE MARCA (DIA DI CLIENTE).mp4";

// Cases. `video` é opcional (nome do arquivo na pasta do projeto).
const CASES = [
  { id:"toyota", name:"Toyota · Terra Forte", cat:"auto", tag:"Automotivo · Ativação", short:"Presença digital e ação “Toyota na Bon Odori”.",
    text:"Atuação estratégica de posicionamento e presença de marca para a concessionária Terra Forte Toyota, incluindo a ativação Toyota na Bon Odori, conectando a marca à cultura local.",
    tags:["Branding","Ativação","Conteúdo","Social Media"], video:"Criativo Nicolas.MOV" },
  { id:"lexus", name:"Lexus Salvador", cat:"auto", tag:"Automotivo · Premium", short:"Viva essa experiência de Ser Lexus.",
    text:"Posicionamento premium e experiência de marca: conteúdo que traduz o universo Lexus, com crescimento orgânico acelerado e performance de engajamento acompanhada por KPIs.",
    tags:["Posicionamento","Crescimento orgânico","KPIs","Conteúdo"], video:"Video 2.mov" },
  { id:"danone", name:"Danone · Super Bahia 2025", cat:"ativacao", tag:"Ativação · Evento", short:"Presença de marca no Super Bahia 2025.",
    text:"Ativação de marca e presença em evento, levando a Danone ao encontro do público e transformando a experiência presencial em conteúdo.",
    tags:["Live marketing","Ativação","Storytelling"], video:"ATIVAÇÃO DE MARCA (DIA DI CLIENTE).mp4" },
  { id:"itau", name:"Itaú", cat:"financeiro", tag:"Financeiro · Conteúdo", short:"Conteúdo estratégico e campanha digital.",
    text:"Produção de conteúdo e campanha digital com roteirização e storytelling, integrando marketing, produto e comunicação.",
    tags:["Campanha","Roteirização","Conteúdo"], video:"ITAÚ - MODO PROTEGIDO v1.mp4" },
  { id:"vw", name:"Grande Belém Volkswagen", cat:"auto", tag:"Automotivo · Gestão", short:"Gestão e presença digital de concessionária.",
    text:"Gestão de perfis e presença digital de concessionária automotiva, com calendário editorial e funil de conteúdo.",
    tags:["Social Media","Calendário editorial","Funil"], video:"Vídeo 2  MATHEUS .mp4" },
  { id:"deli", name:"Delicatessen Santana", cat:"varejo", tag:"Varejo · Alimentação", short:"Posicionamento e comunicação local.",
    text:"Posicionamento e comunicação para varejo de alimentação local, com conteúdo que valoriza identidade e proximidade.",
    tags:["Posicionamento","Conteúdo","Tráfego orgânico"] },
  { id:"anh", name:"Anhanguera", cat:"financeiro", tag:"Educação", short:"Estratégia de conteúdo e comunicação.",
    text:"Atuação em marketing e conteúdo para marca de educação, com foco em engajamento e resultados mensuráveis.",
    tags:["Conteúdo","KPIs","Endomarketing"] },
  { id:"chery", name:"CAO Chery", cat:"auto", tag:"Automotivo", short:"Campanhas e presença de marca.",
    text:"Planejamento de campanhas e presença de marca no segmento automotivo.",
    tags:["Campanhas","Social Media","Branding"] },
  { id:"vit", name:"Filme Vitória × Fluminense", cat:"ativacao", tag:"Ativação · Vídeo", short:"Filme de conteúdo para evento esportivo.",
    text:"Produção e direção estratégica de filme de conteúdo para jogo, reforçando a conexão emocional da marca com o público.",
    tags:["Vídeo","Storytelling","Live"], video:"FILME VIT X FLU 06.11.MOV" }
];

const SKILLS = [
  ["Estratégia de Conteúdo","estrategia"],["Branding & Posicionamento","estrategia"],["Planejamento de Campanhas","estrategia"],["Funil de Conteúdo","estrategia"],
  ["Roteirização & Storytelling","criacao"],["Social Media","criacao"],["Tráfego Orgânico","criacao"],
  ["Live Marketing & Eventos","live"],["Ativação de Marca","live"],["Gestão de Influenciadores","live"],["Endomarketing","live"],
  ["KPIs de Engajamento","metricas"],["Gestão de Múltiplos Perfis","metricas"]
];
/* ====================================================================== */

const $ = (s, r = document) => r.querySelector(s);
const url = f => encodeURI(f);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* nav */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("solid", y > 40);
  nav.classList.toggle("hide", y > lastY && y > 400 && !menu.classList.contains("open"));
  lastY = y;
}, { passive: true });
burger.onclick = () => {
  const o = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
  burger.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu");
};
menu.addEventListener("click", e => { if (e.target.closest("a")) { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
addEventListener("keydown", e => { if (e.key === "Escape") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

/* showreel: 2 <video> em crossfade; pula arquivos que não carregam */
(() => {
  const vids = [...document.querySelectorAll(".reel-v")];
  const dots = $("#reelDots"), count = $("#reelCount"), pauseBtn = $("#reelPause");
  const ok = REEL.map(() => true);
  let idx = -1, front = 0, timer = null, paused = false;
  const pad = n => String(n).padStart(2, "0");

  REEL.forEach((f, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Cena ${i + 1}`);
    b.onclick = () => go(i);
    dots.appendChild(b);
  });
  function ui() {
    [...dots.children].forEach((b, i) => { b.classList.toggle("is-on", i === idx); b.hidden = !ok[i]; });
    count.textContent = `${pad(idx + 1)} / ${pad(REEL.length)}`;
  }
  function go(i, tries = 0) {
    if (tries >= REEL.length) return;
    i = (i + REEL.length) % REEL.length;
    if (!ok[i]) return go(i + 1, tries + 1);
    const next = vids[1 - front], cur = vids[front];
    next.onerror = () => { ok[i] = false; go(i + 1, tries + 1); };
    next.onloadeddata = () => {
      next.onloadeddata = null;
      next.currentTime = 0;
      next.play().catch(() => {});
      next.classList.add("is-on"); cur.classList.remove("is-on");
      setTimeout(() => { if (!cur.classList.contains("is-on")) { cur.pause(); } }, 1300);
      front = 1 - front; idx = i; ui(); schedule();
    };
    next.preload = "auto";
    next.src = url(REEL[i]);
    next.load();
  }
  function schedule() {
    clearTimeout(timer);
    if (paused) return;
    timer = setTimeout(() => go(idx + 1), REEL_SECONDS * 1000);
  }
  pauseBtn.onclick = () => {
    paused = !paused;
    pauseBtn.setAttribute("aria-pressed", paused);
    pauseBtn.textContent = paused ? "▶" : "❚❚";
    pauseBtn.setAttribute("aria-label", paused ? "Retomar showreel" : "Pausar showreel");
    const v = vids[front];
    paused ? v.pause() : v.play().catch(() => {});
    schedule();
  };
  if (reduce) { paused = true; pauseBtn.click = null; }
  go(0);
})();

/* skills */
(() => {
  const ul = $("#skills"), tabs = $("#skillTabs");
  function render(g) {
    ul.innerHTML = "";
    SKILLS.filter(s => g === "all" || s[1] === g).forEach(([n], i) => {
      const li = document.createElement("li");
      li.style.animationDelay = i * 40 + "ms";
      li.innerHTML = `<small>${String(SKILLS.findIndex(s => s[0] === n) + 1).padStart(2, "0")}</small><strong>${n}</strong>`;
      ul.appendChild(li);
    });
  }
  tabs.onclick = e => {
    const b = e.target.closest(".chip"); if (!b) return;
    tabs.querySelectorAll(".chip").forEach(c => { c.classList.toggle("is-on", c === b); c.setAttribute("aria-selected", c === b); });
    render(b.dataset.g);
  };
  render("all");
})();

/* cases */
(() => {
  const grid = $("#cases-grid"), filters = $("#caseFilters");
  function render(f) {
    grid.innerHTML = "";
    CASES.filter(c => f === "all" || c.cat === f).forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "case"; b.style.animationDelay = i * 50 + "ms";
      b.setAttribute("aria-label", `Abrir case ${c.name}`);
      b.innerHTML = `<div class="case-bg">${c.video ? `<video muted loop playsinline preload="none" tabindex="-1"></video>` : `<div class="case-cube"></div>`}</div>
        ${c.video ? `<span class="case-play">▶ Vídeo</span>` : ""}
        <div class="case-info"><small>${c.tag}</small><h3>${c.name}</h3><span>${c.short}</span></div>`;
      const v = $("video", b);
      if (v) {
        const load = () => { if (!v.src) { v.src = url(c.video); v.preload = "metadata"; } };
        b.addEventListener("mouseenter", () => { load(); v.play().catch(() => {}); });
        b.addEventListener("mouseleave", () => v.pause());
        v.addEventListener("error", () => { v.remove(); $(".case-play", b)?.remove(); });
      }
      b.onclick = () => open(c, b);
      grid.appendChild(b);
    });
  }
  filters.onclick = e => {
    const b = e.target.closest(".chip"); if (!b) return;
    filters.querySelectorAll(".chip").forEach(c => { c.classList.toggle("is-on", c === b); c.setAttribute("aria-pressed", c === b); });
    render(b.dataset.f);
  };
  render("all");

  const modal = $("#modal"), media = $("#mMedia");
  let opener = null;
  function open(c, from) {
    opener = from;
    $("#mTag").textContent = c.tag; $("#mTitle").textContent = c.name; $("#mText").textContent = c.text;
    $("#mTags").innerHTML = c.tags.map(t => `<li>${t}</li>`).join("");
    media.innerHTML = "";
    if (c.video) {
      const v = document.createElement("video");
      v.controls = true; v.playsInline = true; v.autoplay = true; v.src = url(c.video);
      v.setAttribute("aria-label", "Vídeo do case " + c.name);
      v.onerror = () => { media.innerHTML = `<div class="case-cube" style="position:static"></div>`; };
      media.appendChild(v);
    } else media.innerHTML = `<div class="case-cube" style="position:static;margin:4rem"></div>`;
    modal.hidden = false; document.body.style.overflow = "hidden";
    $("#mClose").focus();
  }
  function close() {
    modal.hidden = true; media.innerHTML = ""; document.body.style.overflow = "";
    opener?.focus();
  }
  $("#mClose").onclick = close;
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") { // focus trap
      const f = [...modal.querySelectorAll("button,video[controls]")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* activation video: carrega só quando visível */
(() => {
  const v = $("#activVid");
  new IntersectionObserver((en, o) => {
    if (en[0].isIntersecting) { v.src = url(ACTIVATION_VIDEO); v.preload = "metadata"; o.disconnect(); }
  }, { rootMargin: "300px" }).observe(v);
})();

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* form -> mailto */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, note = $("#formNote");
  if (!f.checkValidity()) { note.textContent = "Preencha nome, e-mail válido e mensagem."; f.reportValidity(); return; }
  const d = Object.fromEntries(new FormData(f));
  const body = `Nome: ${d.nome}\nEmpresa: ${d.empresa || "-"}\nE-mail: ${d.email}\n\n${d.msg}`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Posicionamento de marca — " + d.nome)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Abrindo seu aplicativo de e-mail…";
});
/* WhatsApp: com número válido abre a conversa; sem número, rola até o contato */
(() => {
  const a = $("#waBtn"), n = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (n.length >= 12) {
    a.href = `https://wa.me/${n}?text=${encodeURIComponent("Olá, Hebert! Vim pelo seu site e quero posicionar minha marca.")}`;
  } else { a.removeAttribute("target"); }
})();
$("#yr").textContent = new Date().getFullYear();
