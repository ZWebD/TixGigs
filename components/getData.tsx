"use client";

import { getDataOnServer } from "@/actions/getDataOnServer";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Event from "./event";

type Data = [
  {
    name: string;
    url: string;
    promoter: string;
    images: [
      {
        ratio: string;
        url: string;
        width: number;
        height: number;
        fallback: boolean;
      }
    ];
  }
];

const ClientMyComponent = () => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const { data, isError, error } = await getDataOnServer();
    setIsLoading(false);
    if (!isError) setData(data);
    else {
      setIsError(isError);
      setError(error);
    }
  }, [setData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-row flex-wrap ">
      {data?.map((event, n) => (
        <div
          id={`event_${n}`}
          key={n}
          className=" bg-gray-100 max-w-[40rem] border border-black/5 rounded-lg overflow-hidden  relative hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          <Event event={event} />
        </div>
      ))}
    </div>
  );
};

export default ClientMyComponent;
