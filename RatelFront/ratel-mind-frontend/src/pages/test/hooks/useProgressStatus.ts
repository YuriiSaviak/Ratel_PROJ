import superjson from "superjson";
import {SavedProgress} from "../../../types/LocalStorageTypes.ts";
import {useState} from "react";

export function useProgressStatus(setCompleted: (value: boolean) => void) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Map<number, number>>(new Map());
    const [nickname, setNickname] = useState("");
    const [nicknameLocked, setNicknameLocked] = useState(false);

    function loadProgress(progressKey: string, isEventMode: boolean) {
        try {
            const savedProgress: string | null = localStorage.getItem(progressKey);
            console.log("Loaded progress from localStorage: ", savedProgress);

            if (savedProgress) {
                const parsedProgress: SavedProgress = superjson.parse<SavedProgress>(savedProgress);

                setAnswers(parsedProgress.answers || new Map());
                setCurrentIndex(parsedProgress.currentIndex || 0);
                setCompleted(parsedProgress.completed);

                if (isEventMode && parsedProgress.nickname) {
                    setNickname(parsedProgress.nickname);
                    setNicknameLocked(true);
                }
            }
        } catch (e) {
            console.error("Failed to read progress: ", e);
        }
    }

    function saveProgress(progressKey: string, isEventMode: boolean, completed: boolean) {
        try {
            const payload: SavedProgress = {
                answers,
                currentIndex,
                completed,
                nickname: isEventMode ? nickname : null,
            };
            console.log("Saving progress: ", payload);
            localStorage.setItem(progressKey, superjson.stringify(payload));
        } catch (e) {
            console.error("Failed to save progress", e);
        }
    }

    function initProgressStatus(nickname: string, isEventMode: boolean): void {
        setAnswers(new Map());
        setCurrentIndex(0);
        if (isEventMode && nickname) {
            updateNickname(nickname);
        }
    }

    function updateNickname(newNickname: string): void {
        setNickname(newNickname.trim());
        setNicknameLocked(true);
    }

    function nextQuestion(answers: Map<number, number>): void {
        setCurrentIndex(prev => prev + 1);
        setAnswers(answers)
    }

    function previousQuestion(): void {
        setCurrentIndex((idx) => idx - 1);
    }

    return {
        currentIndex,
        answers,
        nickname,
        nicknameLocked,
        loadProgress,
        saveProgress,
        initProgressStatus,
        updateNickname,
        nextQuestion,
        previousQuestion
    };
}