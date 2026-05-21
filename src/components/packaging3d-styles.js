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
/* ─── DOY-PACK 2.5D MOCKUP ─────────────────────────
   Single coherent stand-up pouch.
   No separated 3D side panels.
   Side depth suggested by shadows, not geometry.
   ───────────────────────────────────────────────── */

/* Wrapper — positions the pouch, handles tilt */
.pkg-doy-mockup{
  pointer-events: auto;
}
.pkg-stage.dragging .pkg-doy-mockup{
  transition: none;
}

/* Idle gentle rocking */
@keyframes pkg-doy-rock{
  0%   { transform: translate3d(-50%,-50%,0) perspective(800px) rotateY(-3deg) rotateX(-1deg); }
  50%  { transform: translate3d(-50%,-50%,0) perspective(800px) rotateY(3deg)  rotateX(-1deg); }
  100% { transform: translate3d(-50%,-50%,0) perspective(800px) rotateY(-3deg) rotateX(-1deg); }
}
.pkg-doy-idle{
  animation: pkg-doy-rock 10s ease-in-out infinite;
}

/* ── Main pouch body ────────────────────────────── */
.pkg-doy-body{
  position: absolute;
  inset: 0;
  background: var(--pkg-color, #B08A5B);
  overflow: hidden;

  /* Realistic doy-pack silhouette:
     - slightly inset top (seal area narrower than body)
     - gently rounded shoulders
     - near-straight sides with very slight outward bow
     - bottom with subtle upward curve (standing gusset) */
  clip-path: polygon(
    /* top seal — narrower than body */
    14% 0%, 86% 0%,
    /* right shoulder — smooth curve outward */
    91% 0.6%, 94% 1.6%, 96.5% 3.5%, 98% 6%,
    /* right side — very slight outward bow */
    99% 10%, 99.5% 18%, 100% 30%,
    100% 50%, 100% 70%,
    99.5% 80%, 99% 87%,
    /* lower right — gentle curve to base */
    98% 91%, 96% 94.5%, 93% 96.5%,
    /* bottom — subtle upward curve for standing gusset */
    88% 98%, 78% 99.4%, 65% 100%,
    50% 100.3%,
    35% 100%, 22% 99.4%, 12% 98%,
    /* lower left */
    7% 96.5%, 4% 94.5%, 2% 91%,
    /* left side */
    1% 87%, 0.5% 80%, 0% 70%,
    0% 50%, 0% 30%,
    0.5% 18%, 1% 10%,
    /* left shoulder */
    2% 6%, 3.5% 3.5%, 6% 1.6%, 9% 0.6%
  );

  box-shadow:
    0 2px 16px rgba(0,0,0,.10),
    inset 0 0 0 1px rgba(0,0,0,.04);
}

/* ── Kraft paper texture + body shading ─────────── */
.pkg-doy-texture{
  position:absolute; inset:0;
  pointer-events:none;
  z-index: 1;
  background:
    /* Central soft convex highlight */
    radial-gradient(ellipse 55% 65% at 50% 45%,
      rgba(255,255,255,.13) 0%,
      rgba(255,255,255,.03) 55%,
      rgba(255,255,255,0) 75%),
    /* Side edge darkening */
    linear-gradient(90deg,
      rgba(0,0,0,.18) 0%,
      rgba(0,0,0,.06) 5%,
      rgba(0,0,0,0) 12%,
      transparent 40%,
      transparent 60%,
      rgba(0,0,0,0) 88%,
      rgba(0,0,0,.06) 95%,
      rgba(0,0,0,.18) 100%),
    /* Very subtle kraft paper grain */
    repeating-linear-gradient(92deg,
      rgba(0,0,0,.012) 0 1px,
      transparent 1px 3px),
    repeating-linear-gradient(2deg,
      rgba(0,0,0,.008) 0 1px,
      transparent 1px 4px);
}

/* ── Side fold shadows (gusset suggestion) ─────── */
.pkg-doy-side-shadow{
  position:absolute;
  top: 9%; bottom: 13%;
  width: 8%;
  z-index: 2;
  pointer-events:none;
}
.pkg-doy-side-shadow.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.16) 0%,
      rgba(0,0,0,.06) 40%,
      rgba(0,0,0,0) 100%);
}
.pkg-doy-side-shadow.right{
  right: 0;
  background:
    linear-gradient(-90deg,
      rgba(0,0,0,.16) 0%,
      rgba(0,0,0,.06) 40%,
      rgba(0,0,0,0) 100%);
}

