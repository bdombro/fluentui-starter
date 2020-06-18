import React from 'react';
import {useRecoilValue} from "recoil";
import {authState} from "../../state";
import {MasterLayout} from './MasterLayout';
import { BlankLayout } from './BlankLayout';

export function AutoSwitchLayout({ children }) {
  const auth = useRecoilValue(authState);
  const Layout = auth ? MasterLayout : BlankLayout;
  return <Layout>{children}</Layout>;
}
