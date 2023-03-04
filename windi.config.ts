import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    extract: {
        include: ['**/*.{jsx,js,ts,tsx,css,html}'],
        exclude: ['node_modules', '.git', 'dist/**/*'],
    },
    theme: {
        extend: {
            backgroundColor: {
                primary: 'rgba(var(--theme-primary), var(--tw-bg-opacity))',
            },
            textColor: {
                primary: 'rgba(var(--theme-primary), var(--tw-text-opacity))',
            },
        },
        backgroundColor: {
            base: 'var(--theme-primary)',
        },
        textColor: {
            base: 'var(--theme-primary)',
        },
    },
});
