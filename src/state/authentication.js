import React from 'react';
import {useSessionStorage} from 'react-use';

const initialValues = Object.freeze({
  isAuthenticated: false,
  principal: null,
});

export const AuthenticationContext = React.createContext(initialValues);

export function AuthenticationProvider({children}) {
  const [authentication, setAuthentication] = useSessionStorage('authentication', initialValues);

  const values = {...authentication, login, logout};

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );

  function login (principal) {
    return setAuthentication({isAuthenticated: true, principal});
  }
  function logout () {
    setAuthentication(initialValues);
  }
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
