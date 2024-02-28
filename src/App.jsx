import "./App.css";
import AppRoutes from "./AppRoutes";
import SnackBarComponent from "./components/atoms/snackbar/snackbar";
import { useSelector } from "react-redux";
import LanguageProvider from "./contexts/languageContext";

function App() {
  const { open, message } = useSelector((state) => state.snackbar);

  return (
    <div className="App">
      <LanguageProvider>
        <AppRoutes />
        <SnackBarComponent open={open} message={message} />
      </LanguageProvider>
    </div>
  );
}

export default App;
