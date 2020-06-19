import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import routeConfig from '../../../routeConfig';
import {navCollapsedState} from "../../../state";
import useRoutePath from '../../util/route/useRoutePath';
import {Nav} from './Nav';
import {clearScroll} from "../useScrollRestore";

export const Sidebar = React.memo(() => {
  const history = useHistory();
  const {current, paths} = useRoutePath();
  const setNavCollapsed = useSetRecoilState(navCollapsedState);

  const homeLink = mapRouteToNavLink(routeConfig, false);
  const topPageLinks = routeConfig.children
    .filter(route => isVisible(route) && !Array.isArray(route.children))
    .map(route => mapRouteToNavLink(route, false));

  const groupLinks = routeConfig.children
    .filter(hasChildren)
    .map(route => ({
      name: route.name,
      groupType: 'MenuGroup',
      links: route.children
        .filter(isVisible)
        .map(child => mapRouteToNavLink(child, true))
    }));

  const navLinkGroups = [
    {
      links: [homeLink, ...topPageLinks],
      groupType: 'MenuGroup'
    },
    ...groupLinks
  ];

  return (
    <Nav
      groups={navLinkGroups}
      selectedKey={current?.uniqueKey} />
  );

  function isVisible(route) {
    return !route.isHidden;
  }

  function mapRouteToNavLink(route, deeply = true) {
    return {
      name: route.name,
      key: route.uniqueKey,
      alternateText: route.name,
      title: route.name,
      url: route.path,
      onClick: e => {
        e.preventDefault();
        if (window.innerWidth < 800) { // this width should match the breakpoint in Nav.styles.js
          setNavCollapsed(true);
        }
        if (window.location.pathname === route.path) {
          clearScroll();
        } else {
          history.push(route.path);
        }
      },
      isExpanded:
        deeply &&
        hasChildren(route) &&
        paths.some(that => that.uniqueKey === route.uniqueKey),
      links:
        deeply &&
        hasChildren(route) &&
        route.children
          .filter(isVisible)
          .map(child => mapRouteToNavLink(child, deeply)),
      icon: route.icon
        ? route.icon
        : hasChildren(route) ? 'DocumentSet' : 'TextDocument'
    };
  }

  function hasChildren(route) {
    return route?.children?.filter(isVisible).length;
  }
});
