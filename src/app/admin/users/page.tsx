"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import SearchBar from "@/app/components/shared/input-fields/SearchBar";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminRooms = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://sunet-be-6812.onrender.com/api/users/all"
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
    <AdminLayout>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Users</h2>
          {/* <button className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white">
            Create Room
          </button> */}
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold">Total Rooms: {users.length}</p>
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
              <td className="p-5">No</td>
              <td className="p-5">First Name</td>
              <td className="p-5">Last Name</td>
              <td className="p-5">Email</td>
              <td className="p-5">Date Registered</td>
              <td className="p-5">Status</td>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (item: any) => item?.status === filter || filter === "all"
              )
              .filter((item: any) =>
                ["firstName", "lastName", "email"].some((prop) =>
                  item?.[prop]
                    ?.toLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
              )
              .map((item: any, index: number) => {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                if (index >= startIndex && index < endIndex) {
                return (
                <tr
                  key={item?._id}
                  className={`border-t border-t-yellow-500 hover:bg-yellow-50 cursor-pointer`}
                  onClick={() => router.push(`/admin/users/${item?.email}`)}
                >
                  <td className="p-5">{index + 1}</td>
                  <td className="p-5 capitalize">{item?.firstName}</td>
                  <td className="p-5 capitalize">{item?.lastName}</td>
                  <td className="p-5">{item?.email}</td>
                  <td className="p-5">{format(item?.createdAt, "PPP")}</td>
                  <td className="p-5">{item?.status}</td>
                </tr>
              )}})}
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
                { length: Math.ceil(users.length / itemsPerPage) },
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
                  currentPage === Math.ceil(users.length / itemsPerPage)
                }
                className="p-2 px-4 border border-jsPrimary100 rounded-tr-lg rounded-br-lg cursor-pointer"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRooms;
