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
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { db } from "../firebase/config";

interface Message {
  content: string;
  photoURL: string;
  uid: string;
  createdAt: { seconds: number; nanoseconds: number };
}

const Chat = () => {
  const user = useAppSelector(selectUser);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  //yNls8VTBQxzVdhQh8eAo

  const handleSend = async () => {
    try {
      if (user) {
        const collectionRef = collection(
          db,
          "chats",
          "yNls8VTBQxzVdhQh8eAo",
          "messages"
        );

        const completeMessage: Message = {
          content: message,
          photoURL: user.photoURL,
          uid: user.uid,
          createdAt: Timestamp.now(),
        };
        await addDoc(collectionRef, completeMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user?.uid);

  useEffect(() => {
    const collectionRef = collection(
      db,
      "chats",
      "yNls8VTBQxzVdhQh8eAo",
      "messages"
    );

    const sortedMessages = query(collectionRef, orderBy("createdAt"));
    onSnapshot(sortedMessages, (querySnapshot) => {
      const messagesTemp: Array<Message> = [];

      querySnapshot.forEach((doc) => {
        messagesTemp.push(doc.data() as Message);
      });

      setMessages(messagesTemp);
    });
  }, []);

  console.log(messages);

  return (
    <div className="flex-grow w-full flex flex-col p-3">
      <ul className="flex-grow flex flex-col justify-end gap-3">
        {messages?.map((message) => (
          <li
            className={`${
              message.uid === user?.uid ? "self-end" : "self-start"
            } `}
          >
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
        ))}
      </ul>

      <div className="mt-auto flex  gap-2">
        <input
          className="flex-grow rounded-xl px-3 bg-gradient-to-b from-primary-lighter to-primary border-white border-solid border-[1px] border-opacity-10 focus:outline-none focus:border-opacity-30"
          type="text"
          placeholder="Message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button
          className="flex items-center gap-3 bg-accent py-3 px-4 rounded-xl"
          onClick={handleSend}
        >
          <SendIcon /> Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
