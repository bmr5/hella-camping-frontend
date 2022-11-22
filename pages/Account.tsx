import React, { useState } from "react";
import AccountAlerts from "../account-page-views/AccountAlerts";
import AccountSettings from "../account-page-views/AccountSettings";
import AccountBilling from "../account-page-views/AccountBilling";

enum Views {
  SETTINGS = "Settings",
  ALERTS = "Alerts",
  BILLING = "Billing",
}

function Account() {
  const [currentViewSelection, setCurrentViewSelection] = useState<Views>(
    Views.SETTINGS
  );

  let currView;
  switch (currentViewSelection) {
    case Views.SETTINGS:
      currView = <AccountSettings />;
      break;
    case Views.ALERTS:
      currView = <AccountAlerts />;
      break;
    case Views.BILLING:
      currView = <AccountBilling />;
      break;
    default:
      currView = <AccountSettings />;
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/4 border-r-2 bg-neutral-100 flex flex-col pt-5">
        <button onClick={() => setCurrentViewSelection(Views.SETTINGS)}>
          {Views.SETTINGS}
        </button>
        <button onClick={() => setCurrentViewSelection(Views.ALERTS)}>
          {Views.ALERTS}
        </button>
        <button onClick={() => setCurrentViewSelection(Views.BILLING)}>
          {Views.BILLING}
        </button>
      </div>

      <div className="w-full flex flex-col items-center bg-neutral-50">
        {currView}
      </div>
    </div>
  );
}

export default Account;
