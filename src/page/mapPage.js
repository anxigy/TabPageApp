import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  PermissionsAndroid
} from 'react-native';
import NaverMapView, {Marker, Circle} from 'react-native-nmap'
import Geolocation from 'react-native-geolocation-service'
import Boundary, { Events } from 'react-native-boundary';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Page3 = () => {

  const [state, setState] = useState({
    region: null,
    latitude: null,
    longitude: null,
    isEnter: false
  })

  // 위치 권한 
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }

  //현재위치 가져오기
  const getCurrentPosition = () => {
    if(hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setState(state => ({
            ...state,
            lat: latitude,
            log: longitude
          }))
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  useEffect(() => {
    // hasLocationPermission()
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 10000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

    Boundary.add({
      lat: 37.894877,
      lng: 127.058664,
      radius: 50,
      id: "Chipotle",
    })
    .then(() => console.log("success!"))
    .catch(e=>console.log(e));

   if(hasLocationPermission()) {

    // on location update
    BackgroundGeolocation.on('location', location => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      BackgroundGeolocation.startTask(taskKey => {
        setState(state => ({
          ...state,
          latitude: location.latitude,
          longitude: location.longitude,
        }));
        BackgroundGeolocation.endTask(taskKey);
      });
    });


    BackgroundGeolocation.on('start', () => {
      // console.log('[INFO] BackgroundGeolocation service has been started');

      BackgroundGeolocation.getCurrentLocation(location => {
        const longitudeDelta = 0.01;
        const latitudeDelta = 0.01;
        const region = Object.assign({}, location, {
          latitudeDelta,
          longitudeDelta
        }); 
        setState(state => ({
          ...state,
          latitude: location.latitude,
          longitude: location.longitude,
          region: region
        }));
      }, (error) => {
        setTimeout(() => {
          Alert.alert('Error obtaining current location', JSON.stringify(error));
        }, 100);
      });

    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    Boundary.on(Events.ENTER, id => {
      console.warn('Enter Boundary');
      setState(state => ({
        ...state,
        isEnter: true
      }))
    });
     
    Boundary.on(Events.EXIT, id => {
      console.warn('Exit Boundary')
      setState(state => ({
        ...state,
        isEnter: false
      }))
    })

    return () => {
      BackgroundGeolocation.events.forEach(event =>
        BackgroundGeolocation.removeAllListeners(event)
      );
    }
  }
  },[]);
  // Cluster Zone Location
  const P0 = {latitude: 37.894877, longitude: 127.058664};
  return (
    <View style={styles.container}>
      { state.latitude && (
        <NaverMapView 
        style={styles.mapConatiner}
        showsMyLocationButton={true}
        center={{...{latitude: state.latitude, longitude: state.longitude}, zoom: 16}}
      >
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
        <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={50} onClick={() => console.warn('onClick! circle')}/>
      </NaverMapView>
      )}
      <View style={styles.infoContainer}>
        <Text>latitude : {state.latitude}</Text>
        <Text>longitude : {state.longitude}</Text>
        <Text>Boundary entered : {state.isEnter ? 'Enter' : 'Not Enter'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapConatiner:{
    flex: 3,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 40
  }
})

export default Page3;
