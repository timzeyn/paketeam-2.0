// ─────────────────────────────────────────────────────────
// Demo constructor for ПАКЕТЕАМ 3D bag preview.
// Exercises every editing feature on the rebuilt bag models:
//   · 5 bag types (doy-pack, zip-lock, flat-bottom, paper, courier)
//   · view: 3D / unfolded dieline
//   · per-side: color, image upload, text, alignment, scale, visibility
//   · per-bag: material switch (kraft / matte / glossy / colored / clear)
// ─────────────────────────────────────────────────────────

import React from 'react';
import { PackagingPreview } from './packaging3d.jsx';

const { useState, useMemo, useCallback } = React;

// ── Bag catalogue (matches the variant ids the constructor accepts) ──
const BAG_TYPES = [
  { id: 'doy-pack',               label: 'Дой-пак',     ru: 'Стоячий пакет', ico: '⌬' },
  { id: 'zip-lock-bag',           label: 'Зип-лок',     ru: 'С зиппером',     ico: '═' },
  { id: 'flat-bottom-bag',        label: 'Плоское дно', ru: 'Кофейный пакет', ico: '▥' },
  { id: 'paper-bag-with-handles', label: 'Бумажный',    ru: 'С ручками',      ico: '◰' },
  { id: 'courier-bag',            label: 'Курьерский',  ru: 'Поли-мейлер',    ico: '✉' },
];

// Sides exposed per bag variant (front/back/left/right). Paper bag and
// flat-bottom additionally allow editing the bottom flap.
const SIDES_FOR = {
  'doy-pack':              ['front', 'back', 'bottom'],
  'zip-lock-bag':          ['front', 'back'],
  'flat-bottom-bag':       ['front', 'back', 'left', 'right', 'bottom'],
  'paper-bag-with-handles':['front', 'back', 'left', 'right', 'bottom'],
  'courier-bag':           ['front', 'back'],
};

const SIDE_LABEL = {
  front: 'Лицо', back: 'Зад', left: 'Лев. бок', right: 'Прав. бок',
  top: 'Верх', bottom: 'Низ',
};

// Curated palette — natural packaging colors
const SWATCHES = [
  '#B08A5B',  // kraft
  '#5A4A36',  // espresso
  '#E8DBC3',  // cream
  '#FFFFFF',  // white
  '#1F2937',  // graphite
  '#7C3D2E',  // terracotta
  '#3F6C5C',  // forest
  '#2D4F7B',  // navy
  '#D2563F',  // poppy
  '#C49A47',  // mustard
  '#8E7CC3',  // lavender
  '#A6B97C',  // sage
];

const MATERIALS = [
  { id: 'kraft',   label: 'Крафт'      },
  { id: 'matte',   label: 'Матовый'    },
  { id: 'glossy',  label: 'Глянцевый'  },
  { id: 'colored', label: 'Цветной'    },
  { id: 'clear',   label: 'Прозрачный' },
];

const ALIGNMENTS = [
  { id: 'left',   ico: 'L' },
  { id: 'center', ico: 'C' },
  { id: 'right',  ico: 'R' },
];

// Default per-side state
function makeDefaultSides(type){
  const sides = {};
  for (const s of (SIDES_FOR[type] || ['front','back','left','right'])){
    sides[s] = {
      backgroundColor: '#B08A5B',
      logo: null,
      text: s === 'front' ? 'ARTISAN' : '',
      alignment: 'center',
      scale: 1,
      visible: true,
    };
  }
  return sides;
}

// ── Icon glyphs for the type sidebar ─────────────────────
function TypeIcon({ id }){
  // Small SVG silhouettes per bag type
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'doy-pack') return (
    <svg {...common}>
      <path d="M6 4 H18 L17 7 V19 Q17 21 15 21 H9 Q7 21 7 19 V7 Z" />
      <path d="M6 4 L18 4" strokeWidth="2" />
    </svg>
  );
  if (id === 'zip-lock-bag') return (
    <svg {...common}>
      <rect x="5" y="5" width="14" height="15" rx="1" />
      <path d="M5 8 L19 8" />
      <path d="M5 9 L19 9" strokeDasharray="1 1" />
    </svg>
  );
  if (id === 'flat-bottom-bag') return (
    <svg {...common}>
      <path d="M6 5 H18 V18 Q18 20 16 20 H8 Q6 20 6 18 Z" />
      <path d="M6 5 L18 5" strokeWidth="2" />
      <path d="M6 18 L18 18" />
    </svg>
  );
  if (id === 'paper-bag-with-handles') return (
    <svg {...common}>
      <path d="M9 4 Q9 2 12 2 Q15 2 15 4" />
      <rect x="5" y="6" width="14" height="15" rx="1" />
      <path d="M5 9 L19 9" />
    </svg>
  );
  if (id === 'courier-bag') return (
    <svg {...common}>
      <rect x="3" y="7" width="18" height="12" rx="1" />
      <path d="M3 8 L12 13 L21 8" />
    </svg>
  );
  return null;
}

