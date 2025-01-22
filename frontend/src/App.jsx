import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import EcoScore from "./Pages/EcoScore";
function App() {
  const router = createHashRouter([
    // {
    //   path: "/",
    //   element: <LoginPage />,
    // },
    {
      path: "/",
      element: <EcoScore />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
