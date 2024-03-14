import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component key={props.location.key} {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
