import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Page1 from './src/Page1'
import Page2 from './src/Page2'
import Page3 from './src/Page3'
import Home from './src/index'
import WifiPage from './src/wifiPage';
import SocialPage from './src/page/socialPage';
import GeoPage from './src/page/geoPage';
import TaskPage from './src/page/BgTracking';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Page1} /> 
      <Stack.Screen 
        name="Page3" 
        component={Page3}
      /> 
      <Stack.Screen 
        name="SocialPage" 
        component={SocialPage}
      /> 
      <Stack.Screen 
        name="WifiPage" 
        component={WifiPage}
      /> 
      <Stack.Screen 
        name="GeoPage" 
        component={GeoPage}
      /> 
      <Stack.Screen 
        name="TaskPage" 
        component={TaskPage}
      /> 
    </Stack.Navigator>
  )
}

const TabComponent = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if(route.name === 'Menu') {
            iconName = focused
              ? 'home'
              : 'home-outline'
          } else if (route.name === 'Page2') {
            iconName = focused ? 'alarm' : 'alarm-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name="Menu" component={StackComponent} />
      <Tab.Screen name="Page2" component={Page2} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' options={{headerShown: false}} component={Home} />
        <Stack.Screen name='Main' options={{headerShown: false}} component={TabComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
