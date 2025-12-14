import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export const Register = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`/register/`, data)
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

export const Login = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`/login/`, data)
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


const AuthService = {
    Register,
    Login,
    Logout,
};

export default AuthService;