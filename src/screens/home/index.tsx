import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Config from 'react-native-config';
import WheatherRow from '../../components/weather-row';
import {CITIES_LIST} from '../../utils/constants';
import {NativeModules} from 'react-native';

const Home = () => {
  const [wheather, setWheater] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [coords, setCoords] = useState();
  const [weatherLocation, setWeatherLocation] = useState();
  const {RNLocation} = NativeModules;

  const location = async () => {
    await RNLocation.getCoordinates(
      data => {
        setCoords(data);
      },
      error => {
        console.log('error', error);
      },
    );
  };

  useEffect(() => {
    if (coords) {
      const {latitude, longitude} = coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Config.WHEATHER_API_KEY}&units=metric`,
      )
        .then(res => res.json())
        .then(res => {
          setWeatherLocation(res);
        })
        .catch(e => {
          console.log('error', e);
        });
    }
  }, [coords]);

  useEffect(() => {
    location();

    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/group?id=${CITIES_LIST.join(
        ',',
      )}&appid=${Config.WHEATHER_API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(res => {
        setWheater(res?.list);
      })
      .catch(e => {
        console.log('E', e);
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

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {weatherLocation && (
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 20,
              marginVertical: 20,
            }}>
            Weather in your location: {weatherLocation.name}
          </Text>
          <View>
            <WheatherRow weather={weatherLocation} />
          </View>
        </View>
      )}
      <FlatList
        data={wheather}
        style={{flex: 1}}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 20}}>
            Weather in other locations
          </Text>
        }
        ListFooterComponent={() =>
          isError && <Text>Something went wrong with API fetch</Text>
        }
        renderItem={({item}) => <WheatherRow weather={item} />}
      />
    </View>
  );
};

export default Home;
