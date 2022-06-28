import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
   } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function About(){
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.massage}>Sobre</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>

        <TouchableOpacity 
        style={styles.button}
        onPress={ () => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0d78af'
  },
  containerHeader:{
    marginTop:'14%',
    marginBottom:'8%',
    paddingStart: '5%'
  },
  massage:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  containerForm:{
    backgroundColor: '#ffffff',
    flex:1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%'
  },
  button:{
    backgroundColor: '#0d78af',
    width: '95%',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color:'#ffffff',
    fontSize: 18,
    fontWeight:'bold'
  }
})