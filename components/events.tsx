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
    <section className="flex flex-col sm:flex-row flex-wrap ">
      <>
        {error ? <p>{error}</p> : null}
        {isLoading ? <p>Loading...</p> : null}
        {isError ? <p>Error</p> : null}
      </>
      {data?.map((event, n) => (
        <section
          id={`event_${n}`}
          key={n}
          className="relative mb-24  md:w-1/2 md:odd:last:m-auto odd:last:pr-0 md:odd:pr-3 md:even:pl-3"
        >
          <Event event={event} />
        </section>
      ))}
    </section>
  );
};

export default ClientMyComponent;
