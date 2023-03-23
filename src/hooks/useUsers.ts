import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { User } from "../types/types";

export const useUsers = () => {
  const [users, setUsers] = useState<Array<User> | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        const filteredUsers = usersSnapshot.docs.map(
          (doc) => doc.data() as User
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return users;
};
