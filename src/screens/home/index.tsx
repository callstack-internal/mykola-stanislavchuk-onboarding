import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import WheatherRow from '../../components/wheather-row';

const Home = () => {
  const [wheather, setWheater] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/group?id=5128581,5368361,4887398&appid=6a2275a5cacc5391a8d5bd2e7579488a`,
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
