import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export const UpdateProfile = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .put(`update-user-details/profile/${id}`)
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

export const UpdatePassword = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`user/update-password/`, data)
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

export const GetUserDetails = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .get(`user/details/${id}`)
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


const UserService = {
    UpdateProfile,
    UpdatePassword,
    GetUserDetails,
};

export default UserService;