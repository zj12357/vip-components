export function componentWrapper<C, E extends {}>(
    Component: C,
    displayName: string,
    extra?: E,
): C & E & { displayName?: string };
export function componentWrapper<C, E extends {}>(
    Component: C,
    extra: E,
): C & E;
export function componentWrapper<C, E extends {}>(
    Component: C,
    params: string | E,
    extra?: E,
) {
    const Comp = Component as C & E & { displayName?: string };

    if (typeof params === 'string') {
        Comp.displayName = params;
        extra &&
            Object.keys(extra).length &&
            Object.keys(extra).forEach((key) => {
                //@ts-ignore
                Comp[key] = extra[key];
            });
    } else {
        Object.keys(params).forEach((key) => {
            //@ts-ignore
            Comp[key] = params[key];
        });
    }

    return Comp;
}

/**
 * 解决defaultProps不能被TS识别类型的问题
 * @desc
 */
export function createPropsGetter<DP extends object>() {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;
        type RecomposedProps = DP & PropsExcludingDefaults;

        return props as any as RecomposedProps;
    };
}
