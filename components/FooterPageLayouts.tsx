import React from "react";

type Props = {
  children: React.ReactNode;
};

function FooterPageLayouts({ children }: Props) {
  return (
    <div className="flex flex-col items-center my-20">
      <div className="w-3/4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default FooterPageLayouts;
