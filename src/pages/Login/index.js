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

import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  // navigation.navigate('Home')
  async function Acesso(email, password) {
    console.log(email, password)
    await api.post('/login', { email, password }).then(res => {
      console.log (res.data.name) 
      if (res.status == 200) { navigation.navigate('Home', {user: res.data.name}) }
    }).catch(error => {
      Alert.alert("Email ou Senha inválida")
      console.log(error)
    });
  }
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.massage}>Bem-vind@!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite um email...'
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

        <TouchableOpacity
          style={styles.button}
          onPress={(event) => Acesso(email, password)}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRecover}
          onPress={() => navigation.navigate('Recover')}>
          <Text style={styles.recoverPassword}>Esqueceu a senha?</Text>

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
  email: {
    borderBottomWidth: 1,
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
  },

  buttonRecover: {
    marginTop: 14,
    alignSelf: 'center'
  },
  recoverPassword: {
    color: '#a1a1a1'
  }
})