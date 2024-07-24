"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getDataOnServer, EventData } from "@/actions/getDataOnServer";

export type SearchProps = {
  onSearch: (value: string) => void;
};

export default function Search(props: SearchProps) {
  const { onSearch } = props;
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const [data, setData] = useState<EventData[]>([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

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
  }, [value]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (value.length > 0 && data.length != 0) {
      setVisible(true);
      const filtered = data
        ?.map((event) => event.name)
        .filter((sug: string) =>
          sug.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filtered);
    } else {
      setVisible(false);
    }
  }, [value, data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setVisible((prev) => !prev);
      onSearch(value);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault();

    const v: any = event.currentTarget.textContent;

    setValue(v);
    setVisible((prev) => !prev);
    onSearch(v);
  };

  return (
    <div className="relative max-lg:w-[85%] max-2xl:w-[75%] 2xl:w-[65%] mx-auto text-gray-600 my-[30%] md:my-[20%]">
      <input
        type="search"
        name="search"
        ref={inputRef}
        placeholder="Enter search..."
        className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => e.target.setAttribute("autoComplete", "off")}
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
      <div
        className={`absolute ${
          !visible ? "hidden" : "visible"
        } z-50 mt-1 w-full p-2 bg-white shadow-2xl rounded-3xl max-h36 overflow-y-auto `}
      >
        {filteredData?.map((event: any, i: any) => (
          <div
            key={i}
            className=" cursor-pointer hover:bg-black hover:bg-opacity-10 p-2 rounded-full"
          >
            <p id={i} onClick={handleClick}>
              {event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
