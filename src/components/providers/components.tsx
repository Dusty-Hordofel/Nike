import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import ClientProviders from "./client-providers";

export default async function Components({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("🚀 ~ session:", session);
  return (
    <SessionProvider session={session}>
      <ClientProviders>{children}</ClientProviders>
    </SessionProvider>
  );
}
