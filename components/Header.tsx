import React from "react";
import HeaderItem from "./HeaderItem";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AccountHeaderItem from "./AccountHeaderItem";

function Header() {
  return (
    <header className="p-5 pt-7 flex flex-row justify-between bg-emerald-700">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-extrabold text-white">HellaCamping</h1>
        </Link>
      </div>
      <div className="flex flex-grow justify-end">
        <HeaderItem title="FAQ" Icon={BriefcaseIcon} />
        <AccountHeaderItem />
      </div>
    </header>
  );
}

export default Header;
