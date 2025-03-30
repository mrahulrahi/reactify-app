"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { disableBackButton } from "../../lib/formatHeading";

export default function LogoutButton() {
   const router = useRouter();

   return (
      <button
         className="bg-transparent border-0"
         onClick={async () => {
            await signOut({
               redirect: false,
            });
            localStorage.clear();
            disableBackButton()
            router.push("/auth/signin");
            router.refresh();
         }}
      >
         Logout
      </button>
   );
}
