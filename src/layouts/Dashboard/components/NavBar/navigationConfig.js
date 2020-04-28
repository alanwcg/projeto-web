/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import EventNote from '@material-ui/icons/EventNote';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import PlaceIcon from '@material-ui/icons/PlaceOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

import { Label } from 'components';

export default [
  {
    title: 'Menu',
    pages: [
      {
        title: 'Lojas',
        href: '/store',
        icon: AssignmentIndOutlinedIcon
      },
      {
        title: 'Cupons',
        href: '/coupon',
        icon: PlaceIcon
      },
      {
        title: 'Pessoas',
        href: '/person',
        icon: PeopleAltOutlinedIcon
      },
      {
        title: 'Documentos',
        href: '/document',
        icon: ListAltIcon
      },
      {
        title: 'Servers',
        href: '/server',
        icon: StorageOutlinedIcon
      }
    ]
  },
  
];
