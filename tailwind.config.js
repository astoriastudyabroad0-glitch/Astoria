import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    red: '#E4312B',
                    DEFAULT: '#E4312B',
                },
                secondary: {
                    blue: '#0A2A43',
                    DEFAULT: '#0A2A43',
                },
                light: '#F5F5F7',
                dark: '#1A1A1A',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
            },
        },
    },
    plugins: [
        typography,
    ],
}
