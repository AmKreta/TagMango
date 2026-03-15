import { useMemo, type ReactElement } from "react";
import type { ITab, ITabContainer } from "./types";

export const Container = function<T extends string>({active, children}: ITabContainer<T>){
    const tabMap: Record<T, ReactElement<ITab<T>>> = useMemo(()=>{
        if(!Array.isArray(children)) return {
            [children.props.name]: children,
        } as Record<T, ReactElement<ITab<T>>>;
        return children.reduce((acc, child)=>{
            acc[child.props.name] = child;
            return acc;
        },{} as Record<string, ReactElement<ITab<T>>>);
    },[children]);

    return tabMap[active];
}

export const Tab = function<T extends string>({children, disabled}: ITab<T>){
   if(disabled) return null;
   return children;
}