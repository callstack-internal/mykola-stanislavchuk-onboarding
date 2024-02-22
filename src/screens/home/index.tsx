import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Config from 'react-native-config';
import WheatherRow from '../../components/wheather-row';
import {CITIES_LIST} from '../../utils/constants';

const Home = () => {
  const [wheather, setWheater] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/group?id=${CITIES_LIST.join(
        ',',
      )}&appid=${Config.WHEATHER_API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        setWheater(res?.list);
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
    <FlatList
      data={wheather}
      keyExtractor={item => item.id}
      renderItem={({item}) => <WheatherRow wheather={item} />}></FlatList>
  );
};

export default Home;
