const MessageBubble = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg border-[1px] ${
          isMe
            ? "bg-chat-message-sent text-black rounded-br-sm bg-white border-gray-200 py-4 "
            : "bg-chat-message-received text-white font-[500] inter border border-chat-border rounded-bl-sm bg-[#8AADFF]"
        }`}
      >
           {isMe && (
          <p
            className={`text-xs mt-1 text-left w-full flex justify-start  ${
              isMe ? "text-black" : " text-white"
            }`}
          >
            {message.time}
          </p>
        )}
        <p className="text-sm">{message.text}</p>
        {!isMe && (
          <p
            className={`text-xs mt-1 text-left w-full flex justify-end ${
              isMe ? "text-blue-100" : " text-white"
            }`}
          >
            {message.time}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
