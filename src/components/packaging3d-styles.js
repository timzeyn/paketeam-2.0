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
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
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
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
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
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
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
/* BAGS — common chassis for all 5 real-3D bag models  */
/* ────────────────────────────────────────────────── */
/* Every bag (doy-pack, zip-lock, flat-bottom, paper, courier)
   is now a real preserve-3d cuboid with five faces. They all
   inherit shared face/art-area defaults from .pkg-bg below;
   variant-specific classes layer shading and accessories. */
.pkg-bg{
  pointer-events: auto;
}
.pkg-stage.dragging .pkg-bg{ transition: none; }

/* Default for every bag face. */
.pkg-bg [class*="3d-face"]{
  position: absolute;
  top: 0; left: 0;
  background: var(--pkg-color, #B08A5B);
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  overflow: hidden;
}
/* Default art-area sizing (variants override the inset). */
.pkg-bg [class*="3d-art-area"]{
  position: absolute;
  z-index: 4;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.pkg-bg [class*="3d-art-area"] .pkg-art{
  position: relative;
  inset: auto;
  width: 100%; height: 100%;
  padding: 6% 5%;
}

`;

export const PKG_STYLE_PART2 = `
/* ════════════════════════════════════════════════════════
   1) DOY-PACK 3D · stand-up pouch (FULL REBUILD)
   ════════════════════════════════════════════════════════
   Only TWO real panels (front + back). They meet at the top
   seal, are connected along both sides (visible as a thin
   seam line on the face), and spread apart at the bottom via
   the flat K-folded gusset. Each panel is tilted around its
   top edge so the side-view silhouette is a classic wedge.   */

@keyframes pkg-doy3d-rock{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-18deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-10deg); }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-18deg); }
}
.pkg-doy3d-idle{ animation: pkg-doy3d-rock 11s ease-in-out infinite; }

.pkg-doy3d-front, .pkg-doy3d-back{
  /* Pillow silhouette: rounded shoulders, soft bow at the waist,
     and a subtle inward curve at the bottom where the gusset folds. */
  clip-path: polygon(
    8% 0%, 92% 0%,
    96% 4%, 100% 14%,
    100% 50%,
    100% 86%, 96% 96%,
    88% 100%, 12% 100%,
    4% 96%, 0% 86%,
    0% 50%,
    0% 14%, 4% 4%
  );
  border-radius: 14px;
  background: var(--pkg-color);
}

.pkg-doy3d-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    /* central bow highlight (front bulge) */
    radial-gradient(ellipse 75% 65% at 50% 50%,
      rgba(255,255,255,.22) 0%,
      rgba(255,255,255,.06) 35%,
      transparent 65%),
    /* deep shadow along both vertical edges */
    linear-gradient(90deg,
      rgba(0,0,0,.32) 0%,
      rgba(0,0,0,.16) 6%,
      rgba(0,0,0,.04) 18%,
      transparent 28%,
      transparent 72%,
      rgba(0,0,0,.04) 82%,
      rgba(0,0,0,.16) 94%,
      rgba(0,0,0,.32) 100%),
    /* subtle vertical fiber */
    repeating-linear-gradient(88deg,
      rgba(0,0,0,.012) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(2deg,
      rgba(0,0,0,.010) 0 1px, transparent 1px 4px);
}
.pkg-doy3d-mat.back{ filter: brightness(.96); }

.pkg-doy3d-wrinkles{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    radial-gradient(ellipse 28% 8%  at 32% 58%, rgba(0,0,0,.07) 0%, transparent 70%),
    radial-gradient(ellipse 22% 7%  at 68% 42%, rgba(255,255,255,.06) 0%, transparent 70%),
    radial-gradient(ellipse 20% 6%  at 22% 28%, rgba(0,0,0,.05) 0%, transparent 70%),
    radial-gradient(ellipse 18% 6%  at 74% 72%, rgba(0,0,0,.04) 0%, transparent 70%);
  mix-blend-mode: multiply;
}

/* Heat-sealed side seams — visible as thin dark vertical stripes
   right at the panel edges (these are where front meets back). */
