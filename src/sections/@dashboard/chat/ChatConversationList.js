import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { List } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { SkeletonConversationItem } from '../../../components/skeleton';
//
import ChatConversationItem from './ChatConversationItem';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.array,
  isOpenSidebar: PropTypes.bool,
  activeConversationId: PropTypes.string,
  sx: PropTypes.object,
};

export default function ChatConversationList({ conversations, isOpenSidebar, activeConversationId, sx, ...other }) {
  const navigate = useNavigate();

  const handleSelectConversation = (ID) => {
    
    console.log(ID);
    navigate(`${PATH_DASHBOARD.chat.root}/`,{state:{id:ID}});
  };

  const loading = null;
  console.log("this is list",conversations);

  return (
    <List disablePadding sx={sx} {...other}>
      {conversations?.map((conversation) =>
        
          <ChatConversationItem
            // key={conversationId}
            conversation={conversation}
            isOpenSidebar={isOpenSidebar}
            receiver = {conversation.people.find( r => r.email !== localStorage.getItem("email"))}
            onSelectConversation={handleSelectConversation}
          />
      )}
    </List>
  );
}
