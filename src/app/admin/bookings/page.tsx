"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminBookings = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<any>([]);

  const getAllBookings = async () => {
    try {
      const response = await axios.get(
        "https://sunet-be.onrender.com/api/rooms/bookings"
      );

      setBookings(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  console.log(bookings);

  return (
    <AdminLayout>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Bookings</h2>
          {/* <button className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white">
            Create Room
          </button> */}
        </div>

        <div></div>
        <table className="mt-10 w-full">
          <thead className="bg-jsPrimary100 text-white font-medium">
            <tr>
              <td className="p-5">No</td>
              <td className="p-5">Name</td>
              <td className="p-5">Email</td>
              <td className="p-5">Phone</td>
              <td className="p-5">Room Type</td>
              <td className="p-5">Occupants</td>
              <td className="p-5">Checkin Date</td>
              <td className="p-5">Checkout Date</td>
              <td className="p-5">Total Price</td>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 &&
              bookings.map((item: any, index: number) => (
                <tr
                  key={item?._id}
                  className={`border-t ${index % 2 === 1 && "bg-yellow-50"}`}
                  onClick={() => router.push(`/admin/users/${item?.email}`)}
                >
                  <td className="p-5">{index + 1}</td>
                  <td className="p-5 capitalize">
                    {item?.userDetails?.firstName} {item?.userDetails?.lastName}
                  </td>
                  <td className="p-5 capitalize">{item?.userDetails?.email}</td>
                  <td className="p-5">{item?.userDetails?.phoneNumber}</td>
                  {/* <td className="p-5">{format(item?.createdAt, "PPP")}</td> */}

                  {/* <td className="p-5">{item?.roomDetails?.roomType}</td> */}
                  <td className="p-5">roomType</td>
                  <td className="p-5">{item?.roomDetails?.occupancy}</td>
                  <td className="p-5">
                    {item?.roomDetails?.checkInDate &&
                      format(new Date(item?.roomDetails?.checkInDate), "PPP")}
                  </td>
                  <td className="p-5">
                    {/* {item?.roomDetails?.checkOutDate
                      ? format(new Date(item?.roomDetails?.checkOutDate), "PPP")
                      : "No Date"} */}
                    checkOutDate
                  </td>
                  <td className="p-5">{item?.total_price.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
