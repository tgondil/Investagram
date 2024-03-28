import dynamic from 'next/dynamic';
import FriendRequestsPage from '../../app/friendRequests/page';

const DynamicFriendRequestsPage = dynamic(() => import('../../app/friendRequests/page'), {
  ssr: false // Disable server-side rendering
});

export default function FriendRequests() {
  return <DynamicFriendRequestsPage />;
}
