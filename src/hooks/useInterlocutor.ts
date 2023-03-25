import { User } from "../types/types";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useInterlocutor = (interlocutorId: string) => {
  const [interlocutor, setInterlocutor] = useState<User | null>(null);

  useEffect(() => {
    const getInterlocutor = async () => {
      try {
        const interlocutorRef = doc(db, "users", interlocutorId);
        const interlocutorSnapshot = await getDoc(interlocutorRef);

        if (interlocutorSnapshot.exists()) {
          setInterlocutor(interlocutorSnapshot.data() as User);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getInterlocutor();
  }, []);

  return interlocutor;
};
