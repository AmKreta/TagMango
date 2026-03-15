import { useCallback } from "react";
import { AppTab } from "../../components/appTab/AppTab";
import { ITabStatus } from "../../components/appTab/constant";
import { useChallengeContext } from "./useChallengeContext";
import { Feed } from "./Feed";

function getDayStatus(day: number, currentDay: number, completedDays: number[]): ITabStatus {
    if (completedDays.includes(day)) return ITabStatus.COMPLETED;
    if (day === currentDay) return ITabStatus.IN_PROGRESS;
    return ITabStatus.NOT_STARTED;
}

export const ChallengeContent = function ({ showTabs, onCloseTabs }: { showTabs?: boolean; onCloseTabs?: () => void }) {
    const { totalDays, currentDay, selectedDay, completedDays, setSelectedDay } = useChallengeContext();

    const tabsData = Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const status = getDayStatus(day, currentDay, completedDays);
        return {
            name: `Day - ${day}`,
            disabled: status === ITabStatus.NOT_STARTED,
            status,
            content: <Feed />,
        };
    });

    const handleTabChange = useCallback((tab: string) => {
        const dayNum = parseInt(tab.replace("Day - ", ""));
        setSelectedDay(dayNum);
    }, [setSelectedDay]);

    return <div style={{ flexGrow: 1, minHeight: 0 }}>
        <AppTab
            tabs={tabsData}
            active={`Day - ${selectedDay}`}
            onTabChange={handleTabChange}
            showTabs={showTabs}
            onCloseTabs={onCloseTabs}
        />
    </div>
}

