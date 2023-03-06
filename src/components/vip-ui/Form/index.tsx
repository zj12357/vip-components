import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
} from 'react';
import { componentWrapper } from '@/utils/componentType';
import { FormProps, FormRef, InternalFormInstance } from '@/types/vip-ui/form';
import { FormItemContext } from './form-item-context';
import useForm from './useForm';
import Item from './form-item';

export { default as useForm } from './useForm';

const Form = forwardRef((props: FormProps, ref: Ref<FormRef>) => {
    const {
        className = '',
        style,
        initialValues,
        form: formInstance,
        children,
        onValuesChange,
        onSubmit,
        onSubmitFailed,
        disabled,
    } = props;
    const domRef = useRef<HTMLFormElement | null>(null);
    const [form] = useForm(formInstance);
    const { setCallbacks, setInitialValues } = (
        form as InternalFormInstance
    ).getInternalHooks();

    setCallbacks({
        onValuesChange,
        onSubmit,
        onSubmitFailed,
    });

    useEffect(() => {
        setInitialValues(initialValues || {});
    }, [initialValues, setInitialValues]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        form,
    }));

    const contextValue = {
        form: form as InternalFormInstance,
        disabled,
    };

    return (
        <form
            className={className}
            style={style}
            ref={domRef}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.submit();
            }}
        >
            <FormItemContext.Provider
                value={{
                    ...contextValue,
                }}
            >
                {children}
            </FormItemContext.Provider>
        </form>
    );
});

export default componentWrapper(Form, {
    Item,
});
