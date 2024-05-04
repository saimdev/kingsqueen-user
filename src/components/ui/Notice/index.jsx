import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
const Notice = ({ status = 'info', noticeBodyClass, noticeTextClass, children }) => {
  return (
    <>
      <Alert
        status={status}
        className={`p-4 py-2 flex items-center justify-center ${noticeBodyClass}`}
      >
        <AlertTitle
          className={`pt-1 text-[12.5px] text-black mr-1.5 ${noticeTextClass}`}
        >
          {children}
        </AlertTitle>
      </Alert>
    </>
  );
};

export default Notice;
