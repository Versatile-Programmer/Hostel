import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNo: "",
    wing: "",
    description: "",
  });
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your actual API endpoint for creating requests
    const createRequestEndpoint = "http://localhost:3000/request/create";

    try {
      const response = await fetch(createRequestEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify(formData),
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   setError(errorData.message || "Failed to create request");
      //   return;
      // }

      const data = await response.json();
      const { message , success} = data;
      if(success){
        handleSuccess(message);
        setInterval(() => {
          navigate("/my-requests");
        }, 1000);
      }else{
        handleError(message)
      }
      // handleSuccess("Request created successfully!");
      console.log("Request created:", data);
      // Optionally navigate back to another page
    } catch (err) {
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Create Maintenance Request</h2>
        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roomNo" className="block text-sm text-gray-300">
              Room Number
            </label>
            <input
              type="text"
              id="roomNo"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your room number"
              required
            />
          </div>
          <div>
            <label htmlFor="wing" className="block text-sm text-gray-300">
              Wing
            </label>
            {/* <input
              type="text"
              id="wing"
              name="wing"
              value={formData.wing}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Enter the wing name"
              required
            /> */}
            <select
              id="wing"
              name="wing"
              value={formData.wing}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="">Select Wing</option>
              <option value="Bose">Bose</option>
              <option value="Azad">Azad</option>
              <option value="Chilrai">Chilrai</option>
              <option value="Devan">Dewan</option>
              <option value="Sukapha">Sukapha</option>
              <option value="Lachit">Lachit</option>
              <option value="Common Room">Common Room</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
              placeholder="Describe the issue in detail"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateRequest;
