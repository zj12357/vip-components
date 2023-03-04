import { IRules, ValidatorError } from '@/types/expand/rules';

//是否必填
export const isFieldRequired = (rules: IRules[] = []) => {
    return (rules || []).some((rule) => rule?.required);
};

//返回错误信息
export const getErrors = (result: ValidatorError[]) => {
    let errors: string[] = [];
    result.map(({ message = [] }) => {
        if (!message?.length) {
            return;
        }
        errors = [...errors, ...message];
    });
    return { errors };
};
