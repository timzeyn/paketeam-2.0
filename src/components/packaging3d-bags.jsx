// ─────────────────────────────────────────────────────────
// ПАКЕТЕАМ · BAG 3D MODELS (real preserve-3d cuboids)
// ─────────────────────────────────────────────────────────
// All five bag types share one pattern, lifted from the original
// FlatBottomBag3D: a preserve-3d wrapper that holds five faces —
// front, back, two side gussets, and a bottom. Every face uses
// the same base color (var(--pkg-color)); brightness differences
// come from shading overlays so seams line up where faces meet.
// Variant-specific extras (zipper teeth, hang-hole, paper handles,
// fold-over flap, shipping label, tin-tie, etc.) sit either inside
// the face that owns them or as separate 3D layers anchored above
// the bag via translateZ.
// ─────────────────────────────────────────────────────────

import React from 'react';
import { PkgArt, pktContrast, shade, SIDE_IDS } from './packaging3d.jsx';

// ── Geometry per variant ───────────────────────────────
// w, h, d are in CSS px. d is the *effective* depth: for the
// doypack this is the bottom-gusset depth (front/back panels
// meet at the top seam — there are no side walls).
export const BAG_GEOMETRY = {
  'doy-pack':              { w: 230, h: 320, d: 60 },
  'zip-lock-bag':          { w: 220, h: 270, d: 18 },
  'flat-bottom-bag':       { w: 220, h: 280, d: 80 },
  'paper-bag-with-handles':{ w: 230, h: 280, d: 120 },
  'courier-bag':           { w: 280, h: 200, d: 18 },
};

// 360° rotation: no Y clamp. X is mildly clamped so the bag never
// flips fully upside down (which would look unnatural for a pouch).
function clampRotation(_variant, rotation){
  return {
    rx: Math.max(-30, Math.min(30, rotation.x)),
    ry: rotation.y,
  };
}

// Common art renderer for a face. Pass the real side id through so
// PkgArt knows whether to render the brand placeholder (front only).
function FaceArt({ artwork, side }){
  if (artwork?.visible === false) return null;
  return <PkgArt artwork={artwork} side={side} />;
}

