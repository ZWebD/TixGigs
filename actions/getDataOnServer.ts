"use server";

export type Data =
  | [
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
    ]
  | undefined;

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const keyword = "concert";
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const startDate = `${year}-${month < 10 ? `0${month}` : month}-${
  day < 10 ? `0${day}` : day
}`;
const endDate = `${year + 1}-${month < 10 ? `0${month}` : month}-${
  day < 10 ? `0${day}` : day
}`;
const sortBy = "popularity";
const size = 20; // Maximum number of events per page
const countryCode = "GB";

let url;

export const getDataOnServer = async (props: any) => {
  !props
    ? (url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}&size=${size}&apikey=${apiKey}&countryCode=${countryCode}`)
    : (url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${props}&apikey=${apiKey}&countryCode=${countryCode}`);
  let data: Data;
  let isError = false;
  let error = "";

  try {
    const res = await fetch(url);
    const filter: any = res
      .json()
      .then((result) => [
        ...new Map(
          result._embedded.events.map((e: any) => [e.name.toLowerCase(), e])
        ).values(),
      ]);
    data = await filter;
  } catch (e) {
    isError = true;
    if (typeof e === "string") error = e;
    else if (e instanceof Error) error = e.message;
    else error = "Error";
  }

  return { data, isError, error };
};
