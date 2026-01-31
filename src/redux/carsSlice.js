
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchById, fetchCars } from "./carsOps";
import { selectLocationFilter, selectBodyType, selectEquipmentFilters } from "./filtersSlice";

const initialState = {
  data: {
    items: [],
    total: 0,
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

        const payload = action.payload;

        if (Array.isArray(payload)) {
          state.data.items = payload;
          state.data.total = payload.length;
          return;
        }

        if (payload && Array.isArray(payload.items)) {
          state.data.items = payload.items;
          state.data.total = payload.total ?? payload.items.length;
          return;
        }

        state.data.items = [];
        state.data.total = 0;
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

export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;

export const selectItemsArray = (state) => {
  const items = state.cars?.data?.items;
  return Array.isArray(items) ? items : [];
};

export const selectVisibleCars = createSelector(
  [selectItemsArray, selectLocationFilter, selectBodyType, selectEquipmentFilters],
  (items, location, bodyType, equipment) => {
    const q = location.trim().toLowerCase();

    return items.filter((item) => {
      const okLocation = !q
        ? true
        : (item.location || "").toLowerCase().includes(q);

      const okBodyType = !bodyType
        ? true
        : normalizeType(item.type) === normalizeType(bodyType);

      const activeEq = Object.keys(equipment).filter((k) => equipment[k]);
      const okEquipment =
        activeEq.length === 0 ? true : activeEq.every((k) => matchEquipment(item, k));

      return okLocation && okBodyType && okEquipment;
    });
  }
);

function normalizeType(t) {
  return String(t || "")
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("_", "");
}

function matchEquipment(item, key) {
  switch (key) {
    case "AC":
      return Boolean(item.AC ?? item.ac);
    case "Kitchen":
      return Boolean(item.kitchen);
    case "TV":
      return Boolean(item.TV ?? item.tv);
    case "Bathroom":
      return Boolean(item.bathroom);
    case "Automatic":
      return String(item.transmission || "").toLowerCase() === "automatic";
    default:
      return true;
  }
}
