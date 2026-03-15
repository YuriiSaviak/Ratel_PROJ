import {useEffect, useMemo, useState, useRef, RefObject} from "react";
import {Location, useLocation} from "react-router-dom";
import {
    QUESTIONS,
    SCALE,
    computeScores,
    LEVEL_DETAILS,
    PILLAR_DETAILS,
} from "../testData";
import {FinalResult, GlobalStats, Pillar, RoomRankingEntry, RoomStats, Skill} from "../types/Types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PILLAR_ORDER: Pillar[] = [Pillar.Cognitive, Pillar.Emotional, Pillar.Behavioral, Pillar.Social];

const PILLAR_SKILLS_ORDER: Record<Pillar, Skill[]> = {
    [Pillar.Cognitive]: [Skill.Agency, Skill.CognitiveFlexibility, Skill.SituationAnalysis],
    [Pillar.Emotional]: [Skill.EmotionalRegulation, Skill.StressResilience, Skill.Recovery],
    [Pillar.Behavioral]: [Skill.DecisionMaking, Skill.Perseverance, Skill.GoalDirectedAction],
    [Pillar.Social]: [Skill.SupportNetwork, Skill.Assertiveness, Skill.ResilienceInRelationships],
};

function getLevelBadgeClass(level: string | null) {
    if (!level) return "levelBadge levelBadge--medium";
    const l = level.toLowerCase();
    if (l.startsWith("high")) return "levelBadge levelBadge--high";
    if (l.startsWith("low")) return "levelBadge levelBadge--low";
    return "levelBadge levelBadge--medium";
}

