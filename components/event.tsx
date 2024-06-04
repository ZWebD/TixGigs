import React from "react";
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

  const rgbaBg = rgbToRgba(lighterColor, 0.4),
    divBgColor = {
      backgroundColor: `${lighterColor}`,
    };
  const divBgColorOpacity = {
    backgroundColor: `${rgbaBg}`,
  };

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

  return (
    <div
      className="relative overflow-hidden rounded-lg justify-items-stretch justify-evenly flex flex-col sm:group-even:ml-[18rem] max-w[42rem] group-even:pl-10 group-odd:pl-10 border border-black/5 hover:bg-gray-200 transition"
      style={divBgColor}
    >
      <div className=" whitespace-pre-line sm:max-w-auto flex flex-col sm:group-even:ml-[18rem]">
        {/* <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
          {event.promoter?.name || <br />}
        </p> */}
        <a href={props.event.url} target="_blank" className=" font-medium">
          <div
            className="bg-center rounded-b-3xl bg-cover bg-no-repeat w-full h-80 min-w-max "
            style={divBgImage}
          ></div>
          <h3
            className="md:text-lg text-2xl min-h-28 content-center px-[4%]"
            style={divBgColorOpacity}
          >
            {event.name}
          </h3>
        </a>
      </div>
    </div>
  );
}
