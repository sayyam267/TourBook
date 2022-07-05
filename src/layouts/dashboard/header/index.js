import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// @mui
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import PusherJs from 'pusher-js';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar,Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { PATH_DASHBOARD, PATH_AUTH, PATH_PAGE } from '../../../routes/paths';

//
import TBLabel from './TBLabel';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import Label from '../../../components/Label';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';


// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const [credits,setCredits] = useState(!localStorage.getItem('balance') ?0:localStorage.getItem('balance'));

  // const {balance} = useSelector((state) => state.balance);
  const balance = useSelector((state) => state.balance.balance);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const isCredit = async () =>{
    if(credits > 99){
      return true;
    }
      return false;
  };
  useEffect(() => {
    setCredits(localStorage.getItem('balance'));
  }, [localStorage.getItem('balance')]);


  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');

  //     const pusher = new PusherJs('8446967bdc196e48bfbc', {
  //       cluster: 'ap2',
  //       encrypted: true,
  //     });

  //   const channel = pusher.subscribe();
  //   channel.bind("notifications", (data) => {
  //     console.log(data, "pusher server");

  //       console.log('pusher', data);
  //     });
  //     return () => {
  //       pusher.unsubscribe();
  //     };
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5,mt:-5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
        {isDesktop && (
          <TBLabel />
        )}
        
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {localStorage.getItem('role') === 'admin' ?<></>: <Label color={isCredit() ? "success" : "error"} >
            Credits : {credits}.0 Rs
          </Label>}
          {/* <Label color={isCredit() ? "success":"error"} >
            Credits : {balance}.0 Rs
          </Label> */}
          <NotificationsPopover />
          <Button color="error" size="small" variant="contained" onClick={handleLogout} endIcon={<Iconify icon={'websymbol:logout'} />}>
            Logout
          </Button>
          {/* <AccountPopover /> */}
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
