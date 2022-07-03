import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
// components
import Image from '../../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function ChatMessageItem({ message, receiverID, onOpenLightbox }) {
  console.log('receiverID', message?.receiver?._id, 'receiverID', receiverID);
  const senderDetails =
    String(message.receiver?._id) === String(receiverID)
      ? { type: 'me' }
      : { avatar: message?.sender?.profilePicture, name: `${message?.sender?.fname} ${message?.sender?.lname}` };

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
      >
        {senderDetails.type !== 'me' && (
          <Avatar alt={senderDetails.name} src={senderDetails.avatar} sx={{ width: 32, height: 32, mr: 2 }} />
        )}
        <div>
          <InfoStyle
            variant="caption"
            sx={{
              ...(isMe && { justifyContent: 'flex-end' }),
            }}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && { color: 'grey.800', bgcolor: 'primary.lighter' }),
              ...(isImage && { p: 0 }),
            }}
          >
            {isImage ? (
              <Image
                alt="attachment"
                src={message?.message}
                onClick={() => onOpenLightbox(message?.message)}
                sx={{ borderRadius: 1, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              />
            ) : (
              <Typography variant="body2">{message?.message}</Typography>
            )}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
