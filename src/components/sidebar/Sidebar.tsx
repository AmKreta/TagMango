import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "../../theme/theme";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "../../hooks/onClickOutside";
import { CloseIcon } from "../../assets/closeIcon";

type Side = "left" | "right";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    showCloseButton?: boolean;
    side?: Side;
    width?: string;
    overlayStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

const Overlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    opacity: ${props => props.isOpen ? 1 : 0};
    pointer-events: ${props => props.isOpen ? "auto" : "none"};
    transition: opacity 0.3s ease;
`;

const Panel = styled.div<{ isOpen: boolean; side: Side; width: string }>`
    position: fixed;
    top: 0;
    bottom: 0;
    ${props => props.side}: 0;
    width: ${props => props.width};
    max-width: 90vw;

    @media (max-width: 768px) {
        width: 75vw;
    }
    background: ${theme.colors.panelSolid};
    box-shadow: ${props => props.side === "right"
        ? "-8px 0 24px rgba(0, 0, 0, 0.12)"
        : "8px 0 24px rgba(0, 0, 0, 0.12)"};
    z-index: 1001;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    ${props => {
        const offscreen = props.side === "right" ? "translateX(100%)" : "translateX(-100%)";
        return props.isOpen
            ? css`transform: translateX(0);`
            : css`transform: ${offscreen};`;
    }}
`;

const CloseButton = styled.div`
    position: absolute;
    top: ${theme.spaces.x16};
    right: ${theme.spaces.x16};
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: ${theme.radius.full};
    background: ${theme.colors.neutralAlpha3};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const Header = styled.div`
    flex-shrink: 0;
`;

const Content = styled.div`
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
`;

const Footer = styled.div`
    flex-shrink: 0;
`;

export function Sidebar({
    isOpen,
    onClose,
    header,
    children,
    footer,
    showCloseButton = true,
    side = "right",
    width = "400px",
    overlayStyle,
    containerStyle,
}: SidebarProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useOnClickOutside({ ref: panelRef, onClickOutside: onClose, enabled: isOpen });

    return createPortal(
        <>
            <Overlay isOpen={isOpen} style={overlayStyle} />
            <Panel ref={panelRef} isOpen={isOpen} side={side} width={width} style={containerStyle}>
                {showCloseButton && (
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                )}
                {header && <Header>{header}</Header>}
                <Content>{children}</Content>
                {footer && <Footer>{footer}</Footer>}
            </Panel>
        </>,
        document.body
    );
}
