import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/Home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
