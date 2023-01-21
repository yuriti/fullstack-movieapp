const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "tw-",
    content: ["./src/**/*.tsx"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            default: "#101828",
            black: colors.black,
            white: colors.white,
        },
        fontFamily: {
            nunito: ["Nunito", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
    corePlugins: {
        container: false,
        outline: false,
    },
};
