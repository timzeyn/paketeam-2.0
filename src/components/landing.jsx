import React from 'react';
import { PackagingPreview } from './packaging3d.jsx';
// ─────────────────────────────────────────────────────────
// Лендинг ПАКЕТЕАМ — главная страница
// ─────────────────────────────────────────────────────────

const PKT_CATEGORIES = [
  { id:'box', name:'Коробка', sub:'самосборка, тубус, под крышку', count:'12 размеров', price:'от 24 ₽/шт' },
  { id:'bag', name:'Пакет', sub:'крафт, дой-пак, зип-лок', count:'8 типов', price:'от 12 ₽/шт' },
  { id:'cup', name:'Стакан', sub:'для кофе, бумажный, двойной', count:'200–500 мл', price:'от 9 ₽/шт' },
  { id:'sticker', name:'Наклейка', sub:'круглая, квадратная, фигурная', count:'любая форма', price:'от 2 ₽/шт' },
];

const PKT_STEPS = [
  { n:'01', title:'Выберите упаковку', desc:'Тип, размер, материал. Подсказки помогут не ошибиться.' },
  { n:'02', title:'Соберите дизайн', desc:'Загрузите логотип, добавьте текст, выберите цвет. Превью в 3D обновляется в реальном времени.' },
  { n:'03', title:'Тираж от 50 штук', desc:'Малые партии без переплат. Калькулятор покажет цену за единицу.' },
  { n:'04', title:'Получите за 7–14 дней', desc:'Печать, контроль качества, доставка по России и СНГ.' },
];

const PKT_PROBLEMS = [
  { stamp:'Боль №1', title:'Дизайнер дорогой', desc:'Брендированная упаковка — это «от 30 000 ₽ за макет» и три недели правок.' },
  { stamp:'Боль №2', title:'Тиражи от 1000 шт', desc:'Типографии не берут малый объём. Селлеру с продажами 100/мес это нерентабельно.' },
  { stamp:'Боль №3', title:'Долгое согласование', desc:'Pdf-макеты, технологи, цветопроба. Покупатели уходят, пока упаковка едет.' },
  { stamp:'Боль №4', title:'Сложные техтребования', desc:'Bleed, профиль печати, dieline — без дизайнера и не разобраться.' },
];

const PKT_FEATURES = [
  { tag:'TECH', title:'Реалистичный 3D-просмотр', desc:'Вращайте упаковку, смотрите на свет, переключайтесь на развёртку.' },
  { tag:'PRICE', title:'Прозрачный калькулятор', desc:'Цена за штуку обновляется при каждом изменении. Без скрытых сборов.' },
  { tag:'PRINT', title:'Готовые dieline-шаблоны', desc:'Технические требования встроены. Превью = финальная печать 1:1.' },
  { tag:'MIN', title:'От 50 штук', desc:'Стартуйте с тиража, который реально продастся.' },
  { tag:'SPEED', title:'7–14 дней под ключ', desc:'Стандартные сроки. Срочный режим — 4 дня.' },
  { tag:'SAVE', title:'Без дизайнера', desc:'Не нужно искать исполнителя. Готовый макет — за час.' },
];

// ── HEADER ─────────────────────────────────────────────────
export function Header({ onNavigate, current }){
  return (
    <header className="pkt-header">
      <div className="pkt-container pkt-header-row">
        <a className="pkt-logo" href="#" onClick={(e)=>{e.preventDefault(); onNavigate('home');}}>
          <span className="pkt-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M4 10 L16 4 L28 10 L28 24 L16 30 L4 24 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M4 10 L16 16 L28 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M16 16 L16 30" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 7 L22 13" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
            </svg>
          </span>
          <b>ПАКЕТЕАМ</b>
          <span className="pkt-logo-tag mono">[ beta · 2026 ]</span>
        </a>
        <nav className="pkt-nav">
          <a href="#problems">Зачем</a>
          <a href="#how">Как работает</a>
          <a href="#categories">Каталог</a>
          <a href="#pricing">Цены</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNavigate('constructor');}}>Конструктор</a>
        </nav>
        <div className="pkt-header-cta">
          <button className="btn btn-ghost btn-sm">Войти</button>
          <button className="btn btn-primary btn-sm" onClick={()=>onNavigate('constructor')}>
            Создать упаковку
          </button>
        </div>
      </div>
    </header>
  );
}

