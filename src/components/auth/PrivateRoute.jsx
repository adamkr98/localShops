import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAuthenticated, component: Component, logOutUser, ...rest }) => {
  return isAuthenticated ? (
    <Component logOutUser={logOutUser} {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // User object from supabase
  component: PropTypes.elementType.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

export default PrivateRoute;









{/*
const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export default ProtectedRoute;
*/}

// ProtectedRoute.jsx




{/*
import React from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, isAuthenticated, handleLogout, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={<Component handleLogout={handleLogout} />} />
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default PrivateRoute;
*/}