// Shared wrapper-style helper
function bagWrapStyle({ w, h, rx, ry, color, extra }){
  return {
    width: w, height: h,
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate3d(-50%, -50%, 0) rotateX(${rx}deg) rotateY(${ry}deg)`,
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
    ['--pkg-dark']: shade(color, -0.30),
    ['--pkg-darker']: shade(color, -0.45),
    ['--pkg-light']: shade(color, 0.22),
    ...extra,
  };
}

// ─────────────────────────────────────────────────────────
// 1) DOY-PACK · stand-up pouch (REBUILT FROM SCRATCH)
// ─────────────────────────────────────────────────────────
// Real doypack geometry: TWO panels only (front + back). They
// meet/seal at the top, along both side edges (where the seam
// is visible as a thin line), and fan apart at the bottom via
// a flat-folded gusset that lets the bag stand. There are no
// "side walls" — that's the whole point of a stand-up pouch.
//
// To achieve the classic wedge silhouette in the side view, the
// front and back panels are tilted around their TOP edge:
//   - front: rotateX(+tiltDeg) → bottom protrudes forward
//   - back:  rotateX(-tiltDeg) (after rotateY 180) → bottom back
// The bottom-gusset depth = 2 * H * sin(tiltDeg), so the math
// closes naturally at the base.
// ─────────────────────────────────────────────────────────
export function DoyPack3D({ sides, rotation, idle, geometryId = 'doy-pack', sealedTop = false, renderSideArt = false }){
  const { w: W, h: H, d: D } = BAG_GEOMETRY[geometryId] || BAG_GEOMETRY['doy-pack'];
  const color = sides.front?.backgroundColor || '#B08A5B';
  const { rx, ry } = clampRotation(geometryId, rotation);

  // Tilt angle derived from gusset depth so the base aligns
  const tiltRad = Math.atan((D / 2) / H);
  const tiltDeg = (tiltRad * 180) / Math.PI;
  const baseY   = H * Math.cos(tiltRad);   // y where the panel bottoms land
  const baseZ   = H * Math.sin(tiltRad);   // z protrusion of the bottom edge

  return (
    <div className={`pkg-3d pkg-bg pkg-doy3d ${idle ? 'pkg-doy3d-idle' : ''}`}
         style={bagWrapStyle({ w: W, h: H, rx, ry, color })}>

      {/* FRONT panel — anchored at top, tilted forward */}
      <div className="pkg-doy3d-face pkg-doy3d-front"
           style={{
             width: W, height: H,
             left: 0, top: 0,
             transformOrigin: '50% 0%',
             transform: `rotateX(${tiltDeg}deg)`,
           }}>
        <div className="pkg-doy3d-mat" />
        <div className="pkg-doy3d-wrinkles" />
        <div className="pkg-doy3d-side-seam left" />
        <div className="pkg-doy3d-side-seam right" />
        <div className="pkg-doy3d-bottom-shadow" />
        <div className="pkg-doy3d-top-seal">
          {!sealedTop && <div className="pkg-doy3d-zip-track" />}
          {!sealedTop && <div className="pkg-doy3d-notch left" />}
          {!sealedTop && <div className="pkg-doy3d-notch right" />}
        </div>
        <div className="pkg-doy3d-art-area">
          <FaceArt artwork={sides.front} side="front" />
        </div>
      </div>

      {/* BACK panel — anchored at top, tilted backward */}
      <div className="pkg-doy3d-face pkg-doy3d-back"
           style={{
             width: W, height: H,
             left: 0, top: 0,
             transformOrigin: '50% 0%',
             transform: `rotateY(180deg) rotateX(${tiltDeg}deg)`,
           }}>
        <div className="pkg-doy3d-mat back" />
        <div className="pkg-doy3d-wrinkles" />
        <div className="pkg-doy3d-side-seam left" />
        <div className="pkg-doy3d-side-seam right" />
        <div className="pkg-doy3d-bottom-shadow" />
        <div className="pkg-doy3d-top-seal">
          {!sealedTop && <div className="pkg-doy3d-zip-track" />}
        </div>
        <div className="pkg-doy3d-art-area">
          <FaceArt artwork={sides.back} side="back" />
        </div>
      </div>

      {/* RIGHT TRIANGULAR SIDE WALL — apex at the top seam, base spreads
          to the full gusset depth at the bottom. Mirrors the left wall. */}
      <div className="pkg-doy3d-face pkg-doy3d-side right"
           style={{
             width: D, height: baseY,
             left: (W - D) / 2, top: 0,
             transform: `rotateY(90deg) translateZ(${W/2}px)`,
             clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
           }}>
        <div className="pkg-doy3d-side-mat" />
        <div className="pkg-doy3d-side-crease" />
        {renderSideArt && <FaceArt artwork={sides.right} side="right" />}
      </div>

      {/* LEFT TRIANGULAR SIDE WALL — the classic stand-up pouch
          silhouette: a single point at the top heat seal that fans out
          into the full gusset depth at the base. */}
      <div className="pkg-doy3d-face pkg-doy3d-side left"
           style={{
             width: D, height: baseY,
             left: (W - D) / 2, top: 0,
             transform: `rotateY(-90deg) translateZ(${W/2}px)`,
             clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
           }}>
        <div className="pkg-doy3d-side-mat" />
        <div className="pkg-doy3d-side-crease" />
        {renderSideArt && <FaceArt artwork={sides.left} side="left" />}
      </div>

      {/* BOTTOM GUSSET — flat horizontal panel at the base */}
      <div className="pkg-doy3d-face pkg-doy3d-base"
           style={{
             width: W, height: D,
             left: 0, top: baseY - D/2,
             transform: `rotateX(90deg)`,
           }}>
        <div className="pkg-doy3d-base-mat" />
        <div className="pkg-doy3d-base-fold-x" />
        <div className="pkg-doy3d-base-fold-d1" />
        <div className="pkg-doy3d-base-fold-d2" />
        <FaceArt artwork={sides.bottom} side="bottom" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 2) ZIP-LOCK BAG · flat resealable pouch
// ─────────────────────────────────────────────────────────
// Very thin (D=18) cuboid. The top of every side face has a
// dedicated zipper band with interlocking teeth + hang-hole tab.
// ─────────────────────────────────────────────────────────
export function ZipLock3D({ sides, rotation, idle }){
  const { w: W, h: H, d: D } = BAG_GEOMETRY['zip-lock-bag'];
  const color = sides.front?.backgroundColor || '#B08A5B';
  const { rx, ry } = clampRotation('zip-lock-bag', rotation);

  return (
    <div className={`pkg-3d pkg-bg pkg-zip3d ${idle ? 'pkg-zip3d-idle' : ''}`}
         style={bagWrapStyle({ w: W, h: H, rx, ry, color })}>

      {/* FRONT */}
      <div className="pkg-zip3d-face pkg-zip3d-front"
           style={{ width: W, height: H, transform: `translateZ(${D/2}px)` }}>
        <div className="pkg-zip3d-mat" />
        <div className="pkg-zip3d-edge left" />
        <div className="pkg-zip3d-edge right" />
        <div className="pkg-zip3d-top-flap">
          <div className="pkg-zip3d-hang-hole" />
        </div>
        <div className="pkg-zip3d-zip">
          <div className="pkg-zip3d-zip-teeth" />
          <div className="pkg-zip3d-zip-rail" />
        </div>
        <div className="pkg-zip3d-bottom-seam" />
        <div className="pkg-zip3d-art-area">
          <FaceArt artwork={sides.front} side="front" />
        </div>
      </div>

      {/* BACK */}
      <div className="pkg-zip3d-face pkg-zip3d-back"
           style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D/2}px)` }}>
        <div className="pkg-zip3d-mat back" />
        <div className="pkg-zip3d-edge left" />
        <div className="pkg-zip3d-edge right" />
        <div className="pkg-zip3d-top-flap">
          <div className="pkg-zip3d-hang-hole" />
        </div>
        <div className="pkg-zip3d-zip">
          <div className="pkg-zip3d-zip-teeth" />
          <div className="pkg-zip3d-zip-rail" />
        </div>
        <div className="pkg-zip3d-bottom-seam" />
        <div className="pkg-zip3d-art-area">
          <FaceArt artwork={sides.back} side="back" />
        </div>
      </div>

      {/* LEFT GUSSET — extremely thin welded seam */}
      <div className="pkg-zip3d-face pkg-zip3d-seam"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(-90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-zip3d-seam-mat" />
      </div>
      {/* RIGHT GUSSET — extremely thin welded seam */}
      <div className="pkg-zip3d-face pkg-zip3d-seam"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-zip3d-seam-mat" />
      </div>
      {/* BOTTOM — thin welded seam */}
      <div className="pkg-zip3d-face pkg-zip3d-base"
           style={{ width: W, height: D, left: 0, top: (H - D) / 2,
                    transform: `rotateX(-90deg) translateZ(${H/2}px)` }}>
        <div className="pkg-zip3d-seam-mat" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 3) FLAT-BOTTOM BAG · structured pouch (REBUILT)