/* ── Top seal band ─────────────────────────────── */
.pkg-doy-seal{
  position:absolute;
  left: 13%; right: 13%; top: 0;
  height: 10%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.04) 0%,
      rgba(255,255,255,.08) 25%,
      rgba(0,0,0,.02) 50%,
      rgba(255,255,255,.06) 75%,
      rgba(0,0,0,.08) 100%);
  border-bottom: 1px solid rgba(0,0,0,.12);
  box-shadow: 0 1px 0 rgba(255,255,255,.08);
  z-index: 5;
  pointer-events:none;
}

/* ── Zipper / closure lines ────────────────────── */
.pkg-doy-zipper{
  position:absolute;
  left: 10%; right: 10%;
  top: 10%;
  height: 2.2%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.05) 0%,
      rgba(0,0,0,.12) 40%,
      rgba(0,0,0,.10) 60%,
      rgba(0,0,0,.04) 100%);
  box-shadow:
    0 1px 0 rgba(255,255,255,.06);
  z-index: 5;
  pointer-events:none;
}
/* Double track inside zipper */
.pkg-doy-zipper::after{
  content:"";
  position:absolute;
  left: 3%; right: 3%;
  top: 35%;
  height: 0;
  border-top: 0.5px solid rgba(0,0,0,.10);
  box-shadow: 0 1.5px 0 rgba(0,0,0,.06);
}

/* ── Tear notches ──────────────────────────────── */
.pkg-doy-notch{
  position:absolute;
  top: 9.5%;
  width: 4px;
  height: 6px;
  z-index: 6;
  pointer-events:none;
}
.pkg-doy-notch.left{
  left: 13%;
  background: rgba(0,0,0,.22);
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
}
.pkg-doy-notch.right{
  right: 13%;
  background: rgba(0,0,0,.22);
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

/* ── Bottom gusset ─────────────────────────────── */
.pkg-doy-bottom-gusset{
  position:absolute;
  left: 0; right: 0;
  bottom: 0;
  height: 13%;
  z-index: 3;
  pointer-events:none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.03) 25%,
      rgba(0,0,0,.08) 55%,
      rgba(0,0,0,.16) 100%);
}
/* Fold crease line */
.pkg-doy-bottom-gusset::before{
  content:"";
  position:absolute;
  left: 5%; right: 5%; top: 0;
  height: 0;
  border-top: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 -1px 0 rgba(255,255,255,.05);
}
/* Curved bottom edge shadow */
.pkg-doy-bottom-gusset::after{
  content:"";
  position:absolute;
  left: 10%; right: 10%; bottom: 0;
  height: 35%;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.06),
      rgba(0,0,0,.14));
}

