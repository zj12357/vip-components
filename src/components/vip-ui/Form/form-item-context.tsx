import React from 'react';
import { IFormItemContext } from '@/types/expand/form';
import { defaultFormDataMethods } from './useForm';

export const FormItemContext = React.createContext<IFormItemContext>({
    form: defaultFormDataMethods,
});
