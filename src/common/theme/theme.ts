import { createTheme } from "@mui/material/styles";

const ThemeFontFamily = "'Poppins', sans-serif";

const theme = createTheme({
    typography: {
        fontFamily: ThemeFontFamily,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                },
                html: {
                    margin: 0,
                    padding: 0,
                },
                "#root": {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

export default theme;