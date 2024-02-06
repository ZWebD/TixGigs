import React from "react";
import Image from "next/image";

export default function Intro() {
  return (
    <div>
      <div>
        <h1 className="">Welcome to Ticket Toaster! </h1>
        <h2>
          Where you can find what you looking for Music, Sport, Arts, Theatre,
          Comedy and many more
        </h2>
      </div>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert -z-40"
        src="/UKMap.svg"
        alt="Background"
        width={480}
        height={47}
        priority
      />
    </div>
  );
}
