module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },

        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [],
    },
};
