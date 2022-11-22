import React, { Children, useState } from "react";
import AlertCard from "./AlertCard";

type Props = {
  cardText: JSX.Element;
};

function CheckListCard({ cardText }: Props) {
  const [selection, setSelection] = useState<JSX.Element[]>([]);
  const handleCheck = (event: any) => {
    let updatedList = [...selection];
    if (event.target.checked) {
      updatedList = [...selection, event.target.value];
    } else {
      updatedList.splice(selection.indexOf(event.target.value), 1);
    }
    setSelection(updatedList);
  };

  const getCampgroundChecklist = (campgrounds: []) => {
    let tempArr = [];
    for (let i = 0; i < 4; i++) {
      tempArr.push(
        <div className="flex gap-2">
          <input
            type="checkbox"
            id={`campground${i}`}
            name={`campground${i}`}
            value={`campground${i}`}
            onChange={handleCheck}
          />
          <label htmlFor="{`campground${i}`}">{`Campground ${i}`}</label>
        </div>
      );
    }
    return tempArr;
  };

  return (
    <AlertCard>
      <div className="border-r pr-5 w-1/2">{cardText}</div>
      <div className="flex flex-col items-center justify-center w-1/2">
        {getCampgroundChecklist([])}
      </div>
    </AlertCard>
  );
}

export default CheckListCard;