/* ── Branding area (centered on pouch) ─────────── */
.pkg-doy-art-area{
  position:absolute;
  left: 14%; right: 14%;
  top: 16%; bottom: 18%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.pkg-doy-art-area .pkg-art{
  position: relative;
  inset: auto;
  width: 100%; height: 100%;
  padding: 8% 6%;
}

/* ── Side edge strip (subtle depth indicator) ──── */
.pkg-doy-edge{
  position:absolute;
  top: 6%; bottom: 5%;
  width: 6px;
  z-index: -1;
  pointer-events:none;
  border-radius: 0 2px 2px 0;
}
.pkg-doy-edge.right{
  right: -5px;
  background:
    linear-gradient(90deg,
      var(--pkg-dark-edge, #8a6d47),
      rgba(0,0,0,.22));
  clip-path: polygon(
    0 2%, 100% 4%,
    100% 96%, 0 98%
  );
  box-shadow: 1px 0 3px rgba(0,0,0,.12);
}

/* ── Floor contact shadow ──────────────────────── */
.pkg-doy-floor-shadow{
  position:absolute;
  left: 8%; right: 8%;
  bottom: -8px;
  height: 16px;
  background:
    radial-gradient(ellipse at 50% 20%,
      rgba(0,0,0,.22) 0%,
      rgba(0,0,0,.08) 50%,
      rgba(0,0,0,0) 80%);
  filter: blur(4px);
  pointer-events: none;
  z-index: -1;
}

/* ── Keep old class names that other bag types use ── */
.pkg-bag-doy .pkg-bag-face{
  /* no longer used — doy-pack renders via .pkg-doy-mockup */
}

/* ─── ZIP-LOCK 2.5D FLAT POUCH ─────────────────────
   Flat hermetic plastic bag — no side walls.
   Translucent / milky plastic look.
   ───────────────────────────────────────────────── */

/* Wrapper */
.pkg-zip-mockup{
  pointer-events: auto;
}
.pkg-stage.dragging .pkg-zip-mockup{
  transition: none;
}

/* Idle gentle rocking */
@keyframes pkg-zip-rock{
  0%   { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(-2deg) rotateX(-0.5deg); }
  50%  { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(2deg)  rotateX(-0.5deg); }
  100% { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(-2deg) rotateX(-0.5deg); }
}
.pkg-zip-idle{
  animation: pkg-zip-rock 10s ease-in-out infinite;
}

/* ── Main flat pouch body ──────────────────────── */
.pkg-zip-body{
  position: absolute;
  inset: 0;
  background: var(--pkg-color, #B08A5B);
  overflow: hidden;

  /* Soft-rectangle silhouette — very slightly rounded corners,
     nearly rectangular like a real plastic zip-lock bag */
  border-radius: 3px;
  clip-path: polygon(
    1% 0%, 99% 0%,
    100% 0.6%, 100% 99.4%,
    99% 100%, 1% 100%,
    0% 99.4%, 0% 0.6%
  );

  box-shadow:
    0 2px 12px rgba(0,0,0,.10),
    inset 0 0 0 1px rgba(255,255,255,.08);
}

/* ── Plastic material texture + highlights ──────── */
.pkg-zip-plastic{
  position:absolute; inset:0;
  pointer-events:none;
  z-index: 1;
  background:
    /* Central soft gloss — convex plastic feel */
    radial-gradient(ellipse 50% 55% at 48% 50%,
      rgba(255,255,255,.16) 0%,
      rgba(255,255,255,.04) 50%,
      rgba(255,255,255,0) 75%),
    /* Side edge darkening — thin seam suggestion */
    linear-gradient(90deg,
      rgba(0,0,0,.14) 0%,
      rgba(0,0,0,.04) 3%,
      transparent 8%,
      transparent 92%,
      rgba(0,0,0,.04) 97%,
      rgba(0,0,0,.14) 100%),
    /* Vertical plastic sheen (subtle) */
    linear-gradient(180deg,
      rgba(255,255,255,.06) 0%,
      rgba(255,255,255,.02) 15%,
      transparent 40%,
      transparent 75%,
      rgba(0,0,0,.04) 100%),
    /* Diagonal gloss streak — plastic film reflection */
    linear-gradient(125deg,
      transparent 0%,
      transparent 30%,
      rgba(255,255,255,.06) 35%,
      rgba(255,255,255,.10) 40%,
      transparent 45%,
      transparent 100%);
}

/* ── Edge seams (thin heat-sealed borders) ──────── */
.pkg-zip-seam{
  position:absolute;
  top: 0; bottom: 0;
  width: 3%;
  z-index: 2;
  pointer-events:none;
}
.pkg-zip-seam.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.10) 0%,
      rgba(0,0,0,.04) 50%,
      transparent 100%);
  border-right: 0.5px solid rgba(0,0,0,.06);
}
.pkg-zip-seam.right{
  right: 0;
  background:
    linear-gradient(-90deg,
      rgba(0,0,0,.10) 0%,
      rgba(0,0,0,.04) 50%,
      transparent 100%);
  border-left: 0.5px solid rgba(0,0,0,.06);
}

/* ── Top flap (above zipper) ───────────────────── */
.pkg-zip-top-flap{
  position:absolute;
  left: 0; right: 0; top: 0;
  height: 8%;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.06) 0%,
      rgba(0,0,0,.03) 60%,
      rgba(0,0,0,.06) 100%);
  border-bottom: 0.5px solid rgba(0,0,0,.08);
  z-index: 4;
  pointer-events:none;
}

