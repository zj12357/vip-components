import { ReactNode, useRef } from 'react';
import {
    Callbacks,
    IFieldError,
    FieldItem,
    IFormInstance,
} from '@/types/expand/form';

const defaultFunc: any = () => {};

export const defaultFormDataMethods = {
    // 获取某个字段的值
    getFieldValue: (name: string) => name,

    // 获取多个字段的值
    getFieldsValue: (_names?: string[]) => {
        return {};
    },
    // 获取某个字段的错误信息
    getFieldError: (_name: string) => [],

    // 给某个字段设置值
    setFieldValue: (_name: string, _value: any) => {
        return true;
    },
    // 给多个字段设置值
    setFieldsValue: (_values: any) => {
        return true;
    },

    // 注册字段
    registerField: (_name: string, _self: ReactNode) => {
        return () => {};
    },
    // 重置表单
    resetFields: defaultFunc,
    // 校验表单
    validateFields: defaultFunc,
    // 提交表单
    submit: defaultFunc,

    // 获取内部hooks
    getInternalHooks: () => {
        return {
            registerField: defaultFunc,
            setInitialValues: defaultFunc,
            setCallbacks: defaultFunc, //提交成功，提交失败，表单值变化3个事件
        };
    },
};

// 在field的静态的状态下设置
class FormData {
    private _formData: FieldItem = {}; // 数据源

    private _fieldsList: any = {}; // 字段列表

    private _initialValues: Record<string, unknown> = {}; // 初始值

    private _callbacks: Callbacks = {};

    setFieldsValue = (values: FieldItem): boolean => {
        this._formData = { ...this._formData, ...values };
        this.notifyField(values);
        Object.keys(values).forEach((key) => {
            if (key in this._fieldsList) {
                this._fieldsList[key]?.onValueChange();
            }
        });
        return true;
    };

    setFieldValue = (name: string, value: unknown): boolean => {
        this._formData = { ...this._formData, [name]: value };
        const { onValuesChange } = this._callbacks;
        onValuesChange &&
            onValuesChange(
                {
                    [name]: value,
                },
                this._formData,
            );
        this.notifyField({ [name]: value });
        return true;
    };

    //更新表单值
    notifyField = (values: FieldItem): void => {
        Object.keys(values).map((fieldName: string) => {
            const fieldObj = this._fieldsList?.[fieldName] || null;
            if (fieldObj) {
                fieldObj.onValueChange();
            }
        });
    };

    getFieldsValue = (names?: string[]) => {
        if (names) {
            return names.map((name) => this.getFieldValue(name));
        }
        return this._formData;
    };

    getFieldValue = (name: string) => {
        return this._formData?.[name];
    };

    getFieldError = (name: string): ReactNode[] => {
        const field = this._fieldsList?.[name] || null;
        if (field) {
            return field.getFieldError();
        }
        return [];
    };

    getFieldsError = (names?: string[]): Record<string, ReactNode[]> => {
        const fields = names || Object.keys(this._fieldsList);
        return fields.reduce((pre: Record<string, ReactNode[]>, name) => {
            const theField = this._fieldsList?.[name];
            if (theField) {
                pre[name] = theField?.getFieldError();
            }
            return pre;
        }, {});
    };

    registerField = (name: string, self: ReactNode) => {
        this._fieldsList[name] = self;
        const { initialValue } = (self as any).props;

        if (initialValue !== undefined && name) {
            this._initialValues = {
                ...this._initialValues,
                [name]: initialValue,
            };
            this.setFieldsValue({
                ...this._formData,
                [name]: initialValue,
            });
        }

        //组件卸载时，删除字段
        return () => {
            if (name in this._fieldsList) {
                delete this._fieldsList[name];
                delete this._formData[name];
            }
        };
    };

    setInitialValues = (initVal: Record<string, unknown>) => {
        this._initialValues = { ...(initVal || {}) };
        this.setFieldsValue(initVal);
    };

    //重置表单，使用initialValue的数据
    resetFields = () => {
        this.setFieldsValue(this._initialValues);
    };

    //校验表单
    validateFields = () => {
        const promiseList: Promise<IFieldError>[] = [];
        Object.values(this._fieldsList).forEach((entity: any) => {
            const promise = entity.validateField();
            promiseList.push(promise.then((errors: any) => errors));
        });
        const summaryPromise: Promise<IFieldError[]> = new Promise(
            (resolve, reject) => {
                Promise.all(promiseList).then((res) => {
                    const errorResults = res.filter(
                        (item) => item?.errors?.length,
                    );

                    if (errorResults.length) {
                        reject(errorResults);
                    } else {
                        resolve(res);
                    }
                });
            },
        );
        return summaryPromise;
    };

    submit = async () => {
        this.validateFields()
            .then((result) => {
                const { onSubmit } = this._callbacks;
                onSubmit?.(this._formData, result);
            })
            .catch((e) => {
                const { onSubmitFailed } = this._callbacks;
                if (!onSubmitFailed) {
                    return;
                }
                onSubmitFailed(this._formData, e);
            });
    };

    setCallbacks = (callbacks: Callbacks) => {
        this._callbacks = callbacks;
    };

    getMethods = () => {
        return {
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            getFieldError: this.getFieldError,
            getFieldsError: this.getFieldsError,
            registerField: this.registerField,
            resetFields: this.resetFields,
            submit: this.submit,
            getInternalHooks: this.getInternalHooks,
            validateFields: this.validateFields,
        };
    };

    getInternalHooks = () => {
        return {
            registerField: this.registerField,
            setInitialValues: this.setInitialValues,
            setCallbacks: this.setCallbacks,
        };
    };
}

export default function useForm(form?: IFormInstance) {
    const formInstanceRef = useRef<IFormInstance>(defaultFormDataMethods);
    const isSingletonRef = useRef<boolean>(false);
    if (!isSingletonRef.current) {
        if (form) {
            formInstanceRef.current = form;
        } else {
            const formIns = new FormData();
            formInstanceRef.current = formIns.getMethods();
        }
        isSingletonRef.current = true;
    }
    return [formInstanceRef.current];
}
