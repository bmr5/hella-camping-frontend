import Link from "next/link";
import React, { useState } from "react";
import { Campground } from "../pages";

type Props = {
  campgrounds: [Campground];
};

function SearchTypeahead({ campgrounds }: Props) {
  const [suggestions, setSuggestions] = useState<
    { name: string; id: number }[] | undefined
  >();

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let suggestions;
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      const filteredCampGrounds = campgrounds.map((cg) => {
        return { name: cg.name, id: cg["place-id"] };
      });
      suggestions = filteredCampGrounds
        .sort()
        .filter((cg) => regex.test(cg.name));
    }

    setSuggestions(suggestions);
  };

  const renderSuggestions = () => {
    if (suggestions != null && suggestions.length > 0) {
      return (
        <ul>
          {suggestions.map((suggestion) => (
            <Link key={suggestion.id} href={`/campground/${suggestion.id}`}>
              {suggestion.name}
            </Link>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="mb-10 border border-black w-1/2">
      <input
        className="w-full"
        type="text"
        id="typeahead"
        placeholder="What campground would you like to stay at?"
        onChange={onTextChange}
      />
      {renderSuggestions()}
    </div>
  );
}

export default SearchTypeahead;
