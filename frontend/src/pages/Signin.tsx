import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Authform from "../components/auth/Authform";
import axios from "axios";
import { BACKEND_URL } from "../config";
const Signin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    // login logic here

    const response = await axios.post(BACKEND_URL + "/api/v1/user/signin",
      { username, password }, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
    const jwt = response.data.token;
    localStorage.removeItem("token");
    localStorage.setItem("token", jwt);
    console.log("Signing up with:", { username, password });
    console.log("Logging in with:", username, password);

    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <Authform type="login" onSubmit={handleLogin} />
      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-[#4642ff] hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signin;
