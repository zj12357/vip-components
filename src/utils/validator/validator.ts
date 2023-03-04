import { isArray } from '../is';
import { CustomValidator, BaseValidator } from './rules';
import { IFieldValue, IRules, ValidatorError } from '@/types/expand/rules';

export class Validator {
    rules: Record<string, IRules[]>;

    validatorGroup: {} = {} as any;
    constructor(rules: Record<string, IRules[]>) {
        this.rules = rules;
    }

    createValidatorGroup(value: any, rule: IRules) {
        return {
            main: new BaseValidator(value, rule),
            custom: new CustomValidator(value, rule),
        };
    }

    // 一条rule执行
    getSingleValidateGroup(value: IFieldValue, rule: IRules, field: string) {
        const validPromises: Promise<any>[] = [];
        const validatorGroup: any = this.createValidatorGroup(value, rule);

        if (rule.required) {
            validPromises.push(
                new Promise((resolve) => {
                    validatorGroup.main.isRequired();
                    const curError = validatorGroup.main.getErrors();
                    resolve({
                        ...curError,
                    });
                }),
            );
        }
        if (rule.pattern) {
            validPromises.push(
                new Promise((resolve) => {
                    validatorGroup.main.isPattern();
                    const curError = validatorGroup.main.getErrors();
                    resolve({
                        ...curError,
                    });
                }),
            );
        }

        Object.keys(rule).map((key) => {
            if (key === 'validator') {
                const resPromise = rule.validator
                    ? validatorGroup.custom.validator(rule.validator || null)
                    : null;
                resPromise && validPromises.push(resPromise);
                return;
            }

            validPromises.push(
                new Promise((resolve) => {
                    const curError = validatorGroup.main.getErrors();
                    resolve({
                        ...curError,
                    });
                }),
            );
        });

        return validPromises;
    }

    singleValidate(promises: Promise<any>[]) {
        let cur = 0;
        return new Promise((resolve) => {
            const validate = (promise: any) => {
                const next = () => {
                    if (cur < promises.length - 1) {
                        return validate(promises[++cur]);
                    }

                    return resolve({});
                };
                promise.then((errors: ValidatorError) => {
                    if ((errors.message || [])?.length > 0) {
                        return resolve(errors);
                    }
                    next();
                });
            };
            validate(promises[cur]);
        });
    }

    // 一条rule执行
    validate(value: Record<string, any>, callback: (err: any) => void) {
        const promiseGroup: Promise<any>[] = [];
        const keys: string[] = [];
        if (this.rules) {
            Object.keys(this.rules).forEach((key) => {
                let spPromiseGroup: Promise<any>[] = [];

                if (isArray(this.rules[key])) {
                    for (let i = 0; i < this.rules[key].length; i++) {
                        const rule = this.rules[key][i];
                        const curPromises = this.getSingleValidateGroup(
                            value[key],
                            rule,
                            key,
                        );
                        spPromiseGroup = [...spPromiseGroup, ...curPromises];
                    }
                }
                if (spPromiseGroup.length) {
                    promiseGroup.push(this.singleValidate(spPromiseGroup));
                    keys.push(key);
                }
            });
        }
        if (promiseGroup.length > 0) {
            Promise.all(promiseGroup).then((data) => {
                const lastErrors = data.reduce((pre, cur, index) => {
                    if (!(keys[index] in pre)) {
                        pre[keys[index]] = [];
                    }

                    pre[keys[index]].push(cur);
                    return pre;
                }, {});
                callback && callback(lastErrors);
            });
        } else {
            callback && callback({});
        }
    }
}
