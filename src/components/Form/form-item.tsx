import React, {
    forwardRef,
    PureComponent,
    ReactNode,
    Ref,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { ValidatorError } from '@/types/expand/rules';
import { Validator } from '@/utils/validator';
import { ValidatorType, ValidateStatus } from '@/enums/validatorEnum';
import { FormInternalComponentType } from '@/enums/formEnum';
import {
    IFieldError,
    FieldItem,
    FieldValue,
    IFormItemContext,
    IFormItemInnerProps,
    FormItemProps,
    FormItemRef,
} from '@/types/expand/form';

import { FormItemContext } from './form-item-context';

import classname from 'classnames';
import { getErrors, isFieldRequired } from './utils';

interface IFromItemInnerState {
    validateStatus: ValidateStatus;
    errors?: ReactNode[];
}

class FormItemInner extends PureComponent<
    IFormItemInnerProps,
    IFromItemInnerState
> {
    context!: React.ContextType<typeof FormItemContext>;

    destroyField: () => void;

    private _errors: string[] = [];

    constructor(props: IFormItemInnerProps, context: IFormItemContext) {
        super(props);
        this.destroyField = () => {};
        if (props?.initialValue && props.field) {
            const { setInitialValues } = context.form.getInternalHooks();
            setInitialValues({ [props.field]: props.initialValue });
        }
    }

    componentDidMount() {
        const { registerField } = this.context.form.getInternalHooks();
        this.destroyField = registerField(this.props.field, this as any);
    }

    componentWillUnmount() {
        this.destroyField();
    }

    onValueChange() {
        this.forceUpdate();
    }

    getFieldError() {
        return this._errors;
    }

    validateField(): Promise<IFieldError> {
        const { validateMessages } = this.context;
        const { getFieldValue } = this.context.form;
        const { field, rules, onValidateStatusChange } = this.props;
        const value = getFieldValue(field);
        if (rules?.length && field) {
            const fieldDom = this.props.getFormItemRef();
            const fieldValidator = new Validator(
                { [field]: rules },
                { validateMessages },
            );
            return new Promise((resolve) => {
                fieldValidator.validate(
                    { [field]: value },
                    (errorsMap: Record<string, ValidatorError[]>) => {
                        const { errors } = getErrors(errorsMap?.[field] || []);
                        this._errors = errors;
                        onValidateStatusChange(this._errors);
                        return resolve({
                            errors: this._errors,
                            value,
                            field,
                            dom: fieldDom,
                        });
                    },
                );
            });
        }
        return Promise.resolve({
            errors: [],
            value,
            field,
            dom: null,
        });
    }

    setFieldData(value: FieldValue) {
        const { field } = this.props;
        const { setFieldValue } = this.context.form;
        setFieldValue(field, value);
        this.validateField();
    }

    innerTriggerFunction = (_: any, value: any, ...args: any) => {
        this.setFieldData(value);
        const { children, trigger } = this.props;
        if (trigger && children.props?.[trigger]) {
            children.props?.[trigger](_, value, ...args);
        }
    };

    innerTriggerFunctionWithValueFirst = (value: any, ...args: any) => {
        this.setFieldData(value);
        const { children, trigger } = this.props;
        if (trigger && children.props?.[trigger]) {
            children.props?.[trigger](value, ...args);
        }
    };

    renderChildren() {
        const {
            children,
            field,
            trigger = 'onChange',
            triggerPropsField = 'value',
            displayType,
        } = this.props;
        const { getFieldValue } = this.context.form;
        let props = {
            [triggerPropsField]: getFieldValue(field),
            disabled: this.props.disabled,
        };
        const childrenType = displayType || children.type?.displayName;
        switch (childrenType) {
            case FormInternalComponentType.Input:
            case FormInternalComponentType.Textarea:
                props = {
                    value: getFieldValue(field) || '',
                    onInput: this.innerTriggerFunction,
                    disabled: this.props.disabled,
                };
                break;
            case FormInternalComponentType.Checkbox:
            case FormInternalComponentType.Radio:
                props = {
                    value: getFieldValue(field),
                    onChange: this.innerTriggerFunctionWithValueFirst,
                    disabled: this.props.disabled,
                };
                break;

            default: {
                const originTrigger = children.props[trigger];
                props.error = this._errors;
                props[trigger] = (newValue: any, ...args: any) => {
                    this.setFieldData(newValue);
                    originTrigger && originTrigger(newValue, ...args);
                };
            }
        }

        return React.cloneElement(children, props);
    }

    render() {
        return this.renderChildren();
    }
}
FormItemInner.contextType = FormItemContext;

export default forwardRef((props: FormItemProps, ref: Ref<FormItemRef>) => {
    const {
        label,
        field,
        disabled = false,
        style,
        extra,
        requiredIcon,
        rules,
        className = '',
        ...rest
    } = props;

    const { disabled: propsDisabled } = useContext(FormItemContext);
    const [errors, setErrors] = useState<ReactNode | null>(null);
    const formItemRef = useRef<HTMLDivElement | null>(null);

    const onValidateStatusChange = (errors: string[]) => {
        setErrors(errors.length ? errors[0] : null);
    };

    const getFormItemRef = () => {
        return formItemRef.current;
    };

    const fieldDisabled = disabled || propsDisabled;

    //字段校验规则
    const fieldRules = rest?.required
        ? [{ type: ValidatorType.String, required: true }, ...(rules || [])]
        : rules;

    //是否必填
    const isRequired = isFieldRequired(rules) || rest?.required;

    useImperativeHandle(ref, () => ({
        dom: formItemRef.current,
    }));

    return (
        <div
            className={classname(className, 'flex')}
            style={style}
            ref={formItemRef}
        >
            <div>
                {isRequired
                    ? requiredIcon || (
                          <span className="m-primary-error-color">*</span>
                      )
                    : null}
                {label}
            </div>
            <div>
                <div>
                    <FormItemInner
                        {...rest}
                        rules={fieldRules}
                        disabled={fieldDisabled}
                        field={field}
                        onValidateStatusChange={onValidateStatusChange}
                        getFormItemRef={getFormItemRef}
                    />
                </div>
                {errors && (
                    <div className="m-primary-error-color">{errors}</div>
                )}
            </div>
            {extra}
        </div>
    );
});
