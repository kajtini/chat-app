import { useParams } from "react-router-dom";
import { useInterlocutor } from "../../../hooks/useInterlocutor";
import ChatRoomHeader from "./ChatRoomHeader";
import Messages from "./Messages";
import SendMessageForm from "./SendMessageForm";

const ChatRoom = () => {
  const { id } = useParams();
  if (!id) return <div>No User Found</div>;

  const interlocutor = useInterlocutor(id);

  return (
    <>
      {interlocutor && (
        <div className="w-full flex-grow flex flex-col items-stretch">
          <ChatRoomHeader interlocutor={interlocutor} />
          <Messages />
          {/* ChatRoomSendMessageForm */}
          <SendMessageForm />
        </div>
      )}
    </>
  );
};

export default ChatRoom;
