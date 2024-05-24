"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Booking = () => {
  const param = useParams();
  const [booking, setBooking] = useState<any>({});

  console.log(param);

  const getSingleBoooking = async () => {
    try {
      const response = await axios.get(
        `https://sunet-be.onrender.com/api/rooms/booking/${param.id}`
      );

      setBooking(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(booking);

  useEffect(() => {
    getSingleBoooking();
  }, []);

  const colors = (status: string) => {
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
    <AdminLayout>
      <div className="p-5  max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Booked Room</h2>
          <button className="py-2 px-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Cancel Booking
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <div className="">
            <p className="font-semibold">Customer Name:</p>
            <p>
              {booking?.userDetails?.firstName} {booking?.userDetails?.lastName}
            </p>
          </div>
          <div className="">
            <p className="font-semibold">Email:</p>
            <p>{booking?.userDetails?.email}</p>
          </div>
          <div className="">
            <p className="font-semibold">Phone Number:</p>
            <p>{booking?.userDetails?.phoneNumber}</p>
          </div>
          <div className="">
            <p className="font-semibold">Room Type:</p>
            <p>{booking?.roomDetails?.roomType}</p>
          </div>
          <div className="">
            <p className="font-semibold">Checkin Date:</p>
            <p>
              {booking?.roomDetails?.checkInDate &&
                format(booking?.roomDetails?.checkInDate, "PPP")}
            </p>
          </div>
          <div className="">
            <p className="font-semibold">Checkout Date:</p>
            <p>
              {booking?.roomDetails?.checkInDate &&
                format(booking?.roomDetails?.checkOutDate, "PPP")}
            </p>
          </div>
          <div className="">
            <p className="font-semibold">Total:</p>
            <p>{booking?.total_price}</p>
          </div>
          <div className="">
            <p className="font-semibold">Status:</p>
            <p
              className={`text-sm py-1 px-2 w-fit rounded-md capitalize ${colors(
                booking?.status
              )}`}
            >
              {booking?.status}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Booking;
