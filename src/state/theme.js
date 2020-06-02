import React from 'react';
import { Fabric, Customizer } from '@fluentui/react';
import { useSessionStorage } from 'react-use';

import {
  DefaultCustomizations,
  DarkCustomizations
} from '@uifabric/theme-samples';

export const ThemeList = {
  light: DefaultCustomizations,
  dark: DarkCustomizations
};

export const ThemeContext = React.createContext({
  theme: 'light',
  setThemeName: name => {}
});

const ThemeWrapper = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <Customizer {...theme.theme}>
          <Fabric>{children}</Fabric>
        </Customizer>
      )}
    </ThemeContext.Consumer>
  );
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useSessionStorage('theme', 'dark');

  return (
    <ThemeContext.Provider value={{name: themeName, theme: ThemeList[themeName], patch, toggle }}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContext.Provider>
  );

  function patch(next) {
    if (next.theme) throw new Error('Cannot set theme directly.');
    setThemeName(next.name);
  }
  function toggle() {
    setThemeName(themeName === 'dark' ? 'light' : 'dark');
  }
};

export const useTheme = () => React.useContext(ThemeContext);
