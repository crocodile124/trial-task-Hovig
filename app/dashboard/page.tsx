"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <section className="bg-ct-blue-600 min-h-screen">
      {user && (
        <>
          <div className="login relative">
            <div className="text-[100px] w-full h-96 text-center flex items-center justify-center">
              <button
                className="bg-none text-black cursor-pointer text-lg ml-4 border border-pink-500 px-5 py-3 rounded-lg"
                // onClick={_connectToMetaMask}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
