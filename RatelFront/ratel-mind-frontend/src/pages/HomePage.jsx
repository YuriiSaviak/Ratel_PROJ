// src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <main className="main">
      {/* HERO */}
      <section className="homeHero">
        <div className="container homeHero__grid">
          <div className="homeHero__left">
            <span className="homeKicker">Ratel Mind</span>

            <h1 className="homeHero__title">
              Pierwszym krokiem do siły jest świadomość.
              <br />
              Dopiero wtedy można ruszyć w stronę celu.
            </h1>

            <p className="homeHero__subtitle">
              Sprawdź swoją odporność psychiczną i zobacz, jak funkcjonujesz w
              trudnych sytuacjach — w czterech filarach: poznawczym, emocjonalnym,
              behawioralnym i społecznym.
            </p>

            <div className="homeHero__cta">
              <a href="/test" className="btn btn--primary">
                Zrób test
              </a>
              <a href="/about" className="btn btn--ghost">
                O nas
              </a>
            </div>

            <div className="homeHero__meta">
              <span className="homeMetaItem">⏱ Test zajmuje ok. 10 minut</span>
              <span className="homeMetaDot">•</span>
              <span className="homeMetaItem">Raport ogólny i szczegółowy — w cenie</span>
            </div>
          </div>

          <div className="homeHero__right">
            {/* PLACEHOLDER: wstawisz tu obrazek */}
            {/* <img className="homeHero__image" src="/images/hero.jpg" alt="Ratel Mind" /> */}
            <div className="homeHero__imagePlaceholder">
              Miejsce na zdjęcie (Hero)
            </div>

            <div className="homeHero__badge">
              <div className="homeHero__badgeTitle">20 minut do pierwszych wniosków</div>
              <div className="homeHero__badgeText">
                Test → Raport → Pierwsze działania
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="homeHow">
        <div className="container">
          <div className="homeSectionHead">
            <h2>Jak to działa? Zacznij działać w 20 min.</h2>
            <p>
              Wypełniasz test, dostajesz raport i od razu wiesz, co wzmacniać.
            </p>
          </div>

          <div className="homeSteps">
            <article className="homeStepCard">
              <div className="homeStepCard__num">Krok 1</div>
              <h3 className="homeStepCard__title">Zrób test (10 min)</h3>
              <p className="homeStepCard__text">
                48 stwierdzeń na skali 1–5. Odpowiadasz szybko, intuicyjnie —
                bez “zastanawiania się godzinę”.
              </p>
            </article>

            <article className="homeStepCard">
              <div className="homeStepCard__num">Krok 2</div>
              <h3 className="homeStepCard__title">Odbierz raport (5 min)</h3>
              <p className="homeStepCard__text">
                Dostajesz poziom odporności, liczbę punktów i profil czterech
                filarów oraz umiejętności składowych.
              </p>
            </article>

            <article className="homeStepCard">
              <div className="homeStepCard__num">Krok 3</div>
              <h3 className="homeStepCard__title">Zapoznaj się i zacznij działać (5 min)</h3>
              <p className="homeStepCard__text">
                Wiesz, które obszary są Twoją siłą, a które warto wzmocnić —
                możesz planować kolejne kroki świadomie.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="homeWhy">
        <div className="container homeWhy__grid">
          <div className="homeWhy__left">
            {/* PLACEHOLDER: obrazek / grafika */}
            {/* <img className="homeWhy__image" src="/images/why.jpg" alt="Dlaczego warto" /> */}
            <div className="homeWhy__imagePlaceholder">
              Miejsce na zdjęcie (Dlaczego warto)
            </div>
          </div>

          <div className="homeWhy__right">
            <div className="homeSectionHead">
              <h2>Dlaczego warto?</h2>
              <p>
                Życie potrafi zaskoczyć — czasem boli, czasem przytłacza.
                <br />
                Nie możesz kontrolować wszystkiego, ale możesz się przygotować.
              </p>
            </div>

            <div className="homeWhy__box">
              <p className="homeWhy__quote">
                Odporność psychiczna to nie zbroja.
                <br />
                To umiejętność powrotu do równowagi, gdy świat się chwieje.
              </p>

              <div className="homeWhy__actions">
                <a href="/test" className="btn btn--primary">
                  Zrób test teraz
                </a>
                <a href="/workshops" className="btn btn--ghost">
                  Szkolenia
                </a>
              </div>
            </div>

            <div className="homeWhy__bullets">
              <div className="homeBullet">
                <span className="homeBullet__dot" />
                <span>
                  Wyniki w czterech filarach: poznawczy, emocjonalny, behawioralny,
                  społeczny.
                </span>
              </div>
              <div className="homeBullet">
                <span className="homeBullet__dot" />
                <span>Prosto, szybko, bez barier — raport od razu po teście.</span>
              </div>
              <div className="homeBullet">
                <span className="homeBullet__dot" />
                <span>Świetny punkt startu do rozwoju i pracy warsztatowej.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