// ─────────────────────────────────────────────────────────
// Block-bottom coffee bag. Five faces + a prominent "fin seal"
// (3D ridge sticking up above the top) + a degassing valve.
// The side gussets are heavily creased with diagonal fold
// lines at top and bottom corners — the classic block-bottom
// silhouette where the gussets fold inward into the corners.
// ─────────────────────────────────────────────────────────
export function FlatBottomBag3D({ sides, rotation, idle }){
  return (
    <DoyPack3D
      sides={sides}
      rotation={rotation}
      idle={idle}
      geometryId="flat-bottom-bag"
      sealedTop
      renderSideArt
    />
  );
}

// ─────────────────────────────────────────────────────────
// 4) PAPER BAG WITH HANDLES · shopping bag (REBUILT)
// ─────────────────────────────────────────────────────────
// Structured cuboid kraft bag, classic block-bottom form.
// Five faces + a real 3D top fold band + flat paper-strap
// handles (NOT arched wire-style — the reference shows flat
// reinforced paper straps). Handles are rendered as 3D layers:
// two horizontal straps that arch *flat* up from the bag top,
// with rectangular attachment patches visible inside.
// ─────────────────────────────────────────────────────────
export function PaperBag3D({ sides, rotation, idle }){
  const { w: W, h: H, d: D } = BAG_GEOMETRY['paper-bag-with-handles'];
  const color = sides.front?.backgroundColor || '#B89368';
  const { rx, ry } = clampRotation('paper-bag-with-handles', rotation);
  const handleColor = shade(color, -0.38);
  const handleH = 38;  // arch height
  const handleStrap = 7;  // strap thickness

  const wrapExtra = {
    ['--pkg-handle-color']: handleColor,
    ['--pkg-handle-dark']:  shade(color, -0.52),
  };

  // A single arched paper-strap handle. Border-top + border-sides
  // form the strap; border-bottom is removed so the inside is open.
  // The strap is flat (constant thickness) like a real folded-paper handle.
  const Handle = ({ side }) => (
    <div className={`pkg-pb3d-handle ${side}`}>
      <div className="pkg-pb3d-handle-anchor left" />
      <div className="pkg-pb3d-handle-anchor right" />
    </div>
  );

  return (
    <div className={`pkg-3d pkg-bg pkg-pb3d ${idle ? 'pkg-pb3d-idle' : ''}`}
         style={bagWrapStyle({ w: W, h: H, rx, ry, color, extra: wrapExtra })}>

      {/* FRONT */}
      <div className="pkg-pb3d-face pkg-pb3d-front"
           style={{ width: W, height: H, transform: `translateZ(${D/2}px)` }}>
        <div className="pkg-pb3d-mat" />
        <div className="pkg-pb3d-wrinkles" />
        <div className="pkg-pb3d-edge left" />
        <div className="pkg-pb3d-edge right" />
        <div className="pkg-pb3d-top-fold" />
        <div className="pkg-pb3d-bottom-shadow" />
        <div className="pkg-pb3d-bottom-fold-line" />
        <div className="pkg-pb3d-art-area">
          <FaceArt artwork={sides.front} side="front" />
        </div>
      </div>

      {/* BACK */}
      <div className="pkg-pb3d-face pkg-pb3d-back"
           style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D/2}px)` }}>
        <div className="pkg-pb3d-mat back" />
        <div className="pkg-pb3d-wrinkles" />
        <div className="pkg-pb3d-edge left" />
        <div className="pkg-pb3d-edge right" />
        <div className="pkg-pb3d-top-fold" />
        <div className="pkg-pb3d-bottom-shadow" />
        <div className="pkg-pb3d-bottom-fold-line" />
        <div className="pkg-pb3d-art-area">
          <FaceArt artwork={sides.back} side="back" />
        </div>
      </div>

      {/* LEFT GUSSET — visible vertical center fold + corner folds */}
      <div className="pkg-pb3d-face pkg-pb3d-gusset"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(-90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-pb3d-gusset-mat" />
        <div className="pkg-pb3d-gusset-crease" />
        <div className="pkg-pb3d-gusset-corner tl" />
        <div className="pkg-pb3d-gusset-corner bl" />
        <div className="pkg-pb3d-top-fold" />
        <FaceArt artwork={sides.left} side="left" />
      </div>

      {/* RIGHT GUSSET */}
      <div className="pkg-pb3d-face pkg-pb3d-gusset"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-pb3d-gusset-mat" />
        <div className="pkg-pb3d-gusset-crease" />
        <div className="pkg-pb3d-gusset-corner tl" />
        <div className="pkg-pb3d-gusset-corner bl" />
        <div className="pkg-pb3d-top-fold" />
        <FaceArt artwork={sides.right} side="right" />
      </div>

      {/* BOTTOM — folded base with visible fold lines */}
      <div className="pkg-pb3d-face pkg-pb3d-base"
           style={{ width: W, height: D, left: 0, top: (H - D) / 2,
                    transform: `rotateX(-90deg) translateZ(${H/2}px)` }}>
        <div className="pkg-pb3d-base-mat" />
        <div className="pkg-pb3d-base-fold v" />
        <div className="pkg-pb3d-base-fold h" />
        <div className="pkg-pb3d-base-fold d1" />
        <div className="pkg-pb3d-base-fold d2" />
      </div>

      {/* FRONT HANDLES — flat strap, 3D layer in front of the face */}
      <div className="pkg-pb3d-handle-layer"
           style={{ width: W, height: H, transform: `translateZ(${D/2 + 1}px)` }}>
        <Handle side="left" />
        <Handle side="right" />
      </div>
      {/* BACK HANDLES */}
      <div className="pkg-pb3d-handle-layer back"
           style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D/2 + 1}px)` }}>
        <Handle side="left" />
        <Handle side="right" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 5) COURIER MAILER · poly mailer
