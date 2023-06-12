/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";
import React from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

type AccountMenuPropsProps = {
  visible?: boolean;
};

const AccountMenu: React.FC<AccountMenuPropsProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();

  if (!visible) return null;

  return (
    <div
      className="
      absolute top-14 right-2
      flex flex-col gap-4
      bg-black w-56 py-5
      border-2 border-gray-800
    "
    >
      <button
        type="button"
        className="
        flex flex-row gap-3 items-center justify-center
        w-full px-3 group/item
      "
      >
        <img
          className="w-6 h-6 rounded-md"
          src="/images/default-blue.png"
          alt="Profile"
        />
        <p className="text-white text-sm group-hover/item:underline">
          {user?.name}
        </p>
      </button>

      <button
        type="button"
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </button>
    </div>
  );
};

export default AccountMenu;
