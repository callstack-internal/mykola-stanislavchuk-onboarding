import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Home from './src/screens/home';
import WeatherDetails from './src/screens/weather-details';

export type RootNavigationTypes = {
  Home: undefined;
  WeatherDetails: {coord: {lat: number; lon: number}};
};

const Stack = createNativeStackNavigator<RootNavigationTypes>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
