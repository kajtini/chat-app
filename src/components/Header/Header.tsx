import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeaderAddButton from "./HeaderAddButton";
import { ReactNode } from "react";
import HeaderNavLink from "./HeaderNavLink";
import { Outlet } from "react-router-dom";
interface Page {
  id: number;
  path: string;
  icon: ReactNode;
}

const Header = () => {
  const pages: Array<Page> = [
    {
      id: 0,
      path: "/chats",
      icon: <ForumIcon fontSize="large" className="text-gray-light" />,
    },
    {
      id: 1,
      path: "/user",
      icon: <AccountCircleIcon fontSize="large" className="text-gray-light" />,
    },
  ];

  return (
    <>
      <Outlet />

      <header className="w-full justify-between p-5 flex items-center bg-secondary rounded-t-[2rem] shadow-2xl relative">
        <ul className="flex justify-between w-full">
          {pages.map((page) => (
            <HeaderNavLink key={page.id} icon={page.icon} path={page.path} />
          ))}
        </ul>

        <HeaderAddButton />
      </header>
    </>
  );
};

export default Header;
