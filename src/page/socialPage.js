import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import GoogleLogin from '../components/GoogleLogin';
import NaverLogin from '../components/NaverLogin';
import KakaoLogin from '../components/KakaoLogin';
import FacebookLogin from '../components/FacebookLogin';

const SocialPage = () => {

  return (
    <View style={styles.container}>
      <GoogleLogin />
      <NaverLogin />
      <KakaoLogin />
      <FacebookLogin/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  naverButton: {
    width: 200,
    height: 40,
    shadowColor: '#ddd',
    shadowOpacity: 3,
    marginTop: 20
  }
})

export default SocialPage;
