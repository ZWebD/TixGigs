import React from "react";
import Image from "next/image";

export default function Intro() {
  return (
    <section className="xl:mt-40 mt-28 mb-28 w-full text-center sm:mb-0 justify-center">
      <div className="mb-24">
        <h1 className="text-7xl font-black mb-20">
          Welcome to Ticket Toaster!{" "}
        </h1>
        <h2 className=" text-3xl font-black">
          Where you can find what you looking for Music, Sport, Arts, Theatre,
          Comedy and many more
        </h2>
      </div>
      <Image
        className="relative m-auto dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert -z-40"
        src="/UKMap.svg"
        alt="Background"
        width={480}
        height={47}
        priority
      />
    </section>
  );
}
