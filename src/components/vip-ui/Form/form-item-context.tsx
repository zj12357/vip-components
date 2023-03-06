import React from 'react';
import { IFormItemContext } from '@/types/vip-ui/form';
import { defaultFormDataMethods } from './useForm';

export const FormItemContext = React.createContext<IFormItemContext>({
    form: defaultFormDataMethods,
});
