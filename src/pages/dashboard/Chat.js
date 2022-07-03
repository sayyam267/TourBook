import { useEffect,useState } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ChatSidebar, ChatWindow } from '../../sections/@dashboard/chat';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();
  const [conversations, setConversations] = useState();
  


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get(process.env.REACT_APP_MYCONVERSATION, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        console.log("conversations", res.data.data);
        setConversations([...res.data.data]);
      });
  }, []);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
       <h2>Chat</h2>
        <Card sx={{ height: '72vh', display: 'flex' }}>
           <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
