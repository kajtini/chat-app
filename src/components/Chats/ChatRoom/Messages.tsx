import { Message } from "../../../types/types";
import MessageExcerpt from "./MessageExcerpt";

interface MessagesProps {
  messages: Array<Message> | null;
}

const Messages = ({ messages }: MessagesProps) => {
  console.log(messages);

  return (
    <ul className="flex-grow flex flex-col justify-end p-5 items-end gap-5">
      {messages?.map((message) => (
        <MessageExcerpt key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default Messages;
