import React from "react";
import FooterPageLayouts from "../components/FooterPageLayouts";

function Support() {
  return (
    <FooterPageLayouts>
      <h1 className="font-bold text-3xl pb-10 text-center">
        CONTACT HELLACAMPING
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          Shoot us an email at hello@hellacamping.com and we'll do our best to
          respond ASAP.
        </p>
      </div>
    </FooterPageLayouts>
  );
}

export default Support;
