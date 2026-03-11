// --- Ratel Mind Test Data (PL) ---
// 48 stwierdzeń, poprawne odwrócenia (O), zasady punktacji,
// poziomy ogólne, poziomy filarów i umiejętności, mapowanie do raportu.

// ===== SKALA =====
export const SCALE = {
  min: 1,
  max: 5,
  labels: {
    1: "Nigdy",
    2: "Rzadko",
    3: "Czasami",
    4: "Zazwyczaj",
    5: "Zawsze",
  },
};

// ===== POZIOMY OGÓLNE =====
export const RATEL_LEVELS = [
  { min: 48, max: 60, label: 1 },
  { min: 61, max: 120, label: 2 },
  { min: 121, max: 180, label: 3 },
  { min: 181, max: 219, label: 4 },
  { min: 220, max: 240, label: 5 },
];

// ===== POZIOMY FILARÓW I UMIEJĘTNOŚCI =====
export const PILLAR_LEVELS = [
  { min: 12, max: 24, label: "Niski" },
  { min: 25, max: 49, label: "Średni" },
  { min: 50, max: 60, label: "Wysoki" },
];

export const SKILL_LEVELS = [
  { min: 4, max: 7, label: "Niski" },
  { min: 8, max: 15, label: "Średni" },
  { min: 16, max: 20, label: "Wysoki" },
];

// ===== FILARY i UMIEJĘTNOŚCI (UWAGA: wartości muszą pasować do TestPage.jsx) =====
// Zostawiamy angielskie wartości jako "ID", żeby nie rozwalić mapowania w UI.
// Tłumaczenia wyświetlane są niżej (PILLAR_DETAILS, LEVEL_DETAILS itp.).
export const PILLARS = {
  Cognitive: "Cognitive",
  Emotional: "Emotional",
  Behavioral: "Behavioral",
  Social: "Social",
};

export const SKILLS = {
  Agency: "Agency",
  CognitiveFlexibility: "Cognitive Flexibility",
  SituationAnalysis: "Situation Analysis",

  EmotionRegulation: "Emotion Regulation",
  StressResilience: "Stress Resilience",
  Recovery: "Recovery",

  DecisionMaking: "Decision-Making",
  Perseverance: "Perseverance",
  GoalDirectedAction: "Goal-Directed Action",

  SupportNetwork: "Support Network",
  Assertiveness: "Assertiveness",
  ResilienceInRelationships: "Resilience in Relationships",
};

