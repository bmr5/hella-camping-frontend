import React from "react";
import HeaderItem from "./HeaderItem";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Header() {
  return (
    <header className="p-5 pt-8 flex h-auto flex-row justify-between bg-green-500">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-extrabold">Hella Camping</h1>
        </Link>
      </div>
      <div className="flex flex-grow justify-end">
        <HeaderItem title="FAQ" Icon={BriefcaseIcon} />
        <HeaderItem title="Account" Icon={UserIcon} />
      </div>
    </header>
  );
}

export default Header;
