import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useTheme, ThemeList } from '../../../state/theme';

export function ThemeToggle({ as = CommandBarButton }) {
  const ButtonComponent = as;
  const theme = useTheme();
  const menuItems = Object.keys(ThemeList).map(key => ({
    key,
    text: key,
    canCheck: true,
    checked: theme.name === key,
    onClick: () => theme.patch({name: key})
  }));

  return (
    <ButtonComponent
      menuProps={{ shouldFocusOnMount: true, items: menuItems }}
      iconProps={{ iconName: 'Color' }}
    >
      {theme.name}
    </ButtonComponent>
  );
}