// ===== PYTANIA (PL, nowa wersja) =====
// Zmiana wg zamawiającego: pytania 26, 14 i 8 liczone NORMALNIE (nie odwrócone).
export const QUESTIONS = [
  { id: 1,  text: "Trafnie rozpoznaję moment, w którym potrzebuję wsparcia drugiego człowieka.", pillar: PILLARS.Social,      skill: SKILLS.SupportNetwork,           reversed: false },
  { id: 2,  text: "Przed podjęciem decyzji analizuję dostępne informacje, zamiast działać impulsywnie.",                      pillar: PILLARS.Cognitive,   skill: SKILLS.SituationAnalysis,         reversed: false },
  { id: 3,  text: "Nawet w trudnych momentach potrafię dostrzec celowość tego, co się dzieje.",                               pillar: PILLARS.Emotional,   skill: SKILLS.Recovery,                 reversed: false },
  { id: 4,  text: "Potrafię skutecznie zareagować na hejt.",                                                                  pillar: PILLARS.Social,      skill: SKILLS.ResilienceInRelationships, reversed: false },
  { id: 5,  text: "Zniechęcam się, gdy postępy są bardzo powolne.",                                                           pillar: PILLARS.Behavioral,  skill: SKILLS.Perseverance,             reversed: true  },

  { id: 6,  text: "Potrafię zmierzyć się z nowymi wyzwaniami, nawet jeśli nie znam jeszcze rozwiązania.",                      pillar: PILLARS.Cognitive,   skill: SKILLS.Agency,                   reversed: false },
  { id: 7,  text: "Wyrażam swoje zdanie, nawet jeśli różni się od zdania większości.",                                        pillar: PILLARS.Social,      skill: SKILLS.Assertiveness,            reversed: false },
  { id: 8,  text: "Po trudnym doświadczeniu sprawnie odzyskuję siły.",                                                        pillar: PILLARS.Emotional,   skill: SKILLS.Recovery,                 reversed: false }, // NORMAL
  { id: 9,  text: "W trudnych relacjach otwarcie komunikuję swoje oczekiwania.",                                              pillar: PILLARS.Social,      skill: SKILLS.Assertiveness,            reversed: false },
  { id: 10, text: "Nie potrafię zarządzać emocjami tak, aby wspierały moje działania.",                                       pillar: PILLARS.Emotional,   skill: SKILLS.EmotionRegulation,        reversed: true  },

  { id: 11, text: "Znam swoje schematy działania – wiem, co mnie motywuje, a co mnie osłabia w trudnych momentach.",          pillar: PILLARS.Cognitive,   skill: SKILLS.SituationAnalysis,         reversed: false },
  { id: 12, text: "Niepowodzenia traktuję jako okazję do nauki.",                                                              pillar: PILLARS.Behavioral,  skill: SKILLS.Perseverance,             reversed: false },
  { id: 13, text: "Trafnie oceniam swoje mocne i słabe strony.",                                                               pillar: PILLARS.Cognitive,   skill: SKILLS.SituationAnalysis,         reversed: false },
  { id: 14, text: "Wierzę, że trudne doświadczenia mogą przyczynić się do mojego rozwoju.",                                    pillar: PILLARS.Cognitive,   skill: SKILLS.CognitiveFlexibility,      reversed: false }, // NORMAL
  { id: 15, text: "W sytuacjach stresowych potrafię zapanować nad reakcjami mojego ciała.",                                    pillar: PILLARS.Emotional,   skill: SKILLS.StressResilience,          reversed: false },

  { id: 16, text: "Nie rozróżniam konstruktywnej krytyki od nieuzasadnionego hejtu.",                                         pillar: PILLARS.Social,      skill: SKILLS.ResilienceInRelationships, reversed: true  },
  { id: 17, text: "Jeśli dotychczasowe podejście nie działa, zmieniam swoje założenia i sposób myślenia o problemie.",        pillar: PILLARS.Cognitive,   skill: SKILLS.CognitiveFlexibility,      reversed: false },
  { id: 18, text: "Nie unikam ryzyka, jeśli widzę w nim potencjalną wartość.",                                                pillar: PILLARS.Behavioral,  skill: SKILLS.DecisionMaking,           reversed: false },
  { id: 19, text: "Gdy sytuacja tego wymaga, zmieniam strategię, ale nie rezygnuję z celu.",                                  pillar: PILLARS.Behavioral,  skill: SKILLS.GoalDirectedAction,        reversed: false },
  { id: 20, text: "W stresujących sytuacjach zachowuję jasność myślenia.",                                                    pillar: PILLARS.Behavioral,  skill: SKILLS.DecisionMaking,           reversed: false },

  { id: 21, text: "Po porażce potrafię szybko odzyskać motywację do działania.",                                              pillar: PILLARS.Behavioral,  skill: SKILLS.Perseverance,             reversed: false },
  { id: 22, text: "W trudnych sytuacjach koncentruję się na tym, co mogę kontrolować.",                                       pillar: PILLARS.Cognitive,   skill: SKILLS.Agency,                   reversed: false },
  { id: 23, text: "Nawet w bardzo stresujących sytuacjach potrafię zachować się w sposób adekwatny społecznie i nie ranić innych.", pillar: PILLARS.Emotional, skill: SKILLS.EmotionRegulation, reversed: false },
  { id: 24, text: "Dostosowuję sposób działania do zmieniających się okoliczności.",                                          pillar: PILLARS.Behavioral,  skill: SKILLS.GoalDirectedAction,        reversed: false },
  { id: 25, text: "Wyciągam wnioski z własnych błędów i stosuję je w przyszłości.",                                           pillar: PILLARS.Behavioral,  skill: SKILLS.Perseverance,             reversed: false },

  { id: 26, text: "Wierzę, że moje działania mają realny wpływ na to, co dzieje się w moim życiu.",                           pillar: PILLARS.Cognitive,   skill: SKILLS.Agency,                   reversed: false }, // NORMAL
  { id: 27, text: "Zauważam, kiedy emocje zaczynają wpływać na moje zachowanie.",                                             pillar: PILLARS.Emotional,   skill: SKILLS.EmotionRegulation,        reversed: false },
  { id: 28, text: "Stresujące sytuacje często traktuję jako wyzwanie, a nie zagrożenie.",                                     pillar: PILLARS.Emotional,   skill: SKILLS.StressResilience,          reversed: false },
  { id: 29, text: "Nawet podczas konfliktu odnoszę się do rozmówcy z szacunkiem.",                                            pillar: PILLARS.Social,      skill: SKILLS.ResilienceInRelationships, reversed: false },
  { id: 30, text: "Pod wpływem stresu potrafię działać zdecydowanie i skutecznie.",                                           pillar: PILLARS.Emotional,   skill: SKILLS.StressResilience,          reversed: false },

  { id: 31, text: "Formułuję cele, które są konkretne i jasno określone.",                                                    pillar: PILLARS.Behavioral,  skill: SKILLS.GoalDirectedAction,        reversed: false },
  { id: 32, text: "Wiem, kto może mi pomóc w konkretnej sytuacji.",                                                           pillar: PILLARS.Social,      skill: SKILLS.SupportNetwork,           reversed: false },
  { id: 33, text: "Rozpoznaję sygnały w moim ciele, które wskazują, że emocje narastają.",                                    pillar: PILLARS.Emotional,   skill: SKILLS.EmotionRegulation,        reversed: false },
  { id: 34, text: "Kiedy coś nie idzie po mojej myśli, podejmuję konkretne kroki, aby to zmienić.",                           pillar: PILLARS.Cognitive,   skill: SKILLS.Agency,                   reversed: false },
  { id: 35, text: "Trudne chwile nie zaburzają na długo mojego codziennego funkcjonowania.",                                  pillar: PILLARS.Emotional,   skill: SKILLS.Recovery,                 reversed: false },

  { id: 36, text: "W kryzysie staram się szukać nowych, nietypowych rozwiązań.",                                              pillar: PILLARS.Cognitive,   skill: SKILLS.CognitiveFlexibility,      reversed: false },
  { id: 37, text: "Nie potrafię podejmować decyzji, gdy nie mam wszystkich informacji.",                                      pillar: PILLARS.Behavioral,  skill: SKILLS.DecisionMaking,           reversed: true  },
  { id: 38, text: "Stawiam granice w sposób, który nie narusza godności innych osób.",                                        pillar: PILLARS.Social,      skill: SKILLS.Assertiveness,            reversed: false },
  { id: 39, text: "Napięcie mobilizuje mnie do działania, zamiast mnie blokować.",                                            pillar: PILLARS.Emotional,   skill: SKILLS.StressResilience,          reversed: false },
  { id: 40, text: "W kryzysie staram się patrzeć na sytuację obiektywnie, z różnych perspektyw.",                             pillar: PILLARS.Cognitive,   skill: SKILLS.SituationAnalysis,         reversed: false },

  { id: 41, text: "Utrzymuję efektywność działania mimo presji czasu.",                                                       pillar: PILLARS.Behavioral,  skill: SKILLS.DecisionMaking,           reversed: false },
  { id: 42, text: "Po trudnym doświadczeniu stosunkowo szybko odzyskuję wewnętrzną równowagę.",                               pillar: PILLARS.Emotional,   skill: SKILLS.Recovery,                 reversed: false },
  { id: 43, text: "Umiem odmówić, gdy coś jest niezgodne z moimi wartościami.",                                               pillar: PILLARS.Social,      skill: SKILLS.Assertiveness,            reversed: false },
  { id: 44, text: "Potrafię spojrzeć na problem z innej perspektywy, gdy sytuacja tego wymaga.",                              pillar: PILLARS.Cognitive,   skill: SKILLS.CognitiveFlexibility,      reversed: false },
  { id: 45, text: "Wspieram innych w trudnych sytuacjach, co wzmacnia również mnie.",                                         pillar: PILLARS.Social,      skill: SKILLS.SupportNetwork,           reversed: false },

  { id: 46, text: "Moje cele są zgodne z moimi wartościami, co daje mi poczucie sensu.",                                      pillar: PILLARS.Behavioral,  skill: SKILLS.GoalDirectedAction,        reversed: false },
  { id: 47, text: "Przyjmuję konstruktywną krytykę bez nadmiernych emocji.",                                                  pillar: PILLARS.Social,      skill: SKILLS.ResilienceInRelationships, reversed: false },
  { id: 48, text: "Potrafię poprosić o pomoc, gdy jej potrzebuję.",                                                           pillar: PILLARS.Social,      skill: SKILLS.SupportNetwork,           reversed: false },
];

