import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const userInfo = useSelector((state) => state.auth.userInfo);
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
