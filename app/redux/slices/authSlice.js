import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= CREATE USER ================= */
export const createUser = createAsyncThunk(
    "User/createUser",
    async (form, thunkAPI) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(
                data.message || "Something went wrong"
            );
        }
        if (data.success) {
            return data
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
)

/* ================= LOGIN USER ================= */
export const loginUser = createAsyncThunk(
    "User/loginUser",
    async (form, thunkAPI) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        const data = await response.json()
        return data;
    }
)

/* ================= GET USER ================= */

export const getUser = createAsyncThunk(
    "User/getUser",
    async (_, thunkAPI) => {
        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        return data;
    }
)


/* ================= SLICE ================= */
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ADD USER */
            .addCase(createUser.fulfilled, (state, action) => {
                state.user.push(action.payload.user);
            })
    }

})

export default authSlice.reducer;