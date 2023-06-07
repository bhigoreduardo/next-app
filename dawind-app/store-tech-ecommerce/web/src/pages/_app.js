import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContextProvider } from "@/store/CartContext";
import Header from "@/widgets/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}
