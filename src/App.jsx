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
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Get current user session from Supabase
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user session:", error.message);
        setIsAuthenticated(false); 
      } else {
        console.log("User session before:", user?.aud);
        setIsAuthenticated(!!user);
        console.log("User session after", user?.aud);
        return user;
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
      setIsAuthenticated(false);
    } 
  };

  useEffect(() => {
    // Check if user is authenticated when component mounts
    checkAuth();
  }, []);

  useEffect(() => {
    console.log(isAuthenticated ? "Authenticated" : "Not Authenticated"); // This will log the updated isAuthenticated value
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }
  
  const logOutUser = async () => {
    try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error; // Explicitly throw the error to be caught in the catch block
        setIsAuthenticated(false); // Update the authentication state
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
  }
  // Define your routes outside the return statement
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register isAuthenticated={isAuthenticated} />,
    },
    {
      path: "/buyer",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} component={MainBuyerPage} logOutUser={logOutUser} />,
                
    },
    {
      path: "/seller",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} component={MainSellerPage} logOutUser={logOutUser} />,
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


