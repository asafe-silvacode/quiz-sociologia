// ── BANCO DE QUESTÕES ──────────────────────────────────────────────
const QUESTOES = {
  "classicos": {
    titulo: "Conceitos Básicos no Pensamento dos Clássicos da Sociologia",
    questoes: [
      {
        id: 1,
        enunciado: "Quem desenvolveu o conceito de <strong>Fato Social</strong>, definindo-o como o objeto de estudo da sociologia com características de exterioridade e coercitividade?",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "B"
      },
      {
        id: 2,
        enunciado: "Qual autor estudou a <strong>Ação Social</strong> como uma conduta humana dotada de sentido subjetivo orientado para o outro?",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "D"
      },
      {
        id: 3,
        enunciado: "A ideia de <strong>Classe Social</strong> como resultado das contradições materiais e da luta histórica entre exploradores e explorados foi desenvolvida por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "C"
      },
      {
        id: 4,
        enunciado: "O conceito de <strong>Anomia</strong>, que descreve o estado de desregramento social onde as normas perdem sua eficácia, foi estudado por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "B"
      },
      {
        id: 5,
        enunciado: "A distinção entre as formas de <strong>Solidariedade Mecânica e Orgânica</strong> para explicar a coesão social foi proposta por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "B"
      },
      {
        id: 6,
        enunciado: "Quem desenvolveu o conceito de <strong>Alienação</strong> para explicar o estranhamento do trabalhador em relação ao processo e ao fruto de seu trabalho?",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "C"
      },
      {
        id: 7,
        enunciado: "O <strong>Materialismo Histórico Dialético</strong> é o método de análise que busca compreender a sociedade a partir de sua base econômica e foi formulado por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "C"
      },
      {
        id: 8,
        enunciado: "A corrente filosófica conhecida como <strong>Positivismo</strong>, que prega o uso do método científico para reorganizar a sociedade, foi fundada por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "A"
      },
      {
        id: 9,
        enunciado: "Os conceitos de <strong>Mais-valia absoluta e Mais-valia relativa</strong>, que explicam a extração de excedente do trabalho, foram propostos por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "C"
      },
      {
        id: 10,
        enunciado: "A análise da sociedade moderna pautada no conflito entre <strong>Burguesia e Proletariado</strong> como motores da história foi desenvolvida por:",
        alternativas: [
          { letra: "A", texto: "Auguste Comte" },
          { letra: "B", texto: "Émile Durkheim" },
          { letra: "C", texto: "Karl Marx" },
          { letra: "D", texto: "Max Weber" }
        ],
        correta: "C"
      }
    ]
  }
};

// ── ESTADO GLOBAL ───────────────────────────────────────────────────
const STATE = {
  tema: null,
  modo: null,
  grupos: [],
  grupoAtual: 0,
  questoes: [],
  alternativasOrdem: [],
  questaoIdx: 0,
  timerInterval: null,
  timerSecs: 20,
  respondeu: false,
  revelado: false,
  escolha: null,
  encerrado: false
};

// ── FISHER-YATES ────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── SESSÃO ──────────────────────────────────────────────────────────
function saveState() {
  sessionStorage.setItem('quizState', JSON.stringify(STATE));
}

function loadState() {
  const raw = sessionStorage.getItem('quizState');
  if (!raw) return false;
  try { Object.assign(STATE, JSON.parse(raw)); return true; }
  catch { return false; }
}

function clearState() {
  sessionStorage.removeItem('quizState');
}

// ── CONFETTI ────────────────────────────────────────────────────────
function launchConfetti(duration = 2200) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#2e73d8','#93bff4','#d1e4fb','#ffffff','#5294e8','#1d56b0'];
  const particles = Array.from({ length: 110 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    r: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 3 + 1.5,
    drift: (Math.random() - 0.5) * 2,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 5,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));

  const start = performance.now();
  function draw(now) {
    if (now - start > duration) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speed; p.x += p.drift; p.rot += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') { ctx.fillRect(-p.r, -p.r/2, p.r*2, p.r); }
      else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// ── TIMER STOP ──────────────────────────────────────────────────────
function stopTimer() {
  if (STATE.timerInterval) { clearInterval(STATE.timerInterval); STATE.timerInterval = null; }
}

// ── NAVEGAÇÃO ───────────────────────────────────────────────────────
function goTo(page) { saveState(); window.location.href = page; }
