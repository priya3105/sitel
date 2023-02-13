import React, { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/fetchWeather";
import { fetchWeatherData } from "./../../api/weather";
import { useClickOutside } from "./../../hooks/useClickOutside";
import {
  LocationButton,
  LocationIcon,
  SearchElement,
  SearchIcon,
  SearchInput,
} from "./styled";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);
   
    fetchWeatherData(searchTerm).then((res) => {
      console.log(res, "res in the new data");
      setSuggestions(res.main);
    });
  }, [searchTerm]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <SearchElement>
        <SearchIcon />
        <DebounceInput
          element={SearchInput}
          debounceTimeout={300}
          onChange={onSearchInputChanged}
          placeholder="Search for location"
        />
        <LocationButton>
          <LocationIcon />
        </LocationButton>
      </SearchElement>
      {showSuggestions && (
        <>
          <p> temp ----{suggestions.temp}</p>
          <p className="my--5">pressure ------{suggestions.pressure}</p>
        </>
      )}
    </>
  );
};

export default Search;
