import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const App = ({ initialState }) => (
  <Switch>
    {routes.map(({ path, exact, component: Component }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => (
            <Component
              initialState={initialState[props.location.pathname]}
              {...props}
            />
          )}
        />
    ))}
  </Switch>
);

export default App;
