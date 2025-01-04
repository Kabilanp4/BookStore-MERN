import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import getBaseUrl from "../utils/getBaseUrl";
const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired!, Please login again");
          navigate("/");
        }, 3600 * 1000);
      }
      alert("Admin Login Successful");
      navigate("/dashboard");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen  flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className=" block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              UserName
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="UserName"
              className="shadow appearance-none  border rounded w-full py-2 px-3
                 leading-tight focus:outline-none focus:shadow"
              {...register("userName", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className=" block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none  border rounded w-full py-2 px-3
                 leading-tight focus:outline-none focus:shadow"
              {...register("password", { required: true })}
            />
            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none">
              Login{" "}
            </button>
          </div>

          <p className="mt-5 text-center text-gray-500 text-xs">
            ©2025 Book Store. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
