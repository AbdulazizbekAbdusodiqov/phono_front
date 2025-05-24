import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../layout/Header/Navbar";
import Footer from "../layout/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
