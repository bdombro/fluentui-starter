import React from 'react';
import {useSessionStorage} from 'react-use';

const initialValue = Object.freeze({
  collapsed: window.innerWidth < 720
});

export const NavContext = React.createContext(initialValue);

export function NavProvider({children}) {
  const [nav, setNav] = useSessionStorage('nav', initialValue);

  return (
    <NavContext.Provider value={{...nav, collapse, expand, toggle}}>
      {children}
    </NavContext.Provider>
  );

  function toggle() {
    setNav({...nav, collapsed: !nav.collapsed});
  }

  function collapse() {
    setNav({...nav, collapsed: true});
  }

  function expand() {
    setNav({...nav, collapsed: false});
  }

}

export function useNav() {
  return React.useContext(NavContext);
}
