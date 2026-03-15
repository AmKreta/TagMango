import styled from "@emotion/styled";
import { theme } from "../../theme/theme";
import { Typography } from "../typography";
import { TypographyLevel } from "../typography/constants";

const Container = styled.div`
    background: ${theme.colors.neutralAlpha3};
    display: flex;
    flex-direction: column;
     width: 244px;
    height: 90px;
    gap: ${theme.spaces.x8};
    padding: ${theme.spaces.x16};
    border-radius: ${theme.spaces.x24};
    border-width: 1px;
`;

interface InfoCardProps {
    title: string;
    value: string | number;
}

export function InfoCard({ title, value }: InfoCardProps) {
    return <Container>
        <Typography level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x14} tone={theme.colors.neutralAlpha11}>{title}</Typography>
        <Typography level={TypographyLevel.SEMIBOLD} fontSize={theme.fontSize.x18}>{value}</Typography>
    </Container>
}
