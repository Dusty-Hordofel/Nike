"use client";
import ModalProvider from "./modal-provider";
import ReduxProvider from "./redux-provider";
import TanstackQueryProvider from "./tanstack-query-provider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackQueryProvider>
      <ReduxProvider>
        <ModalProvider>{children}</ModalProvider>
      </ReduxProvider>
    </TanstackQueryProvider>
  );
}
