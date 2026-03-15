import { useEffect } from "react"

interface Props{
    ref: React.RefObject<HTMLElement | null>;
    onClickOutside: () => unknown;
    enabled?: boolean;
}

export function useOnClickOutside({ref, onClickOutside, enabled = true}: Props){
    useEffect(()=>{
        if(!enabled) return;

        function onClick(e: MouseEvent){
            if(ref.current && !ref.current.contains(e.target as Node)){
                onClickOutside();
            }
        }
        window.addEventListener('mousedown', onClick);
        return () => window.removeEventListener('mousedown', onClick);
    },[ref, onClickOutside, enabled]);
}