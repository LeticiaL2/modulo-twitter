import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import SnackBarComponent from "./components/atoms/snackbar/snackbar";
import { useSelector } from "react-redux";
import LanguageProvider from "./contexts/languageContext";

function App() {
  const { open, message } = useSelector((state) => state.snackbar);

  return (
    <LanguageProvider>
      <AppRoutes />
      <SnackBarComponent open={open} message={message} />
    </LanguageProvider>
  );
}

export default App;
