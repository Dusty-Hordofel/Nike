import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import { helvetica } from "@/assets/fonts/helvetica/helvetica";
// import Providers from "@/components/providers/providers";
import ClientOnly from "@/components/ui/client-only";
import Providers from "@/components/providers/providers";
import MyComponent from "@/components/providers/MyComponent";
// import Providers from "@/components/providers/providers";
// import Providers from "@/components/providers/providers";
// import Providers from "@/components/providers/providers";
// import dynamic from "next/dynamic";
// import { DeliveryProvider } from "@/context/checkout/delivery-context";
// import { getUserActiveAdress } from "@/actions/address/user-address.actions";
// import { auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helvetica.className} max-w-[1924px]`}>
        {/* <Providers>
          <ClientOnly> */}
        <MyComponent>{children}</MyComponent>
        {/* </ClientOnly>
        </Providers> */}
      </body>
    </html>
  );
}
