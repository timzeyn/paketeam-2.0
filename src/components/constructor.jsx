import React from 'react';
import { PackagingPreview } from './packaging3d.jsx';
// ─────────────────────────────────────────────────────────
// Конструктор упаковки ПАКЕТЕАМ
// Структура:
//   Top:    шаги процесса
//   Left:   панель настроек (тип, размер, материал, цвет, лого, текст)
//   Center: 3D-превью / развёртка
//   Right:  калькулятор и параметры заказа
// ─────────────────────────────────────────────────────────

const CFG = {
  types: [
    { id:'box',     name:'Коробка',  sub:'самосборка, крафт-стенки',  basePrice: 38 },
    { id:'bag',     name:'Пакет',    sub:'дой-пак, зип, крафт',       basePrice: 18 },
    { id:'cup',     name:'Стакан',   sub:'для кофе, двойной',         basePrice: 12 },
    { id:'sticker', name:'Наклейка', sub:'круг, квадрат, фигурная',   basePrice:  3 },
  ],
  sizes: {
    box:     [
      { id:'s', name:'S', dims:'100×80×60 мм', mult: 0.7 },
      { id:'m', name:'M', dims:'180×140×90 мм', mult: 1.0 },
      { id:'l', name:'L', dims:'260×200×140 мм', mult: 1.5 },
    ],
    bag:     [
      { id:'s', name:'S', dims:'100×160 мм', mult: 0.7 },
      { id:'m', name:'M', dims:'140×220 мм', mult: 1.0 },
      { id:'l', name:'L', dims:'180×280 мм', mult: 1.4 },
    ],
    cup:     [
      { id:'s', name:'200 мл', dims:'80×95 мм', mult: 0.8 },
      { id:'m', name:'250 мл', dims:'90×110 мм', mult: 1.0 },
      { id:'l', name:'400 мл', dims:'100×130 мм', mult: 1.3 },
    ],
    sticker: [
      { id:'s', name:'S', dims:'⌀ 30 мм', mult: 0.6 },
      { id:'m', name:'M', dims:'⌀ 50 мм', mult: 1.0 },
      { id:'l', name:'L', dims:'⌀ 80 мм', mult: 1.4 },
    ],
  },
  materials: [
    { id:'craft', name:'Крафт ECO', sub:'переработанный картон',  multiplier: 1.0, color:'#B08A5B' },
    { id:'white', name:'Белый микрогофр',sub:'премиум-печать',     multiplier: 1.15, color:'#F8F4EC' },
    { id:'black', name:'Чёрный матовый',sub:'soft-touch покрытие', multiplier: 1.35, color:'#1A1F2E' },
    { id:'metal', name:'Металлизация', sub:'фольга, тиснение',     multiplier: 1.6, color:'#C0C5D0' },
  ],
  colors: [
    '#2563EB', '#0F1626', '#B08A5B', '#F2E9D8',
    '#15803D', '#DC2626', '#F59E0B', '#7C3AED',
    '#F8F4EC', '#0EA5E9'
  ],
  variants: {
    sticker: [
      { id:'round', name:'Круглая', multiplier: 1.00 },
      { id:'square', name:'Квадратная', multiplier: 1.00 },
      { id:'rectangle', name:'Прямоугольная', multiplier: 1.05 },
      { id:'oval', name:'Овальная', multiplier: 1.10 },
      { id:'custom-shape', name:'Фигурная', multiplier: 1.25 },
    ],
    box: [
      { id:'mailer-box', name:'Почтовая коробка', multiplier: 1.00 },
      { id:'tuck-top-box', name:'Самосборная', multiplier: 1.10 },
      { id:'sleeve-box', name:'Коробка-пенал', multiplier: 1.20 },
      { id:'window-box', name:'Коробка с окном', multiplier: 1.35 },
      { id:'lid-bottom-box', name:'Крышка-дно', multiplier: 1.30 },
    ],
    bag: [
      { id:'doy-pack', name:'Дой-пак', multiplier: 1.00 },
      { id:'zip-lock-bag', name:'Zip-lock', multiplier: 1.15 },
      { id:'flat-bottom-bag', name:'С плоским дном', multiplier: 1.20 },
      { id:'paper-bag-with-handles', name:'Бумажный с ручками', multiplier: 1.30 },
      { id:'courier-bag', name:'Курьерский пакет', multiplier: 1.10 },
    ],
    cup: [
      { id:'single-wall', name:'Однослойный', multiplier: 1.00 },
      { id:'double-wall', name:'Двухслойный', multiplier: 1.20 },
      { id:'ripple-cup', name:'Гофрированный', multiplier: 1.35 },
      { id:'cold-cup', name:'Холодный стакан', multiplier: 1.25 },
    ],
  },
  sideOptions: {
    sticker: [{ id:'front', label:'Лицо' }],
    cup: [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }],
    bag: [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }, { id:'left', label:'Левый бок' }, { id:'right', label:'Правый бок' }],
    box: [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }, { id:'left', label:'Левый бок' }, { id:'right', label:'Правый бок' }, { id:'top', label:'Верх' }, { id:'bottom', label:'Низ' }],
  },
  sideOptionsByVariant: {
    'zip-lock-bag': [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }],
    'courier-bag': [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }],
    'flat-bottom-bag': [{ id:'front', label:'Лицо' }, { id:'back', label:'Задняя сторона' }, { id:'left', label:'Левый бок' }, { id:'right', label:'Правый бок' }, { id:'bottom', label:'Низ' }],
  },
  qty: [50, 100, 200, 500, 1000, 2000, 5000],
  sides: ['Лицо', 'Зад', 'Бок Л', 'Бок П', 'Верх', 'Низ'],
};

