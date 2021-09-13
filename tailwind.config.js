const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.trueGray,
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
    variants: {
        extend: {}
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
}
