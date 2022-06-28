import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import NumericInput from 'react-native-numeric-input';

export default function Avaliation({ route }) {

  const navigation = useNavigation();
  const [goBack, setGoBack] = useState(1);
  const [satisfaction, setSatisfaction] = useState(1);
  const [indicate, setIndicate] = useState(1);
  const [message, setMessage] = useState('');

  const [username, setUsername] = useState(route.params || "");
  const [secretary, setSecretary] = useState(route.params.secretary);

  async function Avaliacao(indicate, satisfaction, goBack, message) {

    await api.post('/add-rating', {
      entityName: secretary.name,
      assessments: {
        indicate: indicate,
        satisfaction: satisfaction,
        goBack: goBack
      },
      commentary: {
        autor: username.user,
        message: message,
      }
    }).then(res => {
      Alert.alert(`Avaliação recebida, muito obrigado ${username.user}`)
      navigation.navigate('Home', { user: username.user })

    }).catch(error => {
      Alert.alert("Avaliação não foi enviada")
    });
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.massage}>Avaliação</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Chance de Indicar</Text>
        <NumericInput
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#0d78af'
          leftButtonBackgroundColor='#0d78af'
          maxValue={5}
          minValue={1}
          style={styles.indicate}
          value={indicate}
          onChange={(texto) => setIndicate(texto)}
        />

        <Text style={styles.title}>Grau de Satisfação do Atendimento</Text>
        <NumericInput
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#0d78af'
          leftButtonBackgroundColor='#0d78af'
          maxValue={5}
          minValue={1}
          style={styles.satisfaction}
          value={satisfaction}
          onChange={(texto) => setSatisfaction(texto)}
        />

        <Text style={styles.title}>Chance de Voltar</Text>
        <NumericInput
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#0d78af'
          leftButtonBackgroundColor='#0d78af'
          maxValue={5}
          minValue={1}
          style={styles.goBack}
          value={goBack}
          onChange={(texto) => setGoBack(texto)}
        />

        <Text style={styles.title}>Resenha Crítica</Text>
        <TextInput
          placeholder='Digite como foi sua experiência...'
          style={styles.message}
          value={message}
          onChangeText={(texto) => setMessage(texto)}
        />

        <TouchableOpacity style={styles.button}
          onPress={() => {
            Avaliacao(indicate, satisfaction, goBack, message)
          }}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Home', { user: username.user })}>
          <Text style={styles.buttonText}>Voltar</Text>
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
  indicate: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  satisfaction: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  goBack: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 12,
    fontSize: 16,
  },
  message: {
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