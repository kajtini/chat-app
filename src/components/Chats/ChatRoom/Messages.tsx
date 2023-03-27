import { useEffect, useRef } from "react";
import { Message } from "../../../types/types";
import MessageExcerpt from "./MessageExcerpt";

interface MessagesProps {
  messages: Array<Message> | null;
}

const Messages = ({ messages }: MessagesProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex-grow h-[50vh] overflow-y-scroll scrollbar-hide scroll-smooth"
    >
      <ul className="flex flex-col justify-end p-5 items-end gap-5 lg:gap-7">
        {messages?.map((message) => (
          <MessageExcerpt key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default Messages;
