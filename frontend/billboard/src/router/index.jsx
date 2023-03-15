import { createBrowserRouter } from "react-router-dom";
import Main from '../pages/main/Main'
import Profile from "../pages/profile/Profile";
const router = createBrowserRouter([
  {
    path:"/",
    element: <Main/>,
    children: [
      {

      }
    ]
  },
  {
    path:"profile",
    element: <Profile/>,
    children: [
      {

      }
    ]
  }
]);

export default router;