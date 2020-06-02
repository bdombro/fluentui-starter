import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { ProgressIndicator, styled } from '@fluentui/react';

import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/util/route';
import routeConfig from './routeConfig';
import {IonReactRouter} from "@ionic/react-router";

function App({ theme }) {
  const { semanticColors } = theme;
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = semanticColors.bodyBackground;
    document.body.style.color = semanticColors.bodyText;
  }, [semanticColors]);

  return (
    <IonReactRouter>
      <AutoSwitchLayout>
        <Suspense fallback={<ProgressIndicator label="Page loading..." />}>
          {renderRoutes(routeConfig)}
        </Suspense>
      </AutoSwitchLayout>
    </IonReactRouter>
  );
}

export default styled(hot(module)(App));
