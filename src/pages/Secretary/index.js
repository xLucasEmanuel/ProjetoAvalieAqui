import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Scr,
  ScrollView
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function Secretary({ route }) {
  const navigation = useNavigation();
  const [secretary, setSecretary] = useState(route.params.item);
  const [username, setUsername] = useState(route.params.user);

  const dbComments = route.params.item.comments
  // console.log("___________________________________________________________________________")
  // console.log(route.params.item.comments)
  console.log(dbComments[0])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
          <Text style={styles.title}>{secretary.name}</Text>
        </Animatable.View>
        <View style={styles.containerLogo}>

          <Animatable.Image
            source={require('../../assets/logo.jpg')}
            style={{ width: '30%', height: '40%', borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderTopRightRadius: 25, borderBottomRightRadius: 25, marginTop: 10 }}
            resizeMode="contain"
          />
          <View style={styles.buttonsDirection}>
          <TouchableOpacity
          style={styles.buttonAvaliation}
          onPress={() => navigation.navigate('Avaliation', { secretary, user: username })}>
          <Text style={styles.buttonText}>Avalie Agora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate('Home', { user: username })}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        </View>

          <Text style={styles.open}>Horário: {secretary.open}</Text>
          <Text style={styles.address}>Endereço: {secretary.address}</Text>
          
          <View>
              <Text style={styles.massage}>Comentários:</Text>
          </View>

          {dbComments.map(item => {
          return (
            
            <View>
              <Text style={styles.user}>Usuário: {item.autor}</Text>
              <Text style={styles.comments}>Comentário: {item.message}</Text>

              <TouchableOpacity>
                <Text style={styles.avaliation}>Nota: {item.stars}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d78af"
  },
  containerHeader: {
    marginTop: '20%',
    marginBottom: '14%',
    paddingStart: '5%'
  },
  containerLogo: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsDirection:{
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -50,
    marginBottom: 12,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white'
  },
  massage:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginStart: 5,
    marginBottom: 12,
    alignItems: 'flex-start',
    color: '#000000'
  },
  open: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginStart: -80,
    marginBottom: 12,
    alignItems: 'flex-start',
    color: '#000000'
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginStart: 5,
    marginBottom: 12,
    alignItems: 'flex-start',
    color: '#000000'
  },
  about: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginStart: 5,
    marginBottom: 12,
    alignItems: 'flex-start',
    color: '#000000'
  },
  buttonAvaliation: {
    marginTop: 30,
    backgroundColor: '#323232',
    borderRadius: 50,
    paddingVertical: 8,
    width: '40%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  buttonBack: {
    marginTop: 30,
    backgroundColor: '#323232',
    borderRadius: 50,
    paddingVertical: 8,
    width: '40%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  avaliation:{
    fontSize: 14,
    color: '#000000',
    marginBottom: 12,
    fontWeight: 'bold',
    marginRight: 280,
  },
  user:{
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold'
  },
  comments:{
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold'
  }
})