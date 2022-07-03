import PropTypes from 'prop-types';
import {useState} from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
//
import BadgeStatus from '../../../components/BadgeStatus';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create('all'),
}));

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' },
});

// ----------------------------------------------------------------------

const getDetails = (conversation, currentUserId) => {
  const otherParticipants = conversation.participants.filter((participant) => participant.id !== currentUserId);
  const displayNames = otherParticipants.reduce((names, participant) => [...names, participant.name], []).join(', ');
  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

ChatConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectConversation: PropTypes.func,
  receiver: PropTypes.object,
};

export default function ChatConversationItem({ isSelected, conversation, isOpenSidebar, onSelectConversation,receiver }) {

  

  
  const lastMessage = conversation?.lastMessage;
  const [isSelect,setIsSelect] = useState(false);
  const isGroup = false;
  const people=conversation?.people;
  const conversationId = conversation?._id;
  console.log(lastMessage,conversationId, receiver);

  const handleSelectConversation = () => {
    console.log(receiver._id);
    // setIsSelect(true);
    onSelectConversation(receiver?._id);
  }
 

  return (
    <RootStyle
      onClick={handleSelectConversation}
      sx={{
        ...(isSelect && { bgcolor: 'action.selected' }),
      }}
    >
      <ListItemAvatar>
        <Box
          sx={{
            ...(isGroup && {
              position: 'relative',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              '& .avatarWrapper': {
                position: 'absolute',
                width: AVATAR_SIZE_GROUP,
                height: AVATAR_SIZE_GROUP,
                '&:nth-of-type(1)': {
                  left: 0,
                  zIndex: 9,
                  bottom: 2,
                  '& .MuiAvatar-root': {
                    border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                  },
                },
                '&:nth-of-type(2)': { top: 2, right: 0 },
              },
            }),
          }}
        >
          <AvatarWrapperStyle className="avatarWrapper" key={receiver?._id}>
            <Avatar alt={receiver?.fname} src={receiver?.profilePicture} />
          </AvatarWrapperStyle>

        </Box>
      </ListItemAvatar>

      {isOpenSidebar &&  (
        <>
          <ListItemText
            primary={receiver?.fname}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={lastMessage}
            secondaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
              color: 'textPrimary'
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                mb: 1.25,
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(conversation.updatedAt), {
                addSuffix: false,
              })}
            </Box>

          </Box>
        </>
      )}
    </RootStyle>
    
  );
}
