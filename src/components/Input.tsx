import React from 'react';

import { Input as NativeNaseInput, IInputProps } from 'native-base';

export const Input = ({ ...props }: IInputProps) => {
  return (
    <NativeNaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      selectionColor="green.500"
      _focus={{
        borderWidth: 1,
        borderColor: 'green.500',
        bg: 'gray.700',
      }}
      {...props}
    />
  );
};
