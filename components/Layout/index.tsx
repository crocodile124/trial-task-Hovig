// @/components/Layout/index.js
import React, { useState } from "react";
import { useObserver } from "mobx-react";
import Sidebar from "./Sidebar";
import { MyTable } from "../DataTable";
import connectStore from "../store/connect.store";

export default function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return useObserver(() => {
    return (
      <div className="h-screen bg-[#E7EBF6]">
        <div className="flex">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            <MyTable setter={setShowSidebar} isConnected={connectStore.connect} />
          </div>
        </div>
      </div>
    )
  });
}
