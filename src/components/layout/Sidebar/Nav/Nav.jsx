import React from 'react';
import {styled, classNamesFunction} from '@fluentui/react/lib/Utilities';
import {FocusZone, FocusZoneDirection} from '@fluentui/react/lib/FocusZone';
import {PrimaryButton} from '@fluentui/react';
import {useRecoilState} from "recoil";
import {navCollapsedState} from "../../../../state";
import {getStyles} from './Nav.styles';
import {FullNav} from './FullNav';
import {SlimNav} from './SlimNav';
import {NavLink} from './NavLink';

const getClassNames = classNamesFunction();

function SidebarInnerComponent({styles, groups, selectedKey, theme}) {
  const [navCollapsed, setNavCollapsed] = useRecoilState(navCollapsedState);

  const classNames = getClassNames(styles, {
    isCollapsed: navCollapsed,
    theme: theme
  });


  return (
    <div className={classNames.root}>
      <div className={classNames.rootInner}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <nav role="navigation">
            {_renderExpandCollapseNavItem()}
            {!!groups?.length && navCollapsed ? (
              <SlimNav
                groups={groups}
                selectedKey={selectedKey}
              />
            ) : (
              <FullNav
                groups={groups}
                selectedKey={selectedKey}
              />
            )}
          </nav>
        </FocusZone>
      </div>
    </div>
  );

  function _renderExpandCollapseNavItem() {
    const link = {
      key: 'Collapse',
      name: 'Collapsed',
      alternateText: 'Expanded',
      icon: 'GlobalNavButton',
      title: 'Collapse',
    };

    if (!link) {
      // There is no toggle group with links defined
      return null;
    }

    const classNames = getClassNames(styles, {theme: theme});
    const ariaLabel = navCollapsed ? link.name : link.alternateText;

    return (
      <div className={classNames.navTogglerWrapper}>
        <NavLink
          id={link.key}
          href={link.url}
          onClick={e => !e.target.className.includes('Button') && setNavCollapsed(!navCollapsed)}
          ariaExpanded={!navCollapsed}
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
            <PrimaryButton title='New Order' onClick={() => alert('Clicked Sidebar Button')}>
              New order
            </PrimaryButton>
          )}
        />
      </div>
    );
  }
}

export const Nav = styled(SidebarInnerComponent, getStyles);
