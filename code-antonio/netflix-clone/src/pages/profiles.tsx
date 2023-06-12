/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import UserCard from "@/components/UserCard";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <main className="flex items-center min-h-screen justify-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-white text-3xl md:text-6xl text-center">
          Who&#39;s watching?
        </h1>

        <div className="flex items-center justify-center gap-8 mt-10">
          <UserCard name={user?.name} onClick={selectProfile} />
        </div>
      </div>
    </main>
  );
};

export default profiles;
