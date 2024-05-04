import React from "react";
import { Link } from "@chakra-ui/react";


const Banner = ({image, link, imageAlt = '', leftBtnText, rightBtnText}) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-center w-full ">
        <Link href={link} className="h-full w-full">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="flex">
          <Link
            href={link}
            className="text-center p-2 font-semibold underline m-auto cursor-pointer hover:no-underline hover:text-gray-500"
          >
            {leftBtnText}
          </Link>
          <Link
            href={link}
            className="text-center p-2 font-semibold underline m-auto cursor-pointer hover:no-underline hover:text-gray-500"
          >
            {rightBtnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
