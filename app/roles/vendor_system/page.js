"use client"
import Modal from "./components/modal";
import { useState, useEffect } from "react";
import Products_card from "./components/Products_card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProduct, addProduct, deleteProduct, } from "@/app/redux/slices/productSlice";
import Suppliermodal from "@/app/roles/vendor_system/components/Suppliermodal"

export default function Home() {
  const [product, setProduct] = useState({ name: '', stock: '', price: '', selling_price: "", category: '',gender:'',description:"",image:""  });
  const [searchResults, setSearchResults] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [supplierModal, setSupplierModal] = useState(false);
  const [query, setQuery] = useState("")
  const [editProduct, setEditProduct] = useState({});

  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    e.preventDefault()
    const result = await dispatch(searchProduct(query))
    if (result.payload.success) {
      setSearchResults(result.payload.products)
    }
    else {
      alert("data not found")
    }
  }
  const updateproduct = (item) => {
    setShowModal(true)
    setEditProduct(item)

  }
  const deleteproduct = async (id, user) => {
    await dispatch(deleteProduct({ id, user }));
    // dispatch(fetchProducts())
  }

  const onChange = (e) => {
    setProduct({
      ...product, [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addProduct(product))
    setProduct({ name: '', stock: '', price: '', selling_price: "", category: '',gender:'',description:"",image:"" })
    alert('Product added')
  }
  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  return (
    <>
      <div className="container mx-auto p-6 ">

        {/* Make parent relative */}
        <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex mb-2 w-full items-center gap-2 rounded-full bg-slate-900 p-2 shadow-md"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users, messages..."
              className="w-full bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              🔍
            </button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className=" top-full left-0 mt-2 w-full bg-slate-800 rounded-xl shadow-lg overflow-hidden z-50">

              {searchResults.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-3 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700"
                >

                  {/* Product Info */}
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setQuery(item.name);
                      setSearchResults([]);
                    }}
                  >
                    <p className="text-white font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      ₹ {item.price} • {item.category} • Stock: {item.stock}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => updateproduct(item)}
                      className="px-3 py-2 text-sm rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        deleteproduct(item._id, item.user);
                        setSearchResults((prev) =>
                          prev.filter((p) => p._id !== item._id)
                        );
                      }}
                      className="px-3 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal editProduct={editProduct} setEditProduct={setEditProduct} showModal={showModal} setShowModal={setShowModal} />
      )}

      <form
        onSubmit={handleSubmit}
        className="w-[95%] lg:w-[80%] xl:w-[70%] mx-auto mt-6 mb-20
      bg-gray-700 text-white shadow-2xl rounded-2xl
      p-6 sm:p-8 md:p-10 lg:p-12"
      >

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-blue-400">Add</span>{" "}
            <span className="text-purple-400">Product</span>{" "}
            <span className="text-cyan-400">Stock</span>
          </h2>

          <div className="flex justify-center mt-3">
            <div className="w-32 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Product Name */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Product Name
            </label>
            <input
              name="name"
              value={product.name}
              onChange={onChange}
              placeholder="Enter product name"
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Stock Quantity
            </label>
            <input
              name="stock"
              value={product.stock}
              onChange={onChange}
              type="number"
              placeholder="Enter stock quantity"
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Price
            </label>
            <input
              name="price"
              value={product.price}
              onChange={onChange}
              type="number"
              placeholder="Enter product price"
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Selling Price
            </label>
            <input
              name="selling_price"
              value={product.selling_price}
              onChange={onChange}
              type="number"
              placeholder="Enter selling price"
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Category
            </label>

            <select
              name="category"
              value={product.category}
              onChange={onChange}
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select Category</option>
              <option value="fashion">Fashion</option>
              <option value="footwear">Footwear</option>
              <option value="electronics">Electronics</option>
              <option value="beauty">Beauty</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-3 text-lg font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={product.gender}
              onChange={onChange}
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none
            focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-lg font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={onChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-4 outline-none resize-none
            focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-lg font-medium">
              Product Image
            </label>

            <input
              type="file"
              name="image"
              onChange={onChange}
              className="w-full bg-gray-800 border border-gray-500
            rounded-xl p-3 cursor-pointer
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-blue-500 file:text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => setSupplierModal(true)}
            type="button"
            className="px-10 py-4 text-lg font-semibold
          bg-purple-500 hover:bg-purple-600
          rounded-xl transition duration-200"
          >
            Supplier
          </button>

          <button
            type="submit"
            className="px-10 py-4 text-lg font-semibold
          bg-blue-500 hover:bg-blue-600
          rounded-xl transition duration-200"
          >
            Add Product
          </button>

        </div>
      </form>
      <Products_card />
      {supplierModal &&
        (<Suppliermodal setSupplierModal={setSupplierModal} product={product} setProduct={setProduct} />)
      }

    </>
  );
}
