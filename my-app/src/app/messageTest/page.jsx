"use client";
import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';
import Sidebar from '../../components/sidebar'

function page() {
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: 'nina',
        name: 'Nina',
        email: 'nina@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
        role: 'default',
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('welcome');

    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
      role: 'default',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);
    const inbox = session.createInbox();
    inbox.select(conversation);
    // inbox.mount(document.getElementById('talkjs-container'));

    return conversation;
  }, []);

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">

      <div className="h-screen bg-shark-950 w-full overflow-hidden">
        <div className="flex">
        <Sidebar></Sidebar>
        <Session appId="tOZXp50G" syncUser={syncUser}>
          <Chatbox
            syncConversation={syncConversation}
            style={{ width: '100%', height: '500px' }}
          ></Chatbox>
        </Session>
        </div>
      </div>
    </main>
  );
}

export default page;
