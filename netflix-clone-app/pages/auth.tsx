import React, { useCallback, useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log("failed to login", error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });
      login();
    } catch (error) {
      console.log("failed to register", error);
    }
  }, [email, username, password, login]);

  return (
    <div className="realtive h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full sm:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="name"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button 
                onClick={() => signIn("google", { callback: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 trnasition">
                <FcGoogle size={30} />
              </button>
              <button
                onClick={() => signIn("github", { callback: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 trnasition"
              >
                <FaGithub size={30} />
              </button>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Try login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
