import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '@/utils/tools';

//组件卸载时要执行的回调
const useUnmount = (fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
        if (!isFunction(fn)) {
            console.error(
                `useUnmount预期的参数是一个函数, 得到了是${typeof fn}`,
            );
        }
    }

    const fnRef = useLatest(fn);

    useEffect(
        () => () => {
            fnRef.current();
        },
        [fnRef],
    );
};

export default useUnmount;
