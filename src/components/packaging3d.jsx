import React from 'react';
import { PKG_STYLE, PKG_STYLE_PART2 } from './packaging3d-styles.js';
import { Bag3D, BagUnfold } from './packaging3d-bags.jsx';

// ─────────────────────────────────────────────────────────
// ПАКЕТЕАМ 3D Packaging Preview
// Каждая категория — со своей собственной 3D-структурой.
// BAG-категория вынесена в отдельный модуль (packaging3d-bags.jsx),
// где каждая разновидность реализована честным preserve-3d-каркасом.
// ─────────────────────────────────────────────────────────

const STYLE_BLOCK = PKG_STYLE + PKG_STYLE_PART2;

// ── helpers (экспортируются для bag-модуля) ───────────────
export function pktContrast(hex){
  const h = String(hex || '').replace('#','');
  const x = h.length === 3 ? h.replace(/./g, c=>c+c) : h.padEnd(6,'0');
  const n = parseInt(x.slice(0,6), 16) || 0;
  const r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  return (r*299 + g*587 + b*114) > 145000 ? '#0F1626' : '#FFFFFF';
}
// смешать с белым/чёрным — для крышки и подноса оттенков
export function shade(hex, amount){
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

export const SIDE_IDS = ['front', 'back', 'left', 'right', 'top', 'bottom'];

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

export function PkgArt({ artwork, logo, text, side }){
  const data = artwork || { logo, text, visible: true };
  if (data.visible === false) return null;
  logo = data.logo;
  text = data.text;
  // Show the "ПАКЕТЕАМ" placeholder only when an explicit logo is missing
  // AND this is the primary (front) face. Side / back / gusset faces stay
  // clean unless the user puts something on them.
  const isFront = !side || side === 'front';
  const showPlaceholder = isFront && !logo && !text;
  if (!logo && !text && !showPlaceholder) return null;
  const alignment = data.alignment || 'center';
  const alignItems = alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center';
  return (
    <div
      className={`pkg-art ${side === 'left' || side === 'right' ? 'side' : ''}`}
      style={{ alignItems, textAlign: alignment, transform: `scale(${data.scale || 1})`, transformOrigin: 'center' }}
    >
      {(logo || showPlaceholder) && (
        <div className={`pkg-logo ${logo ? 'img' : ''}`}>
          {logo ? <img src={logo} alt="" /> : 'ПАКЕТЕАМ'}
        </div>
      )}
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
function boxFaceExtras(variant){
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

  if (variant === 'lid-bottom-box'){
    const baseH  = Math.round(h * 0.62);
    const lidH   = h - baseH;
    const overhang = 12;
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

    return (
      <div className={`pkg-3d pkg-box pkg-box-lid-bottom-box ${idle?'idle':''}`} style={style}>
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
        <div className="pkg-lidbottom" style={{ width:w, height:baseH, left:0, top:lidH }}>
          <Cuboid w={w} h={baseH} d={d} sides={baseSides}
            faceClass="lface"
            sideRender={renderArt(baseSides)}/>
        </div>
      </div>
    );
  }

  const extras = boxFaceExtras(variant);
  const renderArt = (id) => {
    const s = sides[id];
    return <>{s?.visible !== false && <PkgArt artwork={s} side={id === 'left' || id === 'right' ? 'left' : undefined} />}</>;
  };

  return (
    <div className={`pkg-3d pkg-box pkg-box-${variant || 'mailer-box'} ${idle?'idle':''}`} style={style}>
      <Cuboid w={w} h={h} d={d} sides={sides}
        sideRender={renderArt}
        faceExtras={extras}/>

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

      {variant === 'mailer-box' && (
        <>
          <div className="pkg-mailer-tab"
               style={{ position:'absolute', transform:`translateZ(${d/2 + 0.6}px)` }} />
          <div className="pkg-mailer-slot"
               style={{ position:'absolute', transform:`translateZ(${d/2 + 0.8}px)` }} />
        </>
      )}

      {variant === 'sleeve-box' && (() => {
        const trayW = Math.round(w * 0.55);
        const trayH = h - 16;
        const trayD = d - 22;
        const trayLeft = Math.round(w * 0.65);
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
// BAG — delegated to packaging3d-bags.jsx (function imported as Bag3D)
// ─────────────────────────────────────────────────────────

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
// UNFOLD (плоская развёртка)
// Для bag-категории делегируем в BagUnfold (вариант-специфичные дайнлайны).
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
    return <BagUnfold variant={variant} sides={sides} />;
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
