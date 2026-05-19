/* global React */
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

function PkgArt({ logo, text, side }) {
  return (
    <div className={`pkg-art ${side||''}`}>
      <div className={`pkg-logo ${logo ? 'img' : ''}`}>
        {logo ? <img src={logo} alt="" /> : 'ПАКЕТЕАМ'}
      </div>
      {text && <div className="pkg-tag">{text}</div>}
    </div>
  );
}

// ── BOX 3D ─────────────────────────────────────────────────
function Box3D({ color, logo, text, rotation, idle, size }){
  const w = size?.w || 240, h = size?.h || 200, d = size?.d || 160;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const style = {
    width: w, height: h,
    transform: tx,
    position: 'absolute', left: '50%', top: '50%',
    ['--pkg-color']: color,
    ['--pkg-art-color']: pktContrast(color),
  };
  const half = { x:w/2, y:h/2, z:d/2 };
  return (
    <div className={`pkg-3d pkg-box ${idle?'idle':''}`} style={style}>
      <div className="face" style={{transform:`translateZ(${half.z}px)`}}>
        <PkgArt logo={logo} text={text} />
      </div>
      <div className="face" style={{transform:`rotateY(180deg) translateZ(${half.z}px)`, backgroundColor: 'rgba(0,0,0,.06)', backgroundBlendMode: 'multiply'}}/>
      <div className="face" style={{width:d, left:(w-d)/2, transform:`rotateY(90deg) translateZ(${w/2}px)`, backgroundColor: 'rgba(0,0,0,.12)', backgroundBlendMode: 'multiply'}}/>
      <div className="face" style={{width:d, left:(w-d)/2, transform:`rotateY(-90deg) translateZ(${w/2}px)`, backgroundColor: 'rgba(0,0,0,.12)', backgroundBlendMode: 'multiply'}}/>
      <div className="face" style={{height:d, top:(h-d)/2, transform:`rotateX(90deg) translateZ(${h/2}px)`, backgroundColor: 'rgba(255,255,255,.18)', backgroundBlendMode: 'screen'}}/>
      <div className="face" style={{height:d, top:(h-d)/2, transform:`rotateX(-90deg) translateZ(${h/2}px)`, backgroundColor: 'rgba(0,0,0,.18)', backgroundBlendMode: 'multiply'}}/>
    </div>
  );
}

// ── BAG 3D ─────────────────────────────────────────────────
function Bag3D({ color, logo, text, rotation, idle }){
  const w = 200, h = 260, d = 60;
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const style = {
    width: w, height: h,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: color, ['--pkg-art-color']: pktContrast(color),
  };
  return (
    <div className={`pkg-3d pkg-bag ${idle?'idle':''}`} style={style}>
      <div className="face" style={{transform:`translateZ(${d/2}px)`}}>
        <div className="seal" />
        <PkgArt logo={logo} text={text} />
      </div>
      <div className="face" style={{transform:`rotateY(180deg) translateZ(${d/2}px)`}}>
        <div className="seal" />
      </div>
      <div className="face" style={{width:d, left:(w-d)/2, transform:`rotateY(90deg) translateZ(${w/2}px)`}}>
        <div className="seal" />
      </div>
      <div className="face" style={{width:d, left:(w-d)/2, transform:`rotateY(-90deg) translateZ(${w/2}px)`}}>
        <div className="seal" />
      </div>
    </div>
  );
}

// ── CUP 3D ─────────────────────────────────────────────────
function Cup3D({ color, logo, text, rotation, idle }){
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const style = {
    width: 220, height: 250,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: color, ['--pkg-art-color']: pktContrast(color),
  };
  return (
    <div className={`pkg-3d pkg-cup-wrap ${idle?'idle':''}`} style={style}>
      <div className="pkg-cup">
        <div className="pkg-cup-rim" />
        <PkgArt logo={logo} text={text} />
        <div className="pkg-cup-bottom" />
      </div>
    </div>
  );
}

