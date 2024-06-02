'use client';

import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation"; 
import ProductContext from "@/context/ProductContext";

const OrderDetails = () => {
    const { setisLoggedIn, isLoggedIn, wishlist, cart } = useContext(ProductContext);
    const [orders, setOrders] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/isAdmin");
            if (response.data.data) {
                setUserDetails(response.data.data);
                setisLoggedIn(true);
            } else {
                setisLoggedIn(false);
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            setisLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const getOrderDetails = async () => {
        try {
            if (userDetails?.email) {
                const response = await axios.post("/api/getUserOrders", {
                    userEmail: userDetails.email
                });
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error("Failed to fetch order details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            await getUserDetails();
        };
        fetchDetails();
        console.log("ordercomplete:" ,isLoggedIn)
    }, [isLoggedIn]);

    useEffect(() => {
        if (userDetails && userDetails.email) {
            getOrderDetails();
        } else {
            setLoading(false); // Set loading to false if userDetails is null or undefined
        }
    }, [userDetails]);

    if(!isLoggedIn){
        return router.push("/")
    }

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center mt-20">Loading...</div>;
    }


    if (!loading && orders.length === 0) {
        return <div className="h-screen w-full flex items-center justify-center mt-20">No Orders</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 mt-20 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Order Details</h1>
            {orders.map(order => (
                <div key={order._id} className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                        <p><strong>Name:</strong> {order.customer.fullName}</p>
                        <p><strong>Email:</strong> {order.customer.email}</p>
                        <p><strong>Phone:</strong> {order.customer.phoneNumber}</p>
                        <p><strong>Address:</strong> {order.customer.address}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Products</h2>
                        {order.products.map(product => (
                            <div key={product.id} className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow">
                                <Image src={product.image} width={100} height={100} alt={product.name} className="rounded-lg" />
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p><strong>Price:</strong> Rs {product.price}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                    <p><strong>Total:</strong> Rs {product.price * product.quantity}</p>
                                    <p className="text-md mt-1 uppercase">{product.productCategory} : {product.productFor}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                        <p><strong>Total Bill:</strong> Rs {order.totalBill}</p>
                        <p><strong>Delivery Charges:</strong> Rs {order.deliveryCharges}</p>
                        <p><strong>Order Status:</strong> {order.orderStatus}</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
