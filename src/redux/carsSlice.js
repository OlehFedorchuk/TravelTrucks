import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchById } from "./carsOps";

const emptyFilters = () => ({
  location: "",
  bodyType: null,
  equipment: {
    AC: false,
    Automatic: false,
    Kitchen: false,
    TV: false,
    Bathroom: false,
  },
});

const initialState = {
  data: {
    items: [],
    total: 0,
    selectedCar: null,
  },
  page: 1,
  limit: 4,
  hasMore: true,
  loading: false,
  error: null,
  appliedFilters: emptyFilters(),
  isApplied: false,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    applyFilters(state, action) {
      state.appliedFilters = structuredClone(action.payload);
      state.isApplied = true;
      state.data.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    clearAppliedFilters(state) {
      state.appliedFilters = emptyFilters();
      state.isApplied = false;
      state.data.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetCars(state) {
      state.data.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        const { items, total, page, limit } = action.payload;
        const safeItems = Array.isArray(items) ? items : [];

        if (page === 1) state.data.items = safeItems;
        else state.data.items.push(...safeItems);

        state.data.total = typeof total === "number" ? total : 0;
        state.page = page;
        state.limit = limit;
        state.hasMore = state.data.items.length < state.data.total;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error";
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
        state.error = action.payload || action.error?.message || "Error";
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const { applyFilters, clearAppliedFilters, resetCars } = carsSlice.actions;

export const selectAppliedFilters = (state) => state.cars.appliedFilters;
export const selectIsApplied = (state) => state.cars.isApplied;

export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;

export const selectCarsPage = (state) => state.cars.page;
export const selectCarsLimit = (state) => state.cars.limit;
export const selectCarsHasMore = (state) => state.cars.hasMore;

export const selectCarsItems = (state) => {
  const items = state.cars?.data?.items;
  return Array.isArray(items) ? items : [];
};

export default carsReducer;

