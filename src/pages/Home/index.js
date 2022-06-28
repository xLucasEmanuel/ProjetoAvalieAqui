import React, { useState, useEffect } from 'react';
import api from '../../services/api.js'

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Icon } from '@material-ui/core';

export default function Home({route}){
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState(route.params.user || "")
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [entities, setEntities] = useState([{}]);

  useEffect(async () => {
    await api.get('/entities').then(res => {
      setEntities(res.data)
    }).catch(error => console.log("Error:1 ", error));
  });


  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(
        function (item) {
          if (item.name) {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
        });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.name.toUpperCase()}
      </Text>
    );
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => navigation.navigate('Login')}>
          <Image
          source={require('../../assets/icons8-logout-24.png')}
          />
      </TouchableOpacity>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.massage}>Secretarias:</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Animatable.Image
          source={require('../../assets/Vitoria-de-Santo-Antão-Logo-1.jpg')}
          style={{ width: '105%', height: '40%', borderTopLeftRadius: 25,
          borderTopRightRadius: 25, marginLeft:-20, marginTop: -21}}
          resizeMode="contain"
        />

        {entities.map((item, index) => {
          const navigation = useNavigation();
          return (
            
            <TouchableOpacity style={styles.button}
            onPress={ () => navigation.navigate('Secretary',{item: item, user: username})}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >{item.name}</Text>
            </TouchableOpacity>

          )
        })}

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={ItemView}
        />
        </Animatable.View>
      </View>
    </SafeAreaView>
    
  );
};

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
    color: '#ffffff',
    marginTop: -40,
  },
  containerForm: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%'
  },
  itemStyle: {
    backgroundColor: '#0d78af',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    color: 'white',
  },

  button:{
    backgroundColor: '#0d78af',
    width: '90%',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 14,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLogin:{
    backgroundColor: '#0d78af',
    width: '15%',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 30,
    marginLeft: 305,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#0d78af',
  },
});
