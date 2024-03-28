"use client";

import { useSession } from "next-auth/react";

export default function Index() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      {!user && <span>No</span>}
    </>
  );
}
