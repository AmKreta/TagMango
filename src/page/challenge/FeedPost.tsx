import styled from "@emotion/styled";
import { Typography } from "../../components/typography";
import { TypographyLevel } from "../../components/typography/constants";
import { theme } from "../../theme/theme";
import { MenuButton } from "../../assets/menuButton";
import { Smile } from "../../assets/smile";
import { Comment } from "../../assets/comment";
import { PinIcon } from "../../assets/pinIcon";
import { CircularButton } from "../../components/CircularButton/CircularButton";
import { PillButton } from "../../components/pillButton/PillButton";

export interface IPost {
    id: number;
    author: {
        name: string,
        profilePicURL: string,
    },
    content: string,
    totalReactions: number;
    totalComments: number;
    created: number;
}

const ImageContainer = styled.div`
    height:48px;
    width:48px;
    overflow: hidden;
    border-radius: 50%;
    background-color: ${theme.colors.neutral3};
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Container = styled.div`
    width: 616px;
    border-radius: 24px;
    border-width: 1px;
    border: 1px solid ${theme.colors.neutral4};
    margin: auto;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 72px;
    gap: ${theme.spaces.x8};
    border-bottom-width: 1px;
    padding: ${theme.spaces.x12};
    box-sizing: border-box;
    img{
        height:48px;
        width:48px;
    }
`;

const Content = styled.div`
    padding: ${theme.spaces.x12};
    display: flex;
    gap: ${theme.spaces.x8};
    flex-direction: column;
    align-items: flex-start;
`;

const Footer = styled.div`
 padding: ${theme.spaces.x12};
 display: flex;
 align-items: center;
 gap: 2px;
`;

const Pin = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${theme.spaces.x8};
    padding-top: ${theme.spaces.x8};
    padding-right:${theme.spaces.x12};
    padding-bottom:${theme.spaces.x8};
    padding-left:${theme.spaces.x12};
    border-bottom: 1px solid ${theme.colors.neutral4};
`

const ConfettiBanner = styled.div`
    width: 100%;
    padding: ${theme.spaces.x12};
    text-align: center;
    background: linear-gradient(135deg, rgba(200, 230, 200, 0.3) 0%, rgba(220, 240, 220, 0.2) 100%);
    border-bottom: 1px solid ${theme.colors.neutral4};
    border-radius: 24px 24px 0 0;
    position: relative;
    overflow: hidden;
`

export function FeedPost(props: IPost & { isPinned?: boolean; withConfetti?: boolean }) {
    return <Container>
        {
            props.withConfetti && <ConfettiBanner>
                <Typography level={TypographyLevel.MEDIUM} fontSize={theme.fontSize.x14} tone="#30A46C">
                    🎊 Your Submission 🎉
                </Typography>
            </ConfettiBanner>
        }
        {
            props.isPinned && !props.withConfetti && <Pin>
                <PinIcon />
                <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x12} tone={theme.colors.neutralAlpha11}>This is a pinned post</Typography>
            </Pin>
        }
        <Header>
            <ImageContainer>
                <img src={props.author.profilePicURL} alt={props.author.name} />
            </ImageContainer>
            <InfoContainer>
                <div>
                    <Typography level={TypographyLevel.SEMIBOLD}>{props.author.name}</Typography>
                    <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x12} tone={theme.colors.neutralAlpha11}>3 hours ago</Typography>
                </div>
                <MenuButton />
            </InfoContainer>
        </Header>
        <Content>
            {props.content.split('\n').map((str, index) => <Typography level={TypographyLevel.REGULAR} key={index} lineHeight={theme.lineHeight.x20} fontSize={theme.fontSize.x14}>{str}</Typography>)}
        </Content>
        <Footer>
            <PillButton>
                <Typography level={TypographyLevel.MEDIUM}>🙏</Typography>
                <Typography level={TypographyLevel.MEDIUM}> 😍</Typography>
                <Typography level={TypographyLevel.MEDIUM}>{props.totalReactions}</Typography>
            </PillButton>
            <CircularButton>
                <Smile />
            </CircularButton>
            <CircularButton>
                <Comment />
            </CircularButton>
        </Footer>
    </Container>
}