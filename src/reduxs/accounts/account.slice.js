import {createSlice } from "@reduxjs/toolkit";
import local from "../../utils/localStorage";
import localStorage from "../../utils/localStorage";


const initialState={
    profile : localStorage.get("profile") ? localStorage.get("profile") : "",
    roles: [],
    userModeView:"User",
    webSocketService:null,
    
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
        },
        setWebSocketService:(state,action) =>{
            state.webSocketService = action.payload;
        }
    }
})

export const {getProfile, setWeb3Provider, setRoles, setUserModeView, setWebSocketService} =accountSlice.actions;
export default accountSlice.reducer;