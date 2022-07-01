import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
import ChatSearchResults from './ChatSearchResults';
import ChatContactSearch from './ChatContactSearch';
import ChatConversationList from './ChatConversationList';
import { SkeletonConversationItem } from '../../../components/skeleton';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar(props) {
  const theme = useTheme();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [isSearchFocused, setSearchFocused] = useState(false);

  const [conversations, setConversations] = useState();





  const isDesktop = useResponsive('up', 'md');

  const displayResults = searchQuery && isSearchFocused;

  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {

    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop, pathname]);

  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get("http://localhost:4000/conversations/mine", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        console.log("conversations", res.data.data);
        setConversations([...res.data.data]);
      });
  }, []);
  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  

 

  const handleSearchSelect = (username) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigate(`${PATH_DASHBOARD.chat.root}/${username}`);
  };

  const handleSelectContact = (result) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
    }
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          {!isCollapse && (
            <>
              <ChatAccount />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={handleToggleSidebar}>
            <Iconify
              width={20}
              height={20}
              icon={openSidebar ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            />
          </IconButton>

         
        </Stack>

       
      </Box>

      <Scrollbar>
        {conversations == null ? (
          [...Array(12)].map((index) =>
          <SkeletonConversationItem key={index} />)
        ) : (
            <ChatConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={props?.activeConversationId}
            sx={{ ...(isSearchFocused && { display: 'none' }) }}
          />
        )}
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
          <Iconify width={16} height={16} icon={'eva:people-fill'} />
        </ToggleButtonStyle>
      )}

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH,
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              '& .MuiDrawer-paper': {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important',
              },
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
