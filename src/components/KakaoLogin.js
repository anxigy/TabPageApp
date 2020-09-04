import React, { useState } from 'react';

import KakaoLogins from '@react-native-seoul/kakao-login'
import { View, TouchableOpacity, StyleSheet, Image, TouchableOpacityBase, Text } from 'react-native';

const KakaoLogin = () => {

  const [state, setState] = useState({
    data : {},
    isLogin: false,
    token: ''
  })

  const kakaoLogin = () => {
    KakaoLogins.login()
    .then(result => {
      console.log(result)
      setState(state => ({
        ...state,
        token: result.accessToken,
        isLogin: true
      }))
    })
    .catch(err => {
      if (err.code === 'E_CANCELLED_OPERATION') {
        console.log('log cancle',err.message)
      } else {
        console.log(err.message)
      }
    });
  }

  const kakaoLogout = () => {
    KakaoLogins.logout()
    .then(result => {
     setState(state => ({
       ...state,
      token : '',
      data: '',
      isLogin: false
     }))
    })
    .catch(err => {
      console.log(err)
    });
  }

  const getProfile = () => {
    KakaoLogins.getProfile()
      .then(result => {
        console.log(result)
        setState(state => ({
          ...state,
          data: result
        }))
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <View>
      {state.isLogin ? (
        <TouchableOpacity onPress={kakaoLogout}>
          <Text>logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={kakaoLogin} >
          <Image source={require('../assets/kakao_login_medium_narrow.png')} style={styles.kakaoButton}/>
        </TouchableOpacity>
      )}
      { !!state.token && (
        <TouchableOpacity onPress={getProfile} >
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
  kakaoButton: {
    width: 200,
    height: 40,
    shadowColor: '#ddd',
    shadowOpacity: 3,
    marginTop: 20
  }
})

export default KakaoLogin;