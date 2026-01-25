import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: " ",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});

export const filtersReducer = filtersSlice.reducer;
