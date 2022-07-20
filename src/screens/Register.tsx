import React from 'react';

import { VStack } from 'native-base';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export const Register = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />
      <Input placeholder="Número do patrimônio" mt={4} />
      <Input
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        placeholder="Descrição do problema"
      />
      <Button title="Cadastrar" mt="5" />
    </VStack>
  );
};