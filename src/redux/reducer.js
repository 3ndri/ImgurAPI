import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    getPhoto(state, action) {
      state.image = action.payload;
    },
    removePhoto(state) {
      state.image = null;
    },
  },
});

export const selectPhoto = (state) => state.photo.image;
export const { getPhoto, removePhoto } = photoSlice.actions;
export default photoSlice.reducer;
