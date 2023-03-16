import Header from "./components/Header/Header";
import SignUpPage from "./components/Header/SignUpPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loggedIn, selectUser } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Chat/Chats";
import Chat from "./components/Chat/Chat";
import UserInfoPage from "./components/UserSection/UserInfoPage";

const App = () => {
  const user = useAppSelector(selectUser);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-black font-primary">
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<Chat />} />
          <Route path="/user" element={<UserInfoPage />} />
        </Routes>
      </main>

      {user && <Header />}
    </div>
  );
};

export default App;
