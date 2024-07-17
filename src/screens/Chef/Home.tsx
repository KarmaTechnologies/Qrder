import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import ChartsView from '../../compoment/ChartsView';
import CardView from '../../compoment/CardView';
import { commonFontStyle, hp, statusBarHeight, wp } from '../../theme/fonts';
import { Icons } from '../../utils/images';
import OrderModal from '../../compoment/OrderModal';
import { screenName } from '../../navigation/screenNames';

type Props = {};

const Home = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [value, setValue] = useState('');
  const [runningOrderModal, setRunninOrderModal] = useState(false);
  const [orderRequestModal, setOrderRequestModal] = useState(false);

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
        onPressProfile={() => { }}
        onPressCart={() => { }}
        location={value}
        onPressLocation={onPressLocation}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerCard}>
          <CardView containerStyle={styles.headerView} onPress={() => setRunninOrderModal(true)} isDisabled={true}>
            <Text style={styles.headerText}>20</Text>
            <Text style={styles.headerSubText}>Running Orders</Text>
          </CardView>
          <CardView isDisabled={true} onPress={() => setOrderRequestModal(true)} containerStyle={styles.headerView}>
            <Text style={styles.headerText}>05</Text>
            <Text style={styles.headerSubText}>Order Request</Text>
          </CardView>
        </View>
        <CardView>
          <ChartsView />
        </CardView>
        <CardView containerStyle={styles.reviewView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.reviewStyle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All Reviews</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
            <Image source={Icons.star} style={styles.starStyle} />
            <Text style={styles.rateText}>4.9</Text>
            <Text style={styles.rateText1}>Total 20 Reviews</Text>
          </View>
        </CardView>
        <CardView containerStyle={styles.reviewView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.reviewStyle}>Populer Items This Weeks</Text>
            <TouchableOpacity onPress={() => navigation.navigate(screenName.FoodDetails)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[1, 2, 3, 4]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={() => {
              return <View style={styles.itemStyle}></View>;
            }}
          />
        </CardView>
        <View style={{ height: 90 }} />

        {runningOrderModal &&
          <OrderModal isVisible={runningOrderModal} onPressCancel={() => setRunninOrderModal(false)}
          />
        }

        {orderRequestModal &&
          <OrderModal
            isVisible={orderRequestModal}
            onPressCancel={() => setOrderRequestModal(false)}
            isShow={true}
          />}
      </ScrollView>
    </View>
  );
};

export default Home;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.Primary_BG,
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
    reviewStyle: {
      ...commonFontStyle(400, 14, colors.Title_Text),
      flex: 1,
    },
    seeAllText: {
      ...commonFontStyle(400, 14, colors.Primary_Orange),
      textDecorationLine: 'underline',
    },
    rateText: {
      marginLeft: 4,
      ...commonFontStyle(700, 21, colors.Primary_Orange),
    },
    rateText1: {
      ...commonFontStyle(400, 14, colors.Title_Text),
      marginLeft: 18,
    },
    reviewView: {
      paddingHorizontal: 16,
      paddingVertical: 15,
      marginTop: 14,
    },
    starStyle: {
      width: 25,
      height: 25,
    },
    itemStyle: {
      width: wp(150),
      height: wp(150),
      borderWidth: 1,
      marginTop: 20,
      marginBottom: 8,
      marginLeft: 16,
      borderRadius: 8
    },
  });
};
