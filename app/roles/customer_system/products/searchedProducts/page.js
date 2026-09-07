"use client";

import { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchSearchProducts } from "@/app/redux/slices/customerSlice";
import Product_card from "@/app/roles/customer_system/components/Product_card";

function SearchedProducts() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const query = searchParams.get("query");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!query) {
            setProducts([]);
            return;
        }

        async function fetchProduct() {
            try {
                const res = await dispatch(fetchSearchProducts(query));

                if (res.payload) {
                    setProducts(res.payload);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            }
        }

        fetchProduct();
    }, [query, dispatch]);

    return (
        <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-10">

            {/* Heading */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    All Your Searched Products
                </h1>

                <p className="text-gray-500 mt-3">
                    Explore our latest premium collections
                </p>
            </div>

            {/* Products */}
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-700">
                        No Products Available
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Products will appear here soon.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Product_card
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    Loading...
                </div>
            }
        >
            <SearchedProducts />
        </Suspense>
    );
}