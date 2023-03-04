import { isEmptyArray, isEmptyValue } from '../is';
import {
    ICustomValidatorFunc,
    IRules,
    ValidatorError,
} from '@/types/expand/rules';

export class BaseValidator {
    value: any;

    message: string;

    error: ValidatorError;

    rule: IRules;

    constructor(value: any, rule: IRules) {
        this.value = value;
        const { message = '', ...rest } = rule;
        this.message = message || '';
        this.error = { value, message: [], errorTypes: [] };
        this.rule = rest;
    }

    isRequired() {
        // 优先级最高
        if (isEmptyValue(this.value) || isEmptyArray(this.value)) {
            this.error.message = [this.message];
            this.error.errorTypes = ['required'];
            return false;
        }
        return true;
    }

    isPattern() {
        if (this.rule.pattern) {
            if (!this.rule.pattern.test(this.value)) {
                this.addError('pattern', this.message);
            }
            return false;
        }
        return true;
    }

    addError(errorType: string, message: string) {
        if (message) {
            this.error.errorTypes.push(errorType);
            this.error.message?.push(message);
        }
    }

    getErrors() {
        return this.error;
    }
}

// 自定义校验
export class CustomValidator extends BaseValidator {
    constructor(value: any, rules: any) {
        super(value, rules);
    }

    validator(validatorTool: ICustomValidatorFunc | null) {
        if (validatorTool) {
            return new Promise((resolve) => {
                const ret = validatorTool(this.value, (message = '') =>
                    this.addError('custom', message || ''),
                );
                if (ret && ret?.then) {
                    ret.then(() => resolve(this.getErrors()));
                } else {
                    resolve(this.getErrors());
                }
            });
        }
        return null;
    }
}
