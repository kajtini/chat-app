import AddChatTitle from "./AddChatTitle";
import SearchUserForm from "./SearchUserForm";
import { useUsers } from "../../../hooks/useUsers";
import UserThumbnail from "./UserThumbnail";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import LoadingIcon from "../../Loading/LoadingIcon";

const AddChatModal = () => {
  const user = useAppSelector(selectUser);
  const { users, usersLoading } = useUsers();

  const filteredUsers = users?.filter(
    (currentUser) => currentUser.uid !== user?.uid
  );

  return (
    <div className="z-[2] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-full max-w-xs sm:max-w-sm lg:max-w-md px-5 py-8 rounded-lg flex flex-col items-center justify-center gap-4">
      <AddChatTitle />
      <SearchUserForm />

      <LoadingIcon loading={usersLoading} size={50} />

      {!usersLoading && (
        <ul className="w-full flex flex-col gap-4">
          {filteredUsers?.map((user) => (
            <UserThumbnail key={user.uid} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddChatModal;
