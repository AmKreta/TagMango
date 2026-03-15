import styled from "@emotion/styled"
import { useState } from "react"
import { theme } from "../../theme/theme"
import { border1 } from "../../theme/mixins"
import { Typography } from "../../components/typography"
import { TypographyLevel } from "../../components/typography/constants"
import { LeftArrow } from "../../assets/leftArrow"
import { InfoIcon } from "../../assets/infoIcon"
import { useChallengeContext } from "./useChallengeContext"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { CloseButton } from "../../components/closeButton/CloseButton"
import { Image } from "../../components/image/image"
import workout from '../../assets/workout.png';
import { InfoCard } from "../../components/infoCard/InfoCard"
import { PillButton } from "../../components/pillButton/PillButton"

export const ChallengeHeader = function(){
    const { selectedDay, totalDays } = useChallengeContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <HeaderContainer>
        <Group>
            <BackButton>
                <LeftArrow />
                <Typography level={TypographyLevel.SEMIBOLD} >
                    Back
                </Typography>
            </BackButton>
            <Seperator />
            <Typography level={TypographyLevel.SEMIBOLD} >
                Day {selectedDay} of {totalDays}
            </Typography>
        </Group>
        <HeaderRightText>
            <Typography level={TypographyLevel.SEMIBOLD} >
                9-Day Fitness Challenge
            </Typography>
            <InfoIconContainer onClick={() => setIsSidebarOpen(true)}>
                <InfoIcon />
            </InfoIconContainer>
        </HeaderRightText>
        <Sidebar 
            width='600px' 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            showCloseButton={false} 
            header={<SideBarHeader onClose={() => setIsSidebarOpen(false)} />}
            footer={<SideBarFooter onClose={() => setIsSidebarOpen(false)} />}
        >
            <SideBarContent>
                <Image src={workout} height='282px' width='504px' radius={theme.spaces.x24}/>
                <AlignLeft>
                    <Typography level={TypographyLevel.SEMIBOLD} fontSize={theme.fontSize.x24} lineHeight={theme.lineHeight.x30} tone={theme.colors.neutralAlpha11}>9-Day Fitness Challenge</Typography>
                </AlignLeft>
                <InfoContainer>
                    <InfoCard title='Total Checkins' value='9 days' />
                    <InfoCard title='Participants Joined' value='9 days' />
                </InfoContainer>
                <DescriptionContainer>
                    <Typography level={TypographyLevel.MEDIUM} fontSize={theme.fontSize.x14} lineHeight={theme.lineHeight.x20} tone={theme.colors.neutralAlpha11} fontWeight={theme.fontWeight.medium}>Description</Typography>
                    <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x18} lineHeight={theme.lineHeight.x26} tone={theme.colors.neutralAlpha11} fontWeight={theme.fontWeight.regular}>This 9-day challenge is designed to help you build the habit of showing up every day. You’ll complete one small, focused action daily—without overwhelm—to build clarity and confidence, and to prove that consistency, not motivation, is what drives real and lasting progress.</Typography>
                </DescriptionContainer>
            </SideBarContent>
        </Sidebar>
    </HeaderContainer>
}

const SideBarHeader = function({onClose}: {onClose: () => void}){
    return <SideBarHeaderContainer>
        <CloseButton onClick={onClose} />
        <Typography level={TypographyLevel.SEMIBOLD} fontSize={theme.fontSize.x24} lineHeight={theme.lineHeight.x30} tone={theme.colors.neutralAlpha11}>Challenge Description</Typography>
    </SideBarHeaderContainer>
}

const SideBarFooter = function({onClose}:{onClose:()=>void}){
    return <SideBarFooterContainer onClick={onClose}>
        <StyledPillButton>
            Got it
        </StyledPillButton>
    </SideBarFooterContainer>
}

const StyledPillButton = styled(PillButton)`
    width: 504px;
    max-width: 100%;
    height: 48px;
    gap: ${theme.spaces.x12};
    border-radius: ${theme.radius.full};
    padding-right: ${theme.spaces.x24};
    padding-left: ${theme.spaces.x24};
    background-color: ${theme.colors.neutralAlpha12};
    color: ${theme.colors.panelSolid};
    margin: auto;
`;

const SideBarFooterContainer = styled.div`
    width: 100%;
    height: 108px;
    gap: ${theme.spaces.x16};
    border-top-width: 1px;
    padding: ${theme.spaces.x3} ${theme.spaces.x8};
`

const DescriptionContainer = styled.div`
    width: 504px;
    max-width: 100%;
    height: auto;
    gap: ${theme.spaces.x16};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x8};
`;

const AlignLeft = styled.div`
    width: 100%;
    text-align: left;
`;

const SideBarHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x8};
    padding: ${theme.spaces.x16};
    justify-content: flex-start;
`;

const SideBarContent = styled.div`
    width: 100%;
    height: auto;
    border-top-width: 1px;
    padding: ${theme.spaces.x16} ${theme.spaces.x48};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spaces.x24};
`;

const HeaderContainer = styled.div`
    height: 56px;   
    background: ${theme.colors.panelDefault};
    padding: ${theme.spaces.x4} ${theme.spaces.x18};
    ${border1}
    border-top-width:0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Group = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x16};
`

const BackButton = styled.div`
    width: 73px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Seperator = styled.div`
    height: 32px;
    width:1px;
    border-right: .5px solid ${theme.colors.neutralAlpha6};
    border-left: .5px solid ${theme.colors.neutralAlpha6};
`

const HeaderRightText = styled.div`
    display: flex;
    gap: ${theme.spaces.x8};
    align-items: center;
`

const InfoIconContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor: pointer;
    }
`