import { Link } from "react-router-dom";
import ratelImage from "../assets/ratel_image.png";
import ratelLogo from "../assets/SVG_ratel_mind_logo.svg";
const advantages = [
  {
    title: "Podejście oparte na nauce",
    text: "Nasze narzędzia są tworzone przez psychologów i zgodne z podejściami opartymi na dowodach naukowych, stosowanymi w środowisku klinicznym oraz w pracy z osobami działającymi pod presją.",
  },
  {
    title: "Prywatność i poufność",
    text: "Twoje wyniki są prywatne. Zbieramy wyłącznie niezbędne dane i traktujemy je z należytą starannością oraz pełną przejrzystością.",
  },
  {
    title: "Praktyka, nie teoria",
    text: "Skupiamy się na konkretnych, możliwych do wdrożenia wnioskach – nie na abstrakcyjnych koncepcjach. Otrzymujesz jasność, a nie dodatkowe wątpliwości.",
  },
  {
    title: "Odpowiedź na współczesne wyzwania",
    text: "Presja startupów. Stres akademicki. Wypalenie liderskie. Rozumiemy realne środowiska funkcjonowania i projektujemy rozwiązania, które im odpowiadają.",
  },
  {
    title: "Standardy etyczne",
    text: "Bez manipulacji. Bez komunikacji opartej na strachu. Tylko odpowiedzialna psychologia.",
  },
];

const steps = [
  {
    number: "1",
    title: "Rozwiąż test",
    text: "Poświęć około 5–7 minut. Odpowiedz na pytania, które pomogą lepiej zrozumieć, jak reagujesz na stres, presję i wyzwania. Nie ma dobrych ani złych odpowiedzi. Liczy się szczerość wobec siebie.",
  },
  {
    number: "2",
    title: "Otrzymaj swój osobisty raport",
    text: "Po zakończeniu od razu zobaczysz swój indywidualny wynik oraz opis profilu odporności psychicznej. Twoje odpowiedzi są również analizowane w szerszym kontekście przez naszych psychologów, aby w razie potrzeby móc zaoferować Ci głębsze wsparcie.",
  },
  {
    number: "3",
    title: "Umów 30-minutową konsultację",
    text: "Opcjonalnie możesz umówić 30-minutową sesję z jednym z naszych psychologów, aby lepiej zrozumieć swój profil odporności psychicznej i otrzymać praktyczne wskazówki dopasowane do Twojej sytuacji. To rozmowa wspierająca, a nie oceniająca.",
  },
  {
    number: "4",
    title: "Wybierz, co dalej",
    text: "Decyzja zawsze należy do Ciebie. Możesz dołączyć do kalendarza treningu odporności, umówić kolejne spotkania albo po prostu wdrożyć wnioski we własnym tempie. Nie ma presji. Czasem sama świadomość jest już początkiem zmiany.",
  },
];

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="homeHero">
  <div className="homeHero__grid">
    <div className="container homeHero__content">
      <h1 className="homeHero__title">
        Jak odporna jest Twoja psychika w tym niepewnym świecie?
      </h1>

      <p className="homeHero__text">
        Sprawdź swoją odporność psychiczną, wykonując bezpłatny test
        opracowany przez psychologów.
      </p>

      <Link to="/test" className="btn btn--primary">
        Rozwiąż test
      </Link>
    </div>

    <div
  className="homeHero__visual"
  style={{ backgroundImage: `url(${ratelImage})` }}
/>
  </div>
</section>

      <section className="homeIntro">
        <div className="homeIntro__line">
          <div className="homeAvatarIcon" />
          <div className="homeIntro__divider" />
        </div>

        <div className="homeIntro__brand">
  <img
    src={ratelLogo}
    alt="Ratel Mind"
    className="homeIntro__logo"
  />
</div>

        <h2 className="homeSectionTitle homeSectionTitle--left">
          Profesjonalnie i rzetelnie
        </h2>

        <p className="homeIntro__lead">
          Nasza praca opiera się na badaniach psychologicznych, standardach
          etycznych oraz doświadczeniu w realnych warunkach. Zamiast
          obiecywać szybkie rozwiązania, oferujemy uporządkowane narzędzia
          zaprojektowane tak, aby wzmacniać odporność psychiczną w dłuższej
          perspektywie.
        </p>

        <div className="homeAdvantages">
          {advantages.map((item) => (
            <article key={item.title} className="homeAdvantage">
              <div className="homeAdvantage__icon" aria-hidden="true">
                <span>🛡</span>
              </div>

              <div className="homeAdvantage__content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="homeCallout">
        <div className="homeCallout__content">
          <p className="homeCallout__title">
            Nie jesteś „zepsuty”. Jesteś po prostu przeciążony. I to można
            zmienić.
          </p>

          <p className="homeCallout__text">
            Pokażemy Ci, jak żyć w większej równowadze psychicznej, bez
            ciągłego napięcia i potrzeby szukania potwierdzenia u innych.
          </p>
        </div>

        <Link to="/test" className="btn btn--primary">
          Rozwiąż test
        </Link>
      </section>

      <section className="homeHow">
        <h2 className="homeSectionTitle homeSectionTitle--center">
          Jak to działa
        </h2>

        <div className="homeSteps">
          {steps.map((step) => (
            <article key={step.number} className="homeStepCard">
              <div className="homeStepCard__top">
                <span className="homeStepCard__number">{step.number}</span>
                <h3>{step.title}</h3>
              </div>

              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homeContact">
        <div className="homeIntro__line">
          <div className="homeAvatarIcon" />
          <div className="homeIntro__divider" />
        </div>

        <h2 className="homeSectionTitle homeSectionTitle--center">
          Masz jeszcze pytania?
        </h2>

        <p className="homeContact__lead">
          Jesteśmy tutaj, aby Ci pomóc i wnieść jasność.
        </p>

        <div className="homeContact__list">
          <a
            className="homeContact__item"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <span className="homeContact__icon">◎</span>
            <span>@Ratel_Mind</span>
          </a>

          <a
            className="homeContact__item"
            href="https://linkedin.com/company/ratelmind"
            target="_blank"
            rel="noreferrer"
          >
            <span className="homeContact__icon">in</span>
            <span>linkedin.com/company/ratelmind</span>
          </a>

          <a className="homeContact__item" href="tel:+48789000000">
            <span className="homeContact__icon">▣</span>
            <span>Napisz do nas +48 789 000 000</span>
          </a>
        </div>
      </section>
    </div>
  );
}