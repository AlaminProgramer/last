import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import currentUser from './currentUser';
const userRole=currentUser();
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
      render={props =>
        userRole === 'admin'|| userRole === 'mentor' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  export default PrivateRoute;