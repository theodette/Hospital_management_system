import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: ""
  });


  const navigate = useNavigate();
  const { email, password, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/saveUser", user);
      alert("Your message was received.");
      if (role === "admin") {
        navigate("/viewAppointment");
      } else {
        navigate("/addappointment");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                autoComplete="email"
                required
                onChange={onInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-900">
              Role
            </label>
            <select
              className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
              name="role"
              value={role}
              onChange={onInputChange}
              required
            >
              <option value="">Select option</option>
              <option value="Patient">Patient</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                autoComplete="current-password"
                required
                onChange={onInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                autoComplete="current-password"
                required
              
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
