import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkelaton";
import { useAuthStore } from "../store/useAuthStore";

const SelectedChats = () => {
  const {
    messages,
    getMessages,
    isLoadingMessages,
    selectedUser,
    subscribeToMessage,
    unsubscribeToMessage,
  } = useChatStore();
  // console.log(selectedUser);

  const { authUser } = useAuthStore();
  // console.log(authUser);
  const MessageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessage();
    return () => unsubscribeToMessage;
  }, [getMessages, selectedUser?._id]);

  useEffect(() => {
    if (MessageEndRef.current && messages) {
      MessageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingMessages)
    return (
     <div className="flex-1 flex flex-col overflow-hidden">
  <div className="w-full h-full flex flex-col">
    <ChatHeader />
    <MessageSkeleton />
    <MessageInput />
  </div>
</div>

    );
 
  return (
    <div className="flex-1 flex flex-col overflow-auto  bg-gradient-to-br from-[#171f34] to-[#242e3e]
">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={MessageEndRef}
            className={`chat ${
              message.senderID === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderID === authUser._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectedUser.profilepic || "/avatar.png"
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 flex flex-col">
              <p className="text-xs opacity-50 ml-1">
                {`${message.timestamp.split("T")[0]}`}
              </p>
              <time className="text-xs opacity-50 ml-1">
                {(() => {
                  const date = new Date(message.timestamp);
                  let hours = date.getHours(); // local time
                  const minutes = date.getMinutes();
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12 || 12;
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")} ${ampm}`;
                })()}
              </time>
            </div>
           <div className="chat-bubble bg-transparent flex flex-col max-w-[75%] space-y-1">
  {message.image && (
    <img
      src={message.image}
      alt="Attachment"
      className="sm:max-w-[200px] rounded-md"
    />
  )}

  {message.text && (
    <div
      className={`px-4 py-2 rounded-xl shadow break-words w-fit
        ${
          message.senderID === authUser._id
            ? 'bg-purple-400/80 text-gray-800 self-end'
            : 'bg-sky-200 text-gray-800 self-start'
        }`}
    >
      {message.text}
    </div>
  )}
</div>


          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default SelectedChats;
