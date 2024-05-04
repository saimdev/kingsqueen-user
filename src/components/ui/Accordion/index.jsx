import React from "react";
import { Accordion as ChakraAccordion } from "@chakra-ui/react";

const Accordion = (props) => {
  return (
    <ChakraAccordion allowMultiple {...props}>
      {props.children}
    </ChakraAccordion>
  );
};

export default Accordion;
