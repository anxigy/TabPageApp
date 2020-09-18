import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Page1 from './src/Page1';
import Page2 from './src/Page2';
import MapPage from './src/page/mapPage';
import Home from './src/index';
import WifiPage from './src/wifiPage';
import SocialPage from './src/page/socialPage';
import GeoPage from './src/page/geoPage';
import TaskPage from './src/page/BgTracking';
import Boundary, {Events} from 'react-native-boundary';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const StackComponent = () => {
//   return (
//     <Stack.Navigator initialRouteName="Menu">
//       <Stack.Screen name="Menu" component={Page1} />
//       <Stack.Screenname="MapPage" component={MapPage} />
//       <Stack.Screenname="SocialPage" component={SocialPage} />
//       <Stack.Screenname="WifiPage" component={WifiPage} />
//       <Stack.Screenname="GeoPage" component={GeoPage} />
//       <Stack.Screenname="TaskPage" component={TaskPage} />
//     </Stack.Navigator>
//   );
// };

// const TabComponent = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//           if (route.name === 'Menu') {
//             iconName = focused ? 'home' : 'home-outline';;
//           } else if (route.name === 'Page2') {
//             iconName = focused ? 'alarm' : 'alarm-outline';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       }}>
//       <Tab.Screen name="Menu" component={StackComponent} />
//       <Tab.Screen name="Page2" component={Page2} />
//     </Tab.Navigator>
//   );
// };

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       options={{headerShown: false}}
    //       component={Home}
    //     />
    //     <Stack.Screen
    //       name="Main"
    //       options={{headerShown: false}}
    //       component={TabComponent}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <MapPage />
  );
};

export default App;
