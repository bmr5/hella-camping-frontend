import type { Range } from "../calendar_utils/CalendarUtils";
import type { Park } from "../pages";

import React, { useState, useCallback } from "react";
import {
  customDayContent,
  getDisabledDates,
} from "../calendar_utils/CalendarUtils";
import AlertCard from "./AlertCard";
import CheckListCard from "./CheckListCard";
import { DateRange, RangeKeyDict } from "react-date-range";
import SubmitAlertButton from "./SubmitAlertButton";
import validateSubmitData from "../hooks/validateSubmitData";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
  park: Park;
};

function AlertForm({ park }: Props) {
  const { data: session } = useSession();
  const [selectedRanges, setSelectedRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [selectedCampgrounds, setSelectedCampgrounds] = useState<number[]>([]);
  const [stayLength, setStayLength] = useState<number>();
  const router = useRouter();

  const handleSelect = (rangesByKey: RangeKeyDict) => {
    const { startDate, endDate, key } = rangesByKey.selection;
    setSelectedRanges([{ startDate, endDate, key }]);
  };

  const onSubmit = useCallback(() => {
    const submitData = validateSubmitData({
      session,
      parkID: park.id,
      stayLength,
      campgroundIDs: selectedCampgrounds,
      dateRange: selectedRanges[0],
    });

    if (submitData != null) {
      console.log({ submitData });
      // submit mutation to apollo with the data

      // redirect to home on success
      router.push("/");
    }
  }, [park, stayLength, selectedCampgrounds, selectedRanges, session]);

  return (
    <>
      <CheckListCard
        selection={selectedCampgrounds}
        setSelection={setSelectedCampgrounds}
        facilities={park.facilities ?? []}
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
            onChange={(e) => setStayLength(Number(e.target?.value))}
          />
        </div>
      </AlertCard>
      <SubmitAlertButton onSubmit={onSubmit} />
    </>
  );
}

export default AlertForm;
