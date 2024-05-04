import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({dark, children, buttonClass, loading, ...props}) => {
  return (
    <ChakraButton
      isLoading={loading}
      {...props}
      className={`uppercase w-full border border-black font-roboto-con font-medium p-2.5 text-base ${dark ? 'text-white bg-black hover:bg-white hover:text-black' : 'text-black bg-white hover:bg-black hover:text-white'} ${buttonClass}`}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
