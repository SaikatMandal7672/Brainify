import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Authform from "../components/auth/Authform";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (username: string, password: string, name?: string) => {

    try {
      await axios.post(BACKEND_URL + "/api/v1/user/signup",
        { name:name, username:username, password:password }, {
        headers: {
          "Content-Type": "application/json",
        }
      }
      );


      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message + " " +name + " " + username + " " + password);
      } else {
        alert("An unknown error occurred");
      }
      return;
    }


  };

  return (
    <AuthLayout>
      <Authform type="signup" onSubmit={handleSignup} />
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#4642ff] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
