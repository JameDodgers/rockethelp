import React from 'react';
import { Center, Spinner } from 'native-base';

export const Loading = () => {
  return (
    <Center flex={1} bg="gray.600">
      <Spinner color="secondary.700" />
    </Center>
  );
};