.pkg-doy3d-side-seam{
  position: absolute;
  top: 12%; bottom: 14%;
  width: 6px;
  pointer-events: none; z-index: 2;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.40) 0%,
      rgba(0,0,0,.55) 50%,
      rgba(0,0,0,.40) 100%);
  box-shadow:
    inset 1px 0 0 rgba(255,255,255,.10),
    inset -1px 0 0 rgba(255,255,255,.10);
  filter: blur(.3px);
}
.pkg-doy3d-side-seam.left{ left: 1.5%; }
.pkg-doy3d-side-seam.right{ right: 1.5%; }

/* Top heat seal — the strip above the zipper, slightly wrinkled */
.pkg-doy3d-top-seal{
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 9%;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.10) 0%,
      rgba(255,255,255,.04) 25%,
      rgba(0,0,0,.04) 55%,
      rgba(0,0,0,.18) 100%);
  border-bottom: 1px solid rgba(0,0,0,.16);
}
.pkg-doy3d-top-seal::before{
  /* fine ribbed seal texture */
  content: "";
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(0deg,
      rgba(0,0,0,.10) 0 1px,
      rgba(255,255,255,.10) 1px 2px,
      transparent 2px 3px);
  mix-blend-mode: overlay;
  opacity: .9;
}

.pkg-doy3d-zip-track{
  position: absolute;
  left: 6%; right: 6%;
  top: 52%;
  height: 40%;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.22) 0%,
      rgba(0,0,0,.34) 30%,
      rgba(255,255,255,.20) 52%,
      rgba(0,0,0,.34) 74%,
      rgba(255,255,255,.10) 100%);
  border-radius: 1px;
  box-shadow:
    inset 0 .5px 0 rgba(255,255,255,.20),
    inset 0 -.5px 0 rgba(0,0,0,.24);
}

.pkg-doy3d-notch{
  position: absolute;
  top: 105%;
  width: 5px;
  height: 8px;
  z-index: 6;
  background: rgba(0,0,0,.34);
}
.pkg-doy3d-notch.left{
  left: 2%;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
}
.pkg-doy3d-notch.right{
  right: 2%;
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

/* Bottom gusset shadow on the panel (where it folds in) */
.pkg-doy3d-bottom-shadow{
  position: absolute;
  left: 4%; right: 4%; bottom: 0;
  height: 14%;
  pointer-events: none; z-index: 3;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.04) 30%,
      rgba(0,0,0,.18) 70%,
      rgba(0,0,0,.32) 100%);
}

/* Bottom flat-fold gusset — the diamond pattern that makes the bag stand */
.pkg-doy3d-base{
  background: var(--pkg-color);
  filter: brightness(.78);
}
.pkg-doy3d-base-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.18) 0%,
      rgba(0,0,0,.04) 50%,
      rgba(0,0,0,.18) 100%),
    linear-gradient(90deg,
      rgba(0,0,0,.16) 0%,
      transparent 14%,
      transparent 86%,
      rgba(0,0,0,.16) 100%);
}
/* Central horizontal fold of the K-gusset */
.pkg-doy3d-base-fold-x{
  position: absolute;
  left: 6%; right: 6%;
  top: 50%;
  height: 0;
  border-top: 1px solid rgba(0,0,0,.30);
  pointer-events: none;
}
/* Two diagonal folds from edges toward the centre line */
.pkg-doy3d-base-fold-d1,
.pkg-doy3d-base-fold-d2{
  position: absolute;
  top: 50%; bottom: 6%;
  width: 1px;
  background: rgba(0,0,0,.22);
  pointer-events: none;
  transform-origin: 50% 0%;
}
.pkg-doy3d-base-fold-d1{ left: 14%; transform: rotate(-22deg); }
.pkg-doy3d-base-fold-d2{ right: 14%; transform: rotate(22deg); }

.pkg-doy3d-art-area{
  position: absolute;
  left: 14%; right: 14%;
  top: 18%; bottom: 18%;
}

/* ════════════════════════════════════════════════════════
   2) ZIP-LOCK 3D · flat resealable pouch
   ════════════════════════════════════════════════════════
   Very thin D=18 cuboid. Visible interlocking zipper teeth
   sit just below a top flap with a punched hang-hole.        */

@keyframes pkg-zip3d-rock{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-12deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-6deg);  }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-12deg); }
}
.pkg-zip3d-idle{ animation: pkg-zip3d-rock 11s ease-in-out infinite; }

