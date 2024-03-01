import React from "react";

export default function Feed() {
  const messages = [
    { user: "John Doe", message: "Hey there!" },
    { user: "Alice Smith", message: "How's it going?" },
    { user: "Bob Johnson", message: "Meeting at 3 PM today." },
    { user: "Eve Williams", message: "What's the plan for the weekend?" },
    { user: "Charlie Brown", message: "Can you review the document?" },
  ];

  return (
    <div className="overflow-auto w-full h-screen">
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center justify-between h-1/6 border-b border-dotted p-4">
          <div className="font-bold">{msg.user}</div>
          <div>{msg.message}</div>
        </div>
      ))}
    </div>
  );
}
