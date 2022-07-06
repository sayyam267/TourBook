import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState,useEffect } from 'react';
import PusherJs from 'pusher-js';

import { useSnackbar } from 'notistack';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';

// _mock_
import { _notifications } from '../../../_mock';

// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import axios from '../../../utils/axios';


// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  // const [notifications, setNotifications] = useState();
  const [readNotifications, setReadNotifications] = useState();
  const [unReadnotifications, setUnReadNotifications] = useState();

  const [totalUnRead,setTotalUnRead] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {

      const pusher = new PusherJs('8446967bdc196e48bfbc', {
        cluster: 'ap2',
        encrypted: true,
      });

    const channel = pusher.subscribe(localStorage.getItem("NetworkID"));
    channel.bind("notifications", (data) => {
      console.log(data, "pusher server");
      enqueueSnackbar(data.text);
        console.log('pusher', data);
      });
      return () => {
        pusher.unsubscribe(localStorage.getItem("NetworkID"));
      };
  }, []);

  const handleMarkAllAsRead = () => {
    const token = localStorage.getItem("accessToken");
    axios.put(process.env.REACT_APP_NOTIFICATION_READALL,{
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        console.log("all notifications read", res.data);
        getNotification();

      });
  };

  const getNotification = () => {
    const token = localStorage.getItem("accessToken");
    axios.get(process.env.REACT_APP_NOTIFICATION, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        // console.log("notifications", res.data.data);
        setReadNotifications(res?.data?.data?.filter((item) => item.isRead === true));
        setUnReadNotifications(res?.data?.data?.filter((item) => item.isRead === false));
        setTotalUnRead(res?.data?.data?.filter((item) => item.isRead === false)?.length);
        
      });
  }

  useEffect(() => {
    getNotification();
  }, []);

  const handleRead = (id) =>{
    const token = localStorage.getItem("accessToken");
    axios.put(process.env.REACT_APP_NOTIFICATION_READ,{notificationID:id}, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        console.log("notifications read", res.data);
        getNotification();

      });
  }

  return (
    <>
      <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: 240}}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {unReadnotifications?.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} handleRead={handleRead} />
            ))}
          </List>
          
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {readNotifications?.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} handleRead={handleRead}  />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification, handleRead }) {
  const { avatar, title } = renderContent(notification);


  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={!notification.isRead ? () => {handleRead(notification._id);} : () => console.log("hello")}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.type}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification?.text)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'transaction') {
    return {
      avatar: (
        <img
          alt={notification?.type}
          src="https://res.cloudinary.com/snakecloud/image/upload/v1657143064/icons8-transaction-64_dperkz.png"
        />
      ),
      title,
    };
  }
  if (notification.type === 'order') {
    return {
      avatar: (
        <img
          alt={notification?.type}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'security') {
    return {
      avatar: (
        <img
          alt={notification?.type}
          src="https://res.cloudinary.com/snakecloud/image/upload/v1657143232/icons8-key-2-48_e1ficr.png"
        />
      ),
      title,
    };
  }
  if (notification.type === 'customtour') {
    return {
      avatar: (
        <img
          alt={notification?.type}
          src="https://res.cloudinary.com/snakecloud/image/upload/v1657143064/icons8-offer-64_y3pdqn.png"
        />
      ),
      title,
    };
  }
  if (notification.type === 'feedback') {
    return {
      avatar: (
        <img
          alt={notification?.type}
          src="https://res.cloudinary.com/snakecloud/image/upload/v1657143064/icons8-request-64_vq2qkx.png"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification?.avatar ? <img alt={notification?.title} src={notification?.avatar} /> : null,
    title,
  };
}