.pkg-zip3d-front, .pkg-zip3d-back{
  border-radius: 4px 4px 2px 2px;
}

.pkg-zip3d-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    radial-gradient(ellipse 55% 60% at 48% 50%,
      rgba(255,255,255,.20) 0%,
      rgba(255,255,255,.04) 50%,
      transparent 75%),
    linear-gradient(90deg,
      rgba(0,0,0,.14) 0%,
      rgba(0,0,0,.04) 4%,
      transparent 10%,
      transparent 90%,
      rgba(0,0,0,.04) 96%,
      rgba(0,0,0,.14) 100%),
    linear-gradient(125deg,
      transparent 30%,
      rgba(255,255,255,.08) 36%,
      rgba(255,255,255,.10) 40%,
      transparent 46%,
      transparent 100%);
}
.pkg-zip3d-mat.back{ filter: brightness(.95); }

.pkg-zip3d-edge{
  position: absolute;
  top: 18%; bottom: 4%;
  width: 4%;
  pointer-events: none; z-index: 2;
}
.pkg-zip3d-edge.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.22) 0%,
      rgba(0,0,0,.06) 60%,
      transparent 100%);
}
.pkg-zip3d-edge.right{
  right: 0;
  background:
    linear-gradient(90deg,
      transparent 0%,
      rgba(0,0,0,.06) 40%,
      rgba(0,0,0,.22) 100%);
}

.pkg-zip3d-top-flap{
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 9%;
  z-index: 4;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.06) 0%,
      rgba(0,0,0,.03) 60%,
      rgba(0,0,0,.12) 100%);
  border-bottom: 0.5px solid rgba(0,0,0,.10);
}
.pkg-zip3d-hang-hole{
  position: absolute;
  left: 50%; top: 38%;
  transform: translateX(-50%);
  width: 32px; height: 8px;
  background: linear-gradient(180deg, #0a0e16, #1a2238);
  border-radius: 999px;
  box-shadow:
    inset 0 1px 2px rgba(0,0,0,.6),
    0 .5px 0 rgba(255,255,255,.18);
}

.pkg-zip3d-zip{
  position: absolute;
  left: 2%; right: 2%;
  top: 9%;
  height: 8%;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.04) 0%,
      rgba(0,0,0,.10) 50%,
      rgba(0,0,0,.04) 100%);
  border-top: 0.5px solid rgba(0,0,0,.22);
  border-bottom: 0.5px solid rgba(0,0,0,.22);
}
.pkg-zip3d-zip-teeth{
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.34) 0 1.5px,
      rgba(255,255,255,.22) 1.5px 3px,
      rgba(0,0,0,.18) 3px 4.5px,
      transparent 4.5px 6px);
}
.pkg-zip3d-zip-rail{
  position: absolute;
  left: 0; right: 0; top: 38%;
  height: 22%;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.26) 0%,
      rgba(0,0,0,.18) 50%,
      rgba(255,255,255,.10) 100%);
  box-shadow:
    0 .5px 0 rgba(255,255,255,.14),
    inset 0 .5px 0 rgba(0,0,0,.10);
}

.pkg-zip3d-bottom-seam{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 3.5%;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.08) 60%,
      rgba(0,0,0,.16) 100%);
  border-top: 0.5px solid rgba(0,0,0,.12);
}

.pkg-zip3d-art-area{
  left: 8%; right: 8%;
  top: 22%; bottom: 9%;
}

.pkg-zip3d-seam-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.55) 0%,
      rgba(0,0,0,.40) 50%,
      rgba(0,0,0,.55) 100%);
}

/* ════════════════════════════════════════════════════════
   3) FLAT-BOTTOM BAG 3D · block-bottom coffee bag (REBUILT)
   ════════════════════════════════════════════════════════
   Five faces + a real 3D "fin seal" ridge sticking up from
   the top. Each gusset has diagonal corner folds where the
   block-bottom geometry pinches in. Front face has a
   degassing valve disc.                                       */

@keyframes pkg-fb3d-rock{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-8deg) rotateY(-18deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-8deg) rotateY(-10deg); }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-8deg) rotateY(-18deg); }
}
.pkg-fb3d-idle{ animation: pkg-fb3d-rock 11s ease-in-out infinite; }

