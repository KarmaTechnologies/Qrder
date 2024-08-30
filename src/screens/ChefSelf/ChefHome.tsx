import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
  getAddress,
  requestLocationPermission,
} from '../../utils/loactionHandler';
import {
  getAsyncLocation,
  setAsyncLocation,
} from '../../utils/asyncStorageManager';
import HomeHeader from '../../compoment/HomeHeader';
import CardView from '../../compoment/CardView';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import OrderModal from '../../compoment/OrderModal';
import { strings } from '../../i18n/i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCuisinesAction } from '../../actions/cuisinesAction';
import { getChefsAction } from '../../actions/chefsAction';

const ChefHome = () => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [value, setValue] = useState('');
  const [runningOrderModal, setRunninOrderModal] = useState(false);
  const [orderRequestModal, setOrderRequestModal] = useState(false);
  const { isDarkTheme } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const GetStatus = async () => {
    const Status = await getAsyncLocation();
    setValue(Status);
  };

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
    getCuisinesList()
    getChefsList()
  }, []);

  const getCuisinesList = () => {
    let obj = {
      data: {
        page: 1,
        limit: 15,
        pagination: false
      },
      onSuccess: (res: any) => { },
      onFailure: (Err: any) => { },
    };
    dispatch(getCuisinesAction(obj));
  };

  const getChefsList = () => {
    let obj = {
      onSuccess: (res: any) => { },
      onFailure: (Err: any) => { },
    };
    dispatch(getChefsAction(obj));
  };

  const onPressLocation = () => {
    // @ts-ignore
    // navigate(screenName.Map_Location);
    // navigate(screenName.SelectLocation);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onPressProfile={() => { }}
        onPressCart={() => { }}
        location={value}
        onPressLocation={onPressLocation}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerCard}>
          <CardView containerStyle={styles.headerView} onPress={() => setRunninOrderModal(true)} isDisabled={true}>
            <Text style={styles.headerText}>20</Text>
            <Text style={styles.headerSubText}>{strings("home.running_orders")}</Text>
          </CardView>
          <CardView isDisabled={true} onPress={() => setOrderRequestModal(true)} containerStyle={styles.headerView}>
            <Text style={styles.headerText}>05</Text>
            <Text style={styles.headerSubText}>{strings("home.order_request")}</Text>
          </CardView>
        </View>

        <View style={{ height: 100 }} />

        {runningOrderModal &&
          <OrderModal
            isVisible={runningOrderModal}
            onPressCancel={() => setRunninOrderModal(false)}
            isRunning={true}
          />
        }

        {orderRequestModal &&
          <OrderModal
            isVisible={orderRequestModal}
            onPressCancel={() => setOrderRequestModal(false)}
          />}
      </ScrollView>
    </View>
  );
};

export default ChefHome;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      gap: 18,
      marginVertical: 10,
    },
    headerView: {
      width: '43%',
      height: hp(110),
      marginHorizontal: 0,
      justifyContent: 'center',
    },
    headerText: {
      alignSelf: 'center',
      ...commonFontStyle(700, 52, colors.Title_Text),
    },
    headerSubText: {
      ...commonFontStyle(700, 13, colors.cardText),
      textTransform: 'uppercase',
      alignSelf: 'center',
      marginBottom: 10,
    },
  });
};
