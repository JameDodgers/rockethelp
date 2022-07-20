import React, { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  VStack,
  IconButton,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';

export const Home = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  );

  const [orders, setOrders] = useState<OrderProps[]>([
    { id: '1', patrimony: '1234', when: '18/07/2022 às 14:00', status: 'open' },
  ]);

  const handleNewOrder = () => {
    navigation.navigate('new');
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId });
  };

  const ListEmptyComponent = useCallback(
    () => (
      <Center>
        <ChatTeardropText color={colors.gray[300]} size={40} />
        <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
          Você ainda não possui {'\n'}
          solicitações{' '}
          {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
        </Text>
      </Center>
    ),
    [colors.gray, statusSelected]
  );

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between">
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="closed"
            title="finalizados"
            isActive={statusSelected === 'closed'}
            onPress={() => setStatusSelected('closed')}
          />
        </HStack>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};