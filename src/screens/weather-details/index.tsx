import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {RootNavigationTypes} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Config from 'react-native-config';

const WeatherDetails = ({
  route,
}: NativeStackScreenProps<RootNavigationTypes, 'WeatherDetails'>) => {
  const {coord} = route.params;

  const [wheatherDetails, setWheatherDetails] = useState<{
    main: Record<string, any>;
  }>({main: {}});

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${Config.WHEATHER_API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(res => {
        setWheatherDetails(res);
      })
      .catch(e => {
        console.log('error', e);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <>
      {Object.keys(wheatherDetails?.main ?? {})?.map(el => (
        <View
          key={el}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 12,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#ddd',
          }}>
          <Text>{el}</Text>
          <Text>{wheatherDetails.main[el]}</Text>
        </View>
      ))}
    </>
  );
};

export default WeatherDetails;
