import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import api from '../../services/api'

export default function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');
  const [hidePass, setHidePass] = useState(true);

  async function Registro(name, cpf, email, password, passwordConfirmation) {
    console.log(email, password)
    const response = await api.post('/signup', { name, cpf, email, password, passwordConfirmation }).then(res => {
      if (res.statusCode == 200) {
        Alert.alert('Conta criada com sucesso!')
      }
    }).catch(error => {
      Alert.alert("Erro ao criar usuário")
    });
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.massage}>Crie aqui sua conta</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder='Digite seu nome completo...'
          style={styles.name}
          value={name}
          onChangeText={(texto) => setName(texto)}
        />

        <Text style={styles.title}>CPF</Text>
        <TextInput
          placeholder='Digite seu CPF...'
          style={styles.cpf}
          value={cpf}
          onChangeText={(texto) => setCPF(texto)}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite seu Email...'
          style={styles.email}
          value={email}
          onChangeText={(texto) => setEmail(texto)}
        />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputArea}>
          <TextInput
            placeholder='Digite aqui sua senha...'
            style={styles.password}
            value={password}
            onChangeText={(texto) => setPassword(texto)}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
            {hidePass ?
              <Ionicons name='eye' size={25} />
              :
              <Ionicons name='eye-off' size={25} />
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirme a Senha</Text>
        <View style={styles.inputArea}>
          <TextInput
            placeholder='Digite sua senha novamente...'
            style={styles.password}
            value={passwordConfirmation}
            onChangeText={(texto) => setpasswordConfirmation(texto)}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
            {hidePass ?
              <Ionicons name='eye' size={25} />
              :
              <Ionicons name='eye-off' size={25} />
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}
          onPress={() => {
            Registro(name, cpf, email, password, passwordConfirmation)
          }}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d78af'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  massage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  containerForm: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  inputArea: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    height: 42,
    marginBottom: 12,
    fontSize: 16,

  },
  password: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
    width: '85%',
  },
  icon: {
    width: '15%',
    height: 50,
  },
  name: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  cpf: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  email: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0d78af',
    width: '95%',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})