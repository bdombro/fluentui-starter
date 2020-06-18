import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {authState, themeState, ThemeNames} from "../../../state";

export function UserMenu() {
  const [theme, setTheme] = useRecoilState(themeState);
  const auth = useRecoilValue(authState);
  const logout = useResetRecoilState(authState);

  const history = useHistory();
  const menuProps = {
    shouldFocusOnMount: true,
    items: [
      {
        key: 'profile',
        text: 'Profile',
        iconProps: { iconName: 'PlayerSettings' },
        onClick: () => history.push('/profile')
      },
      {
        key: 'themeToggle',
        text: 'Toggle Theme',
        iconProps: { iconName: 'Color' },
        onClick: () => setTheme(theme === ThemeNames.LIGHT ? ThemeNames.DARK : ThemeNames.LIGHT),
      },
      {
        key: 'logout',
        text: 'Logout',
        iconProps: { iconName: 'SignOut' },
        onClick: logout
      },
    ]
  };

  return (
    <CommandBarButton
      menuProps={menuProps}
      iconProps={{ iconName: 'UserOptional' }}>
      {auth.username}
    </CommandBarButton>
  );
}
