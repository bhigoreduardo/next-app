import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";

function Layout({ children }) {
  const { data: session } = useSession();
  const [showSidebar, setShowSidebar] = useState(false);

  if (!session)
    return (
      <section className="flex items-center bg-blue-900 w-screen h-screen">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="p-2 px-4 bg-white rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </section>
    );

  return (
    <section className="min-h-screen bg-blue-900 flex">
      <Sidebar showSidebar={showSidebar} />

      <div className="bg-white flex-grow m-2 md:ml-0 rounded-lg p-4">
        <div className="flex gap-2 mb-2 p-4 md:hidden">
          <button onClick={() => setShowSidebar(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <div className="flex items-center justify-center flex-grow mr-6">
            <Logo />
          </div>
        </div>
        <section>{children}</section>
      </div>
    </section>
  );
}

export default Layout;
