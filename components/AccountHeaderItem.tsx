import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

function AccountHeaderItem() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <Link
      href={isLoggedIn ? "/Account" : ""}
      className="group flex items-center w-12 cursor-pointer flex-col sm:w-20 text-white"
    >
      <UserIcon
        className="mb-1 h-8 group-hover:animate-bounce"
        onClick={isLoggedIn ? () => {} : () => signIn("cognito")}
      />
      <p className="opacity-0 group-hover:opacity-100">
        {isLoggedIn ? "Account" : "Login"}
      </p>
    </Link>
  );
}

export default AccountHeaderItem;
