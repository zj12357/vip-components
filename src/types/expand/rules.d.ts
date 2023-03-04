export declare type IFieldValue = any;
export declare type IValidateLevel = 'error' | 'warning';
import { ValidatorType } from '@/enums/validatorEnum';

export interface IBaseRules {
    validateTrigger?: string | string[];
    required?: boolean;
    length?: number;
    message?: string;
}
export interface INumberValidator extends IBaseRules {
    min?: number;
    max?: number;
    equal?: number;
    positive?: boolean;
    negative?: boolean;
}
export interface IArrayValidator extends IBaseRules {
    min?: number;
    max?: number;
    deepEqual?: Record<string, unknown>;
    includes?: boolean;
}
export interface IObjectValidator extends IBaseRules {
    deepEqual?: Record<string, unknown>;
    hasKeys?: string[];
}
export interface IStringValidator extends IBaseRules {
    min?: number;
    max?: number;
    len?: number;
    match?: RegExp;
    uppercase?: boolean;
    lowercase?: boolean;
    whitespace?: boolean;
}
export declare type ICustomValidatorFunc = (
    value: IFieldValue,
    callback: (message?: string) => void,
) => Promise<void> | void;
export interface ICustomValidator extends IBaseRules {
    validator?: ICustomValidatorFunc;
}
export declare type ValidatorTypeMap = {
    [ValidatorType.Number]: INumberValidator;
    [ValidatorType.String]: IArrayValidator;
    [ValidatorType.Array]: IArrayValidator;
    [ValidatorType.Boolean]: IArrayValidator;
    [ValidatorType.Object]: IObjectValidator;
    [ValidatorType.Custom]: ICustomValidator;
};
export declare type ITypeRules<T extends ValidatorType> =
    ValidatorTypeMap[T] & {
        validator?: any;
        type: T;
    };

export declare type IRules = {
    [P in ValidatorType]: ITypeRules<P>;
}[ValidatorType];

export declare type InnerRules = IRules & {
    field: string;
};
export interface ValidatorError {
    value: IFieldValue;
    message?: string[];
    errorTypes: string[];
}

export interface IValidateOption {
    validateMessage?: IValidateMsgTemplate;
    field: string;
}
