// Mui Context
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Notistack
import { SnackbarProvider } from "notistack";

// Routes
import PageRoutes from "./routes/routes";

// Theme
import theme from './common/theme/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <PageRoutes />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
