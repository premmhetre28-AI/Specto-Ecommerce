import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= CREATE CART ================= */
export const createCart = createAsyncThunk(
  "Cart/createCart",
  async (productId, thunkAPI) => {
    const response = await fetch("/api/customer/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
    const data = await response.json()
    if (data.success) {
      return data
    }
    else {
     alert(data.message);
    }
  }
)

/* ================= FETCH CART ================= */
export const fetchCart = createAsyncThunk(
  "Cart/fetchCart",
  async (_, thunkAPI) => {
    const response = await fetch("/api/customer/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log("FETCH CART DATA:", data.cart)
    if (data.success) {
      return data

    }
    else {
      alert(data.message)
    }
  }
)


/* ================= DELETE CART ================= */
export const deleteCart = createAsyncThunk(
  "Cart/deleteCart",
  async (productId, thunkAPI) => {
    const response = await fetch("/api/customer/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
    const data = await response.json()
    if (data.success) {
      return data
    }
    else {
      alert(data.message)
    }
  }
)
const initialItems=[]
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems,
    quantity: initialItems.length
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        state.items.push(action.payload.product)
        state.quantity=state.items.length
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.quantity = action.payload.cart.length;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item)=>{
          return item._id!==action.payload.productId
        });
        state.quantity=state.items.length
      })
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;