// ── HERO ───────────────────────────────────────────────────
function Hero({ onNavigate, tweaks }){
  return (
    <section className="pkt-hero">
      <div className="pkt-container">
        <div className="pkt-hero-grid">
          <div className="pkt-hero-text">
            <span className="stamp"><span className="dot" style={{width:6,height:6,borderRadius:'50%',background:'var(--pkt-craft-ink)'}}/>МАЛЫЕ ТИРАЖИ · БЕЗ ДИЗАЙНЕРА</span>
            <h1 className="pkt-h1">
              Создайте брендированную упаковку <em>онлайн</em> —
              без дизайнера и больших тиражей.
            </h1>
            <p className="pkt-lead">
              Конструктор упаковки для малого бизнеса, кофеен и маркетплейс-селлеров.
              Соберите макет за час, тираж от 50 штук, отгрузка за 7–14 дней.
            </p>
            <div className="pkt-hero-cta">
              <button className="btn btn-primary btn-lg" onClick={()=>onNavigate('constructor')}>
                Создать упаковку →
              </button>
              <button className="btn btn-ghost btn-lg" onClick={()=>onNavigate('constructor')}>
                Рассчитать заказ
              </button>
            </div>
            <div className="pkt-hero-trust">
              <div className="pkt-trust-item">
                <div className="mono upper" style={{color:'var(--pkt-muted)'}}>тираж</div>
                <div className="pkt-trust-val">от 50 шт</div>
              </div>
              <div className="pkt-trust-divider"/>
              <div className="pkt-trust-item">
                <div className="mono upper" style={{color:'var(--pkt-muted)'}}>срок</div>
                <div className="pkt-trust-val">7–14 дней</div>
              </div>
              <div className="pkt-trust-divider"/>
              <div className="pkt-trust-item">
                <div className="mono upper" style={{color:'var(--pkt-muted)'}}>цена</div>
                <div className="pkt-trust-val">от 2 ₽/шт</div>
              </div>
              <div className="pkt-trust-divider"/>
              <div className="pkt-trust-item">
                <div className="mono upper" style={{color:'var(--pkt-muted)'}}>клиенты</div>
                <div className="pkt-trust-val">340+ брендов</div>
              </div>
            </div>
          </div>
          <div className="pkt-hero-preview">
            <div className="pkt-hero-preview-frame">
              <div className="pkt-preview-chrome">
                <span className="mono upper">live 3D preview</span>
                <span className="pkt-chrome-dots"><i/><i/><i/></span>
              </div>
              <PackagingPreview
                type={tweaks.heroType}
                color="#2563EB"
                text="малые тиражи · бренд"
                interactive={true}
                idle={true}
              />
              <div className="pkt-preview-meta">
                <span className="mono upper">drag · поверните упаковку</span>
                <span className="mono">№ A-204 / крафт ECO</span>
              </div>
            </div>
            <div className="pkt-hero-paper-badge craft-paper">
              <div className="stamp solid">CRAFT · ECO</div>
              <div style={{marginTop:8, fontSize:13, color:'var(--pkt-craft-dark)'}}>
                Перерабатываемые материалы — биоразлагаемые тиражи по умолчанию.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROBLEMS ───────────────────────────────────────────────
function Problems(){
  return (
    <section id="problems" className="pkt-section">
      <div className="pkt-container">
        <SectionHead
          tag="ПРОБЛЕМЫ"
          title="Малому бренду — большие препятствия"
          sub="Раньше брендированная упаковка была роскошью. Мы убрали три причины этого."
        />
        <div className="pkt-problems-grid">
          {PKT_PROBLEMS.map((p, i)=> (
            <article key={p.title} className="card pkt-problem">
              <div className="pkt-problem-stamp">
                <span className="stamp"><span className="mono">{p.stamp}</span></span>
              </div>
              <h3 className="pkt-h3">{p.title}</h3>
              <p className="pkt-muted">{p.desc}</p>
              <div className="pkt-problem-num mono">{String(i+1).padStart(2,'0')}/04</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ───────────────────────────────────────────
function HowItWorks(){
  return (
    <section id="how" className="pkt-section pkt-section-paper">
      <div className="pkt-container">
        <SectionHead
          tag="КАК РАБОТАЕТ ПАКЕТЕАМ"
          title="Четыре шага от идеи до партии"
          sub="Всё в одном окне — без переписок, ТЗ и согласований."
        />
        <ol className="pkt-steps">
          {PKT_STEPS.map((s, i)=> (
            <li key={s.n} className="pkt-step">
              <div className="pkt-step-n mono">{s.n}</div>
              <div className="pkt-step-body">
                <h4 className="pkt-h4">{s.title}</h4>
                <p className="pkt-muted">{s.desc}</p>
              </div>
              {i<PKT_STEPS.length-1 && <div className="pkt-step-connector"/>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── CATEGORIES ─────────────────────────────────────────────
function Categories({ onNavigate }){
  return (
    <section id="categories" className="pkt-section">
      <div className="pkt-container">
        <SectionHead
          tag="КАТАЛОГ УПАКОВКИ"
          title="Четыре формата. Сотни параметров."
          sub="Выбирайте тип, дальше — конструктор подгрузит подходящие шаблоны."
        />
        <div className="pkt-cats">
          {PKT_CATEGORIES.map((c)=> (
            <article key={c.id} className="card lift pkt-cat">
              <div className="pkt-cat-preview">
                <PackagingPreview type={c.id} color="#B08A5B" interactive={false} idle={true}/>
              </div>
              <div className="pkt-cat-body">
                <div className="pkt-cat-row">
                  <h4 className="pkt-h4">{c.name}</h4>
                  <span className="mono" style={{color:'var(--pkt-muted)', fontSize:12}}>{c.count}</span>
                </div>
                <p className="pkt-muted" style={{fontSize:14, margin:'4px 0 12px'}}>{c.sub}</p>
                <div className="pkt-cat-foot">
                  <span className="stamp blue mono">{c.price}</span>
                  <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('constructor', {type:c.id})}>
                    Открыть →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES ───────────────────────────────────────────────
function Features(){
  return (
    <section className="pkt-section pkt-section-ink">
      <div className="pkt-container">
        <SectionHead
          tag="ПРЕИМУЩЕСТВА"
          title="Конструктор, который заменяет дизайнера и типографа"
          sub="Технология рендера, прозрачная цена, готовые шаблоны под цифровую печать."
          inverse
        />
        <div className="pkt-features-grid">
          {PKT_FEATURES.map((f)=> (
            <div key={f.title} className="pkt-feature">
              <span className="mono pkt-feature-tag">{f.tag}</span>
              <h4 className="pkt-h4">{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONSTRUCTOR DEMO ───────────────────────────────────────
function ConstructorDemo({ onNavigate }){
  const [color, setColor] = React.useState('#2563EB');
  const [type, setType] = React.useState('box');
  const COLORS = ['#2563EB','#B08A5B','#0F1626','#15803D','#DC2626','#F4EDE0'];
  const TYPES = [
    {id:'box', name:'Коробка'},
    {id:'bag', name:'Пакет'},
    {id:'cup', name:'Стакан'},
    {id:'sticker', name:'Наклейка'},
  ];
  return (
    <section className="pkt-section">
      <div className="pkt-container">
        <SectionHead
          tag="ДЕМО КОНСТРУКТОРА"
          title="Покликайте — и упаковка перестроится в реальном времени"
          sub="Полный конструктор — на отдельной странице. Здесь — короткое демо."
        />
        <div className="pkt-demo">
          <div className="pkt-demo-controls">
            <div>
              <div className="upper mono pkt-demo-label">Тип</div>
              <div className="pkt-demo-types">
                {TYPES.map(t=> (
                  <button key={t.id}
                    className="tile" aria-selected={type===t.id}
                    onClick={()=>setType(t.id)} style={{padding:'10px 12px'}}>
                    <div className="tile-title">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="upper mono pkt-demo-label">Цвет</div>
              <div className="pkt-demo-colors">
                {COLORS.map(c=> (
                  <button key={c}
                    className="pkt-color-chip"
                    aria-selected={color===c}
                    onClick={()=>setColor(c)}
                    style={{background:c}}
                    aria-label={c}/>
                ))}
              </div>
            </div>
            <div>
              <div className="upper mono pkt-demo-label">Цена за тираж 200 шт.</div>
              <div className="pkt-demo-price">
                <span className="tabular">{(200 * (type==='sticker'?3:type==='cup'?12:type==='bag'?16:32)).toLocaleString('ru-RU')}</span>
                <span style={{fontSize:18, color:'var(--pkt-muted)', marginLeft:6}}> ₽</span>
              </div>
              <p className="pkt-muted" style={{fontSize:13, marginTop:4}}>
                включая печать, материал и доставку.
              </p>
              <button className="btn btn-primary" style={{marginTop:16}} onClick={()=>onNavigate('constructor')}>
                Открыть полный конструктор →
              </button>
            </div>
          </div>
          <div className="pkt-demo-preview card flat" style={{background:'var(--pkt-bg)', border:'1px solid var(--pkt-border)'}}>
            <PackagingPreview type={type} color={color} text="бренд · 200 шт" interactive={true} idle={false}/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PRICING ────────────────────────────────────────────────
function Pricing({ tweaks }){
  const mode = tweaks.pricingMode || 'mixed';
  const PLANS = [
    {
      id:'pay', name:'Разовый заказ', tag:'без подписки',
      head:'Комиссия с заказа', accent:'Платите только когда производите.',
      price:'от 0 ₽', priceSub:'базовый конструктор бесплатно',
      bullets:[
        'Доступ ко всем шаблонам',
        '3D-превью и развёртки',
        'Комиссия сервиса 8% от тиража',
        'Поддержка по почте',
      ],
      cta:'Начать бесплатно',
    },
    {
      id:'reg', name:'Регулярная подписка', tag:'для повторных заказов', highlight:true,
      head:'2 490 ₽/мес', accent:'Скидка 12% на все тиражи и приоритетная очередь печати.',
      price:'2 490 ₽', priceSub:'/мес, без обязательств',
      bullets:[
        'Сохранение неограниченных макетов',
        'Скидка 12% на все заказы',
        'Приоритет в очереди печати — 4 дня',
        'Личный менеджер в Telegram',
        'API для маркетплейс-селлеров',
      ],
      cta:'Подключить подписку',
    },
    {
      id:'corp', name:'Корпоративный', tag:'тиражи от 5 000',
      head:'Индивидуально', accent:'Складское хранение, регулярные отгрузки, NDA.',
      price:'договорная',
      bullets:[
        'Менеджер 24/7',
        'Складское хранение тиражей',
        'Регулярные отгрузки по графику',
        'NDA и эксклюзивные материалы',
        'Дизайнер-консультант',
      ],
      cta:'Запросить условия',
    },
  ];
  const visible = mode === 'commission' ? [PLANS[0], PLANS[2]]
                : mode === 'subscription' ? [PLANS[1], PLANS[2]]
                : PLANS;
  return (
    <section id="pricing" className="pkt-section pkt-section-craft">
      <div className="pkt-container">
        <SectionHead
          tag="МОДЕЛЬ СЕРВИСА"
          title="Платите по факту. Или подпишитесь и экономьте."
          sub="ПАКЕТЕАМ зарабатывает на комиссии с тиража и регулярных подписках. Конструктор — бесплатно."
        />
        <div className={`pkt-plans pkt-plans-${visible.length}`}>
          {visible.map(p=> (
            <article key={p.id} className={`card pkt-plan ${p.highlight?'pkt-plan-hl':''}`}>
              <div className="pkt-plan-head">
                <div>
                  <div className="mono upper" style={{color:'var(--pkt-muted)', marginBottom:6}}>{p.tag}</div>
                  <h3 className="pkt-h3" style={{margin:0}}>{p.name}</h3>
                </div>
                {p.highlight && <span className="stamp blue mono">популярно</span>}
              </div>
              <div className="pkt-plan-price">
                <span className="tabular">{p.price}</span>
                {p.priceSub && <small>{p.priceSub}</small>}
              </div>
              <p className="pkt-muted" style={{margin:'0 0 16px'}}>{p.accent}</p>
              <ul className="pkt-plan-bullets">
                {p.bullets.map(b=> (
                  <li key={b}>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8.2 6.5 11.5 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <button className={`btn ${p.highlight?'btn-primary':'btn-ghost'}`} style={{width:'100%'}}>
                {p.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT FORM ───────────────────────────────────────────
function ContactForm({ tweaks }){
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', company:'', email:'', tg:'', vol:'200', msg:'' });
  const upd = (k)=>(e)=> setForm(f=>({...f, [k]: e.target?.value ?? e}));
  // Tweak override for application state
  const appState = tweaks.appState || 'idle';
  const showSuccess = submitted || appState === 'submitted';
  const showLoading = appState === 'loading';
  return (
    <section id="contact" className="pkt-section">
      <div className="pkt-container">
        <div className="pkt-form-wrap">
          <div className="pkt-form-side">
            <SectionHead
              tag="ОСТАВИТЬ ЗАЯВКУ"
              title="Не уверены, что выбрать?"
              sub="Расскажите о проекте — менеджер свяжется в течение 2 часов и предложит решение."
              compact
            />
            <ul className="pkt-form-trust">
              <li><span className="mono upper">02 ч</span> среднее время первого ответа</li>
              <li><span className="mono upper">340+</span> брендов уже работает с нами</li>
              <li><span className="mono upper">NDA</span> по запросу, до старта</li>
            </ul>
            <div className="pkt-form-stamp craft-paper">
              <div className="stamp solid">PROOF · APPROVED</div>
              <p style={{fontSize:13, color:'var(--pkt-craft-dark)', margin:'8px 0 0'}}>
                Все макеты проходят цветопробу. До отгрузки — высылаем образец.
              </p>
            </div>
          </div>
          <form className="card pkt-form" onSubmit={(e)=>{e.preventDefault(); setSubmitted(true);}}>
            {showSuccess ? (
              <div className="pkt-form-success fade-up">
                <div className="pkt-form-success-mark">
                  <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">
                    <circle cx="24" cy="24" r="22" fill="var(--pkt-brand)"/>
                    <path d="M14 24 L21 31 L34 17" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="pkt-h3" style={{marginTop:16}}>Заявка отправлена</h3>
                <p className="pkt-muted">Менеджер свяжется в течение 2 часов. Номер заявки —
                  <span className="mono"> A-{Math.floor(2000 + Math.random()*8000)}</span>.
                </p>
                <button className="btn btn-ghost" style={{marginTop:16}} onClick={()=>setSubmitted(false)}>
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <>
                <div className="pkt-form-grid">
                  <label>
                    <span className="pkt-label">Имя</span>
                    <input className="input" placeholder="Анна" value={form.name} onChange={upd('name')}/>
                  </label>
                  <label>
                    <span className="pkt-label">Бренд / компания</span>
                    <input className="input" placeholder="«Ромашка»" value={form.company} onChange={upd('company')}/>
                  </label>
                  <label>
                    <span className="pkt-label">Email</span>
                    <input className="input" type="email" placeholder="anna@brand.ru" value={form.email} onChange={upd('email')}/>
                  </label>
                  <label>
                    <span className="pkt-label">Telegram <span style={{color:'var(--pkt-mute-2)'}}>(опционально)</span></span>
                    <input className="input" placeholder="@anna" value={form.tg} onChange={upd('tg')}/>
                  </label>
                  <label style={{gridColumn:'1 / -1'}}>
                    <span className="pkt-label">Что нужно сделать?</span>
                    <textarea className="input" placeholder="Например: коробка под свечи, тираж 300, доставка в Москву." value={form.msg} onChange={upd('msg')}/>
                  </label>
                </div>
                <div className="pkt-form-foot">
                  <span className="mono" style={{fontSize:12, color:'var(--pkt-muted)'}}>
                    Нажимая «Отправить», вы соглашаетесь с обработкой данных.
                  </span>
                  <button className="btn btn-primary" type="submit" disabled={showLoading}>
                    {showLoading ? 'Отправляем…' : 'Отправить заявку →'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────
function Footer(){
  return (
    <footer className="pkt-footer">
      <div className="pkt-container">
        <div className="pkt-footer-grid">
          <div>
            <div className="pkt-logo" style={{marginBottom:12}}>
              <b>ПАКЕТЕАМ</b>
              <span className="pkt-logo-tag mono">[ beta · 2026 ]</span>
            </div>
            <p className="pkt-muted" style={{fontSize:14, maxWidth:280}}>
              Онлайн-конструктор брендированной упаковки. Малые тиражи, быстрая печать, без дизайнера.
            </p>
          </div>
          <div className="pkt-footer-col">
            <div className="upper mono">Продукт</div>
            <a href="#">Конструктор</a>
            <a href="#">Каталог</a>
            <a href="#">Тарифы</a>
            <a href="#">API</a>
          </div>
          <div className="pkt-footer-col">
            <div className="upper mono">Компания</div>
            <a href="#">О нас</a>
            <a href="#">Блог</a>
            <a href="#">Вакансии</a>
            <a href="#">Контакты</a>
          </div>
          <div className="pkt-footer-col">
            <div className="upper mono">Контакты</div>
            <a href="mailto:hi@paketeam.ru">hi@paketeam.ru</a>
            <a href="tel:+78001000010">8 800 100-00-10</a>
            <a href="#">Telegram</a>
          </div>
        </div>
        <div className="pkt-footer-bottom">
          <span className="mono">© 2026 ПАКЕТЕАМ · ОГРН 1247700000000</span>
          <span className="mono">Сделано в России. Печать — в России и Беларуси.</span>
        </div>
      </div>
    </footer>
  );
}

// ── Section head helper ────────────────────────────────────
function SectionHead({ tag, title, sub, inverse, compact }){
  return (
    <div className={`pkt-sechead ${inverse?'inverse':''} ${compact?'compact':''}`}>
      <span className="mono pkt-sechead-tag">{tag}</span>
      <h2 className={compact ? 'pkt-h2 pkt-h2-sm' : 'pkt-h2'}>{title}</h2>
      {sub && <p className={`pkt-lead ${inverse?'inverse':''}`}>{sub}</p>}
    </div>
  );
}

// ── Landing (root) ─────────────────────────────────────────
export function Landing({ onNavigate, tweaks }){
  return (
    <main className="pkt-landing">
      <Hero onNavigate={onNavigate} tweaks={tweaks}/>
      <Problems/>
      <HowItWorks/>
      <Categories onNavigate={onNavigate}/>
      <Features/>
      <ConstructorDemo onNavigate={onNavigate}/>
      <Pricing tweaks={tweaks}/>
      <ContactForm tweaks={tweaks}/>
    </main>
  );
}

