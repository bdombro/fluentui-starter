import React from 'react';
import {merge} from 'lodash-es';
import {useSessionStorage} from 'react-use';

const initialValue = Object.freeze({
  collapsed: window.innerWidth < 800
});

export const NavContext = React.createContext(initialValue);

export function NavProvider({children}) {
  const [nav, setNav] = useSessionStorage('nav', initialValue);

  return (
    <NavContext.Provider value={{...nav, patch, toggle}}>
      {children}
    </NavContext.Provider>
  );

  function patch(next) {
    setNav(merge(nav, next));
  }
  function toggle() {
    setNav({...nav, collapsed: !nav.collapsed});
  }
}

export function useNav() {
  return React.useContext(NavContext);
}
