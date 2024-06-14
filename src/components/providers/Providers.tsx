"use client";

import React, { ReactNode } from "react";
import ReduxProvider from "./redux-provider";
import TanstackQueryProvider from "./tanstack-query-provider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <TanstackQueryProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </TanstackQueryProvider>
    </SessionProvider>
  );
};

export default Providers;
