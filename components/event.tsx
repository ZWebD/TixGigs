import React from "react";
import Image from "next/image";
import useExtractColor from "@/actions/useExtractColor";

let url = "";

export default function Events(props: any) {
  const event = props.event;
  event.images.map((i: any) => {
    if (i.ratio == "3_2" && i.width == 640) {
      return (url = i.url);
    }
  });

  const divBgImage = {
    backgroundImage: "url(" + url + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
  };
  const { lighterColor } = useExtractColor(url, { format: "rgba" });

  // Adding alpha value to RGB color

  const rgbaBg = rgbToRgba(lighterColor, 0.4);

  function rgbToRgba(rgb: any, alpha: number) {
    const match = rgb?.match(
      /rgb?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/
    );
    if (!match) return null;

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = alpha;

    return `rgba(${r},${g},${b},${a})`;
  }

  const divBgColor = {
    backgroundColor: `${lighterColor}`,
  };
  const divBgColorOpacity = {
    backgroundColor: `${rgbaBg}`,
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg pb-7 justify-items-stretch justify-evenly flex flex-col sm:group-even:ml-[18rem] max-w[42rem] group-even:pl-10 group-odd:pl-10 border border-black/5 bg-gray-100 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
      style={divBgColor}
    >
      <div
        className="bg-center bg-cover bg-no-repeat w-full h-80 min-w-max "
        style={divBgImage}
      >
        <h2 className=" text-3xl pt-4 pb-4" style={divBgColorOpacity}>
          {event.name}
        </h2>
      </div>
      <div className=" whitespace-pre-line pb-7 sm:pt-10 sm:max-w-auto flex flex-col sm:group-even:ml-[18rem]">
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
          {event.promoter?.name || <br />}
        </p>
        <a href={props.event.url}>Event link</a>
      </div>
    </div>
  );
}
