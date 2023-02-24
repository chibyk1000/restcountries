import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface CountryState {
  data: any[] ;
  loading: boolean;
  error: boolean
}

const initialState: CountryState = {
  data: [],
  loading: true,
  error: false
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Array<object>>) => {
      
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => { 
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => { 
      state.error = action.payload;
    }

  }
});

export const { setData, setError,setLoading } = countrySlice.actions;

export default countrySlice.reducer;
