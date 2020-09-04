import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DeviceInfo from 'react-native-device-info'

const WifiPage = () => {

  const [state,setState] = useState({
    uuid : '',
    macAddress: ''
  })

  const getUniqueID = () => {
    const uuid =  DeviceInfo.getUniqueId();
    setState(state => ({
      ...state,
      uuid: uuid
    }))
  }

  const getMacAddress = () => {
    DeviceInfo.getMacAddress().then(mac => {
      setState(state => ({
        ...state,
        macAddress : mac
      }))
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getUniqueID} style={styles.button}>
        <Text>getUniqueID</Text>
      </TouchableOpacity>
      <Text>{state.uuid}</Text>

      <TouchableOpacity onPress={getMacAddress} style={styles.button}>
        <Text>getMacAddress</Text>
      </TouchableOpacity>
      <Text>{state.macAddress}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderWidth: 1,
    borderColor: 'red',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10
  }
})

export default WifiPage;
