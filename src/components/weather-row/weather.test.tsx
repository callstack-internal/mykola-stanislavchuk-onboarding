import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherRow from '.';
import {AppWrapper} from '../../utils/testMocks';

describe('Weather row', () => {
  const mockCityName = 'Gothem';
  const mockWeather = {
    name: mockCityName,
    main: {temp: 100},
    weather: [{main: 'snow', id: 1}],
    coord: {lat: 1, lon: 2},
  };

  test('should render correctly', () => {
    const {toJSON} = render(
      <AppWrapper>
        <WeatherRow weather={mockWeather} />
      </AppWrapper>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('check city name', () => {
    const {getByTestId} = render(
      <AppWrapper>
        <WeatherRow weather={mockWeather} />
      </AppWrapper>,
    );

    expect(getByTestId('cityName')).toHaveTextContent(mockCityName);
  });
});