.pkg-fb3d-front, .pkg-fb3d-back, .pkg-fb3d-gusset{
  border-radius: 2px;
}

.pkg-fb3d-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    radial-gradient(ellipse 80% 80% at 50% 50%,
      rgba(255,255,255,.18) 0%,
      rgba(255,255,255,.04) 40%,
      transparent 70%),
    linear-gradient(90deg,
      rgba(0,0,0,.20) 0%,
      rgba(0,0,0,.05) 8%,
      transparent 22%,
      transparent 78%,
      rgba(0,0,0,.05) 92%,
      rgba(0,0,0,.20) 100%),
    linear-gradient(180deg,
      rgba(0,0,0,.10) 0%,
      transparent 14%,
      transparent 84%,
      rgba(0,0,0,.16) 100%);
}
.pkg-fb3d-mat.back{ filter: brightness(.95); }

/* Diagonal corner pinches on the body (where the gusset folds in) */
.pkg-fb3d-corner{
  position: absolute;
  width: 14%; height: 10%;
  pointer-events: none; z-index: 2;
  background: linear-gradient(135deg, rgba(0,0,0,.18) 0%, transparent 80%);
}
.pkg-fb3d-corner.tl{ left: 0; top: 0;
  background: linear-gradient(135deg, rgba(0,0,0,.26) 0%, transparent 80%); }
.pkg-fb3d-corner.tr{ right: 0; top: 0;
  background: linear-gradient(225deg, rgba(0,0,0,.26) 0%, transparent 80%); }
.pkg-fb3d-corner.bl{ left: 0; bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,.22) 0%, transparent 80%); }
.pkg-fb3d-corner.br{ right: 0; bottom: 0;
  background: linear-gradient(315deg, rgba(0,0,0,.22) 0%, transparent 80%); }

/* Degassing valve on the front face */
.pkg-fb3d-valve{
  position: absolute;
  left: 50%; top: 28%;
  transform: translateX(-50%);
  width: 22px; height: 22px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 40%,
      rgba(0,0,0,.20) 0%,
      rgba(0,0,0,.08) 38%,
      rgba(255,255,255,.12) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.30),
    inset 0 -1px 0 rgba(0,0,0,.18),
    0 1px 2px rgba(0,0,0,.10);
  z-index: 3;
}
.pkg-fb3d-valve::after{
  content: "";
  position: absolute;
  inset: 35%;
  border-radius: 50%;
  background: rgba(0,0,0,.30);
  box-shadow: inset 0 0 2px rgba(0,0,0,.5);
}

.pkg-fb3d-gusset-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.32) 0%,
      rgba(0,0,0,.18) 22%,
      rgba(0,0,0,.10) 42%,
      rgba(0,0,0,.20) 50%,
      rgba(0,0,0,.10) 58%,
      rgba(0,0,0,.18) 78%,
      rgba(0,0,0,.32) 100%);
}
.pkg-fb3d-gusset-crease{
  position: absolute;
  top: 0; bottom: 0; left: 50%; width: 1px;
  background: rgba(0,0,0,.35);
  transform: translateX(-50%);
  pointer-events: none; z-index: 2;
}

/* Diagonal fold lines at gusset corners (block-bottom geometry) */
.pkg-fb3d-gusset-diag{
  position: absolute;
  width: 1px;
  background: rgba(0,0,0,.30);
  pointer-events: none; z-index: 3;
  transform-origin: 50% 50%;
}
.pkg-fb3d-gusset-diag.tl{
  left: 0; top: 0; height: 18%;
  transform: rotate(-32deg) translateY(0);
  transform-origin: 0% 0%;
  width: 70%;
  height: 1px;
}
.pkg-fb3d-gusset-diag.tr{
  right: 0; top: 0; height: 1px;
  transform: rotate(32deg);
  transform-origin: 100% 0%;
  width: 70%;
}
.pkg-fb3d-gusset-diag.bl{
  left: 0; bottom: 0; height: 1px;
  transform: rotate(32deg);
  transform-origin: 0% 100%;
  width: 70%;
}
.pkg-fb3d-gusset-diag.br{
  right: 0; bottom: 0; height: 1px;
  transform: rotate(-32deg);
  transform-origin: 100% 100%;
  width: 70%;
}

.pkg-fb3d-base-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.34) 0%,
      rgba(0,0,0,.38) 50%,
      rgba(0,0,0,.24) 100%);
}

