// Actions
const OPEN_SNACKBAR = "snackbar/OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "snackbar/CLOSE_SNACKBAR";

// Action Creators
export const openSnackbar = (message, type) => ({
  type: OPEN_SNACKBAR,
  payload: { message, type },
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

// Reducer
const initialState = {
  open: false,
  message: "",
};

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.payload.message,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}