/* ── Zip-lock closure strip ────────────────────── */
.pkg-zip-closure{
  position:absolute;
  left: 3%; right: 3%;
  top: 8%;
  height: 6%;
  z-index: 5;
  pointer-events:none;
  background:
    /* Multiple horizontal track lines — the zip-lock mechanism */
    linear-gradient(180deg,
      rgba(255,255,255,.08) 0%,
      rgba(0,0,0,.06) 10%,
      rgba(255,255,255,.10) 18%,
      rgba(0,0,0,.10) 28%,
      rgba(255,255,255,.06) 36%,
      rgba(0,0,0,.12) 46%,
      rgba(255,255,255,.08) 56%,
      rgba(0,0,0,.08) 66%,
      rgba(255,255,255,.06) 76%,
      rgba(0,0,0,.06) 88%,
      rgba(255,255,255,.04) 100%);
  border-top: 0.5px solid rgba(0,0,0,.10);
  border-bottom: 0.5px solid rgba(0,0,0,.10);
  box-shadow:
    0 1px 0 rgba(255,255,255,.06);
}

/* ── Colored closure line (the main zip strip) ─── */
.pkg-zip-closure-line{
  position:absolute;
  left: 4%; right: 4%;
  top: 9.5%;
  height: 1.6%;
  z-index: 6;
  pointer-events:none;
  background:
    linear-gradient(180deg,
      rgba(220,60,50,.75) 0%,
      rgba(200,45,40,.85) 50%,
      rgba(180,40,35,.70) 100%);
  box-shadow:
    0 0.5px 0 rgba(255,255,255,.15),
    0 -0.5px 0 rgba(0,0,0,.10);
  border-radius: 0.5px;
}

/* ── Bottom edge ───────────────────────────────── */
.pkg-zip-bottom-edge{
  position:absolute;
  left: 0; right: 0;
  bottom: 0;
  height: 2%;
  z-index: 2;
  pointer-events:none;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.06) 60%,
      rgba(0,0,0,.10) 100%);
  border-top: 0.5px solid rgba(0,0,0,.04);
}

/* ── Branding area ─────────────────────────────── */
.pkg-zip-art-area{
  position:absolute;
  left: 8%; right: 8%;
  top: 18%; bottom: 8%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.pkg-zip-art-area .pkg-art{
  position: relative;
  inset: auto;
  width: 100%; height: 100%;
  padding: 8% 6%;
}

/* ── Floor shadow ──────────────────────────────── */
.pkg-zip-floor-shadow{
  position:absolute;
  left: 6%; right: 6%;
  bottom: -6px;
  height: 12px;
  background:
    radial-gradient(ellipse at 50% 20%,
      rgba(0,0,0,.18) 0%,
      rgba(0,0,0,.06) 50%,
      rgba(0,0,0,0) 80%);
  filter: blur(3px);
  pointer-events: none;
  z-index: -1;
}

/* ── Legacy class stubs (no longer used for zip-lock) ── */
.pkg-bag-zip .pkg-bag-face{ /* bypassed — zip-lock uses .pkg-zip-mockup */ }
.pkg-bag-zip .pkg-art{ inset: 18% 14% 18%; }

/* ─── FLAT-BOTTOM BAG · INTEGRATED 3D POUCH ────────
   Single coherent object: front + back panels, two
   integrated side gussets, integrated flat bottom and
   sealed top. All faces share the same preserve-3d
   parent — no detached side panel, no detached base. */

.pkg-fb-3d{
  pointer-events: auto;
}
.pkg-stage.dragging .pkg-fb-3d{ transition: none; }

/* Gentle idle rocking — reveals the integrated gusset */
@keyframes pkg-fb-rock-3d{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-2deg) rotateY(-7deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-2deg) rotateY(7deg); }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-2deg) rotateY(-7deg); }
}
.pkg-fb-idle{ animation: pkg-fb-rock-3d 11s ease-in-out infinite; }

