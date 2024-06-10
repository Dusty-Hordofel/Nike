"use client";
import React, { ReactNode } from "react";
import ReduxProvider from "./redux-provider";
import TanstackQueryProvider from "./tanstack-query-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackQueryProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
