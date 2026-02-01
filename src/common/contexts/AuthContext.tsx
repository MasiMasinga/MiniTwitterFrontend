
import React, { createContext, useContext, useEffect, useState } from "react";

// API Service
import AuthService from "../../services/auth/auth.service";

// Local Storage
import LocalStorageService from "../../services/localstorage.service";

// Hooks
import useSnackbarNotification from "../hooks/useSnackbarNotification";

export interface AuthUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    access?: string;
    refresh?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GoogleAuthPayload {
    idToken: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    LoginUser: (user: LoginPayload) => Promise<void>;
    RegisterUser: (user: RegisterPayload) => Promise<void>;
    GoogleAuth: (payload: GoogleAuthPayload) => Promise<void>;
    LogoutUser: () => Promise<void>;
    DeleteUser: (user: AuthUser) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { showSuccess, showError } = useSnackbarNotification();

    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isSuccessResponse = (response: unknown): response is { status: true; data: AuthUser } => {
        return (
            !!response &&
            typeof response === "object" &&
            "status" in response &&
            (response as { status?: unknown }).status === true &&
            "data" in response
        );
    };

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await LocalStorageService.getUser();
            setUser(storedUser);
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    const RegisterUser = async (payload: RegisterPayload) => {
        setIsLoading(true);
        const response = await AuthService.Register(payload);
        if (isSuccessResponse(response)) {
            showSuccess("User registered successfully");
            window.location.href = "/";
        } else {
            showError("Failed to register user");
        }
        setIsLoading(false);
    };

    const GoogleAuth = async (payload: GoogleAuthPayload) => {
        setIsLoading(true);
        const response = await AuthService.GoogleAuth(payload);
        if (isSuccessResponse(response)) {
            setUser(response.data);
            showSuccess("User logged in successfully");
            LocalStorageService.setUser(response.data);
            window.location.href = "/home";
        } else {
            showError("Failed to login user");
        }
        setIsLoading(false);
    };

    const LoginUser = async (payload: LoginPayload) => {
        setIsLoading(true);
        const response = await AuthService.Login(payload);
        if (isSuccessResponse(response)) {
            setUser(response.data);
            LocalStorageService.setUser(response.data);
            showSuccess("User logged in successfully");
            window.location.href = "/home";
        } else {
            showError("Failed to login user");
        }
        setIsLoading(false);
    };

    const LogoutUser = async () => {
        setIsLoading(true);
        setUser(null);
        showSuccess("User logged out successfully");
        LocalStorageService.removeUser();
        window.location.href = "/";
        setIsLoading(false);
    };

    const DeleteUser = async (payload: AuthUser) => {
        setIsLoading(true);
        const response = await AuthService.DeleteUser(payload.id);
        if (response && typeof response === "object" && "status" in response && (response as any).status === true) {
            setUser(null);
            LocalStorageService.removeUser();
            showSuccess("User deleted successfully");
            window.location.href = "/";
        } else {
            showError("Failed to delete user");
        }
        setIsLoading(false);
    };

    const value = {
        user,
        isLoading,
        // Backend issues JWT "access" on login / google-auth (not on register)
        isAuthenticated: !!user?.access,
        RegisterUser,
        GoogleAuth,
        LoginUser,
        LogoutUser,
        DeleteUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}