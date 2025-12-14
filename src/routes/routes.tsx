// React Router
import { BrowserRouter, Routes, Route } from "react-router";

// Pages
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/sign-up";
import Home from "../pages/home";
import Profile from "../pages/profile";

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRoutes;
