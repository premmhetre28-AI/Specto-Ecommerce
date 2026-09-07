import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= FETCH ALL PRODUCTS================= */
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getProduct", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH WOMEN PRODUCTS================= */
export const fetchWomenProducts = createAsyncThunk(
    "product/fetchWomenProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getWomen", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH MEN PRODUCTS================= */
export const fetchMenProducts = createAsyncThunk(
    "product/fetchMenProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getMen", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH HEADPHONES PRODUCTS================= */
export const fetcHeadphonesProducts = createAsyncThunk(
    "product/fetcHeadphonesProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getHeadphones", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH LAPTOP PRODUCTS================= */
export const fetchLaptopProducts = createAsyncThunk(
    "product/fetchLaptopProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getLaptop", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH SMARTPHONES PRODUCTS================= */
export const fetchSmartphones = createAsyncThunk(
    "product/fetchSmartphones",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getSmartphones", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH WATCH PRODUCTS================= */
export const fetchWatchProducts = createAsyncThunk(
    "product/fetchWatchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getWatch", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH SEARCH PRODUCTS================= */
export const fetchSearchProducts = createAsyncThunk(
    "product/fetchSearchProducts",
    async (query, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/getSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.message);
            }
            return data.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH TRENDING PRODUCTS================= */
export const fetchTrendingProducts = createAsyncThunk(
    "product/fetchTrendingProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/trendingProduct", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.message);
            }
            return data.product;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH ORDERS FOR VENDOR ================= */
export const fetchOrders = createAsyncThunk(
    "product/fetchOrders",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/orderVendor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.message);
            }
            return data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= FETCH ORDERS FOR CUSTOMER ================= */
export const getOrders = createAsyncThunk(
    "product/getOrders",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/orderCustomer", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.message);
            }
            
            return data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= DELETE ORDERS FROM CUSTOMER ================= */
export const deleteOrder = createAsyncThunk(
    "customer/deleteOrder",
    async (order, thunkAPI) => {
        console.log("Deleting order:", order);
        try {
            const response = await fetch("/api/customer/orderVendor", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


/* ================= UPDATE ORDERS for CUSTOMER ND VENDOR ================= */
export const updateOrder = createAsyncThunk(
    "customer/updateOrder",
    async (order, thunkAPI) => {
        try {
            const response = await fetch("/api/customer/orderVendor/orderStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({order}),
            });
            const data = await response.json();
            if(data.success){
                alert(data.message)
            }
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
const customerSlice = createSlice({
    name: "customerProduct",

    initialState: {
        products: [],
        womenProducts: [],
        menProducts: [],
        headphoneProducts: [],
        watchProducts: [],
        laptopProducts: [],
        smartphoneProducts: [],
        orders: [],
        vendorOrders:[]
    },

    reducers: {},
    extraReducers: (builder) => {
        builder

            /* FETCH */
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })

            /* FETCH WOMEN PRODUCTS */
            .addCase(fetchWomenProducts.fulfilled, (state, action) => {
                state.womenProducts = action.payload;
            })

            /* FETCH MEN PRODUCTS */
            .addCase(fetchMenProducts.fulfilled, (state, action) => {
                state.menProducts = action.payload;
            })

            /* FETCH HEADPHONES PRODUCTS */
            .addCase(fetcHeadphonesProducts.fulfilled, (state, action) => {
                state.headphoneProducts = action.payload;
            })

            /* FETCH WATCH PRODUCTS */
            .addCase(fetchWatchProducts.fulfilled, (state, action) => {
                state.watchProducts = action.payload;
            })

            /* FETCH LAPTOP PRODUCTS */
            .addCase(fetchLaptopProducts.fulfilled, (state, action) => {
                state.laptopProducts = action.payload;
            })

            /* FETCH SMARTPHONES PRODUCTS */
            .addCase(fetchSmartphones.fulfilled, (state, action) => {
                state.smartphoneProducts = action.payload;
            })

            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            // vendor Orders
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.vendorOrders = action.payload;
            })

            // vendor UPADATE Orders
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.vendorOrders = state.vendorOrders.map((item)=>
                    item._id===action.payload.newOrder._id ? action.payload.newOrder : item
                );
            })
    }
})
export default customerSlice.reducer