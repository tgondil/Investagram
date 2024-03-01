import React from 'react';
import Sidebar from '../../components/sidebar';
import PollsPage from './PollsPage'; // Import the PollsPage component

const Page = () => {
  return (
    <main className="h-screen bg-shark-950 w-full fixed">
      <div className="flex">
        <Sidebar className="w-1/5" />
        <div className="w-10/12 h-screen">
          <div className="border-b border-dotted fixed w-full h-28 bg-shark-950" />
          <PollsPage hi /> {/* Render the PollsPage component */}
        </div>
      </div>
    </main>
  );
};

export default Page;
