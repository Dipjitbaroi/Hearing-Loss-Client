/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem",
            },
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: "#152E44",
                gray: {
                    50: "#F7F8F9",
                    100: "#EEF0F3",
                    200: "#D5DAE1",
                    300: "#BBC3CF",
                    400: "#8896AB",
                    500: "#556987",
                    600: "#4D5F7A",
                    700: "#404F65",
                    800: "#333F51",
                    900: "#2A3342",
                },
                primary: {
                    50: "#F7F8F9",
                    100: "#EEF0F3",
                    200: "#D5DAE1",
                    300: "#BBC3CF",
                    400: "#8896AB",
                    500: "#2563EB",
                    600: "#4D5F7A",
                    700: "#404F65",
                    800: "#333F51",
                    900: "#2A3342",
                },
                success: "#16A34A",
                danger: "#D7503D",
                warning: "#DD8E0A",
                info: "#3575DD",
                black: "#222222",
                white: "#FFFFFF",
                textPrimary: "#6B7280",
                textSecondary: "#404F65",
            },
            fontFamily: {
                poppins: ["Poppins"],
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: 0,
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: 0,
                    },
                },
                scale: {
                    "0%": {
                        transform: "scale(0)",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                },
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                scale: "scale 0.5s ease-in-out",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },

    plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
}
