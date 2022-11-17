import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Facility, Park } from "../pages";

type Props = {
  facilities: [Facility];
  parks: [Park];
  setIsTypeaheadShown: Dispatch<SetStateAction<boolean>>;
};

function SearchTypeahead({ facilities, parks, setIsTypeaheadShown }: Props) {
  console.log({ facilities, parks });

  const [suggestions, setSuggestions] = useState<
    { name: string; id: number; parkName: string | undefined }[] | undefined
  >();

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let suggestions;
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);

      const filteredFacilities = facilities
        .map((facility) => {
          const park = parks.find(
            (park) => park["place-id"] === facility["origin-place-id"]
          );
          const parkName = park != null ? park.name : undefined;

          return {
            name: facility.name,
            id: facility["origin-facility-id"],
            parkName,
          };
        })
        .filter((facility) => {
          return (
            regex.test(facility.name) || regex.test(facility.parkName ?? "")
          );
        });

      suggestions = filteredFacilities;
    }

    setSuggestions(suggestions);
  };

  const renderSuggestions = () => {
    if (suggestions != null && suggestions.length > 0) {
      setIsTypeaheadShown(true);
      return (
        <ul>
          {suggestions.map((suggestion, i) => {
            if (i < 10) {
              return (
                <Link key={suggestion.id} href={`/campground/${suggestion.id}`}>
                  <div className="py-2">
                    <h1 className="font-bold text-lg">{suggestion.name}</h1>
                    <h2 className="text-sm">{suggestion.parkName}</h2>
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
      <div className="border-4 border-white h-full rounded-full">
        <input
          className="w-full h-10 pl-2 rounded-full"
          type="text"
          id="typeahead"
          placeholder="What campground or park would you like to stay at?"
          onChange={onTextChange}
        />
      </div>
      <div className="transform ease-in-out">{renderSuggestions()}</div>
    </div>
  );
}

export default SearchTypeahead;
