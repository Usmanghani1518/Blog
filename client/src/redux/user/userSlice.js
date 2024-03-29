import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.error = null;
            state.loading = true
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        updateSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.currentUser = action.payload
        },
        deleteUserStart:(state)=>{
            state.loading= false;
            state.error= null
        },
        deleteUserFailure:(state,action)=>{
            state.loading= false;
            state.error= action.payload;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        signOutSuccessfully:(state)=>{
            state.currentUser= null;
            state.error= null;
            state.loading=false;
        },
        signOutFailure:(state,action)=>{
            state.loading=false
            state.error = action.payload

        }
    }
});

export const { signinStart, signinSuccess, signinFailure, updateFailure, updateStart, updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSuccessfully,signOutFailure } = userSlice.actions;

export default userSlice.reducer;
