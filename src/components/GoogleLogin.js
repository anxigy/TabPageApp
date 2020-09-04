import React, { useEffect, useState } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import { View, Text, TouchableOpacity } from 'react-native';

const GoogleLogin = () => {
  const WEB_CLIENT_ID = '1092778813832-00a0rou1p43hl42j545b3nk11o3k8mj3.apps.googleusercontent.com'
  
  const [state, setState] = useState({
    data : {},
    isLogin: false
  })

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPropt: true
    })
    isSignedIn()
  })

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn) {
      getCurrentUserInfo()
    }else{
      console.log('Please Login')
    }
  }

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setState(state => ({
        ...state,
        data: userInfo.user,
        isLogin: true
      }))
    } catch (e) {
      if(e.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('사용자가 아직 로그인을 하지 않음')
      }
    }
  }

  const signIn = async () => {
    try{
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      // state.data.push(userInfo)
      setState(state => ({
        ...state,
        data: userInfo.user,
        isLogin: true
      }))
      console.log(userInfo.user)
    }catch(e) {
      if(e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('사용자가 취소')
      } else if(e.code === statusCodes.IN_PROGRESS) {
        console.log('이미 진행중')
      } else if(e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('지원하지 않음')
      } else {
        console.log(e)
      }
    }
  }

  const signOut = async () => {
   try {
    setState(state => ({
      ...state,
      data: {},
      isLogin: false
    }))
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
   } catch (error) {
     
   }
  }

  return (
    <View>
      { state.isLogin ? (
        <TouchableOpacity onPress={() => signOut()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <GoogleSigninButton 
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Light}
        onPress={() => signIn()}
      />
      ) }
    </View>
  )
}

export default GoogleLogin;