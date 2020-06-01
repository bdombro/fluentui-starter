import React from 'react';
import {Stack, styled, classNamesFunction} from '@fluentui/react';
import {IonPage, IonRouterOutlet} from "@ionic/react";
import {Sidebar} from '../Sidebar';
import {TopBar} from '../TopBar';

const getStyles = ({theme}) => {
  return {
    root: {
      overflow: 'hidden',
      height: '100vh',
    },
    sidebar: {},
    body: {
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
  return (
    <Stack className={classNames.root}>
      <Stack.Item grow disableShrink>
        <TopBar/>
      </Stack.Item>
      <Stack.Item grow={3} className={classNames.body}>
        <Stack horizontal>
          <Stack.Item grow={false} className={classNames.sidebar}>
            <Sidebar/>
          </Stack.Item>
          <Stack.Item grow={true} className={classNames.contentWrapper}>
              {/* TODO: Figure out why page transitions happen, vs. conference app */}
              <IonRouterOutlet style={{position: 'relative'}}>
                <IonPage>
                  {children}
                </IonPage>
              </IonRouterOutlet>
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
}

export const MasterLayout = styled(MasterLayoutComponent, getStyles);
