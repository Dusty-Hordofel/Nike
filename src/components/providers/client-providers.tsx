"use client";
import { FileProvider } from "@/context/file/file.context";
import ModalProvider from "../../context/modal/modal.context";
import ReduxProvider from "./redux-provider";
import TanstackQueryProvider from "./tanstack-query-provider";
import { CartProvider } from "@/context/cart/cart.context";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackQueryProvider>
      <ReduxProvider>
        <CartProvider>
          <ModalProvider>
            <FileProvider>{children}</FileProvider>
          </ModalProvider>
        </CartProvider>
      </ReduxProvider>
    </TanstackQueryProvider>
  );
}
