import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import _BackgroundTimer from 'react-native-background-timer'
import { TouchableOpacity } from 'react-native-gesture-handler'

const taskPage = () => {


  useEffect(() => {
    if(Platform.OS == "ios") {
      _BackgroundTimer.start()
    }
    _interval = _BackgroundTimer.setInterval(() => {
      console.log('test')
    }, 2000)

    return (() => {
      _BackgroundTimer.clearInterval(_interval);
    })
  })
  const backgroundTaskStop = () => {
    _BackgroundTimer.clearInterval(_interval);
  }
  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={backgroundTaskStop}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default taskPage;