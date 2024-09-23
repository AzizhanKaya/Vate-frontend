import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAccount: {
        id: 1,
        username: 'Aziz',
        avatar: 'https://pbs.twimg.com/profile_images/1637771089840422912/LES2dp5X_400x400.jpg',
        pub_key: 'WwogICAgMiwKICAgIDIuNzUsCiAgICAyLjU4NDk2MjUwMDcyMTE1Ngpd',
        priv_key: null
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.currentAccount = action.payload;
        },
        removeAccount: (state) => {
            state.currentAccount = null;
        },
        setPrivKey: (state, action) => {
            if (state.currentAccount) {
                state.currentAccount.priv_key = action.payload; 
            }
        }
    }
});


export const { setAccount, removeAccount, setPrivKey} = authSlice.actions;


export default authSlice.reducer;
