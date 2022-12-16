import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Park } from "../pages";
import { nameWithNoSpaces } from "../hooks/nameTransformUtils";

type Props = {
  parks: [Park];
  setIsTypeaheadShown: Dispatch<SetStateAction<boolean>>;
};

function SearchTypeahead({ parks, setIsTypeaheadShown }: Props) {
  const [suggestedParks, setSuggestedParks] = useState<Park[] | undefined>();

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filteredParks;
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, `gi`);
      filteredParks = parks.filter((park) => {
        if (park?.name?.match(regex)) {
          return park;
        }
      });
    }

    setSuggestedParks(filteredParks);
  };

  const renderSuggestions = () => {
    if (suggestedParks != null && suggestedParks.length > 0) {
      setIsTypeaheadShown(true);
      return (
        <ul>
          {suggestedParks.map((park, i) => {
            if (i < 10) {
              return (
                <Link
                  key={park.id}
                  href={`/parks/${park.id}?name=${nameWithNoSpaces(park.name)}`}
                >
                  <div className="py-2">
                    <h1 className="font-bold text-lg">{park.name}</h1>
                  </div>
                </Link>
              );
            }
          })}
        </ul>
      );
    }
    setIsTypeaheadShown(false);
  };

  return (
    <div className="w-4/5 xl:w-3/5 pb-8">
      <div className="border h-full rounded-full">
        <input
          className="w-full h-12 pl-4 rounded-full"
          type="text"
          id="typeahead"
          placeholder="What park would you like to visit?"
          onChange={onTextChange}
        />
      </div>
      <div className="transform ease-in-out">{renderSuggestions()}</div>
    </div>
  );
}

export default SearchTypeahead;
