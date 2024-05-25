"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "@/app/components/layout/UserLayout";

type BookingDetails = {
  bookingId: string;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  roomDetails: {
    roomType: {
      roomName: string;
      roomType: string;
    };
    checkinDate: string;
    checkOutDate: string;
  };
  total_price: number;
  status: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            className="py-2 px-4 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const EachBooking: React.FC = () => {
  const router = useRouter();
  const param = useParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSingleBooking = async () => {
    try {
      const response = await axios.get(
        `https://sunet-be.onrender.com/api/rooms/booking/${param.id}`
      );
      setBooking(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleBooking();
  }, []);

  const handleCancelBooking = async () => {
    try {
      await axios.put(
        `https://sunet-be.onrender.com/api/rooms/booking/${param.id}/cancel`
      );
      setIsModalOpen(false);
      router.push('/bookings'); // Redirect after cancellation
    } catch (error) {
      console.error(error);
    }
  };

  const colors = (status: any) => {
    switch (status) {
      case "cancelled":
        return "bg-red-100 text-red-500";
      case "completed":
        return "bg-green-100 text-green-500";
      default:
        return "bg-yellow-100 text-yellow-500";
    }
  };

  return (
    <Layout>
      <div className="p-5 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <FaArrowLeft
            size={20}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <div className="flex items-center gap-5">
            <button
              className="py-2 px-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {setIsModalOpen(true)}}
            >
              Cancel Booking
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Booked Room</h2>
        <div className="mt-10 grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <p className="font-semibold">Booking ID:</p>
            <p>{booking?.bookingId}</p>
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold">Customer Name:</p>
            <p>{`${booking?.userDetails.firstName} ${booking?.userDetails.lastName}`}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Email:</p>
            <p style={{ maxWidth: "100%", overflowWrap: "break-word", wordBreak: "break-word" }}>
              {booking?.userDetails.email}
            </p>
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold">Phone Number:</p>
            <p>{booking?.userDetails.phoneNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Room Name:</p>
            <p>{booking?.roomDetails.roomType.roomName}</p>
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold">Room Type:</p>
            <p>{booking?.roomDetails.roomType.roomType}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Checkin Date:</p>
            <p>{booking?.roomDetails.checkinDate && format(new Date(booking.roomDetails.checkinDate), "PPP")}</p>
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold">Checkout Date:</p>
            <p>{booking?.roomDetails.checkOutDate && format(new Date(booking.roomDetails.checkOutDate), "PPP")}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Total:</p>
            <p>{booking?.total_price}</p>
          </div>
          <div className="flex flex-col items-end text-end">
            <p className="font-semibold">Status:</p>
            <p className={`text-sm py-1 px-2 w-fit rounded-md capitalize ${colors(booking?.status)}`}>
              {booking?.status}
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelBooking}
        title="Confirm Cancellation"
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>
    </Layout>
  );
};

export default EachBooking;
