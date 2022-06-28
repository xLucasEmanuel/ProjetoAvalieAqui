
import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
 } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Welcome(){
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={{ width: '80%' }}
          resizeMode="contain"
          />
      </View>

      <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Avalie aqui o desempenho de cada secretaria!</Text>
        <Text style={styles.text}>Faça o Login para começar</Text>

        <TouchableOpacity 
        style={styles.button}
        onPress={ () => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.buttonRegister}
        onPress={ () => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Crie sua conta</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#ffffff"
  },
  containerLogo:{
    flex:2,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm:{
    flex:1,
    backgroundColor: "#0d78af",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: '#ffffff'
  },
  text:{
    color: '#ffffff'
  },
  button:{
    marginTop: 50,
    backgroundColor: '#323232',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  buttonRegister:{
    marginTop: 15,
    backgroundColor: '#323232',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})