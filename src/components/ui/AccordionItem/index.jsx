import React from "react";
import {
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const AccordionItem = ({ title, children, className, itemClasses, buttonClasses, panelClasses }) => {
  return (
    <ChakraAccordionItem
      className={`border-b py-2 border-gray-300 ${itemClasses}`}
    >
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton
              className={`font-roboto-con font-semibold text-[15px] py-2 uppercase ${buttonClasses}`}
            >
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className={`${panelClasses}`}>{children}</AccordionPanel>
        </>
      )}
    </ChakraAccordionItem>
  );
};

export default AccordionItem;
