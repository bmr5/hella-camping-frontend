import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full h-12 bottom-0 flex flex-row justify-between p-4">
      <div></div>
      <div className="flex flex-row gap-x-2">
        <Link href="Privacy">Privacy Policy</Link>
        <Link href="Terms">Terms</Link>
        <Link href="Support">Support</Link>
      </div>
    </div>
  );
}

export default Footer;
