import styled from "@emotion/styled";
import { theme } from "../../theme/theme";
import { CloseIcon } from "../../assets/closeIcon";

interface PositionProps{
    top?: string, left?: string, right?: string, bottom?: string; positionAbsolute?: boolean;
}

type CloseButtonProps = PositionProps & {
    onClick?: () => void;
}

export function CloseButton({ onClick, top, left, right, bottom, positionAbsolute }: CloseButtonProps) {
    return <CloseButtonContainer onClick={onClick} top={top} left={left} right={right} bottom={bottom} positionAbsolute={positionAbsolute}>
        <CloseIcon />
    </CloseButtonContainer>
}
const CloseButtonContainer = styled.div<PositionProps>`
    position: ${props => props.positionAbsolute ? 'absolute' : 'relative'};
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: ${theme.radius.full};
    background: ${theme.colors.neutralAlpha3};
    display: flex;
    align-items: center;
    justify-content: center;
`;