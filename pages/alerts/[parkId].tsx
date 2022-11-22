import React, { ChangeEvent, useState } from "react";
import { GetStaticProps } from "next";
import { Park } from "..";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, RangeKeyDict } from "react-date-range";
import {
  customDayContent,
  getDisabledDates,
} from "../../calendar_utils/CalendarUtils";
import AlertCard from "../../components/AlertCard";
import CheckListCard from "../../components/CheckListCard";

type Props = {
  park: Park;
};

type Range = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
};

function Alerts({ park }: Props) {
  const [selectedRanges, setSelectedRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  const handleSelect = (rangesByKey: RangeKeyDict) => {
    const { startDate, endDate, key } = rangesByKey.selection;
    setSelectedRanges([{ startDate, endDate, key }]);
  };

  return (
    <div className="flex flex-col gap-5 items-center pt-5">
      <div className="border rounded-lg bg-black text-white w-3/4 h-20 flex items-center justify-center">
        <h1 className="font-extrabold text-3xl">Park Name</h1>
      </div>
      <CheckListCard
        cardText={
          <>
            <h1 className="font-bold pb-2">Campgrounds</h1>
            <p>
              What campgrounds do you want to be notified for inside the park?
              You will be notified for availabilities for each selected
              campground.
            </p>
          </>
        }
      />
      <AlertCard>
        <div className="border-r pr-5 w-1/2">
          <h1 className="font-bold pb-2">Arrival Dates</h1>
          <p>
            Use the calendar to select which dates you would like to receive
            notifications for.
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <DateRange
            editableDateInputs={true}
            minDate={new Date()}
            color={"#166534"}
            onChange={handleSelect}
            dayContentRenderer={customDayContent}
            disabledDates={[]}
            ranges={selectedRanges}
          />
        </div>
      </AlertCard>
      <AlertCard>
        <div className="border-r pr-5 w-1/2">Length of Stay</div>
        <div className="flex items-center justify-center w-1/2">
          <input
            type="number"
            min="1"
            className="text-center border bg-neutral-100 rounded-md w-2/3"
            placeholder="1-14 nights"
          />
        </div>
      </AlertCard>
      <CheckListCard
        cardText={
          <>
            <h1 className="font-bold pb-2">Filters</h1>
            <p>
              What type of campsite can you stay at? We recommend selecting all
              types, however if you have specific needs, you can filter your
              request here.
            </p>
          </>
        }
      />
      <button className="h-20 border bg-green-300 w-3/4 rounded-lg mb-10">
        Create Alert
      </button>
    </div>
  );
}

export default Alerts;

export const getStaticPaths = async () => {
  const parks: [Park] = await fetch("https://dev.hellacamping.in/parks").then(
    (res) => res.json()
  );

  const paths = parks.map((park) => {
    return {
      params: {
        parkId: String(park["place-id"]),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const parkId = context.params?.parkId;
  const park: [Park] = await fetch(
    `https://dev.hellacamping.in/parks/parkId`
  ).then((res) => res.json());

  return {
    props: {
      park,
    },
  };
};
