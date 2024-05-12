{/*import Login from "./components/auth/Register";
import MainSellerPage from "../src/components/Roles/Seller/MainSellerPage";
import PageNotFound from "./components/PageNotFound";
import TestRoute from "./testRoute.jsx";
*/}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../src/components/auth/Register";
import React, { useState, useEffect } from "react";
import MainBuyerPage from "../src/components/Roles/Buyer/MainBuyerPage";
import MainSellerPage from "../src/components/Roles/Seller/MainSellerPage.jsx"

import supabase from "./config/supabaseClient.js";
import ProtectedRoute from "./components/auth/PrivateRoute.jsx";
import ReactDOM from "react-dom/client";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState({});

  useEffect(() => {
    // Check if user is authenticated when component mounts
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Get current user session from Supabase
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user session:", error.message);
        setIsAuthenticated(false); 
      } else {
        console.log("User session before:", user?.aud);
        setIsAuthenticated(user);
        console.log("User session after", user?.aud);
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated); // This will log the updated isAuthenticated value
  }, [isAuthenticated]);
  
  {/*
  const handleLogout = async () => {
    // Sign out user using Supabase
    await supabase.auth.signOut();

    // Update authentication state
    setIsAuthenticated(false);
  };
*/}
  // Define your routes outside the return statement
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/buyer",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} component={MainBuyerPage} />,
                
    },
    {
      path: "/seller",
      element: <MainSellerPage />,
    }
  ]);

  // Render the app using RouterProvider
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;


