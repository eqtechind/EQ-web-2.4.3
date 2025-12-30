import { useState } from "react";
import {
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Plus,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "./MessageBubble";

const ChatInterface = ({ selectedUser, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
            Select a conversation
          </h2>
          <p className="text-muted-foreground">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[82%] top-[8%] relative  border-[1px] border-gray-200 rounded-lg bg-[#F2F2F2]">
      {/* Chat Header */}
      <div className="flex rounded-t-lg items-center justify-between p-4 border-b border-chat-border bg-card">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {selectedUser.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-semibold text-foreground">
              {selectedUser.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedUser.online ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone
              className="h-5 w-5"
              style={{
                width: "4vh",
                height: "4vh",
              }}
              color="#8AADFF"
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Video
              className="h-5 w-5"
              style={{
                width: "4vh",
                height: "4vh",
              }}
              color="#8AADFF"
            />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical
              className="h-5 w-5"
              style={{
                width: "4vh",
                height: "4vh",
              }}
              color="#8AADFF"
            />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#F2F2F2]">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t  border-chat-border bg-card relative top-[-2vh] w-[95%] mx-auto rounded-xl">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <svg
              display="block"
              role="presentation"
              style={{
                width: "5vh",
                height: "5vh",
                color: "blue",
              }}
              width={"5vh"}
              height={"5vh"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              id="3806506243"
            >
              <path
                d="M 4 0 L 10.5 0 C 12.709 0 14.5 1.791 14.5 4 L 14.5 10.5 C 14.5 12.709 12.709 14.5 10.5 14.5 L 4 14.5 C 1.791 14.5 0 12.709 0 10.5 L 0 4 C 0 1.791 1.791 0 4 0 Z"
                fill="transparent"
                height="14.5px"
                id="nYrjBGgNJ"
                stroke-dasharray=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="var(--1335ju, 1.5)"
                stroke="var(--18mrqx2, rgb(0, 0, 0))"
                transform="translate(4.75 4.75)"
                width="14.5px"
              ></path>
              <path
                d="M 0 0 C 0 0 1.25 2.5 4.25 2.5 C 7.25 2.5 8.5 0 8.5 0"
                fill="transparent"
                height="2.5px"
                id="C17Rspc3u"
                stroke-dasharray=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="var(--1335ju, 1.5)"
                stroke="var(--18mrqx2, rgb(0, 0, 0))"
                transform="translate(7.75 12.75)"
                width="8.5px"
              ></path>
              <path
                d="M 1 0.5 C 1 0.776 0.776 1 0.5 1 C 0.224 1 0 0.776 0 0.5 C 0 0.224 0.224 0 0.5 0 C 0.776 0 1 0.224 1 0.5 Z"
                fill="transparent"
                height="1px"
                id="SIJrVuqN5"
                stroke-dasharray=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="var(--3it368, 1)"
                stroke="var(--18mrqx2, rgb(0, 0, 0))"
                transform="translate(9.5 9.5)"
                width="1px"
              ></path>
              <path
                d="M 1 0.5 C 1 0.776 0.776 1 0.5 1 C 0.224 1 0 0.776 0 0.5 C 0 0.224 0.224 0 0.5 0 C 0.776 0 1 0.224 1 0.5 Z"
                fill="transparent"
                height="1px"
                id="iLQx3krn3"
                stroke-dasharray=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="var(--3it368, 1)"
                stroke="var(--18mrqx2, rgb(0, 0, 0))"
                transform="translate(13.5 9.5)"
                width="1px"
              ></path>
            </svg>{" "}
          </Button>
          <Input
            placeholder="Send a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-none placeholder:text-[#8AADFF] placeholder:text-lg font-inter inter"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="w-[10vh] bg-white hover:bg-white"
          >
            <Plus
              className="h-[6vh] w-[6vh] "
              style={{
                width: "5vh",
                height: "5vh",
              }}
              color="#8AADFF"
            />
            <Send
              style={{
                width: "4vh",
                height: "4vh",
              }}
              className="h-6 w-6"
              color="#8AADFF"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
