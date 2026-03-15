import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "../../theme/theme";
import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { Typography } from "../typography";
import { TypographyLevel } from "../typography/constants";
import { UploadIcon } from "../../assets/uploadIcon";

interface UploadProps {
    width?: string;
    height?: string;
    accept?: string;
    description?: string;
    onFileChange?: (file: File | null) => void;
}

const Container = styled.div<{ width: string; height: string; isDragging: boolean; hasFile: boolean }>`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: ${theme.spaces.x16};
    background-color: ${theme.colors.neutralAlpha3};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background-color 0.2s;

    ${props => props.isDragging && css`
        background-color: ${theme.colors.neutralAlpha4};
    `}

    &:hover {
        background-color: ${theme.colors.neutralAlpha4};
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const Placeholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spaces.x8};
    pointer-events: none;
`;

const Preview = styled.div`
    width: 100%;
    height: 100%;

    img, video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: ${theme.spaces.x8};
    right: ${theme.spaces.x8};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &:hover {
        background: rgba(0, 0, 0, 0.7);
    }
`;

const Description = styled(Typography)`
    white-space: pre-wrap;
    text-align: center;
`;

const DEFAULT_DESCRIPTION = "Images/Videos should be horizontal, at least 1280×720px.\nThe maximum image size should be 2MB.";

export function Upload({
    width = "100%",
    height = "376px",
    accept = "image/*,video/*",
    description = DEFAULT_DESCRIPTION,
    onFileChange,
}: UploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((newFile: File | null) => {
        if (file) URL.revokeObjectURL(preview!);
        setFile(newFile);
        setPreview(newFile ? URL.createObjectURL(newFile) : null);
        onFileChange?.(newFile);
    }, [file, preview, onFileChange]);

    const onDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFile(dropped);
    }, [handleFile]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) handleFile(selected);
    }, [handleFile]);

    const onRemove = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        handleFile(null);
        if (inputRef.current) inputRef.current.value = "";
    }, [handleFile]);

    const isImage = file?.type.startsWith("image/");
    const isVideo = file?.type.startsWith("video/");

    return (
        <Container
            width={width}
            height={height}
            isDragging={isDragging}
            hasFile={!!file}
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <HiddenInput ref={inputRef} type="file" accept={accept} onChange={onChange} />

            {file && preview ? (
                <>
                    <Preview>
                        {isImage && <img src={preview} alt={file.name} />}
                        {isVideo && <video src={preview} controls />}
                    </Preview>
                    <RemoveButton onClick={onRemove}>&times;</RemoveButton>
                </>
            ) : (
                <Placeholder>
                    <UploadIcon />
                    <Typography level={TypographyLevel.MEDIUM}>Upload</Typography>
                    {description && <Description level={TypographyLevel.REGULAR} fontSize={theme.fontSize.x12} lineHeight={theme.lineHeight.x20} tone={theme.colors.neutralAlpha11}>{description}</Description>}
                </Placeholder>
            )}
        </Container>
    );
}
