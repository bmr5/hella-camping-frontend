import React from "react";

function AlertCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-3/4 flex flex-row justify-between p-5 border shadow-md gap-5">
      {children}
    </div>
  );
}

export default AlertCard;
