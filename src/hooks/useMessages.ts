import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { Message, User } from "../types/types";

export const useMessages = (user: User | null, interlocutor: User | null) => {
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

      const unsubscribe = onSnapshot(chatRoomQuery, (querySnapshot) => {
        const tempMessages: Array<Message> = [];

        querySnapshot.docs.map((doc) => {
          const message: Message = {
            ...doc.data(),
            id: doc.id,
          } as Message;

          tempMessages.push(message);
        });

        setMessages(tempMessages);
      });

      return () => unsubscribe();
    }
  }, [user, interlocutor]);

  return messages;
};