/* Top face — flat seal area at the very top of the body, below the fin */
.pkg-fb3d-top-mat{
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.18) 0%,
      rgba(0,0,0,.08) 80%,
      rgba(0,0,0,.20) 100%),
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.06) 0 1px, transparent 1px 3px);
}

/* ── Fin seal — the 3D ridge sticking up above the top ── */
.pkg-fb3d-fin{
  position: absolute;
  pointer-events: none;
  background: var(--pkg-color);
  filter: brightness(1.06);
  z-index: 5;
}
.pkg-fb3d-fin-mat{
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.16) 0%,
      rgba(255,255,255,.18) 32%,
      rgba(255,255,255,.10) 50%,
      rgba(0,0,0,.06) 75%,
      rgba(0,0,0,.22) 100%);
  box-shadow:
    inset 0 1px 0 rgba(0,0,0,.25),
    inset 0 -1px 0 rgba(0,0,0,.18);
}
.pkg-fb3d-fin-ribs{
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(0deg,
      rgba(0,0,0,.10) 0 1px,
      rgba(255,255,255,.12) 1px 2px,
      transparent 2px 3px);
  mix-blend-mode: overlay;
  opacity: .85;
}
.pkg-fb3d-fin-pull{
  position: absolute;
  left: 50%; top: 20%;
  transform: translateX(-50%);
  width: 22px; height: 12px;
  background: rgba(245,240,232,.88);
  border-radius: 999px 999px 4px 4px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.6),
    0 1px 2px rgba(0,0,0,.22);
}
.pkg-fb3d-fin-pull::after{
  content: "";
  position: absolute;
  left: 6px; right: 6px; top: 3px; bottom: 3px;
  background: rgba(0,0,0,.18);
  border-radius: 999px 999px 2px 2px;
}

.pkg-fb3d-art-area{
  position: absolute;
  left: 14%; right: 14%;
  top: 42%; bottom: 18%;
}

/* ════════════════════════════════════════════════════════
   4) PAPER BAG WITH HANDLES · shopping bag (FULL REBUILD)
   ════════════════════════════════════════════════════════
   Kraft shopping bag. Flat paper-strap handles, prominent
   top fold band, visible diagonal fold lines on the gussets
   where the side wall pinches in at the corners.            */

@keyframes pkg-pb3d-rock{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(-22deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(-14deg); }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(-22deg); }
}
.pkg-pb3d-idle{ animation: pkg-pb3d-rock 11s ease-in-out infinite; }

.pkg-pb3d-front, .pkg-pb3d-back, .pkg-pb3d-gusset{
  border-radius: 1px;
  box-shadow: 0 8px 14px rgba(0,0,0,.12);
}

.pkg-pb3d-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    /* central highlight from soft light */
    radial-gradient(ellipse 65% 70% at 50% 45%,
      rgba(255,255,255,.20) 0%,
      rgba(255,255,255,.06) 45%,
      transparent 75%),
    /* edge shadows where paper folds onto the gusset */
    linear-gradient(90deg,
      rgba(0,0,0,.24) 0%,
      rgba(0,0,0,.06) 7%,
      transparent 18%,
      transparent 82%,
      rgba(0,0,0,.06) 93%,
      rgba(0,0,0,.24) 100%),
    /* kraft fiber texture — dense crosshatch */
    repeating-linear-gradient(92deg,
      rgba(0,0,0,.028) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(3deg,
      rgba(0,0,0,.022) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(48deg,
      rgba(0,0,0,.014) 0 1px, transparent 1px 6px),
    /* warm kraft top-to-bottom shading — subtle */
    linear-gradient(180deg,
      rgba(120, 75, 30, .03) 0%,
      transparent 30%,
      rgba(70, 40, 12, .04) 100%);
}
.pkg-pb3d-mat.back{ filter: brightness(.93); }

/* Random crinkles/folds across the paper — make it look used */
.pkg-pb3d-wrinkles{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    radial-gradient(ellipse 35% 6%  at 30% 38%, rgba(0,0,0,.07) 0%, transparent 70%),
    radial-gradient(ellipse 28% 5%  at 65% 56%, rgba(255,255,255,.06) 0%, transparent 70%),
    radial-gradient(ellipse 22% 5%  at 22% 70%, rgba(0,0,0,.06) 0%, transparent 70%),
    radial-gradient(ellipse 30% 4%  at 72% 26%, rgba(0,0,0,.05) 0%, transparent 70%),
    radial-gradient(ellipse 18% 4%  at 48% 64%, rgba(0,0,0,.04) 0%, transparent 70%);
  mix-blend-mode: multiply;
}

.pkg-pb3d-edge{
  position: absolute;
  top: 14%; bottom: 18%;
  width: 6%;
  pointer-events: none; z-index: 2;
}
.pkg-pb3d-edge.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.36) 0%,
      rgba(0,0,0,.10) 50%,
      transparent 100%);
}
.pkg-pb3d-edge.right{
  right: 0;
  background:
    linear-gradient(90deg,
      transparent 0%,
      rgba(0,0,0,.10) 50%,
      rgba(0,0,0,.36) 100%);
}

