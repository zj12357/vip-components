import React, { FC } from 'react';
import { LoadingProps } from '@/types/expand/loading';
import classNames from 'classnames';
import './index.scoped.scss';

const Loading: FC<LoadingProps> = (props) => {
    const { stroke = 2, color, duration = 1500, style, className } = props;
    const statusList = [1, 0.1, 0.2286, 0.3572, 0.4858, 0.6144, 0.743, 0.8716];
    const len = statusList.length;

    return (
        <div
            className={classNames(className, 'spin')}
            style={{
                animationDuration: `${duration}ms`,
                ...(style || {}),
            }}
        >
            {statusList.map((opacity, index) => (
                <span
                    key={index}
                    className="spin-cell"
                    style={{
                        opacity,
                        transform: `rotate(${index / len}turn)`,
                        width: stroke,
                    }}
                >
                    <span
                        className="spin-cell-inner m-primary-background"
                        style={{
                            backgroundColor: color,
                            ...{ borderRadius: stroke },
                        }}
                    />
                </span>
            ))}
        </div>
    );
};

export default Loading;
