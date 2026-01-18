import { useState } from "react";

// Mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

// Mui Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Zod
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
    email: zod.string().min(1, { message: "Email is required" }).email(),
    password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
    email: "",
    password: "",
} satisfies Values;

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    const onSubmit = (data: Values) => {
        console.log(data);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                margin: 0,
                padding: 0,
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", md: "35%" },
                    backgroundColor: "#2C6EF9",
                    position: "relative",
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: { md: "3rem", lg: "4rem" },
                            mb: 1,
                        }}
                    >
                        Min Tweeter
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            height: "4px",
                            backgroundColor: "white",
                            margin: "0 auto",
                            maxWidth: "200px",
                        }}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    width: { xs: "100%", md: "65%" },
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: { xs: 3, md: 6 },
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 700, color: "#1a1a1a" }}
                            >
                                Login to your account
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "text.secondary" }}
                            >
                                Don't have an account?{" "}
                                <Link href="/sign-up">Sign up</Link>
                            </Typography>
                        </Stack>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                            }}
                        >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={3}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Controller
                                                control={control}
                                                name="email"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Email Address"
                                                        variant="outlined"
                                                        type="email"
                                                        error={!!errors.email}
                                                        helperText={
                                                            errors.email
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Controller
                                                control={control}
                                                name="password"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Password"
                                                        variant="outlined"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        error={
                                                            !!errors.password
                                                        }
                                                        helperText={
                                                            errors.password
                                                                ?.message
                                                        }
                                                        InputProps={{
                                                            endAdornment: (
                                                                <IconButton
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            (
                                                                                prev
                                                                            ) =>
                                                                                !prev
                                                                        )
                                                                    }
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOffIcon />
                                                                    ) : (
                                                                        <VisibilityIcon />
                                                                    )}
                                                                </IconButton>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>

                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                flex: 1,
                                                py: 1.5,
                                                backgroundColor: "#2C6EF9",
                                                "&:hover": {
                                                    backgroundColor: "#1e5dd9",
                                                },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                flex: 1,
                                                py: 1.5,
                                                borderColor: "#2C6EF9",
                                                color: "#2C6EF9",
                                                "&:hover": {
                                                    borderColor: "#1e5dd9",
                                                    backgroundColor:
                                                        "rgba(44, 110, 249, 0.04)",
                                                },
                                            }}
                                            href="/sign-up"
                                        >
                                            Sign Up
                                        </Button>
                                    </Stack>
                                </Stack>
                            </form>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;
