"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';

const Messages = () => {
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Something something something something blah blah blah blah blah blah blah business money........2 din me paisa double kardunga sir",
      timestamp: "7:28",
      sent: true,
    },
    {
      id: 2,
      text: "Alright, tell me more.",
      timestamp: "7:45",
      sent: false,
    },
  ]);

  const contacts = [
    {
      id: 1,
      name: "CEO, Apple Corp.",
      subtext: "Hemant Bhai",
      avatar: "/avatars/1.png",
    },
    {
      id: 2,
      name: "Director, Google Corp.",
      subtext: "Aayush Joshi",
      avatar: "/avatars/2.png",
    },
    {
      id: 3,
      name: "CEO, JP Morgan Corp.",
      subtext: "Austin Loyd",
      avatar: "/avatars/3.png",
    },
  ];

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleEmojiClick = (emojiObject) => {
    setNewMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      // Check file type
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          // For images, we can display them directly
          // For PDFs, we'll just show the filename
          const messageText = file.type.startsWith('image/') 
            ? `[Image: ${file.name}]`
            : `[PDF: ${file.name}]`;

          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sent: true,
            fileType: file.type,
            fileUrl: file.type.startsWith('image/') ? e.target.result : null,
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sent: true,
      },
    ]);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-transparent">
      <div className="flex relative w-full md:w-[90%] h-[90vh] glass-effect rounded-lg overflow-hidden">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden absolute top-4 left-4 z-50 text-white p-2 rounded-lg bg-[#528eef]"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Left Sidebar */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform absolute md:relative w-full md:w-1/3 h-full bg-[#1a1a1a] md:bg-transparent p-4 z-40`}>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-12 md:mt-0">Messages</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#528eef] text-white placeholder-white/50 outline-none"
            />
          </div>

          {/* Contacts List */}
          <div className="space-y-2 overflow-y-auto max-h-[calc(90vh-200px)]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-3 rounded-lg bg-[#528eef] hover:bg-black/20 cursor-pointer transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="w-12 h-12 bg-black/10 rounded-full flex-shrink-0" />
                <div className="ml-3">
                  <div className="text-white font-semibold">{contact.name}</div>
                  <div className="text-white/70 text-sm">{contact.subtext}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-full my-4 bg-blue-500"></div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/5 bg-none">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-none rounded-full" />
              <div className="ml-3">
                <div className="text-white font-semibold">CEO, Apple Corp.</div>
                <div className="text-white/70">Hemant Bhai</div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 flex flex-col justify-between glass-effect mb-4 mx-2 md:mx-4">
            <div>
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4"
                style={{ maxHeight: 'calc(90vh - 180px)' }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] p-3 rounded-lg ${
                        message.sent
                          ? "bg-[#f3f4f6] text-black rounded-tr-none ml-2"
                          : "bg-black/40 text-white rounded-tl-none mr-2"
                      }`}
                    >
                      {message.fileUrl ? (
                        <img src={message.fileUrl} alt="Uploaded" className="max-w-full rounded-lg mb-2" />
                      ) : null}
                      <p className="text-sm md:text-base">{message.text}</p>
                      <span className="text-[10px] md:text-xs block text-right mt-1" style={{color: message.sent ? "black" : "white"}}>
                        sent {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-2 md:p-4 bg-transparent">
              <form onSubmit={handleSendMessage} className="relative">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-white hover:bg-[#528eef] rounded-full transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf"
                  />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 md:p-3 rounded-full bg-[#528eef] text-white placeholder-white/50 outline-none text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-white hover:bg-[#528eef] rounded-full transition-colors"
                  >
                    😊
                  </button>
                  <button
                    type="submit"
                    className="p-2 text-white hover:bg-[#528eef] rounded-full transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
