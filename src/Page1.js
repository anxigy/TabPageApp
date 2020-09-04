import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Page1 = (props) => {
  const goToPage = (name) => {
    props.navigation.navigate(name)
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Page1</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => goToPage('SocialPage')}
          hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
        >
          <Ionicons name='logo-facebook' size={30} color={'#4267B2'} style={{marginRight: 20}}/>
          <Text>Social Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.button}
            onPress={() => goToPage('WifiPage')}
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
          >
            <Ionicons name='wifi-outline' size={30} color={'red'} style={{marginRight: 20}}/>
            <Text>Get MacAddress</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
            onPress={() => goToPage('Page3')}
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
          >
            <Ionicons name='map-outline' size={30} color ={'green'}  style={{marginRight: 20}}/>
            <Text>Location Map</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.button}
            onPress={() => goToPage('TaskPage')}
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
          >
            <Ionicons name='refresh-outline' size={30} style={{marginRight: 20}}/>
            <Text>Background Task</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    width: 300,
    height: 45,
    marginBottom: 20
  },
  gridContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  gridItem:{
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Page1;
