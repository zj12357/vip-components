export declare type IFieldValue = any;
export declare type IValidateLevel = 'error' | 'warning';

export interface IRules {
    validateTrigger?: string | string[];
    required?: boolean;
    length?: number;
    message?: string;
    pattern?: RegExp;
    validator?: ICustomValidatorFunc;
}

export declare type ICustomValidatorFunc = (
    value: IFieldValue,
    callback: (message?: string) => void,
) => Promise<void> | void;

export interface ValidatorError {
    value: IFieldValue;
    message?: string[];
    errorTypes: string[];
}
