/* global React, ReactDOM, Landing, Constructor, Header, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor */
// ─────────────────────────────────────────────────────────
// Корневой App: роутинг между «Главной» и «Конструктором»
// + Tweaks panel с 5 контролами
// ─────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandColor": "#2563EB",
  "heroType": "box",
  "constructorDetail": "full",
  "pricingMode": "mixed",
  "appState": "idle"
}/*EDITMODE-END*/;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [routeData, setRouteData] = React.useState(null);

  const navigate = (r, data) => {
    setRoute(r);
    setRouteData(data || null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync brand color via data-attribute
  React.useEffect(()=>{
    const color = t.brandColor;
    const map = {
      '#2563EB': null,         // default blue
      '#4F46E5': 'indigo',
      '#0EA5E9': 'azure',
      '#0F1626': 'ink',
    };
    const flag = map[color];
    if (flag) document.body.setAttribute('data-brand', flag);
    else document.body.removeAttribute('data-brand');
  }, [t.brandColor]);

  return (
    <>
      <Header onNavigate={navigate} current={route}/>
      {route === 'home' && <Landing onNavigate={navigate} tweaks={t}/>}
      {route === 'constructor' && <Constructor onNavigate={navigate} tweaks={t} initial={routeData}/>}
      {route === 'home' && <Footer/>}

      <TweaksPanel title="Tweaks · ПАКЕТЕАМ">
        <TweakSection label="Цветовая тема">
          <TweakColor
            label="Основной акцент"
            value={t.brandColor}
            options={['#2563EB', '#4F46E5', '#0EA5E9', '#0F1626']}
            onChange={(v)=>setTweak('brandColor', v)}
          />
        </TweakSection>

        <TweakSection label="Тип упаковки">
          <TweakRadio
            label="В hero"
            value={t.heroType}
            options={[
              { value:'box',     label:'Коробка' },
              { value:'bag',     label:'Пакет' },
              { value:'cup',     label:'Стакан' },
              { value:'sticker', label:'Стикер' },
            ]}
            onChange={(v)=>setTweak('heroType', v)}
          />
        </TweakSection>

        <TweakSection label="Конструктор">
          <TweakRadio
            label="Детализация"
            value={t.constructorDetail}
            options={[
              { value:'compact', label:'Compact' },
              { value:'full',    label:'Full' },
            ]}
            onChange={(v)=>setTweak('constructorDetail', v)}
          />
        </TweakSection>

        <TweakSection label="Тарифная модель">
          <TweakSelect
            label="Что показывать"
            value={t.pricingMode}
            options={[
              { value:'mixed',        label:'Комиссия + подписка' },
              { value:'commission',   label:'Только комиссия' },
              { value:'subscription', label:'Только подписка' },
            ]}
            onChange={(v)=>setTweak('pricingMode', v)}
          />
        </TweakSection>

        <TweakSection label="Состояние заявки">
          <TweakRadio
            label="Forma"
            value={t.appState}
            options={[
              { value:'idle',      label:'Пустая' },
              { value:'loading',   label:'Загрузка' },
              { value:'submitted', label:'Отправлена' },
            ]}
            onChange={(v)=>setTweak('appState', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// We need Footer here so it doesn't render on constructor route
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

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
