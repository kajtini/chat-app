interface UserLogoutBtnProps {
  handleLogout: () => Promise<void>;
}

const UserLogoutBtn = ({ handleLogout }: UserLogoutBtnProps) => {
  return (
    <button
      className="text-gray-light bg-accent  w-full py-3 rounded-full shadow-2xl max-w-[256px]"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default UserLogoutBtn;
