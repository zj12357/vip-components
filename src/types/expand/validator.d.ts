import { Promise } from 'es6-promise';
import {
    ArrayValidator,
    CustomValidator,
    NumberValidator,
    ObjectValidator,
    StringValidator,
} from './rules';
import { IFieldValue, IRules, IValidateMsgTemplate } from './type';
export declare class Validator {
    rules: Record<string, IRules[]>;
    options: {
        first: boolean;
        validateMessages?: Partial<IValidateMsgTemplate>;
    };
    validatorGroup: {
        number: NumberValidator;
        array: ArrayValidator;
        string: StringValidator;
        object: ObjectValidator;
        custom: CustomValidator;
    } | null;
    constructor(
        rules: Record<string, IRules[]>,
        options: {
            first?: boolean;
            validateMessages?: Partial<IValidateMsgTemplate>;
        },
    );
    createValidatorGroup(
        value: any,
        rule: IRules,
        field: string,
    ): {
        number: NumberValidator;
        array: ArrayValidator;
        string: StringValidator;
        object: ObjectValidator;
        custom: CustomValidator;
    };
    getSingleValidateGroup(
        value: IFieldValue,
        rule: IRules,
        field: string,
    ): Promise<any>[];
    singleValidate(promises: Promise<any>[]): Promise<unknown>;
    validate(value: Record<string, any>, callback: (err: any) => void): void;
}
