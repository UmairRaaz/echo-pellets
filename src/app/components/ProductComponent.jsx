"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { TbTagStarred } from "react-icons/tb";
import ProductContext from "@/context/ProductContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductComponent = ({
  productId,
  productImage,
  productName,
  productPrice,
  productRating,
  productCategory,
  productFor
}) => {
  const { productData, wishlist, setWishlist, cart, setCart } = useContext(ProductContext);
  const router = useRouter();

  const handleWishList = (id) => {
    const productToAdd = productData.find(product => product?._id === productId);
    setWishlist(prev => [...prev, productToAdd]);
    toast("Added To WishList", { icon: '❤️' });
  };

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  const handleAddToCart = (id) => {
    const productToAdd = productData.find(product => product?._id === productId);
    setCart(prev => [...prev, productToAdd]);
    toast("Added To Cart", { icon: '🛒' });
  };

  const handleRemoveWishList = (id) => {
    setWishlist(prev => prev.filter(product => product?._id !== id));
    toast("Removed From WishList", { icon: '❌' });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(product => product?._id !== id));
  };

  localStorage.setItem("cart", JSON.stringify(cart));

  const isInWishlist = wishlist.some(wishProduct => wishProduct?._id === productId);
  const isInCartList = cart.some(cartProduct => cartProduct?._id === productId);

  return (
    <div className="p-3 w-[75%] mx-auto bg-white border border-gray-400 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div onClick={() => router.push(`/product/${productId}`)} className="relative w-full h-40 overflow-hidden">
        <Image
          src={productImage}
          alt="product-image"
          layout="fill"
          objectFit="object-contain"
          className="transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
        />
       
      </div>
      <div className="p-4">
        <h1 className="text-sm font-semibold text-black truncate capitalize">{productName}</h1>
        <p className="text-xlg  text-black font-bold mt-1">Rs. {productPrice}</p>
       
        <p className="text-sm text-gray-500 mt-2 capitalize">{productCategory} : {productFor}</p>

      </div>

      <div className="flex justify-center text-center  w-full  items-center p-2 border-gray-200 ">
        {isInCartList ? (
        
            <Link href={"/cart"} className="btn bg-white  btn-sm w-full text-center py-2 px-4 border  border-black  text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300">Go to Cart</Link>
          
        ) : (
          <button
            onClick={() => handleAddToCart(productId)}
            className="btn bg-white  btn-sm w-full text-center py-2 px-4 border  border-black  text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
