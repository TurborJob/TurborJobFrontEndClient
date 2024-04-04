import {createSlice } from "@reduxjs/toolkit";


const initialState={}

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        setWeb3Provider:(state,action) =>{
            state.wed3Provider = action.payload;
        },
        setWalletInfo:(state,action) =>{
            state.wallet = action.payload;
        }
    }
})

export const {setWalletInfo, setWeb3Provider} =accountSlice.actions;
export default accountSlice.reducer;