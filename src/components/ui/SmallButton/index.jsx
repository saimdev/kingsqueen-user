import { Button as ChakraButton } from "@chakra-ui/react";

const SmallButton = ({fill, children, ...props}) => {
  return (
    <ChakraButton
      {...props}
      className={`w-11 h-11 p-4 rounded-full border border-black uppercase font-roboto-con font-medium flex justify-center text-xs ${fill ? 'bg-black text-white' : ''}`}
    >
      {children}
    </ChakraButton>
  );
};

export default SmallButton;
