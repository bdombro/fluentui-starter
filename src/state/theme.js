import React from 'react';
import { Fabric, Customizer } from '@fluentui/react';
import { useSessionStorage } from 'react-use';
import {DefaultCustomizations, DarkCustomizations} from '@uifabric/theme-samples';

export const ThemeNames = {
  DARK: 'dark',
  LIGHT: 'light'
}

export const ThemeList = {
  [ThemeNames.LIGHT]: DefaultCustomizations,
  [ThemeNames.DARK]: DarkCustomizations
};

const initialValue = Object.freeze({
  name: ThemeNames.DARK,
})

export const ThemeContext = React.createContext(initialValue);

export const ThemeProvider = ({ children }) => {
  const [state, setState] = useSessionStorage('theme', initialValue);

  return (
    <ThemeContext.Provider value={{...state, theme: ThemeList[state.name], patch, toggle }}>
      <ThemeContext.Consumer>
        {(theme) => (
          <Customizer {...theme.theme}>
            <Fabric>{children}</Fabric>
          </Customizer>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );

  function patch(next) {
    if (next.theme) throw new Error('Cannot set theme directly.');
    setState({...state, ...next});
  }
  function toggle() {
    setState({...state, name: state.name === ThemeNames.DARK ? ThemeNames.LIGHT : ThemeNames.DARK});
  }
};

export const useTheme = () => React.useContext(ThemeContext);
