import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Page2 = () => {
  const [state, setState] = useState({
    min: 0,
    sec: 0,
    msec: 0,
    labs: [],
    isStart: false,
    interval: null
  })

  const padToTwo = (num) => {
    return num <= 9 ? `0${num}` : num
  } 

  useEffect(() => {
    if(state.isStart) {
      interval = setInterval(()=> {
        if(state.msec !== 99) {
          setState(state => ({
            ...state,
            msec: state.msec + 1
          }))
        } else if(state.sec !== 59) {
          setState(state => ({
            ...state,
            msec: 0,
            sec: state.sec + 1
          }))
        } else {
          setState(state => ({
            msec: 0,
            sec: 0,
            min: ++state.min
          }))
        }
      },1)
      return() => {
        clearInterval(interval)
      }
    }
  })

  const handleStart = () => {
    setState(state => ({
      ...state,
      isStart: state.isStart
    }))
    // if(!state.isStart) {
    //   console.log('start')
    //   interval = setInterval(() => {
    //     if(state.msec !== 99) {
    //       setState(state => ({
    //         ...state,
    //         msec: state.msec + 1
    //       }))
    //     }else if (state.sec !== 59) {
    //       console.log('secs')
    //       setState(state => ({
    //         ...state,
    //         msec: 0,
    //         sec: ++state.sec
    //       }))
    //     } else {
    //       setState(state => ({
    //         msec: 0,
    //         sec: 0,
    //         min: ++state.min
    //       }))
    //     }
    //   }, 1);
    // } else {
    //   console.log('reset')
    //   handleReset()
    // }
  }

  const handleReset = () => {
    setState(state => ({
      ...state,
      msec: 0,
      sec: 0,
      min: 0,
      isStart: true
    }))
    clearInterval(this.interval);
};

  const handleToggle = () => {
    setState(state => ({
      ...state,
      isStart: !state.isStart
    }), handleStart())
    
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{padToTwo(state.min)}:</Text>
        <Text style={styles.timerText}>{padToTwo(state.sec)}:</Text>
        <Text style={styles.timerText}>{padToTwo(state.msec)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonTimer}
          hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
        >
          <Text>랩</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTimer}
          onPress={() => handleToggle()}
          hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
        >
          { !state.isStart ? <Text>시작</Text> : <Text>정지</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerContainer: {
    flexDirection: 'row',
  },
  timerText : {
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: 200
  },
  buttonTimer: {
    width:50,
    height:50,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})

export default Page2;
