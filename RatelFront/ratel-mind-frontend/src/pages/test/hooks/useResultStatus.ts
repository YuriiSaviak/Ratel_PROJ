import superjson from "superjson";
import {SavedResult} from "../../../types/LocalStorageTypes.ts";
import {useState} from "react";
import {FinalResult, GlobalStats, RoomStats} from "../../../types/Types.ts";

export function useResultStatus(setCompleted: (value: boolean) => void) {
    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
    const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
    const [resultMeta, setResultMeta] = useState<FinalResult | null>(null);

    function loadResult(resultKey: string) {
        try {
            const savedResult: string | null = localStorage.getItem(resultKey);
            console.log("Loaded progress from localStorage: ", savedResult);

            if (savedResult) {
                const parsedResult: SavedResult = superjson.parse<SavedResult>(savedResult);

                setResultMeta(parsedResult.meta);
                setGlobalStats(parsedResult.globalStats || null);
                setRoomStats(parsedResult.roomStats || null);

                if (parsedResult.completed) {
                    setCompleted(true);
                }
            }
        } catch (e) {
            console.error("Failed to read result: ", e);
        }
    }

    function initResultStatus() {
        setResultMeta(null);
        setGlobalStats(null);
        setRoomStats(null);
    }

    return {globalStats, roomStats, resultMeta, loadResult, initResultStatus, setRoomStats, setGlobalStats, setResultMeta};
}