import React, {useEffect} from 'react';
import {Stack, styled, classNamesFunction} from '@fluentui/react';
import {Sidebar} from '../Sidebar';
import {TopBar} from '../TopBar';
import {useScroll} from "react-use";

const getStyles = ({theme}) => {
  return {
    root: {
      overflow: 'hidden',
      height: '100vh',
    },
    sidebar: {},
    body: {
      height: 'calc(100vh - 48px)',
      overflowY: 'scroll',
    },
    contentWrapper: {
      paddingLeft: theme.spacing.l2,
      paddingRight: theme.spacing.l2,
    }
  };
};

const getClassNames = classNamesFunction();

function MasterLayoutComponent({children, theme, styles}) {
  const classNames = getClassNames(styles, {theme});

  useEffect(() => {
    const intervalNumber = setInterval(setScroll, 400);
    return () => clearInterval(intervalNumber);

    function setScroll () {
      localStorage.setItem(
        `scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`,
        `${document.getElementById('scroll-div')?.scrollTop ?? 0}`,
      );
    }
  }, [])

  return (
    <Stack className={classNames.root}>
      <Stack.Item grow disableShrink>
        <TopBar/>
      </Stack.Item>
      <Stack.Item grow={3}>
        <div id='scroll-div' className={classNames.body}>
          <Stack horizontal>
            <Stack.Item grow={false} className={classNames.sidebar}>
              <Sidebar/>
            </Stack.Item>
            <Stack.Item grow={true} className={classNames.contentWrapper}>
              {children}
            </Stack.Item>
          </Stack>
        </div>
      </Stack.Item>
    </Stack>
  );
}

export const MasterLayout = styled(MasterLayoutComponent, getStyles);
