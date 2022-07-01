import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Input, Divider, IconButton, InputAdornment } from '@mui/material';
// utils
import uuidv4 from '../../../utils/uuidv4';
// components
import Iconify from '../../../components/Iconify';
import EmojiPicker from '../../../components/EmojiPicker';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  conversationId: PropTypes.string,
  onSend: PropTypes.func,
};

export default function ChatMessageInput({  conversationId, onSend }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [disable,setDisable] = useState(false);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend && conversationId) {
      onSend({
        conversationId,
        messageId: uuidv4(),
        message,
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: '',
      });
    }
    return setMessage('');
  };

  return (
    <RootStyle>
      <Input
        disabled={disable}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disable} size="small" onClick={handleAttach}>
              <Iconify icon="ic:round-add-photo-alternate" width={22} height={22} />
            </IconButton>
            <IconButton disabled={disable} size="small" onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" width={22} height={22} />
            </IconButton>
            
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }}>
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
