import React, { useState } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { colors } = useTheme();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha');
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(({ code }) => {
        if (code === 'auth/invalid-email' || code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail e/ou senha inválidos');
        } else if (code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Usuário não cadastrado.');
        } else {
          return Alert.alert('Entrar', 'Ocorreu algum erro.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="E-mail"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />
      <Input
        autoCapitalize="none"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />
      <Button
        title="Entrar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
      />
    </VStack>
  );
};
