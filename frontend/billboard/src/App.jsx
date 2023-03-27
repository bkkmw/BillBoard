import "./App.css";
import { Outlet } from "react-router";

import Navbar from "./components/navbar/Navbar";

function App() {
  // // 로그인 페이지에서는 내브바 안보이게
  // function excludeHeader() {
  //   if (location.pathname.startsWith("/login")) return true;
  //   else return false;
  // }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