/* Top fold band — the visible folded-over reinforcement at the top edge */
.pkg-pb3d-top-fold{
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 9%;
  pointer-events: none; z-index: 4;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.08) 0%,
      rgba(255,255,255,.12) 14%,
      rgba(0,0,0,.04) 70%,
      rgba(0,0,0,.26) 100%);
  border-bottom: 1px solid rgba(0,0,0,.32);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.22),
    0 1px 0 rgba(0,0,0,.20);
}

/* Bottom interior shadow & visible fold line where base flap attaches */
.pkg-pb3d-bottom-shadow{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10%;
  pointer-events: none; z-index: 3;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.05) 50%,
      rgba(0,0,0,.15) 100%);
}
.pkg-pb3d-bottom-fold-line{
  position: absolute;
  left: 4%; right: 4%;
  bottom: 12%;
  height: 0;
  border-top: 1px solid rgba(0,0,0,.20);
  pointer-events: none; z-index: 3;
}

.pkg-pb3d-gusset-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.30) 0%,
      rgba(0,0,0,.12) 22%,
      rgba(0,0,0,.06) 42%,
      rgba(0,0,0,.26) 50%,
      rgba(0,0,0,.06) 58%,
      rgba(0,0,0,.12) 78%,
      rgba(0,0,0,.30) 100%),
    repeating-linear-gradient(3deg,
      rgba(0,0,0,.024) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(92deg,
      rgba(0,0,0,.018) 0 1px, transparent 1px 3px);
}
/* Central vertical fold (the gusset bends inward along this line) */
.pkg-pb3d-gusset-crease{
  position: absolute;
  top: 9%; bottom: 14%; left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: rgba(0,0,0,.38);
  pointer-events: none; z-index: 2;
}
/* Diagonal corner folds — top-left and bottom-left of each gusset */
.pkg-pb3d-gusset-corner{
  position: absolute;
  pointer-events: none; z-index: 3;
  background: rgba(0,0,0,.20);
  width: 60%; height: 1px;
  transform-origin: 0% 0%;
}
.pkg-pb3d-gusset-corner.tl{
  left: 0; top: 9%;
  transform: rotate(35deg);
}
.pkg-pb3d-gusset-corner.bl{
  left: 0; bottom: 14%;
  transform: rotate(-35deg);
}

.pkg-pb3d-base{
  background: var(--pkg-color);
  filter: brightness(.85);
}
.pkg-pb3d-base-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.30) 0%,
      rgba(0,0,0,.40) 50%,
      rgba(0,0,0,.26) 100%);
}
.pkg-pb3d-base-fold{
  position: absolute;
  background: rgba(0,0,0,.28);
  pointer-events: none;
}
.pkg-pb3d-base-fold.v{
  top: 8%; bottom: 8%;
  left: 50%; width: 1px;
  transform: translateX(-50%);
}
.pkg-pb3d-base-fold.h{
  left: 8%; right: 8%;
  top: 50%; height: 1px;
}
.pkg-pb3d-base-fold.d1{
  left: 8%; top: 50%;
  width: 38%; height: 1px;
  transform: rotate(28deg);
  transform-origin: 0% 0%;
  background: rgba(0,0,0,.18);
}
.pkg-pb3d-base-fold.d2{
  right: 8%; top: 50%;
  width: 38%; height: 1px;
  transform: rotate(-28deg);
  transform-origin: 100% 0%;
  background: rgba(0,0,0,.18);
}

