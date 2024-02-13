import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/auth";
            const response = await axios.post(url, data);
            const { data: res } = response;
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500 &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };
    

    return (
        <div className="login_container bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="login_form_container w-96 h-80 flex rounded-lg shadow-lg">
                <div className="left flex-2 flex flex-col items-center justify-center bg-white rounded-l-lg">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1 className="text-2xl">Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="input"
                        />
                        {error && <div className="error_msg">{error}</div>}
                        <button type="submit" className="green_btn">
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="right flex-1 flex flex-col items-center justify-center bg-yellow-500 rounded-r-lg">
                    <h1 className="text-2xl text-white">New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className="white_btn">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
