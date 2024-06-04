"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getDataOnServer, Data } from "@/actions/getDataOnServer";

export type SearchProps = {
  onSearch: (value: string) => void;
};

export default function Search(props: SearchProps) {
  const { onSearch } = props;
  const placeholderValue = `Enter search...`;
  const [value, setValue] = useState(placeholderValue);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
    // console.log(target.value);
    // onSearch(target.value);
    // console.log(suggestionList);
  };

  const [data, setData] = useState<Data>();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  //const suggestionList: string[] = [];

  const getData = useCallback(async () => {
    const { data, isError, error } = await getDataOnServer(value);

    if (!isError) {
      setData(data);
      setError("");
      setIsError(false);
    } else {
      setIsError(isError);
      setError(error);
    }
  }, [setData, setError, setIsError, value]);

  useEffect(() => {
    getData();
  }, [getData]);

  // {
  //   // data?.map((event) => console.log(event.name));
  //   data?.map((event) => suggestionList.push(event.name));
  // }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="max-lg:w-[85%] max-2xl:w-[75%] 2xl:w-[65%] mx-auto text-gray-600 my-[30%] md:my-[20%]">
      <div className="relative ">
        <input
          type="search"
          name="search"
          placeholder={placeholderValue}
          className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none"
          onChange={searchHandler}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="absolute right-0 mt-3 mr-4">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`absolute ${
          !value ? "hidden" : "visible"
        } mt-1 m-auto p-2 bg-white shadow-lg rounded-bl rounded-br max-h36 overflow-y-auto `}
      >
        {data?.map((event, i) => {
          return (
            <div
              key={i}
              className=" cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
            >
              <p>{event.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