/* Shared face base */
.pkg-fb-face{
  position: absolute;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  overflow: hidden;
  background: var(--pkg-color, #B08A5B);
}

/* Front / back panels — soft rounded top corners */
.pkg-fb-front,
.pkg-fb-back{
  border-radius: 5px 5px 1px 1px;
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,.04),
    0 1px 0 rgba(255,255,255,.04);
}
.pkg-fb-back{
  background: var(--pkg-edge, #8a7352);
}

/* Front material gradient — central convex highlight + edges */
.pkg-fb-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(ellipse 60% 65% at 50% 42%,
      rgba(255,255,255,.12) 0%,
      rgba(255,255,255,.03) 48%,
      rgba(255,255,255,0) 78%),
    linear-gradient(180deg,
      rgba(0,0,0,.05) 0%,
      rgba(0,0,0,0) 18%,
      rgba(0,0,0,0) 72%,
      rgba(0,0,0,.10) 100%),
    repeating-linear-gradient(88deg,
      rgba(0,0,0,.012) 0 1px,
      transparent 1px 3px),
    repeating-linear-gradient(2deg,
      rgba(0,0,0,.008) 0 1px,
      transparent 1px 4px);
}
.pkg-fb-mat.back{
  background:
    radial-gradient(ellipse 60% 65% at 50% 45%,
      rgba(255,255,255,.06) 0%,
      rgba(255,255,255,0) 72%),
    linear-gradient(180deg,
      rgba(0,0,0,.08) 0%,
      rgba(0,0,0,0) 22%,
      rgba(0,0,0,0) 78%,
      rgba(0,0,0,.14) 100%);
}

/* Vertical crease lines at the gusset junctions (front + back) */
.pkg-fb-crease{
  position: absolute;
  top: 7%; bottom: 13%;
  width: 14px;
  pointer-events: none;
  z-index: 2;
}
.pkg-fb-crease.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.20) 0%,
      rgba(0,0,0,.08) 32%,
      rgba(255,255,255,.06) 70%,
      rgba(0,0,0,0) 100%);
}
.pkg-fb-crease.right{
  right: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,0) 0%,
      rgba(255,255,255,.06) 30%,
      rgba(0,0,0,.08) 68%,
      rgba(0,0,0,.20) 100%);
}

/* Top seal band — runs across the front, back and gussets */
.pkg-fb-seal{
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 8.5%;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.04) 0%,
      rgba(255,255,255,.10) 18%,
      rgba(0,0,0,.02) 38%,
      rgba(255,255,255,.08) 58%,
      rgba(0,0,0,.04) 78%,
      rgba(0,0,0,.12) 100%);
  border-bottom: 1px solid rgba(0,0,0,.14);
  box-shadow: 0 1px 0 rgba(255,255,255,.05);
}
.pkg-fb-seal.narrow{ height: 8.5%; }

/* Zipper line directly under the seal */
.pkg-fb-zipper{
  position: absolute;
  left: 6%; right: 6%;
  top: 8.6%;
  height: 2%;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.05) 0%,
      rgba(0,0,0,.14) 45%,
      rgba(0,0,0,.10) 62%,
      rgba(0,0,0,.04) 100%);
  box-shadow: 0 1px 0 rgba(255,255,255,.05);
}
.pkg-fb-zipper::after{
  content: "";
  position: absolute;
  left: 4%; right: 4%; top: 38%;
  height: 0;
  border-top: 0.5px solid rgba(0,0,0,.10);
  box-shadow: 0 1.5px 0 rgba(0,0,0,.06);
}

/* Tear notches at the seal edges */
.pkg-fb-notch{
  position: absolute;
  top: 8%;
  width: 4px; height: 6px;
  z-index: 6;
  pointer-events: none;
  background: rgba(0,0,0,.22);
}
.pkg-fb-notch.left { left: 0;   clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%); }
.pkg-fb-notch.right{ right: 0;  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%); }

/* Bottom fold transition on front/back (pouch curls into the base) */
.pkg-fb-bottom-fold{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 11%;
  z-index: 3;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.05) 35%,
      rgba(0,0,0,.16) 78%,
      rgba(0,0,0,.26) 100%);
}
.pkg-fb-bottom-fold::before{
  content: "";
  position: absolute;
  left: 4%; right: 4%; top: 0;
  height: 0;
  border-top: 1px solid rgba(0,0,0,.10);
  box-shadow: 0 -1px 0 rgba(255,255,255,.04);
}

/* Branding area — sits comfortably inside the front panel */
.pkg-fb-art-area{
  position: absolute;
  left: 11%; right: 11%;
  top: 16%; bottom: 18%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.pkg-fb-art-area .pkg-art{
  position: relative;
  inset: auto;
  width: 100%; height: 100%;
  padding: 6% 5%;
}

/* Side gusset faces — integrated into the pouch body */
.pkg-fb-gusset{
  background: var(--pkg-edge, #8a7352);
}
.pkg-fb-gusset-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.06) 0%,
      rgba(0,0,0,0) 18%,
      rgba(0,0,0,0) 78%,
      rgba(0,0,0,.14) 100%);
}
/* Central vertical inward fold of the gusset */
.pkg-fb-gusset-fold{
  position: absolute;
  top: 7%; bottom: 8%; left: 0; right: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg,
      rgba(255,255,255,.06) 0%,
      rgba(0,0,0,.08) 30%,
      rgba(0,0,0,.22) 48%,
      rgba(0,0,0,.22) 52%,
      rgba(0,0,0,.08) 70%,
      rgba(255,255,255,.06) 100%);
}
/* Gusset narrows into the base at the bottom */
.pkg-fb-gusset-bottom{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 14%;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.12) 55%,
      rgba(0,0,0,.26) 100%);
}

