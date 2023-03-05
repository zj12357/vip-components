import { CSSProperties, ReactNode } from 'react';

export interface EmptyProps {
    /**
     * 自定义样式
     */
    style?: CSSProperties;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义图标
     */
    icon?: ReactNode;
    /**
     * 自定义文案
     * @default 暂无数据
     */
    description?: string | ReactNode;
}

export interface EmptyRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
}
