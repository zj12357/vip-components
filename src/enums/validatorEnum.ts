/**
 * description: 验证器类型
 */
export enum ValidatorType {
    Number = 'number',
    String = 'string',
    Array = 'array',
    Boolean = 'boolean',
    Object = 'object',
    Custom = 'custom',
}

/**
 * description: 验证状态
 */
export enum ValidateStatus {
    Init = 'init',
    Error = 'error',
    Warning = 'warning',
    Validating = 'validating',
    Success = 'success',
}
