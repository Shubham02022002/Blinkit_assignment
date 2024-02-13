import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="signup_container bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="signup_form_container w-96 h-80 flex rounded-lg shadow-lg">
        <div className="left flex-1 flex flex-col items-center justify-center bg-yellow-500 rounded-l-lg">
          <h1 className="text-white text-2xl">Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn mt-10">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right flex-2 flex flex-col items-center justify-center bg-white rounded-r-lg">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1 className="text-2xl">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              className="input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="input"
              required
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