// ─────────────────────────────────────────────────────────
// Very thin cuboid (D=18). A genuine 3D fold-over flap on the
// top sits as its own preserve-3d sub-element rotated forward by
// ~14° so you can see the adhesive strip. Front face shows the
// shipping label area.
// ─────────────────────────────────────────────────────────
export function CourierBag3D({ sides, rotation, idle }){
  const { w: W, h: H, d: D } = BAG_GEOMETRY['courier-bag'];
  const color = sides.front?.backgroundColor || '#B08A5B';
  const { rx, ry } = clampRotation('courier-bag', rotation);
  const flapH = Math.round(H * 0.22);  // 22% of body — the folded flap

  return (
    <div className={`pkg-3d pkg-bg pkg-cb3d ${idle ? 'pkg-cb3d-idle' : ''}`}
         style={bagWrapStyle({ w: W, h: H, rx, ry, color })}>

      {/* FRONT BODY */}
      <div className="pkg-cb3d-face pkg-cb3d-front"
           style={{ width: W, height: H, transform: `translateZ(${D/2}px)` }}>
        <div className="pkg-cb3d-mat" />
        <div className="pkg-cb3d-weld left" />
        <div className="pkg-cb3d-weld right" />
        <div className="pkg-cb3d-weld bottom" />
        {/* shipping label area on the front */}
        <div className="pkg-cb3d-label">
          <div className="pkg-cb3d-label-stripe" />
          <div className="pkg-cb3d-label-barcode" />
        </div>
        <div className="pkg-cb3d-art-area">
          <FaceArt artwork={sides.front} side="front" />
        </div>
      </div>

      {/* BACK BODY */}
      <div className="pkg-cb3d-face pkg-cb3d-back"
           style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D/2}px)` }}>
        <div className="pkg-cb3d-mat back" />
        <div className="pkg-cb3d-weld left" />
        <div className="pkg-cb3d-weld right" />
        <div className="pkg-cb3d-weld bottom" />
        <div className="pkg-cb3d-art-area">
          <FaceArt artwork={sides.back} side="back" />
        </div>
      </div>

      {/* LEFT GUSSET — thin welded seam */}
      <div className="pkg-cb3d-face pkg-cb3d-seam"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(-90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-cb3d-seam-mat" />
      </div>
      {/* RIGHT GUSSET — thin welded seam */}
      <div className="pkg-cb3d-face pkg-cb3d-seam"
           style={{ width: D, height: H, left: (W - D) / 2, top: 0,
                    transform: `rotateY(90deg) translateZ(${W/2}px)` }}>
        <div className="pkg-cb3d-seam-mat" />
      </div>
      {/* BOTTOM — thin welded seam */}
      <div className="pkg-cb3d-face pkg-cb3d-base"
           style={{ width: W, height: D, left: 0, top: (H - D) / 2,
                    transform: `rotateX(-90deg) translateZ(${H/2}px)` }}>
        <div className="pkg-cb3d-seam-mat" />
      </div>

      {/* FOLD-OVER FLAP — its own 3D sub-stage tilted forward.
         Sits just above the front face, hinged at the bag top. */}
      <div className="pkg-cb3d-flap"
           style={{
             width: W, height: flapH,
             left: 0, top: 0,
             transformOrigin: '50% 0%',
             transform: `translateZ(${D/2}px) rotateX(18deg) translateY(${-flapH * 0.02}px)`,
           }}>
        <div className="pkg-cb3d-flap-mat" />
        <div className="pkg-cb3d-flap-fold-line" />
        <div className="pkg-cb3d-flap-adhesive">
          <div className="pkg-cb3d-flap-peel">PEEL &amp; SEAL</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Bag3D dispatcher — keeps the original prop contract
// ─────────────────────────────────────────────────────────
export function Bag3D({ sides, rotation, idle, variant }){
  const v = variant || 'doy-pack';
  if (v === 'doy-pack')               return <DoyPack3D       sides={sides} rotation={rotation} idle={idle} />;
  if (v === 'zip-lock-bag')           return <ZipLock3D       sides={sides} rotation={rotation} idle={idle} />;
  if (v === 'flat-bottom-bag')        return <FlatBottomBag3D sides={sides} rotation={rotation} idle={idle} />;
  if (v === 'paper-bag-with-handles') return <PaperBag3D      sides={sides} rotation={rotation} idle={idle} />;
  if (v === 'courier-bag')            return <CourierBag3D    sides={sides} rotation={rotation} idle={idle} />;
  return <DoyPack3D sides={sides} rotation={rotation} idle={idle} />;
}

// ─────────────────────────────────────────────────────────
// BAG UNFOLD / DIELINE per variant
// ─────────────────────────────────────────────────────────
// Each bag type gets its own true dieline layout. Panels reuse
// the existing .panel class from PKG_STYLE so colors/art map
// correctly via the existing surface system.
// ─────────────────────────────────────────────────────────
const BAG_UNFOLD_LABELS = {
  front: 'Лицо', back: 'Задняя сторона',
  left: 'Левый бок', right: 'Правый бок',
  top: 'Верх / Шов', bottom: 'Дно',
  flap: 'Клапан',
};

function bagPanel(sides, sideId, w, h, key, label, extra = {}){
  const artwork = sides[sideId];
  const visible = artwork?.visible !== false;
  const bg = artwork?.backgroundColor || '#B08A5B';
  const style = visible
    ? { width: w, height: h, backgroundColor: bg,
        ['--pkg-color']: bg, ['--pkg-art-color']: pktContrast(bg), ...extra }
    : { width: w, height: h, ...extra };
  return (
    <div key={key} className={`panel ${visible ? '' : 'muted'}`} style={style}>
      <span className="panel-label">{label || BAG_UNFOLD_LABELS[sideId] || sideId}</span>
      {visible && <PkgArt artwork={artwork} side={sideId === 'left' || sideId === 'right' ? 'left' : undefined} />}
    </div>
  );
}
function bagEmpty(w, h, key){
  return <div key={key} className="panel empty" style={{ width: w, height: h }} />;
}

export function BagUnfold({ variant, sides }){
  const v = variant || 'doy-pack';

  // ── Doypack: top seal · L-gusset · FRONT · R-gusset · BACK · curved bottom gusset
  if (v === 'doy-pack'){
    const W = 150, H = 230, G = 36;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold pkg-unfold-doy"
             style={{ gridTemplateColumns: `${G}px ${W}px ${G}px ${W}px`,
                      gridTemplateRows: `28px ${H}px 44px` }}>
          {bagEmpty(G, 28, 'h1')}
          <div className="panel ghost seal" style={{ gridColumn: '2 / span 3', height: 28 }}>
            <span className="panel-label">Верхний шов</span>
          </div>
          {bagPanel(sides, 'left',  G, H, 'l',  'L-гассет')}
          {bagPanel(sides, 'front', W, H, 'f')}
          {bagPanel(sides, 'right', G, H, 'r',  'R-гассет')}
          {bagPanel(sides, 'back',  W, H, 'b')}
          {bagEmpty(G, 44, 'h3')}
          <div className="panel ghost gusset-bottom"
               style={{ gridColumn: '2 / span 3', height: 44,
                        clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)' }}>
            <span className="panel-label">Донный гассет</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Zip-lock: simple front+back, zipper strip painted on top of each
  if (v === 'zip-lock-bag'){
    const W = 200, H = 230;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold pkg-unfold-zip"
             style={{ gridTemplateColumns: `${W}px ${W}px`,
                      gridTemplateRows: `${H}px` }}>
          {bagPanel(sides, 'front', W, H, 'f', undefined, { className: 'panel zip' })}
          {bagPanel(sides, 'back',  W, H, 'b', undefined, { className: 'panel zip' })}
        </div>
        <div className="pkg-unfold-caption">Плоская развёртка с зип-лок планкой по верхнему краю</div>
      </div>
    );
  }

  // ── Flat-bottom: L-side · FRONT · R-side · BACK + integrated flat base + top seal
  if (v === 'flat-bottom-bag'){
    const W = 150, H = 240, G = 44;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold pkg-unfold-flat"
             style={{ gridTemplateColumns: `${G}px ${W}px ${G}px ${W}px`,
                      gridTemplateRows: `26px ${H}px 50px` }}>
          {bagEmpty(G, 26, 'h1')}
          <div className="panel ghost seal" style={{ gridColumn: '2 / span 3', height: 26 }}>
            <span className="panel-label">Верхний шов</span>
          </div>
          {bagPanel(sides, 'left',  G, H, 'l',  'L-бок')}
          {bagPanel(sides, 'front', W, H, 'f')}
          {bagPanel(sides, 'right', G, H, 'r',  'R-бок')}
          {bagPanel(sides, 'back',  W, H, 'b')}
          {bagEmpty(G, 50, 'h3')}
          {bagPanel(sides, 'bottom', W, 50, 'btm', 'Плоское дно',
                 { gridColumn: '2 / span 1' })}
          {bagEmpty(G, 50, 'h4')}
          {bagEmpty(W, 50, 'h5')}
        </div>
      </div>
    );
  }

  // ── Paper bag: L-gusset · FRONT · R-gusset · BACK + bottom flap panels
  if (v === 'paper-bag-with-handles'){
    const W = 130, H = 220, G = 60;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold pkg-unfold-paper"
             style={{ gridTemplateColumns: `${G}px ${W}px ${G}px ${W}px`,
                      gridTemplateRows: `22px ${H}px 60px` }}>
          {/* top-fold band on every column */}
          <div className="panel ghost top-fold" style={{ gridColumn: '1 / span 4', height: 22 }}>
            <span className="panel-label">Верхний загиб + ручки</span>
          </div>
          {bagPanel(sides, 'left',  G, H, 'lg',  'L-гассет')}
          {bagPanel(sides, 'front', W, H, 'f')}
          {bagPanel(sides, 'right', G, H, 'rg',  'R-гассет')}
          {bagPanel(sides, 'back',  W, H, 'b')}
          {/* bottom flap row */}
          <div className="panel ghost bot-flap" style={{ height: 60,
               clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}>
            <span className="panel-label">Клапан</span>
          </div>
          {bagPanel(sides, 'bottom', W, 60, 'b1', 'Низ', { background: undefined })}
          <div className="panel ghost bot-flap" style={{ height: 60,
               clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}>
            <span className="panel-label">Клапан</span>
          </div>
          {bagPanel(sides, 'bottom', W, 60, 'b2', 'Низ', { background: undefined })}
        </div>
      </div>
    );
  }

  // ── Courier mailer: FLAP · FRONT · BACK
  if (v === 'courier-bag'){
    const W = 280, H = 180;
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold pkg-unfold-courier"
             style={{ gridTemplateColumns: `${W}px`,
                      gridTemplateRows: `46px ${H}px ${H}px 14px` }}>
          <div className="panel ghost flap"
               style={{ height: 46,
                        clipPath: 'polygon(6% 0, 94% 0, 100% 100%, 0 100%)' }}>
            <span className="panel-label">Клапан + клеевой слой</span>
          </div>
          {bagPanel(sides, 'front', W, H, 'f')}
          {bagPanel(sides, 'back',  W, H, 'b')}
          <div className="panel ghost weld" style={{ height: 14 }}>
            <span className="panel-label">Нижний шов</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: simple flat layout
  return (
    <div className="pkg-unfold-wrap">
      <div className="pkg-unfold" style={{ gridTemplateColumns: '40px 180px 40px 180px', gridTemplateRows: '230px' }}>
        {bagPanel(sides, 'left',  40, 230, 'a')}
        {bagPanel(sides, 'front', 180, 230, 'b')}
        {bagPanel(sides, 'right', 40, 230, 'c')}
        {bagPanel(sides, 'back',  180, 230, 'd')}
      </div>
    </div>
  );
}