// ===== KLUCZ ODPOWIEDZI (mapping: filary → umiejętności → pytania) =====
export const ANSWER_KEY = {
  Cognitive: {
    Agency: [6, 22, 26, 34],
    "Cognitive Flexibility": [14, 17, 36, 44],
    "Situation Analysis": [2, 11, 13, 40],
  },
  Emotional: {
    "Emotion Regulation": [10, 23, 27, 33], // 10 odwrócone, reszta normal
    "Stress Resilience": [15, 28, 30, 39],
    Recovery: [3, 8, 35, 42], // 8 normal
  },
  Behavioral: {
    "Decision-Making": [18, 20, 37, 41], // 37 odwrócone
    Perseverance: [5, 12, 21, 25],       // 5 odwrócone
    "Goal-Directed Action": [19, 24, 31, 46],
  },
  Social: {
    "Support Network": [1, 32, 45, 48],
    Assertiveness: [7, 9, 38, 43],
    "Resilience in Relationships": [4, 16, 29, 47], // 16 odwrócone
  },
};

// ===== PUNKTACJA =====
export function scoreAnswer(qId, val) {
  if (!val || val < 1 || val > 5) return 0;

  const q = QUESTIONS.find((x) => x.id === qId);
  const reversed = !!q?.reversed;

  return reversed ? (6 - val) : val;
}

