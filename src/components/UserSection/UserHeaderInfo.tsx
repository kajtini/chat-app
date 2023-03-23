import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

const UserHeaderInfo = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex items-center gap-5  justify-center">
      <img
        className="rounded-full max-h-14"
        src={user?.photoURL}
        alt="user image"
      />

      <div>
        <p className="text-xl font-bold">{user?.displayName}</p>
        <p className="text-gray text-sm">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserHeaderInfo;
