"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminRooms = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://sunet-be.onrender.com/api/users/all"
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
    <AdminLayout>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Users</h2>
          {/* <button className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white">
            Create Room
          </button> */}
        </div>

        <div></div>
        <table className="mt-10 w-full">
          <thead className="bg-jsPrimary100 text-white font-medium">
            <tr>
              <td className="p-5">No</td>
              <td className="p-5">First Name</td>
              <td className="p-5">Last Name</td>
              <td className="p-5">Email</td>
              <td className="p-5">Date Registered</td>
              <td className="p-5">Status</td>
            </tr>
          </thead>
          <tbody>
            {users.map((item: any, index: number) => (
              <tr
                key={item?._id}
                className={`border-t ${index % 2 === 1 && "bg-yellow-50"}`}
                onClick={() => router.push(`/admin/users/${item?.email}`)}
              >
                <td className="p-5">{index + 1}</td>
                <td className="p-5 capitalize">{item?.firstName}</td>
                <td className="p-5 capitalize">{item?.lastName}</td>
                <td className="p-5">{item?.email}</td>
                <td className="p-5">{format(item?.createdAt, "PPP")}</td>
                <td className="p-5">{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminRooms;
