const USER_KEY = "mini-tweeter-user";

const setUser = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
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