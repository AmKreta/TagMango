import type {ReactElement, ReactNode} from 'react';

export interface ITab<T extends string>{
    disabled: boolean;
    name: T;
    children: ReactNode;
}

export interface ITabContainer<T extends string>{
    active: T;
    children: ReactElement<ITab<T>> | ReactElement<ITab<T>>[];
}