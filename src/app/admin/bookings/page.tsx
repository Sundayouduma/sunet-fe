"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import LoadingPage from "@/app/components/loaders/Loader";
import SearchBar from "@/app/components/shared/input-fields/SearchBar";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBookings = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const getAllBookings = async () => {
    try {
      const response = await axios.get(
        "https://sunet-be.onrender.com/api/rooms/bookings"
      );

      setBookings(response?.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  console.log(bookings);
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
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <AdminLayout>
          <ToastContainer />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Bookings</h2>
              {/* <button className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white">
            Create Room
          </button> */}
            </div>

            <div className="mt-3">
              <p className="text-lg font-semibold">
                Total Rooms: {bookings.length}
              </p>
            </div>
            <div className="flex justify-between items-center mt-10">
              <div className="flex gap-5 items-center">
                {renderFilterButton("all")}
                {renderFilterButton("Active")}
                {renderFilterButton("Not Active")}
              </div>
              <div className="max-w-md w-full">
                <SearchBar
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <table className="mt-10 w-full">
              <thead className="bg-jsPrimary100 text-white font-medium">
                <tr>
                  <td className="p-5">ID</td>
                  <td className="p-5">Date Booked</td>
                  <td className="p-5">Name</td>
                  <td className="p-5">Email</td>
                  {/* <td className="p-5">Phone</td> */}
                  <td className="p-5">Room Name</td>
                  <td className="p-5">Room Type</td>
                  {/* <td className="p-5">Occupants</td> */}
                  <td className="p-5">Checkin Date</td>
                  <td className="p-5">Checkout Date</td>
                  <td className="p-5">Total Price</td>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 &&
                  bookings
                    .filter((item: any) =>
                      ["firstName", "lastName", "email"].some((prop) =>
                        item?.[prop]
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
                            onClick={() =>
                              router.push(`/admin/bookings/${item?._id}`)
                            }
                          >
                            <td className="p-5">{item?.bookingId}</td>
                            <td className="p-5">
                              {format(new Date(item?.createdAt), "PPP")}
                            </td>
                            <td className="p-5 capitalize">
                              {item?.userDetails?.firstName}{" "}
                              {item?.userDetails?.lastName}
                            </td>
                            <td className="p-5 capitalize">
                              {item?.userDetails?.email}
                            </td>
                            <td className="p-5">
                              {item?.roomDetails?.roomType?.roomName}
                            </td>
                            <td className="p-5">
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
                              {item?.total_price.toLocaleString()}
                            </td>
                          </tr>
                        );
                      }
                    })}
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
                { length: Math.ceil(bookings.length / itemsPerPage) },
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
                disabled={
                  currentPage === Math.ceil(bookings.length / itemsPerPage)
                }
                className="p-2 px-4 border border-jsPrimary100 rounded-tr-lg rounded-br-lg cursor-pointer"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </AdminLayout>
      )}
    </>
  );
};

export default AdminBookings;
