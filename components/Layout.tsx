import React from "react";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col bg-neutral-200">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
