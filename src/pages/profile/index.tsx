import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

// Mui Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Zod
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Services
import AuthService from "../../services/auth/auth.service";
import TokenService from "../../services/localstorage.service";

const schema = zod
    .object({
        username: zod.string().min(1, { message: "Username is required" }),
        name: zod.string().min(1, { message: "Name is required" }),
        lastName: zod.string().min(1, { message: "Last name is required" }),
        email: zod.string().min(1, { message: "Email is required" }).email(),
        password: zod.string().optional(),
        confirmPassword: zod.string().optional(),
    })
    .refine((data) => {
        if (data.password && data.password.length > 0) {
            return data.password === data.confirmPassword;
        }
        return true;
    }, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
    .refine((data) => {
        if (data.password && data.password.length > 0) {
            return data.password.length >= 6;
        }
        return true;
    }, {
        message: "Password must be at least 6 characters",
        path: ["password"],
    });

type Values = zod.infer<typeof schema>;

const Profile = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const user = TokenService.getUser();
    const userData = (user && typeof user === 'object' && 'user' in user) ? user.user : {};

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Values>({
        defaultValues: {
            username: userData?.username || "",
            name: userData?.name || userData?.firstName || "",
            lastName: userData?.lastName || "",
            email: userData?.email || "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                username: userData?.username || "",
                name: userData?.name || userData?.firstName || "",
                lastName: userData?.lastName || "",
                email: userData?.email || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: Values) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const updateData: any = {
                username: data.username,
                name: data.name,
                lastName: data.lastName,
                email: data.email,
            };

            if (data.password && data.password.length > 0) {
                updateData.password = data.password;
            }

            const response = await AuthService.UpdateProfile(updateData);

            if (response && response.status) {
                setSuccess(true);
                if ('data' in response && response.data) {
                    const responseData = response as { status: boolean; data: any };
                    const updatedUser = {
                        ...user,
                        user: {
                            ...userData,
                            ...responseData.data,
                        },
                    };
                    TokenService.setUser(updatedUser);
                }
                reset({
                    ...data,
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setError(
                    (response && "message" in response ? response.message : null) ||
                    "Failed to update profile"
                );
            }
        } catch (err: any) {
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                py: 4,
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={3}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <IconButton
                            onClick={() => navigate("/")}
                            sx={{
                                color: "#2C6EF9",
                                "&:hover": { backgroundColor: "rgba(44, 110, 249, 0.1)" },
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                            Update Profile
                        </Typography>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            backgroundColor: "white",
                        }}
                    >
                        {error && (
                            <Box
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    backgroundColor: "#fee",
                                    border: "1px solid #fcc",
                                    borderRadius: 1,
                                }}
                            >
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            </Box>
                        )}

                        {success && (
                            <Box
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    backgroundColor: "#efe",
                                    border: "1px solid #cfc",
                                    borderRadius: 1,
                                }}
                            >
                                <Typography variant="body2" color="success.main">
                                    Profile updated successfully!
                                </Typography>
                            </Box>
                        )}

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
                                            name="username"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Username"
                                                    variant="outlined"
                                                    error={!!errors.username}
                                                    helperText={errors.username?.message}
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
                                            name="name"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="First Name"
                                                    variant="outlined"
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Controller
                                            control={control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Last Name"
                                                    variant="outlined"
                                                    error={!!errors.lastName}
                                                    helperText={errors.lastName?.message}
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
                                            name="email"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Email Address"
                                                    variant="outlined"
                                                    type="email"
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
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
                                                    label="New Password (leave blank to keep current)"
                                                    variant="outlined"
                                                    type={showPassword ? "text" : "password"}
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <IconButton
                                                                onClick={() =>
                                                                    setShowPassword((prev) => !prev)
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
                                    <Box sx={{ flex: 1 }}>
                                        <Controller
                                            control={control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Confirm New Password"
                                                    variant="outlined"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    error={!!errors.confirmPassword}
                                                    helperText={errors.confirmPassword?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <IconButton
                                                                onClick={() =>
                                                                    setShowConfirmPassword((prev) => !prev)
                                                                }
                                                                edge="end"
                                                            >
                                                                {showConfirmPassword ? (
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
                                        disabled={loading}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            backgroundColor: "#2C6EF9",
                                            "&:hover": {
                                                backgroundColor: "#1e5dd9",
                                            },
                                        }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            "Update Profile"
                                        )}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/")}
                                        disabled={loading}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            borderColor: "#2C6EF9",
                                            color: "#2C6EF9",
                                            "&:hover": {
                                                borderColor: "#1e5dd9",
                                                backgroundColor: "rgba(44, 110, 249, 0.04)",
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default Profile;
