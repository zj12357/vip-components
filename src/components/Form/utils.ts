import { IRules, ValidatorError } from '@/types/expand/rules';

//是否必填
export const isFieldRequired = (rules: IRules[] = []) => {
    return (rules || []).some((rule) => rule?.required);
};

export const getErrorAndWarnings = (result: ValidatorError[]) => {
    let errors: string[] = [];
    let warnings: string[] = [];
    result.map(({ message = [], validateLevel = 'error' }) => {
        if (!message?.length) {
            return;
        }
        if (validateLevel === 'warning') {
            warnings = [...warnings, ...message];
        } else {
            errors = [...errors, ...message];
        }
    });
    return { warnings, errors };
};
