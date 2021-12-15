const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                gray: colors.neutral,
                'dark-gray': {
                    100: 'rgb(30, 30, 30)'
                },
                cyan: colors.cyan
            },
            fontFamily: {
                'fira-code': ["'Fira Code'", 'serif']
            },
            cursor: {
                'col-resize': 'col-resize',
                'row-resize': 'row-resize',
            }
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: 'class'
        })
    ],
}
