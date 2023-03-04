export const isArray = (value: unknown): value is Array<any> =>
    value !== null &&
    Object.prototype.toString.call(value) === '[object Array]';

export const isObject = (value: unknown): value is Record<any, any> =>
    value !== null &&
    Object.prototype.toString.call(value) === '[object Object]';

export const isString = (value: unknown): value is string =>
    Object.prototype.toString.call(value) === '[object String]';

export const isFunction = (value: unknown): value is Function =>
    Object.prototype.toString.call(value) === '[object Function]';

export const isNull = (value: unknown): value is null =>
    Object.prototype.toString.call(value) === '[object Null]';

export const isUndefined = (value: unknown): value is undefined =>
    Object.prototype.toString.call(value) === '[object Undefined]';

export const isBoolean = (value: unknown): value is boolean =>
    Object.prototype.toString.call(value) === '[object Boolean]';

export const isNumber = (value: unknown): value is number =>
    Object.prototype.toString.call(value) === '[object Number]';

export const isDate = (val: unknown): val is Date =>
    Object.prototype.toString.call(val) === '[object Date]' &&
    !isNaN((val as Date).getTime());

export function isEmptyArray(obj: Array<unknown>): boolean {
    return isArray(obj) && !obj?.length;
}

export function isEmptyValue(obj: any): boolean {
    return obj === undefined || obj === null || obj === '';
}

export const isDeepEqual = (obj: any, sub: any): boolean => {
    if (
        typeof obj !== 'object' ||
        typeof sub !== 'object' ||
        obj === null ||
        sub === null
    ) {
        return obj === sub;
    }
    if (isFunction(obj) && isFunction(sub)) {
        return obj === sub || obj.toString() === sub.toString();
    }

    if (Object.keys(obj).length !== Object.keys(sub).length) {
        return false;
    }
    for (const key in obj) {
        if (!isDeepEqual(obj[key], sub[key])) return false;
    }
    return true;
};

export function isOneOf<T>(value: T, validList: T[]) {
    return validList.indexOf(value) !== -1;
}
