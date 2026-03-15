import styled from "@emotion/styled"
import { ChallengeContent } from "./ChallengeContent"
import { ChallengeHeader } from "./ChallengeHeader"
import { ChallengeProvider } from "./ChallengeContext"

const Container = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
`;

export const Challenge = function({ showTabs, onCloseTabs }: { showTabs?: boolean; onCloseTabs?: () => void }){
    return <ChallengeProvider totalDays={9} initialCurrentDay={3} initialCompletedDays={[1, 2]}>
        <Container>
            <ChallengeHeader />
            <ChallengeContent showTabs={showTabs} onCloseTabs={onCloseTabs} />
        </Container>
    </ChallengeProvider>
}