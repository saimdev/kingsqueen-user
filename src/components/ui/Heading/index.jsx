import React from 'react'
import { Heading as ChakraHeading } from '@chakra-ui/react'

const Heading = (props) => {
  return (
    <ChakraHeading {...props} >{props.children}</ChakraHeading>
  )
}

export default Heading



