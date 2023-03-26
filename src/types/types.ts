export interface ChatRoom {
  user: User;
  latestMessage: Message;
  id?: string;
}

export interface Message {
  content: string;
  photoURL: string;
  uid: string;
  createdAt: { seconds: number; nanoseconds: number };
  id?: string;
}

export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}
