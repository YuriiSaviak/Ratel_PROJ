import {ScaleLabelType} from "./Types.ts";

export interface SaveResults {
    totalScore: number;
    level: ScaleLabelType;
    answers: number[];
}

export interface SaveEventResults {
    roomCode: string | null;
    nickname: string;
    totalScore: number;
    level: ScaleLabelType;
    answers: number[];
}