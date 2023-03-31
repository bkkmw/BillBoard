import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Gameroom from "../components/gameroom/Gameroom";
import Landding from "../components/landding/Landding";
import Login from "../components/login/LoginPage";
import Singup from "../components/login/SingupPage";
import Main from "../components/mainPage/MainPage";
import Profile from "../components/profile/ProfilePage";
import Reserve from "../components/reserve/Reserve";
import ReserveFind from "../components/reserve/ReserveFind";
import IdFindPage from "../components/login/IdFindPage";
import PswdFindPage from "../components/login/PswdFindPage";
import FindResult from "../components/login/FindResultPage";
import Room from "../components/reserve/Room";
import DetailPage from "../components/detail/DetailPage"
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
        path: "profile/:userId",
        element: <Profile />,
        children: [{}],
        id: "profile",
        loader: async ({ params }) => {
          return params.userId;
        }
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
        path: "room/:roomId",
        element: <Room />,
        id: "room",
        children: [{}],
        loader: async ({ params }) => {
          return params.roomId;
        }
      },
      {
        path: "detail/:gameId",
        element: <DetailPage/>,
        id: "detail",
        children: [{}],
        loader: async ({ params }) => {
          return params.gameId;
        }
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
      {
        path: "IdFindPage",
        element: <IdFindPage />,
        children: [{}],
      },
      {
        path: "PswdFindPage",
        element: <PswdFindPage />,
        children: [{}],
      },
      {
        path: "FindResult",
        element: <FindResult />,
        children: [{}],
      },
    ],
  },
]);

export default router;
