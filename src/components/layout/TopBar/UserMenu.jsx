import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useAuthentication } from '../../../state/authentication';
import { useHistory } from 'react-router-dom';
import {useTheme} from "../../../state/theme";

export function UserMenu() {
  const auth = useAuthentication();
  const theme = useTheme();

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
        key: 'logout',
        text: 'Logout',
        iconProps: { iconName: 'SignOut' },
        onClick: auth.logout
      },
      {
        key: 'themeToggle',
        text: 'Toggle Theme',
        iconProps: { iconName: 'Color' },
        onClick: theme.toggle
      }
    ]
  };

  return (
    <CommandBarButton
      menuProps={menuProps}
      iconProps={{ iconName: 'UserOptional' }}>
      {auth.principal.username}
    </CommandBarButton>
  );
}
