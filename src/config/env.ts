/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Is it a development mode
 */
export function isDevMode(): boolean {
    return process.env.NODE_ENV === 'development';
}

/**
 * @description: Is it a production mode
 */
export function isProdMode(): boolean {
    return process.env.NODE_ENV === 'production';
}
