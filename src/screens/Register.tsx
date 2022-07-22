import React, { useState } from 'react';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const handleNewOrderRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setLoading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Registro', 'Solicitação registrada com sucesso!');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return Alert.alert(
          'Registro',
          'Não foi possível registrar a solicitação.'
        );
      });
  };

  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Solicitação" />
      <VStack flex={1} px={6} pb={6}>
        <Input
          placeholder="Número do patrimônio"
          mt={4}
          value={patrimony}
          onChangeText={setPatrimony}
        />
        <Input
          flex={1}
          mt={5}
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
          placeholder="Descrição do problema"
        />
        <Button
          title="Cadastrar"
          isLoading={isLoading}
          onPress={handleNewOrderRegister}
          mt="5"
        />
      </VStack>
    </VStack>
  );
};
