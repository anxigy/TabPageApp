import React, { Component, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import MapView, { Marker } from 'react-native-maps';

const BgTracking = () => {
  const [state, setState] = useState({
    region: null,
    latitude: null,
    longitude: null
  })
  useEffect(() => {
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
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

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

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
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

    BackgroundGeolocation.on('stop', () => {
      // console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
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

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
    return (() => {
      BackgroundGeolocation.events.forEach(event =>
        BackgroundGeolocation.removeAllListeners(event)
      );
    })
  },[])

//   initialRegion={{
//     latitude: 37.894877,
//     longitude: 127.058664,
//     latitudeDelta: 0.022,
//     longitudeDelta: 0.021,
//  }}

  return (
    <View style={{flex: 1}}>
      {state.region &&  (
        <MapView
        initialRegion={{
          latitude: state.latitude,
          longitude: state.longitude,
          latitudeDelta: state.region.latitudeDelta,
          longitudeDelta: state.region.longitudeDelta
        }}
        style={{flex: 1}}
      >
        <Marker coordinate={{
          latitude: state.latitude,
          longitude: state.longitude,
        }}/>
      </MapView>
      )}
    </View>
  )
}

export default BgTracking;