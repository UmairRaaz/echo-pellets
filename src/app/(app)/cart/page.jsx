"use client";
import ProductContext from "@/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CartProducts from "../../components/CartProducts";
import Image from "next/image";

const WishListPage = () => {
  const { cart, cartItem } = useContext(ProductContext);

  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  console.log(cartItem)
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  if (cart.length <= 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Image src="/emptyCart.png" alt="Empty Cart" width={400} height={400} />
          <h1 className="text-xl mt-4 text-gray-700">Your cart is empty. Please add some products.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 md:mt-32 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 p-5 bg-white shadow-lg rounded-lg">
          {cart.map((cartItem, index) => (
            <CartProducts
              key={index}
              productId={cartItem._id}
              productName={cartItem.productName}
              productImage={cartItem.productImage}
              productPrice={cartItem.productPrice}
            />
          ))}
        </div>
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-xl font-semibold mb-4 text-gray-800">Price Details</h1>
          {cartItem.map((item, index) => (
            <div key={index} className="flex justify-between mt-4">
              <span className="text-gray-600">{item.name} ({item.quantity} item{item.quantity > 1 ? 's' : ''})</span>
              <span className="font-semibold text-gray-800">Rs {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="my-8 border-t border-gray-300"></div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-800">Total</span>
            <span className="font-semibold text-gray-800">Rs {totalPrice}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full py-3 mt-4 text-dark btn btn-dark border border-black bg-gradient-to-r from-dark-500 to-white-600 rounded-lg hover:from-dark-600 hover:to-white-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;