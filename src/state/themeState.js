import React, {useEffect} from "react";
import {DarkCustomizations, DefaultCustomizations} from "@uifabric/theme-samples";
import {Customizer, Fabric} from "@fluentui/react";
import {atom, useRecoilValue} from 'recoil';

export const ThemeNames = {
  DARK: 'dark',
  LIGHT: 'light'
}

export const ThemeList = {
  [ThemeNames.LIGHT]: DefaultCustomizations,
  [ThemeNames.DARK]: DarkCustomizations
};

export const themeState = atom({
  key: 'themeState',
  default: ThemeNames.DARK,
});

export function ThemeHoc({children}) {
  const theme = useRecoilValue(themeState);
  useEffect(() => {
    const {semanticColors} = ThemeList[theme].settings.theme;
    document.body.style.backgroundColor = semanticColors.bodyBackground;
    document.body.style.color = semanticColors.bodyText;
  }, [theme])
  return (
      <Customizer {...ThemeList[theme]}>
        <Fabric>
          {children}
        </Fabric>
      </Customizer>
  );
}