import React from "react";
import { Suspense } from "react";

import Nav from "@/components/nav";
// import Sidebar from '@/components/sidebar';
import Profile from "@/components/profile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