// ── STICKER 3D ─────────────────────────────────────────────
function Sticker3D({ color, logo, text, rotation, idle, shape }){
  const tx = `translate3d(-50%, -50%, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  const radius = shape === 'square' ? '14px' : shape === 'rounded' ? '22%' : '50%';
  const style = {
    width: 240, height: 240,
    transform: tx,
    position:'absolute', left:'50%', top:'50%',
    ['--pkg-color']: color, ['--pkg-art-color']: pktContrast(color),
    ['--pkg-radius']: radius,
  };
  return (
    <div className={`pkg-3d pkg-sticker-wrap ${idle?'idle':''}`} style={style}>
      <div className="pkg-sticker">
        <PkgArt logo={logo} text={text} />
      </div>
    </div>
  );
}

// ── UNFOLD (плоская развёртка) ─────────────────────────────
function Unfold({ type, color, logo, text, size }){
  const artColor = pktContrast(color);
  const cssVars = { ['--pkg-color']: color, ['--pkg-art-color']: artColor };
  const panel = (label, w, h, key, showArt) => (
    <div key={key} className="panel" style={{width:w, height:h}}>
      <span className="panel-label">{label}</span>
      {showArt && <PkgArt logo={logo} text={text} />}
    </div>
  );
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
          ...cssVars
        }}>
          {empty(D,D,'a1')} {panel('верх', W, D, 'a2')} {empty(D,D,'a3')} {empty(W,D,'a4')}
          {panel('левый', D, H, 'b1')} {panel('лицо', W, H, 'b2', true)} {panel('правый', D, H, 'b3')} {panel('задний', W, H, 'b4', true)}
          {empty(D,D,'c1')} {panel('низ', W, D, 'c2')} {empty(D,D,'c3')} {empty(W,D,'c4')}
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
          ...cssVars
        }}>
          {panel('бок', 40, 230, 'a')} {panel('лицо', 180, 230, 'b', true)} {panel('бок', 40, 230, 'c')} {panel('зад', 180, 230, 'd', true)}
        </div>
      </div>
    );
  }
  if (type === 'cup'){
    return (
      <div className="pkg-unfold-wrap">
        <div className="pkg-unfold" style={{
          gridTemplateColumns: `420px`,
          gridTemplateRows: `200px`,
          ...cssVars
        }}>
          <div className="panel" style={{
            width: 420, height: 200,
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)'
          }}>
            <span className="panel-label">развёртка стакана</span>
            <PkgArt logo={logo} text={text} />
          </div>
        </div>
      </div>
    );
  }
  // sticker
  return (
    <div className="pkg-unfold-wrap">
      <div className="pkg-unfold" style={{
        gridTemplateColumns: `220px`,
        gridTemplateRows: `220px`,
        ...cssVars
      }}>
        <div className="panel" style={{ width: 220, height: 220, borderRadius: '50%' }}>
          <span className="panel-label">наклейка</span>
          <PkgArt logo={logo} text={text} />
        </div>
      </div>
    </div>
  );
}

// ── PackagingPreview (главный экспорт) ─────────────────────
function PackagingPreview({ type='box', color='#B08A5B', logo=null, text='', view='3d', interactive=true, idle=true, size }){
  const [rot, setRot] = React.useState({ x: -12, y: -22 });
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef(null);
  const userInteracted = React.useRef(false);

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
        <Unfold type={type} color={color} logo={logo} text={text} size={size}/>
      </div>
    );
  }

  const props = { color, logo, text, rotation: rot, idle: idle && !userInteracted.current };
  let Body;
  if (type === 'box') Body = <Box3D {...props} size={size}/>;
  else if (type === 'bag') Body = <Bag3D {...props}/>;
  else if (type === 'cup') Body = <Cup3D {...props}/>;
  else Body = <Sticker3D {...props} shape={size?.shape || 'round'}/>;

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

Object.assign(window, { PackagingPreview });
