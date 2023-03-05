export interface LoadingProps {
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 主颜色
     */
    color?: string;
    /**
     * 一次loading周期的毫秒数
     */
    duration?: number;
    /**
     * 描边宽度
     */
    stroke?: number;
}
