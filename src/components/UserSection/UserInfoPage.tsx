import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedOut, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";

const UserInfoPage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(loggedOut());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-grow w-full flex flex-col justify-center">
      <div className=" p-5 bg-secondary rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-5  justify-center">
          <img
            className="rounded-full max-h-14"
            src="https:lh3.googleusercontent.com/a/AGNmyxYCTpBeGyDsE_BiQDc2jTCEsioQpK_7jd0SPe0V=s96-c"
            alt="user image"
          />

          <div>
            <p className="text-xl font-bold">Kajetan Kowalski</p>
            <p className="text-gray text-sm">kowalskikajetan824@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <button
          className="text-secondary bg-accent  w-full py-3 rounded-full shadow-2xl max-w-[256px]"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage;
