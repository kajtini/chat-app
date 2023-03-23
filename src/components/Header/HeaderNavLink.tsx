import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface HeaderNavLinkProps {
  path: string;
  icon: ReactNode;
}

const HeaderNavLink = ({ path, icon }: HeaderNavLinkProps) => {
  return (
    <li>
      <Link to={path}>{icon}</Link>
    </li>
  );
};

export default HeaderNavLink;
