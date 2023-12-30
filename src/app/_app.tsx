import type {AppProps} from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
function myApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      <Navbar />

      <Component {...pageProps} />

    </SessionProvider>
  );
}

export default myApp;