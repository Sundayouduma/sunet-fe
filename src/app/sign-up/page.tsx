"use client"

import { useState } from "react";
import Button from "../components/shared/buttons/Button";
import InputField from "../components/shared/input-fields/InputFields";
import Layout from "../components/layout/UserLayout";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const SignUpScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    status: "Active"
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the corresponding error when typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post("https://sunet-be.onrender.com/api/users", formData);

      if (response.status === 201) {
        toast.success("Sign-up successful! Redirecting to login page...");
        router.push("/sign-in");
      } else {
        console.error("Sign-up failed:", response.statusText);
        toast.error("Sign-up failed. Please try again later.");
      }
    } catch (error: any) {
      console.error("Sign-up failed:", error?.response?.data?.message);
      toast.error(error?.response?.data.message);
    } finally {
      setIsLoading(false); // Set loading state back to false regardless of success or failure
    }
  };

  return (
    <Layout>
        <ToastContainer />
      <div className="flex items-center justify-center h-screen -mt-20">
        <div className="w-full p-5 justify-center">
          <div className="">
            <div className="pt-2 text-2xl text-nrvLightGrey text-md">
              Create an Account
            </div>

            <div className="w-full mt-6">
              <div className="mt-2">
                <InputField
                  label="First Name"
                  placeholder="Enter your first name"
                  inputType="text"
                  onChange={handleInputChange}
                  name="firstName"
                  error={errors.firstName}
                />
              </div>

              <div className="mt-4">
                <InputField
                  label="Last Name"
                  placeholder="Enter your last name"
                  inputType="text"
                  onChange={handleInputChange}
                  name="lastName"
                  error={errors.lastName}
                />
              </div>
            
              <div className="mt-4">
                <InputField
                  label="Email"
                  placeholder="Enter your email"
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

            <div className="mt-16">
              <Button
                size="large"
                className="block w-full"
                variant="bluebg"
                showIcon={false}
                onClick={handleSignUp}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Loading..." : "Continue"} {/* Change button text based on loading state */}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpScreen;
