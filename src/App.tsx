import Header from "./components/Header/Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loggedIn, selectUser } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Chats/Chats";
import UserInfoPage from "./components/UserSection/UserInfoPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

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
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/user" element={<UserInfoPage />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

      <Header />
    </div>
  );
};

export default App;
