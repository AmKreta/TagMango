import { useRef } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { theme } from "../../theme/theme";
import { useOnClickOutside } from "../../hooks/onClickOutside";
import { CloseButton } from "../closeButton/CloseButton";

const Overlay = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Content = styled.div`
    position: relative;
    background: ${theme.colors.panelSolid};
    border-radius: ${theme.spaces.x16};
    padding: ${theme.spaces.x24};
    min-width: 400px;
    max-width: 90vw;
    max-height: 85vh;
    overflow: hidden auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    width: 600px;
    padding: ${theme.spaces.x48};
`;

interface IModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    overlayStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

export function Modal({ children, isOpen, onClose, overlayStyle, containerStyle }: IModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useOnClickOutside({ ref: contentRef, onClickOutside: onClose || (() => {}), enabled: isOpen });

    if (!isOpen) return null;

    return createPortal(
        <Overlay style={overlayStyle}>
            <Content ref={contentRef} style={containerStyle}>
                <CloseButton onClick={onClose} positionAbsolute={true} top={theme.spaces.x16} right={theme.spaces.x16}/>
                {children}
            </Content>
        </Overlay>,
        document.body
    );
}