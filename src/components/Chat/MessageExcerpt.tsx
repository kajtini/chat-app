import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { Message } from "./Chat";

interface MessageExcerptProps {
  message: Message;
}

const MessageExcerpt = ({ message }: MessageExcerptProps) => {
  const user = useAppSelector(selectUser);

  return (
    <li className={`${message.uid === user?.uid ? "self-end" : "self-start"} `}>
      <div className="flex items-center gap-3">
        <p
          className={`border-solid border-white border-[1px] border-opacity-10 rounded-lg p-3 bg-gradient-to-r from-primary-lighter to-primary ${
            message.uid !== user?.uid && "order-[1]"
          }`}
        >
          {message.content}
        </p>
        <img
          className="max-h-10 rounded-full"
          src={message.photoURL}
          alt="user logo"
        />
      </div>
    </li>
  );
};

export default MessageExcerpt;
