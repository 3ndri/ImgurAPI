import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./reducer";

export const store = configureStore({
  reducer: {
    photo: photoReducer,
  },
});
