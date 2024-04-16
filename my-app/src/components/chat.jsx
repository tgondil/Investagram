import React, { useEffect, useRef } from 'react';
import Talk from 'talkjs';

const Chat = ({ user, otherUser }) => {
  const talkjsContainer = useRef(null);

  useEffect(() => {
    if (!user) return;

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: user.id,
        name: user.username,
        photoUrl: user.photoUrl,
        welcomeMessage: "Hey there! How are you?"
      });

      const session = new Talk.Session({
        appId: "tOZXp50G",
        me: me
      });

      let conversation;
      if (otherUser) {
        const other = new Talk.User({
          id: otherUser?.id,
          name: otherUser?.username,
          photoUrl: otherUser?.profilePicture
        });

        conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
        conversation.setParticipant(other);
      } else {
        conversation = session.getOrCreateConversation(Talk.oneOnOneId(me,me));
      }
      
      conversation.setParticipant(me);

      const inbox = session.createInbox({ selected: conversation });
      inbox.mount(talkjsContainer.current);
    }).catch(error => console.error('Error initializing TalkJS', error));
  }, [user, otherUser]); // Ensure re-initialization if users change

  return <div ref={talkjsContainer} className='chatbox-container' style={{ height: '100%' }}></div>;
}

export default Chat;
