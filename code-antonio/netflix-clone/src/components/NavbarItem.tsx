import React from "react";

type NavbarItemProps = {
  label: string;
  active?: boolean;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  active,
}: NavbarItemProps) => {
  return (
    <div
      className={`
      ${active ? "text-white" : "text-gray-200"}
      hover:text-gray-300
      cursor-pointer
      transition-all duration-300 ease-in-out
      `}
    >
      {label}
    </div>
  );
};

export default NavbarItem;
