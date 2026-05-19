/* global React, PackagingPreview */
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
  qty: [50, 100, 200, 500, 1000, 2000, 5000],
  sides: ['Лицо', 'Зад', 'Бок Л', 'Бок П', 'Верх', 'Низ'],
};

// ── Top stepper ────────────────────────────────────────────
function Stepper({ step, onStep, full }){
  const STEPS = [
    { n:1, label:'Тип' },
    { n:2, label:'Размер' },
    { n:3, label:'Материал' },
    { n:4, label:'Дизайн' },
    { n:5, label:'Тираж' },
    { n:6, label:'Заявка' },
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
function SettingsPanel({ state, set, tweaks }){
  const detail = tweaks.constructorDetail || 'full';
  const SECTIONS = [
    { id:'type', label:'01. Тип упаковки' },
    { id:'size', label:'02. Размер' },
    { id:'material', label:'03. Материал' },
    { id:'color', label:'04. Цвет' },
    { id:'logo', label:'05. Логотип' },
    { id:'text', label:'06. Текст' },
    { id:'side', label:'07. Сторона' },
  ];
  const onLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('logo', ev.target.result);
    reader.readAsDataURL(file);
  };
  const sizes = CFG.sizes[state.type];
  const visibleSections = detail === 'compact'
    ? SECTIONS.filter(s=>['type','size','material','color'].includes(s.id))
    : SECTIONS;

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
              <div className="cst-colors">
                {CFG.colors.map(c=> (
                  <button key={c}
                          className="cst-color"
                          aria-selected={state.color===c}
                          onClick={()=>set('color', c)}
                          style={{background:c}}
                          aria-label={c}>
                    {state.color===c && <span/>}
                  </button>
                ))}
                <label className="cst-color-custom">
                  <input type="color" value={state.color} onChange={(e)=>set('color', e.target.value)}/>
                  <span className="mono">свой</span>
                </label>
              </div>
            )}
            {section.id === 'logo' && (
              <div className="cst-logo">
                {state.logo ? (
                  <div className="cst-logo-preview">
                    <img src={state.logo} alt=""/>
                    <button className="btn btn-ghost btn-sm" onClick={()=>set('logo', null)}>Удалить</button>
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
                       value={state.text} maxLength={42}
                       onChange={(e)=>set('text', e.target.value)}/>
                <div className="cst-text-meta mono">
                  <span>{state.text.length}/42</span>
                  <span>отображается под лого</span>
                </div>
              </div>
            )}
            {section.id === 'side' && (
              <div className="cst-sides">
                {CFG.sides.map(s=> (
                  <button key={s} className="cst-side-btn" aria-selected={state.side===s} onClick={()=>set('side', s)}>
                    {s}
                  </button>
                ))}
              </div>
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
  return (
    <section className="cst-center">
      <div className="cst-preview-bar">
        <div className="cst-tabs">
          <button className={view==='3d'?'active':''} onClick={()=>setView('3d')}>3D-превью</button>
          <button className={view==='flat'?'active':''} onClick={()=>setView('flat')}>Развёртка</button>
        </div>
        <div className="cst-preview-meta mono">
          <span>{currentTypeName(state.type)} · {currentSizeDims(state)}</span>
          <span className="cst-dot"/>
          <span>{currentMaterialName(state.material)}</span>
          <span className="cst-dot"/>
          <span style={{color:'var(--pkt-craft-dark)'}}>RGB {state.color.toUpperCase()}</span>
        </div>
      </div>
      <div className="cst-preview-box">
        <PackagingPreview
          type={state.type}
          color={state.color}
          logo={state.logo}
          text={state.text}
          view={view}
          interactive={true}
          idle={false}
        />
        {view === '3d' && (
          <div className="cst-preview-hint mono">
            ☞ потяните курсором — упаковка повернётся
          </div>
        )}
        <div className="cst-preview-stamp">
          <div className="stamp solid"><span className="mono">PROOF · A-{Math.floor(2000 + state.type.length*7 + state.color.length*3)}</span></div>
        </div>
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
  const price = calcPrice(state, tweaks);
  const total = price.perUnit * state.qty;
  const commission = Math.round(total * 0.08);
  const subDiscount = (tweaks.pricingMode === 'subscription' || tweaks.pricingMode === 'mixed') ? Math.round(total * 0.12) : 0;
  const finalTotal = total + commission - subDiscount;

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

      <div className="cst-summary">
        <Row label="Базовая цена" value={`${price.base} ₽/шт`}/>
        <Row label="Коэф. материала" value={`× ${price.matMult.toFixed(2)}`}/>
        <Row label="Коэф. тиража" value={`× ${price.qtyMult.toFixed(2)}`}/>
        <div className="cst-row-divider"/>
        <Row label="Цена за штуку" value={<><b className="tabular">{price.perUnit}</b> ₽</>} large/>
        <Row label={`× ${state.qty.toLocaleString('ru-RU')} шт`} value={<span className="tabular">{total.toLocaleString('ru-RU')} ₽</span>}/>
        <Row label="Комиссия сервиса (8%)" value={<span className="tabular">+{commission.toLocaleString('ru-RU')} ₽</span>}/>
        {subDiscount > 0 && <Row label="Скидка подписчика (–12%)" value={<span className="tabular" style={{color:'var(--pkt-ok)'}}>−{subDiscount.toLocaleString('ru-RU')} ₽</span>}/>}
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
        <button className="btn btn-primary" style={{width:'100%'}} onClick={onSubmit} disabled={requestState==='loading'}>
          {requestState==='loading' ? 'Отправляем…' : requestState==='submitted' ? '✓ Заявка отправлена' : 'Оставить заявку →'}
        </button>
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

// ── price calc helpers ─────────────────────────────────────
function calcPrice(state, tweaks){
  const type = CFG.types.find(t=>t.id===state.type);
  const size = CFG.sizes[state.type].find(s=>s.id===state.size) || CFG.sizes[state.type][1];
  const mat = CFG.materials.find(m=>m.id===state.material);
  const qtyMult =
      state.qty <= 100  ? 1.40 :
      state.qty <= 200  ? 1.20 :
      state.qty <= 500  ? 1.00 :
      state.qty <= 1000 ? 0.85 :
      state.qty <= 2000 ? 0.78 : 0.70;
  const base = Math.round(type.basePrice * size.mult);
  const perUnit = Math.max(2, Math.round(base * mat.multiplier * qtyMult));
  const days =
      state.qty <= 100  ? 7 :
      state.qty <= 500  ? 10 :
      state.qty <= 2000 ? 14 : 21;
  return { base, matMult: mat.multiplier, qtyMult, perUnit, days };
}
function currentTypeName(id){ return CFG.types.find(t=>t.id===id).name; }
function currentSizeDims(state){
  const s = CFG.sizes[state.type].find(s=>s.id===state.size) || CFG.sizes[state.type][1];
  return s.dims;
}
function currentMaterialName(id){ return CFG.materials.find(m=>m.id===id).name; }

// ── Constructor root ───────────────────────────────────────
function Constructor({ onNavigate, tweaks, initial }){
  const [state, setState] = React.useState({
    type: initial?.type || tweaks.heroType || 'box',
    size: 'm',
    material: 'craft',
    color: tweaks.heroType ? '#2563EB' : '#B08A5B',
    logo: null,
    text: 'малые тиражи',
    side: 'Лицо',
    qty: 200,
  });
  const set = (k, v) => setState(s=>({...s, [k]: v}));
  const [step, setStep] = React.useState(1);
  const [view, setView] = React.useState('3d');
  const [reqState, setReqState] = React.useState('idle');

  // sync step with section focus heuristic
  React.useEffect(()=>{
    const map = { box:1, bag:1, cup:1, sticker:1 };
    if (state.size) setStep(s=>Math.max(s,2));
    if (state.material) setStep(s=>Math.max(s,3));
  }, [state.material, state.size]);

  // Tweaks override request state
  React.useEffect(()=>{
    if (tweaks.appState) setReqState(tweaks.appState);
  }, [tweaks.appState]);

  const onSubmit = () => {
    setReqState('loading');
    setTimeout(()=> setReqState('submitted'), 900);
  };

  if (reqState === 'submitted') {
    return <ConstructorSuccess state={state} onBack={()=>{ setReqState('idle'); }} onHome={()=>onNavigate('home')}/>;
  }

  return (
    <main className="cst-page">
      <Stepper step={step} onStep={setStep}/>
      <div className="cst-layout">
        <SettingsPanel state={state} set={set} tweaks={tweaks}/>
        <PreviewArea state={state} view={view} setView={setView}/>
        <CalcPanel state={state} set={set} tweaks={tweaks} onSubmit={onSubmit} requestState={reqState}/>
      </div>
    </main>
  );
}

// ── Success screen ─────────────────────────────────────────
function ConstructorSuccess({ state, onBack, onHome }){
  const orderId = `A-${Math.floor(2000 + Math.random()*8000)}`;
  return (
    <main className="cst-success">
      <div className="pkt-container">
        <div className="cst-success-wrap">
          <div className="cst-success-stamp">
            <div className="stamp solid mono">ЗАЯВКА · ПОЛУЧЕНА</div>
          </div>
          <h1 className="pkt-h1" style={{maxWidth:720, margin:'24px 0 12px'}}>
            Спасибо! Ваш макет передан в&nbsp;производство.
          </h1>
          <p className="pkt-lead" style={{maxWidth:580}}>
            Номер заявки <span className="mono" style={{color:'var(--pkt-brand)'}}>{orderId}</span>.
            Менеджер свяжется в течение 2 часов для подтверждения деталей.
          </p>
          <div className="cst-success-grid">
            <div className="cst-success-card">
              <div className="cst-success-preview">
                <PackagingPreview type={state.type} color={state.color} logo={state.logo} text={state.text} interactive={false} idle={true}/>
              </div>
            </div>
            <div className="cst-success-info">
              <Row label="Тип" value={currentTypeName(state.type)}/>
              <Row label="Размер" value={currentSizeDims(state)}/>
              <Row label="Материал" value={currentMaterialName(state.material)}/>
              <Row label="Тираж" value={`${state.qty.toLocaleString('ru-RU')} шт`}/>
              <Row label="Сторона" value={state.side}/>
              <div className="cst-row-divider"/>
              <Row label="Срок" value={`${calcPrice(state, {}).days} дн.`}/>
              <Row label="Цена" value={<b className="tabular">{(state.qty * calcPrice(state, {}).perUnit).toLocaleString('ru-RU')} ₽</b>} large/>
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

Object.assign(window, { Constructor });
