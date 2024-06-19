import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from "./components/Home";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./context-api/auth";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const routesArray = [
    {
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "*",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ];
  const browserRouter = createBrowserRouter(routesArray);
  return (
    <AuthProvider>
      <RouterProvider router={browserRouter}>
        <Header />
        <Outlet />
      </RouterProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;