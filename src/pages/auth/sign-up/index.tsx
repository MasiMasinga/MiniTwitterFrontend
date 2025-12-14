import { useState } from "react";

// Mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

// Mui Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Zod
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Layout
import AuthLayout from "../layout/AuthLayout";

const schema = zod.object({
    username: zod.string().min(1, { message: "Username is required" }),
    email: zod.string().min(1, { message: "Email is required" }).email(),
    password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
    username: "",
    email: "",
    password: "",
} satisfies Values;

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    return (
        <AuthLayout>
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h4">Sign Up</Typography>
                    <Typography color="text.secondary" variant="body2">
                        Already have have an account?{" "}
                        <Link underline="hover" variant="subtitle2" href="/">
                            Login
                        </Link>
                    </Typography>
                </Stack>
                <form>
                    <Stack spacing={2}>
                        <Controller
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <FormControl>
                                    <InputLabel>Username</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        label="Username"
                                        type="text"
                                    />
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormControl>
                                    <InputLabel>Email address</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        label="Email address"
                                        type="email"
                                    />
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormControl>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        endAdornment={
                                            showPassword ? (
                                                <VisibilityIcon cursor="pointer" />
                                            ) : (
                                                <VisibilityOffIcon cursor="pointer" />
                                            )
                                        }
                                        label="Password"
                                        onClick={() =>
                                            setShowPassword((show) => !show)
                                        }
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                        <Button type="submit" variant="contained">
                            Sign Up
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </AuthLayout>
    );
};

export default SignUp;
