'use client';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Support = () => {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            orderId: "",
            customerName: "",
            customerEmail: "",
            customerMessage: ""
        }
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            const response = await axios.post("/api/customerSupport", data);
            if (response.data.success) {
                toast("Message Sent Successfully");
                reset();
            }
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Message Not Sent");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-3/5 mx-auto mt-20">
            <div>
                <h1 className="font-medium md:text-2xl sm:text-3xl text-xl text-center mt-5">CONTACT US</h1>
                {/* <p className="font-medium md:text-xl sm:text-md text-center mt-4">Instructions</p> */}
            </div>
            <div className="lg:w-3/5 mx-auto border-gray-900/10 pb-12">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="orderId"
                                    placeholder="Order Id"
                                    {...register("orderId", { required: "Name is required" })}
                                    className="block w-full rounded-xl border-0 py-1.5 px-4 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black sm:text-sm sm:leading-6"
                                />
                                {errors.orderId && <p className="text-xs text-red-400">{errors.orderId.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="customerName"
                                    placeholder="Name"
                                    {...register("customerName", { required: "Email is required" })}
                                    className="block w-full rounded-xl border-0 py-1.5 px-4 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black sm:text-sm sm:leading-6"
                                />
                                {errors.customerName && <p className="text-xs text-red-400">{errors.customerName.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <input
                                    type="email"
                                    id="customerEmail"
                                    placeholder="Email"
                                    {...register("customerEmail", { required: "Phone number is required" })}
                                    className="block w-full rounded-xl border-0 py-1.5 px-4 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black sm:text-sm sm:leading-6"
                                />
                                {errors.customerEmail && <p className="text-xs text-red-400">{errors.customerEmail.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <textarea
                                    id="customerMessage"
                                    rows="8"
                                    placeholder="Type your message and number here"
                                    {...register("customerMessage", { required: "Issue description is required" })}
                                    className="block p-2.5 w-full text-sm rounded-lg border border-black text-black ring-black placeholder:text-black"
                                ></textarea>
                                {errors.customerMessage && <p className="text-xs text-red-400">{errors.customerMessage.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-center mt-6 mb-8">
                        <button
                            disabled={submitting}
                            type="submit"
                            className="block p-2.5 w-full text-sm rounded-lg border border-black text-black ring-black placeholder:text-black hover:bg-black hover:text-white"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Support;
