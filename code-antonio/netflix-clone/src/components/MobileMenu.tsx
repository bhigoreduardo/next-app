import React from "react";

import NavbarItem from "./NavbarItem";

type MobileMenuProps = {
  visible?: boolean;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <div
      className="
        absolute top-14 left-2
        flex flex-col gap-4
        bg-black w-56 py-5 px-3
        border-2 border-gray-800
      "
    >
      <NavbarItem label="Home" />
      <NavbarItem label="Series" />
      <NavbarItem label="Films" />
      <NavbarItem label="New & Popular" />
      <NavbarItem label="My List" />
      <NavbarItem label="Browse by Languages" />
    </div>
  );
};

export default MobileMenu;
