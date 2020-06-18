import {atom} from 'recoil';

export const navCollapsedState = atom({
  key: 'navCollapsed',
  default: window.innerWidth < 800,
});