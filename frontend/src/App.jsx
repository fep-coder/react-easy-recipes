import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-6">
                    <Link to="/">
                        <h1>Easy Recipes</h1>
                    </Link>
                </div>
                <div className="col-6">
                    <Link className="btn btn-primary" to="/add">
                        Add new
                    </Link>{" "}
                    |<a href="#">Log in</a> | <a href="#">Register</a>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h3>Filters</h3>
                    <label htmlFor="search">Search</label>
                    <input id="search" />
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
