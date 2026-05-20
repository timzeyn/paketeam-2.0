import React from 'react';
// ─────────────────────────────────────────────────────────
// 3D-превью упаковки на чистом CSS-transform.
// Поддерживает: box, bag, cup, sticker.
// Также рендерит плоскую развёртку (flat unfold).
// ─────────────────────────────────────────────────────────

const PKG_STYLE = `
.pkg-stage{
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex; align-items: center; justify-content: center;
  perspective: 1400px;
  perspective-origin: 50% 45%;
  user-select: none;
  overflow: hidden;
}
.pkg-stage.tall{ aspect-ratio: 5/4; }

.pkg-floor{
  position: absolute; left: 8%; right: 8%; bottom: 12%;
  height: 18%;
  background: radial-gradient(ellipse at center,
    rgba(15,22,38,.18) 0%,
    rgba(15,22,38,.10) 35%,
    rgba(15,22,38,0) 70%);
  filter: blur(2px);
  z-index: 0;
  pointer-events: none;
}

.pkg-stage svg.tex-defs{ position:absolute; width:0; height:0; }

.pkg-3d{
  position: relative;
  transform-style: preserve-3d;
  transition: transform .35s cubic-bezier(.4,.1,.2,1);
}
.pkg-stage.dragging .pkg-3d{ transition: none; }

/* ── BOX ── */
.pkg-box{ width: 240px; height: 220px; }
.pkg-box .face{
  position: absolute; inset: 0;
  background: var(--pkg-color, #B08A5B);
  border: 1px solid rgba(0,0,0,.08);
  backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.pkg-box .face::after{
  content: ""; position: absolute; inset: 0;
  background:
    repeating-linear-gradient(0deg,
      rgba(255,255,255,.04) 0 1px,
      transparent 1px 3px),
    linear-gradient(135deg, rgba(255,255,255,.18), rgba(0,0,0,.12));
  pointer-events: none;
}
.pkg-box .face-front::before,
.pkg-box .face-back::before,
.pkg-box .face-left::before,
.pkg-box .face-right::before,
.pkg-box .face-top::before,
.pkg-box .face-bottom::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    repeating-linear-gradient(90deg,
      rgba(255,255,255,.035) 0 1px,
      transparent 1px 5px),
    repeating-linear-gradient(0deg,
      rgba(0,0,0,.025) 0 1px,
      transparent 1px 7px);
  mix-blend-mode: soft-light;
  pointer-events:none;
}
.pkg-box-detail{
  position:absolute;
  z-index:1;
  pointer-events:none;
}
.pkg-box-line{
  background: rgba(0,0,0,.24);
  box-shadow: 0 1px 0 rgba(255,255,255,.24);
}
.pkg-box-dash{
  border-top: 1px dashed rgba(0,0,0,.34);
}
.pkg-box .pkg-art{ z-index:3; }
.pkg-box-mailer-box .face-front::before{
  background:
    repeating-linear-gradient(0deg,
      rgba(255,255,255,.045) 0 1px,
      rgba(0,0,0,.05) 1px 3px,
      transparent 3px 8px),
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.03) 0 1px,
      transparent 1px 10px),
    linear-gradient(135deg, rgba(255,255,255,.16), rgba(0,0,0,.10));
}
.pkg-box-mailer-box .face-top::after{
  background:
    repeating-linear-gradient(90deg,
      rgba(0,0,0,.08) 0 2px,
      transparent 2px 8px),
    linear-gradient(135deg, rgba(255,255,255,.22), rgba(0,0,0,.10));
}
.pkg-mailer-lid-panel{
  left:-3%;
  right:-3%;
  top:-3%;
  height:40%;
  background:linear-gradient(180deg, rgba(255,255,255,.30), rgba(255,255,255,.08));
  border:1px solid rgba(255,255,255,.24);
  border-bottom:4px solid rgba(0,0,0,.28);
  box-shadow:0 14px 22px rgba(0,0,0,.15);
}
.pkg-mailer-lid-lip{
  left:-4%;
  right:-4%;
  top:35%;
  height:10%;
  background:linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.16));
  border-top:1px solid rgba(255,255,255,.28);
  border-bottom:2px solid rgba(0,0,0,.26);
  box-shadow:0 8px 14px rgba(0,0,0,.16);
}
.pkg-mailer-base-panel{
  left:0;
  right:0;
  bottom:0;
  height:30%;
  background:linear-gradient(180deg, transparent, rgba(0,0,0,.16));
  border-top:1px solid rgba(255,255,255,.20);
}
.pkg-mailer-top-seam{ left:8%; right:8%; top:39%; height:0; border-top-width:2px; opacity:.75; }
.pkg-mailer-lock{
  left:50%;
  bottom:5%;
  width:26%;
  height:30px;
  transform:translateX(-50%);
  border:2px solid rgba(0,0,0,.24);
  border-top:0;
  border-radius:0 0 15px 15px;
  background:linear-gradient(180deg, rgba(255,255,255,.28), rgba(0,0,0,.10));
  clip-path:polygon(13% 0, 87% 0, 100% 58%, 76% 100%, 24% 100%, 0 58%);
  box-shadow:0 7px 11px rgba(0,0,0,.14);
}
.pkg-mailer-lock::before{
  content:"";
  position:absolute;
  left:20%;
  right:20%;
  top:4px;
  height:6px;
  border-top:2px solid rgba(0,0,0,.22);
  border-bottom:1px solid rgba(255,255,255,.22);
}
.pkg-mailer-lock::after{
  content:"";
  position:absolute;
  left:36%;
  right:36%;
  bottom:8px;
  border-top:3px solid rgba(0,0,0,.24);
}
.pkg-mailer-front-slot{
  left:33%;
  right:33%;
  bottom:26%;
  height:0;
  border-top:4px solid rgba(0,0,0,.28);
  box-shadow:
    0 2px 0 rgba(255,255,255,.22),
    0 6px 10px rgba(0,0,0,.12);
}
.pkg-mailer-front-corner{
  top:1%;
  width:18%;
  height:39%;
  border-bottom:2px solid rgba(0,0,0,.20);
  background:linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.04));
}
.pkg-mailer-front-corner.left{
  left:0;
  border-right:2px dashed rgba(0,0,0,.18);
  transform:skewY(-10deg);
}
.pkg-mailer-front-corner.right{
  right:0;
  border-left:2px dashed rgba(0,0,0,.18);
  transform:skewY(10deg);
}
.pkg-mailer-top-flap{
  left:5%;
  right:5%;
  top:12%;
  height:74%;
  border:2px solid rgba(0,0,0,.20);
  border-top:4px solid rgba(0,0,0,.24);
  border-radius:10px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.05)),
    repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 1px, transparent 1px 8px);
  clip-path:polygon(5% 0, 95% 0, 87% 100%, 13% 100%);
  box-shadow:0 12px 18px rgba(0,0,0,.10);
}
.pkg-mailer-hinge-line{
  left:4%;
  right:4%;
  top:11%;
  height:0;
  border-top:4px solid rgba(0,0,0,.28);
  box-shadow:0 2px 0 rgba(255,255,255,.24);
}
.pkg-mailer-top-wing{
  top:28%;
  height:52%;
  width:24%;
  background:linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.06));
  border:2px solid rgba(0,0,0,.18);
  border-top-style:dashed;
  box-shadow:inset 0 8px 16px rgba(0,0,0,.08);
}
.pkg-mailer-top-wing.left{
  left:0;
  clip-path:polygon(0 18%, 100% 0, 80% 100%, 7% 82%);
}
.pkg-mailer-top-wing.right{
  right:0;
  clip-path:polygon(0 0, 100% 18%, 93% 82%, 20% 100%);
}
.pkg-mailer-side-ear{
  top:-1%;
  height:46%;
  width:76%;
  border:2px solid rgba(0,0,0,.22);
  border-bottom-style:dashed;
  background:
    linear-gradient(180deg, rgba(255,255,255,.20), rgba(0,0,0,.05)),
    repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 7px);
  box-shadow:0 11px 18px rgba(0,0,0,.12);
  clip-path:polygon(0 0, 100% 0, 84% 100%, 12% 84%);
}
.pkg-mailer-side-ear.left{ left:4%; transform:skewY(-6deg); }
.pkg-mailer-side-ear.right{ right:4%; transform:skewY(6deg) scaleX(-1); }
.pkg-mailer-side-ear::after{
  content:"";
  position:absolute;
  left:18%;
  right:18%;
  top:58%;
  border-top:2px dashed rgba(0,0,0,.20);
}
.pkg-mailer-side-seam{
  left:8%;
  right:8%;
  top:45%;
  height:0;
  border-top:3px solid rgba(0,0,0,.24);
  box-shadow:0 2px 0 rgba(255,255,255,.22);
}
.pkg-mailer-back-hinge{
  left:3%;
  right:3%;
  top:34%;
  height:0;
  border-top:4px solid rgba(0,0,0,.30);
  box-shadow:0 3px 0 rgba(255,255,255,.22);
}
.pkg-tuck-lid{
  left:0;
  right:0;
  top:0;
  height:22%;
  background:linear-gradient(180deg, rgba(255,255,255,.30), rgba(255,255,255,.08));
  border-bottom:2px solid rgba(0,0,0,.24);
}
.pkg-tuck-lid::after{
  content:"";
  position:absolute;
  left:34%;
  right:34%;
  bottom:-16px;
  height:16px;
  border:2px solid rgba(0,0,0,.22);
  border-top:0;
  border-radius:0 0 12px 12px;
  background:rgba(255,255,255,.14);
}
.pkg-tuck-front-seam{ left:11%; right:11%; top:22%; height:0; border-top-width:2px; }
.pkg-tuck-bottom-seam{
  left:10%;
  right:10%;
  bottom:12%;
  height:0;
  border-top:2px dashed rgba(0,0,0,.28);
}
.pkg-tuck-vertical-seam{
  top:22%;
  bottom:12%;
  left:50%;
  width:0;
  border-left:1px dashed rgba(0,0,0,.24);
}
.pkg-tuck-side-hint{
  top:7%;
  bottom:7%;
  width:22px;
  border-top:2px dashed rgba(0,0,0,.22);
  border-bottom:2px dashed rgba(0,0,0,.22);
  opacity:.85;
}
.pkg-tuck-side-hint.left{ left:0; border-right:2px dashed rgba(0,0,0,.22); }
.pkg-tuck-side-hint.right{ right:0; border-left:2px dashed rgba(0,0,0,.22); }
.pkg-tuck-side-crease{
  top:10%;
  bottom:10%;
  left:50%;
  width:0;
  border-left:2px dashed rgba(0,0,0,.22);
}
.pkg-tuck-top-flap{
  left:18%;
  right:18%;
  top:18%;
  height:58%;
  border:2px solid rgba(0,0,0,.24);
  border-radius:12px 12px 8px 8px;
  background:linear-gradient(180deg, rgba(255,255,255,.20), rgba(0,0,0,.05));
}
.pkg-sleeve-band{
  inset:0;
  background:
    linear-gradient(90deg, transparent 0 72%, rgba(0,0,0,.16) 72% 76%, rgba(255,255,255,.14) 76% 100%),
    linear-gradient(180deg, rgba(255,255,255,.18), transparent 30%, transparent 70%, rgba(0,0,0,.12));
  border-top:4px solid rgba(255,255,255,.38);
  border-bottom:4px solid rgba(0,0,0,.22);
  box-shadow:
    inset -18px 0 0 rgba(255,255,255,.12),
    inset -22px 0 0 rgba(0,0,0,.08);
}
.pkg-sleeve-tray{
  right:-1px;
  top:14%;
  width:21%;
  height:72%;
  border-left:4px solid rgba(0,0,0,.26);
  border-top:2px solid rgba(255,255,255,.26);
  border-bottom:2px solid rgba(0,0,0,.20);
  background:linear-gradient(90deg, rgba(0,0,0,.18), rgba(255,255,255,.10));
  box-shadow:inset 10px 0 16px rgba(0,0,0,.16);
}
.pkg-sleeve-pull{
  right:4%;
  top:50%;
  width:18px;
  height:36px;
  transform:translateY(-50%);
  border-radius:18px 0 0 18px;
  border:2px solid rgba(0,0,0,.24);
  border-right:0;
  background:rgba(255,255,255,.16);
  box-shadow:inset 4px 0 8px rgba(0,0,0,.12);
}
.pkg-sleeve-top-band{
  inset:0;
  border-left:3px solid rgba(255,255,255,.26);
  border-right:18px solid rgba(0,0,0,.16);
  border-top:3px solid rgba(255,255,255,.34);
  border-bottom:3px solid rgba(0,0,0,.18);
  background:
    linear-gradient(90deg, rgba(255,255,255,.12), transparent 68%, rgba(0,0,0,.12)),
    rgba(255,255,255,.08);
}
.pkg-sleeve-tray-3d{
  position:absolute;
  left:calc(100% - var(--sleeve-tray-overlap));
  top:14%;
  width:var(--sleeve-tray-extension);
  height:72%;
  transform-style:preserve-3d;
  transform:translateZ(0);
  pointer-events:none;
}
.pkg-sleeve-tray-face{
  position:absolute;
  background:
    linear-gradient(135deg, rgba(255,255,255,.26), rgba(0,0,0,.10)),
    var(--pkg-color);
  background-blend-mode:screen, normal;
  border:1px solid rgba(0,0,0,.18);
  box-shadow:0 8px 18px rgba(0,0,0,.12);
  overflow:hidden;
}
.pkg-sleeve-tray-face::before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(135deg, rgba(255,255,255,.16), transparent 55%);
  pointer-events:none;
}
.pkg-sleeve-tray-front{
  inset:0;
  transform:translateZ(calc(var(--sleeve-tray-depth) / 2));
}
.pkg-sleeve-tray-back{
  inset:0;
  transform:rotateY(180deg) translateZ(calc(var(--sleeve-tray-depth) / 2));
  filter:brightness(.82);
}
.pkg-sleeve-tray-top{
  left:0;
  width:var(--sleeve-tray-extension);
  height:var(--sleeve-tray-depth);
  top:calc((100% - var(--sleeve-tray-depth)) / 2);
  transform:rotateX(90deg) translateZ(calc(var(--sleeve-tray-height) / 2));
  filter:brightness(1.08);
}
.pkg-sleeve-tray-bottom{
  left:0;
  width:var(--sleeve-tray-extension);
  height:var(--sleeve-tray-depth);
  top:calc((100% - var(--sleeve-tray-depth)) / 2);
  transform:rotateX(-90deg) translateZ(calc(var(--sleeve-tray-height) / 2));
  filter:brightness(.72);
}
.pkg-sleeve-tray-end{
  width:var(--sleeve-tray-depth);
  height:100%;
  left:calc((var(--sleeve-tray-extension) - var(--sleeve-tray-depth)) / 2);
  transform:rotateY(90deg) translateZ(calc(var(--sleeve-tray-extension) / 2));
  background:
    linear-gradient(90deg, rgba(255,255,255,.28), rgba(0,0,0,.12)),
    var(--pkg-color);
  background-blend-mode:screen, normal;
  border-left:4px solid rgba(255,255,255,.26);
  box-shadow:
    10px 10px 22px rgba(0,0,0,.16),
    inset 8px 0 14px rgba(255,255,255,.12);
}
.pkg-sleeve-tray-end::after{
  content:"";
  position:absolute;
  left:50%;
  top:50%;
  width:22px;
  height:42px;
  transform:translate(-50%, -50%);
  border-radius:999px 0 0 999px;
  border:2px solid rgba(0,0,0,.24);
  border-right:0;
  background:rgba(255,255,255,.18);
  box-shadow:inset 5px 0 9px rgba(0,0,0,.14);
}
.pkg-box-window-box .face-front{
  box-shadow:
    inset 0 0 0 3px rgba(255,255,255,.18),
    inset 0 -22px 32px rgba(0,0,0,.10);
}
.pkg-box-window-box .face-front::before{
  background:
    repeating-linear-gradient(0deg,
      rgba(255,255,255,.026) 0 1px,
      transparent 1px 7px),
    linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.06));
}
.pkg-box-window-box .face-front .pkg-art{
  top:66%;
  bottom:4%;
  padding:5% 14% 7%;
  justify-content:flex-start;
}
.pkg-box-window-box .face-front .pkg-logo{
  font-size:20px;
}
.pkg-box-window-box .face-front .pkg-tag{
  margin-top:6px;
}
.pkg-window-panel-frame{
  inset:6% 8%;
  border:2px solid rgba(255,255,255,.24);
  border-radius:16px;
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,.08),
    inset 0 10px 18px rgba(255,255,255,.09);
}
.pkg-window{
  left:16%;
  right:16%;
  top:13%;
  height:48%;
  border-radius:24px;
  overflow:hidden;
  background:
    linear-gradient(145deg, rgba(5,12,24,.26), rgba(5,12,24,.10)),
    rgba(255,255,255,.12);
  border:8px solid rgba(255,255,255,.58);
  box-shadow:
    0 0 0 2px rgba(0,0,0,.18),
    0 0 0 7px rgba(0,0,0,.08) inset,
    inset 0 14px 22px rgba(0,0,0,.30),
    inset 0 -10px 16px rgba(255,255,255,.14),
    0 16px 24px rgba(0,0,0,.18);
}
.pkg-window::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(135deg, rgba(255,255,255,.46) 0 12%, transparent 13% 58%, rgba(255,255,255,.20) 59% 70%, transparent 71%),
    linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.02));
  opacity:.84;
  pointer-events:none;
}
.pkg-window::after{
  content:"";
  position:absolute;
  inset:6px;
  border-radius:18px;
  border:1px solid rgba(255,255,255,.46);
  box-shadow:
    inset 0 0 18px rgba(255,255,255,.24),
    inset 0 0 0 1px rgba(0,0,0,.10);
  pointer-events:none;
}
.pkg-window-backing{
  position:absolute;
  inset:7% 9%;
  border-radius:18px;
  background:
    radial-gradient(circle at 50% 42%, rgba(255,255,255,.26), transparent 38%),
    linear-gradient(180deg, rgba(18,28,46,.18), rgba(18,28,46,.06));
  box-shadow:inset 0 10px 20px rgba(0,0,0,.14);
}
.pkg-window-product{
  position:absolute;
  left:50%;
  bottom:12%;
  width:36%;
  height:58%;
  transform:translateX(-50%);
  border-radius:18px 18px 8px 8px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.34), rgba(255,255,255,.10)),
    linear-gradient(90deg, rgba(15,22,38,.10), rgba(15,22,38,.03));
  border:1px solid rgba(15,22,38,.10);
  box-shadow:
    0 10px 16px rgba(0,0,0,.12),
    inset 0 8px 10px rgba(255,255,255,.12);
}
.pkg-window-product::before{
  content:"";
  position:absolute;
  left:28%;
  right:28%;
  top:-10%;
  height:18%;
  border-radius:12px 12px 4px 4px;
  background:rgba(255,255,255,.22);
  border:1px solid rgba(15,22,38,.08);
}
.pkg-window-bottom-rail{
  left:12%;
  right:12%;
  top:63%;
  height:0;
  border-top:3px solid rgba(0,0,0,.20);
  box-shadow:0 2px 0 rgba(255,255,255,.24);
}
.pkg-window-retail-top{
  left:12%;
  right:12%;
  top:8%;
  height:0;
  border-top:2px solid rgba(0,0,0,.17);
  box-shadow:0 1px 0 rgba(255,255,255,.24);
}
.pkg-lid-cap{
  left:-7%;
  right:-7%;
  top:-2%;
  height:38%;
  background:linear-gradient(180deg, rgba(255,255,255,.34), rgba(255,255,255,.10));
  border:2px solid rgba(255,255,255,.30);
  border-bottom:4px solid rgba(0,0,0,.30);
  box-shadow:0 14px 24px rgba(0,0,0,.14);
}
.pkg-lid-base{
  left:0;
  right:0;
  bottom:0;
  height:36%;
  background:linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.22));
  border-top:2px solid rgba(255,255,255,.30);
}
.pkg-lid-seam{
  left:-7%;
  right:-7%;
  top:38%;
  height:0;
  border-top:4px solid rgba(0,0,0,.34);
  box-shadow:0 3px 0 rgba(255,255,255,.18);
}
.pkg-lid-top-rim{
  inset:7% 5%;
  border:3px solid rgba(255,255,255,.36);
  box-shadow:0 0 0 3px rgba(0,0,0,.09) inset, 0 8px 18px rgba(0,0,0,.10) inset;
  border-radius:14px;
  background:rgba(255,255,255,.10);
}
.pkg-lid-side-overhang{
  left:-8%;
  right:-8%;
  top:0;
  height:37%;
  border-bottom:3px solid rgba(0,0,0,.28);
  background:rgba(255,255,255,.12);
}

/* ── BAG (Doypack/Mailer) ── */
.pkg-bag{ width: 200px; height: 260px; }
.pkg-bag .face{
  position: absolute; inset: 0;
  background: var(--pkg-color, #B08A5B);
  border-radius: 10px 10px 6px 6px;
  border: 1px solid rgba(0,0,0,.1);
  overflow: hidden;
}
.pkg-bag .face::before{
  content:""; position:absolute; inset:0;
  background:
    linear-gradient(180deg, rgba(255,255,255,.18) 0%, rgba(0,0,0,0) 25%),
    linear-gradient(90deg, rgba(0,0,0,.12) 0%, rgba(255,255,255,.06) 50%, rgba(0,0,0,.12) 100%);
  pointer-events:none;
}
.pkg-bag .seal{
  position:absolute; top:0; left:0; right:0; height: 22px;
  background: linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.05));
  border-bottom: 1px dashed rgba(255,255,255,.45);
  z-index: 3;
}

/* ── CUP ── */
.pkg-cup-wrap{ width: 220px; height: 250px; }
.pkg-cup{
  position: absolute; inset: 12% 22% 8%;
  background: var(--pkg-color, #B08A5B);
  clip-path: polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%);
  border-radius: 4px 4px 12px 12px;
  overflow: hidden;
}
.pkg-cup::before{
  content:""; position:absolute; inset:0;
  background:
    linear-gradient(90deg,
      rgba(0,0,0,.18) 0%,
      rgba(255,255,255,.18) 35%,
      rgba(255,255,255,.22) 65%,
      rgba(0,0,0,.18) 100%);
  pointer-events:none;
}
.pkg-cup-rim{
  position:absolute; top: 10%; left: 18%; right: 18%; height: 14px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,.7) 60%, rgba(0,0,0,.12) 100%);
  box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
.pkg-cup-bottom{
  position:absolute; bottom: 6%; left: 28%; right: 28%; height: 8px;
  border-radius: 50%;
  background: rgba(0,0,0,.2);
  filter: blur(1px);
}

/* ── STICKER ── */
.pkg-sticker-wrap{ width: 240px; height: 240px; }
.pkg-sticker{
  position: absolute; inset: 8%;
  background: var(--pkg-color, #B08A5B);
  border-radius: var(--pkg-radius, 50%);
  box-shadow:
    0 1px 0 rgba(255,255,255,.5) inset,
    0 -1px 0 rgba(0,0,0,.15) inset,
    0 8px 24px rgba(15,23,42,.18);
  overflow: hidden;
}
.pkg-sticker::after{
  content:""; position:absolute; inset:0;
  background: radial-gradient(circle at 30% 25%,
    rgba(255,255,255,.5) 0%, rgba(255,255,255,0) 35%);
  pointer-events:none;
}

/* ── Контент-слой (лого/текст) на каждой грани ── */
.pkg-art{
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 14% 14%;
  z-index: 2;
  text-align: center;
  color: var(--pkg-art-color, #FFFFFF);
  pointer-events: none;
}
.pkg-art.left  { padding: 14% 8%; }
.pkg-art .pkg-logo{
  font-weight: 800;
  font-size: 22px;
  letter-spacing: .02em;
  line-height: 1.05;
  text-shadow: 0 1px 0 rgba(0,0,0,.12);
}
.pkg-art .pkg-logo.img{ font-size: 0; }
.pkg-art .pkg-logo img{
  max-width: 100%; max-height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.15));
}
.pkg-art .pkg-tag{
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  opacity: .82;
}

/* Развёртка */
.pkg-unfold-wrap{
  width: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 8% 4%;
}
.pkg-unfold{
  display: grid;
  gap: 4px;
  background: var(--pkt-bg);
  filter: drop-shadow(0 8px 24px rgba(15,23,42,.06));
}
.pkg-unfold .panel{
  background: var(--pkg-color, #B08A5B);
  border: 1px dashed rgba(255,255,255,.5);
  outline: 1px dashed rgba(126,95,56,.4);
  outline-offset: -1px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.pkg-unfold .panel.empty{
  background: transparent;
  border: none;
  outline: none;
}
.pkg-unfold .panel.muted{
  background:
    repeating-linear-gradient(135deg,
      rgba(15,22,38,.04) 0 8px,
      rgba(15,22,38,.08) 8px 16px);
  border-color: rgba(15,22,38,.12);
  outline-color: rgba(15,22,38,.12);
}
.pkg-unfold .panel.muted::after{
  content:"";
  position:absolute;
  inset:0;
  background: rgba(255,255,255,.45);
  pointer-events:none;
}
.pkg-unfold .panel-label{
  position:absolute; top:6px; left:6px;
  font-family: var(--font-mono);
  font-size: 9px; letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(0,0,0,.45);
  background: rgba(255,255,255,.55);
  padding: 2px 5px; border-radius: 4px;
  z-index: 4;
}

/* Бесконечный нежный сдвиг для idle-вращения */
.pkg-handles{position:absolute;top:7px;left:50%;width:92px;height:38px;transform:translateX(-50%);z-index:4}
.pkg-handles i{position:absolute;top:0;width:30px;height:36px;border:4px solid rgba(255,255,255,.55);border-bottom:0;border-radius:999px 999px 0 0}
.pkg-handles i:first-child{left:10px}.pkg-handles i:last-child{right:10px}
.pkg-flat-bottom{position:absolute;left:10%;right:10%;bottom:0;height:28px;background:rgba(0,0,0,.12);border-top:1px dashed rgba(255,255,255,.35);z-index:2}
.pkg-courier-flap{position:absolute;left:0;right:0;top:20px;height:34px;background:rgba(255,255,255,.16);border-bottom:1px dashed rgba(255,255,255,.5);z-index:2}
.pkg-ripple{position:absolute;inset:17% 10% 12%;background:repeating-linear-gradient(180deg,rgba(255,255,255,.14) 0 7px,rgba(0,0,0,.06) 7px 12px);pointer-events:none}
.pkg-double-wall{position:absolute;inset:8% 8% 7%;border:5px solid rgba(255,255,255,.18);border-radius:5px 5px 12px 12px;pointer-events:none}
.pkg-cold-rim{position:absolute;top:2%;left:12%;right:12%;height:22px;border-radius:50%;background:rgba(255,255,255,.45);pointer-events:none}

@keyframes pkt-idle-rotate{
  0%   { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(-22deg); }
  50%  { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(22deg); }
  100% { transform: translate3d(-50%,-50%,0) rotateX(-12deg) rotateY(-22deg); }
}
.pkg-3d.idle{ animation: pkt-idle-rotate 14s ease-in-out infinite; }
`;

