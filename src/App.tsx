import styled from '@emotion/styled';
import { useState, useCallback } from 'react';
import './App.css'
import { Challenge } from './page/challenge'
import { theme } from './theme/theme';
import { AppLogo } from './assets/appLogo';
import { CircularButton } from './components/CircularButton/CircularButton';
import { PillButton } from './components/pillButton/PillButton';
import { Bell } from './assets/bell';
import { MenuButton } from './assets/menuButton';
import userDP from './assets/userdp.png';
import { Typography } from './components/typography';
import { TypographyLevel } from './components/typography/constants';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AppHeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid ${theme.colors.neutralAlpha6};
  background-color: ${theme.colors.panelDefault};
`;

const HeaderRightTools = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.x12};
`;

const HeaderLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.x12};
`;

const BurgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.neutralAlpha6};
  background: ${theme.colors.panelDefault};
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ProfileCntainer = styled.div`
  height: 32px;
  width: 32px;
  overflow: hidden;
  border-radius: 50%;

  img{
    height: 100%;
    width: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(() => document.body.dataset.themeMode === 'dark');
  const [showTabs, setShowTabs] = useState(false);

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    document.body.dataset.themeMode = next;
    setIsDark(!isDark);
  }, [isDark]);

  return <AppContainer>
    <AppHeaderContainer>
      <HeaderLeftGroup>
        <BurgerButton onClick={() => setShowTabs(prev => !prev)}>
          <MenuButton />
        </BurgerButton>
        <AppLogo />
      </HeaderLeftGroup>
      <HeaderRightTools>
        <CircularButton onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDark ? '☀️' : '🌙'}
        </CircularButton>
        <PillButton>
         🔥
         <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x12} lineHeight={theme.lineHeight.x16} tone={theme.colors.text}>
          30
         </Typography>
        </PillButton>
        <CircularButton>
          <Bell />
        </CircularButton>
        <CircularButton>
          <ProfileCntainer>
            <img src={userDP} alt="user dp" />
          </ProfileCntainer>
        </CircularButton>
      </HeaderRightTools>
    </AppHeaderContainer>
    <Challenge showTabs={showTabs} onCloseTabs={() => setShowTabs(false)} />
  </AppContainer>;
}

export default App
