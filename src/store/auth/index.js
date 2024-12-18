import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Account: {
        username: null,
        profile_pic: null,
        pub_key: null,
        priv_key: null
    }
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.Account.username = action.payload.username;
        },
        setProfilePic: (state, action) => {
            state.Account.profile_pic = action.payload.profile_pic;
        },
        set_keys: (state, action) => {
            state.Account.priv_key = action.payload.priv_key;
            state.Account.pub_key = action.payload.pub_key; 
        },
        logOut: (state) => {
            state.Account.priv_key = null;
            state.Account.pub_key = null;
            state.Account.profile_pic = null;
            state.Account.username = null;
        }
    }
});

export const { setAccount, setProfilePic, set_keys, logOut} = accountSlice.actions;

export default accountSlice.reducer;
