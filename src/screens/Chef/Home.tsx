import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  getAddress,
  requestLocationPermission,
} from '../../utils/loactionHandler';
import {
  getAsyncLocation,
  setAsyncLocation,
} from '../../utils/asyncStorageManager';
import HomeHeader from '../../compoment/HomeHeader';

type Props = {};

const Home = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [value, setValue] = useState('');

  const GetStatus = async () => {
    const Status = await getAsyncLocation();
    setValue(Status);
  };

  console.log('value', value);

  const getCurrentLocation = async () => {
    await requestLocationPermission(
      async response => {
        await getAddress(
          response,
          async (result: any) => {
            console.log(
              'result?.results?.[0]?.formatted_address',
              result?.results?.[0]?.formatted_address,
            );

            setValue(result?.results?.[0]?.formatted_address);
            result?.results?.length
              ? await setAsyncLocation(result?.results?.[0]?.formatted_address)
              : await setAsyncLocation('Mohali,Punjab');
            await GetStatus();
          },
          err => {
            console.log('map', err);
          },
        );
      },
      err => {
        console.log('Home Location API', err);
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onPressLocation = () => {
    // @ts-ignore
    // navigate(screenName.Map_Location);
    // navigate(screenName.SelectLocation);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.Primary_BG}
      />
      <HomeHeader
        onPressProfile={() => {}}
        onPressCart={() => {}}
        location={value}
        onPressLocation={onPressLocation}
        // mainShow={true}
      />
      <View></View>
    </View>
  );
};

export default Home;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.Primary_BG,
    },
  });
};
