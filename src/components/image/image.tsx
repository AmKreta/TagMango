import styled from "@emotion/styled";

type ImageProps = {height?: number | string, width?: number | string, size?: number | string; radius?: number | string};

const Container = styled.div<ImageProps>`
    height: ${props=>(props.size || props.height)};
    width: ${props=>(props.size || props.width)};
    border-radius: ${props=>(props.radius || '50%')};
    overflow: hidden;

    img{
        height: 100%;
        width: 100%;
        object-position: center;
        object-fit: cover;
    }
`;

export const Image = function({height, width, size, radius, ...props}:ImageProps & React.ImgHTMLAttributes<HTMLImageElement>){
    return <Container height={height} width={width} size={size} radius={radius}>
        <img {...props} />
    </Container>
}