export interface Advantage {
    title: string;
    text: string;
}

export interface Step {
    number: string;
    title: string;
    text: string;
}

export type ScaleLabelType = 0 | 1 | 2 | 3 | 4 | 5;

export enum ScalePeriodType {
    Never = "Never",
    Rare = "Rare",
    Sometimes = "Sometimes",
    Often = "Often",
    Always = "Always"
}

export interface Scale {
    min: number;
    max: number;
    labels: Map<ScaleLabelType, ScalePeriodType>;
}

export enum LabelType {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Unknown = "Unknown"
}

export interface Level {
    min: number;
    max: number;
    label: LabelType;
}

export interface RatelLevel {
    min: number;
    max: number;
    label: ScaleLabelType;
}

export interface PillarLevel extends Level {
}

export interface SkillLevel extends Level {
}

// ===== FILARY i UMIEJĘTNOŚCI (UWAGA: wartości muszą pasować do TestPage.tsx) =====
// Zostawiamy angielskie wartości jako "ID", żeby nie rozwalić mapowania w UI.
// Tłumaczenia wyświetlane są niżej (PILLAR_DETAILS, LEVEL_DETAILS itp.).
export enum Pillar {
    Cognitive = "Cognitive",
    Emotional = "Emotional",
    Behavioral = "Behavioral",
    Social = "Social"
}

export enum Skill {
    Agency = "Agency",
    CognitiveFlexibility = "Cognitive Flexibility",
    SituationAnalysis = "Situation Analysis",
    EmotionalRegulation = "Emotional Regulation",
    StressResilience = "Stress Resilience",
    Recovery = "Recovery",
    DecisionMaking = "Decision-Making",
    Perseverance = "Perseverance",
    GoalDirectedAction = "Goal-Directed Action",
    SupportNetwork = "Support Network",
    Assertiveness = "Assertiveness",
    ResilienceInRelationships = "Resilience in Relationships"
}

export interface Question {
    id: number;
    text: string;
    pillar: Pillar;
    skill: Skill;
    reversed: boolean;
}

export interface LevelDetail {
    code: string;
    motto: string;
    description: string;
    quote: string;
    tip: string;
}

export interface PillarDetail {
    title: string;
    description: string;
    skills: Map<Skill, string>;
}

export interface GlobalStats {
    totalTests: number;
    averageScore: number;
    distribution: Record<ScaleLabelType, number>;
    percentile: number;
}

export interface RoomRankingEntry {
    nickname: string;
    totalScore: number;
    level: ScaleLabelType;
    position: number;
}

export interface RoomStats {
    roomCode: string;
    currentUser?: {
        nickname: string;
        totalScore: number;
        level: ScaleLabelType;
    };
    ranking: RoomRankingEntry[];
}

export interface ResultEntry {
    sum: number;
    level: LabelType;
    max: number;
    pct: number;
}

export interface FinalResult {
    totalScore: number;
    ratelLevel: ScaleLabelType;
    pillarResults: Map<Pillar, ResultEntry>;
    skillResults: Map<Pillar, Map<Skill, ResultEntry>>;
    scoredAnswers: Map<number, number>;
}
