// @/components/Layout/index.js
import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import MenuBarMobile from "./MenuBarMobile";
import { MyTable } from "../table/table";

export default function Layout({ children }: any) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen bg-[#E7EBF6]">
      <div className="flex">
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
          {/* <MenuBarMobile setter={setShowSidebar} /> */}
          <MyTable setter={setShowSidebar} />
        </div>
      </div>
    </div>
  );
}