/* Integrated flat bottom (the cuboid envelope's actual bottom face) */
.pkg-fb-base{
  background: var(--pkg-base, #7a6442);
}
.pkg-fb-base-mat{
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.06) 0%,
      rgba(0,0,0,.14) 48%,
      rgba(0,0,0,.18) 52%,
      rgba(0,0,0,.06) 100%),
    linear-gradient(90deg,
      rgba(0,0,0,.16) 0%,
      rgba(0,0,0,0) 12%,
      rgba(0,0,0,0) 88%,
      rgba(0,0,0,.16) 100%);
}

/* ── Legacy stubs (kept as no-ops for any external reference) ── */
.pkg-bag-flat .pkg-bag-face{ /* bypassed */ }
.pkg-bag-flat .pkg-art{ inset: 18% 18% 28%; }

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

/* ─── COURIER BAG 2.5D FLAT POLY MAILER ────────────
   Flat rectangular mailing envelope — no side walls.
   Fold-over adhesive flap at top.
   ───────────────────────────────────────────────── */

/* Wrapper */
.pkg-courier-mockup{
  pointer-events: auto;
}
.pkg-stage.dragging .pkg-courier-mockup{
  transition: none;
}

/* Idle gentle rocking */
@keyframes pkg-courier-rock{
  0%   { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(-2.5deg) rotateX(-0.8deg); }
  50%  { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(2.5deg)  rotateX(-0.8deg); }
  100% { transform: translate3d(-50%,-50%,0) perspective(900px) rotateY(-2.5deg) rotateX(-0.8deg); }
}
.pkg-courier-idle{
  animation: pkg-courier-rock 10s ease-in-out infinite;
}

/* ── Fold-over flap (behind body — the back portion) ── */
.pkg-courier-flap-back{
  position: absolute;
  left: 1.5%; right: 1.5%;
  top: -11%;
  height: 18%;
  background: var(--pkg-color, #B08A5B);
  filter: brightness(.88);
  border-radius: 2px 2px 0 0;
  clip-path: polygon(
    0.5% 12%, 99.5% 12%,
    100% 14%, 100% 100%,
    0% 100%, 0% 14%
  );
  z-index: 0;
  pointer-events: none;
}
/* Subtle shading on the flap back */
.pkg-courier-flap-back::after{
  content:"";
  position:absolute; inset:0;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.10) 0%,
      rgba(0,0,0,.03) 40%,
      rgba(0,0,0,.06) 100%);
  pointer-events:none;
}

/* ── Main flat mailer body ─────────────────────── */
.pkg-courier-body{
  position: absolute;
  inset: 0;
  background: var(--pkg-color, #B08A5B);
  overflow: hidden;
  border-radius: 2px;

  box-shadow:
    0 2px 14px rgba(0,0,0,.12),
    inset 0 0 0 1px rgba(0,0,0,.05);
}

/* ── Polymer material highlights ───────────────── */
.pkg-courier-plastic{
  position:absolute; inset:0;
  pointer-events:none;
  z-index: 1;
  background:
    /* Soft central gloss */
    radial-gradient(ellipse 55% 60% at 50% 48%,
      rgba(255,255,255,.12) 0%,
      rgba(255,255,255,.03) 50%,
      rgba(255,255,255,0) 72%),
    /* Side edge darkening */
    linear-gradient(90deg,
      rgba(0,0,0,.12) 0%,
      rgba(0,0,0,.04) 3.5%,
      transparent 10%,
      transparent 90%,
      rgba(0,0,0,.04) 96.5%,
      rgba(0,0,0,.12) 100%),
    /* Vertical sheen */
    linear-gradient(180deg,
      rgba(255,255,255,.04) 0%,
      transparent 20%,
      transparent 80%,
      rgba(0,0,0,.03) 100%),
    /* Subtle diagonal plastic streak */
    linear-gradient(118deg,
      transparent 0%,
      transparent 35%,
      rgba(255,255,255,.05) 40%,
      rgba(255,255,255,.08) 44%,
      transparent 48%,
      transparent 100%);
}

/* ── Welded side seams ─────────────────────────── */
.pkg-courier-weld{
  position:absolute;
  top: 0; bottom: 0;
  width: 2.5%;
  z-index: 3;
  pointer-events:none;
}
.pkg-courier-weld.left{
  left: 0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.12) 0%,
      rgba(0,0,0,.05) 45%,
      transparent 100%);
  border-right: 0.5px solid rgba(0,0,0,.06);
}
.pkg-courier-weld.right{
  right: 0;
  background:
    linear-gradient(-90deg,
      rgba(0,0,0,.12) 0%,
      rgba(0,0,0,.05) 45%,
      transparent 100%);
  border-left: 0.5px solid rgba(0,0,0,.06);
}

