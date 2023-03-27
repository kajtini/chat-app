import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import { Message } from "../../../types/types";

interface MessageExcerptProps {
  message: Message;
}

const MessageExcerpt = ({ message }: MessageExcerptProps) => {
  const user = useAppSelector(selectUser);

  return (
    <li
      className={`flex items-center gap-3 max-w-xs ${
        message.uid !== user?.uid && "self-start"
      }`}
    >
      <div
        className={` self-stretch  py-3 px-5 shadow-md rounded-lg flex flex-col justify-center ${
          message.uid !== user?.uid
            ? "order-1 bg-secondary"
            : "bg-active bg-opacity-70"
        }`}
      >
        <p className="lg:text-lg">{message.content}</p>
      </div>

      <img
        className="max-h-11 lg:max-h-14 rounded-full"
        src={message.photoURL}
        alt="user image"
      />
    </li>
  );
};

export default MessageExcerpt;
