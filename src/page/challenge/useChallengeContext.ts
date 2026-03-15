import { useContext } from "react";
import { ChallengeContext, type ChallengeState } from "./challengeContextDef";

export function useChallengeContext(): ChallengeState {
    const ctx = useContext(ChallengeContext);
    if (!ctx) throw new Error("useChallengeContext must be used within ChallengeProvider");
    return ctx;
}
