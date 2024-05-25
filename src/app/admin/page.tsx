"use client";

import { useState } from "react";
import Button from "../components/shared/buttons/Button";
import InputField from "../components/shared/input-fields/InputFields";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for show/hide password

const AdminLoginScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the corresponding error when typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let errors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://sunet-be.onrender.com/api/auth/admin-login",
        formData
      );

      if (response.status === 200) {
        toast.success("Login successful");
        router.push("/admin/rooms"); // Redirect to dashboard or home page after login
        const userData = response.data; // Assuming response.data contains user data
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);

    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="w-full max-w-md p-5 justify-center">
        <div className="">
          <div className="text-3xl text-nrvGreyBlack font-semibold text-center">
            ADMIN DASHBOARD
          </div>
          <div className="pt-2 text-nrvLightGrey text-md text-center">
            Please enter your login to access your account.
          </div>

          <div className="w-full mt-6">
            <div className="mt-2">
              <InputField
                label="Email Address"
                placeholder="Enter your email address"
                inputType="email"
                onChange={handleInputChange}
                name="email"
                error={errors.email}
              />
            </div>

            <div className="mt-4">
              <InputField
                label="Password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                name="password"
                inputType={showPassword ? "text" : "password"}
                endIcon={
                  <button
                    type="button"
                    className="mr-2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                }
                error={errors.password}
              />
            </div>
          </div>
          <div className="w-full mt-16">
            <Button
              size="large"
              className="block w-full"
              variant="bluebg"
              showIcon={false}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Continue"}
            </Button>
          </div>
          {/* <div className="w-full justify-center flex gap-3 mt-4">
            <div className="text-sm text-nrvLightGrey">
              Do not have an account?
            </div>
            <Link
              href="/sign-up"
              className="text-sm underline font-light text-[#153969]"
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
