// @/components/Layout/Sidebar.js
import { signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Sidebar({ show, setter }: any) {
  const { data: session } = useSession();
  const user = session?.user;
  const className =
    "bg-white w-[300px] transition-[margin-left] ease-in-out duration-500 fixed lg:static top-0 bottom-0 left-0 z-40 text-black h-screen";
  const appendClass = show ? " ml-0" : " ml-[-300px] lg:ml-0";

  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-white/50 z-30`}
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="h-full w-full">
          <div className="h-1/3 flex flex-col items-center justify-center ">
            <Avatar className="w-[150px] h-[150px] mb-3">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="ensAvatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <ConnectWallet />
          </div>
          <div className="h-1/3 flex items-center justify-center">
            <svg
              width="45px"
              height="70px"
              version="1.1"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 784.37 1277.39"
            >
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <g id="_1421394342400">
                  <g>
                    <polygon
                      fill="#343434"
                      fillRule="nonzero"
                      points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                    />
                    <polygon
                      fill="#8C8C8C"
                      fillRule="nonzero"
                      points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                    />
                    <polygon
                      fill="#3C3C3B"
                      fillRule="nonzero"
                      points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                    />
                    <polygon
                      fill="#8C8C8C"
                      fillRule="nonzero"
                      points="392.07,1277.38 392.07,956.52 -0,724.89 "
                    />
                    <polygon
                      fill="#141414"
                      fillRule="nonzero"
                      points="392.07,882.29 784.13,650.54 392.07,472.33 "
                    />
                    <polygon
                      fill="#393939"
                      fillRule="nonzero"
                      points="0,650.54 392.07,882.29 392.07,472.33 "
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className="text-lg ml-1">
              <span className="text-3xl font-sans font-bold">Dex</span>{" "}
              Dashboard
            </span>
          </div>
          <div className="h-1/3 flex items-end justify-center pb-8">
            {user && (
              <Button className="text-white mx-8" onClick={() => signOut()}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
