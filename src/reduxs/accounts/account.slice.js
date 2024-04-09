import {createSlice } from "@reduxjs/toolkit";
import local from "../../utils/localStorage";


const initialState={
    profile : null
}

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        getProfile:(state,action) =>{
            state.profile = local.get("profile");
        },
        setWalletInfo:(state,action) =>{
            state.wallet = action.payload;
        }
    }
})

export const {getProfile, setWeb3Provider} =accountSlice.actions;
export default accountSlice.reducer;