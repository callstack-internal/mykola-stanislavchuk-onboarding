import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const WeatherDetails = ({route}) => {
  const {coord} = route.params;

  const [wheatherDetails, setWheatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=6a2275a5cacc5391a8d5bd2e7579488a`,
    )
      .then(res => res.json())
      .then(res => {
        setWheatherDetails(res);
      })
      .catch(e => {
        console.log('E', e);
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
