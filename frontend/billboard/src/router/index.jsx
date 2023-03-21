import { createBrowserRouter } from "react-router-dom";
import Main from "../components/mainPage/MainPage";
import Profile from "../components/profile/Profile";
import Gameroom from "../components/gameroom/Gameroom";
import Landding from "../components/landding/Landding";
import Login from "../components/login/Login";
import Singup from "../components/login/Singup";
import Reserve from "../components/reserve/Reserve";
import ReserveFind from "../components/reserve/ReserveFind";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "landing",
        element: <Landding />,
        children: [{}],
      },
      {
        path: "main",
        element: <Main />,
        children: [{}],
      },
      {
        path: "profile",
        element: <Profile />,
        children: [{}],
      },
      {
        path: "gameroom",
        element: <Gameroom />,
        children: [{}],
      },

      {
        path: "reserve",
        element: <Reserve />,
        children: [{}],
      },
      {
        path: "reserve/find",
        element: <ReserveFind />,
        children: [{}],
      },

      {
        path: "login",
        element: <Login />,
        children: [{}],
      },
      {
        path: "singup",
        element: <Singup />,
        children: [{}],
      },
    ],
  },
]);

export default router;
