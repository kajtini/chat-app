import AddChatTitle from "./AddChatTitle";
import SearchUserForm from "./SearchUserForm";
import { useUsers } from "../../../hooks/useUsers";
import UserThumbnail from "./UserThumbnail";

const AddChatModal = () => {
  const users = useUsers();

  return (
    <div className="z-[2] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-full max-w-xs px-5 py-8 rounded-lg flex flex-col items-center justify-center gap-4">
      <AddChatTitle />
      <SearchUserForm />

      <ul className="w-full flex flex-col gap-4">
        {users?.map((user) => (
          <UserThumbnail key={user.uid} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default AddChatModal;
