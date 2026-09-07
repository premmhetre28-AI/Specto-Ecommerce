"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSupplier } from "@/app/redux/slices/productSlice";

const Suppliermodal = ({ setupdateData,updateData, setModal }) => {
    const dispatch = useDispatch();

    const [supplier, setSupplier] = useState({
        name: updateData.name,
        productName: updateData.productName,
        totalAmount: updateData.totalAmount, 
        paidAmount: updateData.paidAmount,
        company: updateData.company,
        email: updateData.email,
        phone: updateData.phone,
        address: updateData.address,
    });

    const dueAmount =
        Number(supplier.totalAmount || 0) -
        Number(supplier.paidAmount || 0);

    const paymentStatus =
        Number(supplier.paidAmount) === 0
            ? "Pending"
            : Number(supplier.paidAmount) >= Number(supplier.totalAmount)
                ? "Paid"
                : "Partial";

    const saveSupplier = async () => {
        const payload = {
            ...supplier,
            dueAmount,
            paymentStatus,
        };
        const result = await dispatch(updateSupplier({id:updateData._id,payload}));

        if (result.payload.success) {
            alert(result.payload.message);
            setModal(false);
        }
        else{
            alert(`${payload.productName} Supplier is not found`)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4">

            <div className="bg-slate-800 w-full max-w-3xl rounded-2xl p-5 sm:p-8 shadow-2xl max-h-[95vh] overflow-y-auto">

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                    Add Supplier
                </h2>

                {/* Product + Payment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Product Name
                        </label>
                        <input
                            value={supplier.productName}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    productName: e.target.value,
                                })
                            }
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Product name"
                        />
                    </div>

                    {/* Total Amount */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Total Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={supplier.totalAmount}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    totalAmount: e.target.value,
                                })
                            }
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter total amount"
                        />
                    </div>

                    {/* Paid Amount */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Paid Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={supplier.paidAmount}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    paidAmount: e.target.value,
                                })
                            }
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter paid amount"
                        />
                    </div>
                </div>

                {/* Due Amount + Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    {/* Due Amount */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Due Amount
                        </label>
                        <input
                            value={dueAmount}
                            readOnly
                            className="w-full p-3 rounded-xl bg-slate-900 text-red-400 font-semibold outline-none"
                        />
                    </div>

                    {/* Payment Status */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Payment Status
                        </label>
                        <input
                            value={paymentStatus}
                            readOnly
                            className="w-full p-3 rounded-xl bg-slate-900 text-green-400 font-semibold outline-none"
                        />
                    </div>

                </div>

                {/* Supplier Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Supplier Name */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Supplier Name
                        </label>
                        <input
                            value={supplier.name}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Enter supplier name"
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Company Name
                        </label>
                        <input
                            value={supplier.company}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    company: e.target.value,
                                })
                            }
                            placeholder="Company name"
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={supplier.email}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    email: e.target.value,
                                })
                            }
                            placeholder="supplier@email.com"
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            value={supplier.phone}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="Phone number"
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm text-slate-300 mb-2">
                            Address
                        </label>
                        <textarea
                            rows={4}
                            value={supplier.address}
                            onChange={(e) =>
                                setSupplier({
                                    ...supplier,
                                    address: e.target.value,
                                })
                            }
                            placeholder="Enter supplier address"
                            className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-8">

                    {/* Cancel */}
                    <button
                        onClick={() => setModal(false)}
                        className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition text-white font-medium"
                    >
                        Cancel
                    </button>

                    {/* Pay Full
                    <button
                        onClick={payFullAmount}
                        className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-medium"
                    >
                        Pay Full
                    </button> */}

                    {/* Save */}
                    <button
                        onClick={saveSupplier}
                        className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-medium"
                    >
                        Save Supplier
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Suppliermodal;