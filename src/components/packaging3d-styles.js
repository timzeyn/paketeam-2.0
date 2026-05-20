// ─────────────────────────────────────────────────────────
// Стили для 3D-превью упаковки ПАКЕТЕАМ.
// Структурно‑правильные силуэты для каждой категории.
// ─────────────────────────────────────────────────────────

export const PKG_STYLE = `
/* ── Сцена ──────────────────────────────────────────── */
.pkg-stage{
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex; align-items: center; justify-content: center;
  perspective: 1600px;
  perspective-origin: 50% 42%;
  user-select: none;
  overflow: hidden;
}
.pkg-stage.tall{ aspect-ratio: 5/4; }
.pkg-stage.dragging .pkg-3d{ transition: none; }

.pkg-floor{
  position: absolute; left: 10%; right: 10%; bottom: 11%;
  height: 14%;
  background: radial-gradient(ellipse at center,
    rgba(10,16,30,.28) 0%,
    rgba(10,16,30,.14) 38%,
    rgba(10,16,30,0) 72%);
  filter: blur(3px);
  z-index: 0;
  pointer-events: none;
}

.pkg-3d{
  position: relative;
  transform-style: preserve-3d;
  transition: transform .35s cubic-bezier(.4,.1,.2,1);
}

/* ── Общая грань / арт ─────────────────────────────── */
.face{
  position: absolute;
  background: var(--pkg-color, #B08A5B);
  backface-visibility: hidden;
  overflow: hidden;
}
.face::after{
  /* мягкий объёмный shading: одна сторона светлее, другая темнее */
  content:"";
  position:absolute; inset:0;
  background:
    linear-gradient(135deg, rgba(255,255,255,.18), rgba(0,0,0,0) 38%, rgba(0,0,0,.16));
  pointer-events:none;
  mix-blend-mode: soft-light;
}

.pkg-art{
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 14% 14%;
  z-index: 4;
  text-align: center;
  color: var(--pkg-art-color, #FFFFFF);
  pointer-events: none;
}
.pkg-art.side{ padding: 18% 6%; }
.pkg-art .pkg-logo{
  font-weight: 800;
  font-size: 20px;
  letter-spacing: .02em;
  line-height: 1.05;
  text-shadow: 0 1px 0 rgba(0,0,0,.18);
}
.pkg-art .pkg-logo.img{ font-size: 0; }
.pkg-art .pkg-logo img{
  max-width: 100%;
  max-height: 78px;
  object-fit: contain;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.18));
}
.pkg-art .pkg-tag{
  margin-top: 6px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  opacity: .82;
}

/* ── BOX: общий каркас ────────────────────────────── */
.pkg-box .face{
  border: 1px solid rgba(0,0,0,.10);
}
/* тонкая фактура картона */
.pkg-box .face::before{
  content:"";
  position:absolute; inset:0;
  background:
    repeating-linear-gradient(90deg,
      rgba(255,255,255,.04) 0 1px,
      transparent 1px 4px),
    repeating-linear-gradient(0deg,
      rgba(0,0,0,.025) 0 1px,
      transparent 1px 6px);
  mix-blend-mode: multiply;
  pointer-events:none;
}
.pkg-box .face-top::after,
.pkg-box .face-bottom::after{
  background: linear-gradient(0deg, rgba(0,0,0,.08), rgba(255,255,255,.18));
}

/* ─── MAILER BOX ─────────────────────────────────
   широкий, низкий: видимая шарнирная крышка сверху,
   с лицевой стороны видна короткая "губка" крышки + язычок-замок,
   вставленный в прорезь в корпусе ниже.
   ───────────────────────────────────────────────── */
.pkg-box-mailer-box .face-front{
  /* губка крышки занимает верхние ~14% лицевой стороны,
     ниже идёт тонкая теневая прорезь и большая площадь корпуса */
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.10) 0 14%,
      rgba(0,0,0,.32) 14% 14.6%,
      rgba(0,0,0,.0) 14.6% 100%);
}
/* язычок-замок — заметно темнее корпуса, "уходит" в прорезь */
.pkg-mailer-tab{
  position:absolute;
  left: 38%; right: 38%;
  top: 14%;
  height: 16%;
  background:
    linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.22) 100%),
    var(--pkg-color);
  background-blend-mode: multiply, normal;
  border: 1px solid rgba(0,0,0,.30);
  border-top: 0;
  border-radius: 0 0 18px 18px;
  clip-path: polygon(0 0, 100% 0, 92% 60%, 70% 100%, 30% 100%, 8% 60%);
  box-shadow:
    0 6px 8px rgba(0,0,0,.16),
    inset 0 2px 0 rgba(255,255,255,.18);
  z-index: 3;
}
.pkg-mailer-tab::after{
  content:"";
  position:absolute;
  left:24%; right:24%; top: 26%;
  height: 0;
  border-top: 1px dashed rgba(0,0,0,.25);
}
/* прорезь — длинная узкая щель в корпусе, в которую входит язычок */
.pkg-mailer-slot{
  position:absolute;
  left: 30%; right: 30%;
  top: 30%;
  height: 4px;
  background: linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,.95));
  border-radius: 3px;
  box-shadow:
    0 -1px 0 rgba(0,0,0,.30),
    0 1px 0 rgba(255,255,255,.22),
    inset 0 1px 2px rgba(0,0,0,.6);
  z-index: 4;
}
/* верх: видимая "крышка" с двумя диагональными ушками и центральным язычком */
.pkg-box-mailer-box .face-top{
  background:
    linear-gradient(180deg,
      var(--pkg-color) 0 16%,
      rgba(0,0,0,.28) 16% 16.6%,
      var(--pkg-color) 16.6% 100%);
}
.pkg-mailer-top-ears{
  position:absolute; inset: 18% 2% 4%;
  pointer-events:none;
}
.pkg-mailer-top-ears::before,
.pkg-mailer-top-ears::after{
  content:"";
  position:absolute;
  top: 0; bottom: 0;
  width: 36%;
  background: linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.08));
  border: 1px dashed rgba(0,0,0,.24);
}
.pkg-mailer-top-ears::before{
  left: 0;
  clip-path: polygon(0 0, 100% 10%, 88% 86%, 0 96%);
  border-right-style: solid;
  border-right-color: rgba(0,0,0,.30);
}
.pkg-mailer-top-ears::after{
  right: 0;
  clip-path: polygon(0 10%, 100% 0, 100% 96%, 12% 86%);
  border-left-style: solid;
  border-left-color: rgba(0,0,0,.30);
}
.pkg-mailer-top-tab{
  position:absolute;
  left: 38%; right: 38%;
  bottom: 1%;
  height: 22%;
  background:
    linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.10)),
    var(--pkg-color);
  background-blend-mode: screen, normal;
  border: 1px solid rgba(0,0,0,.30);
  border-top: 0;
  border-radius: 0 0 14px 14px;
  clip-path: polygon(0 0, 100% 0, 92% 58%, 60% 100%, 40% 100%, 8% 58%);
  box-shadow: 0 4px 8px rgba(0,0,0,.14);
  pointer-events: none;
}
.pkg-box-mailer-box .face-front .pkg-art{
  /* арт ниже зоны замка */
  top: 34%; bottom: 8%;
}
/* боковые "уши" внутри коробки видимые через щель */
.pkg-box-mailer-box .face-left::after,
.pkg-box-mailer-box .face-right::after{
  background:
    linear-gradient(135deg, rgba(255,255,255,.16), rgba(0,0,0,0) 40%, rgba(0,0,0,.18)),
    linear-gradient(180deg,
      rgba(0,0,0,.0) 0 12%,
      rgba(0,0,0,.16) 12% 13%,
      rgba(0,0,0,.0) 13% 100%);
}

/* ─── TUCK-TOP folding carton ──────────────────────
   тонкая высокая упаковка-карточка
   ───────────────────────────────────────────────── */
.pkg-box-tuck-top-box .face-front{
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.06) 0 .8%,
      transparent .8% 99.2%,
      rgba(0,0,0,.06) 99.2% 100%),
    var(--pkg-color);
}
/* шов по центру лица */
.pkg-tuck-center-seam{
  position:absolute;
  left: 50%; top: 6%; bottom: 6%;
  width: 0;
  border-left: 1px dashed rgba(0,0,0,.10);
}
/* верх: видимая отдельная "вкладочная" клапанная крышечка */
.pkg-box-tuck-top-box .face-top{
  background:
    linear-gradient(180deg, rgba(0,0,0,.12), rgba(255,255,255,.10) 30%, rgba(0,0,0,.10));
}
.pkg-tuck-flap{
  position:absolute;
  inset: 12% 10% 12% 10%;
  background: linear-gradient(180deg, rgba(255,255,255,.20), rgba(0,0,0,.06));
  border: 1px solid rgba(0,0,0,.18);
  border-radius: 4px;
}
.pkg-tuck-flap::after{
  /* полукруглый "ноготь" для большого пальца */
  content:"";
  position:absolute;
  left: 50%; transform: translateX(-50%);
  top: -1px; width: 28px; height: 14px;
  background: var(--pkg-color);
  border: 1px solid rgba(0,0,0,.18);
  border-top: 0;
  border-radius: 0 0 999px 999px;
}

/* ─── SLEEVE BOX (внешний рукав + внутренний поднос) ─
   рукав = основной корпус.
   поднос = отдельный 3D-блок справа.
   у рукава НЕТ правой стенки (видна тёмная "пещера").
   ───────────────────────────────────────────────── */
.pkg-box-sleeve-box .face-right,
.pkg-box-sleeve-box .face-left{
  /* "пещера" внутри рукава видна с торца — тёмный градиент перекрывает основной цвет */
}
/* Слой-пещера поверх правой/левой грани */
.pkg-sleeve-cave{
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.04), rgba(0,0,0,.85) 70%),
    #0a0e16;
  box-shadow:
    inset 0 8px 18px rgba(0,0,0,.75),
    inset 0 -6px 12px rgba(255,255,255,.04);
  z-index: 1;
}
.pkg-sleeve-cave::after{
  /* внутренняя стенка картона видна, лёгкий вертикальный градиент */
  content:"";
  position:absolute; inset: 14% 18%;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.30));
  border: 1px solid rgba(255,255,255,.06);
}
/* поднос (отдельный объект) */
.pkg-sleeve-tray{
  position: absolute;
  transform-style: preserve-3d;
  pointer-events: none;
}
.pkg-sleeve-tray .tface{
  position: absolute;
  background: var(--pkg-tray-color, #ddd1bd);
  border: 1px solid rgba(0,0,0,.16);
  overflow: hidden;
}
.pkg-sleeve-tray .tface::after{
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(135deg, rgba(255,255,255,.20), rgba(0,0,0,.14));
  mix-blend-mode: soft-light;
  pointer-events:none;
}
/* ноготок-вырез на лицевой стороне подноса */
.pkg-sleeve-tray .tface-front::before{
  content:"";
  position:absolute;
  top:0; left:50%; transform:translateX(-50%);
  width:34px; height:14px;
  background: rgba(0,0,0,.30);
  border-radius: 0 0 999px 999px;
}
/* отдельная "ногтевая" вырезка на лицевой стороне подноса (поверх) */
.pkg-tray-pull{
  position:absolute;
  left: 50%; transform: translateX(-50%);
  top: 0; width: 36px; height: 12px;
  background: linear-gradient(180deg, rgba(0,0,0,.60), rgba(0,0,0,.20));
  border-radius: 0 0 999px 999px;
  box-shadow:
    inset 0 2px 3px rgba(0,0,0,.5),
    0 1px 0 rgba(255,255,255,.30);
  z-index: 2;
}

/* ─── WINDOW BOX ───────────────────────────────────
   высокая retail-коробка с реальным вырезом-окном
   ───────────────────────────────────────────────── */
.pkg-box-window-box .face-front{
  /* окно создаётся как cutout через radial-gradient + псевдо-слой */
}
.pkg-box-window-box .face-front .pkg-art{
  top: 62%; bottom: 6%;
}
.pkg-window-cutout{
  position:absolute;
  left: 14%; right: 14%; top: 12%;
  height: 44%;
  border-radius: 16px;
  /* настоящее тёмное "нутро" окна — плотный цвет, не полупрозрачный */
  background:
    linear-gradient(180deg, #0e1320 0%, #1a2238 60%, #0a0e18 100%);
  border: 1px solid rgba(0,0,0,.55);
  box-shadow:
    inset 0 8px 16px rgba(0,0,0,.65),
    inset 0 -6px 10px rgba(255,255,255,.04),
    inset 0 0 0 2px rgba(255,255,255,.06),
    0 2px 0 rgba(255,255,255,.20);
  overflow: hidden;
  z-index: 2;
}
.pkg-window-cutout::before{
  /* силуэт продукта внутри: бледный, слегка свечёный */
  content:"";
  position:absolute;
  left: 50%; transform: translateX(-50%);
  bottom: 0; width: 38%; height: 78%;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.28) 0%,
      rgba(255,255,255,.18) 40%,
      rgba(255,255,255,.10) 80%,
      rgba(255,255,255,.04) 100%);
  border-radius: 12px 12px 0 0;
  box-shadow:
    inset 0 0 24px rgba(255,255,255,.10),
    0 0 18px rgba(255,255,255,.06);
}
.pkg-window-cutout::after{
  /* диагональный блик от стекла */
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(118deg,
      rgba(255,255,255,.32) 0 14%,
      rgba(255,255,255,.04) 15% 36%,
      rgba(255,255,255,.18) 38% 46%,
      transparent 47% 100%);
  pointer-events:none;
}
/* видимая рамка картона вокруг выреза (создаёт ощущение "толщины") */
.pkg-window-frame{
  position:absolute;
  left: 13%; right: 13%; top: 11%;
  height: 46%;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,.18);
  box-shadow:
    0 0 0 1px rgba(255,255,255,.20),
    inset 0 0 0 2px rgba(0,0,0,.04);
  pointer-events:none;
  z-index:3;
}

/* ─── LID-BOTTOM (премиум жёсткая коробка) ─────────
   ДВА сложенных блока: база (низ) и крышка (верх, шире).
   ───────────────────────────────────────────────── */
.pkg-lidbottom{
  position: absolute;
  transform-style: preserve-3d;
  pointer-events: none;
}
.pkg-lidbottom .lface{
  position:absolute;
  background: var(--pkg-lid-color, #e6dccb);
  border: 1px solid rgba(0,0,0,.14);
  overflow: hidden;
}
.pkg-lidbottom .lface::after{
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(135deg, rgba(255,255,255,.20), rgba(0,0,0,.14));
  mix-blend-mode: soft-light;
}
.pkg-lidbottom .lface-side::after{
  background: linear-gradient(135deg, rgba(255,255,255,.10), rgba(0,0,0,.22));
}
/* нижний выступ крышки = тонкая "юбочка" */
.pkg-lid-skirt{
  position:absolute;
  left:0; right:0; bottom:0;
  height: 22%;
  background: linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.04));
  border-top: 1px solid rgba(0,0,0,.20);
  pointer-events:none;
}

/* ────────────────────────────────────────────────── */
/* BAGS — общая база                                  */
/* ────────────────────────────────────────────────── */
.pkg-bag-wrap{
  position: absolute; left:50%; top:50%;
  transform-style: preserve-3d;
}
.pkg-bag-svg{
  position: absolute;
  inset: 0;
  overflow: visible;
}
.pkg-bag-face{
  position: absolute;
  backface-visibility: hidden;
  overflow: hidden;
}
.pkg-bag-face .pkg-art{ z-index: 5; }
`;

