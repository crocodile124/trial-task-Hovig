"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState, useEffect, useCallback } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({
      email: "",
      password: "",
      confirmpassword: "",
      address: "",
    });
    if (formValues.password != formValues.confirmpassword) {
      setError("Incorrect Password");
      setLoading(false);
      return;
    }
    if (formValues.address == null) {
      setError("Please input address");
      setLoading(false);
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      const [message] = await Promise.all([res.json()]);
      console.log(message);
      if (message.msg == "Success") {
        signIn(undefined, { callbackUrl: "/" });
      } else {
        setError(message.msg);
        return;
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen h-[92vh]">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4 "
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
              Sign Up
            </h1>
            {error && (
              <p className="text-center bg-red-300 py-4 mb-6 rounded">
                {error}
              </p>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={formValues.email}
                />
              </div>
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formValues.password}
                  required
                />
              </div>
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formValues.confirmpassword}
                  name="confirmpassword"
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  onChange={handleChange}
                  value={formValues.address}
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="text"
                  placeholder="Address"
                  required
                />
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
                disabled={loading}
              >
                {loading ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3>
                <span className="cursor-default dark:text-gray-300">
                  Have an account?
                </span>
                <Link
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="/login"
                >
                  <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Sign In
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
