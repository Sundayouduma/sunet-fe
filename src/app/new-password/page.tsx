"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../components/shared/input-fields/InputFields";
import Button from "../components/shared/buttons/Button";
import { useState } from "react";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ndPasswordVisible, setNdPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [resetData, setResetData] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const [validInput, setValidInput] = useState({
    newPassword: false,
    newPasswordConfirmation: false,
  });

  const handleInputChange = (e: any, num: number) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });

    if (name === "newPassword" || name === "newPasswordConfirmation") {
      const isValidPassword = value.length >= 8;
      setValidInput({ ...validInput, [name]: isValidPassword });
    }

    if (num === 1) {
      setPassword(e.target.value);
    }
  };

  // const handleResetPassword = async () => {
  //   const email = JSON.parse(localStorage.getItem("email"));
  //   const verificationToken = JSON.parse(
  //     localStorage.getItem("verificationCode")
  //   );

  //   const payload = {
  //     ...resetData,
  //     email: email,
  //     verificationToken: verificationToken,
  //   };
  //   dispatch(resetPassword(payload))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Password reset successful.");
  //       onNextStep();
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNdPasswordVisible = () => {
    setNdPasswordVisible(!ndPasswordVisible);
  };

  const handleRadioClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen justify-center  items-center">
      <div className="max-w-sm w-full rounded-lg shadow-m ">
        {/* <div className="flex justify-center items-center mt-20 -ml-5">
          <Image src={companyLogo} alt="company logo" />
        </div> */}
        <h2 className="text-2xl text-center font-semibold mt-20 mb-4">
          Reset Your Password
        </h2>
        <div className="mt-2">
          <InputField
            label="New Password"
            name="newPassword"
            inputType={passwordVisible ? "text" : "password"}
            placeholder="Enter New Password"
            // required={true}
            onChange={(e: any) => {
              handleInputChange(e, 1);
            }}
            // startIcon={<MdKey />}
            endIcon={
              passwordVisible ? (
                <AiOutlineEyeInvisible
                  onClick={handlePasswordVisible}
                  className="cursor-pointer mr-2"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={handlePasswordVisible}
                  className="cursor-pointer mr-2"
                  size={20}
                />
              )
            }
          />
        </div>
        <div className="mt-2">
          <InputField
            label="Confirm New Password"
            name="newPasswordConfirmation"
            inputType={ndPasswordVisible ? "text" : "password"}
            placeholder="Confirm New Password"
            // required={true}
            onChange={(e: any) => {
              handleInputChange(e, 2);
            }}
            // startIcon={<MdKey />}
            endIcon={
              ndPasswordVisible ? (
                <AiOutlineEyeInvisible
                  onClick={handleNdPasswordVisible}
                  className="cursor-pointer mr-2"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={handleNdPasswordVisible}
                  className="cursor-pointer mr-2"
                  size={20}
                />
              )
            }
          />
        </div>
        <div className="mt-4 text-swGray">
          <p>Your password should contain</p>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^.{8,20}$/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p className="text-[14px]">Between 8 to 20 characters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[0-9])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p className="text-[14px]">1 number</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[A-Z])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p className="text-[14px]">Capital Letters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[a-z])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p className="text-[14px]">Small letters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={
                /^[!@#\$%\^&\*.(),\-_+='"]+$/.test(password) ? true : false
              }
              onClick={handleRadioClick}
            />
            <p className="text-[14px]">Symbols (_, @, #, $,&, etc)</p>
          </div>
        </div>
        <div className="relative w-full h-fit mt-10">
          <Button
            size="large"
            className="block w-full"
            variant="bluebg"
            showIcon={false}
            // onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify"}
            <div
              className={`${
                !validInput.newPassword ||
                !validInput.newPasswordConfirmation ||
                loading
                  ? "bg-white bg-opacity-50 h-full w-full absolute top-0 left-0 cursor-not-allowed"
                  : "hidden"
              }`}
            />
          </Button>
        </div>
        <p className="text-sm mt-2 pt-2 text-center">
          <Link href="/sign-in">Back to Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordScreen;
