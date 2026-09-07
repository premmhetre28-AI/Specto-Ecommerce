"use client"
import { React, useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "@/app/redux/slices/productSlice";
import Modal from '@/app/roles/vendor_system/components/modal';
import StockInModal from '@/app/roles/vendor_system/dashboard/components/StockInModal';
import StockOutModal from '@/app/roles/vendor_system/dashboard/components/StockOutModal';
import SidebarButton from '../components/SidebarButton';

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [inModal, setInModal] = useState(false);
  const [outModal, setOutModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [editStock, setEditStock] = useState({});

  const dispatch = useDispatch();
  const { products } = useSelector(
    (state) => state.product
  );
  
  const updateproduct = (item) => {
    setShowModal(true)
    setEditProduct(item)
  }

  const deleteproduct = async (id, user) => {
    dispatch(deleteProduct({ id, user }))
  }

  const stockIn = (id) => {
    setInModal(true)
    setEditStock(id)
  }
  
  const stockOut = (id) => {
    setOutModal(true)
    setEditStock(id)
  }
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <div>
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
          <div className="flex min-h-screen">

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-10 min-w-0">

              {/* Header - Forced into a single row on mobile with truncation */}
              <div className='mb-8 sm:mb-12 flex items-center gap-2 sm:gap-4 pt-2 lg:pt-0 w-full'>
                <div className="flex-shrink-0 -ml-2">
                  <SidebarButton />
                </div>
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide truncate">
                    Inventory <span className="text-purple-400">Movement</span>
                  </h1>
                  <p className="text-gray-400 mt-1 sm:mt-2 text-[11px] sm:text-sm lg:text-base truncate">
                    Track product stock, monitor sales activity, analyze inventory movement, and manage updates in real time.
                  </p>
                </div>
              </div>

              {/* Products Grid */}
              {products.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">No products added</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">

                  {products.map((item) => (
                    <div
                      key={item._id}
                      className="bg-slate-800 rounded-xl p-4 shadow-md 
                                 hover:scale-105 transition-transform duration-300
                                 min-h-[280px] h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Product Image */}
                        <div className="h-24 sm:h-20 bg-slate-700 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 overflow-hidden">
                          <img
                            src={
                              item.image
                                ? item.image
                                : "https://tse1.mm.bing.net/th/id/OIP._YbO1chgv3Q6aeNa19RgAwHaHa?pid=Api&P=0&h=180"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 title={item.name} className="text-sm sm:text-base font-bold text-white mb-1 truncate cursor-pointer">
                            {item.name}
                          </h3>

                          <p className="text-gray-300 text-xs mb-2 truncate">
                            {item.category}
                          </p>

                          <p className="text-green-400 text-xs sm:text-sm font-semibold mb-1 truncate">
                            Selling Price: ₹ {item.selling_price}
                          </p>

                          <p
                            className={`text-xs sm:text-sm font-medium ${item.stock > 0 ? "text-blue-400" : "text-red-400"}`}
                          >
                            Stock: {item.stock}
                          </p>
                        </div>
                      </div>

                      {/* Buttons Area */}
                      <div className="mt-4 space-y-2.5">

                        {/* Stock Actions */}
                        <div className="grid grid-cols-2 gap-2">

                          {/* Stock In */}
                          <button
                            onClick={() => stockIn(item._id)}
                            className="flex items-center justify-center gap-1 sm:gap-2
                                       py-2 sm:py-2.5 rounded-lg
                                       bg-gradient-to-r from-green-500 to-emerald-600
                                       hover:scale-105 hover:shadow-lg
                                       transition-all duration-200
                                       text-white text-xs sm:text-sm font-semibold shadow-md"
                          >
                            <span>⬆</span>
                            <span>Stock In</span>
                          </button>

                          {/* Stock Out */}
                          <button
                            onClick={() => stockOut(item._id)}
                            className="flex items-center justify-center gap-1 sm:gap-2
                                       py-2 sm:py-2.5 rounded-lg
                                       bg-gradient-to-r from-red-500 to-rose-600
                                       hover:scale-105 hover:shadow-lg
                                       transition-all duration-200
                                       text-white text-xs sm:text-sm font-semibold shadow-md"
                          >
                            <span>⬇</span>
                            <span>Stock Out</span>
                          </button>

                        </div>

                        {/* Edit + Delete Actions */}
                        <div className="flex gap-2">

                          <button
                            onClick={() => updateproduct(item)}
                            className="flex-1 flex items-center justify-center
                                       py-2.5 rounded-lg
                                       bg-amber-500 hover:bg-amber-600
                                       transition-all duration-200
                                       hover:scale-105 shadow-md"
                          >
                            <FaEdit className="text-black text-sm sm:text-base" />
                          </button>

                          <button
                            onClick={() => deleteproduct(item._id, item.user)}
                            className="flex-1 flex items-center justify-center
                                       py-2.5 rounded-lg
                                       bg-red-700 hover:bg-red-800
                                       transition-all duration-200
                                       hover:scale-105 shadow-md"
                          >
                            <MdDelete className="text-white text-sm sm:text-base" />
                          </button>

                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
      
      {showModal && (
        <Modal editProduct={editProduct} setEditProduct={setEditProduct} setShowModal={setShowModal} />
      )}
      {inModal && (
        <StockInModal editStock={editStock} setEditStock={setEditStock} setInModal={setInModal} />
      )}
      {outModal && (
        <StockOutModal editStock={editStock} setEditStock={setEditStock} setOutModal={setOutModal} />
      )}

    </>
  )
}

export default page