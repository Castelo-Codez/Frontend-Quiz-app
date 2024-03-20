/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                "clr-purple": "#A729F5",
                "clr-dark-navy": "#313E51",
                "clr-navy": "#3B4D66",
                "clr-grey-navy": "#626C7F",
                "clr-light-bluish": "#626C7F",
                "clr-light-grey": "#F4F6FA",
                "clr-green": "#26D782",
                "clr-red": "#EE5454",
                "clr-p": "#ABC1E1",
            },
            screens: {
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
                "2xl": "1400px",
            },
            container: {
                padding: "10px",
                center: true,
                screens: {
                    sm: "540px",
                    md: "720px",
                    lg: "960px",
                    xl: "1140px",
                    "2xl": "1320px",
                },
            },
            padding: {
                "m-padd": "7.5vw",
            },
            boxShadow: {
                mainBoxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
            },
            gridTemplateColumns: {
                headerLogo: "45px 100px",
            },
        },
    },
    plugins: [],
};