/* ── Welded bottom seam ────────────────────────── */
.pkg-courier-weld-bottom{
  position:absolute;
  left: 0; right: 0;
  bottom: 0;
  height: 2.5%;
  z-index: 3;
  pointer-events:none;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(0,0,0,.06) 40%,
      rgba(0,0,0,.12) 100%);
  border-top: 0.5px solid rgba(0,0,0,.05);
}

/* ── Fold-over flap (front portion) ────────────── */
.pkg-courier-flap-front{
  position:absolute;
  left: 0; right: 0; top: 0;
  height: 14%;
  z-index: 5;
  pointer-events:none;
  background:
    linear-gradient(180deg,
      rgba(0,0,0,.02) 0%,
      rgba(255,255,255,.04) 30%,
      rgba(0,0,0,.04) 90%,
      rgba(0,0,0,.08) 100%);
}

/* ── Adhesive strip (inside flap) ──────────────── */
.pkg-courier-adhesive{
  position:absolute;
  left: 4%; right: 4%;
  bottom: 15%;
  height: 28%;
  background:
    linear-gradient(180deg,
      rgba(255,255,255,.14) 0%,
      rgba(255,255,255,.08) 40%,
      rgba(255,255,255,.12) 80%,
      rgba(255,255,255,.06) 100%);
  border: 0.5px solid rgba(255,255,255,.10);
  border-radius: 1px;
}

/* ── Peel strip indicator text ─────────────────── */
.pkg-courier-peel-text{
  position:absolute;
  right: 6%; bottom: 22%;
  width: 28px; height: 0;
  border-top: 0.5px dashed rgba(0,0,0,.18);
}
.pkg-courier-peel-text::after{
  content:"PEEL";
  position:absolute;
  right: 0; top: 2px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 6px;
  letter-spacing: .15em;
  color: rgba(0,0,0,.25);
  white-space: nowrap;
}

/* ── Flap fold line ────────────────────────────── */
.pkg-courier-fold-line{
  position:absolute;
  left: 0; right: 0; bottom: 0;
  height: 0;
  border-bottom: 1px solid rgba(0,0,0,.12);
  box-shadow:
    0 1px 0 rgba(255,255,255,.06),
    0 -1px 0 rgba(0,0,0,.04);
}

/* ── Branding area ─────────────────────────────── */
.pkg-courier-art-area{
  position:absolute;
  left: 8%; right: 8%;
  top: 18%; bottom: 8%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.pkg-courier-art-area .pkg-art{
  position: relative;
  inset: auto;
  width: 100%; height: 100%;
  padding: 6% 8%;
}

/* ── Floor shadow ──────────────────────────────── */
.pkg-courier-floor-shadow{
  position:absolute;
  left: 5%; right: 5%;
  bottom: -6px;
  height: 14px;
  background:
    radial-gradient(ellipse at 50% 20%,
      rgba(0,0,0,.18) 0%,
      rgba(0,0,0,.06) 50%,
      rgba(0,0,0,0) 80%);
  filter: blur(3px);
  pointer-events: none;
  z-index: -1;
}

/* ── Legacy stubs (courier no longer uses generic bag faces) ── */
.pkg-bag-courier .pkg-bag-face{ /* bypassed */ }
.pkg-bag-courier .pkg-art{ inset: 32% 22% 18%; }

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
