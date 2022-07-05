import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------




const slice = createSlice({
    name: 'balance',
    initialState:{
        balance:0
    },
    reducers: {
        // START LOADING
        setBalance: (state,action) => {
            state.balance = action.payload
        }
      
    },
});

// Reducer
export default slice.reducer;

export function SETBALANCE(bal) {
    return async () => {
        dispatch(slice.actions.setBalance(bal));
    }
}

// Actions
export const { setBalance} = slice.actions;