const SIDE_IDS = ['front', 'back', 'left', 'right', 'top', 'bottom'];
function defaultVariantForType(type){ return CFG.variants[type]?.[0]?.id || ''; }
function sideOptionsForType(type, variant){ return CFG.sideOptionsByVariant[variant] || CFG.sideOptions[type] || CFG.sideOptions.box; }
function firstSideForType(type, variant){ return sideOptionsForType(type, variant)[0]?.id || 'front'; }
function createSideState(color, text = ''){ return { logo: null, text, backgroundColor: color, visible: true, alignment: 'center', scale: 1 }; }
function createSides(type, variant, color, text = 'малые тиражи', existing = {}){
  const visible = new Set(sideOptionsForType(type, variant).map(s=>s.id));
  return SIDE_IDS.reduce((acc, id)=>{
    acc[id] = { ...createSideState(color, id === 'front' ? text : ''), ...(existing[id] || {}) };
    if (acc[id].backgroundColor == null) acc[id].backgroundColor = color;
    acc[id].visible = visible.has(id);
    return acc;
  }, {});
}
function activeSide(state){ return state.sides?.[state.activeSide] || state.sides?.front || createSideState(state.color || '#B08A5B'); }
function variantConfig(type, variant){ return (CFG.variants[type] || []).find(v=>v.id===variant) || CFG.variants[type]?.[0] || { multiplier: 1 }; }
function variantName(type, variant){ return (CFG.variants[type] || []).find(v=>v.id===variant)?.name || variant; }
function sideLabel(type, variant, sideId){ return sideOptionsForType(type, variant).find(s=>s.id===sideId)?.label || sideId; }
function visibleSideIds(type, variant){ return sideOptionsForType(type, variant).map(s=>s.id); }
function sideHasContent(side){ return !!(side?.visible && (side.logo || String(side.text || '').trim())); }
function hasAnySideContent(state){ return visibleSideIds(state.type, state.variant).some(id=>sideHasContent(state.sides?.[id])); }
function readinessInfo(state){
  const active = activeSide(state);
  const checks = [
    { id:'type', label:'Тип упаковки выбран', done: !!state.type },
    { id:'variant', label:'Вид / форма выбраны', done: !!state.variant },
    { id:'material', label:'Материал выбран', done: !!state.material },
    { id:'content', label:'Есть логотип или текст', done: hasAnySideContent(state) },
    { id:'qty', label:'Тираж выбран', done: !!state.qty },
    { id:'activeSide', label:'Активная сторона отображается', done: active.visible !== false },
  ];
  const completed = checks.filter(c=>c.done).length;
  const rawPercent = Math.round((completed / checks.length) * 100);
  const hasContent = checks.find(c=>c.id === 'content')?.done;
  return { checks, percent: hasContent ? rawPercent : Math.min(rawPercent, 75), hasContent };
}

