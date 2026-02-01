// Mui Context
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Auth Context
import { AuthProvider } from "./common/contexts/AuthContext";

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
                <AuthProvider>
                    <PageRoutes />
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
