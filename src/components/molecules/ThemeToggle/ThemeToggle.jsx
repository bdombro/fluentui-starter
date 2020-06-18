import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import {useRecoilState} from "recoil";
import {ThemeList, themeState} from '../../../state';

export function ThemeToggle({ as = CommandBarButton }) {
  const ButtonComponent = as;
  const [theme, setTheme] = useRecoilState(themeState);
  const menuItems = Object.keys(ThemeList).map(key => ({
    key,
    text: key,
    canCheck: true,
    checked: theme === key,
    onClick: () => setTheme(key)
  }));

  return (
    <ButtonComponent
      menuProps={{ shouldFocusOnMount: true, items: menuItems }}
      iconProps={{ iconName: 'Color' }}
    >
      {theme}
    </ButtonComponent>
  );
}
