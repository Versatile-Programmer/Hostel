import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });
  // const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your actual API endpoint for signup
    const signupEndpoint = "http://localhost:3000/auth/signup";

    if (formData.password !== formData.confirmPassword) {
      handleError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   handleError(errorData.message || "Signup failed");
      // }
      const data = await response.json();
      console.log("the data is",data);
      const { success, message ,errors } = data;
      console.log(message);
      console.log(errors);
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
      }, 1000)
      }else{
        console.log("message",message);
        handleError(message);
      }
      // Redirect to login page after successful signup
    } catch (err) {
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Signup</h2>
        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm text-gray-300">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your contact number"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Signup
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-teal-400 hover:underline">
            Login
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;
