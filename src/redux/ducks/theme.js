//Actions
const TOGGLE_THEME = "TOGGLE_THEME";

//Actions Creators
export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

//Reducer
const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      const isDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", isDarkMode);
      return {
        ...state,
        darkMode: isDarkMode,
      };
    default:
      return state;
  }
}
