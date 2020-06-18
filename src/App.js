import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader';
import {ProgressIndicator, styled} from '@fluentui/react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter} from "react-router-dom";
import {AutoSwitchLayout} from './components/layout';
import {renderRoutes} from './components/util/route';
import routeConfig from './routeConfig';
import {ThemeHoc} from "./state";

function App() {
  return (
    // FIXME: Implement state persistence when recoil is stable
    <RecoilRoot>
      <ThemeHoc>
        <BrowserRouter>
          <AutoSwitchLayout>
            <Suspense fallback={<ProgressIndicator label="Page loading..."/>}>
              {renderRoutes(routeConfig)}
            </Suspense>
          </AutoSwitchLayout>
        </BrowserRouter>
      </ThemeHoc>
    </RecoilRoot>
  );
}

export default styled(hot(module)(App));