/* ── FLAT PAPER-STRAP HANDLES (arched, single div) ── */
.pkg-pb3d-handle-layer{
  position: absolute;
  top: 0; left: 0;
  transform-style: preserve-3d;
  pointer-events: none;
}
.pkg-pb3d-handle{
  position: absolute;
  top: -38px;
  width: 26%;
  height: 50px;
  border: 6px solid var(--pkg-handle-color, #8b6b40);
  border-bottom: 0;
  /* Flat-topped arch with rounded corners — like real folded-paper strap */
  border-radius: 999px 999px 4px 4px;
  background: transparent;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.14),
    inset 0 -1px 0 rgba(0,0,0,.18),
    0 2px 3px rgba(0,0,0,.20);
}
.pkg-pb3d-handle.left{  left: 16%; }
.pkg-pb3d-handle.right{ right: 16%; }

/* Reinforcement patches where each leg attaches to the bag top */
.pkg-pb3d-handle-anchor{
  position: absolute;
  bottom: -8px;
  width: 16px; height: 12px;
  background:
    linear-gradient(180deg,
      var(--pkg-handle-color, #8b6b40) 0%,
      var(--pkg-handle-dark, #6b4f29) 100%);
  border-radius: 0 0 2px 2px;
  box-shadow:
    0 1px 2px rgba(0,0,0,.20),
    inset 0 1px 0 rgba(255,255,255,.08);
}
.pkg-pb3d-handle-anchor.left{  left: -5px; }
.pkg-pb3d-handle-anchor.right{ right: -5px; }

.pkg-pb3d-art-area{
  position: absolute;
  left: 14%; right: 14%;
  top: 22%; bottom: 22%;
}

/* ════════════════════════════════════════════════════════
   5) COURIER MAILER 3D · poly mailer
   ════════════════════════════════════════════════════════
   Very thin cuboid + a real 3D fold-over flap on top, tilted
   forward so you can see the adhesive strip. Front face has
   a printed shipping label patch.                              */

@keyframes pkg-cb3d-rock{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-12deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-6deg);  }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-6deg) rotateY(-12deg); }
}
.pkg-cb3d-idle{ animation: pkg-cb3d-rock 11s ease-in-out infinite; }

.pkg-cb3d-front, .pkg-cb3d-back{ border-radius: 2px; }

.pkg-cb3d-mat{
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  background:
    radial-gradient(ellipse 60% 60% at 50% 48%,
      rgba(255,255,255,.14) 0%,
      rgba(255,255,255,.03) 50%,
      transparent 72%),
    linear-gradient(90deg,
      rgba(0,0,0,.12) 0%,
      rgba(0,0,0,.04) 4%,
      transparent 10%,
      transparent 90%,
      rgba(0,0,0,.04) 96%,
      rgba(0,0,0,.12) 100%),
    linear-gradient(118deg,
      transparent 35%,
      rgba(255,255,255,.06) 40%,
      rgba(255,255,255,.10) 44%,
      transparent 48%,
      transparent 100%);
}
.pkg-cb3d-mat.back{ filter: brightness(.94); }

.pkg-cb3d-weld{
  position: absolute;
  pointer-events: none;
  z-index: 3;
}
.pkg-cb3d-weld.left{
  left: 0; top: 18%; bottom: 0; width: 3%;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.16) 0%,
      rgba(0,0,0,.05) 50%,
      transparent 100%);
  border-right: 0.5px solid rgba(0,0,0,.10);
}
.pkg-cb3d-weld.right{
  right: 0; top: 18%; bottom: 0; width: 3%;
  background:
    linear-gradient(90deg,
      transparent 0%,
      rgba(0,0,0,.05) 50%,
      rgba(0,0,0,.16) 100%);
  border-left: 0.5px solid rgba(0,0,0,.10);
}
.pkg-cb3d-weld.bottom{
  left: 0; right: 0; bottom: 0; height: 3%;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.06) 50%,
      rgba(0,0,0,.14) 100%);
  border-top: 0.5px solid rgba(0,0,0,.08);
}

