import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// @mui
import { Box, Divider, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
  getConversations,
} from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import ChatRoom from './ChatRoom';
import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import ChatHeaderCompose from './ChatHeaderCompose';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: '',
  };
  return initState;
};

export default function ChatWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  const [activeChatID, setactiveChatID] = useState(null);
  const [conversationID, setConversationID] = useState(null);
  const [receiverID, setReceiverID] = useState(null);
  const params = useParams();
  const [directChat, setdirectChat] = useState();

  const mode = null ? 'DETAIL' : 'COMPOSE';

  useEffect(() => {
    console.log('ID IN CHAT WINDOW', location?.state?.id);
    if (location?.state?.id !== null) {
      setReceiverID(location?.state?.id);

      console.log('hello chat', location?.state?.id);
      const token = localStorage.getItem('accessToken');
      axios
        .post(
          process.env.REACT_APP_INITCONVERSATION,
          {
            receiver: location?.state?.id,
          },
          { headers: { 'x-auth-token': token } }
        )
        .then((res) => {
          console.log('init conversation', res.data.data);
          setConversationID(res.data.data);
          setdirectChat(true);
        })
        .catch((e) => console.log(e));
    }
  }, [location?.state?.id]);

  const handleSendMessage = async (value) => {
    console.log('handlesendMessage', value.message);
    const token = localStorage.getItem('accessToken');
    axios
      .post(
        process.env.REACT_APP_CREATEMESSAGES,
        {
          roomID: conversationID._id,
          receiver: location?.state?.id,
          message: value?.message,
        },
        {
          headers: { 'x-auth-token': token },
        }
      )
      .then((res) => {
        console.log('Message Sent!!!!');
        // console.log(res);
      });
  };

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      {/* {mode === 'DETAIL' ? (
        <ChatHeaderDetail participants={displayParticipants} />
      ) : (
        <></>
      )} */}

      <Divider />

      {conversationID && directChat ? (
        <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <Stack sx={{ flexGrow: 1 }}>
            {conversationID ? (
              // <ChatMessageList conversationID={conversationID} receiverID={location?.state?.id} />
              <ChatMessageList conversationID={conversationID} receiverID={receiverID} />
            ) : (
              <></>
            )}

            <Divider />

            <ChatMessageInput conversationId={conversationID} onSend={handleSendMessage} />
          </Stack>

        </Box>
      ) : (
        <></>
      )}
    </Stack>
  );
}
