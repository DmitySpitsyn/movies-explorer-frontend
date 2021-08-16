import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AutorizationRoute = ({ component: Component, ...props }) => {

  return (
          <Route>
              { 
                  () => props.isLoggedIn ? <Redirect to="/" /> : <Component {...props} /> 
              }
          </Route>
  );
}; 

export default AutorizationRoute;