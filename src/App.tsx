import Header from "./components/Header/Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loggedIn, selectUser } from "./features/user/userSlice";
import { Routes, Route, useLocation } from "react-router-dom";
import Chats from "./components/Chats/Chats";
import UserInfoPage from "./components/UserSection/UserInfoPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Home from "./components/Home/Home";
import ChatRoom from "./components/Chats/ChatRoom/ChatRoom";
import SignUpWithCredentials from "./components/SignUp/SignUpWithCredentials";
import LogInWithCredentials from "./components/SignUp/LogInWithCredentials";
import RedirectionRoute from "./components/SignUp/RedirectionRoute";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;

        const canSignIn = email && uid;

        if (canSignIn) {
          dispatch(
            loggedIn({
              email,
              displayName: user.displayName ? user.displayName : email,
              photoURL: user.photoURL
                ? user.photoURL
                : "https://i.stack.imgur.com/34AD2.jpg",
              uid,
            })
          );
        }
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-gray-light font-primary">
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-[1000px]">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Header />}>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/user" element={<UserInfoPage />} />
            </Route>
            <Route path="/chats/:id" element={<ChatRoom />} />
          </Route>
          <Route element={<RedirectionRoute />}>
            <Route path="/signup" element={<SignUpWithCredentials />} />
            <Route path="/login" element={<LogInWithCredentials />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
