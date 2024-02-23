import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./ducks/snackbar";
import themeReducer from "./ducks/theme";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    theme: themeReducer,
  },
});

export default store;
