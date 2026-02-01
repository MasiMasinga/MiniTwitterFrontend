import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export const CreateComment = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`comment/create/`, data)
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

export const GetComment = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`comment/get/`, data)
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

export const GetComments = async (data: any) => {
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

export const UpdateComment = async (id: any) => {
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

export const DeleteComment = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .delete(`comment/delete/${id}`)
        .then(function (response) {
            if (response.status === 204) {
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

export const LikeComment = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`comment/like/${id}`)
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

export const UnlikeComment = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`comment/unlike/${id}`)
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

export const RetweetComment = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`comment/retweet/${id}`)
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

const CommentService = {
    CreateComment,
    GetComment,
    GetComments,
    UpdateComment,
    DeleteComment,
    LikeComment,
    UnlikeComment,
    RetweetComment,
};

export default CommentService;