export function getRatelLevel(score) {
  return RATEL_LEVELS.find((l) => score >= l.min && score <= l.max)?.label ?? 0;
}
export function getPillarLevel(score) {
  return PILLAR_LEVELS.find((l) => score >= l.min && score <= l.max)?.label ?? "Nieznany";
}
export function getSkillLevel(score) {
  return SKILL_LEVELS.find((l) => score >= l.min && score <= l.max)?.label ?? "Nieznany";
}

// ===== OBLICZANIE WYNIKÓW =====
export function computeScores(answers) {
  const scored = {};
  let total = 0;

  for (const q of QUESTIONS) {
    const raw = answers?.[q.id] ?? 0;
    const s = scoreAnswer(q.id, raw);
    scored[q.id] = s;
    total += s;
  }

  const pillars = {};
  for (const pillar of Object.values(PILLARS)) {
    const ids = QUESTIONS.filter((q) => q.pillar === pillar).map((q) => q.id);
    const sum = ids.reduce((a, id) => a + (scored[id] || 0), 0);
    pillars[pillar] = {
      sum,
      level: getPillarLevel(sum),
      max: 60,
      pct: Math.round((sum / 60) * 100),
    };
  }

  const skills = {};
  for (const [p, sk] of Object.entries(ANSWER_KEY)) {
    skills[p] = {};
    for (const [s, ids] of Object.entries(sk)) {
      const sum = ids.reduce((a, id) => a + (scored[id] || 0), 0);
      skills[p][s] = {
        sum,
        level: getSkillLevel(sum),
        max: 20,
        pct: Math.round((sum / 20) * 100),
      };
    }
  }

  return {
    totalScore: total,
    ratelLevel: getRatelLevel(total),
    pillars,
    skills,
    scoredAnswers: scored,
  };
}

// ---- Opisy poziomów ogólnych (PL) ----
export const LEVEL_DETAILS = {
  "Poziom 1": {
    code: "POZIOM I — Nów",
    motto: "Z ciemności rodzi się kierunek.",
    description:
      "To początek drogi. Twoja odporność psychiczna dopiero się kształtuje. Możesz częściej reagować emocjonalnie, mieć trudność z utrzymaniem równowagi lub czuć brak kontroli. Ale to moment, w którym pojawia się świadomość — i decyzja o zmianie.",
    quote:
      "W ciszy nowiu rodzi się intencja — pierwszy krok w stronę światła.",
    tip: "Zatrzymaj się i spójrz w głąb siebie — to początek Twojego rozwoju.",
  },
  "Poziom 2": {
    code: "🌒 POZIOM II — Sierp przybywający",
    motto: "Światło przebija się przez chmury.",
    description:
      "Zaczynasz odzyskiwać kontrolę i pewność działania. Stres wciąż bywa wyzwaniem, ale coraz częściej potrafisz go zrozumieć i wykorzystać. Na tym etapie uczysz się, jak emocje, myśli i zachowania współgrają ze sobą.",
    quote:
      "Pierwszy blask przecina ciemność — świadomość zamienia się w ruch.",
    tip: "Każdy krok naprzód wzmacnia Twoje fundamenty.",
  },
  "Poziom 3": {
    code: "🌓 POZIOM III — Pierwsza kwadra",
    motto: "Równowaga między cieniem a światłem.",
    description:
      "To etap stabilizacji. Rozumiesz swoje reakcje na stres i lepiej zarządzasz emocjami. Potrafisz działać mimo niepewności i wykorzystywać doświadczenie, by zachować spokój. To faza świadomego i elastycznego działania.",
    quote:
      "Światło i cień współistnieją — razem tworzą całość.",
    tip: "Buduj na swoich mocnych stronach — wchodzisz w fazę równowagi.",
  },
  "Poziom 4": {
    code: "🌔 POZIOM IV — Garb przybywający",
    motto: "Światło nabiera mocy.",
    description:
      "Twoja odporność psychiczna jest ugruntowana. Zachowujesz jasność myślenia w trudnych momentach, regulujesz emocje i działasz skutecznie. Twoja wewnętrzna równowaga i determinacja są widoczne dla innych.",
    quote:
      "Światło rośnie — wewnętrzna siła staje się zewnętrznym spokojem.",
    tip: "Twoja obecność inspiruje innych. Pielęgnuj tę stabilność.",
  },
  "Poziom 5": {
    code: "🌕 POZIOM V — Pełnia",
    motto: "Światło w pełni.",
    description:
      "To najwyższy poziom równowagi psychicznej. Działasz z pełną świadomością emocji, zasobów i celów. Zachowujesz spokój w chaosie, wspierasz innych i zamieniasz doświadczenia w mądrość. Nie szukasz już światła — Ty nim jesteś.",
    quote:
      "Pełnia nie szuka potwierdzenia — świeci, bo zna swoje źródło.",
    tip: "Twoją siłą jest spokój. Dziel się nim z innymi.",
  },
};

