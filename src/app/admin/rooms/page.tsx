// AdminDashboard.js
"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useRouter } from "next/navigation";
import axios from "axios";
import CreateRoomModal from "@/app/components/shared/modals/ceateRoomsModal";

const AdminDashboard = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any>([]);
  const [openRoomModal, setOpenRoomModal] = useState<any>(false);
  console.log(openRoomModal);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://sunet-be.onrender.com/api/rooms/all"
      );

      setUsers(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  return (
    <>
      <AdminLayout>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Rooms</h2>
            <button
              className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white"
              onClick={() => setOpenRoomModal(true)}
            >
              Create Room
            </button>
          </div>

          <div></div>
          <table className="mt-10 w-full">
            <thead className="bg-jsPrimary100 text-white font-medium">
              <tr>
                <td className="p-5">No</td>
                <td className="p-5">ID</td>
                <td className="p-5">Name</td>
                <td className="p-5">Room Type</td>
                <td className="p-5">Price</td>
                <td className="p-5">Availability</td>
              </tr>
            </thead>
            <tbody>
              {users.map((item: any, index: number) => (
                <tr
                  key={item?._id}
                  className={`border-t ${index % 2 === 1 && "bg-yellow-50"}`}
                  onClick={() => router.push(`/admin/rooms/${item?.roomId}`)}
                >
                  <td className="p-5">{index + 1}</td>
                  <td className="p-5">{item?.roomId}</td>
                  <td className="p-5">{item?.roomName}</td>
                  <td className="p-5">{item?.roomType}</td>
                  <td className="p-5">{item?.price?.toLocaleString()}</td>
                  <td className="p-5">
                    {item?.availability ? "Available" : "Not Available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      <CreateRoomModal open={openRoomModal} onClose={setOpenRoomModal} />
    </>
  );
};

export default AdminDashboard;
