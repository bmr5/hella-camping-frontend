import React from "react";
import Header from "../components/Header";
import FooterPageLayouts from "../components/FooterPageLayouts";

function FAQ() {
  return (
    <FooterPageLayouts>
      <h1 className="font-bold">Who are we?</h1>
      <p>
        Just two unemployed software engineers, Ben and Conner, built this from
        Conner's garage in the Bay Area. We’re both active and love going on
        adventures and camping in the great outdoors.
      </p>
      <h1 className="font-bold">Why did you make HellaCamping?</h1>
      <p>
        Conner always complained about how hard it was to book nice campsites
        around the bay area because bots were always taking the reservations and
        he always had to check if one opened up. So we decided to create an
        automated system to let us know when sites opened up and that's how
        HellaCamping was born!
      </p>
      <h1 className="font-bold">How does it work?</h1>
      <p>
        Once you create an account and provide your email, phone number, or both
        then you can create a notification request at specific Parks and
        Campsites. Once a campsite becomes open at your requested location and
        within your date range you will recieve a notification at the contact
        information you specified.
      </p>
      <h1 className="font-bold">Do you control the reservations?</h1>
      <p>
        Nope! We have no control over the government booking websites, we just
        let you know when one becomes available!
      </p>
    </FooterPageLayouts>
  );
}

export default FAQ;