export const PKG_STYLE_PART2 = `
/* ─── DOY-PACK (стенд-ап пакет) ────────────────────
   Realistic stand-up pouch / doy-pack silhouette.
   Based on reference kraft pouch image:
   - Slightly rounded upper shoulders
   - Wider toward the bottom (standing gusset)
   - Slightly curved lower edge
   - Soft flexible material feel
   ───────────────────────────────────────────────── */
.pkg-bag-doy .pkg-bag-face{
  /* Realistic doy-pack silhouette using SVG-like polygon.
     Top: narrow seal area with slightly rounded shoulders.
     Body: gently widens downward.
     Bottom: slightly curved standing base. */
  clip-path: polygon(
    /* top seal edge — straight */
    12% 0%, 88% 0%,
    /* upper right shoulder — gentle curve */
    93% 0.5%, 96% 1.8%, 98% 4%, 99% 7%,
    /* right side — very slight outward bow toward bottom */
    99.5% 14%, 100% 28%, 100% 50%,
    100% 70%, 99.5% 82%,
    /* lower right — widening to base */
    99% 88%, 98% 92%, 96% 95%,
    /* bottom — subtle upward curve (standing gusset shape) */
    92% 97%, 82% 99%, 68% 100%,
    50% 100.5%,
    32% 100%, 18% 99%, 8% 97%,
    /* lower left */
    4% 95%, 2% 92%, 1% 88%,
    /* left side */
    0.5% 82%, 0% 70%, 0% 50%,
    0% 28%, 0.5% 14%,
    /* upper left shoulder */
    1% 7%, 2% 4%, 4% 1.8%, 7% 0.5%
  );
  background: var(--pkg-color);
  box-shadow:
    0 18px 32px rgba(0,0,0,.16),
    inset 0 0 0 1px rgba(0,0,0,.06);
}

/* Kraft paper texture + flexible body shading */
.pkg-bag-doy .pkg-bag-face::before{
  content:"";
  position:absolute; inset:0;
  background:
    /* Central soft highlight — convex body feel */
    radial-gradient(ellipse 60% 70% at 48% 48%,
      rgba(255,255,255,.14) 0%,
      rgba(255,255,255,.04) 50%,
      rgba(255,255,255,0) 70%),
    /* Side shadows — flexible pouch depth */
    linear-gradient(90deg,
      rgba(0,0,0,.22) 0%,
      rgba(0,0,0,.08) 6%,
      rgba(0,0,0,.0) 14%,
      rgba(255,255,255,.04) 40%,
      rgba(255,255,255,.06) 50%,
      rgba(255,255,255,.04) 60%,
      rgba(0,0,0,.0) 86%,
      rgba(0,0,0,.08) 94%,
      rgba(0,0,0,.22) 100%),
    /* Subtle kraft paper micro-texture */
    repeating-linear-gradient(87deg,
      rgba(0,0,0,.015) 0 1px,
      transparent 1px 3px),
    repeating-linear-gradient(1deg,
      rgba(0,0,0,.01) 0 1px,
      transparent 1px 5px);
  mix-blend-mode: multiply;
  pointer-events:none;
  z-index: 1;
}

/* Bottom gusset standing base */
.pkg-bag-doy .pkg-bag-face::after{
  content:"";
  position:absolute;
  left: 0; right: 0; bottom: 0;
  height: 15%;
  background:
    /* Gentle fold shadow at the gusset crease */
    linear-gradient(180deg,
      rgba(0,0,0,.0) 0%,
      rgba(0,0,0,.04) 20%,
      rgba(0,0,0,.10) 60%,
      rgba(0,0,0,.20) 100%);
  z-index: 2;
  pointer-events:none;
}

/* ── DOY-PACK SEAL: thin heat-sealed band at top ── */
.pkg-doy-seal{
  position:absolute;
  left: 11%; right: 11%; top: 0;
  height: 18px;
  background:
    /* Subtle pressed/sealed texture — NOT stripes */
    linear-gradient(180deg,
      rgba(0,0,0,.06) 0%,
      rgba(255,255,255,.10) 30%,
      rgba(0,0,0,.04) 50%,
      rgba(255,255,255,.08) 70%,
      rgba(0,0,0,.12) 100%);
  border-bottom: 1px solid rgba(0,0,0,.14);
  box-shadow:
    0 1px 0 rgba(255,255,255,.12);
  z-index: 6;
  pointer-events:none;
}

/* ── DOY-PACK ZIPPER: subtle horizontal closure line ── */
.pkg-doy-zipper{
  position:absolute;
  left: 8%; right: 8%; top: 19px;
  height: 7px;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.06) 0%,
      rgba(0,0,0,.12) 35%,
      rgba(0,0,0,.14) 50%,
      rgba(0,0,0,.10) 65%,
      rgba(0,0,0,.04) 100%);
  box-shadow:
    0 1px 0 rgba(255,255,255,.10),
    inset 0 0 0 0.5px rgba(0,0,0,.08);
  z-index: 6;
  pointer-events:none;
}
/* Double-track lines inside zipper */
.pkg-doy-zipper::before{
  content:"";
  position:absolute;
  left: 4%; right: 4%;
  top: 2px;
  height: 0;
  border-top: 0.5px solid rgba(0,0,0,.12);
  box-shadow: 0 2px 0 rgba(0,0,0,.08);
}

/* ── DOY-PACK TEAR NOTCHES ── */
.pkg-doy-notch{
  position:absolute;
  top: 18px;
  width: 5px;
  height: 8px;
  z-index: 7;
  pointer-events:none;
}
.pkg-doy-notch.left{
  left: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.35), rgba(0,0,0,.08));
  clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 70%);
}
.pkg-doy-notch.right{
  right: 0;
  background: linear-gradient(-90deg, rgba(0,0,0,.35), rgba(0,0,0,.08));
  clip-path: polygon(0 0, 100% 30%, 100% 70%, 0 100%);
}

/* ── DOY-PACK BOTTOM GUSSET FOLD ── */
.pkg-doy-bottom-gusset{
  position:absolute;
  left: 4%; right: 4%;
  bottom: 14%;
  height: 0;
  border-top: 1px solid rgba(0,0,0,.10);
  box-shadow:
    0 -1px 0 rgba(255,255,255,.06),
    0 1px 2px rgba(0,0,0,.06);
  z-index: 3;
  pointer-events:none;
}

/* ── DOY-PACK SIDE GUSSET (diamond-fold profile) ── */
.pkg-bag-side-doy{
  overflow: visible !important;
}
.pkg-doy-side-gusset{
  position:absolute;
  inset: 0;
  pointer-events:none;
  overflow: hidden;
}
/* Upper part: triangular fold converging from top */
.pkg-doy-side-upper{
  position:absolute;
  left:0; right:0;
  top: 0;
  height: 55%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.08) 0%,
      rgba(0,0,0,.0) 6%,
      rgba(0,0,0,.0) 40%,
      rgba(0,0,0,.06) 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
/* Central fold crease — the sharp line */
.pkg-doy-side-crease{
  position:absolute;
  left: 50%;
  top: 8%;
  bottom: 18%;
  width: 0;
  border-left: 1px solid rgba(0,0,0,.18);
  box-shadow:
    -1px 0 0 rgba(255,255,255,.08),
    1px 0 0 rgba(0,0,0,.06);
  z-index: 2;
}
/* Lower part: expanding triangle for bottom gusset */
.pkg-doy-side-lower{
  position:absolute;
  left: 0; right: 0;
  bottom: 0;
  height: 28%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.04) 0%,
      rgba(0,0,0,.14) 60%,
      rgba(0,0,0,.22) 100%);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
/* Overall fold shadow overlay */
.pkg-doy-side-fold-shadow{
  position:absolute;
  inset: 0;
  background:
    linear-gradient(90deg,
      rgba(255,255,255,.12) 0%,
      rgba(0,0,0,.10) 46%,
      rgba(0,0,0,.16) 50%,
      rgba(0,0,0,.10) 54%,
      rgba(255,255,255,.12) 100%);
  mix-blend-mode: multiply;
}

.pkg-bag-doy .pkg-art{
  inset: 14% 14% 20%;
}

/* ─── ZIP-LOCK ─────────────────────────────────────
   как доу-пак, но более прямоугольный, с тонкой
   двухлинейной молнией под верхним швом и зазубриной.
   ───────────────────────────────────────────────── */
.pkg-bag-zip .pkg-bag-face{
  clip-path: polygon(
    8% 0%, 92% 0%,
    98% 5%, 100% 16%,
    99% 90%, 95% 99%,
    5% 99%, 1% 90%,
    0% 16%, 2% 5%
  );
  background:
    radial-gradient(ellipse at 50% 50%,
      rgba(255,255,255,.18) 0%,
      rgba(255,255,255,0) 42%),
    linear-gradient(90deg,
      rgba(0,0,0,.24) 0%,
      rgba(0,0,0,.06) 10%,
      rgba(255,255,255,.10) 45%,
      rgba(255,255,255,.10) 55%,
      rgba(0,0,0,.06) 90%,
      rgba(0,0,0,.24) 100%),
    var(--pkg-color);
  background-blend-mode: screen, multiply, normal;
  box-shadow:
    0 18px 26px rgba(0,0,0,.16),
    inset 0 0 0 1px rgba(0,0,0,.10);
}
.pkg-bag-zip .pkg-bag-face::before{
  /* верхний шов */
  content:"";
  position:absolute;
  left: 4%; right: 4%; top: 0;
  height: 22px;
  background:
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.14) 0 2px, transparent 2px 6px),
    linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.16));
  border-bottom: 1px solid rgba(0,0,0,.20);
  z-index: 2;
}
/* двойная линия зиппера + надрезы */
.pkg-zip-track{
  position:absolute;
  left: 6%; right: 6%; top: 28px;
  height: 8px;
  z-index: 3;
  background:
    linear-gradient(180deg,
      transparent 0 2px,
      rgba(0,0,0,.34) 2px 3px,
      transparent 3px 5px,
      rgba(0,0,0,.34) 5px 6px,
      transparent 6px 8px);
  pointer-events:none;
}
.pkg-zip-notch{
  position:absolute;
  top: 28px; width: 8px; height: 12px;
  background: var(--pkg-color);
  z-index: 4;
}
.pkg-zip-notch.left{
  left: 0;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  filter: brightness(.55);
}
.pkg-zip-notch.right{
  right: 0;
  clip-path: polygon(100% 50%, 0 0, 0 100%);
  filter: brightness(.55);
}
.pkg-bag-zip .pkg-art{
  inset: 18% 14% 18%;
}

/* ─── FLAT-BOTTOM BAG ─────────────────────────────
   стенд-ап с явным плоским донцем и гассетами.
   ───────────────────────────────────────────────── */
.pkg-bag-flat .pkg-bag-face{
  clip-path: polygon(
    6% 0%, 94% 0%,
    99% 6%, 100% 78%,
    100% 100%, 0% 100%,
    0% 78%, 1% 6%
  );
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.28) 0%,
      rgba(0,0,0,.06) 10%,
      rgba(255,255,255,.10) 45%,
      rgba(255,255,255,.10) 55%,
      rgba(0,0,0,.06) 90%,
      rgba(0,0,0,.28) 100%),
    var(--pkg-color);
  background-blend-mode: multiply, normal;
  box-shadow:
    0 16px 26px rgba(0,0,0,.18),
    inset 0 0 0 1px rgba(0,0,0,.12);
}
.pkg-bag-flat .pkg-bag-face::before{
  content:"";
  position:absolute;
  left:6%; right:6%; top:0;
  height: 22px;
  background:
    repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 2px, transparent 2px 6px),
    linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.18));
  border-bottom: 1px solid rgba(0,0,0,.22);
  z-index: 2;
}
/* плоское донце */
.pkg-bag-flat .pkg-bag-face::after{
  content:"";
  position:absolute;
  left:0; right:0; bottom:0;
  height: 18%;
  background: linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.36));
  border-top: 1px solid rgba(0,0,0,.30);
  box-shadow: inset 0 4px 10px rgba(255,255,255,.10);
  z-index: 1;
}
.pkg-flat-gusset-line{
  position:absolute;
  top: 22px; bottom: 18%;
  width: 0;
  border-left: 1px dashed rgba(0,0,0,.18);
  z-index: 2;
}
.pkg-flat-gusset-line.left{ left: 14%; }
.pkg-flat-gusset-line.right{ right: 14%; }
.pkg-bag-flat .pkg-art{
  inset: 18% 18% 28%;
}

/* ─── PAPER BAG WITH HANDLES ──────────────────────
   квадратный коричневый мешок с загнутым краем и ручками.
   ───────────────────────────────────────────────── */
.pkg-bag-paper .pkg-bag-face{
  background:
    /* боковая складка слева и справа */
    linear-gradient(90deg,
      rgba(0,0,0,.28) 0 6%,
      rgba(0,0,0,.04) 6% 18%,
      rgba(255,255,255,.06) 18% 50%,
      rgba(255,255,255,.06) 50% 82%,
      rgba(0,0,0,.04) 82% 94%,
      rgba(0,0,0,.28) 94% 100%),
    /* лёгкая бумажная текстура */
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.02) 0 1px, transparent 1px 4px),
    var(--pkg-color);
  background-blend-mode: multiply, multiply, normal;
  border: 1px solid rgba(0,0,0,.18);
  border-radius: 3px;
  box-shadow:
    0 20px 26px rgba(0,0,0,.20),
    inset 0 0 0 1px rgba(0,0,0,.04);
}
/* загнутый верхний край */
.pkg-paper-top-fold{
  position:absolute;
  left: -1px; right: -1px; top: 0;
  height: 11%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.06) 0%,
      rgba(255,255,255,.10) 40%,
      rgba(0,0,0,.18) 100%);
  border-bottom: 1px solid rgba(0,0,0,.26);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.30),
    0 1px 0 rgba(0,0,0,.18);
  z-index: 3;
}
/* ручки */
.pkg-paper-handle{
  position:absolute;
  top: -22px;
  width: 28px; height: 56px;
  border: 5px solid var(--pkg-handle-color, rgba(120,75,40,.85));
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  z-index: 5;
  box-shadow: 0 2px 4px rgba(0,0,0,.20);
}
.pkg-paper-handle.left{ left: 20%; }
.pkg-paper-handle.right{ right: 20%; }
/* боковая складка (вертикальные пунктиры) */
.pkg-paper-crease{
  position:absolute;
  top: 12%; bottom: 6%;
  width: 0;
  border-left: 1px dashed rgba(0,0,0,.18);
  z-index: 2;
}
.pkg-paper-crease.left{ left: 18%; }
.pkg-paper-crease.right{ right: 18%; }
.pkg-bag-paper .pkg-art{
  inset: 22% 24% 14%;
}

/* ─── COURIER BAG ─────────────────────────────────
   более широкий и плоский почтовый пакет с клейкой полоской.
   ───────────────────────────────────────────────── */
.pkg-bag-courier .pkg-bag-face{
  clip-path: polygon(
    3% 0, 97% 0,
    100% 4%, 99% 96%,
    96% 100%, 4% 100%,
    1% 96%, 0 4%
  );
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.22) 0%,
      rgba(255,255,255,.06) 18%,
      rgba(255,255,255,.10) 50%,
      rgba(255,255,255,.06) 82%,
      rgba(0,0,0,.22) 100%),
    radial-gradient(ellipse at 50% 60%, rgba(255,255,255,.16), transparent 55%),
    var(--pkg-color);
  background-blend-mode: multiply, screen, normal;
  box-shadow:
    0 16px 22px rgba(0,0,0,.16),
    inset 0 0 0 1px rgba(0,0,0,.08);
}
/* верхняя клейкая полоса-флэп */
.pkg-courier-flap{
  position:absolute;
  left: 0; right: 0; top: 12%;
  height: 9%;
  background:
    repeating-linear-gradient(45deg,
      rgba(255,255,255,.20) 0 4px,
      rgba(0,0,0,.06) 4px 8px),
    rgba(255,255,255,.06);
  border-top: 1px dashed rgba(0,0,0,.30);
  border-bottom: 1px solid rgba(0,0,0,.26);
  box-shadow: 0 2px 4px rgba(0,0,0,.10);
  z-index: 3;
}
.pkg-courier-flap::after{
  content:"PEEL";
  position:absolute;
  right: 8px; top: 50%;
  transform: translateY(-50%);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 8px;
  letter-spacing: .2em;
  color: rgba(0,0,0,.4);
}
/* мягкие морщины */
.pkg-courier-wrinkle{
  position:absolute;
  pointer-events:none;
  z-index: 1;
  background: radial-gradient(ellipse, rgba(0,0,0,.10), transparent 70%);
  filter: blur(3px);
}
.pkg-bag-courier .pkg-art{
  inset: 32% 22% 18%;
}

/* ────────────────────────────────────────────────── */
/* CUPS                                                */
/* ────────────────────────────────────────────────── */
.pkg-cup-wrap{
  position: absolute; left:50%; top:50%;
  transform-style: preserve-3d;
}
.pkg-cup-body{
  position: absolute;
  inset: 8% 10% 6%;
  background: var(--pkg-color, #B08A5B);
  /* ВЕРНАЯ форма стакана: шире сверху, у́же снизу */
  clip-path: polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%);
  overflow: hidden;
  box-shadow:
    0 18px 28px rgba(0,0,0,.20),
    inset 0 0 0 1px rgba(0,0,0,.08);
}
/* цилиндрический shading — затемнение по бокам, блик в центре */
.pkg-cup-body::before{
  content:"";
  position:absolute; inset:0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.32) 0%,
      rgba(0,0,0,.05) 14%,
      rgba(255,255,255,.20) 36%,
      rgba(255,255,255,.26) 50%,
      rgba(255,255,255,.20) 64%,
      rgba(0,0,0,.05) 86%,
      rgba(0,0,0,.32) 100%);
  mix-blend-mode: multiply;
  pointer-events:none;
}
.pkg-cup-body::after{
  /* лёгкий блик на верхней части */
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(180deg,
    rgba(255,255,255,.20),
    rgba(255,255,255,0) 24%);
  pointer-events:none;
}
/* верхний обод (эллипс) — широкий, у самой верхушки */
.pkg-cup-rim{
  position:absolute;
  top: 6%;
  left: 10%; right: 10%;
  height: 26px;
  /* центрируем по верхней кромке стакана */
  transform: translateY(-50%);
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 50% 70%,
      rgba(0,0,0,.55) 0%,
      rgba(0,0,0,.18) 32%,
      rgba(0,0,0,0) 60%),
    linear-gradient(180deg,
      var(--pkg-rim-color, #ffffff) 0%,
      rgba(255,255,255,.85) 40%,
      rgba(0,0,0,.18) 100%);
  box-shadow:
    0 3px 6px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.7),
    inset 0 -1px 0 rgba(0,0,0,.20);
  z-index: 3;
}
.pkg-cup-rim::after{
  /* внутренний эллипс — отверстие чашки */
  content:"";
  position:absolute;
  left:4%; right:4%; top:38%; bottom: 5%;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(0,0,0,.40), rgba(0,0,0,.18));
  box-shadow: inset 0 2px 3px rgba(0,0,0,.30);
}
/* донце — узкий эллипс */
.pkg-cup-base{
  position:absolute;
  bottom: 4%;
  left: 22%; right: 22%;
  height: 12px;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 50% 35%,
      rgba(0,0,0,.35),
      rgba(0,0,0,.08) 70%);
  z-index: 1;
}

/* SINGLE-WALL: ничего лишнего, обычная гладкая чашка */

/* DOUBLE-WALL: видимый внутренний воротник вверху + лёгкая
   двойная толщина по контуру */
.pkg-cup-double::before{
  content:"";
  position:absolute;
  top: 4%;
  left: 12%; right: 12%;
  height: 6%;
  border-radius: 50%;
  background:
    linear-gradient(180deg, rgba(0,0,0,.40), rgba(255,255,255,.08));
  box-shadow: inset 0 2px 3px rgba(0,0,0,.30);
  z-index: 4;
  pointer-events: none;
}
.pkg-cup-double .pkg-cup-body{
  box-shadow:
    0 18px 28px rgba(0,0,0,.20),
    inset 0 0 0 4px rgba(255,255,255,.08),
    inset 0 0 0 5px rgba(0,0,0,.10);
}

/* RIPPLE CUP: видимый гофрированный рукав вокруг средней части */
.pkg-cup-ripple-sleeve{
  position:absolute;
  /* охватывает среднюю и нижнюю часть стакана */
  inset: 32% 4% 14%;
  z-index: 2;
  pointer-events:none;
  /* форма соответствует конусу стакана: шире вверху, уже внизу */
  clip-path: polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%);
  background:
    repeating-linear-gradient(180deg,
      rgba(255,255,255,.20) 0 3px,
      rgba(0,0,0,.20) 3px 4px,
      rgba(0,0,0,.06) 4px 7px),
    linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.08));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.30),
    inset 0 -1px 0 rgba(0,0,0,.24),
    0 4px 10px rgba(0,0,0,.20);
  border-top: 1px solid rgba(0,0,0,.28);
  border-bottom: 1px solid rgba(0,0,0,.28);
}

/* COLD CUP: прозрачный/полупрозрачный пластик + купольная крышка + соломинка */
.pkg-cup-cold .pkg-cup-body{
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.30) 0%,
      rgba(255,255,255,.10) 20%,
      var(--pkg-color) 20%,
      var(--pkg-color) 96%,
      rgba(0,0,0,.18) 100%);
  /* лёгкая прозрачность по краям */
  box-shadow:
    0 18px 28px rgba(0,0,0,.20),
    inset 0 0 0 1px rgba(255,255,255,.36),
    inset 0 -8px 18px rgba(0,0,0,.10);
}
.pkg-cup-cold .pkg-cup-body::before{
  background:
    /* мерцающие вертикальные блики стекла */
    linear-gradient(90deg,
      rgba(255,255,255,.36) 0 3%,
      transparent 4% 22%,
      rgba(255,255,255,.18) 23% 30%,
      transparent 31% 70%,
      rgba(255,255,255,.18) 71% 78%,
      transparent 79% 96%,
      rgba(255,255,255,.36) 97% 100%);
  mix-blend-mode: screen;
}
/* купольная крышка */
.pkg-cup-cold-dome{
  position:absolute;
  left: 10%; right: 10%;
  top: -6%;
  height: 22%;
  border-radius: 50% 50% 14px 14px / 100% 100% 14px 14px;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.46) 0%,
      rgba(255,255,255,.20) 40%,
      rgba(255,255,255,.10) 70%,
      rgba(0,0,0,.14) 100%);
  border: 1px solid rgba(0,0,0,.20);
  box-shadow:
    inset 0 3px 0 rgba(255,255,255,.50),
    inset 0 -6px 14px rgba(0,0,0,.16),
    0 6px 12px rgba(0,0,0,.16);
  z-index: 4;
}
.pkg-cup-cold-dome::after{
  /* крестообразное отверстие для соломинки */
  content:"";
  position:absolute;
  left:50%; top:60%;
  transform: translate(-50%, -50%);
  width: 14px; height: 14px;
  background:
    linear-gradient(0deg, transparent 6px, rgba(0,0,0,.55) 6px 8px, transparent 8px),
    linear-gradient(90deg, transparent 6px, rgba(0,0,0,.55) 6px 8px, transparent 8px);
}
.pkg-cup-cold-straw{
  position:absolute;
  left: 56%;
  top: -16%;
  width: 12px;
  height: 32%;
  background:
    repeating-linear-gradient(0deg,
      var(--pkg-straw-a, #d94e4e) 0 14px,
      var(--pkg-straw-b, #ffffff) 14px 28px);
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.30);
  z-index: 5;
  transform: rotate(8deg);
  box-shadow: 0 4px 8px rgba(0,0,0,.18);
}

/* ────────────────────────────────────────────────── */
/* STICKER                                             */
/* ────────────────────────────────────────────────── */
.pkg-sticker-wrap{
  position:absolute; left:50%; top:50%;
  transform-style: preserve-3d;
}
.pkg-sticker{
  position:absolute; inset:8%;
  background: var(--pkg-color, #B08A5B);
  border-radius: var(--pkg-radius, 50%);
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 -1px 0 rgba(0,0,0,.18) inset,
    0 12px 28px rgba(15,23,42,.22);
  overflow:hidden;
}
.pkg-sticker::after{
  content:"";
  position:absolute; inset:0;
  background:
    radial-gradient(circle at 28% 22%,
      rgba(255,255,255,.55) 0%,
      rgba(255,255,255,0) 38%);
  pointer-events:none;
}

/* ────────────────────────────────────────────────── */
/* UNFOLD (плоская развёртка)                          */
/* ────────────────────────────────────────────────── */
.pkg-unfold-wrap{
  width:100%;
  display:flex; align-items:center; justify-content:center;
  padding: 6% 4%;
}
.pkg-unfold{
  display:grid;
  gap:4px;
  filter: drop-shadow(0 8px 24px rgba(15,23,42,.08));
}
.pkg-unfold .panel{
  position:relative;
  background: var(--pkg-color, #B08A5B);
  border:1px dashed rgba(255,255,255,.55);
  outline:1px dashed rgba(126,95,56,.4);
  outline-offset:-1px;
  display:flex; align-items:center; justify-content:center;
  overflow:hidden;
}
.pkg-unfold .panel.empty{ background: transparent; border: none; outline: none; }
.pkg-unfold .panel.muted{
  background:
    repeating-linear-gradient(135deg,
      rgba(15,22,38,.04) 0 8px,
      rgba(15,22,38,.08) 8px 16px);
  border-color: rgba(15,22,38,.12);
  outline-color: rgba(15,22,38,.12);
}
.pkg-unfold .panel-label{
  position:absolute; top:6px; left:6px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9px; letter-spacing:.12em;
  text-transform: uppercase;
  color: rgba(0,0,0,.45);
  background: rgba(255,255,255,.55);
  padding: 2px 5px; border-radius: 4px;
  z-index: 5;
}

/* idle-вращение */
@keyframes pkt-idle-rotate{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(-24deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(24deg);  }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(-24deg); }
}
.pkg-3d.idle{ animation: pkt-idle-rotate 14s ease-in-out infinite; }
`;
