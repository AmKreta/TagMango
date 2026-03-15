import styled from "@emotion/styled";
import { theme } from "../../theme/theme";

export const PillButton = styled.div<{width?: string, disabled?: boolean}>`
    height: 32px;
    gap: ${theme.spaces.x4};
    padding: 1px ${theme.spaces.x12};
    border-radius: ${theme.spaces.x16};
    background-color: ${theme.colors.neutral3};
    display: flex;
    align-items: center;
    justify-content: center;
`;  