"use client";

import { useState } from "react";
import Button from "../components/shared/buttons/Button";
import InputField from "../components/shared/input-fields/InputFields";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios

const LoginScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        "https://sunet-be.onrender.com/api/auth/login",
        formData
      );

      if (response.status === 200) {
        // Login successful
        const userData = response.data; // Assuming response.data contains user data
        localStorage.setItem("userData", JSON.stringify(userData));
        router.push("/dashboard"); // Redirect to dashboard or home page after login
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure
        // Show error message, enable the button again, etc.
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      // Handle login failure
      // Show error message, enable the button again, etc.
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full sm:w-1/3 p-16 justify-center">
        <div className="">
          <div className="text-3xl text-nrvGreyBlack font-semibold">
            Welcome Back, 🤗,
          </div>
          <div className="pt-2 text-nrvLightGrey text-md">
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
                inputType="password"
                onChange={handleInputChange}
                name="password"
                error={errors.password}
              />
            </div>

          </div>
          <div className="w-full mt-20 pt-10">
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
          <div className="w-full justify-center flex gap-3 mt-4">
            <div className="text-sm text-nrvLightGrey">
              Do not have an account?
            </div>
            <Link
              href="/sign-up"
              className="text-sm underline font-light text-[#153969]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