// ── Top stepper ────────────────────────────────────────────
function Stepper({ step, onStep, full }){
  const STEPS = [
    { n:1, label:'Тип' },
    { n:2, label:'Вид / форма' },
    { n:3, label:'Размер' },
    { n:4, label:'Материал' },
    { n:5, label:'Дизайн сторон' },
    { n:6, label:'Тираж' },
    { n:7, label:'Заявка' },
  ];
  return (
    <div className="cst-stepper">
      <div className="cst-stepper-inner">
        {STEPS.map((s, i)=> (
          <React.Fragment key={s.n}>
            <button className={`cst-step ${step===s.n?'active':''} ${step>s.n?'done':''}`}
                    onClick={()=>onStep(s.n)}>
              <span className="cst-step-num mono">{s.n>9?s.n:`0${s.n}`}</span>
              <span className="cst-step-lbl">{s.label}</span>
              {step>s.n && (
                <svg className="cst-step-check" viewBox="0 0 16 16" width="14" height="14">
                  <path d="M3 8.5 6.5 12 13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {i<STEPS.length-1 && <div className={`cst-step-line ${step>s.n?'done':''}`}/>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Left panel: settings ───────────────────────────────────
function SettingsPanel({ state, set, setSide, tweaks }){
  const detail = tweaks.constructorDetail || 'full';
  const side = activeSide(state);
  const sideOptions = sideOptionsForType(state.type, state.variant);
  const variants = CFG.variants[state.type] || [];
  const SECTIONS = [
    { id:'type', label:'01. Тип упаковки' },
    { id:'size', label:'02. Размер' },
    { id:'material', label:'03. Материал' },
    { id:'color', label:'04. Цвет' },
    { id:'logo', label:'05. Логотип' },
    { id:'text', label:'06. Текст' },
    { id:'side', label:'07. Сторона' },
  ];
  const sections = [
    { id:'type', label:'01. Тип упаковки' },
    { id:'variant', label:'02. Вид / форма' },
    { id:'size', label:'03. Размер' },
    { id:'material', label:'04. Материал' },
    { id:'side', label:'05. Сторона редактирования' },
    { id:'color', label:'06. Цвет стороны' },
    { id:'logo', label:'07. Логотип стороны' },
    { id:'text', label:'08. Текст стороны' },
    { id:'artwork', label:'09. Положение макета' },
    { id:'visibility', label:'10. Видимость стороны' },
  ];
  const onLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSide(state.activeSide, { logo: ev.target.result });
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  const sizes = CFG.sizes[state.type];
  const visibleSections = detail === 'compact'
    ? sections.filter(s=>['type','variant','size','material','side','color'].includes(s.id))
    : sections;

  return (
    <aside className="cst-left">
      <div className="cst-left-head">
        <span className="mono upper" style={{color:'var(--pkt-muted)'}}>конфигурация</span>
        <h3 className="pkt-h4" style={{margin:'4px 0 0'}}>Параметры дизайна</h3>
      </div>
      <div className="cst-left-scroll">
        {visibleSections.map(section=> (
          <Section key={section.id} label={section.label}>
            {section.id === 'type' && (
              <div className="cst-grid-2">
                {CFG.types.map(t=> (
                  <button key={t.id} className="tile" aria-selected={state.type===t.id} onClick={()=>set('type', t.id)}>
                    <div className="cst-tile-row">
                      <div>
                        <div className="tile-title">{t.name}</div>
                        <div className="tile-sub">{t.sub}</div>
                      </div>
                      <span className="mono cst-tile-price">{t.basePrice}₽</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {section.id === 'variant' && (
              <div className="cst-grid-2">
                {variants.map(v=> (
                  <button key={v.id} className="tile cst-tile-sm" aria-selected={state.variant===v.id} onClick={()=>set('variant', v.id)}>
                    <div className="tile-title">{v.name}</div>
                    <div className="tile-sub mono" style={{fontSize:10.5}}>коэф. × {v.multiplier.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            )}
            {section.id === 'size' && (
              <div className="cst-grid-3">
                {sizes.map(s=> (
                  <button key={s.id} className="tile cst-tile-sm" aria-selected={state.size===s.id} onClick={()=>set('size', s.id)}>
                    <div className="tile-title">{s.name}</div>
                    <div className="tile-sub mono" style={{fontSize:10.5}}>{s.dims}</div>
                  </button>
                ))}
              </div>
            )}
            {section.id === 'material' && (
              <div className="cst-grid-2">
                {CFG.materials.map(m=> (
                  <button key={m.id} className="tile" aria-selected={state.material===m.id} onClick={()=>{ set('material', m.id); set('color', m.color); }}>
                    <div className="cst-tile-row">
                      <div>
                        <div className="tile-title">{m.name}</div>
                        <div className="tile-sub">{m.sub}</div>
                      </div>
                      <span className="cst-mat-swatch" style={{background:m.color, borderColor:'rgba(0,0,0,.15)'}}/>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {section.id === 'color' && (
              <>
                <div className="cst-colors">
                  {CFG.colors.map(c=> (
                    <button key={c}
                            className="cst-color"
                            aria-selected={side.backgroundColor===c}
                            onClick={()=>set('color', c)}
                            style={{background:c}}
                            aria-label={c}>
                      {side.backgroundColor===c && <span/>}
                    </button>
                  ))}
                  <label className="cst-color-custom">
                    <input type="color" value={side.backgroundColor} onChange={(e)=>set('color', e.target.value)}/>
                    <span className="mono">свой</span>
                  </label>
                </div>
                <button className="btn btn-ghost btn-sm cst-full-btn" type="button" onClick={()=>set('applyColorAll', side.backgroundColor)}>
                  Применить цвет ко всем сторонам
                </button>
              </>
            )}
            {section.id === 'logo' && (
              <div className="cst-logo">
                {side.logo ? (
                  <div className="cst-logo-preview">
                    <img src={side.logo} alt=""/>
                    <button className="btn btn-ghost btn-sm" onClick={()=>setSide(state.activeSide, { logo: null })}>Удалить</button>
                  </div>
                ) : (
                  <label className="cst-logo-drop">
                    <input type="file" accept="image/*" onChange={onLogoFile} hidden/>
                    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                      <path d="M16 22 V8 M10 14 L16 8 L22 14 M5 24 H27" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div style={{fontWeight:600, fontSize:14}}>Загрузить логотип</div>
                      <div className="tile-sub">PNG, SVG · до 5 МБ</div>
                    </div>
                  </label>
                )}
                <div className="cst-logo-hint mono">
                  <span style={{color:'var(--pkt-craft-dark)'}}>совет:</span>
                  &nbsp;используйте файл без фона
                </div>
              </div>
            )}
            {section.id === 'text' && (
              <div>
                <input className="input" placeholder="Например: «Малые тиражи · с любовью»"
                       value={side.text} maxLength={42}
                       onChange={(e)=>set('text', e.target.value)}/>
                <div className="cst-text-meta mono">
                  <span>{side.text.length}/42</span>
                  <span>{sideLabel(state.type, state.variant, state.activeSide)}</span>
                </div>
              </div>
            )}
            {section.id === 'side' && (
              <div className="cst-sides">
                {sideOptions.map(s=> (
                  <button key={s.id} className="cst-side-btn" aria-selected={state.activeSide===s.id} onClick={()=>set('activeSide', s.id)}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            {section.id === 'artwork' && (
              <div className="cst-control-stack">
                <div>
                  <div className="cst-control-label mono upper">Выравнивание</div>
                  <div className="cst-segment">
                    {[
                      { value:'left', label:'Слева' },
                      { value:'center', label:'Центр' },
                      { value:'right', label:'Справа' },
                    ].map(opt=> (
                      <button key={opt.value} type="button" aria-selected={(side.alignment || 'center') === opt.value} onClick={()=>setSide(state.activeSide, { alignment: opt.value })}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="cst-control-label mono upper">Масштаб</div>
                  <div className="cst-segment">
                    {[
                      { value:0.8, label:'80%' },
                      { value:1, label:'100%' },
                      { value:1.2, label:'120%' },
                    ].map(opt=> (
                      <button key={opt.value} type="button" aria-selected={(side.scale || 1) === opt.value} onClick={()=>setSide(state.activeSide, { scale: opt.value })}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {section.id === 'visibility' && (
              <button className="cst-toggle-row" type="button" aria-pressed={side.visible} onClick={()=>setSide(state.activeSide, { visible: !side.visible })}>
                <span>
                  <b>{side.visible ? 'Отображается' : 'Скрыто'}</b>
                  <small>{sideLabel(state.type, state.variant, state.activeSide)}</small>
                </span>
                <i/>
              </button>
            )}
          </Section>
        ))}
      </div>
    </aside>
  );
}

function Section({ label, children }){
  const [open, setOpen] = React.useState(true);
  return (
    <section className="cst-section">
      <button className="cst-section-head" onClick={()=>setOpen(o=>!o)}>
        <span className="mono">{label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" style={{transform: open?'rotate(180deg)':'rotate(0)', transition:'transform .2s'}}>
          <path d="M3 5 L6 8 L9 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <div className="cst-section-body">{children}</div>}
    </section>
  );
}

// ── Center preview area ────────────────────────────────────
function PreviewArea({ state, view, setView }){
  const side = activeSide(state);
  return (
    <section className="cst-center">
      <div className="cst-preview-bar">
        <div className="cst-tabs">
          <button className={view==='3d'?'active':''} onClick={()=>setView('3d')}>3D-превью</button>
          <button className={view==='flat'?'active':''} onClick={()=>setView('flat')}>Развёртка</button>
        </div>
        <div className="cst-preview-meta mono">
          <span>{currentTypeName(state.type)} · {variantName(state.type, state.variant)}</span>
          <span className="cst-dot"/>
          <span>{currentSizeDims(state)} · {sideLabel(state.type, state.variant, state.activeSide)}</span>
          <span className="cst-dot"/>
          <span style={{color:'var(--pkt-craft-dark)'}}>RGB {side.backgroundColor.toUpperCase()}</span>
        </div>
      </div>
      <div className="cst-preview-box">
        <div className="cst-print-specs mono">CMYK · 300 DPI · вылет 3 мм</div>
        <PackagingPreview
          type={state.type}
          variant={state.variant}
          color={side.backgroundColor}
          sides={state.sides}
          activeSide={state.activeSide}
          view={view}
          interactive={true}
          idle={false}
        />
        {view === '3d' && (
          <div className="cst-preview-hint mono">
            ☞ потяните курсором — упаковка повернётся
          </div>
        )}
        <div className="cst-safe-hint">
          Безопасная зона: держите текст и логотип внутри центральной области
        </div>
        <div className="cst-preview-stamp">
          <div className="stamp solid"><span className="mono">PROOF · A-{Math.floor(2000 + state.type.length*7 + side.backgroundColor.length*3)}</span></div>
        </div>
      </div>
      <div className="cst-preview-footer mono">
        <span>{currentTypeName(state.type)}</span>
        <span>{variantName(state.type, state.variant)}</span>
        <span>{sideLabel(state.type, state.variant, state.activeSide)}</span>
      </div>
      <div className="cst-preview-actions">
        <button className="btn btn-ghost btn-sm">
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8 H13 M3 8 L7 4 M3 8 L7 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Назад
        </button>
        <button className="btn btn-ghost btn-sm">
          Сохранить дизайн
        </button>
        <button className="btn btn-secondary btn-sm">
          Далее
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M13 8 H3 M13 8 L9 4 M13 8 L9 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
}

// ── Right calc panel ───────────────────────────────────────
function CalcPanel({ state, set, tweaks, onSubmit, requestState }){
  const readiness = readinessInfo(state);
  const canSubmit = readiness.percent >= 80;
  const { price, total, commission, subDiscount, finalTotal } = calcOrderTotals(state, tweaks);

  return (
    <aside className="cst-right">
      <div className="cst-right-head">
        <span className="mono upper" style={{color:'var(--pkt-muted)'}}>расчёт</span>
        <h3 className="pkt-h4" style={{margin:'4px 0 0'}}>Параметры заказа</h3>
      </div>

      <div className="cst-qty">
        <div className="mono upper" style={{color:'var(--pkt-muted)', marginBottom:8}}>Тираж</div>
        <div className="cst-qty-chips">
          {CFG.qty.map(q=> (
            <button key={q} className="cst-qty-chip" aria-selected={state.qty===q} onClick={()=>set('qty', q)}>
              {q.toLocaleString('ru-RU')}
            </button>
          ))}
        </div>
        <div className="cst-qty-slider">
          <input type="range" min={50} max={5000} step={50}
                 value={state.qty}
                 onChange={(e)=>set('qty', Number(e.target.value))}/>
          <div className="cst-qty-cur tabular">{state.qty.toLocaleString('ru-RU')} шт</div>
        </div>
      </div>

      <div className="cst-readiness">
        <div className="cst-readiness-head">
          <div>
            <span className="mono upper">готовность к печати</span>
            <h4>{readiness.percent}%</h4>
          </div>
          <div className="cst-readiness-ring" style={{['--ready']: `${readiness.percent}%`}}>
            <span>{readiness.percent}</span>
          </div>
        </div>
        <div className="cst-checklist">
          {readiness.checks.map(item=> (
            <div key={item.id} className="cst-check" data-done={item.done ? '1' : '0'}>
              <i>{item.done ? '✓' : '•'}</i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {!readiness.hasContent && (
          <div className="cst-warning">
            Добавьте логотип или текст хотя бы на одну сторону, чтобы макет выглядел как брендированная упаковка.
          </div>
        )}
      </div>

      <div className="cst-summary">
        <Row label="Базовая цена" value={`${price.base} ₽/шт`}/>
        <Row label="Коэф. материала" value={`× ${price.matMult.toFixed(2)}`}/>
        <Row label="Коэф. вида упаковки" value={`× ${price.variantMult.toFixed(2)}`}/>
        <Row label="Коэф. тиража" value={`× ${price.qtyMult.toFixed(2)}`}/>
        <div className="cst-row-divider"/>
        <Row label="Цена за штуку" value={<><b className="tabular">{price.perUnit}</b> ₽</>} large/>
        <Row label={`× ${state.qty.toLocaleString('ru-RU')} шт`} value={<span className="tabular">{total.toLocaleString('ru-RU')} ₽</span>}/>
        <Row label="Комиссия сервиса (8%)" value={<span className="tabular">+{commission.toLocaleString('ru-RU')} ₽</span>}/>
        {subDiscount > 0 && <Row label="Скидка подписчика (–12%)" value={<span className="tabular" style={{color:'var(--pkt-ok)'}}>−{subDiscount.toLocaleString('ru-RU')} ₽</span>}/>}
        <Row label="Срок производства" value={`${price.days} дн.`}/>
        <div className="cst-row-divider"/>
        <Row label="Итого" value={<><b className="tabular" style={{fontSize:22}}>{finalTotal.toLocaleString('ru-RU')}</b> ₽</>} xl/>
      </div>

      <div className="cst-delivery craft-paper">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <span className="mono upper" style={{color:'var(--pkt-craft-dark)'}}>срок производства</span>
          <span className="mono tabular" style={{color:'var(--pkt-craft-dark)'}}>{price.days} дн.</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:6}}>
          <span className="mono upper" style={{color:'var(--pkt-craft-dark)'}}>отгрузка</span>
          <span className="mono" style={{color:'var(--pkt-craft-dark)', fontSize:13}}>СДЭК, Почта России</span>
        </div>
      </div>

      <div className="cst-actions">
        <button className="btn btn-primary" style={{width:'100%'}} onClick={onSubmit} disabled={requestState==='loading' || !canSubmit}>
          {requestState==='loading' ? 'Отправляем…' : requestState==='submitted' ? '✓ Заявка отправлена' : 'Оставить заявку →'}
        </button>
        <div className="cst-cta-help">
          {canSubmit ? 'Макет достаточно готов для предварительной заявки.' : 'Заполните ключевые параметры, чтобы отправить заявку.'}
        </div>
        <button className="btn btn-ghost btn-sm" style={{width:'100%'}}>
          Сохранить как черновик
        </button>
      </div>

      <div className="cst-disclaimer mono">
        Расчёт примерный. Финальная цена — после подтверждения макета.
      </div>
    </aside>
  );
}

function Row({ label, value, large, xl }){
  return (
    <div className={`cst-row ${large?'large':''} ${xl?'xl':''}`}>
      <span className="cst-row-lbl">{label}</span>
      <span className="cst-row-val tabular">{value}</span>
    </div>
  );
}

function RequestModal({ state, tweaks, onClose, onComplete }){
  const emptyForm = {
    name: '',
    company: '',
    phone: '',
    email: '',
    telegram: '',
    city: '',
    comment: '',
  };
  const [form, setForm] = React.useState(emptyForm);
  const [errors, setErrors] = React.useState({});
  const [sending, setSending] = React.useState(false);
  const readiness = readinessInfo(state);
  const { price, finalTotal } = calcOrderTotals(state, tweaks);
  const hasEnteredData = Object.values(form).some(value=>String(value).trim());

  React.useEffect(()=>{
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !sending) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, sending]);

  const setField = (field, value) => {
    setForm(current=>({ ...current, [field]: value }));
    if (errors[field]) setErrors(current=>({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Укажите имя.';
    if (!form.phone.trim() && !form.email.trim()) nextErrors.phone = 'Укажите телефон или email.';
    if (!form.city.trim()) nextErrors.city = 'Укажите город доставки.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    window.setTimeout(()=>{
      setSending(false);
      onComplete();
    }, 800);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !hasEnteredData && !sending) onClose();
  };

  return (
    <div className="cst-modal-overlay" role="presentation" onMouseDown={handleOverlayClick}>
      <section className="cst-request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title">
        <button className="cst-modal-close" type="button" onClick={onClose} aria-label="Закрыть заявку" disabled={sending}>
          ×
        </button>
        <div className="cst-modal-head">
          <span className="mono upper">предварительный расчёт</span>
          <h2 id="request-title">Оставить заявку на расчёт</h2>
          <p>Проверьте параметры макета и оставьте контакты — менеджер свяжется в течение 2 часов.</p>
        </div>
        <div className="cst-modal-body">
          <div className="cst-modal-summary">
            <div className="cst-modal-card-head">
              <span className="mono upper">параметры макета</span>
              <strong>Заказ</strong>
            </div>
            <Row label="Тип упаковки" value={currentTypeName(state.type)}/>
            <Row label="Вид / форма" value={variantName(state.type, state.variant)}/>
            <Row label="Размер" value={currentSizeDims(state)}/>
            <Row label="Материал" value={currentMaterialName(state.material)}/>
            <Row label="Активная сторона" value={sideLabel(state.type, state.variant, state.activeSide)}/>
            <Row label="Тираж" value={`${state.qty.toLocaleString('ru-RU')} шт`}/>
            <Row label="Срок производства" value={`${price.days} дн.`}/>
            <div className="cst-row-divider"/>
            <Row label="Итоговая сумма" value={<><b>{finalTotal.toLocaleString('ru-RU')}</b> ₽</>} large/>

            <div className="cst-modal-readiness">
              <div className="cst-readiness-ring" style={{['--ready']: `${readiness.percent}%`}}>
                <span>{readiness.percent}</span>
              </div>
              <div>
                <strong>{readiness.percent}% готовности</strong>
                <p>{readiness.percent >= 80 ? 'Макет готов для предварительного расчёта' : 'Заполните ключевые параметры перед отправкой'}</p>
              </div>
            </div>
          </div>

          <form className="cst-contact-form" onSubmit={handleSubmit} noValidate>
            <div className="cst-modal-card-head">
              <span className="mono upper">контакты</span>
              <strong>Как с вами связаться</strong>
            </div>
            <ContactField label="Имя" value={form.name} error={errors.name} onChange={(value)=>setField('name', value)} required/>
            <ContactField label="Компания / бренд" value={form.company} onChange={(value)=>setField('company', value)}/>
            <div className="cst-form-two">
              <ContactField label="Телефон" value={form.phone} error={errors.phone} onChange={(value)=>setField('phone', value)} inputMode="tel"/>
              <ContactField label="Email" value={form.email} onChange={(value)=>setField('email', value)} inputMode="email"/>
            </div>
            <div className="cst-form-two">
              <ContactField label="Telegram" value={form.telegram} onChange={(value)=>setField('telegram', value)} placeholder="@username"/>
              <ContactField label="Город доставки" value={form.city} error={errors.city} onChange={(value)=>setField('city', value)} required/>
            </div>
            <label className="cst-field">
              <span>Комментарий</span>
              <textarea value={form.comment} onChange={(event)=>setField('comment', event.target.value)} rows="4" placeholder="Пожелания по срокам, материалам или доставке"/>
            </label>
            <p className="cst-privacy">Нажимая кнопку, вы соглашаетесь с обработкой данных для расчёта заказа.</p>
            <button className="btn btn-primary btn-lg" type="submit" disabled={sending}>
              {sending ? 'Отправляем заявку…' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function ContactField({ label, value, error, onChange, required, inputMode, placeholder }){
  return (
    <label className="cst-field" data-invalid={error ? '1' : '0'}>
      <span>{label}{required ? ' *' : ''}</span>
      <input
        value={value}
        onChange={(event)=>onChange(event.target.value)}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <em>{error}</em>}
    </label>
  );
}

// ── price calc helpers ─────────────────────────────────────
function calcPrice(state, tweaks){
  const type = CFG.types.find(t=>t.id===state.type);
  const size = CFG.sizes[state.type].find(s=>s.id===state.size) || CFG.sizes[state.type][1];
  const mat = CFG.materials.find(m=>m.id===state.material);
  const variant = variantConfig(state.type, state.variant);
  const qtyMult =
      state.qty <= 100  ? 1.40 :
      state.qty <= 200  ? 1.20 :
      state.qty <= 500  ? 1.00 :
      state.qty <= 1000 ? 0.85 :
      state.qty <= 2000 ? 0.78 : 0.70;
  const base = Math.round(type.basePrice * size.mult);
  const variantMult = variant.multiplier || 1;
  const perUnit = Math.max(2, Math.round(base * mat.multiplier * variantMult * qtyMult));
  const days =
      state.qty <= 100  ? 7 :
      state.qty <= 500  ? 10 :
      state.qty <= 2000 ? 14 : 21;
  return { base, matMult: mat.multiplier, variantMult, qtyMult, perUnit, days };
}
function calcOrderTotals(state, tweaks = {}){
  const price = calcPrice(state, tweaks);
  const total = price.perUnit * state.qty;
  const commission = Math.round(total * 0.08);
  const subDiscount = (tweaks.pricingMode === 'subscription' || tweaks.pricingMode === 'mixed') ? Math.round(total * 0.12) : 0;
  const finalTotal = total + commission - subDiscount;
  return { price, total, commission, subDiscount, finalTotal };
}
function currentTypeName(id){ return CFG.types.find(t=>t.id===id).name; }
function currentSizeDims(state){
  const s = CFG.sizes[state.type].find(s=>s.id===state.size) || CFG.sizes[state.type][1];
  return s.dims;
}
function currentMaterialName(id){ return CFG.materials.find(m=>m.id===id).name; }

// ── Constructor root ───────────────────────────────────────
export function Constructor({ onNavigate, tweaks = {}, initial }){
  const initialType = initial?.type || tweaks.heroType || 'box';
  const initialVariant = defaultVariantForType(initialType);
  const initialColor = tweaks.heroType ? '#2563EB' : '#B08A5B';
  const [state, setState] = React.useState({
    type: initialType,
    variant: initialVariant,
    size: 'm',
    material: 'craft',
    color: initialColor,
    logo: null,
    text: 'малые тиражи',
    activeSide: firstSideForType(initialType, initialVariant),
    sides: createSides(initialType, initialVariant, initialColor),
    qty: 200,
  });
  const setSide = (sideId, edits) => setState(s=>({
    ...s,
    sides: { ...s.sides, [sideId]: { ...createSideState(s.color), ...(s.sides[sideId] || {}), ...edits } },
  }));
  const set = (k, v) => setState(s=>{
    if (k === 'type') {
      const nextColor = activeSide(s).backgroundColor || s.color;
      const nextVariant = defaultVariantForType(v);
      return {
        ...s,
        type: v,
        variant: nextVariant,
        activeSide: firstSideForType(v, nextVariant),
        sides: createSides(v, nextVariant, nextColor, s.sides?.front?.text || s.text || '', s.sides),
        color: nextColor
      };
    }
    if (k === 'variant') {
      const available = sideOptionsForType(s.type, v).map(side=>side.id);
      const nextActiveSide = available.includes(s.activeSide) ? s.activeSide : available[0] || 'front';
      return {
        ...s,
        variant: v,
        activeSide: nextActiveSide,
        sides: createSides(s.type, v, s.color, s.sides?.front?.text || s.text || '', s.sides)
      };
    }
    if (k === 'activeSide') return { ...s, activeSide: v };
    if (k === 'color') {
      const current = s.activeSide;
      return { ...s, color: v, sides: { ...s.sides, [current]: { ...s.sides[current], backgroundColor: v } } };
    }
    if (k === 'text') {
      const current = s.activeSide;
      return { ...s, text: v, sides: { ...s.sides, [current]: { ...s.sides[current], text: v } } };
    }
    if (k === 'material') {
      const material = CFG.materials.find(m=>m.id===v);
      const color = material?.color || s.color;
      const current = s.activeSide;
      return { ...s, material: v, color, sides: { ...s.sides, [current]: { ...s.sides[current], backgroundColor: color } } };
    }
    if (k === 'applyColorAll') {
      const visible = new Set(visibleSideIds(s.type, s.variant));
      const sides = Object.fromEntries(Object.entries(s.sides).map(([id, side])=>[
        id,
        visible.has(id) ? { ...side, backgroundColor: v } : side,
      ]));
      return { ...s, color: v, sides };
    }
    return {...s, [k]: v};
  });
  const [step, setStep] = React.useState(1);
  const [view, setView] = React.useState('3d');
  const [reqState, setReqState] = React.useState('idle');
  const [requestModalOpen, setRequestModalOpen] = React.useState(false);

  // sync step with section focus heuristic
  React.useEffect(()=>{
    if (state.variant) setStep(s=>Math.max(s,2));
    if (state.size) setStep(s=>Math.max(s,3));
    if (state.material) setStep(s=>Math.max(s,4));
  }, [state.material, state.size, state.variant]);

  // Tweaks override request state
  React.useEffect(()=>{
    if (tweaks.appState) setReqState(tweaks.appState);
  }, [tweaks.appState]);

  const onSubmit = () => {
    if (readinessInfo(state).percent < 80) return;
    setRequestModalOpen(true);
  };

  const completeRequest = () => {
    setRequestModalOpen(false);
    setReqState('loading');
    setTimeout(()=> setReqState('submitted'), 50);
  };

  if (reqState === 'submitted') {
    return <ConstructorSuccess state={state} tweaks={tweaks} onBack={()=>{ setReqState('idle'); }} onHome={()=>onNavigate('home')}/>;
  }

  return (
    <main className="cst-page">
      <Stepper step={step} onStep={setStep}/>
      <div className="cst-layout">
        <SettingsPanel state={state} set={set} setSide={setSide} tweaks={tweaks}/>
        <PreviewArea state={state} view={view} setView={setView}/>
        <CalcPanel state={state} set={set} tweaks={tweaks} onSubmit={onSubmit} requestState={reqState}/>
      </div>
      {requestModalOpen && (
        <RequestModal
          state={state}
          tweaks={tweaks}
          onClose={()=>setRequestModalOpen(false)}
          onComplete={completeRequest}
        />
      )}
    </main>
  );
}

// ── Success screen ─────────────────────────────────────────
function ConstructorSuccess({ state, tweaks, onBack, onHome }){
  const orderId = `A-${Math.floor(2000 + Math.random()*8000)}`;
  const side = activeSide(state);
  const { price, finalTotal } = calcOrderTotals(state, tweaks);
  return (
    <main className="cst-success">
      <div className="pkt-container">
        <div className="cst-success-wrap">
          <div className="cst-success-stamp">
            <div className="stamp solid mono">ЗАЯВКА · ПОЛУЧЕНА</div>
          </div>
          <h1 className="pkt-h1" style={{maxWidth:720, margin:'24px 0 12px'}}>
            Спасибо! Заявка принята в расчёт.
          </h1>
          <p className="pkt-lead" style={{maxWidth:580}}>
            Номер заявки <span className="mono" style={{color:'var(--pkt-brand)'}}>{orderId}</span>.
            Мы сохранили параметры макета и передали их менеджеру.
          </p>
          <div className="cst-success-grid">
            <div className="cst-success-card">
              <div className="cst-success-preview">
                <PackagingPreview type={state.type} variant={state.variant} color={side.backgroundColor} sides={state.sides} activeSide={state.activeSide} interactive={false} idle={true}/>
              </div>
            </div>
            <div className="cst-success-info">
              <Row label="Тип" value={currentTypeName(state.type)}/>
              <Row label="Вид упаковки" value={variantName(state.type, state.variant)}/>
              <Row label="Размер" value={currentSizeDims(state)}/>
              <Row label="Материал" value={currentMaterialName(state.material)}/>
              <Row label="Тираж" value={`${state.qty.toLocaleString('ru-RU')} шт`}/>
              <Row label="Сторона" value={sideLabel(state.type, state.variant, state.activeSide)}/>
              <div className="cst-row-divider"/>
              <Row label="Срок" value={`${price.days} дн.`}/>
              <Row label="Цена" value={<b className="tabular">{finalTotal.toLocaleString('ru-RU')} ₽</b>} large/>
            </div>
          </div>
          <div className="cst-success-actions">
            <button className="btn btn-primary btn-lg" onClick={onHome}>На главную</button>
            <button className="btn btn-ghost btn-lg" onClick={onBack}>Изменить параметры</button>
          </div>
        </div>
      </div>
    </main>
  );
}

