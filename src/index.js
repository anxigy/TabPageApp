import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';


const Home = (props) => {

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
     { name:'Main'}
    ]
  })

  setTimeout(() => {
    props.navigation.dispatch(resetAction);
  }, 2000)

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home;