// ---- Opisy filarów i umiejętności (PL) ----
// (Klucze pozostają zgodne z TestPage.jsx / obliczeniami)
export const PILLAR_DETAILS = {
  [PILLARS.Cognitive]: {
    title: "🌒 Filar poznawczy — Światło świadomości",
    description:
      "Pokazuje, jak działa Twoje myślenie w wymagających sytuacjach: jak rozpoznajesz wzorce, interpretujesz rzeczywistość i podejmujesz decyzje w oparciu o fakty — nawet gdy „światła” jest mało.",
    skills: {
      Agency:
        "Wiara we własny wpływ na wydarzenia i gotowość do działania mimo niepewności.",
      "Cognitive Flexibility":
        "Umiejętność zmiany perspektywy i reinterpretowania trudnych doświadczeń.",
      "Situation Analysis":
        "Zdolność realistycznej oceny faktów i zasobów przed podjęciem decyzji.",
    },
  },
  [PILLARS.Emotional]: {
    title: "🌓 Filar emocjonalny — Wewnętrzne światło",
    description:
      "Pokazuje, jak zarządzasz emocjami i energią: zdolność utrzymania spokoju, równowagi i elastyczności pod presją.",
    skills: {
      "Emotion Regulation":
        "Świadomość i regulacja emocji w sposób wspierający równowagę.",
      "Stress Resilience":
        "Umiejętność zachowania skuteczności i opanowania pod presją.",
      Recovery:
        "Zdolność do odzyskiwania równowagi po trudnych doświadczeniach.",
    },
  },
  [PILLARS.Behavioral]: {
    title: "🌔 Filar behawioralny — Energia działania",
    description:
      "Pokazuje, jak decyzje i determinacja przekładają się na realne działanie: gotowość do ryzyka, wytrwałość i konsekwencję w dążeniu do celów.",
    skills: {
      "Decision-Making":
        "Gotowość do podejmowania decyzji nawet bez pełnej jasności.",
      Perseverance:
        "Umiejętność uczenia się na błędach i kontynuowania działania mimo przeszkód.",
      "Goal-Directed Action":
        "Zdolność utrzymania kierunku i sensu działania, nawet gdy warunki się zmieniają.",
    },
  },
  [PILLARS.Social]: {
    title: "🌕 Filar społeczny — Krąg relacji",
    description:
      "Pokazuje, jak korzystasz z relacji i wsparcia: równowaga między dawaniem i braniem, mówieniem i słuchaniem — światło, które rośnie dzięki innym.",
    skills: {
      "Support Network":
        "Umiejętność proszenia o pomoc i budowania wspierających relacji.",
      Assertiveness:
        "Zdolność jasnego i spokojnego wyrażania potrzeb oraz stawiania granic z szacunkiem.",
      "Resilience in Relationships":
        "Umiejętność utrzymania równowagi i spokoju w napiętych sytuacjach.",
    },
  },
};