// Возвращает контрастный цвет для текста на фоне
function pktContrast(hex){
  const h = String(hex).replace('#','');
  const x = h.length === 3 ? h.replace(/./g, c=>c+c) : h.padEnd(6,'0');
  const n = parseInt(x.slice(0,6),16);
  const r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  return (r*299 + g*587 + b*114) > 145000 ? '#0F1626' : '#FFFFFF';
}

function PkgArt({ artwork, logo, text, side }) {
  const data = artwork || { logo, text, visible: true };
  if (data.visible === false) return null;
  logo = data.logo;
  text = data.text;
  const alignment = data.alignment || 'center';
  const alignItems = alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center';
  return (
    <div className={`pkg-art ${side||''}`} style={{ alignItems, textAlign: alignment, transform: `scale(${data.scale || 1})`, transformOrigin: 'center' }}>
      <div className={`pkg-logo ${logo ? 'img' : ''}`}>
        {logo ? <img src={logo} alt="" /> : 'ПАКЕТЕАМ'}
      </div>
      {text && <div className="pkg-tag">{text}</div>}
    </div>
  );
}

const SIDE_IDS = ['front', 'back', 'left', 'right', 'top', 'bottom'];
function buildSides({ sides, color, logo, text }) {
  const fallback = { logo, text, backgroundColor: color, visible: true };
  return SIDE_IDS.reduce((acc, id) => {
    acc[id] = { ...fallback, text: id === 'front' ? text : '', ...(sides?.[id] || {}) };
    if (acc[id].backgroundColor == null) acc[id].backgroundColor = color;
    if (acc[id].visible == null) acc[id].visible = true;
    return acc;
  }, {});
}
function sideStyle(side, extra = {}) {
  const bg = side?.backgroundColor || '#B08A5B';
  return { ...extra, backgroundColor: bg, ['--pkg-color']: bg, ['--pkg-art-color']: pktContrast(bg) };
}
function stickerRadius(variant) {
  if (variant === 'square') return '14px';
  if (variant === 'rectangle') return '12px';
  if (variant === 'oval') return '50%';
  if (variant === 'custom-shape') return '38% 62% 46% 54% / 45% 40% 60% 55%';
  return '50%';
}
function stickerDims(variant) {
  if (variant === 'rectangle') return { width: 280, height: 180 };
  if (variant === 'oval') return { width: 270, height: 190 };
  return { width: 240, height: 240 };
}
function getBoxVariantGeometry(variant, size) {
  const geometry = {
    'mailer-box': { w: 345, h: 112, d: 238 },
    'tuck-top-box': { w: 160, h: 285, d: 105 },
    'sleeve-box': { w: 305, h: 130, d: 135 },
    'window-box': { w: 205, h: 265, d: 120 },
    'lid-bottom-box': { w: 265, h: 165, d: 190 },
  }[variant || 'mailer-box'] || { w: 240, h: 200, d: 160 };

  if (!size?.w) return geometry;
  const scale = Math.max(0.82, Math.min(1.22, size.w / 240));
  return {
    w: Math.round(geometry.w * scale),
    h: Math.round(geometry.h * scale),
    d: Math.round(geometry.d * scale),
  };
}
function BoxVariantDetails({ variant, face }) {
  if (variant === 'mailer-box') {
    if (face === 'front') {
      return (
        <>
          <div className="pkg-box-detail pkg-mailer-lid-panel" />
          <div className="pkg-box-detail pkg-mailer-lid-lip" />
          <div className="pkg-box-detail pkg-mailer-base-panel" />
          <div className="pkg-box-detail pkg-box-dash pkg-mailer-top-seam" />
          <div className="pkg-box-detail pkg-mailer-front-corner left" />
          <div className="pkg-box-detail pkg-mailer-front-corner right" />
          <div className="pkg-box-detail pkg-mailer-front-slot" />
          <div className="pkg-box-detail pkg-mailer-lock" />
        </>
      );
    }
    if (face === 'top') {
      return (
        <>
          <div className="pkg-box-detail pkg-mailer-top-flap" />
          <div className="pkg-box-detail pkg-mailer-hinge-line" />
          <div className="pkg-box-detail pkg-mailer-top-wing left" />
          <div className="pkg-box-detail pkg-mailer-top-wing right" />
        </>
      );
    }
    if (face === 'left' || face === 'right') {
      return (
        <>
          <div className={`pkg-box-detail pkg-mailer-side-ear ${face}`} />
          <div className="pkg-box-detail pkg-mailer-side-seam" />
        </>
      );
    }
    if (face === 'back') return <div className="pkg-box-detail pkg-mailer-back-hinge" />;
  }
  if (variant === 'tuck-top-box') {
    if (face === 'front') {
      return (
        <>
          <div className="pkg-box-detail pkg-tuck-lid" />
          <div className="pkg-box-detail pkg-box-dash pkg-tuck-front-seam" />
          <div className="pkg-box-detail pkg-tuck-bottom-seam" />
          <div className="pkg-box-detail pkg-tuck-vertical-seam" />
          <div className="pkg-box-detail pkg-tuck-side-hint left" />
          <div className="pkg-box-detail pkg-tuck-side-hint right" />
        </>
      );
    }
    if (face === 'top') return <div className="pkg-box-detail pkg-tuck-top-flap" />;
    if (face === 'left' || face === 'right') return <div className="pkg-box-detail pkg-tuck-side-crease" />;
  }
  if (variant === 'sleeve-box') {
    if (face === 'front') {
      return (
        <>
          <div className="pkg-box-detail pkg-sleeve-band" />
          <div className="pkg-box-detail pkg-sleeve-tray" />
          <div className="pkg-box-detail pkg-sleeve-pull" />
        </>
      );
    }
    if (face === 'top') return <div className="pkg-box-detail pkg-sleeve-top-band" />;
  }
  if (variant === 'window-box' && face === 'front') {
    return (
      <>
        <div className="pkg-box-detail pkg-window-panel-frame" />
        <div className="pkg-box-detail pkg-window">
          <div className="pkg-window-backing" />
          <div className="pkg-window-product" />
        </div>
        <div className="pkg-box-detail pkg-window-bottom-rail" />
        <div className="pkg-box-detail pkg-window-retail-top" />
      </>
    );
  }
  if (variant === 'lid-bottom-box') {
    if (face === 'front') {
      return (
        <>
          <div className="pkg-box-detail pkg-lid-cap" />
          <div className="pkg-box-detail pkg-lid-seam" />
          <div className="pkg-box-detail pkg-lid-base" />
        </>
      );
    }
    if (face === 'top') return <div className="pkg-box-detail pkg-lid-top-rim" />;
    if (face === 'left' || face === 'right') return <div className="pkg-box-detail pkg-lid-side-overhang" />;
  }
  return null;
}
function BoxVariantShell({ variant }) {
  if (variant === 'sleeve-box') {
    return (
      <div className="pkg-sleeve-tray-3d" aria-hidden="true">
        <div className="pkg-sleeve-tray-face pkg-sleeve-tray-front" />
        <div className="pkg-sleeve-tray-face pkg-sleeve-tray-back" />
        <div className="pkg-sleeve-tray-face pkg-sleeve-tray-top" />
        <div className="pkg-sleeve-tray-face pkg-sleeve-tray-bottom" />
        <div className="pkg-sleeve-tray-face pkg-sleeve-tray-end" />
      </div>
    );
  }
  return null;
}
function BagVariantDetails({ variant }) {
  if (variant === 'paper-bag-with-handles') return <div className="pkg-handles"><i/><i/></div>;
  if (variant === 'flat-bottom-bag') return <div className="pkg-flat-bottom" />;
  if (variant === 'courier-bag') return <div className="pkg-courier-flap" />;
  return null;
}
function CupVariantDetails({ variant }) {
  if (variant === 'ripple-cup') return <div className="pkg-ripple" />;
  if (variant === 'double-wall') return <div className="pkg-double-wall" />;
  if (variant === 'cold-cup') return <div className="pkg-cold-rim" />;
  return null;
}

