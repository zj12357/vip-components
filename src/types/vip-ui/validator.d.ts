import { IFieldValue, IRules, IValidateMsgTemplate } from './type';
export declare class Validator {
    rules: Record<string, IRules[]>;
    validatorGroup: {
        main: any;
        custom: any;
    } | null;
    constructor(rules: Record<string, IRules[]>);
    createValidatorGroup(
        value: any,
        rule: IRules,
    ): {
        main: any;
        custom: any;
    };
    getSingleValidateGroup(value: IFieldValue, rule: IRules): Promise<any>[];
    singleValidate(promises: Promise<any>[]): Promise<unknown>;
    validate(value: Record<string, any>, callback: (err: any) => void): void;
}