export default function TestPage() {
    const location: Location = useLocation();
    const search: URLSearchParams = new URLSearchParams(location.search);
    const roomCode: string | null = (search.get("room") || "").trim() || null;
    const isEventMode: boolean = !!roomCode;

    const STORAGE_PREFIX = isEventMode
        ? `ratel_test_v2_room_${roomCode}`
        : "ratel_test_v2_default";
    const PROGRESS_KEY = `${STORAGE_PREFIX}_progress`;
    const RESULT_KEY = `${STORAGE_PREFIX}_result`;

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [completed, setCompleted] = useState(false);

    const [nickname, setNickname] = useState("");
    const [nicknameLocked, setNicknameLocked] = useState(false);

    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
    const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
    const [resultMeta, setResultMeta] = useState<FinalResult | null>(null);

    const [showResult, setShowResult] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const resultRef: RefObject<HTMLDivElement | null> = useRef(null);

    const currentQuestion = QUESTIONS[currentIndex];
    const answeredCount = useMemo(
        () => Object.keys(answers).length,
        [answers]
    );
    const hasAnswers = answeredCount > 0;
    const hasResult = !!resultMeta;
    const hasInProgress = hasAnswers && !completed && !hasResult;

    const progressPct = ((currentIndex + 1) / QUESTIONS.length) * 100;

    // ---- load from localStorage ----
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem(PROGRESS_KEY);
            if (savedProgress) {
                const p = JSON.parse(savedProgress);
                setAnswers(p.answers || {});
                setCurrentIndex(p.currentIndex || 0);
                setCompleted(!!p.completed);
                if (isEventMode && p.nickname) {
                    setNickname(p.nickname);
                    setNicknameLocked(true);
                }
            }
        } catch (e) {
            console.error("Failed to read progress", e);
        }

        try {
            const savedResult = localStorage.getItem(RESULT_KEY);
            if (savedResult) {
                const r = JSON.parse(savedResult);
                setResultMeta(r.meta || r.resultMeta || null);
                setGlobalStats(r.globalStats || null);
                setRoomStats(r.roomStats || null);
                if (r.completed) setCompleted(true);
                // showResult оставляем false – юзер сам жмёт "View your result"
            }
        } catch (e) {
            console.error("Failed to read result", e);
        }
    }, [PROGRESS_KEY, RESULT_KEY, isEventMode]);

    // ---- save progress ----
    useEffect(() => {
        try {
            const payload = {
                answers,
                currentIndex,
                completed,
                nickname: isEventMode ? nickname : null,
            };
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(payload));
        } catch (e) {
            console.error("Failed to save progress", e);
        }
    }, [answers, currentIndex, completed, nickname, PROGRESS_KEY, isEventMode]);

    const scrollToResult = () => {
        if (resultRef.current) {
            resultRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        } else {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    const handleOpenTest = (mode = "fresh") => {
        setSubmitError("");

        if (mode === "fresh") {
            setAnswers({});
            setCurrentIndex(0);
            setCompleted(false);
            setResultMeta(null);
            setGlobalStats(null);
            setRoomStats(null);
            setShowResult(false);
            try {
                localStorage.removeItem(RESULT_KEY);
            } catch (e) {
                console.error(e);
            }
            if (isEventMode && nickname) {
                setNickname(nickname.trim());
                setNicknameLocked(true);
            }
        }

        if (mode === "continue") {
            setShowResult(false);
        }

        setIsOverlayOpen(true);
    };

    const handleCloseTest = () => {
        setIsOverlayOpen(false);
    };

    const handleConfirmNickname = () => {
        if (!nickname.trim()) return;
        setNickname(nickname.trim());
        setNicknameLocked(true);
    };

    const handleAnswerClick = (value: number) => {
        if (!currentQuestion || isSubmitting) return;

        // делаем снапшот сразу (setState async)
        const nextAnswers = {...answers, [currentQuestion.id]: value};
        setAnswers(nextAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex((idx) => idx + 1);
        } else {
            handleFinishTest(nextAnswers);
        }
    };

    const handleBack = () => {
        setSubmitError("");
        if (currentIndex > 0) {
            setCurrentIndex((idx) => idx - 1);
        }
    };

    const handleFinishTest = async (answersSnapshot: Record<number, number> = answers) => {
        setSubmitError("");
        setIsSubmitting(true);

        try {
            const meta = computeScores(answersSnapshot);
            setResultMeta(meta);
            setCompleted(true);

            // ВАЖНО: отправляем строго числа 1..5 (без 0)
            const orderedAnswers = QUESTIONS.map((q) => Number(answersSnapshot[q.id]));

            const invalid =
                orderedAnswers.length !== QUESTIONS.length ||
                orderedAnswers.some((v) => !Number.isInteger(v) || v < 1 || v > 5);

            if (invalid) {
                setSubmitError("Odpowiedz na wszystkie pytania (1–5), zanim zakończysz test.");
                setIsSubmitting(false);
                return;
            }

            if (isEventMode) {
                const payload = {
                    roomCode,
                    nickname: (nickname || "anonymous").trim() || "anonymous",
                    totalScore: meta.totalScore,
                    level: meta.ratelLevel,
                    answers: orderedAnswers,
                };

                const resp = await fetch(`${API_BASE_URL}/api/event-results`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                });

                if (!resp.ok) {
                    const txt = await resp.text().catch(() => "");
                    console.error("Backend error (event-results):", resp.status, txt);
                    throw new Error("Failed to save event result");
                }

                const data = await resp.json();
                setRoomStats(data);

                const stored = {completed: true, meta, roomStats: data, globalStats: null};
                localStorage.setItem(RESULT_KEY, JSON.stringify(stored));
            } else {
                const payload = {
                    totalScore: meta.totalScore,
                    level: meta.ratelLevel,
                    answers: orderedAnswers,
                };

                const resp = await fetch(`${API_BASE_URL}/api/results`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                });

                if (!resp.ok) {
                    const txt = await resp.text().catch(() => "");
                    console.error("Backend error (results):", resp.status, txt);
                    throw new Error("Failed to save result");
                }

                const data = await resp.json();
                setGlobalStats(data);

                const stored = {completed: true, meta, globalStats: data, roomStats: null};
                localStorage.setItem(RESULT_KEY, JSON.stringify(stored));
            }

            setIsOverlayOpen(false);
            setShowResult(true);
            setTimeout(scrollToResult, 80);
        } catch (err) {
            console.error(err);
            setSubmitError("Nie udało się zapisać wyniku na serwerze, ale wynik lokalny nadal jest widoczny.");
            setIsOverlayOpen(false);
            setShowResult(true);
            setTimeout(scrollToResult, 80);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleDownloadPdf = () => {
        window.print();
    };

    const handleViewResultClick = () => {
        if (!hasResult) return;
        setShowResult(true);
        setTimeout(scrollToResult, 80);
    };

    const renderLevelBadge = (level: string | null, sum: number | null) => {
        return (
            <span className={getLevelBadgeClass(level)}>
        <span>{level || "—"}</span>
        <span className="levelBadge__score">{sum ?? "–"}</span>
      </span>
        );
    };

    const meta = resultMeta;

    // --- narrative по уровню ---
    const levelInfo = meta ? LEVEL_DETAILS.get(meta.ratelLevel) ?? null : null;

    // --- самый сильный PILLAR (по сумме) ---
    const topPillarName = useMemo(() => {
        if (!meta) return null;
        let best: Pillar | null = null;
        let bestSum = -1;
        for (const name of PILLAR_ORDER) {
            const p = meta.pillarResults.get(name);
            if (p && p.sum > bestSum) {
                bestSum = p.sum;
                best = name;
            }
        }
        return best;
    }, [meta]);

    const topPillarInfo =
        topPillarName && PILLAR_DETAILS
            ? PILLAR_DETAILS.get(topPillarName) ?? null
            : null;

    // --- ТОП-3 СKIЛЛОВ ПО ВСЕМ ПИЛЛАРАМ ---
    const topSkillsInfo = useMemo(() => {
        if (!meta || !meta.skillResults) {
            return {skills: [] as { pillarName: Pillar; skillName: Skill; sum: number; level: string }[], isBalanced: false, hasTies: false};
        }

        const flat: { pillarName: Pillar; skillName: Skill; sum: number; level: string }[] = [];

        for (const [pillarName, skillsMap] of meta.skillResults.entries()) {
            for (const [skillName, data] of skillsMap.entries()) {
                flat.push({
                    pillarName,
                    skillName,
                    sum: data.sum,
                    level: data.level,
                });
            }
        }

        if (!flat.length) {
            return {skills: [], isBalanced: false, hasTies: false};
        }

        const sums = flat.map((s) => s.sum);
        const maxSum = Math.max(...sums);
        const minSum = Math.min(...sums);

        // все скиллы с одинаковым счётом => профиль ровный
        const isBalanced = maxSum === minSum;

        // сортируем: сначала по сумме ↓, потом по pillar, потом по названию скилла – чтобы порядок был стабильный
        flat.sort((a, b) => {
            if (b.sum !== a.sum) return b.sum - a.sum;
            if (a.pillarName !== b.pillarName) {
                return a.pillarName.localeCompare(b.pillarName);
            }
            return a.skillName.localeCompare(b.skillName);
        });

        const skills = flat.slice(0, 3);
        const hasTies =
            !isBalanced && flat.filter((s) => s.sum === maxSum).length > 3;

        return {skills, isBalanced, hasTies};
    }, [meta]);

    const {skills: topSkills, isBalanced, hasTies} = topSkillsInfo;

    return (
        <main className="main">
            <div className="container">
                {/* ---------- INTRO ---------- */}
                <section className="testIntro">
                    <div className="testIntroCard">
                        <div className="testIntroCard__left">
                            <h1 className="pageTitle">Ratel Mind – Test Odporności Psychicznej</h1>
                            <p className="pageSubtitle">
                                Test mierzy Twoją odporność psychiczną w czterech kluczowych filarach: poznawczym,
                                emocjonalnym, behawioralnym i społecznym. Zobaczysz, jak wypadasz na tle innych osób,
                                które wypełniły test.
                            </p>

                            <ul className="testIntroList">
                                <li>48 krótkich stwierdzeń dotyczących sposobu myślenia, odczuwania i działania.</li>
                                <li>
                                    Odpowiadaj w skali 1–5: Nigdy → Zawsze.
                                </li>
                                <li>Czas wypełnienia: około 8–10 minut.</li>
                                <li>
                                    Na końcu otrzymasz swój poziom odporności oraz profil filarów.
                                </li>
                            </ul>

                            <div className="testIntroCard__buttons">
                                {!hasAnswers && !hasResult && (
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleOpenTest("fresh")}
                                    >
                                        Rozpocznij test
                                    </button>
                                )}

                                {hasInProgress && (
                                    <>
                                        <button
                                            className="btn btn--primary"
                                            onClick={() => handleOpenTest("continue")}
                                        >
                                            Kontynuuj test
                                        </button>
                                        <button
                                            className="btn btn--ghost"
                                            onClick={() => handleOpenTest("fresh")}
                                        >
                                            Zacznij od nowa
                                        </button>
                                    </>
                                )}

                                {hasResult && !hasInProgress && (
                                    <>
                                        <button
                                            className="btn btn--primary"
                                            onClick={handleViewResultClick}
                                        >
                                            Zobacz wynik
                                        </button>
                                        <button
                                            className="btn btn--ghost"
                                            onClick={() => handleOpenTest("fresh")}
                                        >
                                            Zacznij od nowa
                                        </button>
                                    </>
                                )}
                            </div>

                            <p className="testIntroNote">
                                Możesz w każdej chwili wrócić do testu, aby przejrzeć odpowiedzi lub wypełnić go
                                ponownie.
                            </p>

                            {isEventMode && (
                                <span className="badge badge--event">
                  Event mode · room: {roomCode}
                </span>
                            )}
                        </div>

                        <div className="testIntroCard__right">
                            <div className="testIntroIllustration">
                                Placeholder for illustration – different graphics per Ratel
                                level can be shown here later.
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- RESULT SECTION ---------- */}
                {showResult && meta && (
                    <section className="testResult" ref={resultRef}>
                        <div className="testResult__header">
                            <div>
                                <h2>Twój wynik</h2>
                                <p>
                                    Ogólny poziom odporności oraz rozkład wyników w czterech filarach.
                                </p>
                            </div>
                            <button
                                className="btn btn--ghost btn--small"
                                onClick={handleDownloadPdf}
                            >
                                Pobierz PDF
                            </button>
                        </div>

                        <div className="testResult__top">
                            <div className="summaryCard">
                                <div className="summaryLabel">Ogólny poziom odporności psychicznej</div>
                                <div className="summaryValue">{meta.ratelLevel}</div>
                                <div className="summarySub">
                                    Łączna liczba punktów: {meta.totalScore} / 240
                                </div>
                            </div>

                            <div className="summaryCard">
                                <div className="summaryLabel">Twój percentyl</div>
                                <div className="summaryValue">
                                    {globalStats ? `${Math.round(globalStats.percentile)}%` : "—"}
                                </div>
                                <div className="summarySub">
                                    W porównaniu do wszystkich osób, które wypełniły test.
                                </div>
                            </div>
                        </div>

                        {/* narrative по общему уровню */}
                        {levelInfo && (
                            <div className="levelNarrative">
                                <h3 className="levelNarrative__title">
                                    {meta.ratelLevel} — {levelInfo.motto}
                                </h3>
                                <p className="levelNarrative__desc">
                                    {levelInfo.description}
                                </p>
                                <p className="levelNarrative__quote">
                                    “{levelInfo.quote}”
                                </p>
                                <p className="levelNarrative__tip">👉 {levelInfo.tip}</p>
                            </div>
                        )}

                        <div className="resultIllustration">
                            Later you can show different graphics here for{" "}
                            <strong>{meta.ratelLevel}</strong> (e.g. different Ratel
                            characters).
                        </div>

                        {/* ромб + pillars */}
                        <div className="testResult__layout">
                            <div className="diamondCard">
                                <div className="diamondWrap">
                                    <svg
                                        className="diamondSvg"
                                        viewBox="0 0 260 260"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="diamondFill"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#bfdbfe"
                                                    stopOpacity="0.9"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#dbeafe"
                                                    stopOpacity="0.7"
                                                />
                                            </linearGradient>
                                        </defs>

                                        <g transform="translate(130,130)">
                                            {(() => {
                                                const BASE = 55;
                                                return [0.25, 0.5, 0.75, 1].map((r, i) => {
                                                    const size = BASE * r;
                                                    return (
                                                        <polygon
                                                            key={i}
                                                            className="diamondGrid__poly"
                                                            points={`${0},${-size} ${size},${0} ${0},${size} ${-size},${0}`}
                                                        />
                                                    );
                                                });
                                            })()}

                                            {(() => {
                                                const BASE = 55;
                                                if (!meta) return null;

                                                const cog =
                                                    meta.pillarResults.get(Pillar.Cognitive)?.pct ?? 0;
                                                const emo =
                                                    meta.pillarResults.get(Pillar.Emotional)?.pct ?? 0;
                                                const beh =
                                                    meta.pillarResults.get(Pillar.Behavioral)?.pct ?? 0;
                                                const soc =
                                                    meta.pillarResults.get(Pillar.Social)?.pct ?? 0;

                                                const toRadius = (pct: number) => (pct / 100) * BASE;

                                                const pCog = [0, -toRadius(cog)];
                                                const pBeh = [toRadius(beh), 0];
                                                const pSoc = [0, toRadius(soc)];
                                                const pEmo = [-toRadius(emo), 0];

                                                const points = [pCog, pBeh, pSoc, pEmo]
                                                    .map((p) => p.join(","))
                                                    .join(" ");

                                                return (
                                                    <polygon
                                                        className="diamondUser"
                                                        points={points}
                                                    />
                                                );
                                            })()}
                                        </g>

                                        <text
                                            className="diamondLabel"
                                            x="130"
                                            y="32"
                                            textAnchor="middle"
                                        >
                                            Poznawczy
                                        </text>
                                        <text
                                            className="diamondLabel"
                                            x="225"
                                            y="135"
                                            textAnchor="middle"
                                        >
                                            Behawioralny
                                        </text>
                                        <text
                                            className="diamondLabel"
                                            x="130"
                                            y="238"
                                            textAnchor="middle"
                                        >
                                            Społeczny
                                        </text>
                                        <text
                                            className="diamondLabel"
                                            x="35"
                                            y="135"
                                            textAnchor="middle"
                                        >
                                            Emocjonalny
                                        </text>
                                    </svg>
                                </div>
                            </div>

                            <div className="pillarList">
                                <h3>Your pillars</h3>
                                <p className="pillarList__hint">
                                    Każdy słupek pokazuje Twój poziom dla danego filaru (niski / średni / wysoki).
                                </p>
                                <ul>
                                    {PILLAR_ORDER.map((pillarName) => {
                                        const pdata = meta.pillarResults.get(pillarName);
                                        if (!pdata) return null;

                                        const level = pdata.level;
                                        const pct = pdata.pct ?? 0;

                                        let barClass =
                                            "pillarList__barFill pillarList__barFill--medium";
                                        if (level?.toLowerCase().startsWith("high")) {
                                            barClass =
                                                "pillarList__barFill pillarList__barFill--high";
                                        } else if (level?.toLowerCase().startsWith("low")) {
                                            barClass =
                                                "pillarList__barFill pillarList__barFill--low";
                                        }

                                        return (
                                            <li key={pillarName} className="pillarList__item">
                                                <div className="pillarList__name">
                                                    {pillarName}
                                                </div>
                                                <div className="pillarList__barWrap">
                                                    <div className="pillarList__barBg">
                                                        <div
                                                            className={barClass}
                                                            style={{width: `${pct}%`}}
                                                        />
                                                    </div>
                                                    <div className="pillarList__meta">
                                                        <span>{level}</span>
                                                        <span>{pdata.sum} / 60</span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* narrative по самому сильному PILLAR */}
                        {topPillarInfo && (
                            <div className="pillarNarrative">
                                <h3 className="pillarNarrative__title">
                                    Twój najsilniejszy filar: {topPillarName}
                                </h3>
                                <p className="pillarNarrative__text">
                                    {topPillarInfo.description}
                                </p>
                                <ul className="pillarNarrative__skills">
                                    {Array.from(topPillarInfo.skills.entries()).map(
                                        ([skillName, desc]) => (
                                            <li key={skillName}>
                                                <strong>{skillName}.</strong> {desc}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* ТОП-3 СКИЛЛОВ */}
                        {topSkills.length > 0 && (
                            <div className="topSkillsBlock">
                                <h3>Twoje najsilniejsze umiejętności</h3>

                                {isBalanced ? (
                                    <p className="topSkillsBlock__hint">
                                        Twoje umiejętności są bardzo zrównoważone – nie ma jeszcze żadnej dziedziny, w
                                        której wyróżniałbyś się szczególnie.
                                        Poniżej znajduje się kilka przykładów z tym samym wynikiem.
                                    </p>
                                ) : hasTies ? (
                                    <p className="topSkillsBlock__hint">
                                        Kilka umiejętności ma ten sam najwyższy wynik. Oto trzy z
                                        Twoich najsilniejszych umiejętności we wszystkich filarach.
                                    </p>
                                ) : (
                                    <p className="topSkillsBlock__hint">
                                        Najwyższe wyniki surowe we wszystkich umiejętnościach we wszystkich czterech
                                        filarach.
                                    </p>
                                )}

                                <div className="topSkillsGrid">
                                    {topSkills.map((s) => {
                                        const desc =
                                            PILLAR_DETAILS.get(s.pillarName as Pillar)?.skills.get(s.skillName as Skill);
                                        return (
                                            <div
                                                key={`${s.pillarName}-${s.skillName}`}
                                                className="topSkillCard"
                                            >
                                                <div className="topSkillCard__pill">
                                                    {s.pillarName.toUpperCase()}
                                                </div>
                                                <div className="topSkillCard__name">
                                                    {s.skillName}
                                                </div>
                                                <div className="topSkillCard__badge">
                                                    {renderLevelBadge(s.level, s.sum)}
                                                </div>
                                                {desc && (
                                                    <p className="topSkillCard__desc">{desc}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* таблица навыков */}
                        <div className="skillsBlock">
                            <h3>Szczegółowy profil umiejętności</h3>
                            <p className="skillsBlock__hint">
                                Każda komórka pokazuje Twój poziom i wynik surowy dla konkretnej umiejętności
                                w ramach czterech filarów.
                            </p>

                            <div className="skillTableWrap">
                                <table className="skillTable">
                                    <thead>
                                    <tr>
                                        <th>Filar</th>
                                        <th>Skill 1</th>
                                        <th>Skill 2</th>
                                        <th>Skill 3</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {PILLAR_ORDER.map((pillarName) => (
                                        <tr key={pillarName}>
                                            <td className="skillTable__pillarCell">
                                                {pillarName.toUpperCase()}
                                            </td>
                                            {PILLAR_SKILLS_ORDER[pillarName].map((skillName) => {
                                                const sData =
                                                    meta.skillResults.get(pillarName)?.get(skillName) || null;
                                                return (
                                                    <td key={skillName}>
                                                        <div className="skillCell">
                                <span className="skillCell__name">
                                  {skillName}
                                </span>
                                                            {sData ? (
                                                                renderLevelBadge(sData.level, sData.sum)
                                                            ) : (
                                                                <span className="levelBadge levelBadge--medium">
                                    <span>—</span>
                                    <span className="levelBadge__score">
                                      –
                                    </span>
                                  </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {roomStats && (
                            <div className="roomStats">
                                <h3>Ranking wydarzenia</h3>
                                <p className="roomStats__hint">
                                    Twoja pozycja w pokoju{" "}
                                    <strong>{roomStats.roomCode}</strong>.
                                </p>
                                <div className="rankTableWrap">
                                    <table className="rankTable">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nick</th>
                                            <th>Poziom</th>
                                            <th>Wynik</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {roomStats.ranking?.map((r: RoomRankingEntry) => {
                                            const isMe =
                                                roomStats.currentUser &&
                                                roomStats.currentUser.nickname === r.nickname;
                                            return (
                                                <tr
                                                    key={`${r.nickname}-${r.position}`}
                                                    className={isMe ? "rankRowMe" : ""}
                                                >
                                                    <td>{r.position}</td>
                                                    <td>{r.nickname}</td>
                                                    <td>{r.level}</td>
                                                    <td>{r.totalScore}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {submitError && (
                    <p
                        style={{
                            marginTop: 16,
                            fontSize: 13,
                            color: "#b91c1c",
                        }}
                    >
                        {submitError}
                    </p>
                )}
            </div>

            {/* ---------- OVERLAY (test window) ---------- */}
            {isOverlayOpen && (
                <div className="testOverlay">
                    <div className="testOverlay__bg" onClick={handleCloseTest}/>
                    <div className="testOverlay__card">
                        <div className="testOverlay__topRow">
                            <div className="testOverlay__progressLine">
                <span className="progressLabel">
                  Pytanie {currentIndex + 1} of {QUESTIONS.length}
                </span>
                                <div className="progressBar">
                                    <div
                                        className="progressBar__fill"
                                        style={{width: `${progressPct}%`}}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                className="overlayClose"
                                onClick={handleCloseTest}
                            >
                                ×
                            </button>
                        </div>

                        {isEventMode && !nicknameLocked && (
                            <div className="nicknameBlock">
                                <label className="nicknameLabel">Wybierz swój nick</label>
                                <input
                                    className="nicknameInput"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="e.g. SkyWalker"
                                />
                                <div className="nicknameHint">
                                    Twoja nazwa użytkownika będzie widoczna dla wszystkich osób przebywających w tym
                                    pokoju wydarzeń
                                    i nie będzie można jej zmienić w trakcie tej sesji.
                                </div>
                                <div style={{marginTop: 10}}>
                                    <button
                                        type="button"
                                        className="btn btn--primary btn--small"
                                        onClick={handleConfirmNickname}
                                        disabled={!nickname.trim()}
                                    >
                                        Zatwierdź i rozpocznij
                                    </button>
                                </div>
                            </div>
                        )}

                        {(!isEventMode || nicknameLocked) && currentQuestion && (
                            <>
                                <div className="questionMeta">
                  <span className="qMetaPillar">
                    {currentQuestion.pillar}
                  </span>
                                    <span className="qMetaDot">·</span>
                                    <span className="qMetaSkill">
                    {currentQuestion.skill}
                  </span>
                                </div>

                                <p className="questionText">{currentQuestion.text}</p>

                                <div className="testFlow__scale">
                                    {Array.from(
                                        {length: SCALE.max - SCALE.min + 1},
                                        (_, i) => i + SCALE.min
                                    ).map((v) => (
                                        <button
                                            key={v}
                                            type="button"
                                            className={
                                                answers[currentQuestion.id] === v
                                                    ? "scaleBtn scaleBtn--active"
                                                    : "scaleBtn"
                                            }
                                            onClick={() => handleAnswerClick(v)}
                                            disabled={isSubmitting}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>

                                <div className="testFlow__labels">
                                    <span>{SCALE.labels.get(1)}</span>
                                    <span>{SCALE.labels.get(5)}</span>
                                </div>

                                <div className="testFlow__nav">
                                    <button
                                        type="button"
                                        className="btn btn--ghost btn--small"
                                        onClick={handleBack}
                                        disabled={currentIndex === 0 || isSubmitting}
                                    >
                                        Wstecz
                                    </button>
                                    <span className="testFlow__hint">
                    Twoja odpowiedź jest zapisywana automatycznie po kliknięciu liczby.

                  </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
