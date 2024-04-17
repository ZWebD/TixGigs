import React from "react";
import Image from "next/image";

export default function Intro() {
  return (
    <section className="xl:mt-40 my-[14%] w-full text-center sm:mb-0 justify-center">
      <div className="mb-[12%]">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-[8%]">
          Welcome to TixGigs!
        </h1>
        <div className="px-[10%]">
          <h2 className="text-xl md:text-3xl mb-[4%]">
            Where you can find what you looking for!
          </h2>
          <p>Music, Sport, Arts, Theatre, Comedy and many more</p>
        </div>
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
