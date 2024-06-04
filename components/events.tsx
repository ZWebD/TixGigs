"use client";

import { getDataOnServer, Data } from "@/actions/getDataOnServer";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Event from "./event";
import Search from "@/components/search";
import SearchBar from "./searchBar";

// type Data = [
//   {
//     name: string;
//     url: string;
//     promoter: string;
//     images: [
//       {
//         ratio: string;
//         url: string;
//         width: number;
//         height: number;
//         fallback: boolean;
//       }
//     ];
//   }
// ];

// Need to separate searching for name suggestion!

const Events = () => {
  const [data, setData] = useState<Data>(),
    [error, setError] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [isError, setIsError] = useState(false),
    [searchValue, setSearchValue] = useState("");

  const getData = useCallback(async () => {
    setIsLoading(true);
    const { data, isError, error } = await getDataOnServer(searchValue);
    setIsLoading(false);
    if (!isError) {
      setData(data);
      setError("");
      setIsError(false);
    } else {
      setIsError(isError);
      setError(error);
    }
  }, [setData, setError, setIsError, searchValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  //--------------------------------------------

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <section>
      <>
        <div>
          {/* <SearchBar onSearch={handleSearch} /> */}
          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading ? (
          <p className="text-3xl my-[10%] font-black">Loading...</p>
        ) : null}
        {error ? console.log(error) : null}
        {isError ? (
          <p className="text-3xl my-[10%] font-black">{`There is no search result for "${searchValue}"`}</p>
        ) : (
          ``
        )}
        {data ? (
          <div className="mt-[20%]">
            <h2 className=" text-3xl mb-[10%] font-black">
              {!searchValue
                ? `Upcoming Events`
                : `Results for "${searchValue}"`}
            </h2>
            <span className="flex flex-col sm:flex-row flex-wrap lg:max-w-[85%] mx-auto">
              {data?.map((event, n) => (
                <section
                  id={`event_${n}`}
                  key={n}
                  className="relative mb-[10%] w-full md:w-1/2 md:odd:last:m-auto odd:last:pr-0 md:odd:pr-3 md:even:pl-3"
                >
                  <Event event={event} />
                </section>
              ))}
            </span>
          </div>
        ) : null}
      </>
    </section>
  );
};

export default Events;
