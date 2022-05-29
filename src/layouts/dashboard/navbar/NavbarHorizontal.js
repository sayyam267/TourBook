import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//

import AdminNavConfig from './AdminNavConfig';
import VendorNavConfig from './VendorNavConfig';
import TouristNavConfig from './TouristNavConfig';
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));



function NavbarHorizontal() {
  const checkRole = () => {
    if (localStorage.getItem('role') === 'tourguide') {
      return true;
    }
    return false;
  }
  const isadmin = () => {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;
  }
    
  return (
    <RootStyle>
      <Container maxWidth={false}>
        {isadmin() ? <NavSectionHorizontal navConfig={AdminNavConfig} /> : <> {checkRole() ? <NavSectionHorizontal navConfig={VendorNavConfig} /> : <NavSectionHorizontal navConfig={TouristNavConfig} />}</>}
        
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
