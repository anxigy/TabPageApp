import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { NaverLogin, getProfile } from '@react-native-seoul/naver-login'
import { TouchableOpacity } from 'react-native-gesture-handler';

const NaverLoginItem = () => {

  const [state, setState] = useState({
    data : {},
    isLogin: false,
    token: ''
  })

  const iosKeys = {
    kConsumerKey: "NeNTXxUGyTCEiyZWdMzk",
    kConsumerSecret: "cEZJPkBT1A",
    kServiceAppName: "테스트앱(iOS)",
    kServiceAppUrlScheme: "io-github.TabPageApp" // only for iOS
  };

  const naverLogin = () => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(iosKeys, (e, token) => {
        if(state.token) {
          setState(state => ({
            ...state,
            isLogin: true,
            token: token
          }))
        }
        if(e) { 
          reject(e)
          return;
        }
        resolve(token)
      })
    })
  }

  const naverLogout = () => {
    NaverLogin.logout();
    setState(state => ({
      ...state,
      isLogin: false,
      token: ''
    }))
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(state.token.accessToken)
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    }
    setState(state => ({
      ...state,
      data: profileResult
    }))
    console.log("profileResult", state.data);
  }

  return (
    <View>
      {state.isLogin ? (
        <TouchableOpacity onPress={() => naverLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => naverLogin()}>
          <Image source={require('../assets/naverLogingreen.png')} style={styles.naverButton}/>
        </TouchableOpacity>
      )}

      { !!state.token && (
        <TouchableOpacity onPress={getUserProfile} >
          <Text>회원정보 가져오기</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}


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

export default NaverLoginItem;