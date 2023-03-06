import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { nextTick, isAndroid } from '@/utils/tools';
import classNames from 'classnames';
import { BasicInputProps } from '@/types/vip-ui/input';

export type InputEleType = HTMLInputElement | HTMLTextAreaElement;

export function useInputLogic(
    props: BasicInputProps<InputEleType>,
    inputRef: React.MutableRefObject<InputEleType | null>,
) {
    const {
        value,
        defaultValue,
        validator,
        onChange,
        onInput,
        className,
        style,
        label,
        required,
        prepend,
        append,
        blurBeforeFocus,
        onKeyDown,
        onPressEnter,
        onFocus,
        onBlur,
        onClick,
        disabled,
        border = 'half',
        prefix,
        suffix,
        autoFocus,
    } = props;
    const [inputValue, setInputValue] = useState(value || defaultValue || '');

    const [isFocusing, setIsFocusing] = useState(false);
    const shouldPreventEvent = useRef(false);
    const actualInputValue = value !== void 0 ? value : inputValue;
    const wrapRef = useRef<HTMLDivElement | null>(null);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 200);
        }
    }, [autoFocus, inputRef]);

    function changeValue(nowValue: string, callback = () => {}) {
        if (nowValue && validator) {
            if (typeof validator === 'function') {
                if (!validator(nowValue)) {
                    return;
                }
            } else if (!validator.test(nowValue)) {
                return;
            }
        }

        setInputValue(nowValue);
        callback();
    }

    function handleChange(e: React.ChangeEvent<InputEleType>) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onChange && onChange(e, newValue);
        });
    }

    function handleInput(e: any) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onInput && onInput(e, newValue);
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<InputEleType>) {
        if (e.keyCode === 13) {
            onPressEnter && onPressEnter(e);
        }
        onKeyDown && onKeyDown(e);
    }

    function handleFocus(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            if (shouldPreventEvent.current) {
                shouldPreventEvent.current = false;
                return;
            }
            setIsFocusing(true);

            onFocus && onFocus(e);
        });
    }

    function handleBlur(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            if (shouldPreventEvent.current) {
                return;
            }
            setIsFocusing(false);

            onBlur && onBlur(e);
        });
    }

    function handleClick(e: React.MouseEvent<InputEleType>) {
        // 安卓才会有键盘切换不过来的问题，ios不开启此项，因为blur之后不能再自动focus
        if (blurBeforeFocus && isAndroid() && !isFocusing) {
            inputRef.current && inputRef.current.blur();
            nextTick(() => {
                inputRef.current && inputRef.current.focus();
            });
        } else {
            inputRef.current && inputRef.current.focus();
        }
        onClick && onClick(e);
    }

    function renderPendNode(
        pend?: ReactNode | ((focusing: boolean, keyword: string) => ReactNode),
    ) {
        return typeof pend === 'function'
            ? pend(isFocusing, actualInputValue)
            : pend;
    }

    function renderWrapper(type: string, children: ReactNode) {
        return (
            <div
                role="search"
                className={className}
                style={style}
                ref={wrapRef}
            >
                {renderPendNode(prepend)}
                <div
                    className={classNames(
                        type,
                        `border-${border}`,
                        { disabled },
                        { prefix },
                        { suffix },
                    )}
                >
                    {label || prefix ? (
                        <div>
                            {label ? (
                                <div
                                    className={classNames({
                                        required,
                                    })}
                                >
                                    {label}
                                </div>
                            ) : (
                                prefix
                            )}
                        </div>
                    ) : null}
                    {children}

                    {suffix ? <div>{suffix}</div> : null}
                </div>
                {renderPendNode(append)}
            </div>
        );
    }

    return {
        inputValue: actualInputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
    };
}
