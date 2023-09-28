import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type HtagProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    tag: 'h1' | 'h2' | 'h3';
    color?: 'white' | 'gray'
    children: ReactNode;
}