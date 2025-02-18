import React, { useState } from "react";
import LoginImage from "../../assets/LoginImage.jpg";
import LoginMobile from "../../assets/loginMobile.jpg";
import logo from "../../assets/NaraLogo.png";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthStatus, } from "../../store";
import { ToastContainer, toast as toastifyToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
function LoginSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    try {
      e.preventDefault();
      setIsLoading(true);
      const userData = { email, password };
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST+ "/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      if (!response.ok) {
        response = await response.json();
        throw new Error(response.message)
      }
      response = await response.json()

      toast.success("Login successful!");
      dispatch(setAuthStatus({ accessToken: "XYZ", isAuthenticated: true }));
      localStorage.setItem("accessToken", "XYZ")

      navigate("/");
    } catch (error) {

      toast.error("Login failed: " + error.message);

    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="dark:text-[#ffff]  relative w-[100%] xl:h-screen flex lg:flex-row flex-col font-antikor">
      <ToastContainer
        position="bottom-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "light" : "dark"}
      />
      {/* Same as */}

      <div className="lg:w-[50%] h-full object-cover">
        <img
          src={LoginImage}
          className="h-full w-full object-cover lg:flex hidden"
        />
        <img
          src={LoginMobile}
          className="h-full w-full object-cover lg:hidden"
        />
      </div>
      <div className="lg:w-[50%] h-full px-8 py-16 flex justify-center items-center">
        <div className="max-w-[480px] flex-col flex gap-[30px]">
          <div className="w-full h-full flex flex-col gap-[10px]">
            {/* Breadcrumb */}
            <div className="flex gap-2 ">
              <Link className="underline" to={"/"}>
                {" "}
                Home
              </Link>{" "}
              <img src="/icons/leftTriangleIcon.svg" alt="" />
              <span>Login</span>
            </div>
            <p className="font-extrabold text-2xl">Welcome to</p>
            <div>
              <Link to={"/"} className="cursor-pointer">
                <img src={logo} alt="logo" className="w-[200px] lg:w-[300px]" />
              </Link>
            </div>{" "}
            <p className="font-light lg:text-xl text-md mt-2">
              Today is a new day. It's your day. You shape it. You style it. Be
              the best version of yourself
            </p>
          </div>{" "}
          <div className="w-full h-full flex flex-col gap-[10px]">
            <div className="w-full">
              <p className="text-[#626262] text-sm dark:text-[#ffff]">
                Email Id
              </p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="text-black px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="text"
              />
            </div>{" "}
            <div>
              <p className="text-[#626262] text-sm dark:text-[#ffff]">
                Password
              </p>
              <div className="relative w-full">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="text-black px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  type="button"
                  className="text-black absolute right-3 top-2 text-sm"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <FaRegEyeSlash size={24} />
                  ) : (
                    <FaRegEye size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Privary Policy and terms and conditions clause */}
            <p className="text-xs tracking-tight text-center">
              By Signing in , I agree to{" "}
              <Link
                className="text-indigo-500 underline"
                to="https://docs.google.com/document/d/1D4n_mgSz9K1yVEFgDhKrTQdfdb3zUPlkpQNf8AxjBUI/edit?usp=sharing">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                className="text-indigo-500 underline"
                to="https://docs.google.com/document/d/1D4n_mgSz9K1yVEFgDhKrTQdfdb3zUPlkpQNf8AxjBUI/edit?usp=sharing">
                Privacy Policy{" "}
              </Link>
            </p>
            <button
              onClick={handleLogin}
              className="bg-[#1F4A40] text-white font-semibold px-2 py-2">
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>

          <div className="flex gap-1 justify-center">
            Dont have an account?
            <Link
              className="text-[#1F4A40] dark:text-green-500 font-semibold underline"
              to="/signup">
              Sign Up
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
