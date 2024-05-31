import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await register({ name, email, password }).unwrap();
            toast.success("Registration successful");
            navigate("/login");
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <div className="col-8">
            <h1 className="text-center">Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;
