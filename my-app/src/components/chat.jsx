// import React, { useEffect, useRef } from 'react';
// import Talk from 'talkjs';
// import { Session } from '@talkjs/react';

// function Chat() {
//   return <Session appId="tOZXp50G" userId="sample_user_alice"></Session>;
// }

// export default Chat;

// function Chat() {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         Talk.ready.then(() => {
//             const me = new Talk.User({
//                 id: "123456",
//                 name: "Alice",
//                 email: "alice@example.com",
//                 photoUrl: "https://talkjs.com/images/avatar-1.jpg",
//                 welcomeMessage: "Hey there! How can I help?"
//             });

//             if (!window.talkSession) {
//                 window.talkSession = new Talk.Session({
//                     appId: "tOZXp50G",
//                     me: me
//                 });
//             }

//             const conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, me));
//             conversation.setParticipant(me);

//             const chat = window.talkSession.createChatbox(conversation);
//             chat.mount(containerRef.current);
//         });
//     }, []);

//     return <div ref={containerRef} style={{ height: '500px' }} />;
// }

// export default Chat;

import React, { useEffect } from 'react';
import Talk from 'talkjs';

const Chat = ({ user, otherUser }) => {
  const talkjsContainer = React.createRef();

  useEffect(() => {
    const currentUser = user;

    Talk.ready.then(() => {
      let me = new Talk.User({
        id: currentUser.id,
        name: currentUser.username,
        photoUrl: currentUser.profilePicture,
        welcomeMessage: "Hey there! How are you?"
      });

      const session = new Talk.Session({
        appId: "tOZXp50G",
        me: me
      });

      if (otherUser) {
        let other = new Talk.User({
          id: otherUser.id,
          name: otherUser.username,
          photoUrl: otherUser.profilePicture
        });

        const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other))
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const inbox = session.createInbox({selected: conversation});
        inbox.mount(talkjsContainer.current);
      } else {
        const inbox = session.createInbox();
        inbox.mount(talkjsContainer.current);
      }
    })
  }, [])

  console.log(talkjsContainer.current)
  return (
    <div ref={talkjsContainer} className='chatbox-container' style={{ height: '500px' }}></div>
  )
}

export default Chat;
