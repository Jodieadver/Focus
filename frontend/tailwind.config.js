/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                "surface-container-lowest": "#ffffff",
                "on-tertiary": "#fdf9ed",
                "primary-dim": "#535252",
                "on-background": "#2d3435",
                "error": "#9e422c",
                "on-secondary-container": "#565235",
                "tertiary": "#615f57",
                "surface-container-high": "#e4e9ea",
                "inverse-on-surface": "#9c9d9d",
                "background": "#f9f9f9",
                "surface-variant": "#dde4e5",
                "surface-tint": "#5f5e5e",
                "secondary-container": "#eae3bc",
                "outline-variant": "#adb3b4",
                "on-tertiary-container": "#5a5850",
                "primary-container": "#e4e2e1",
                "inverse-surface": "#0c0f0f",
                "secondary": "#646041",
                "on-error": "#fff7f6",
                "surface-container-low": "#f2f4f4",
                "primary": "#5f5e5e",
                "on-surface-variant": "#5a6061",
                "surface": "#f9f9f9",
                "on-secondary": "#fff9e3",
                "on-surface": "#2d3435",
                "surface-container": "#ebeeef",
                "on-primary": "#faf7f6",
                "outline": "#999999",
            },
            fontFamily: {
                headline: ["Newsreader", "serif"],
                body: ["Inter", "sans-serif"],
                label: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0px",
                lg: "0px",
                xl: "0px",
                full: "9999px",
            },
        },
    },
    plugins: [],
}

