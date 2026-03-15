import styled from "@emotion/styled";
import { theme } from "../../theme/theme";

export const CircularButton = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${theme.colors.neutral3};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.neutralAlpha4};
`;