// ── BOX 3D ─────────────────────────────────────────────────
function Box3D({ sides, rotation, idle, size, variant }){
  const { w, h, d } = getBoxVariantGeometry(variant, size);
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const half = { x:w/2, y:h/2, z:d/2 };
  const frontColor = sides.front?.backgroundColor || '#B08A5B';
  const style = {
    width: w, height: h,
    transform: tx,
    position: 'absolute', left: '50%', top: '50%',
    ['--box-half-z']: `${half.z}px`,
    ['--sleeve-tray-extension']: `${Math.round(w * 0.20)}px`,
    ['--sleeve-tray-overlap']: `${Math.round(w * 0.085)}px`,
    ['--sleeve-tray-depth']: `${Math.round(d * 0.76)}px`,
    ['--sleeve-tray-height']: `${Math.round(h * 0.72)}px`,
    ['--pkg-color']: frontColor,
    ['--pkg-art-color']: pktContrast(frontColor),
  };
  return (
    <div className={`pkg-3d pkg-box pkg-box-${variant || 'mailer-box'} ${idle?'idle':''}`} style={style}>
      <BoxVariantShell variant={variant} />
      <div className="face face-front" style={sideStyle(sides.front, {transform:`translateZ(${half.z}px)`})}>
        <BoxVariantDetails variant={variant} face="front" />
        <PkgArt artwork={sides.front} />
      </div>
      <div className="face face-back" style={sideStyle(sides.back, {transform:`rotateY(180deg) translateZ(${half.z}px)`, backgroundBlendMode: 'multiply'})}><BoxVariantDetails variant={variant} face="back" /><PkgArt artwork={sides.back} /></div>
      <div className="face face-right" style={sideStyle(sides.right, {width:d, left:(w-d)/2, transform:`rotateY(90deg) translateZ(${w/2}px)`, backgroundBlendMode: 'multiply'})}><BoxVariantDetails variant={variant} face="right" /><PkgArt artwork={sides.right} side="left" /></div>
      <div className="face face-left" style={sideStyle(sides.left, {width:d, left:(w-d)/2, transform:`rotateY(-90deg) translateZ(${w/2}px)`, backgroundBlendMode: 'multiply'})}><BoxVariantDetails variant={variant} face="left" /><PkgArt artwork={sides.left} side="left" /></div>
      <div className="face face-top" style={sideStyle(sides.top, {height:d, top:(h-d)/2, transform:`rotateX(90deg) translateZ(${h/2}px)`, backgroundBlendMode: 'screen'})}><BoxVariantDetails variant={variant} face="top" /><PkgArt artwork={sides.top} /></div>
      <div className="face face-bottom" style={sideStyle(sides.bottom, {height:d, top:(h-d)/2, transform:`rotateX(-90deg) translateZ(${h/2}px)`, backgroundBlendMode: 'multiply'})}><BoxVariantDetails variant={variant} face="bottom" /><PkgArt artwork={sides.bottom} /></div>
    </div>
  );
}

