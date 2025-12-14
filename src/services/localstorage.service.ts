const USER_KEY = "mini-tweeter-user";

const setUser = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY) || "string");
};

const getLocalAccessToken = () => {
    const user = getUser();
    return user?.access;
};

const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

const TokenService = {
    setUser,
    getUser,
    getLocalAccessToken,
    removeUser,
};

export default TokenService;