'use client'
import ProductContext from "@/context/ProductContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [userNotFound, setuserNotFound] = useState(false);
  const [loginLoading, setloginLoading] = useState(false);
  const [loginUserData, setloginUserData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginUserData);
    try {
      setloginLoading(true);
      const response = await axios.post("/api/login", loginUserData);
      console.log("response", response);
      setloginLoading(false);
      if (response.data.success) {
        setloginUserData({
          email: "",
          password: "",
        });
        setuserNotFound(false);
        router.back(); // Navigate back
        setTimeout(() => {
          window.location.reload(true); // Reload after a short delay
        }, 100);
      }
    } catch (error) {
      console.log("error while login", error);
      setuserNotFound(true);
      setloginLoading(false);
      setloginUserData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white-400 to-dark-600 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Welcome Back!</h2>
        <h2 className="text-md text-center text-gray-600">Login to access your account</h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              placeholder="Enter your email"
              value={loginUserData.email}
              onChange={(e) => setloginUserData({ ...loginUserData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              placeholder="Enter your password"
              value={loginUserData.password}
              onChange={(e) => setloginUserData({ ...loginUserData, password: e.target.value })}
            />
          </div>

          {userNotFound && (
            <p className="text-sm text-red-400">Please enter correct email and password</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 mt-4 text-dark btn btn-dark border border-black bg-gradient-to-r from-dark-500 to-white-600 rounded-lg hover:from-dark-600 hover:to-white-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold"
            >
              {loginLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        <div className="flex gap-1 mt-4 justify-center">
          <p>Not a member?</p>
          <Link href={"/signup"} className="text-blue-700">SignUp Here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
