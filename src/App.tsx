import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loggedIn, selectUser } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Chat/Chats";
import Chat from "./components/Chat/Chat";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;

        const canLogin = email && displayName && photoURL && uid;

        if (canLogin) {
          dispatch(loggedIn({ email, displayName, photoURL, uid }));
        }
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white font-primary">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
