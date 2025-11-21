import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/GlobalStyle";
import Layout from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";
import { ReactQueryProvider } from "@/lib/react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ReactQueryProvider>
        <CartProvider>
          <Layout>
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </Layout>
        </CartProvider>
      </ReactQueryProvider>
    </>
  );
}