// ── BAG 3D ─────────────────────────────────────────────────
function Bag3D({ sides, rotation, idle, variant }){
  const w = 200, h = 260, d = 60;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const style = {
    width: w, height: h,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
  };
  return (
    <div className={`pkg-3d pkg-bag pkg-bag-${variant || 'doy-pack'} ${idle?'idle':''}`} style={style}>
      <div className="face" style={sideStyle(sides.front, {transform:`translateZ(${d/2}px)`})}>
        <div className="seal" />
        <BagVariantDetails variant={variant} />
        <PkgArt artwork={sides.front} />
      </div>
      <div className="face" style={sideStyle(sides.back, {transform:`rotateY(180deg) translateZ(${d/2}px)`})}>
        <div className="seal" />
        <PkgArt artwork={sides.back} />
      </div>
      <div className="face" style={sideStyle(sides.right, {width:d, left:(w-d)/2, transform:`rotateY(90deg) translateZ(${w/2}px)`})}>
        <div className="seal" />
        <PkgArt artwork={sides.right} side="left" />
      </div>
      <div className="face" style={sideStyle(sides.left, {width:d, left:(w-d)/2, transform:`rotateY(-90deg) translateZ(${w/2}px)`})}>
        <div className="seal" />
        <PkgArt artwork={sides.left} side="left" />
      </div>
    </div>
  );
}

