import React from 'react';
import {get} from 'lodash-es';
import paths from 'path';

import { hierarchize } from './util/hierarchical';

const keyName = 'key';
const pathName = 'path';
const uniqueKeyName = 'uniqueKey';

function pathGenerator(node, parent) {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + '.' + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, '');
  const path = get(node, pathName, paths.join(parentPath, node[keyName]));
  node[uniqueKeyName] = uniqueKey;
  node[pathName] = path;
}

const routeConfig = hierarchize(
  {
    key: 'home',
    name: 'Home',
    icon: 'Home',
    description: 'This is a description of the home page.',
    path: '/',
    component: React.lazy(() => import('./components/pages/Dashboard')),
    children: [
      {
        key: 'login',
        name: 'Login',
        description: 'This is a description of the login page.',
        isPublic: true,
        isHidden: true,
        component: React.lazy(() => import('./components/pages/Login')),
      },
      {
        key: 'profile',
        name: 'Profile',
        description: 'This is a description of the profile page.',
        isHidden: true
      },
      {
        key: 'orders',
        name: 'Orders',
        icon: 'visualizeApp',
        description: 'This is a description of the order page.',
        children: [
          {
            key: 'purchase-orders',
            name: 'Purchase Orders',
            description: 'This is a description of the po page.',
          },
          {
            key: 'sales-orders',
            name: 'Sales Orders',
            description: 'This is a description of the Sales Order page.',
          }
        ]
      },
      {
        key: 'management',
        name: 'System Management',
        icon: 'managementApp',
        description: 'This is a description of the system mgmt page.',
        children: [
          {
            key: 'organization',
            name: 'Organization',
            icon: 'Org',
            description: 'This is a description of the org page.'
          },
          {
            key: 'users',
            name: 'Users',
            icon: 'People',
            description: 'This is a description of the user page.'
          },
          {
            key: 'authority',
            name: 'Authority',
            icon: 'SecurityGroup',
            description: 'This is a description of the authority page.'
          },
          {
            key: 'settings',
            name: 'Settings',
            icon: 'Settings',
            description: 'This is a description of the settings page.',
            children: [
              {
                key: 'list',
                name: 'List',
                description: 'This is a description of the list page.',
              },
              {
                key: 'unit',
                name: 'Unit',
                description: 'This is a description of the unit page.',
              }
            ]
          }
        ]
      }
    ]
  },
  null,
  pathGenerator
);

// console.log(routeConfig);

export default routeConfig;
