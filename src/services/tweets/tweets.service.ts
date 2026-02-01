import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export const CreateTweet = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`tweet/create/`, data)
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

export const GetTweet = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`user/login/`, data)
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

export const GetTweets = async (data: any) => {
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

export const UpdateTweet = async (id: any) => {
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

export const DeleteTweet = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .delete(`tweet/delete/${id}`)
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

export const LikeTweet = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`tweet/like/${id}`)
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

export const UnlikeTweet = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`tweet/unlike/${id}`)
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

export const Retweet = async (id: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`tweet/retweet/${id}`)
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

const TweetService = {
    CreateTweet,
    GetTweet,
    GetTweets,
    UpdateTweet,
    DeleteTweet,
    LikeTweet,
    UnlikeTweet,
    Retweet,
};

export default TweetService;