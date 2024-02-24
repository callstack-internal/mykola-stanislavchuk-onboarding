import React, {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';

export const AppWrapper: React.FC<{children: ReactNode}> = ({children}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
