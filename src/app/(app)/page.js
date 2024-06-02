'use client'
import MainPage from "../components/MainPage";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductContext from '@/context/ProductContext';
import { usePathname } from "next/navigation";

export default function Home() {
  const { productData, setProductData } = useContext(ProductContext);
  const [localStorages, setlocalStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/getProductsForCustomer");
        setProductData(response.data.products);
        localStorage.setItem("products", JSON.stringify(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [setProductData]); 

  return (
    <>
      {loading || !productData.length ? (
        <div>Loading...</div> // Replace with a proper loading indicator if needed
      ) : (
        <MainPage />
      )}
    </>
  );
}
