import React, { useState } from 'react';

import KakaoLogins from '@react-native-seoul/kakao-login'
import { View, TouchableOpacity, StyleSheet, Image, TouchableOpacityBase, Text } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const FacebookLogin = () => {

  const [state, setState] = useState({
    data : {},
    isLogin: false,
    token: ''
  })

  const getProfile = () => {
    
  };

  return (
    <View>
       <LoginButton
        style={styles.facebookLogin}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  facebookLogin: {
    width: 200,
    height: 40,
    shadowColor: '#ddd',
    shadowOpacity: 3,
    marginTop: 20
  }
})

export default FacebookLogin;