import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./carsSlice";
import { filtersReducer } from "./filtersSlice";
import { listSelectedReducer } from "./listSelectedSlice";
import tabReducer from "./tabSlice";
import { favoritesReducer } from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    listSelected: listSelectedReducer,
    tab: tabReducer,
    favorites: favoritesReducer,
  },
});
