"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// "IPCN9ipJQfchxAPr2f11vZiq4LHAR0AK";
// process.env.REACT_APP_API_KEY;

const keyword = "concert";
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const startDate = `${year}-${month < 10 ? `0${month}` : month}-${
  day < 10 ? `0${day}` : day
}`;
const endDate = "2024-01-31";
const sortBy = "popularity";
const size = 20; // Maximum number of events per page
const countryCode = "GB";

const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}&size=${size}&apikey=${apiKey}&countryCode=${countryCode}`;

// let eventsByName: any;

export default function UpcomingEvents() {
  const [data, setData] = useState(Object);

  useEffect(() => {
    // Fetch data from an API
    fetch(url)
      .then((response) => response.json())
      .then((result) =>
        setData([
          ...new Map(
            result._embedded.events.map((e: any) => [e.name.toLowerCase(), e])
          ).values(),
        ])
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data);

  // () => {
  //   const eventsByName = [
  //     ...new Map(data.map((e: any) => [e.name.toLowerCase(), e])).values(),
  //   ];
  //   console.log(eventsByName[0]);
  // };

  // async () => {
  // try {
  //   // console.log(url);
  //   const response = await axios.get(url);
  //   const events = response.data._embedded.events;
  //   const eventsByName = [
  //     ...new Map(events.map((e: any) => [e.name.toLowerCase(), e])).values(),
  //   ];

  // Process and sort the events based on your criteria

  // eslint-disable-next-line react/jsx-key
  // return (
  //   <div>
  //     {eventsByName.map((event: any) => (
  //       <div key={event.id}>
  //         {event.images.map((i: any) => {
  //           if (i.ratio === "3_2" && i.width === 640) {
  //             <Image src={i.url} alt={event.name} />;
  //             {
  //               /* <img src={i.url} alt={event.name} />
  //             </Image>; */
  //             }
  //           }
  //         })}

  //         <h3>{event.name}</h3>
  //         <p>{event.promoter}</p>
  //         <a href={event.url}>Event link</a>
  //       </div>
  //     ))}
  //   </div>
  // );

  //     // console.log(e);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // return { eventsByName };
  //   // };
}
// export { eventsByName };
