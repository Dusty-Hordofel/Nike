// import { auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";
// import ClientProviders from "./client-providers";

// export default async function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();
//   console.log("🚀 ~ session:", session);

//   return (
//     <SessionProvider session={session}>
//       <ClientProviders>{children}</ClientProviders>
//     </SessionProvider>
//   );
// }

// import React from 'react'

// type Props = {}

// const Providers = async ({ children }: { children: React.ReactNode }) => {
//   const session = await auth();
//   console.log("🚀 ~ session:", session);
//   return (
//     <SessionProvider session={session}>
//       <ClientProviders>{children}</ClientProviders>
//     </SessionProvider>
//   );
// };

// export default Providers;

import React from "react";

type Props = {};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Providers;
