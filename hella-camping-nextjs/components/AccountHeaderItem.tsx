import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

function AccountHeaderItem() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (!session) {
    return (
      <div className="group flex w-12 cursor-pointer flex-col items-center  sm:w-20 text-white">
        <UserIcon
          className="mb-1 h-8 group-hover:animate-bounce"
          onClick={() => signIn()}
        />
        <p className="tracking-widest opacity-0 group-hover:opacity-100">
          Login
        </p>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="group flex w-12 cursor-pointer flex-col items-end  sm:w-20 text-white">
        <UserIcon
          className="mb-1 h-8 group-hover:animate-bounce"
          onClick={() => signIn()}
        />
      </div>

      {showMenu && (
        <div className=" px-3 flex flex-col absolute top-20 right-4 bg-green-800 border-gray-600 rounded text-white">
          <Link className="pt-2" href="/Account">
            <p>My Account</p>
          </Link>
          <button className="pt-2" onClick={() => signOut()}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountHeaderItem;
