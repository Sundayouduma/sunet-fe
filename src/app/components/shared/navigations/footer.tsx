"use client";
import Image from "next/image";
import Logo from "../../../../../public/images/Logo.png";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Link className="mb-10" href="/">
          <Image src={Logo} alt="logo" className="h-auto w-full" />
        </Link>
        <div className="p-5 pt-0 flex flex-col gap-5 mb-10">
          <p className="text-jsPrimary100 text-xl">Site Navigation</p>
          <Link href="/">Home</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="p-5 pt-0 flex flex-col gap-3 mb-10">
          <p className="text-jsPrimary100 text-xl">Email Newsletter</p>
          <p className="my-2">
            Subscribe to our newsletter to get the latest discounts and promos.
          </p>
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="p-2 focus:outline-jsPrimary100 border-2 rounded-md"
          />
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="p-2 focus:outline-jsPrimary100 border-2 rounded-md"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 focus:outline-jsPrimary100 border-2 rounded-md"
          />

          <button className="w-full py-2 bg-jsPrimary100 hover:bg-jsPrimary200 rounded-md text-white  text-center">
            Subscribe
          </button>
        </div>
        <div className="p-5 pt-0 flex flex-col gap-5 mb-10">
          <p className="text-jsPrimary100 text-xl">Get in Touch</p>
          <p className="flex gap-2 items-center">
            <FaMapMarkerAlt size={20} /> No 1, lukulu Street wuse zone 3, Abuja
          </p>
          <p className="flex gap-2 items-center">
            <FaPhoneAlt size={20} />
            <Link href="tel:+2340000000000">07032735889</Link>
          </p>
          <p className="flex gap-2 items-center">
            <MdEmail size={20} />{" "}
            <Link href="mailto:info@juwshewaj.com">info@juwshewaj.com</Link>
          </p>

          <div className="mt-3 flex gap-5">
            <Link
              href="#"
              className="p-2 rounded-full text-white bg-jsPrimary100 hover:bg-jsPrimary200"
            >
              <FaFacebook size={20} />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full text-white bg-jsPrimary100 hover:bg-jsPrimary200"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full text-white bg-jsPrimary100 hover:bg-jsPrimary200"
            >
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
