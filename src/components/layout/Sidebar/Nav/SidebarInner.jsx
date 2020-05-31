import React from 'react';
import {styled, classNamesFunction} from '@fluentui/react/lib/Utilities';
import {FocusZone, FocusZoneDirection} from '@fluentui/react/lib/FocusZone';
import {PrimaryButton} from '@fluentui/react';
import {useNav} from "../../../../state/nav";
import {Nav} from './Nav';
import {SlimNav} from './SlimNav';
import {getStyles} from './Nav.styles';
import {NavLink} from './NavLink';

const getClassNames = classNamesFunction();

function SidebarInnerComponent({styles, groups, selectedKey, theme}) {
  const nav = useNav();
  const [showMore, setShowMore] = React.useState(localStorage.getItem('SidebarInner.showMore') === 'true');

  const classNames = getClassNames(styles, {
    isCollapsed: nav.collapsed,
    theme: theme
  });

  return (
    <div className={classNames.root}>
      <FocusZone direction={FocusZoneDirection.vertical}>
        <nav role="navigation">
          {_renderExpandCollapseNavItem()}
          {!!groups?.length && nav.collapsed ? (
            <SlimNav
              groups={groups}
              selectedKey={selectedKey}
              showMore={showMore}
              onShowMoreLinkClicked={_onShowMoreLinkClicked}
            />
          ) : (
            <Nav
              groups={groups}
              selectedKey={selectedKey}
              showMore={showMore}
              onShowMoreLinkClicked={_onShowMoreLinkClicked}
            />
          )}
        </nav>
      </FocusZone>
    </div>
  );

  function _renderExpandCollapseNavItem() {
    const link = {
      key: 'Collapse',
      name: 'Collapsed',
      alternateText: 'Expanded',
      icon: 'GlobalNavButton',
      title: 'Collapse',
      button: () => <button>Boom</button>,
    };
    // const link = toggleNavGroups?.[0]?.links?.[0];

    if (!link) {
      // There is no toggle group with links defined
      return null;
    }

    const classNames = getClassNames(styles, {theme: theme});
    const ariaLabel = nav.collapsed ? link.name : link.alternateText;

    return (
      <div className={classNames.navTogglerWrapper}>
        <NavLink
          id={link.key}
          href={link.url}
          onClick={nav.toggle}
          ariaExpanded={!nav.collapsed}
          dataValue={link.key}
          ariaLabel={ariaLabel}
          rootClassName={classNames.navToggler}
          leftIconName={link.icon}
          iconClassName={classNames.navItemIconColumn}
          barClassName={classNames.navItemBarMarker}
          focusedStyle={classNames.focusedStyle}
          // role="menu"
          title={link.title}
          // content={g[0].button}
          textClassName={classNames.navTogglerText}
          content={(
            <PrimaryButton onClick={() => alert('Clicked Sidebar Button')}>
              New order
            </PrimaryButton>
          )}
        />
      </div>
    );
  }

  function _onShowMoreLinkClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    localStorage.setItem('SidebarInner.showMore', showMore ? 'false' : 'true');
    setShowMore(!showMore);
  }
}

export const SidebarInner = styled(SidebarInnerComponent, getStyles);
