import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import PagerView from 'react-native-pager-view';
import NoDataFound from '../../compoment/NoDataFound';
import OngoingCardList from '../../compoment/OngoingCardList';
import Loader from '../../compoment/Loader';
import {strings} from '../../i18n/i18n';
import MenuCardList from '../../compoment/MenuCardList';
import {getCuisinesAction} from '../../actions/cuisinesAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getMenuAction} from '../../actions/menuAction';

type Props = {};

const tabs = [
  {key: 'All', label: strings('myMenuList.all'), page: 0},
  {key: 'Breakfast', label: strings('myMenuList.breakfast'), page: 1},
  {key: 'Lunch', label: strings('myMenuList.lunch'), page: 2},
  {key: 'Dinner', label: strings('myMenuList.dinner'), page: 3},
];

const MyMenuList = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
  const [tabSelectionIndex, setTabSelectionIndex] = useState(0);
  const ref = React.createRef(PagerView);
  const dispatch = useAppDispatch();
  const {getCuisines, getMenuData} = useAppSelector(state => state.data);

  const onPageSelected = (event: {nativeEvent: {position: number}}) => {
    const pageIndex = event.nativeEvent.position;
    setTabSelection(tabs[pageIndex].key);
    setTabSelectionIndex(pageIndex);
  };

  const onPressTrack = () => {};

  const onCancelBtn = () => {};

  useEffect(() => {
    getCityList();
    getMenuList();
  }, []);

  const getCityList = () => {
    let obj = {
      onSuccess: (res: any) => {},
      onFailure: (Err: any) => {},
    };
    dispatch(getCuisinesAction(obj));
  };
  const getMenuList = () => {
    let obj = {
      onSuccess: (res: any) => {},
      onFailure: (Err: any) => {},
    };
    dispatch(getMenuAction(obj));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        onRightPress={() => {
          console.log('dee');
        }}
        mainShow={true}
        title={strings('myMenuList.my_menu')}
        extraStyle={styles.headerContainer}
        isShowIcon={false}
      />
      <View style={styles.tabMainView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {name: 'All', label: strings('myMenuList.all'), page: 0},
            ...getCuisines,
          ]?.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setTabSelection(tab.name);
                ref.current?.setPage(index);
                setTabSelectionIndex(index);
              }}
              style={[
                styles.tabItemView,
                {
                  borderBottomWidth: 1,
                  paddingBottom: hp(16),
                  borderColor:
                    tabSelection == tab.name
                      ? colors.headerText3
                      : colors.card_bg,
                },
              ]}>
              <Text
                style={[
                  {
                    color:
                      tabSelection === tab.name
                        ? colors.headerText3
                        : colors.Title_Text,
                  },
                ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.underlineAll} />
      </View>

      <View style={styles.boxContainer} key={'1'}>
        <MenuCardList />
      </View>
      {/* <PagerView
        style={{flex: 1}}
        initialPage={tabSelectionIndex}
        ref={ref}
        onPageSelected={onPageSelected}>
        <View style={styles.boxContainer} key={'1'}>
          <MenuCardList />
        </View>

        <View style={styles.boxContainer} key={'2'}>
          <MenuCardList />
        </View>

        <View style={styles.boxContainer} key={'3'}>
          <MenuCardList />
        </View>

        <View style={styles.boxContainer} key={'4'}>
          <MenuCardList />
        </View>
      </PagerView> */}
    </View>
  );
};

export default MyMenuList;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
      backgroundColor: colors.white,
    },
    tabMainView: {
      flexDirection: 'row',
      marginBottom: hp(24),
      marginHorizontal: wp(24),
    },
    tabItemView: {
      flex: 1,
      marginTop: hp(14),
      alignItems: 'center',
      marginRight: 20,
      borderBottomWidth: 1,
    },
    ongoingText: {
      ...commonFontStyle(700, 14, colors.gray_200),
    },
    historyText: {
      ...commonFontStyle(700, 14, colors.gray_200),
    },
    selectUnderline: {
      height: 2,
      backgroundColor: colors.headerText3,
      marginTop: hp(16),
      width: wp(45),
    },
    underlineAll: {
      height: 1,
      width: SCREEN_WIDTH,
      backgroundColor: colors.card_bg,
      position: 'absolute',
      bottom: 0,
      zIndex: -1,
    },
    boxContainer: {
      flex: 1,
      marginHorizontal: wp(16),
    },
  });
};
