import { createBrowserRouter } from "react-router-dom";
import Main from "../components/main/Main";
import Profile from "../components/profile/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{}],
  },
  {
    path: "profile",
    element: <Profile />,
    children: [{}],
  },
]);

export default router;
