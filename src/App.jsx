import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import SnackBarComponent from "./components/atoms/snackbar/snackbar";
import { useSelector } from "react-redux";
import LanguageProvider from "./contexts/languageContext";
import { AuthProvider } from "./contexts/auth";

function App() {
  const { open, message } = useSelector((state) => state.snackbar);

  return (
    <AuthProvider>
      <LanguageProvider>
        <AppRoutes />

        <SnackBarComponent open={open} message={message} />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
