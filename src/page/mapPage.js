import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import NaverMapView, {Marker, Circle} from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';
import Boundary, {Events} from 'react-native-boundary';
import useBgTracking from '../useBgTracking';
const Page3 = () => {
  const location = useBgTracking();
  console.log('useTraking latitude', location.latitude);
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
  };

  useEffect(() => {
    if (hasLocationPermission()) {
      const BoundaryData = [
        {lat: 37.8949, lng: 127.0586, radius: 50, id: 'Lucy'},
        {
          lat: 37.5692842,
          lng: 126.8267638,
          radius: 50,
          id: 'Company',
        },
      ];
      BoundaryData.map((boundary) => {
        Boundary.add(boundary)
          .then(() => console.log('success!'))
          .catch((e) => console.log(e));
      });
    }

    Boundary.on(Events.ENTER, (id) => {
      console.warn('Enter Boundary ', id);
      // setState((state) => ({
      //   ...state,
      //   isEnter: true,
      // }));
    });
    Boundary.on(Events.EXIT, (id) => {
      console.warn('Exit Boundary ', id);
      // setState((state) => ({
      //   ...state,
      //   isEnter: false,
      // }));
    });
  }, []);

  // Cluster Zone Location
  const P0 = {latitude: 37.5692842, longitude: 126.8267638};
  const P1 = {latitude: 37.8949, longitude: 127.0586};
  return (
    <View style={styles.container}>
      {location.latitude && (
        <NaverMapView
          style={styles.mapConatiner}
          showsMyLocationButton={true}
          center={{
            ...{latitude: location.latitude, longitude: location.longitude},
            zoom: 16,
          }}
          zoomControl={false}>
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker coordinate={P1} onClick={() => console.warn('onClick! p0')} />
          <Circle
            coordinate={P0}
            color={'rgba(255,0,0,0.3)'}
            radius={50}
            onClick={() => console.warn('onClick! circle')}
          />
          <Circle
            coordinate={P1}
            color={'rgba(255,0,0,0.3)'}
            radius={50}
            onClick={() => console.warn('onClick! circle')}
          />
        </NaverMapView>
      )}
      <View style={styles.infoContainer}>
        <Text>latitude : {location.latitude}</Text>
        <Text>longitude : {location.longitude}</Text>
        <Text>
          Boundary entered : {location.isEnter ? 'Enter' : 'Not Enter'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapConatiner: {
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
    margin: 40,
  },
});

export default Page3;
