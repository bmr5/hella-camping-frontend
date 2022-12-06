import React, { useState } from "react";
import AccountAlerts from "../account-page-views/AccountAlerts";
import AccountSettings from "../account-page-views/AccountSettings";
import AccountBilling from "../account-page-views/AccountBilling";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

enum Views {
  SETTINGS = "Settings",
  ALERTS = "Alerts",
  BILLING = "Billing",
}

function Account() {
  const { data: session } = useSession();
  const [currentViewSelection, setCurrentViewSelection] = useState<Views>(
    Views.SETTINGS
  );

  if (session != null) {
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
        <div className="w-1/4 border-r-2 bg-neutral-100 flex flex-col pt-5 font-semibold text-xl gap-5">
          <button
            onClick={() => setCurrentViewSelection(Views.SETTINGS)}
            className="hover:underline"
          >
            {Views.SETTINGS}
          </button>
          <button
            onClick={() => setCurrentViewSelection(Views.ALERTS)}
            className="hover:underline"
          >
            {Views.ALERTS}
          </button>
          <button
            onClick={() => setCurrentViewSelection(Views.BILLING)}
            className="hover:underline"
          >
            {Views.BILLING}
          </button>
        </div>

        <div className="w-full flex flex-col items-center bg-neutral-50">
          {currView}
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-2xl font-extrabold">
        Please login to use this page.
      </h1>
    </div>
  );
}

export default Account;
