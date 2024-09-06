import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api, createTRPCClient } from "~/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from 'next/font/google'

import "~/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();
  const trpcClient = createTRPCClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          <div className={`${inter.className} dark`}>
            <Component {...pageProps} />
          </div>
        </api.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;