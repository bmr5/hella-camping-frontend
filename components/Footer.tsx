import Link from "next/link";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
function Footer() {
  const { height } = useWindowDimensions();
  const [footerPosition, setFooterPosition] = useState(12);
  useEffect(() => {
    setFooterPosition(height);
  }, [height]);

  return (
    <div
      className={`position absolute w-full bottom-0 flex flex-row-reverse justify-between px-10 xl:px-20`}
    >
      <div className="flex flex-row gap-x-2">
        <Link href="Privacy">Privacy Policy</Link>
        <Link href="Terms">Terms</Link>
        <Link href="Support">Support</Link>
      </div>
    </div>
  );
}

export default Footer;
