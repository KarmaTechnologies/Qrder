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
import {strings} from '../../i18n/i18n';
import MenuCardList from '../../compoment/MenuCardList';
import {getCuisinesAction} from '../../actions/cuisinesAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import { getCuisinesMenuListAction, getMenuAction} from '../../actions/menuAction';

type Props = {};

const MyMenuList = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
  const [refreshing, setRefreshing] = React.useState(false);
  const [cuisineId, setCuisineId] = React.useState(0);
  const ref = React.createRef(PagerView);
  const dispatch = useAppDispatch();
  const {getCuisines, getMenuData} = useAppSelector(state => state.data);
  const { isDarkTheme } = useAppSelector(state => state.common);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (tabSelection === 'All') {
      getMenuList();
    } else {
      getAllCuisinesMenuList(cuisineId);
    }
  }, [refreshing, cuisineId]);

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
      data: {
        page: 1,
        limit: 15,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
      },
    };
    dispatch(getMenuAction(obj));
  };

  const getAllCuisinesMenuList = (id: number) => {
    let obj = {
      data: id,
      onSuccess: (res: any) => {
        setRefreshing(false);
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
      },
    };
    dispatch(getCuisinesMenuListAction(obj));
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
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
      {getCuisines.length !== 0 && (
        <View style={styles.tabMainView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {name: 'All', label: strings('myMenuList.all'), page: 0, id: 0},
              ...getCuisines,
            ]?.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setTabSelection(tab.name);
                  ref.current?.setPage(index);
                  setCuisineId(tab?.id);
                  if (tab.name === 'All') {
                    getMenuList();
                  } else {
                    getAllCuisinesMenuList(tab?.id);
                  }
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
      )}

      <View style={styles.boxContainer} key={'1'}>
        <MenuCardList
          onRefresh={() => {
            onRefresh();
          }}
          refreshing={refreshing}
        />
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