/* Shipping label patch (printed on the front face) */
.pkg-cb3d-label{
  position: absolute;
  left: 8%; top: 32%;
  width: 38%; height: 36%;
  background: #f6f3ec;
  border: 1px solid rgba(0,0,0,.22);
  border-radius: 2px;
  z-index: 4;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.6),
    0 1px 2px rgba(0,0,0,.10);
  overflow: hidden;
}
.pkg-cb3d-label::before{
  content: "SHIP TO";
  position: absolute;
  left: 6px; top: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 6px;
  letter-spacing: .14em;
  color: rgba(0,0,0,.55);
}
.pkg-cb3d-label::after{
  content: "";
  position: absolute;
  left: 6px; right: 6px; top: 18px;
  height: 28px;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.55) 0 1px, transparent 1px 6px,
      rgba(0,0,0,.55) 6px 7px, transparent 7px 12px,
      rgba(0,0,0,.55) 12px 13px, transparent 13px 22px);
}
.pkg-cb3d-label-stripe{
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 5px;
  background: linear-gradient(90deg, #d9534f, #b04543);
  border-bottom: 1px solid rgba(0,0,0,.20);
}
.pkg-cb3d-label-barcode{
  position: absolute;
  left: 6px; right: 6px; bottom: 4px;
  height: 14px;
  background:
    repeating-linear-gradient(90deg,
      #0a0e16 0 1px,
      transparent 1px 2px,
      #0a0e16 2px 4px,
      transparent 4px 6px,
      #0a0e16 6px 7px,
      transparent 7px 11px);
}

.pkg-cb3d-art-area{
  left: 50%; right: 6%;
  top: 32%; bottom: 8%;
}

.pkg-cb3d-seam-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.55) 0%,
      rgba(0,0,0,.40) 50%,
      rgba(0,0,0,.55) 100%);
}

/* Fold-over flap — its own 3D sub-stage tilted forward */
.pkg-cb3d-flap{
  position: absolute;
  transform-style: preserve-3d;
  pointer-events: none;
  background: var(--pkg-color, #B08A5B);
  border-radius: 2px 2px 0 0;
  box-shadow:
    0 -2px 4px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.12);
  overflow: hidden;
  filter: brightness(1.06);
  clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
}
.pkg-cb3d-flap-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.10) 0%,
      rgba(0,0,0,.04) 60%,
      rgba(0,0,0,.10) 100%),
    linear-gradient(118deg,
      transparent 30%,
      rgba(255,255,255,.08) 38%,
      rgba(255,255,255,.12) 42%,
      transparent 50%);
}
.pkg-cb3d-flap-fold-line{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 0;
  border-bottom: 1px solid rgba(0,0,0,.22);
  box-shadow:
    0 -1px 0 rgba(0,0,0,.06),
    0 1px 0 rgba(255,255,255,.08);
}
.pkg-cb3d-flap-adhesive{
  position: absolute;
  left: 6%; right: 6%;
  bottom: 18%;
  height: 46%;
  background:
    repeating-linear-gradient(90deg,
      rgba(255,255,255,.26) 0 5px,
      rgba(255,255,255,.10) 5px 8px),
    linear-gradient(180deg,
      rgba(255,255,255,.22) 0%,
      rgba(255,255,255,.08) 100%);
  border: 0.5px dashed rgba(0,0,0,.20);
  border-radius: 1px;
}
.pkg-cb3d-flap-peel{
  position: absolute;
  left: 0; right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 7px;
  letter-spacing: .22em;
  color: rgba(0,0,0,.40);
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

/* ── Variant-specific dieline helpers ── */
.pkg-unfold .panel.ghost{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    repeating-linear-gradient(135deg,
      rgba(15,22,38,.04) 0 8px,
      rgba(15,22,38,.08) 8px 16px);
  border: 1px dashed rgba(15,22,38,.22);
  color: rgba(0,0,0,.45);
}
.pkg-unfold .panel.ghost .panel-label{
  position: static;
  background: rgba(255,255,255,.7);
}
.pkg-unfold-caption{
  width: 100%;
  text-align: center;
  margin-top: 14px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(0,0,0,.45);
}

/* idle-вращение */
@keyframes pkt-idle-rotate{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(-24deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(24deg);  }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-14deg) rotateY(-24deg); }
}
.pkg-3d.idle{ animation: pkt-idle-rotate 14s ease-in-out infinite; }
`;
