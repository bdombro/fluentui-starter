import React from 'react';
import { Stack, styled, classNamesFunction } from '@fluentui/react';
import { Icon } from "@fluentui/react/lib/Icon";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {navCollapsedState} from "../../../state";
import { UserMenu } from './UserMenu';

const getClassNames = classNamesFunction();

function TopBarComponent({ styles, theme }) {
  const [navCollapsed, setNavCollapsed] = useRecoilState(navCollapsedState);
  const classNames = getClassNames(styles, { theme });
  return (
    <Stack
      horizontal
      className={classNames.root}
      tokens={{ childrenGap: '1em' }}>
      <Stack.Item grow={true}>
        <Icon
          className={classNames.leftIconDesktop}
          onClick={() => alert('Clicked App Switcher')}
          iconName='WaffleOffice365' />
        <Icon
          className={classNames.leftIconMobile}
          onClick={() => setNavCollapsed(!navCollapsed)}
          iconName='GlobalNavButton' />
        <Link to='/'>
          <span className={classNames.siteTitle}>
            fluentui-starter
          </span>
        </Link>
      </Stack.Item>
      <UserMenu />
    </Stack>
  );
}

function getStyles({ theme }) {
  return {
    root: {
      borderBottomStyle: 'solid',
      borderBottomColor: theme.semanticColors.bodyFrameDivider,
      borderBottomWidth: 1,
      padding: theme.spacing.s1,
      height: 48,
      background: theme.isInverted ? "#383634" : "#ddd", paddingLeft: 0,
    },
    leftIconDesktop: {
      width: 48, height: 48, fontSize: 16, textAlign: "center", cursor: "pointer",
      selectors: {
        '@media only screen and (max-width: 800px)': {
          display: "none"
        }
      },
    },
    leftIconMobile: {
      width: 48, height: 48, fontSize: 16, textAlign: "center", cursor: "pointer",
      selectors: {
        '@media only screen and (min-width: 801px)': {
          display: "none"
        }
      },
    },
    siteTitle: {
      fontSize: 20,
      color: theme.isInverted ? 'white' : 'black',
    }
  };
}

export const TopBar =  styled(TopBarComponent, getStyles);

