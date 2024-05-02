"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Layout from "../components/layout/UserLayout";
import { IoFilter } from "react-icons/io5";
import { format, parse } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = data ? JSON.parse(userDataString) : null;
    const fetchBookings = async () => {
      try {
        const response = await axios(
          `https://sunet-be.onrender.com/api/rooms/user-bookings?email=${userData?.user?.email}`
        );
        console.log("response", response?.data);
        setData(response?.data);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchBookings();
    // console.log(userData);
  }, []);
  return (
    <Layout>
      <ToastContainer />
      <main className="max-w-7xl w-full mx-auto p-5">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <p className="text-xl text-swGray600">
            All your booking in one place
          </p>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 border rounded-md p-2">
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Search Bookings"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-none focus:outline-none w-full h-full"
              />
            </div>
            <div className="rounded-full py-2 px-4 font-medium text-swPrimary500 border flex gap-2 items-center hover:bg-swGray50 cursor-pointer">
              <p>Filter</p>
              <IoFilter size={20} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          {data.map((item) => (
            <div
              key={item?._id}
              className="grid grid-rows-2 grid-cols-1 lg:flex lg:justify-between p-5 lg:tems-center text-swGray800 hover:bg-yellow-50 rounded-lg"
            >
              <div className="flex items-center gap-5 justify-between lg:justify-start">
                <div className="w-40">
                  <p className="text-swGray600 text-sm">Check-in</p>
                  <p className="text-lg font-medium">
                    {format(
                      parse(
                        item?.roomDetails?.checkinDate,
                        "dd-MM-yy",
                        new Date()
                      ),
                      "PPP"
                    )}
                  </p>
                </div>

                <div className="w-40">
                  <p className="text-swGray600 text-sm">Check-out</p>
                  <p className="text-lg font-medium">
                    {format(
                      parse(
                        item?.roomDetails?.checkOutDate,
                        "dd-MM-yy",
                        new Date()
                      ),
                      "PPP"
                    )}
                  </p>
                </div>
              </div>

              {/*  */}

              <div className="flex gap-5 items-center justify-between lg:justify-start flex-wrap">
                <div className="w-40">
                  <p className="text-sm text-swGray600">Room name</p>
                  <p className="text-lg font-medium">
                    {item?.roomDetails?.roomType?.roomName}
                  </p>
                </div>
                <div className="">
                  <p className="text-sm text-swGray600">Booking ID</p>
                  <p className="text-lg font-medium">{item?._id}</p>
                </div>
                <div className="flex items-center w-32">
                  <div
                    className={`text-white rounded-full py-2 px-4 ${
                      item?.status === "New"
                        ? "bg-[#CBC419]"
                        : item.status === "Completed"
                        ? "bg-[#33CB19]"
                        : "bg-[#CB2419]"
                    }`}
                  >
                    {item?.status || "booked"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Bookings;
