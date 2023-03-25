import { useParams } from "react-router-dom";
import { useInterlocutor } from "../../../hooks/useInterlocutor";
import { useEffect, useState } from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import Messages from "./Messages";
import SendMessageForm from "./SendMessageForm";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import { Message } from "../../../types/types";
import { useMessages } from "../../../hooks/useMessages";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const user = useAppSelector(selectUser);

  const { id } = useParams();
  if (!id) return <div>No User Found</div>;

  const interlocutor = useInterlocutor(id);
  const messages = useMessages(user, interlocutor);

  const handleSendMessage = async (content: string) => {
    if (user && interlocutor) {
      const messagesRef = collection(
        db,
        "users",
        user.uid,
        "chats",
        interlocutor.uid,
        "messages"
      );

      const interlocutorMessagesRef = collection(
        db,
        "users",
        interlocutor.uid,
        "chats",
        user.uid,
        "messages"
      );

      const completedMessage: Message = {
        content,
        createdAt: Timestamp.now(),
        photoURL: user.photoURL,
        uid: user.uid,
      };

      Promise.all([
        await addDoc(messagesRef, completedMessage),
        await addDoc(interlocutorMessagesRef, completedMessage),
      ]);

      setMessage("");
    }

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {interlocutor && (
        <div className="w-full flex-grow flex flex-col items-stretch pb-5">
          <ChatRoomHeader interlocutor={interlocutor} />
          <Messages messages={messages} />
          <SendMessageForm
            handleSendMessage={handleSendMessage}
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
    </>
  );
};

export default ChatRoom;
