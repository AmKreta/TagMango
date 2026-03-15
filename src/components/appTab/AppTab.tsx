import styled from "@emotion/styled";
import { theme } from "../../theme/theme";
import { Typography } from "../typography";
import { TypographyLevel } from "../typography/constants";
import { Tabs } from "../tabs";
import type { ReactNode } from "react";
import { css } from "@emotion/react";
import { ITabStatus } from "./constant";
import { GreenTick } from "../../assets/greenTIck";
import { LockIcon } from "../../assets/lockIcon";
import { ClockIcon } from "../../assets/clockIcon";
import workout from '../../assets/workout.png';

const Container = styled.div`
    height: 100%;
    display: flex;
`;

const TabsContainer = styled.div<{ showTabs?: boolean }>`
    width: 258px;
    min-width: 258px;
    height: 100%;
    gap: ${theme.spaces.x12};
    padding-top: ${theme.spaces.x16};
    padding-bottom: ${theme.spaces.x24};
    padding-left: ${theme.spaces.x8};
    position: relative;
    overflow: hidden;
    background-color: ${theme.colors.panelDefault};

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 75vw;
        min-width: unset;
        transform: ${props => props.showTabs ? 'translateX(0)' : 'translateX(-100%)'};
        transition: transform 0.3s ease;
    }
`;

const TabsOverlay = styled.div<{ visible?: boolean }>`
    display: none;
    @media (max-width: 768px) {
        display: ${props => props.visible ? 'block' : 'none'};
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
    }
`;


const TabsBg = styled.div`
    position: absolute;
    inset: 0;
    background-image: url(${workout});
    background-color: ${theme.colors.panelDefault};
    background-blend-mode: overlay;
    background-size: cover;
    background-position: center;
    height: 100%;
    aspect-ratio: 1;
    filter: blur(20px) var(--bg-invert);
    pointer-events: none;
    z-index: 0;
    opacity: var(--tabs-bg-opacity, 0.4);
`;


const TabsContent = styled.div`
    width: 258;
    height: 100%;
    overflow: auto;
    gap: ${theme.spaces.x12};
    padding-top: ${theme.spaces.x16};
    padding-bottom: ${theme.spaces.x24};
    padding-left: ${theme.spaces.x8};
    background: ${theme.colors.neutral3};
    flex-grow: 1;

    @media (max-width: 768px) {
        width: 100%;
        padding-left: 0;
    }
`;

const TabItem = styled.div<{disabled?: boolean, active?: boolean}>`
    position: relative;
    z-index: 1;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spaces.x24};
    padding-top: ${theme.spaces.x12};
    padding-right: ${theme.spaces.x16};
    padding-bottom: ${theme.spaces.x12};
    padding-left: ${theme.spaces.x16};
    border-radius: ${theme.spaces.x16};
    position: relative;
    margin-bottom: ${theme.spaces.x8};
    ${props=>props.active ? css`
        background-color: ${theme.colors.neutral3};
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        &::before, &::after{
            content: '';
            position: absolute;
            right: 0;
            width: ${theme.spaces.x16};
            height: ${theme.spaces.x16};
            background: transparent;
        }
        &::before{
            bottom: 100%;
            border-bottom-right-radius: ${theme.spaces.x16};
            box-shadow: 0 ${theme.spaces.x8} 0 0 ${theme.colors.neutral3};
        }    
        &::after{
            top: 100%;
            border-top-right-radius: ${theme.spaces.x16};
            box-shadow: 0 calc(-1 * ${theme.spaces.x8}) 0 0 ${theme.colors.neutral3};
        }   
    ` : ''}
`;

const TabContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 768px) {
        padding: ${theme.spaces.x12};
        box-sizing: border-box;
    }
`;

const TabNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spaces.x8};
`;

interface IAppTabProps<T extends string>{
    tabs: {
        name: T;
        disabled: boolean;
        status: ITabStatus;
        content: ReactNode;
    }[];
    active: T;
    onTabChange?: (tab: T) => void;
    showTabs?: boolean;
    onCloseTabs?: () => void;
}

export const AppTab = function<T extends string>({tabs, active, onTabChange, showTabs, onCloseTabs}: IAppTabProps<T>){
    const handleTabChange = (name: T) => {
        onTabChange?.(name);
        onCloseTabs?.();
    };

    return <Container>
        <TabsOverlay visible={showTabs} onClick={onCloseTabs} />
        <TabsContainer showTabs={showTabs}>
            <TabsBg />
            {tabs.map(({name, disabled, status})=>(
                <TabItem key={name} onClick={() => handleTabChange(name)} disabled={disabled} active={active === name}>
                    <TabNameContainer>
                        {                    
                            status === ITabStatus.IN_PROGRESS ? <ClockIcon /> : null
                        }
                        <Typography level={TypographyLevel.SEMIBOLD} >
                            {name}
                        </Typography>
                    </TabNameContainer>
                    {status === ITabStatus.COMPLETED ? <GreenTick /> : status === ITabStatus.NOT_STARTED ? <LockIcon /> : null}
                </TabItem>
            ))}
        </TabsContainer>
        <TabsContent>
            <div>
                <Tabs.Container active={active}>
                    {tabs.map(({name, disabled, content})=>(
                        <Tabs.Tab key={name} name={name} disabled={disabled}>
                           <TabContentContainer>    
                                {content}
                           </TabContentContainer>
                        </Tabs.Tab>
                    ))}
                </Tabs.Container>
            </div>
        </TabsContent>
    </Container>
}
