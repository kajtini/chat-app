import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedOut, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import UserHeader from "./UserHeader";
import UserLogoutBtn from "./UserLogoutBtn";

const UserInfoPage = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(loggedOut());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-grow w-full flex flex-col justify-center">
      <UserHeader />
      <div className="flex-grow flex flex-col items-center justify-center">
        <UserLogoutBtn handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default UserInfoPage;
