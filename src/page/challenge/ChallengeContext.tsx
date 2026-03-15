import { useState, type ReactNode } from "react";
import type { IPost } from "./FeedPost";
import { ChallengeContext } from "./challengeContextDef";

interface ProviderProps {
    totalDays: number;
    initialCurrentDay?: number;
    initialCompletedDays?: number[];
    children: ReactNode;
}

export function ChallengeProvider({
    totalDays,
    initialCurrentDay = 1,
    initialCompletedDays = [],
    children,
}: ProviderProps) {
    const [currentDay, setCurrentDay] = useState(initialCurrentDay);
    const [selectedDay, setSelectedDay] = useState(initialCurrentDay);
    const [completedDays, setCompletedDays] = useState<number[]>(initialCompletedDays);
    const [posts] = useState<Record<number, IPost[]>>({});
    const [userPost, setUserPost] = useState<IPost | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const allDays = Array.from({ length: totalDays }, (_, i) => i + 1);
    const pendingDays = allDays.filter(d => d !== currentDay && !completedDays.includes(d));

    const completeDay = (day: number) => {
        setCompletedDays(prev => prev.includes(day) ? prev : [...prev, day]);
    };

    const addUserPost = (post: IPost) => {
        setUserPost(post);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 500);
    };

    return (
        <ChallengeContext.Provider value={{
            totalDays,
            currentDay,
            selectedDay,
            completedDays,
            pendingDays,
            posts,
            userPost,
            showConfetti,
            setCurrentDay,
            setSelectedDay,
            completeDay,
            addUserPost,
            setShowConfetti,
        }}>
            {children}
        </ChallengeContext.Provider>
    );
}
