// React Router 
import { useLocation } from 'react-router'

// Mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Image
import SocialMedia from "../../../assets/social_media.jpg";
import SocialMediaOne from "../../../assets/social_media_one.jpg";

export interface LayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
    let location = useLocation();

    return (
        <Box
            sx={{
                display: { xs: "flex", lg: "grid" },
                flexDirection: "column",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "inline-block", fontSize: 0 }}>
                        Logo
                    </Box>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flex: "1 1 auto",
                        justifyContent: "center",
                        p: 3,
                    }}
                >
                    <Box sx={{ maxWidth: "450px", width: "100%" }}>
                        {children}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    display: { xs: "none", lg: "flex" },
                    justifyContent: "center",
                    p: 3,
                }}
            >
                <Stack spacing={3}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            alt="Widgets"
                            src={
                                location.pathname === "/sign-up"
                                    ? SocialMedia
                                    : SocialMediaOne
                            }
                            sx={{
                                height: "auto",
                                width: "100%",
                                maxWidth: "600px",
                                borderRadius: 2,
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default AuthLayout;
