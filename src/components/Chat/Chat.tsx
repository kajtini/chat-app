import SendIcon from "@mui/icons-material/Send";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { db } from "../../firebase/config";
import ChatHeader from "./ChatHeader";
import MessageExcerpt from "./MessageExcerpt";
import { Message } from "../../types/types";

const Chat = () => {
  const user = useAppSelector(selectUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const { id } = useParams();
  console.log(id);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  if (!id) return <div>No Chat Found</div>;

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (user) {
        e.preventDefault();
        const collectionRef = collection(db, "chats", id, "messages");

        const completeMessage: Message = {
          content: message,
          photoURL: user.photoURL,
          uid: user.uid,
          createdAt: Timestamp.now(),
        };
        await addDoc(collectionRef, completeMessage);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, "chats", id, "messages");

    const sortedMessages = query(collectionRef, orderBy("createdAt"));
    onSnapshot(sortedMessages, (querySnapshot) => {
      const messagesTemp: Array<Message> = [];

      querySnapshot.forEach((doc) => {
        messagesTemp.push({ ...doc.data(), id: doc.id } as Message);
      });

      setMessages(messagesTemp);
    });
  }, []);

  console.log(messages);

  return (
    <>
      <div className="flex-grow w-full flex flex-col p-3 ">
        <ChatHeader chatName={id} />

        <ul className="flex-grow flex flex-col justify-end gap-3 overflow-scroll mt-auto pb-3">
          {messages?.map((message) => (
            <MessageExcerpt key={message.id} message={message} />
          ))}
        </ul>

        <form onSubmit={handleSend}>
          <div className="mt-auto flex  gap-2">
            <input
              className="flex-grow rounded-xl px-3 bg-gradient-to-b from-primary-lighter to-primary border-white border-solid border-[1px] border-opacity-10 focus:outline-none focus:border-opacity-30"
              type="text"
              placeholder="Message..."
              value={message}
              onChange={handleMessageChange}
            />
            <button className="flex items-center gap-3 bg-accent py-3 px-4 rounded-xl">
              <SendIcon /> Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
