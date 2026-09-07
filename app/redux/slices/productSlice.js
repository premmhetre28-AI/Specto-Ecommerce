import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= FETCH ================= */
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/addproduct", {
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

/* ================= ADD PRODUCT ================= */
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (product, thunkAPI) => {
        const response = await fetch("/api/addproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
        const data = await response.json()
        if (data.success) {
            return { product: data.product, message: data.message }
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= ADD SUPPLIER ================= */
export const addSupplier = createAsyncThunk(
    "product/addSupplier",
    async (supplier, thunkAPI) => {
        const response = await fetch("/api/addSupplier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(supplier),
        })
        const data = await response.json()
        if (data.success) {
            return {success:true, suppliers: data.suppliers, message: data.message }
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= GET ALL SUPPLIER ================= */
export const getSupplier = createAsyncThunk(
    "product/getSupplier",
    async (_, thunkAPI) => {
        const response = await fetch("/api/addSupplier", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },   
        })
        const data = await response.json()
        if (data.success) {
            return {success:true, suppliers: data.suppliers, message: data.message }
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async ({ id, user }, thunkAPI) => {
        const response = await fetch('/api/addproduct', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, user })
        })
        const data = await response.json()
        if (data.success) {
            return id;
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (updatedData, thunkAPI) => {
        const response = await fetch("/api/addproduct", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: updatedData._id, ...updatedData })
        })

        const data = await response.json()
        if (data.success) {
            return { product: data.product, message: data.message };
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= SEARCH PRODUCTS ================= */
export const searchProduct = createAsyncThunk(
    "product/searchProduct",
    async (query, thunkAPI) => {
        try {
            const res = await fetch("/api/searchquery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();

            if (!data.success) {
                return [];
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* ================= SEARCH SUPPLIER================= */

export const searchSupplier = createAsyncThunk(
    "product/searchSupplier",
    async (search, thunkAPI) => {
        try {
            const res = await fetch("/api/searchSupplier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search }),
            });

            const data = await res.json();

            if (!data.success) {
                return [];
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
/* ================= DELETE SUPPLIER ================= */
export const deleteSupplier = createAsyncThunk(
    "product/deleteSupplier",
    async (id , thunkAPI) => {
        const response = await fetch('/api/addSupplier', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        const data = await response.json()
        if (data.success) {
            return {data,id};
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= UPDATE SUPPLIER ================= */
export const updateSupplier = createAsyncThunk(
    "product/updateSupplier",
    async ({id,payload}, thunkAPI) => {
        const response = await fetch("/api/addSupplier", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, ...payload})
        })

        const data = await response.json()
        if (data.success) {
            return { supplier: data.supplier, message: data.message,success:true };
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

/* ================= Alert SUPPLIER ================= */

export const alertSupplier = createAsyncThunk(
    "products/alertSupplier",
    async (_, thunk) => {
        const res = await fetch("/api/alertSupplier", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);

// Stock In
export const stockIn = createAsyncThunk(
    "products/stockIn",
    async ({ productId, quantity }, { dispatch }) => {
        const res = await fetch("/api/stockIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                editStock: productId,
                quantity,
            }),
        });

        const data = await res.json();

        // refresh products after update
        dispatch(fetchProducts());

        return data;
    }
);


// Stock Out
export const stockOut = createAsyncThunk(
    "products/stockOut",
    async ({ productId, quantity }, { dispatch }) => {
        const res = await fetch("/api/stockOut", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                editStock: productId,
                quantity,
            }),
        });

        const data = await res.json();

        // refresh list
        dispatch(fetchProducts());

        return data;
    }
);

// stockOutHistory

export const stockOutHistory = createAsyncThunk(
    "products/stockOutHistory",
    async (_, thunk) => {
        const res = await fetch("/api/stockOut", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);

export const stockInOutHistor = createAsyncThunk(
    "products/stockInOutHistory",
    async (_, thunk) => {
        const res = await fetch("/api/stockInOutHistory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);
// Top_products fetch
export const Top_Product = createAsyncThunk(
    "products/Top_Product",
    async (_, thunk) => {
        const res = await fetch("/api/top-products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);
/* ================= GET CHARAT DATA FOR TOTAL STOCK AND SALES OF PRODUCTS ================= */
export const getChart = createAsyncThunk(
    "products/getChart",
    async (filter,_thunk) => {
        console.log(filter)
        const res = await fetch(`/api/chart?type=${filter}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.success) {
            return data
        }
    }

);
// finantial_analytics
export const finantial_analytics = createAsyncThunk(
    "products/finantial_analytics",
    async (_, thunk) => {
        const res = await fetch("/api/finantial", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);
// profit-Chart
export const ProfitChart = createAsyncThunk(
    "products/ProfitChart",
    async (filter, thunk) => {
        const res = await fetch(`/api/profitChart?type=${filter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            return data
        }
    }
);

/* ================= PAYMENT ================= */
export const payment = createAsyncThunk(
    "supplier/payment",
    async(amount,thunk)=>{
        const res = await fetch('/api/payment',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                amount
            })
        })
        const data = await res.json()
        return data
    }
)

/* ================= ORDERS ================= */
export const customerPayment = createAsyncThunk(
    "supplier/customerPayment",
    async(product,thunk)=>{
        const res = await fetch('/api/customer/orderVendor',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                product
            })
        })
        const data = await res.json()
        return data
    }
)


/* ================= SLICE ================= */

const productSlice = createSlice({
    name: "product",

    initialState: {
        products: [],
        // searchProducts: [],
        supplier:[],
        chartData: [],
        stockInOutHistory: [],
        top_products: [],
        financial_analytics:[],
        profitChartData:[],
        alerts: "",
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            /* FETCH */
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            /* ADD */
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload.product);
                state.alerts = action.payload.message
            })

            /* ADD SUPPLIER */
            .addCase(addSupplier.fulfilled, (state, action) => {
                state.supplier.push(action.payload.suppliers);
                state.alerts = action.payload.message
            })

            /* FETCH SUPPLIER */
            .addCase(getSupplier.pending, (state) => {
                state.loading = true;
            })

            .addCase(getSupplier.fulfilled, (state, action) => {
                state.loading = false;
                state.supplier = action.payload.suppliers;
            })

            .addCase(getSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            /* DELETE SUPPLIER */
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.supplier = state.supplier.filter(
                    (item) => item._id !== action.payload.id
                );

            })
            /* UPDATE SUPPLIER */
            .addCase(updateSupplier.fulfilled, (state, action) => {
                const updated = action.payload.supplier;
                state.supplier = state.supplier.map((item) =>
                    item._id === updated._id
                        ? updated
                        : item
                );
            })
            /* DELETE PRODUCT */
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (item) => item._id !== action.payload
                );

            })

            /* UPDATE PRODUCT */
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updated = action.payload.product;
                state.products = state.products.map((item) =>
                    item._id === updated._id
                        ? updated
                        : item
                );
                state.alerts = action.payload.message
            })

            /* SEARCH */
            // .addCase(searchProduct.fulfilled, (state, action) => {
            //     state.searchProducts = action.payload.products;
            // })

            

            .addCase(stockIn.fulfilled, (state, action) => {
                state.alerts = action.payload.message
            })

            .addCase(stockOut.fulfilled, (state, action) => {
                state.alerts = action.payload.message
                state.stockInOutHistory = action.payload.stockOuthistory
            })

            .addCase(getChart.fulfilled, (state, action) => {
                state.chartData = action.payload.graphData
            })

            .addCase(stockInOutHistor.fulfilled, (state, action) => {
                state.stockInOutHistory = action.payload.totalinout
            })

            .addCase(Top_Product.fulfilled, (state, action) => {
                state.top_products = action.payload.top_product
            })

            .addCase(finantial_analytics.fulfilled, (state, action) => {
                state.financial_analytics = action.payload.finatial_analytics
            })

            .addCase(ProfitChart.fulfilled, (state, action) => {
                state.profitChartData = action.payload.graphDataprofit
            })
    },
});

export default productSlice.reducer;