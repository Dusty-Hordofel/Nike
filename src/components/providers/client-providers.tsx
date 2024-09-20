"use client";
import { FileProvider } from "@/context/file/file-context";
import ModalProvider from "../../context/modal/modal-context";
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
        <ModalProvider>
          <FileProvider>{children}</FileProvider>
        </ModalProvider>
      </ReduxProvider>
    </TanstackQueryProvider>
  );
}
