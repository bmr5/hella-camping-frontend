import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AlertCard from "./AlertCard";
import CheckListCard from "./CheckListCard";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, RangeKeyDict } from "react-date-range";
import {
  customDayContent,
  getDisabledDates,
} from "../calendar_utils/CalendarUtils";
import { Park } from "../pages";
import nonNullable from "../hooks/nonNullable";

type Props = {
  park: Park;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

type Range = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
};

function CreateAlertModal({ park, setShowModal }: Props) {
  const mountedStyle = { animation: "inAnimation 500ms ease-in" };
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

  const facilityNames = (park?.facilities ?? [])
    .map((facility) => {
      if (facility.name != null) {
        return facility.name;
      }
    })
    .filter(nonNullable);

  const onClose = () => {
    setShowModal(false);
  };

  // close on escape key
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });
  }, []);

  return (
    <div
      style={mountedStyle}
      className="fixed overflow-scroll z-10 left-0 top-36 right-0 bottom-0 flex items-center flex-col "
      onClick={onClose}
    >
      <form
        className="h-fit w-4/5 border rounded-lg flex items-center justify-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" text-white bg-yellow-500 w-full h-20 flex items-center justify-center">
          <h1 className="font-extrabold text-3xl">
            {park?.name ?? "Park Name"}
          </h1>
        </div>

        <CheckListCard
          facilityNames={facilityNames}
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
          <div className="border-r pr-5 w-1/2 h-14">Length of Stay</div>
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
          facilityNames={facilityNames}
          cardText={
            <>
              <h1 className="font-bold pb-2">Filters</h1>
              <p>
                What type of campsite can you stay at? We recommend selecting
                all types, however if you have specific needs, you can filter
                your request here.
              </p>
            </>
          }
        />
        <div className="bg-white flex flex-row justify-center p-5 border shadow-md gap-5 w-full">
          <button className="w-1/2 h-14 border rounded bg-green-500 transition duration-300 hover:bg-green-600">
            <h2 className="font-bold text-lg">Create Alert</h2>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAlertModal;
