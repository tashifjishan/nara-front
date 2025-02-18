import React, { useState, useEffect } from "react";
import LoginImage from "../../assets/LoginImage.jpg";
import LoginMobile from "../../assets/loginMobile.jpg";
import logo from "../../assets/NaraLogo.png";
import { MuiTelInput } from "mui-tel-input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye,  FaRegEyeSlash } from "react-icons/fa6";

function SignupSection() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [actualPhone, setActualPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Name validation (more than 3 characters)
  const validateName = (name) => {
    return name.trim().length > 3;
  };

  // Phone number validation (exactly 10 digits)
  const validatePhone = (phone) => {
    return phone.length === 10;
  };

  // Form validation function
  const validateForm = () => {
    if (
      validateName(name) &&
      validatePhone(actualPhone) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      setIsFormValidated(true);
    } else {
      setIsFormValidated(false);
    }
  };

  // Validate the form when any field changes
  useEffect(() => {
    validateForm();
  }, [name, actualPhone, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValidated) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setIsLoading(true);

    try {
     
      console.log(phone.replaceAll(" ", ""))
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/user/signup", {
        method:"POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({name, email, phone: phone.replaceAll(" ", ""), password})
      })
      if(!response.ok){
        response = await response.json();
        console.log(response);
        throw new Error("Error while signing up!")
      }

      response = await response.json();
      toast.success("Signup successful!");
      console.log("Signup successful:", response);
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[100%] dark:text-[#ffff] flex lg:flex-row flex-col font-antikor">
      <div className="lg:w-[50%] h-full object-cover lg:fixed">
        <img
          src={LoginImage}
          className="h-full w-full object-cover lg:flex hidden"
        />
        <img
          src={LoginMobile}
          className="h-full w-full object-cover lg:hidden"
        />
      </div>
      <div className="lg:w-[50%] lg:ml-[50%] min-h-full px-8 py-16 flex justify-center items-center ">
        <div className="max-w-[480px] flex-col flex gap-[30px]">
          <div className="w-full h-full flex flex-col gap-[10px]">
              {/* Breadcrumb */}
              <div className="flex gap-2 ">
            <Link className="underline" to={"/"}> Home</Link> <img src="/icons/leftTriangleIcon.svg" alt="" />
            <span>Signup</span>
            </div>
            <p className="font-extrabold text-2xl">Welcome to</p>
            <div>
              <Link className="cursor-pointer" to="/"><img src={logo} alt="logo" className="w-[200px] lg:w-[300px]" /></Link>
            </div>
            <p className="font-light lg:text-xl text-md mt-2">
              Today is a new day. It's your day. You shape it. You style it. Be
              the best version of yourself
            </p>
          </div>
          <div className="w-full h-full flex flex-col gap-[10px]">
            <div className="w-full">
              <p className="text-[#626262] text-sm dark:text-[#ffff]">Your Name*</p>
              <input
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] text-black w-full"
                type="text"
                value={name}
              />
              {!validateName(name) && name && (
                <p className="text-red-600 text-sm">
                  Name must be more than 3 characters
                </p>
              )}
            </div>
            <div className="">
              <p className="text-[#626262] text-sm dark:text-[#ffff]">Phone Number*</p>
              <MuiTelInput
                value={phone}
                required={true}
                onChange={(enteredNumber, info) => {
                  setPhone(enteredNumber);
                  setActualPhone(info.nationalNumber);
                  setCountry(`+${info.countryCallingCode}`);
                }}
                name="phone"
                id="phone"
                placeholder="Phone*"
                defaultCountry="IN"
                size="small"
                variant="outlined"
                className="w-full bg-[#F7F7F7] border-3"
              />
              {!validatePhone(actualPhone) && actualPhone && (
                <p className="text-red-600 text-sm">
                  Phone number must be 10 digits
                </p>
              )}
            </div>
            <div className="w-full">
              <p className="text-[#626262] dark:text-[#ffff] text-sm">Email Id*</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border-1 border-[#A7A7A766] text-black bg-[#F7F7F7] w-full"
                type="text"
                value={email}
              />
              {!validateEmail(email) && email && (
                <p className="text-red-600 text-sm">Invalid email format</p>
              )}
            </div>
            <div>
              <p className="text-[#626262] text-sm dark:text-[#ffff]">Password*</p>
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
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEyeSlash size={24} /> : <FaRegEye size={24} />}
                </button>
              </div>
              {password && !validatePassword(password) && (
                <p className="text-red-600 text-sm">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {/* Privary Policy and terms and conditions clause */}
            <p className="text-xs text-center tracking-tighter">
              By Signing up , I agree to{" "}
              <Link className="text-indigo-500 underline" to="https://docs.google.com/document/d/1D4n_mgSz9K1yVEFgDhKrTQdfdb3zUPlkpQNf8AxjBUI/edit?usp=sharing">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link className="text-indigo-500 underline" to="https://docs.google.com/document/d/1D4n_mgSz9K1yVEFgDhKrTQdfdb3zUPlkpQNf8AxjBUI/edit?usp=sharing">
                Privacy Policy{" "}
              </Link>
            </p>


            <button
              onClick={handleSubmit}
              className="disabled:bg-gray-500 bg-[#1F4A40] text-white font-semibold px-2 py-2 mt-2"
              disabled={!isFormValidated}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="flex gap-1 justify-center">
            Already have an account?
            <Link className="underline text-[#1F4A40] dark:text-green-500 font-semibold" to="/login">
              Login
            </Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupSection;
