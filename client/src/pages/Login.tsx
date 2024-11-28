import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password) {
      handleError("Email and password is required");
    }
    // Replace this with your actual API endpoint for login
    const loginEndpoint = "http://localhost:3000/auth/login";
  
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      // if (!response.ok) {
      //   const errorData = await response.json();
      //  handleError(errorData.message || "Login failed");
      //   return;
      // }
      
      const data = await response.json();
       console.log(data);
       const { success, message, token, user } = data;
      // Save JWT token to localStorage
      if (success) {
        localStorage.setItem('token', token);
        // Optionally, you might want to save other user data
        localStorage.setItem('user', JSON.stringify(user));
        handleSuccess(message);
      } else {
        handleError(message);
        return; 
      }
      // handleSuccess("Login Successful")
      console.log("Login successful:", data);
      // Redirect to Home page or dashboard after successful login
      setTimeout(() => {
        navigate('/')
    }, 1000)
    } catch (err) {
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Login</h2>
        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-teal-400 hover:underline">
            Signup
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
