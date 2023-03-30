import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import { Message } from "../../../types/types";

interface MessageExcerptProps {
  message: Message;
}

const MessageExcerpt = ({ message }: MessageExcerptProps) => {
  const user = useAppSelector(selectUser);

  const convertTimestamp = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const convertFirstToUpperCase = (text: string) =>
      text.slice(0, 1).toUpperCase().concat(text.slice(1));

    const now = new Date();
    const messageDate = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (now.getTime() - messageDate.getTime() > oneDayMs) {
      const month = messageDate.toLocaleString("default", {
        month: "short",
      });
      const day = messageDate.getDate();
      return `${convertFirstToUpperCase(month)} ${day}`;
    } else {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const messageCreationTimeConverted = convertTimestamp(message.createdAt);

  return (
    <li
      className={`flex items-center gap-3 max-w-sm ${
        message.uid !== user?.uid && "self-start"
      }`}
    >
      <p
        className={`${
          message.uid !== user?.uid && "order-2"
        } text-sm text-gray`}
      >
        {messageCreationTimeConverted}
      </p>
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
