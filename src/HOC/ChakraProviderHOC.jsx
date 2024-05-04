import { ChakraBaseProvider, ChakraProvider } from "@chakra-ui/react"



export const withChakraProvider = (Component)=>{
  return (props)=>{
    return <ChakraProvider><Component /></ChakraProvider>
  }
}


export const withChakraBaseProvider = (Component)=>{
  return (props)=>{
    return <ChakraBaseProvider><Component /></ChakraBaseProvider>
  }
}