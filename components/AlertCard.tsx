import React from "react";

function AlertCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-3/4 bg-white flex flex-row justify-between p-5 border rounded-lg shadow-md gap-5">
      {children}
    </div>
  );
}

export default AlertCard;
