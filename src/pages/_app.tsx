import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Qanst</title>
        <meta
          name="description"
          content="Empowering Curiosity, Connecting Minds. Create insightful forms, spark meaningful conversations, and explore a world of knowledge. Ask, Answer, Learn – Your platform for collaborative inquiry and shared wisdom"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
