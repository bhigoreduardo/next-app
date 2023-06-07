import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/widgets/Layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
