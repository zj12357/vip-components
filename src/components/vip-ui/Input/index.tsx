import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { componentWrapper } from '@/utils/componentType';
import { InputProps, InputRef } from '@/types/expand/input';
import { useInputLogic } from './hooks';

const Input = forwardRef((props: InputProps, ref: Ref<InputRef>): any => {
    const {
        id,
        name,
        maxLength,
        placeholder,
        readOnly,
        onKeyUp,
        onKeyPress,
        type = 'text',
        disabled,
        pattern,
        inputClass,
        inputStyle,
        nativeProps = {},
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        inputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
    } = useInputLogic(props as any, inputRef);

    //  把最外层元素，input元素暴露给父组件
    useImperativeHandle(ref, () => ({
        dom: wrapRef.current,
        input: inputRef.current,
    }));

    function renderInput() {
        return renderWrapper(
            type,
            <input
                {...nativeProps}
                id={id}
                name={name}
                maxLength={maxLength}
                placeholder={placeholder}
                readOnly={readOnly}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
                ref={inputRef}
                className={inputClass}
                style={inputStyle}
                value={inputValue}
                type={type}
                disabled={disabled}
                pattern={pattern}
                onChange={handleChange}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
            />,
        );
    }

    return renderInput();
});

/**
 * 输入框组件，支持添加前后缀。
 * @displayName Input
 */
export default componentWrapper(Input, 'Input');
