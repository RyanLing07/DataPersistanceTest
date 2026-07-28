import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { router } from "expo-router";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

//This is the Class class
interface Class {
    id: string;
    name: string;
    secondary: string;
    number: string;
}

export default function ItemAdd() {
  const [classData, setClassData] = useState<Omit<Class, 'id'>>({
    name: '',
    secondary: '',
    number: '',
  });

  function buttonPress() {
    if(classData.name === '' || classData.secondary === '' || classData.number === '') {
      console.log("Currently one or more fields are not ready.")
      return;
    }

    const newClass: Class = {
      id: Crypto.randomUUID(),
      ...classData,
    };

    saveData(newClass);
    router.dismissAll(); 
    router.replace('/'); 
  }

  async function saveData(newClass: Class) {
    try {
      const jsonValue = await AsyncStorage.getItem('Classes');
      const prevClasses: Class[] = jsonValue != null ? JSON.parse(jsonValue) : [];

      const updatedClasses = [...prevClasses, newClass];

      await AsyncStorage.setItem('Classes', JSON.stringify(updatedClasses));

    } catch (e) {
      console.log("error saving class data", e);
    }
}
  return (

    <View style={styles.container}>
      <ScrollView style = {styles.scroll}>
        <Text style = {styles.text}>Item Name:</Text>
        <TextInput 
                  onChangeText = {(text) => {setClassData({...classData, name:text})}} 
                  value={classData.name} 
                  style = {styles.input} 
                  placeholder="Enter item name"/>
        <Text style = {styles.text}>Secondary info:</Text>
        <TextInput 
                  onChangeText = {(text) => {setClassData({...classData, secondary:text})}} 
                  value={classData.secondary} 
                  style = {styles.input} 
                  placeholder="Enter secondary information"/>
        <Text style = {styles.text}>number info:</Text>
        <TextInput 
                  onChangeText = {(text) => {setClassData({...classData, number:text})}} 
                  value={classData.number} 
                  style = {styles.input} 
                  keyboardType="decimal-pad" 
                  placeholder="Enter Number"/>
        <Pressable 
                  onPress = {buttonPress}
                  style = {styles.button}>
          <Text 
                style = {styles.mainText}>Confirm
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    marginTop:8,
    alignSelf: 'center',
  },
  mainText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white', 
  },
  input: {
    fontSize: 20,
    marginBottom:25,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 2,
    padding:10,
    width: '55%',
    alignSelf: 'center',
    flexGrow:0,
    flexShrink:0,
  },
  button: {
    alignSelf: "center",
    backgroundColor: 'purple',
    paddingTop:1,
    borderRadius:10,
    borderWidth:10,
    borderColor: 'purple',
    fontSize:25,
    marginTop:10,
    width:'80%'
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
});