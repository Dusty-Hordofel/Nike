"use client";

import AdminNavigation from "./admin-navbar";
import { adminNavLinksData } from "./data/admin-navlinks-data";
import Sidebar from "./Sidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[90%] mx-auto flex flex-col min-h-screen">
      <AdminNavigation navLinks={adminNavLinksData} />
      {/* <Sidebar /> */}
      <div className="">{children}</div>
    </div>
  );
}
