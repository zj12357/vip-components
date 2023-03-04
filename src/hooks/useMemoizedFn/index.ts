import { useMemo, useRef } from 'react';
import { isFunction } from '@/utils/tools';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;

//函数地址永远不会变化。
function useMemoizedFn<T extends noop>(fn: T) {
    if (process.env.NODE_ENV === 'development') {
        if (!isFunction(fn)) {
            console.error(
                `useMemoizedFn 预期的参数是一个函数, 得到了是${typeof fn}`,
            );
        }
    }

    const fnRef = useRef<T>(fn);

    fnRef.current = useMemo(() => fn, [fn]);

    const memoizedFn = useRef<PickFunction<T>>();
    if (!memoizedFn.current) {
        memoizedFn.current = function (this, ...args) {
            return fnRef.current.apply(this, args);
        };
    }

    return memoizedFn.current as T;
}

export default useMemoizedFn;
