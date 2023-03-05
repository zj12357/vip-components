import { ReactNode } from 'react';
import { IRules } from '@/types/expand/rules';
import { FormInternalComponentType } from '@/enums/expand/form';

export type FieldValue = any;
export type FieldItem = Record<string, any>;
export type ILayout = 'horizontal' | 'vertical' | 'inline';

export interface FormProps {
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;

    /**
     * 表单实例
     */
    form?: IFormInstance;
    /**
     * 表单初始数据
     */
    initialValues?: FieldItem;

    children: React.ReactNodeArray | ReactNode;
    /**
     * 表单项数据变化时的回调
     */
    onValuesChange?: Callbacks['onValuesChange'];
    /**
     * 表单项数据变化时的回调
     */
    onSubmit?: Callbacks['onSubmit'];
    /**
     * 表单项数据变化时的回调
     */
    onSubmitFailed?: Callbacks['onSubmitFailed'];
    /**
     * 表单禁止输入
     */
    disabled?: boolean;
}

export interface IFieldError {
    value?: FieldValue;
    errors?: ReactNode[];
    field?: string;
    dom?: HTMLDivElement | null;
}
export interface IFormDataMethods {
    /**
     * 设置多个表单项值
     */
    setFieldsValue: (values: FieldItem) => boolean;
    /**
     * 设置单个表单项值
     */
    setFieldValue: (name: string, value: FieldValue) => boolean;
    /**
     * 获取多个表单项值
     */
    getFieldsValue: (names?: string[]) => FieldItem;
    /**
     * 获取单个表单项值
     */
    getFieldValue: (name: string) => FieldValue;
    /**
     * 注册表单项
     */
    registerField: (name: string, self: ReactNode) => () => void;
}

export interface Callbacks {
    /**
     * 表单项数据变化时的回调
     */
    onValuesChange?: (changedValues: FieldValue, values: FieldValue) => void;
    /**
     * 表单项数据变化时的回调
     */
    onSubmit?: (values: FieldValue, otherInfo?: IFieldError[]) => void;
    /**
     * 表单项数据变化时的回调
     */
    onSubmitFailed?: (
        values: FieldValue,
        errorInfo: IFieldError[] | Error,
    ) => void;
}

export interface InternalHooks {
    /**
     * 注册表单项
     */
    registerField: (name: string, self: ReactNode) => () => void;
    setInitialValues: (values: FieldItem) => void;
    setCallbacks: (callbacks: Callbacks) => void;
}

export interface IFormInstance {
    /**
     * 获取单个表单项值
     */
    getFieldValue: (name: string) => FieldValue;
    /**
     * 获取多个表单项值
     */
    getFieldsValue(name?: string[]): FieldItem;
    /**
     * 获取单个表单项的错误
     */
    getFieldError(name: string): ReactNode[];
    /**
     * 重置表单项
     */
    resetFields: () => void;
    /**
     * 设置单个表单项值
     */
    setFieldValue: (name: string, value: FieldValue) => boolean;
    /**
     * 设置多个表单项值
     */
    setFieldsValue: (value: FieldItem) => void;
    /**
     * 校验所有表单项
     */
    validateFields: () => Promise<FieldItem>;
    /**
     * 提交表单
     */
    submit: () => void;
}

export type InternalFormInstance = Omit<IFormInstance, 'validateFields'> & {
    /**
     * 校验所有表单项
     */
    validateFields: () => Promise<FieldItem>;
    /**
     * 获取内部方法
     */
    getInternalHooks: () => InternalHooks;
};

export interface FormRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLFormElement | null;
    /**
     * Form对象实例
     */
    form: IFormInstance;
}

export interface IFormItemContext {
    /**
     * Form对象实例
     */
    form: InternalFormInstance;
    /**
     * 表单是否禁用
     */
    disabled?: boolean;
}

export type IShouldUpdateFunc = (data: {
    preStore: FieldItem;
    curStore: FieldItem;
}) => boolean;
export interface FormItemProps {
    /**
     * 表单项名
     */
    label: ReactNode;
    /**
     * 表单项Stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 表单项样式
     */
    className?: string;
    /**
     * 表单项字段
     */
    field: string;
    /**
     * 表单项是否必填
     */
    required?: boolean;
    /**
     * 表单项是否禁用
     */
    disabled?: boolean;

    /**
     * 表单项子节点
     */
    children: JSX.Element;
    /**
     * 表单项规则
     */
    rules?: IRules[];
    /**
     * 表单项下方节点
     */
    extra?: JSX.Element;
    /**
     * 触发事件更新事件名称
     * @default "onChange"
     */
    trigger?: string;
    /**
     * 自定义必填标识
     */
    requiredIcon?: ReactNode;
    /**
     * 表单项初始数据
     */
    initialValue?: FieldValue;
    /**
     * 手动指定为内置组件的类型
     */
    displayType?: FormInternalComponentType;
}

export interface FormItemRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
}

export interface IFormItemInnerProps {
    /**
     * 表单项字段
     */
    field: string;
    /**
     * 表单项子节点
     */
    children: JSX.Element;
    /**
     * 表单项下方节点
     */
    rules?: IRules[];
    /**
     * 触发事件更新事件名称
     * @default "onChange"
     */
    trigger?: string;
    /**
     * 校验状态变化回调
     */
    onValidateStatusChange: (errors: string[]) => void;
    /**
     * 获取内部表单项的dom
     */
    getFormItemRef: () => HTMLDivElement | null;
    /**
     * 自定义表单项存储值的字段名
     */
    triggerPropsField?: string;
    /**
     * 表单项是否禁用
     */
    disabled?: boolean;
    /**
     * 表单项初始数据
     */
    initialValue?: FieldValue;
    /**
     * 手动指定为内置组件的类型
     */
    displayType?: FormInternalComponentType;
}
