import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export type AuthSuccess<T> = { status: true; data: T };
export type AuthFailure = { status: false; code?: unknown; message?: unknown };
export type AuthResult<T> = false | AuthSuccess<T> | AuthFailure;

export const Register = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`user/register`, data)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
};

export const GoogleAuth = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`user/google-auth`, data)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
}

export const Login = async (data: any) => {
    if (!isBrowser) return false;

    const payload =
        data && typeof data === "object" && "email" in data && !("emailOrUsername" in data)
            ? { emailOrUsername: (data as any).email, password: (data as any).password }
            : data;

    return await api
        .post(`user/login`, payload)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
};

export const Logout = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`/logout/`, data)
        .then(function (response) {
            if (response.status === 201) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
};

export const DeleteUser = async (id: number) => {
    if (!isBrowser) return false;

    return await api
        .delete(`user/delete-user/${id}`)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
            return response.data;
        })
        .catch(function (error) {
            return handleError(error);
        });
};

const AuthService = {
    Register,
    GoogleAuth,
    Login,
    Logout,
    DeleteUser,
};

export default AuthService;