// ── Component: side selector ─────────────────────────────
function SideSelector({ available, active, onPick, sides, onToggle }){
  return (
    <div>
      <div className="side-row">
        {available.map(s => (
          <button key={s}
            className={`side-pill ${active === s ? 'active' : ''}`}
            onClick={() => onPick(s)}>
            {SIDE_LABEL[s]}
          </button>
        ))}
      </div>
      <div className="toggle-row">
        <span className="lbl">Сторона видна</span>
        <div
          className={`toggle ${sides[active]?.visible !== false ? 'on' : ''}`}
          onClick={() => onToggle(active)}
        />
      </div>
    </div>
  );
}

// ── Component: color picker (swatches + custom) ──────────
function ColorPicker({ value, onChange }){
  return (
    <div>
      <div className="swatch-row">
        {SWATCHES.map(c => (
          <div key={c}
            className={`swatch ${value?.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
            style={{ background: c }}
            onClick={() => onChange(c)} />
        ))}
      </div>
      <div className="color-row">
        <input type="color" value={value || '#B08A5B'} onChange={e => onChange(e.target.value)} />
        <input className="hex" value={value || '#B08A5B'} onChange={e => onChange(e.target.value)} />
      </div>
    </div>
  );
}

// ── Component: material picker ───────────────────────────
function MaterialPicker({ value, onChange }){
  return (
    <div className="material-row">
      {MATERIALS.map(m => (
        <button key={m.id}
          className={`mat-pill ${value === m.id ? 'active' : ''}`}
          onClick={() => onChange(m.id)}>
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ── Component: image upload ──────────────────────────────
function ImageUpload({ value, onChange }){
  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label className="file-drop">
        <div className="file-drop-preview">
          {value ? <img src={value} alt="" /> : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#a89a7e" strokeWidth="1.5">
              <rect x="4" y="6" width="16" height="14" rx="1.5" />
              <circle cx="9" cy="11" r="1.5" />
              <path d="M4 17 L9 13 L13 16 L17 12 L20 14" />
            </svg>
          )}
        </div>
        <div className="file-drop-text">
          <strong>{value ? 'Заменить изображение' : 'Загрузить изображение'}</strong>
          PNG, JPG, SVG · до 5 МБ
        </div>
        <input type="file" accept="image/*" onChange={e => onFile(e.target.files?.[0])} />
      </label>
      {value && (
        <div style={{ marginTop: 6, textAlign: 'right' }}>
          <button className="remove-btn" onClick={() => onChange(null)}>Удалить</button>
        </div>
      )}
    </div>
  );
}

// ── Main constructor ─────────────────────────────────────
function Constructor(){
  const [type, setType]       = useState('doy-pack');
  const [view, setView]       = useState('3d');
  const [material, setMat]    = useState('kraft');
  const [activeSide, setSide] = useState('front');
  const [sides, setSides]     = useState(() => makeDefaultSides('doy-pack'));

  const available = SIDES_FOR[type];

  // When type changes, rebuild sides for the new variant — preserving any
  // already-edited surfaces that the new type also uses.
  const switchType = useCallback((nextType) => {
    setType(nextType);
    const defs = makeDefaultSides(nextType);
    const carry = {};
    for (const s of SIDES_FOR[nextType]){
      carry[s] = sides[s] ? { ...defs[s], ...sides[s] } : defs[s];
    }
    setSides(carry);
    if (!SIDES_FOR[nextType].includes(activeSide)) setSide('front');
  }, [sides, activeSide]);

  // Update a single property of the active side
  const updateSide = useCallback((patch) => {
    setSides(prev => ({ ...prev, [activeSide]: { ...prev[activeSide], ...patch } }));
  }, [activeSide]);

  const cur = sides[activeSide] || {};
  const typeInfo = BAG_TYPES.find(t => t.id === type);

  // Apply the per-bag material as a wrapper class so the stage carries it
  // through to faces (handled via the material-modifier CSS rule below).
  const materialClass = `mat-${material}`;

  return (
    <>
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">П</div>
          <div>
            <div className="brand-name">ПАКЕТЕАМ</div>
          </div>
          <div className="brand-tag">3D-конструктор · BAG</div>
        </div>
        <div className="view-toggle">
          <button className={view === '3d' ? 'active' : ''} onClick={() => setView('3d')}>3D</button>
          <button className={view === 'flat' ? 'active' : ''} onClick={() => setView('flat')}>Развёртка</button>
        </div>
      </div>

      <div className="layout">
        {/* Type sidebar */}
        <aside className="sidebar">
          <h3>Тип упаковки</h3>
          <div className="type-list">
            {BAG_TYPES.map(t => (
              <button key={t.id}
                className={`type-btn ${type === t.id ? 'active' : ''}`}
                onClick={() => switchType(t.id)}>
                <span className="ico"><TypeIcon id={t.id} /></span>
                <span>
                  <div>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>{t.ru}</div>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Stage */}
        <main className="stage">
          <div className="stage-header">
            <div>
              <h1 className="stage-title">{typeInfo?.label}</h1>
              <div className="stage-subtitle">{typeInfo?.ru} · {material}</div>
            </div>
            <div className="stage-hint">
              {view === '3d' ? 'Тяните мышью чтобы вращать' : 'Развёртка / дайнлайн'}
            </div>
          </div>
          <div className="stage-canvas">
            <div className={`stage-canvas-inner ${materialClass}`}>
              <PackagingPreview
                type="bag"
                variant={type}
                view={view}
                sides={sides}
                activeSide={activeSide}
                color={cur.backgroundColor}
                logo={cur.logo}
                text={cur.text}
                interactive={true}
                idle={true}
              />
            </div>
          </div>
        </main>

        {/* Controls */}
        <aside className="controls">
          <div className="ctrl-section">
            <span className="ctrl-label">Сторона</span>
            <SideSelector
              available={available}
              active={activeSide}
              onPick={setSide}
              sides={sides}
              onToggle={(s) => setSides(prev => ({ ...prev, [s]: { ...prev[s], visible: !(prev[s]?.visible ?? true) } }))} />
          </div>

          <div className="ctrl-section">
            <span className="ctrl-label">Цвет стороны</span>
            <ColorPicker
              value={cur.backgroundColor}
              onChange={(c) => updateSide({ backgroundColor: c })} />
          </div>

          <div className="ctrl-section">
            <span className="ctrl-label">Материал</span>
            <MaterialPicker value={material} onChange={setMat} />
          </div>

          <div className="ctrl-section">
            <span className="ctrl-label">Изображение</span>
            <ImageUpload value={cur.logo} onChange={(l) => updateSide({ logo: l })} />
          </div>

          <div className="ctrl-section">
            <span className="ctrl-label">Текст / надпись</span>
            <input className="text-input"
              type="text"
              placeholder="Введите текст…"
              value={cur.text || ''}
              onChange={(e) => updateSide({ text: e.target.value })} />
            <div style={{ height: 10 }} />
            <div className="alignment-row">
              {ALIGNMENTS.map(a => (
                <button key={a.id}
                  className={`alignment-btn ${cur.alignment === a.id ? 'active' : ''}`}
                  onClick={() => updateSide({ alignment: a.id })}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {a.id === 'left' && <><path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h14"/></>}
                    {a.id === 'center' && <><path d="M4 7h16"/><path d="M7 12h10"/><path d="M5 17h14"/></>}
                    {a.id === 'right' && <><path d="M4 7h16"/><path d="M10 12h10"/><path d="M6 17h14"/></>}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="ctrl-section">
            <span className="ctrl-label">Масштаб дизайна</span>
            <div className="scale-row">
              <input type="range" min="0.5" max="1.6" step="0.05"
                value={cur.scale || 1}
                onChange={(e) => updateSide({ scale: parseFloat(e.target.value) })} />
              <span className="val">{(cur.scale || 1).toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Constructor />);
