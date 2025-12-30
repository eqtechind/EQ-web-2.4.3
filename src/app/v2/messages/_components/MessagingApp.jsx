"use client";
import { useState } from "react";
import UserList from "./UserList";
import ChatInterface from "./ChatInterface";
import { demoUsers, demoMessages } from "./demo";
import Navbar from "../../startup/profile/_components/Navbar";

const MessagingApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(demoMessages);
  const [users, setUsers] = useState(demoUsers);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (messageText) => {
    if (!selectedUser) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(),
    };

    // Update messages
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));

    // Update user's last message and time
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? { ...user, lastMessage: messageText, time: newMessage.time }
          : user
      )
    );
  };

  const currentMessages = selectedUser ? messages[selectedUser.id] || [] : [];

  return (
    <div>
      <Navbar />

      <div className="h-screen flex bg-background pr-2">
        <UserList
          users={users}
          selectedUser={selectedUser}
          onUserSelect={handleUserSelect}
        />
        <ChatInterface
          selectedUser={selectedUser}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessagingApp;
