import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../context/authContext";

export const RequireAuth = () => {
    const { auth }: AuthContextType = useAuth();
    const location = useLocation();
    if (auth?.isLoggedIn) {
        return <Outlet />;
    }
    return <Navigate to="/SignIn" state={{ from: location }} replace />;
}; 


