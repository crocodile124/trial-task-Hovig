// @/components/Layout/MenuBarMobile.js
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function MenuBarMobile({ setter }: any) {
  return (
    <nav className="z-20 h-[60px] bg-gray-700 flex items-center justify-between w-full">
      <ul className="text-white text-lg flex items-center justify-between w-[300px] mx-5">
        <li className="md:hidden">
          <Button
            className="text-4xl flex text-white bg-none m-0"
            onClick={() => {
              setter((oldVal: any) => !oldVal);
            }}
          >
            <svg viewBox="0 0 48 48" width="30px" height="30px">
              <linearGradient
                id="EIPc0qTNCX0EujYwtxKaXa"
                x1="12.066"
                x2="34.891"
                y1=".066"
                y2="22.891"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".237" stopColor="#3bc9f3" />
                <stop offset=".85" stopColor="#1591d8" />
              </linearGradient>
              <path
                fill="url(#EIPc0qTNCX0EujYwtxKaXa)"
                d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"
              />
              <linearGradient
                id="EIPc0qTNCX0EujYwtxKaXb"
                x1="12.066"
                x2="34.891"
                y1="12.066"
                y2="34.891"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".237" stopColor="#3bc9f3" />
                <stop offset=".85" stopColor="#1591d8" />
              </linearGradient>
              <path
                fill="url(#EIPc0qTNCX0EujYwtxKaXb)"
                d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"
              />
              <linearGradient
                id="EIPc0qTNCX0EujYwtxKaXc"
                x1="12.066"
                x2="34.891"
                y1="24.066"
                y2="46.891"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".237" stopColor="#3bc9f3" />
                <stop offset=".85" stopColor="#1591d8" />
              </linearGradient>
              <path
                fill="url(#EIPc0qTNCX0EujYwtxKaXc)"
                d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"
              />
            </svg>
          </Button>
        </li>
        <li className="ml-2">All</li>
        <li>Uniswap</li>
        <li>Pancakeswap</li>
      </ul>
    </nav>
  );
}