import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useRecoilValue} from "recoil";
import {authState} from "../../../state";

export default function AuthorizedRoute({
  id,
  path,
  exact,
  strict,
  isPublic,
  children,
  ...rest
}) {
  const auth = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      key={id}
      path={path}
      exact={exact}
      strict={strict}
      render={({ location }) =>
        isPublic || !!auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
