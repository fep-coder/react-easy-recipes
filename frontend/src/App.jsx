import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "./slices/usersApiSlice";
import { logout } from "./slices/authSlice";

function App() {
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logoutApiCall();
        dispatch(logout());
    };

    return (
        <div className="container mt-3 mb-5">
            <div className="row">
                <div className="col-12">
                    <Link className="text-decoration-none" to="/">
                        <h1 className="text-center text-info">Easy Recipes</h1>
                    </Link>
                </div>
                <div className="col-6">
                    <Link className="btn btn-warning" to="/add">
                        Add new recipe
                    </Link>{" "}
                </div>
                <div className="col-6 d-flex justify-content-end">
                    {userInfo ? (
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                            type="button"
                        >
                            Hi {userInfo.name}, Log out
                        </button>
                    ) : (
                        <>
                            <Link className="btn btn-info mx-2" to="/login">
                                Log in
                            </Link>{" "}
                            <Link
                                className="btn btn-success mx-2"
                                to="/register"
                            >
                                Register
                            </Link>{" "}
                        </>
                    )}
                </div>
            </div>
            <div className="row mt-3">
                <Filters />
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