// ── CUP 3D ─────────────────────────────────────────────────
function Cup3D({ sides, activeSide, rotation, idle, variant }){
  const artwork = sides[activeSide] || sides.front;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const style = {
    width: 220, height: 250,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: artwork.backgroundColor, ['--pkg-art-color']: pktContrast(artwork.backgroundColor),
  };
  return (
    <div className={`pkg-3d pkg-cup-wrap pkg-cup-${variant || 'single-wall'} ${idle?'idle':''}`} style={style}>
      <div className="pkg-cup">
        <div className="pkg-cup-rim" />
        <CupVariantDetails variant={variant} />
        <PkgArt artwork={artwork} />
        <div className="pkg-cup-bottom" />
      </div>
    </div>
  );
}

// ── STICKER 3D ─────────────────────────────────────────────
function Sticker3D({ sides, rotation, idle, variant }){
  const artwork = sides.front;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const radius = stickerRadius(variant);
  const dims = stickerDims(variant);
  const style = {
    ...dims,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: artwork.backgroundColor, ['--pkg-art-color']: pktContrast(artwork.backgroundColor),
    ['--pkg-radius']: radius,
  };
  return (
    <div className={`pkg-3d pkg-sticker-wrap pkg-sticker-${variant || 'round'} ${idle?'idle':''}`} style={style}>
      <div className="pkg-sticker">
        <PkgArt artwork={artwork} />
      </div>
    </div>
  );
}

