import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack, Text, HStack, ScrollView, useTheme } from 'native-base';
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  ClipboardText,
} from 'phosphor-react-native';

import { Button } from '../components/Button';
import { CardDetails } from '../components/CardDetails';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

type RouteParams = {
  orderId: string;
};
type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed?: string;
};
export const Details = () => {
  const { colors } = useTheme();
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [solution, setSolution] = useState('');
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  const handleOrderClose = () => {
    if (!solution) {
      return Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação.'
      );
    }
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação');
        console.log(error);
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : undefined;

        setOrder({
          id: doc.id,
          patrimony,
          solution,
          description,
          status,
          when: dateFormat(created_at),
          closed,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize="sm"
          ml={2}
          textTransform="uppercase"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />
        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input
              multiline
              placeholder="Descrição da solução"
              h={24}
              textAlignVertical="top"
              value={solution}
              onChangeText={setSolution}
            />
          )}
        </CardDetails>
      </ScrollView>
      {order.status === 'open' && (
        <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
};
