import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <div className="flex justify-between">
        <h2 className="text-blue-900">
          Hello! <b>{session?.user?.name}</b>
        </h2>

        <div className="bg-gray-300 flex items-center rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="User" className="w-10 h-10" />
          <span className="text-black px-1 py-2">{session?.user?.name}</span>
        </div>
      </div>
    </main>
  );
}
