"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

const User = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div className="p-5">
        <FaArrowLeft
          size={20}
          className="cursor-pointer mb-10"
          onClick={() => router.back()}
        />
        <p>User</p>
      </div>
    </AdminLayout>
  );
};

export default User;
