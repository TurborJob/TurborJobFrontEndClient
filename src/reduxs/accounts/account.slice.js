import {createSlice } from "@reduxjs/toolkit";
import local from "../../utils/localStorage";


const initialState={
    profile : null,
    roles: [],
    userModeView:"User"
}

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        getProfile:(state,action) =>{
            state.profile = local.get("profile");
        },
        setRoles:(state,action) =>{
            state.roles = action.payload;
        },
        setUserModeView: (state, action) => {
            state.userModeView = action.payload;
        },
        setWalletInfo:(state,action) =>{
            state.wallet = action.payload;
        }
    }
})

export const {getProfile, setWeb3Provider, setRoles, setUserModeView} =accountSlice.actions;
export default accountSlice.reducer;