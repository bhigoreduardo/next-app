import { CartContextProvider } from "@/store/CartContext";
import Header from "@/widgets/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
