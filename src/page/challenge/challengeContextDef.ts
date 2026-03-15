import { createContext } from "react";
import type { IPost } from "./FeedPost";

export interface ChallengeState {
    totalDays: number;
    currentDay: number;
    selectedDay: number;
    completedDays: number[];
    pendingDays: number[];
    posts: Record<number, IPost[]>;
    userPost: IPost | null;
    showConfetti: boolean;
    setCurrentDay: (day: number) => void;
    setSelectedDay: (day: number) => void;
    completeDay: (day: number) => void;
    addUserPost: (post: IPost) => void;
    setShowConfetti: (show: boolean) => void;
}

export const ChallengeContext = createContext<ChallengeState | null>(null);
