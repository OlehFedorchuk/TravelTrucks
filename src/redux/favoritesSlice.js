import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "traveltrucks:favorites";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const save = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
};

const initialState = {
  ids: load(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      const exists = state.ids.includes(id);

      if (exists) state.ids = state.ids.filter((x) => x !== id);
      else state.ids.push(id);

      save(state.ids);
    },
    removeFavorite(state, action) {
      const id = String(action.payload);
      state.ids = state.ids.filter((x) => x !== id);
      save(state.ids);
    },
    clearFavorites(state) {
      state.ids = [];
      save(state.ids);
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectIsFavoriteById = (id) => (state) =>
  state.favorites.ids.includes(String(id));

export default favoritesReducer;
