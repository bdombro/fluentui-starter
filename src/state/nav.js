import React from 'react';
import { useSessionStorage } from 'react-use';

const defaultValues = Object.freeze({
  collapsed: localStorage.getItem('NavToggler.isNavCollapsed') === 'true' || window.innerWidth < 720
});

const NAV_STOREGE_KEY = 'nav';

export const NavContext = React.createContext(defaultValues);

export function NavProvider({ children }) {
  const [nav, setNav] = useSessionStorage(
    NAV_STOREGE_KEY,
    defaultValues
  );

  function toggle () {
    localStorage.setItem('NavToggler.isNavCollapsed', nav.collapsed ? 'false' : 'true');
    setNav({...nav, collapsed: !nav.collapsed});
  }

  const values = { ...nav, toggle};

  return (
    <NavContext.Provider value={values}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return React.useContext(NavContext);
}
