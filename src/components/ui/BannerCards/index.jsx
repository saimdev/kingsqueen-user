import React from "react";
import { Link } from "@chakra-ui/react";

const BannerCards = ({leftImage, leftLink, leftAlt = '', leftText, rightImage, rightLink, rightAlt = '', rightText}) => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left Banner Card */}
      <div className="flex flex-col justify-center w-full sm:w-1/2 h-screen">
        <Link href={leftLink} className="h-full">
          <img
            src={leftImage}
            alt={leftAlt}
            className="w-full h-full object-cover"
            srcSet={leftAlt}
          />
        </Link>
        <Link
          href={leftLink}
          className="text-center p-2 font-semibold underline m-auto cursor-pointer hover:no-underline hover:text-gray-500"
        >
          {leftText}
        </Link>
      </div>

      {/* Right Banner Card */}
      <div className="flex flex-col justify-center w-full sm:w-1/2 h-screen">
        <Link href={rightLink} className="h-full">
          <img
            className="w-full h-full object-cover"
            src={rightImage}
            alt={rightAlt}
            srcSet={rightAlt}
          />
        </Link>
        <Link
          href={rightLink}
          className="text-center p-2 font-semibold underline m-auto cursor-pointer hover:no-underline hover:text-gray-500"
        >
          {rightText}
        </Link>
      </div>
    </div>
  );
};

export default BannerCards;
