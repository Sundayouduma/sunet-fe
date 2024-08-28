"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Layout from "../components/layout/UserLayout";
import { IoFilter } from "react-icons/io5";
import { format, parse } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SearchBar from "../components/shared/input-fields/SearchBar";

const Bookings = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const fetchBookings = async () => {
      try {
        const response = await axios(
          `https://sunet-be-6812.onrender.com/api/rooms/user-bookings?email=${userData?.user?.email}`
        );
        setData(response?.data);
      } catch (error: any) {
        toast.error(error?.message);
      }
    };
    fetchBookings();
    // console.log(userData);
  }, []);
  console.log(data);

  const renderFilterButton = (text: string) => (
    <button
      className={`p-2 px-5 rounded-full text-md font-bold border border-yellow-500 capitalize ${
        filter === text && "bg-yellow-50"
      }`}
      onClick={() => setFilter(text)}
    >
      {text}
    </button>
  );

  return (
    <Layout>
      <ToastContainer />
      <main className="max-w-7xl w-full mx-auto p-5">
        <p className="text-xl text-swGray600">All your booking in one place</p>
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-5 items-center">
            {renderFilterButton("all")}
            {renderFilterButton("Pending")}
            {renderFilterButton("Completed")}
          </div>
          <div className="max-w-md w-full">
            <SearchBar
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
          <table className="mt-10 w-full">
            <thead className="bg-jsPrimary100 text-white font-medium">
              <tr>
                <td className="p-5">Booking ID</td>
                <td className="p-5">Date Booked</td>
                <td className="p-5">Room Name</td>
                <td className="p-5">Room Type</td>
                <td className="p-5">Check-in Date</td>
                <td className="p-5">Check-out Date</td>
                <td className="p-5">Status</td>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data
                  .filter(
                    (item: any) =>
                      item?.status.toLowerCase() ===
                        filter.toLocaleLowerCase() || filter === "all"
                  )
                  .filter((item: any) =>
                    ["roomName", "roomType"].some(
                      (prop) =>
                        item?.roomDetails?.roomType[prop]
                          ?.toLowerCase()
                          .includes(search.toLocaleLowerCase()) ||
                        item?.bookingId
                          ?.toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                  )
                  .sort((a: any, b: any) => {
                    const dateA =
                      typeof a?.createdAt === "string"
                        ? new Date(a?.createdAt)
                        : new Date();
                    const dateB =
                      typeof b?.createdAt === "string"
                        ? new Date(b?.createdAt)
                        : new Date();
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((item: any, index: number) => {
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    if (index >= startIndex && index < endIndex) {
                      return (
                        <tr
                          key={item?._id}
                          className={`border-t border-t-yellow-500 hover:bg-yellow-50 cursor-pointer`}
                          onClick={() => router.push(`bookings/${item?._id}`)}
                        >
                          <td className="p-5">{item?.bookingId}</td>
                          <td className="p-5">
                            {format(new Date(item?.createdAt), "PPP")}
                          </td>
                          <td className="p-5 capitalize">
                            {item?.roomDetails?.roomType?.roomName}
                          </td>
                          <td className="p-5 capitalize">
                            {item?.roomDetails?.roomType?.roomType}
                          </td>
                          <td className="p-5">
                            {item?.roomDetails?.checkinDate &&
                              format(
                                new Date(item?.roomDetails?.checkinDate),
                                "PPP"
                              )}
                          </td>
                          <td className="p-5">
                            {item?.roomDetails?.checkOutDate &&
                              format(
                                new Date(item?.roomDetails?.checkOutDate),
                                "PPP"
                              )}
                          </td>
                          <td className="p-5">
                            <div
                              className={`text-white rounded-full py-2 px-4 w-fit mx-auto ${
                                item?.status?.toLowerCase() === "new"
                                  ? "bg-[#CBC419]"
                                  : item.status?.toLowerCase() === "completed"
                                  ? "bg-[#33CB19]"
                                  : item.status?.toLowerCase() === "confirmed"
                                  ? "bg-[#33CB19]"
                                  : "bg-[#CB2419]"
                              }`}
                            >
                              {item?.status || "booked"}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })
              ) : (
                <tr className="text-2xl font-semibold">
                  <td colSpan={6} className="p-10 text-center">
                    No booking found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center items-center w-full mt-5">
            <button
              disabled={currentPage === 1}
              className="p-2 px-4 border border-jsPrimary100  rounded-tl-lg rounded-bl-lg cursor-pointer"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
            >
              Prev
            </button>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className={`p-2 px-4 border border-jsPrimary100 ${
                    i + 1 === currentPage && "bg-jsPrimary100 text-white"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              className="p-2 px-4 border border-jsPrimary100 rounded-tr-lg rounded-br-lg cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Bookings;
