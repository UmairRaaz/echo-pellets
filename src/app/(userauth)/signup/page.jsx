'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [signingLoading, setsigningLoading] = useState(false);
  const [emailUsed, setemailUsed] = useState(false);
  const [signupUser, setsignupUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpUser = async (e) => {
    e.preventDefault();

    try {
      setsigningLoading(true);
      const response = await axios.post("/api/signup", signupUser);
      setsigningLoading(false);
      console.log(response);
      if (response.data.success) {
        alert("User registered successfully");
        router.push("/login");
        setsignupUser({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        setemailUsed(true);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white-400 to-dark-600 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign up</h2>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={handleSignUpUser}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="username"
                className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                placeholder="Enter your name"
                value={signupUser.name}
                onChange={(e) => setsignupUser({ ...signupUser, name: e.target.value })}
              />
            </div>
            {emailUsed && (
              <p className="text-md text-red-400">Email is already registered...</p>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                placeholder="Enter your email"
                value={signupUser.email}
                onChange={(e) => setsignupUser({ ...signupUser, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                placeholder="Enter your password"
                value={signupUser.password}
                onChange={(e) => setsignupUser({ ...signupUser, password: e.target.value })}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={signingLoading}
                className="w-full py-3 mt-4 text-dark btn btn-dark border border-black bg-gradient-to-r from-dark-500 to-white-600 rounded-lg hover:from-dark-600 hover:to-white-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold"
              >
                {signingLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account? 
              <Link href="/login" className="text-indigo-500 underline ml-1">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
