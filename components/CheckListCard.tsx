import type { Facility } from "../pages";

import React, { Dispatch, SetStateAction } from "react";
import AlertCard from "./AlertCard";

type Props = {
  cardText: JSX.Element;
  facilities: Facility[];
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
};

function CheckListCard({
  cardText,
  facilities,
  selection,
  setSelection,
}: Props) {
  const handleCheck = (event: any) => {
    let updatedList = [...selection];
    if (event.target.checked) {
      updatedList = [...selection, event.target.value];
    } else {
      updatedList.splice(selection.indexOf(event.target.value), 1);
    }
    setSelection(updatedList);
  };

  const campgrounds = facilities.map((facility, i) => {
    const { name, id } = facility;
    return (
      <div className="flex gap-2" key={facility.name}>
        <input
          type="checkbox"
          id={`${id}`}
          name={`${name}`}
          value={`${id}`}
          onChange={handleCheck}
        />
        <label htmlFor={`${name}-${i}`}>{`${name}`}</label>
      </div>
    );
  });

  return (
    <AlertCard>
      <div className="border-r pr-5 w-1/2">{cardText}</div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <ul>{campgrounds}</ul>
      </div>
    </AlertCard>
  );
}

export default CheckListCard;
