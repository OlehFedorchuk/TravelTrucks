import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchById, fetchCars } from "./carsOps";

export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;

const initialState = {
  data: {
    items: [],
    selectedCar: null,
  },
  loading: false,
  error: null,
};
const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.selectedCar = action.payload;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
const selecrCarsData = (state) => state.cars.data;
export const selectItemsArray = createSelector(
  [selecrCarsData],
  (data) => data.items.items ?? [],
);

export const carsReducer = carsSlice.reducer;
