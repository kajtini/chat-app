import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { Message, User } from "../types/types";

export const useMessages = (user: User, interlocutor: User) => {
  const [messages, setMessages] = useState<Array<Message> | null>(null);

  useEffect(() => {
    if (user && interlocutor) {
      const chatRoomRef = collection(
        db,
        "users",
        user.uid,
        "chats",
        interlocutor.uid,
        "messages"
      );

      const chatRoomQuery = query(chatRoomRef, orderBy("createdAt"));

      onSnapshot(chatRoomQuery, (querySnapshot) => {
        const tempMessages: Array<Message> = [];

        querySnapshot.docs.map((doc) => {
          const message: Message = {
            ...doc.data(),
          } as Message;

          tempMessages.push(message);
        });

        setMessages(tempMessages);
      });
    }
  }, [user, interlocutor]);

  return messages;
};