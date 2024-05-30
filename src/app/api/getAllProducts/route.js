import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(req) {
    const { params } = await req.json();
    const { startDate, endDate } = params;
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate) 
                    }
                }
            }
        ]);
        // const products = await Product.find({})
        // console.log(data)
        if (!products) {
            return NextResponse.json({ message: "product doesnot found", products: [], success: false, status: 400 })
        }
        return NextResponse.json({ message: "products fetched successfully", products: products, success: true, status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false, status: 400 })
    }
}