"use client";

import Link from "next/link";
import UploadProduct from "../../../components/UploadProduct";
import AddAdmin from "../../../components/AddAdmin";
import ShowSales from "../../../components/ShowSales";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const [isAdmin, setisAdmin] = useState(false);
 
  return (
    <>
      <div className={`bg-white shadow-lg`}>
        <UploadProduct  />
      </div>
    </>
  );
};

export default AdminPage;