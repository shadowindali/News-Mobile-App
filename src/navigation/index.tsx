import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { screens } from '../constants/screens.ts';
import { RootStackParamList } from '../types/navigation';
import Home from '../screens/Home/index.tsx';
import Search from '../screens/Search/index.tsx';
import NewsDetail from '../screens/NewsDetail/index.tsx';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <RootStack.Screen name={screens.home} component={Home} />
        <RootStack.Screen name={screens.search} component={Search} />
        <RootStack.Screen name={screens.newsDetail} component={NewsDetail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
