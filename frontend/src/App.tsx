import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider, MenuContextProvider } from "./contexts/providers";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        ),
      },

      {
        path: "interviews",
        element: (
          <ProtectedRoute>
            <Interviews />
          </ProtectedRoute>
        ),
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      // {
      //   index: true,
      //   element: (
      //     <ProtectedRoute>
      //       <Dashboard />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <MenuContextProvider>
        <RouterProvider router={router} />
      </MenuContextProvider>
    </AuthContextProvider>
  );
}

export default App;