// ── UNFOLD (плоская развёртка) ─────────────────────────────
const UNFOLD_LABELS = {
  front: 'Лицо',
  back: 'Задняя сторона',
  left: 'Левый бок',
  right: 'Правый бок',
  top: 'Верх',
  bottom: 'Низ',
};

function Unfold({ type, variant, sides, size }){
  const panel = (sideId, w, h, key, extra = {}) => {
    const artwork = sides[sideId];
    const visible = artwork?.visible !== false;
    const style = visible
      ? sideStyle(artwork, { width: w, height: h, ...extra })
      : { width: w, height: h, ...extra };
    return (
      <div key={key} className={`panel ${visible ? '' : 'muted'}`} style={style}>
        <span className="panel-label">{UNFOLD_LABELS[sideId]}</span>
        {visible && <PkgArt artwork={artwork} side={sideId === 'left' || sideId === 'right' ? 'left' : undefined} />}
      </div>
    );
  };
  const empty = (w,h,key) => <div key={key} className="panel empty" style={{width:w,height:h}}/>;

  if (type === 'box'){
    const W = size?.w || 180;
    const H = size?.h || 130;
    const D = size?.d || 90;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{
          gridTemplateColumns: `${D}px ${W}px ${D}px ${W}px`,
          gridTemplateRows: `${D}px ${H}px ${D}px`,
        }}>
          {empty(D,D,'a1')} {panel('top', W, D, 'a2')} {empty(D,D,'a3')} {empty(W,D,'a4')}
          {panel('left', D, H, 'b1')} {panel('front', W, H, 'b2')} {panel('right', D, H, 'b3')} {panel('back', W, H, 'b4')}
          {empty(D,D,'c1')} {panel('bottom', W, D, 'c2')} {empty(D,D,'c3')} {empty(W,D,'c4')}
        </div>
      </div>
    );
  }
  if (type === 'bag'){
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{
          gridTemplateColumns: `40px 180px 40px 180px`,
          gridTemplateRows: `230px`,
        }}>
          {panel('left', 40, 230, 'a')}
          {panel('front', 180, 230, 'b')}
          {panel('right', 40, 230, 'c')}
          {panel('back', 180, 230, 'd')}
        </div>
      </div>
    );
  }
  if (type === 'cup'){
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{
          gridTemplateColumns: `210px 210px`,
          gridTemplateRows: `200px`,
        }}>
          {panel('front', 210, 200, 'front', { clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)' })}
          {panel('back', 210, 200, 'back', { clipPath: 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)' })}
        </div>
      </div>
    );
  }
  const dims = stickerDims(variant);
  const flatDims = variant === 'rectangle'
    ? { width: 260, height: 170 }
    : variant === 'oval'
      ? { width: 250, height: 180 }
      : { width: 220, height: 220 };
  return (
    <div className="pkg-unfold-wrap">
      <div className="pkg-unfold" style={{
        gridTemplateColumns: `${flatDims.width}px`,
        gridTemplateRows: `${flatDims.height}px`,
      }}>
        {panel('front', flatDims.width, flatDims.height, 'front', {
          borderRadius: stickerRadius(variant),
          width: Math.min(dims.width, flatDims.width),
          height: Math.min(dims.height, flatDims.height),
        })}
      </div>
    </div>
  );
}

// ── PackagingPreview (главный экспорт) ─────────────────────
export function PackagingPreview({ type='box', variant='', color='#B08A5B', logo=null, text='', sides=null, activeSide='front', view='3d', interactive=true, idle=true, size }){
  const [rot, setRot] = React.useState({ x: -12, y: -22 });
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef(null);
  const userInteracted = React.useRef(false);
  const allSides = buildSides({ sides, color, logo, text });

  const onDown = (e) => {
    if (!interactive) return;
    userInteracted.current = true;
    setDragging(true);
    startRef.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y };
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;
      setRot({
        x: Math.max(-60, Math.min(40, startRef.current.rx - dy * 0.4)),
        y: startRef.current.ry + dx * 0.5,
      });
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  if (view === 'flat'){
    return (
      <div className="pkg-stage">
        <style>{PKG_STYLE}</style>
        <Unfold type={type} variant={variant} sides={allSides} size={size}/>
      </div>
    );
  }

  const props = { sides: allSides, activeSide, rotation: rot, idle: idle && !userInteracted.current, variant };
  let Body;
  if (type === 'box') Body = <Box3D {...props} size={size}/>;
  else if (type === 'bag') Body = <Bag3D {...props}/>;
  else if (type === 'cup') Body = <Cup3D {...props}/>;
  else Body = <Sticker3D {...props}/>;

  return (
    <div
      className={`pkg-stage ${dragging?'dragging':''} ${type==='bag'?'tall':''}`}
      onPointerDown={onDown}
      style={{ cursor: interactive ? (dragging?'grabbing':'grab') : 'default' }}
    >
      <style>{PKG_STYLE}</style>
      <div className="pkg-floor" />
      {Body}
    </div>
  );
}

