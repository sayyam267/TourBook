import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
//
import pusherJs from "pusher-js";
import Scrollbar from '../../../components/Scrollbar';
import LightboxModal from '../../../components/LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------


export default function ChatMessageList({conversationID, receiverID}) {
  const scrollRef = useRef(null);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const [messages,setMessages] = useState();

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [messages]);

  useEffect(() => {
    
    const token = localStorage.getItem("accessToken");
    if (conversationID) {
      axios
        .get(`http://localhost:4000/messages/conversation/${conversationID._id}`, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          console.log(res.data.data);
          setMessages(res.data.data);
        });
      // eslint-disable-next-line new-cap
      const pusher = new pusherJs("8446967bdc196e48bfbc", {
        cluster: "ap2",
        encrypted: true,
      });

      const channel = pusher.subscribe(conversationID._id);
      channel.bind("message-received", (data) => {
        //   console.log(data, "pusher server");
        // // console.log("array", messages);
        // const newmessage = data;
        setMessages([...messages, data]);
        console.log("array", messages);
      });
      return () => {
        pusher.unsubscribe(conversationID._id);
      };
    }
  }, [messages]);


  // const imagesLightbox = conversation.messages
  //   .filter((messages) => messages.contentType === 'image')
  //   .map((messages) => messages.body);

  // const handleOpenLightbox = (url) => {
  //   const selectedImage = imagesLightbox.findIndex((index) => index === url);
  //   setOpenLightbox(true);
  //   setSelectedImage(selectedImage);
  // };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
        {messages?.map((message) => (
          <ChatMessageItem
            message={message}
            receiverID={receiverID}
            // onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </Scrollbar>

      {/* <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      /> */}
    </>
  );
}
