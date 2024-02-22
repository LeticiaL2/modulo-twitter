import Login from "../Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./style.module.scss";
import Home from "../Home";

function App() {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
