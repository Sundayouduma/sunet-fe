import { useState } from "react";
import { MdClose } from "react-icons/md";
import InputField from "../input-fields/InputFields";
import Button from "../buttons/Button";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
open: any
onClose: any
bookingDetails: any
}
const NotLoggedInModal = ({ open, onClose, bookingDetails }: props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false); // New loading state

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

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const resetformData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const handleCloseModal = () => {
    setErrors({});
    resetformData();
    onClose(false);
  };

  const handleBooking = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    let booking = bookingDetails;
    booking.userDetails = formData;
    booking.email = formData.email;

    try {
      await axios.post(
        `https://sunet-be.onrender.com/api/rooms/create-booking`,
        booking
        // { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setIsLoading(false);
      resetformData();
      onClose();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  if (!open) return;
  return (
    <main className="fixed flex justify-center items-center h-[100vh] w-full top-0 left-0 bg-black bg-opacity-25 z-[200]">
      <ToastContainer />
      <div className="max-w-xl w-full p-5 bg-white rounded-3xl">
        <div
          className="text-jsPrimary100 cursor-pointer p-2 rounded-full border-2 border-jsPrimary100 w-fit ml-auto hover:bg-yellow-50"
          onClick={handleCloseModal}
        >
          <MdClose size={20} />
        </div>

        <div className="w-full p-5">
          <h3 className="text-xl font-medium text-center">
            You&apos;re not logged in
          </h3>
          <p className="text-center mt-2">Book room as a guest</p>

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
                label="Phone"
                placeholder="Enter your phone number"
                inputType="text"
                onChange={handleInputChange}
                name="phone"
                error={errors.phone}
              />
            </div>
          </div>

          <div className="mt-16">
            <Button
              size="large"
              className="block w-full"
              variant="bluebg"
              showIcon={false}
              onClick={handleBooking}
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? "Loading..." : "Continue"}
              {/* Change button text based on loading state */}
            </Button>
          </div>
        </div>
        <Link href="/sign-in" className="mt-10 hover:underline">
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default NotLoggedInModal;
