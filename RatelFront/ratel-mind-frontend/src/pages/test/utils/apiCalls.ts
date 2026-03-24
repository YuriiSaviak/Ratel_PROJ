import {FinalResult, GlobalStats, RoomStats} from "../../../types/Types.ts";
import {SaveEventResults} from "../../../types/ApiTypes.ts";
import {api} from "../../../app/Api.ts";
import {SavedResult} from "../../../types/LocalStorageTypes.ts";
import superjson from "superjson";

export async function saveEventResult(resultKey: string, eventResults: SaveEventResults, meta: FinalResult): Promise<RoomStats | null> {
    return api.eventResults.save(eventResults)
        .then((resp: { data: RoomStats | null }) => {
            const stored: SavedResult = {
                completed: true,
                meta: meta,
                roomStats: resp.data,
                globalStats: null
            };
            console.log("Saving event result to localStorage: ", stored);
            localStorage.setItem(resultKey, superjson.stringify(stored));
            return resp.data;
        }).catch((err: Error) => {
            console.error(`Backend error (event-results): ${err}`);
            throw new Error("Failed to save event result");
        });
}

export async function saveResult(resultKey: string, orderedAnswers: number[], meta: FinalResult): Promise<GlobalStats | null> {
    return await api.results.save({
        totalScore: meta.totalScore,
        level: meta.ratelLevel,
        answers: orderedAnswers,
    }).then((resp: { data: GlobalStats | null }) => {
        const stored: SavedResult = {
            completed: true,
            meta: meta,
            globalStats: resp.data,
            roomStats: null
        };
        console.log("Saving result to localStorage: ", stored);
        localStorage.setItem(resultKey, superjson.stringify(stored));
        return resp.data;
    }).catch((err: Error) => {
        console.error(`Backend error (event-results): ${err}`);
        throw new Error("Failed to save event result");
    });
}