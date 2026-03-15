import { css } from "@emotion/react"
import { theme } from "../../theme/theme"
import styled from "@emotion/styled"
import type { HtmlHTMLAttributes, ReactNode } from "react"
import React from "react"
import { TypographyLevel } from "./constants"

const TypographyStyles = {
    [TypographyLevel.SEMIBOLD]: css`
        font-weight: ${theme.fontWeight.semibold};
        font-size: ${theme.fontSize.x16};
        line-height: ${theme.lineHeight.x24};
        color: ${theme.colors.text};
    `,
    [TypographyLevel.REGULAR]: css`
        font-weight: ${theme.fontWeight.regular};
        font-size: ${theme.fontSize.x12};
        line-height: ${theme.lineHeight.x16};
        letter-spacing: ${theme.letterSpacing['1']};
        color: ${theme.colors.text};
    `,
    [TypographyLevel.MEDIUM]: css`
        font-weight: ${theme.fontWeight.medium};
        font-size: ${theme.fontSize.x14};
        line-height: ${theme.lineHeight.x20};
        letter-spacing: ${theme.letterSpacing['1']};
        color: ${theme.colors.text};
    `
}

const TypographyContainer = styled.div<ITypographyProps>`
    ${({level}) => TypographyStyles[level]}
    font-family: 'Be Vietnam Pro', sans-serif;
    font-weight: ${({fontWeight}) => fontWeight};
    font-size: ${({fontSize}) => fontSize};
    line-height: ${({lineHeight}) => lineHeight};
    letter-spacing: ${({letterSpacing}) => letterSpacing};
    color: ${({tone}) => tone};
`

export type ITypographyProps = {
    level: TypographyLevel;
    children: ReactNode;
    as?: string | React.ElementType;
} & Partial<{ tone: string;
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;}>

export const Typography: React.FC<ITypographyProps & HtmlHTMLAttributes<HTMLDivElement>> = function({level, children, as, ...props}){
    return <TypographyContainer level={level} {...props}>
        {as ? React.createElement(as, {children}) : children}
    </TypographyContainer>
}