import React, { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
const Signup = () => {
  const { signupFunction } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(name.trim());
    setEmail(email.trim());
    signupFunction({ name, email, password, role });
  }
  return (
    <form className="w-full h-full flex justify-center items-center px-3 max-w-125 mx-auto" onSubmit={handleSubmit}>
      <div className="w-full h-[88vh] border border-[#5a7ed8] p-2 rounded-lg bg-[#dee4f7] hover:shadow-2xl hover:scale-[1.001] transition duration-200">
        <img
          src="./Signup.png"
          alt="Signup"
          className="h-[35vh] w-full rounded-md object-cover"
        />

        <div className="mt-5 px-5 text-gray-700 flex flex-col gap-4">
          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 text-md md:text-lg"
            >
              Name
            </label>
            <input
              type="text"
              className="py-1 md:py-1.5 px-2 rounded-md bg-blue-50 border border-slate-400 outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 text-md md:text-lg "
            >
              Email
            </label>
            <input
              type="email"
              className="py-1 md:py-1.5 px-2 rounded-md bg-blue-50 border border-slate-400 outline-none"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 text-md md:text-lg"
            >
              Password
            </label>
            <input
              type="password"
              className="py-1 md:py-1.5 px-2 rounded-md bg-blue-50 border border-slate-400 outline-none"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full py-1.5 bg-[#1f57e4] text-white rounded-md text-bold hover:bg-[#1f57e4]/90 transition duration-300">
            Sign Up
          </button>

          <p className="text-sm text-gray-600 text-center -mt-2">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
