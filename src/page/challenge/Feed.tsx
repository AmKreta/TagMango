import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Typography } from "../../components/typography";
import { TypographyLevel } from "../../components/typography/constants";
import { FeedPost, type IPost } from "./FeedPost";
import dp from '../../assets/dp.jpg'
import { theme } from "../../theme/theme";
import { CreatePost } from "./createPost";
import { useChallengeContext } from "./useChallengeContext";

interface PageData{
    posts : IPost[],
    pinnedPosts : number[]
}

const postsData: PageData = {
    posts : Array.from({length: 10}, (_, index) => ({
            id: index,
            author: {
                name: "Russell Brunson",
                profilePicURL: dp,
            },
            content: `This 9-day fitness challenge is designed to help you build consistency, boost energy, and feel stronger—one day at a time. Each day comes with a simple, achievable fitness task that fits easily into your routine, no matter your current fitness level.
            1️⃣  ‎ Minimum 20 minutes of sit-up.
            2️⃣  ‎ Mention Intensity
            3️⃣  ‎ Upload Media (Optional)
            4️⃣  ‎ Upload Media (Optional)
            5️⃣  ‎ Upload Media (Optional)
            `,
            totalReactions: 100,
            totalComments: 100,
            created: 1715328000,
    })),
    pinnedPosts: [
        1,
    ]
}

const FeedContainer = styled.div`
    width: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spaces.x16};

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 ${theme.spaces.x12};
        box-sizing: border-box;
    }
`;

const FeedHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x8};
`;

const FeeItemsContainer = styled.div`
    width: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: ${theme.spaces.x16};
    padding: ${theme.spaces.x12} 0;
    border-radius: ${theme.spaces.x24};
    background: ${theme.colors.panelDefault};
    border: 1px solid ${theme.colors.neutral4};

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const RedPill = styled.div`
    height: 20px;
    padding: ${theme.spaces.x2} ${theme.spaces.x12};
    border-radius: ${theme.radius.full};
    background: ${theme.colors.sementicError9};
    display: flex;
    align-items: center;
`


export const Feed = function(){
    const { userPost, showConfetti } = useChallengeContext();
    const [confettiPhase, setConfettiPhase] = useState<'idle' | 'burst' | 'fade'>('idle');

    useEffect(() => {
        if (!showConfetti) return;
        const burstTimer = setTimeout(() => setConfettiPhase('burst'), 0);
        const fadeTimer = setTimeout(() => setConfettiPhase('fade'), 2000);
        const removeTimer = setTimeout(() => setConfettiPhase('idle'), 4000);
        return () => {
            clearTimeout(burstTimer);
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [showConfetti]);

    return <FeedContainer>
        {confettiPhase !== 'idle' && <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={300}
            gravity={0.15}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999,
                opacity: confettiPhase === 'fade' ? 0 : 1,
                transition: 'opacity 2s ease-out',
            }}
        />}
        {!userPost && <>
            <FeedHeader>
                <Typography level={TypographyLevel.SEMIBOLD}>Today's check-in</Typography> 
                <RedPill>
                    <Typography level={TypographyLevel.MEDIUM} fontSize={theme.fontSize.x12} tone={theme.colors.neutral3}>Ends in 20h 44m</Typography>
                </RedPill>
            </FeedHeader>
            <CreatePost />
        </>}
        <FeeItemsContainer>
            {userPost && <FeedPost {...userPost} withConfetti />}
            {postsData.posts.map((post)=>(
                <FeedPost key={post.id} {...post} isPinned={true}/>
            ))}
        </FeeItemsContainer>
    </FeedContainer>
}