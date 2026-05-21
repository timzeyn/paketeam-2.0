import React from 'react';
import { PKG_STYLE, PKG_STYLE_PART2 } from './packaging3d-styles.js';

// ─────────────────────────────────────────────────────────
// ПАКЕТЕАМ 3D Packaging Preview
// Каждая категория — со своей собственной 3D-структурой,
// а не наклеенные линии поверх одинаковой коробки.
// ─────────────────────────────────────────────────────────

const STYLE_BLOCK = PKG_STYLE + PKG_STYLE_PART2;

// ── helpers ─────────────────────────────────────────────
function pktContrast(hex){
  const h = String(hex || '').replace('#','');
  const x = h.length === 3 ? h.replace(/./g, c=>c+c) : h.padEnd(6,'0');
  const n = parseInt(x.slice(0,6), 16) || 0;
  const r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  return (r*299 + g*587 + b*114) > 145000 ? '#0F1626' : '#FFFFFF';
}
// смешать с белым/чёрным — для крышки и подноса оттенков
function shade(hex, amount){
  const h = String(hex || '#b08a5b').replace('#','');
  const x = h.length === 3 ? h.replace(/./g, c=>c+c) : h.padEnd(6,'0');
  const n = parseInt(x.slice(0,6), 16) || 0;
  let r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  const target = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  r = Math.round(r + (target - r) * t);
  g = Math.round(g + (target - g) * t);
  b = Math.round(b + (target - b) * t);
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

const SIDE_IDS = ['front', 'back', 'left', 'right', 'top', 'bottom'];

function buildSides({ sides, color, logo, text }){
  const fallback = { logo, text, backgroundColor: color, visible: true };
  return SIDE_IDS.reduce((acc, id) => {
    acc[id] = { ...fallback, text: id === 'front' ? text : '', ...(sides?.[id] || {}) };
    if (acc[id].backgroundColor == null) acc[id].backgroundColor = color;
    if (acc[id].visible == null) acc[id].visible = true;
    return acc;
  }, {});
}
function sideStyle(side, extra = {}){
  const bg = side?.backgroundColor || '#B08A5B';
  return { ...extra, backgroundColor: bg, ['--pkg-color']: bg, ['--pkg-art-color']: pktContrast(bg) };
}

function PkgArt({ artwork, logo, text, side }){
  const data = artwork || { logo, text, visible: true };
  if (data.visible === false) return null;
  logo = data.logo;
  text = data.text;
  const alignment = data.alignment || 'center';
  const alignItems = alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center';
  return (
    <div
      className={`pkg-art ${side === 'left' || side === 'right' ? 'side' : ''}`}
      style={{ alignItems, textAlign: alignment, transform: `scale(${data.scale || 1})`, transformOrigin: 'center' }}
    >
      <div className={`pkg-logo ${logo ? 'img' : ''}`}>
        {logo ? <img src={logo} alt="" /> : 'ПАКЕТЕАМ'}
      </div>
      {text && <div className="pkg-tag">{text}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// BOX
// ─────────────────────────────────────────────────────────

const BOX_GEOMETRY = {
  'mailer-box':     { w: 360, h: 150, d: 240 },
  'tuck-top-box':   { w: 170, h: 300, d: 110 },
  'sleeve-box':     { w: 290, h: 130, d: 150 },
  'window-box':     { w: 215, h: 280, d: 130 },
  'lid-bottom-box': { w: 280, h: 175, d: 215 },
};
function getBoxGeometry(variant, size){
  const g = BOX_GEOMETRY[variant] || BOX_GEOMETRY['mailer-box'];
  if (!size?.w) return g;
  const scale = Math.max(0.82, Math.min(1.22, size.w / 240));
  return { w: Math.round(g.w*scale), h: Math.round(g.h*scale), d: Math.round(g.d*scale) };
}

// 6 граней произвольной коробки в собственном transform-style контейнере.
// Используется и для основной коробки, и для подноса/крышки.
function Cuboid({ w, h, d, sides, faceClass = 'face', sideRender = null, faceExtras = {}, faceBgOverride = null }){
  const cls = (id) => `${faceClass} face-${id}`;
  const bg = (id) => faceBgOverride?.[id] ?? sides[id]?.backgroundColor;
  const fStyle = (id, extra) => {
    const color = bg(id) || '#B08A5B';
    return { ...extra, backgroundColor: color, ['--pkg-color']: color, ['--pkg-art-color']: pktContrast(color) };
  };
  return (
    <>
      <div className={cls('front')}
           style={fStyle('front', { width:w, height:h, left:0, top:0, transform:`translateZ(${d/2}px)` })}>
        {sideRender?.('front')}
        {faceExtras.front}
      </div>
      <div className={cls('back')}
           style={fStyle('back', { width:w, height:h, left:0, top:0, transform:`rotateY(180deg) translateZ(${d/2}px)` })}>
        {sideRender?.('back')}
        {faceExtras.back}
      </div>
      <div className={cls('right')}
           style={fStyle('right', { width:d, height:h, left:(w-d)/2, top:0, transform:`rotateY(90deg) translateZ(${w/2}px)` })}>
        {sideRender?.('right')}
        {faceExtras.right}
      </div>
      <div className={cls('left')}
           style={fStyle('left', { width:d, height:h, left:(w-d)/2, top:0, transform:`rotateY(-90deg) translateZ(${w/2}px)` })}>
        {sideRender?.('left')}
        {faceExtras.left}
      </div>
      <div className={cls('top')}
           style={fStyle('top', { width:w, height:d, left:0, top:(h-d)/2, transform:`rotateX(90deg) translateZ(${h/2}px)` })}>
        {sideRender?.('top')}
        {faceExtras.top}
      </div>
      <div className={cls('bottom')}
           style={fStyle('bottom', { width:w, height:d, left:0, top:(h-d)/2, transform:`rotateX(-90deg) translateZ(${h/2}px)` })}>
        {sideRender?.('bottom')}
        {faceExtras.bottom}
      </div>
    </>
  );
}

// Дополнительные элементы для лица/верха по варианту
function boxFaceExtras(variant, sides){
  if (variant === 'mailer-box'){
    return {
      front: <>
        <div className="pkg-mailer-tab" />
        <div className="pkg-mailer-slot" />
      </>,
      top: <>
        <div className="pkg-mailer-top-ears" />
        <div className="pkg-mailer-top-tab" />
      </>,
    };
  }
  if (variant === 'tuck-top-box'){
    return {
      front: <div className="pkg-tuck-center-seam" />,
      top:   <div className="pkg-tuck-flap" />,
    };
  }
  if (variant === 'sleeve-box'){
    return {
      right: <div className="pkg-sleeve-cave" />,
      left:  <div className="pkg-sleeve-cave" />,
    };
  }
  // window-box: окно теперь рендерится как 3D-сосед фасада, см. Box3D
  return {};
}

function Box3D({ sides, rotation, idle, size, variant }){
  const { w, h, d } = getBoxGeometry(variant, size);
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const frontColor = sides.front?.backgroundColor || '#B08A5B';
  const style = {
    width: w, height: h,
    transform: tx,
    position: 'absolute', left:'50%', top:'50%',
    ['--pkg-color']: frontColor,
    ['--pkg-art-color']: pktContrast(frontColor),
  };

  // --- LID-BOTTOM: ДВА сложенных тела — основание снизу + крышка сверху ---
  if (variant === 'lid-bottom-box'){
    const baseH  = Math.round(h * 0.62);
    const lidH   = h - baseH;
    const overhang = 12;          // выступ крышки по периметру
    const lidW   = w + overhang*2;
    const lidD   = d + overhang*2;
    const lidColor  = shade(frontColor, 0.18);
    const baseColor = shade(frontColor, -0.10);

    const lidSides  = SIDE_IDS.reduce((a,id)=>{ a[id] = { ...sides[id], backgroundColor: lidColor }; return a; }, {});
    const baseSides = SIDE_IDS.reduce((a,id)=>{ a[id] = { ...sides[id], backgroundColor: baseColor }; return a; }, {});
    const renderArt = (faceSides) => (id) => {
      const s = faceSides[id];
      return <>{s?.visible !== false && <PkgArt artwork={s} side={id === 'left' || id === 'right' ? 'left' : undefined} />}</>;
    };

    // Внутри pkg-3d (w×h) размещаем два контейнера, каждый со своим Cuboid.
    // Cuboid центрирует своё тело по width/height собственного контейнера.
    // База: контейнер (w, baseH) в позиции (0, lidH).
    // Крышка: контейнер (lidW, lidH) в позиции (-overhang, 0).
    return (
      <div className={`pkg-3d pkg-box pkg-box-lid-bottom-box ${idle?'idle':''}`} style={style}>
        {/* крышка (сверху, чуть шире/глубже) */}
        <div className="pkg-lidbottom" style={{ width:lidW, height:lidH, left:-overhang, top:0 }}>
          <Cuboid w={lidW} h={lidH} d={lidD} sides={lidSides}
            faceClass="lface"
            sideRender={renderArt(lidSides)}
            faceExtras={{
              front: <div className="pkg-lid-skirt" />,
              back:  <div className="pkg-lid-skirt" />,
              left:  <div className="pkg-lid-skirt" />,
              right: <div className="pkg-lid-skirt" />,
            }}/>
        </div>
        {/* основание (снизу) */}
        <div className="pkg-lidbottom" style={{ width:w, height:baseH, left:0, top:lidH }}>
          <Cuboid w={w} h={baseH} d={d} sides={baseSides}
            faceClass="lface"
            sideRender={renderArt(baseSides)}/>
        </div>
      </div>
    );
  }

  // --- остальные коробки: одно тело + опциональные декорации ---
  const extras = boxFaceExtras(variant, sides);
  const renderArt = (id) => {
    const s = sides[id];
    return <>{s?.visible !== false && <PkgArt artwork={s} side={id === 'left' || id === 'right' ? 'left' : undefined} />}</>;
  };

  return (
    <div className={`pkg-3d pkg-box pkg-box-${variant || 'mailer-box'} ${idle?'idle':''}`} style={style}>
      <Cuboid w={w} h={h} d={d} sides={sides}
        sideRender={renderArt}
        faceExtras={extras}/>

      {/* WINDOW-BOX: окно и рамка как отдельные 3D-слои перед фасадом.
         Делается это потому, что элементы с positive z-index внутри грани
         с transform-style:flat могут не отрисовываться поверх pseudo-overlay'ев. */}
      {variant === 'window-box' && (
        <>
          <div className="pkg-window-cutout"
               style={{ position:'absolute', left:'14%', right:'14%', top:'12%', height:'44%',
                        transform:`translateZ(${d/2 + 0.5}px)`, pointerEvents:'none' }} />
          <div className="pkg-window-frame"
               style={{ position:'absolute', left:'13%', right:'13%', top:'11%', height:'46%',
                        transform:`translateZ(${d/2 + 0.8}px)`, pointerEvents:'none' }} />
        </>
      )}

      {/* MAILER: язычок-замок и прорезь в отдельном 3D-слое перед фасадом */}
      {variant === 'mailer-box' && (
        <>
          <div className="pkg-mailer-tab"
               style={{ position:'absolute', transform:`translateZ(${d/2 + 0.6}px)` }} />
          <div className="pkg-mailer-slot"
               style={{ position:'absolute', transform:`translateZ(${d/2 + 0.8}px)` }} />
        </>
      )}

      {/* SLEEVE: поднос, торчащий вправо. Сидит в одном 3D-слое со сборкой
         рукава, частично перекрываясь его правой "пещерой". */}
      {variant === 'sleeve-box' && (() => {
        const trayW = Math.round(w * 0.55);
        const trayH = h - 16;
        const trayD = d - 22;
        const trayLeft = Math.round(w * 0.65);   // левый край подноса — внутри рукава
        const trayTop  = Math.round((h - trayH) / 2);
        const trayColor = shade(frontColor, 0.16);
        const traySides = SIDE_IDS.reduce((a,id)=>{
          a[id] = { ...sides[id], backgroundColor: trayColor };
          return a;
        }, {});
        return (
          <div className="pkg-sleeve-tray"
               style={{ width:trayW, height:trayH, left:trayLeft, top:trayTop }}>
            <Cuboid w={trayW} h={trayH} d={trayD} sides={traySides}
              faceClass="tface"
              sideRender={(id) => <>{traySides[id]?.visible !== false && <PkgArt artwork={traySides[id]} side={id === 'left' || id === 'right' ? 'left' : undefined} />}</>}
              faceExtras={{ front: <div className="pkg-tray-pull" /> }}
              />
          </div>
        );
      })()}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// BAG
// ─────────────────────────────────────────────────────────
const BAG_GEOMETRY = {
  'doy-pack':              { w: 210, h: 300, d: 58 },
  'zip-lock-bag':          { w: 220, h: 270, d: 56 },
  'flat-bottom-bag':       { w: 200, h: 280, d: 86 },
  'paper-bag-with-handles':{ w: 220, h: 280, d: 110 },
  'courier-bag':           { w: 280, h: 200, d: 26 },
};

function BagFace({ variant, artwork, faceId }){
  return (
    <div className="pkg-bag-face" style={sideStyle(artwork, { width:'100%', height:'100%', left:0, top:0 })}>
      {variant === 'zip-lock-bag' && (
        <>
          <div className="pkg-zip-track" />
          <div className="pkg-zip-notch left" />
          <div className="pkg-zip-notch right" />
        </>
      )}
      {/* flat-bottom-bag now uses its own dedicated component (FlatBottomBag2D) */}
      {variant === 'paper-bag-with-handles' && (
        <>
          <div className="pkg-paper-top-fold" />
          <div className="pkg-paper-crease left" />
          <div className="pkg-paper-crease right" />
          <div className="pkg-paper-handle left" />
          <div className="pkg-paper-handle right" />
        </>
      )}
      {variant === 'courier-bag' && (
        <div className="pkg-courier-flap" />
      )}
      <PkgArt artwork={artwork} side={faceId === 'left' || faceId === 'right' ? 'left' : undefined} />
    </div>
  );
}

function Bag3D({ sides, rotation, idle, variant }){
  const v = variant || 'doy-pack';

  // ── DOY-PACK: dedicated 2.5D mockup (NOT the generic 4-face cube) ──
  if (v === 'doy-pack') {
    return <DoyPack2D sides={sides} rotation={rotation} idle={idle} />;
  }

  // ── ZIP-LOCK: flat plastic pouch mockup (no side walls) ──
  if (v === 'zip-lock-bag') {
    return <ZipLock2D sides={sides} rotation={rotation} idle={idle} />;
  }

  // ── COURIER BAG: flat poly mailer mockup ──
  if (v === 'courier-bag') {
    return <CourierBag2D sides={sides} rotation={rotation} idle={idle} />;
  }

  // ── FLAT-BOTTOM BAG: single-body 2.5D integrated soft pouch ──
  if (v === 'flat-bottom-bag') {
    return <FlatBottomBag2D sides={sides} rotation={rotation} idle={idle} />;
  }

  // ── All other bag variants: keep the existing 4-face 3D cube ──
  const { w, h, d } = BAG_GEOMETRY[v] || BAG_GEOMETRY['doy-pack'];
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const frontColor = sides.front?.backgroundColor || '#B08A5B';
  const klass =
    v === 'paper-bag-with-handles' ? 'pkg-bag-paper' : 'pkg-bag-doy';

  const style = {
    width: w, height: h,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: frontColor,
    ['--pkg-art-color']: pktContrast(frontColor),
    ['--pkg-handle-color']: shade(frontColor, -0.35),
  };

  const sideBg = (s) => {
    const c = s?.backgroundColor || frontColor;
    return shade(c, -0.20);
  };

  return (
    <div className={`pkg-bag-wrap pkg-3d ${klass} ${idle?'idle':''}`} style={style}>
      {/* передняя */}
      <div className="pkg-bag-face" style={{ width:w, height:h, left:0, top:0, transform:`translateZ(${d/2}px)`, ...sideStyle(sides.front) }}>
        <BagFaceInner variant={v} artwork={sides.front} faceId="front" />
      </div>
      {/* задняя */}
      <div className="pkg-bag-face" style={{ width:w, height:h, left:0, top:0, transform:`rotateY(180deg) translateZ(${d/2}px)`, ...sideStyle(sides.back) }}>
        <BagFaceInner variant={v} artwork={sides.back} faceId="back" />
      </div>
      {/* боковые гассеты */}
      <div className="pkg-bag-face" style={{
        width:d, height:h, left:(w-d)/2, top:0,
        transform:`rotateY(90deg) translateZ(${w/2}px)`,
        background: sideBg(sides.right),
        ['--pkg-color']: sideBg(sides.right),
        ['--pkg-art-color']: pktContrast(sideBg(sides.right)),
      }}>
        <BagSideGusset variant={v} />
        {sides.right?.visible !== false && <PkgArt artwork={sides.right} side="left" />}
      </div>
      <div className="pkg-bag-face" style={{
        width:d, height:h, left:(w-d)/2, top:0,
        transform:`rotateY(-90deg) translateZ(${w/2}px)`,
        background: sideBg(sides.left),
        ['--pkg-color']: sideBg(sides.left),
        ['--pkg-art-color']: pktContrast(sideBg(sides.left)),
      }}>
        <BagSideGusset variant={v} />
        {sides.left?.visible !== false && <PkgArt artwork={sides.left} side="left" />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// DOY-PACK 2.5D MOCKUP
// Single coherent stand-up pouch — NO separated side panels.
// Side depth is suggested by shadow strips, not 3D faces.
// Rotation is converted to subtle perspective tilt.
// ─────────────────────────────────────────────────────────
function DoyPack2D({ sides, rotation, idle }){
  const frontSide = sides.front || {};
  const color = frontSide.backgroundColor || '#B08A5B';
  const darkEdge = shade(color, -0.22);
  const w = 210, h = 300;

  // Convert drag rotation to gentle perspective tilt (no full 3D spin)
  const tiltY = Math.max(-12, Math.min(12, rotation.y * 0.15));
  const tiltX = Math.max(-6, Math.min(6, rotation.x * 0.1));

  const wrapStyle = {
    width: w, height: h,
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate3d(-50%, -50%, 0) perspective(800px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
    transition: 'transform .35s cubic-bezier(.4,.1,.2,1)',
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
    ['--pkg-dark-edge']: darkEdge,
  };

  return (
    <div className={`pkg-doy-mockup ${idle ? 'pkg-doy-idle' : ''}`} style={wrapStyle}>
      {/* ── Main pouch body ── */}
      <div className="pkg-doy-body">
        {/* Kraft paper texture overlay */}
        <div className="pkg-doy-texture" />
        {/* Side fold shadows (left) */}
        <div className="pkg-doy-side-shadow left" />
        {/* Side fold shadows (right) */}
        <div className="pkg-doy-side-shadow right" />
        {/* Top seal band */}
        <div className="pkg-doy-seal" />
        {/* Zipper / closure lines */}
        <div className="pkg-doy-zipper" />
        {/* Tear notch left */}
        <div className="pkg-doy-notch left" />
        {/* Tear notch right */}
        <div className="pkg-doy-notch right" />
        {/* Bottom gusset */}
        <div className="pkg-doy-bottom-gusset" />
        {/* Central branding area */}
        <div className="pkg-doy-art-area">
          <PkgArt artwork={frontSide} />
        </div>
      </div>
      {/* ── Thin side edge strip (right) — suggests depth ── */}
      <div className="pkg-doy-edge right" />
      {/* ── Floor contact shadow ── */}
      <div className="pkg-doy-floor-shadow" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// ZIP-LOCK 2.5D FLAT POUCH MOCKUP
// Flat plastic hermetic bag — NO side walls, NO depth.
// Only a subtle tilt for perspective feel.
// ─────────────────────────────────────────────────────────
function ZipLock2D({ sides, rotation, idle }){
  const frontSide = sides.front || {};
  const color = frontSide.backgroundColor || '#B08A5B';
  const w = 210, h = 280;

  // Very subtle tilt — flat bag should barely rotate
  const tiltY = Math.max(-10, Math.min(10, rotation.y * 0.12));
  const tiltX = Math.max(-5, Math.min(5, rotation.x * 0.08));

  const wrapStyle = {
    width: w, height: h,
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate3d(-50%, -50%, 0) perspective(900px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
    transition: 'transform .35s cubic-bezier(.4,.1,.2,1)',
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
  };

  return (
    <div className={`pkg-zip-mockup ${idle ? 'pkg-zip-idle' : ''}`} style={wrapStyle}>
      {/* ── Main flat pouch body ── */}
      <div className="pkg-zip-body">
        {/* Plastic material highlights */}
        <div className="pkg-zip-plastic" />
        {/* Left edge seam */}
        <div className="pkg-zip-seam left" />
        {/* Right edge seam */}
        <div className="pkg-zip-seam right" />
        {/* Top flap above zipper */}
        <div className="pkg-zip-top-flap" />
        {/* Zip-lock closure strip */}
        <div className="pkg-zip-closure" />
        {/* Colored closure line */}
        <div className="pkg-zip-closure-line" />
        {/* Bottom edge */}
        <div className="pkg-zip-bottom-edge" />
        {/* Central branding area */}
        <div className="pkg-zip-art-area">
          <PkgArt artwork={frontSide} />
        </div>
      </div>
      {/* ── Floor shadow ── */}
      <div className="pkg-zip-floor-shadow" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// COURIER BAG 2.5D FLAT POLY MAILER MOCKUP
// Flat rectangular mailing envelope — NO side walls.
// Fold-over adhesive flap at top. Welded side seams.
// ─────────────────────────────────────────────────────────
function CourierBag2D({ sides, rotation, idle }){
  const frontSide = sides.front || {};
  const color = frontSide.backgroundColor || '#B08A5B';
  const w = 260, h = 220;

  // Subtle tilt — flat mailer should barely rotate
  const tiltY = Math.max(-10, Math.min(10, rotation.y * 0.12));
  const tiltX = Math.max(-5, Math.min(5, rotation.x * 0.08));

  const wrapStyle = {
    width: w, height: h,
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate3d(-50%, -50%, 0) perspective(900px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
    transition: 'transform .35s cubic-bezier(.4,.1,.2,1)',
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
  };

  return (
    <div className={`pkg-courier-mockup ${idle ? 'pkg-courier-idle' : ''}`} style={wrapStyle}>
      {/* ── Fold-over flap (behind body, visible at top) ── */}
      <div className="pkg-courier-flap-back" />
      {/* ── Main flat mailer body ── */}
      <div className="pkg-courier-body">
        {/* Plastic material highlights */}
        <div className="pkg-courier-plastic" />
        {/* Left welded seam */}
        <div className="pkg-courier-weld left" />
        {/* Right welded seam */}
        <div className="pkg-courier-weld right" />
        {/* Bottom welded seam */}
        <div className="pkg-courier-weld-bottom" />
        {/* Fold-over flap (front, folds down) */}
        <div className="pkg-courier-flap-front">
          {/* Adhesive strip */}
          <div className="pkg-courier-adhesive" />
          {/* Peel strip text */}
          <div className="pkg-courier-peel-text" />
          {/* Flap fold line */}
          <div className="pkg-courier-fold-line" />
        </div>
        {/* Central branding area */}
        <div className="pkg-courier-art-area">
          <PkgArt artwork={frontSide} />
        </div>
      </div>
      {/* ── Floor shadow ── */}
      <div className="pkg-courier-floor-shadow" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// FLAT-BOTTOM BAG · SINGLE-BODY 2.5D MOCKUP
// One coherent pouch silhouette. Every structural cue —
// side fold shadows, top welded seal, zipper, tear notches,
// the standing flat-bottom fold — is rendered as an overlay
// INSIDE the same .pkg-fb-body element. Nothing is drawn
// outside the body. No detached side panel. No detached
// base slab. Rotation is gentle 2.5D tilt only.
// ─────────────────────────────────────────────────────────
function FlatBottomBag2D({ sides, rotation, idle }){
  const frontSide = sides.front || {};
  const color = frontSide.backgroundColor || '#B08A5B';
  const W = 200, H = 290;

  // Subtle tilt — the pouch must read as one soft body, so
  // we never rotate enough to break the silhouette.
  const tiltY = Math.max(-10, Math.min(10, rotation.y * 0.12));
  const tiltX = Math.max(-5,  Math.min(5,  rotation.x * 0.08));

  const wrapStyle = {
    width: W, height: H,
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate3d(-50%, -50%, 0) perspective(900px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
    transition: 'transform .35s cubic-bezier(.4,.1,.2,1)',
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
  };

  return (
    <div className={`pkg-fb-mockup ${idle ? 'pkg-fb-idle' : ''}`} style={wrapStyle}>
      <div className="pkg-fb-body">
        {/* Kraft material highlight + micro-fiber texture */}
        <div className="pkg-fb-mat" />
        {/* Integrated left side fold shadow (NOT a side panel) */}
        <div className="pkg-fb-fold left" />
        {/* Integrated right side fold shadow */}
        <div className="pkg-fb-fold right" />
        {/* Integrated bottom fold + standing base shadow (NOT a separate plank) */}
        <div className="pkg-fb-base-shadow" />
        {/* Top sealed band */}
        <div className="pkg-fb-seal" />
        {/* Zipper line directly under the seal */}
        <div className="pkg-fb-zipper" />
        {/* Tear notches */}
        <div className="pkg-fb-notch left" />
        <div className="pkg-fb-notch right" />
        {/* Front branding — sits above the bottom fold and below the seal */}
        <div className="pkg-fb-art-area">
          <PkgArt artwork={frontSide} />
        </div>
      </div>
    </div>
  );
}

function BagFaceInner({ variant, artwork, faceId }){
  const v = variant;
  return (
    <>
      {/* zip-lock now has its own dedicated component — BagFaceInner no longer handles it */}
      {/* flat-bottom-bag now has its own dedicated component */}
      {v === 'paper-bag-with-handles' && (
        <>
          <div className="pkg-paper-top-fold" />
          <div className="pkg-paper-crease left" />
          <div className="pkg-paper-crease right" />
          <div className="pkg-paper-handle left" />
          <div className="pkg-paper-handle right" />
        </>
      )}
      {/* courier-bag now has its own dedicated component */}
      <PkgArt artwork={artwork} side={faceId === 'left' || faceId === 'right' ? 'left' : undefined} />
    </>
  );
}

function BagSideGusset({ variant }){
  // тонкая боковина — гассет — с продольной складкой по центру
  return (
    <div style={{
      position:'absolute', inset:0,
      background:
        'linear-gradient(90deg, rgba(255,255,255,.18) 0%, rgba(0,0,0,.16) 48%, rgba(0,0,0,.22) 52%, rgba(255,255,255,.10) 100%)',
      mixBlendMode:'multiply',
      pointerEvents:'none',
    }}/>
  );
}

// (DoyPackSideGusset removed — doy-pack now uses 2.5D mockup, no separate side faces)

// ─────────────────────────────────────────────────────────
// CUP
// ─────────────────────────────────────────────────────────
function Cup3D({ sides, activeSide, rotation, idle, variant }){
  const artwork = sides[activeSide] || sides.front;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const w = 230, h = 270;
  const style = {
    width: w, height: h,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: artwork.backgroundColor,
    ['--pkg-art-color']: pktContrast(artwork.backgroundColor),
  };
  const v = variant || 'single-wall';
  return (
    <div className={`pkg-cup-wrap pkg-3d pkg-cup-${v} ${idle?'idle':''}`} style={style}>
      <div className="pkg-cup-body">
        <PkgArt artwork={artwork} />
        {v === 'ripple-cup' && <div className="pkg-cup-ripple-sleeve" />}
      </div>
      <div className="pkg-cup-rim" />
      <div className="pkg-cup-base" />
      {v === 'cold-cup' && (
        <>
          <div className="pkg-cup-cold-straw" />
          <div className="pkg-cup-cold-dome" />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STICKER
// ─────────────────────────────────────────────────────────
function stickerRadius(variant){
  if (variant === 'square')       return '14px';
  if (variant === 'rectangle')    return '12px';
  if (variant === 'oval')         return '50%';
  if (variant === 'custom-shape') return '38% 62% 46% 54% / 45% 40% 60% 55%';
  return '50%';
}
function stickerDims(variant){
  if (variant === 'rectangle') return { width: 280, height: 180 };
  if (variant === 'oval')      return { width: 270, height: 190 };
  return { width: 240, height: 240 };
}
function Sticker3D({ sides, rotation, idle, variant }){
  const artwork = sides.front;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const radius = stickerRadius(variant);
  const dims = stickerDims(variant);
  const style = {
    ...dims, transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: artwork.backgroundColor,
    ['--pkg-art-color']: pktContrast(artwork.backgroundColor),
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

// ─────────────────────────────────────────────────────────
// UNFOLD (плоская развёртка) — без изменений по структуре
// ─────────────────────────────────────────────────────────
const UNFOLD_LABELS = {
  front: 'Лицо', back: 'Задняя сторона',
  left: 'Левый бок', right: 'Правый бок',
  top: 'Верх', bottom: 'Низ',
};
function Unfold({ type, variant, sides, size }){
  const panel = (sideId, w, h, key, extra = {}) => {
    const artwork = sides[sideId];
    const visible = artwork?.visible !== false;
    const style = visible
      ? sideStyle(artwork, { width:w, height:h, ...extra })
      : { width:w, height:h, ...extra };
    return (
      <div key={key} className={`panel ${visible ? '' : 'muted'}`} style={style}>
        <span className="panel-label">{UNFOLD_LABELS[sideId]}</span>
        {visible && <PkgArt artwork={artwork} side={sideId === 'left' || sideId === 'right' ? 'left' : undefined} />}
      </div>
    );
  };
  const empty = (w,h,key) => <div key={key} className="panel empty" style={{width:w,height:h}}/>;
  if (type === 'box'){
    const { w, h, d } = getBoxGeometry(variant, size);
    const W = Math.round(w*0.55), H = Math.round(h*0.55), D = Math.round(d*0.55);
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{ gridTemplateColumns:`${D}px ${W}px ${D}px ${W}px`, gridTemplateRows:`${D}px ${H}px ${D}px` }}>
          {empty(D,D,'a1')}{panel('top', W, D, 'a2')}{empty(D,D,'a3')}{empty(W,D,'a4')}
          {panel('left', D, H, 'b1')}{panel('front', W, H, 'b2')}{panel('right', D, H, 'b3')}{panel('back', W, H, 'b4')}
          {empty(D,D,'c1')}{panel('bottom', W, D, 'c2')}{empty(D,D,'c3')}{empty(W,D,'c4')}
        </div>
      </div>
    );
  }
  if (type === 'bag'){
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{ gridTemplateColumns:'40px 180px 40px 180px', gridTemplateRows:'230px' }}>
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
        <div className="pkg-unfold" style={{ gridTemplateColumns:'210px 210px', gridTemplateRows:'200px' }}>
          {panel('front', 210, 200, 'front', { clipPath:'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)' })}
          {panel('back', 210, 200, 'back', { clipPath:'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)' })}
        </div>
      </div>
    );
  }
  const dims = stickerDims(variant);
  const flatDims = variant === 'rectangle'
    ? { width: 260, height: 170 }
    : variant === 'oval' ? { width: 250, height: 180 } : { width: 220, height: 220 };
  return (
    <div className="pkg-unfold-wrap">
      <div className="pkg-unfold" style={{ gridTemplateColumns:`${flatDims.width}px`, gridTemplateRows:`${flatDims.height}px` }}>
        {panel('front', flatDims.width, flatDims.height, 'front', {
          borderRadius: stickerRadius(variant),
          width: Math.min(dims.width, flatDims.width),
          height: Math.min(dims.height, flatDims.height),
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PackagingPreview — главный экспорт
// API совместимо со старым файлом.
// ─────────────────────────────────────────────────────────
export function PackagingPreview({
  type='box', variant='', color='#B08A5B', logo=null, text='',
  sides=null, activeSide='front', view='3d',
  interactive=true, idle=true, size
}){
  const [rot, setRot] = React.useState({ x: -14, y: -24 });
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
        <style>{STYLE_BLOCK}</style>
        <Unfold type={type} variant={variant} sides={allSides} size={size} />
      </div>
    );
  }

  const props = { sides: allSides, activeSide, rotation: rot, idle: idle && !userInteracted.current, variant };
  let Body;
  if (type === 'box')      Body = <Box3D {...props} size={size} />;
  else if (type === 'bag') Body = <Bag3D {...props} />;
  else if (type === 'cup') Body = <Cup3D {...props} />;
  else                     Body = <Sticker3D {...props} />;

  return (
    <div
      className={`pkg-stage ${dragging?'dragging':''} ${type==='bag'?'tall':''}`}
      onPointerDown={onDown}
      style={{ cursor: interactive ? (dragging?'grabbing':'grab') : 'default' }}
    >
      <style>{STYLE_BLOCK}</style>
      <div className="pkg-floor" />
      {Body}
    </div>
  );
}

export default PackagingPreview;
