import {FinalResult, GlobalStats, RoomStats} from "./Types.ts";

export interface SavedProgress {
    answers: Record<number, number>;
    currentIndex: number;
    completed: boolean;
    nickname: string | null;
}

export interface SavedResult {
    completed: boolean;
    meta: FinalResult;
    globalStats: GlobalStats | null;
    roomStats: RoomStats | null;
}