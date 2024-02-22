import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type WheatherRowProps = {
  wheather: any;
};

const WheatherRow = ({wheather}: WheatherRowProps) => {
  const navigation = useNavigation();
  const {name, main, coord, weather: details} = wheather;

  return (
    <TouchableOpacity
      testID="wheather-row"
      style={{
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
      }}
      onPress={() => {
        navigation.navigate('WeatherDetails', {
          coord,
        });
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <View
          style={{
            position: 'relative',
            width: 80,
            height: 50,
          }}>
          {details.map((el, idx) => (
            <Image
              style={{position: 'absolute', top: 0, left: 25 * idx}}
              width={50}
              height={50}
              key={el.id}
              source={{
                uri: `https://openweathermap.org/img/wn/${el.icon}@2x.png`,
              }}
            />
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '600'}}>{name}</Text>
          <Text style={{fontWeight: '300'}}>{details[0].main}</Text>
        </View>

        <View
          style={{backgroundColor: '#9c3a5f', borderRadius: 50, padding: 8}}>
          <Text style={{color: '#fff'}}>{`${main.temp} F`}</Text>
        </View>
        <Text>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WheatherRow;
