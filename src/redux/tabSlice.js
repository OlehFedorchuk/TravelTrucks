import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: "features",
  reducers: {
    setTab: (state, action) => action.payload,
  },
});

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;
