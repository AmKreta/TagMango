import styled from "@emotion/styled"
import { theme } from "../../theme/theme"
import userDp from '../../assets/userdp.png';
import { Typography } from "../../components/typography";
import { TypographyLevel } from "../../components/typography/constants";
import { Modal } from "../../components/modal/Modal";
import { useState } from "react";
import { CircularButton } from "../../components/CircularButton/CircularButton";
import { ImageIcon } from "../../assets/iageIcon";
import { YoutubeIcon } from "../../assets/youtubeIcon";
import { SmileSolidIcon } from "../../assets/smileSolidIcon";
import { Image } from "../../components/image/image";
import { PillButton } from "../../components/pillButton/PillButton";
import { Upload } from "../../components/upload/Upload";
import { useChallengeContext } from "./useChallengeContext";

export const CreatePost = function () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    return <BorderWrapper>
        <Container>
            <DPContainer>
                <img src={userDp} alt="user dp" />
            </DPContainer>
            <Typography onClick={handleOpenModal} level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x16} lineHeight={theme.lineHeight.x24} tone={theme.colors.neutralAlpha11}>
                Share what you completed today ?
            </Typography>
        </Container>
        <CreatePostModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
    </BorderWrapper>
}


const randomTexts = [
    "Today's challenge workout completed—feeling stronger already",
    "Crushed today's fitness task! Consistency is key",
    "Another day done! The grind never stops",
    "Just finished my workout. Small steps, big results",
    "Day completed! Feeling the progress in every rep",
    "Checked in for today. Energy levels are through the roof",
    "Done and dusted! This challenge is transforming my routine",
];

const CreatePostModal = function ({ isModalOpen, handleCloseModal }: { isModalOpen: boolean, handleCloseModal: () => void }) {
    const [hasFile, setHasFile] = useState(false);
    const { addUserPost } = useChallengeContext();

    const handleSubmit = () => {
        if (!hasFile) return;
        const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
        addUserPost({
            id: Date.now(),
            author: { name: "Ashraf Idrishi", profilePicURL: userDp },
            content: randomText,
            totalReactions: 18,
            totalComments: 10,
            created: Date.now(),
        });
        handleCloseModal();
    };

    return <Modal isOpen={isModalOpen} onClose={handleCloseModal} containerStyle={{background: 'linear-gradient(135deg, rgba(200, 190, 230, 0.4) 0%, rgba(220, 200, 210, 0.3) 40%, rgba(230, 200, 180, 0.35) 100%), white'}}>
        <ModalContainer>
            <ModalHeader>
                <Image height='96px' width='96px' src={userDp} />
                <Typography level={TypographyLevel.SEMIBOLD}>Ashraf Idarsi</Typography>
                <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x18} lineHeight={theme.lineHeight.x26} tone={theme.colors.neutralAlpha9}>What did you complete today?</Typography>
            </ModalHeader>
            <ModalBody>
                <Upload onFileChange={(file) => setHasFile(!!file)} />
            </ModalBody>
            <ModalFooter>
                <ModalFooterLeft>
                    <ImageButton>
                        <ImageIcon />
                    </ImageButton>
                    <YoutubeButton>
                        <YoutubeIcon />
                    </YoutubeButton>
                    <SmileButton>
                        <SmileSolidIcon />
                    </SmileButton>
                </ModalFooterLeft>
                <SubmitButton active={hasFile} onClick={handleSubmit}>
                    <Typography level={TypographyLevel.MEDIUM} tone={hasFile ? 'white' : theme.colors.neutralAlpha8}>Submit Checkin</Typography>
                </SubmitButton>
            </ModalFooter>
        </ModalContainer>
    </Modal>
}

const ImageButton = styled(CircularButton)`
    background: ${theme.colors.semanticInfo3};
`;

const YoutubeButton = styled(CircularButton)`
    background: ${theme.colors.sementicError3};

`;

const SmileButton = styled(CircularButton)`
    background: ${theme.colors.accent3};
`;

const BorderWrapper = styled.div`
    width: 640px;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(90.51deg, #B8860B 1.44%, #FFF0D1 97.91%);

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Container = styled.div`
    height: 64px;
    border-radius: 22px;
    padding: ${theme.spaces.x12};
    background: ${theme.colors.panelSolid};
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x12};
`

const DPContainer = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;

    img{
        height: 100%;
        width: 100%;
        object-position: center;
        object-fit: contain;
    }
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spaces.x32};
`;


const ModalHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${theme.spaces.x24};
    flex-direction: column;
`

const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModalFooterLeft = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spaces.x12};
`;

const ModalBody = styled.div``;

const SubmitButton = styled(PillButton)<{active?: boolean}>`
    cursor: pointer;
    width: 187px;
    height: 48px;
    border-radius: ${theme.radius.full};
    padding-right: ${theme.spaces.x5};
    padding-left: ${theme.spaces.x5};
    ${props => props.active && `
        background: ${theme.colors.accent9};
    `}
`;
