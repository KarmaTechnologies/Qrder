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
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import PagerView from 'react-native-pager-view';
import { strings } from '../../i18n/i18n';
import MenuCardList from '../../compoment/MenuCardList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CartMenuCardList from '../../compoment/CartMenuCardList';
import { getCanteenCuisineAction, getCanteenMenuAction, getStudentMenuListAction } from '../../actions/commonAction';
import { GET_CANTEEN_CUISINE_LIST, GET_CANTEEN_MENU_LIST } from '../../redux/actionTypes';
import Loader from '../../compoment/Loader';

type Props = {};

const StudentMenuList = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [cuisineId, setCuisineId] = React.useState(0);
  const ref = React.createRef(PagerView);
  const dispatch = useAppDispatch();
  const {  getCanteenCuisines } = useAppSelector(state => state.data);
  const { isDarkTheme } = useAppSelector(state => state.common);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (tabSelection === 'All') {
      getMenuList();
    } else {
      getAllCuisinesMenuList(cuisineId)
    }
  }, [refreshing, cuisineId]);

  useEffect(() => {
    getCanteenCuisineList();
    getMenuList();
  }, []);

  const getCanteenCuisineList = () => {
    let obj = {
      params: params?.selectID,
      onSuccess: (res: any) => { },
      onFailure: (Err: any) => { },
    };
    dispatch(getCanteenCuisineAction(obj));
  };

  const getMenuList = () => {
    let obj = {
      params: params?.selectID,
      onSuccess: (res: any) => {
        setIsLoading(false)
      },
      onFailure: (Err: any) => { 
        setIsLoading(false)
      },
    };
    dispatch(getCanteenMenuAction(obj));
  };

  const getAllCuisinesMenuList = (id: number) => {
    let obj = {
      data: id,
      onSuccess: (res: any) => {
        setRefreshing(false);
        setIsLoading(false)
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setIsLoading(false)
      },
    };
    dispatch(getStudentMenuListAction(obj));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
          dispatch({ type: GET_CANTEEN_CUISINE_LIST, payload: [] });
          dispatch({ type: GET_CANTEEN_MENU_LIST, payload: []});
        }}
        onRightPress={() => {
          console.log('dee');
        }}
        mainShow={true}
        title={strings('myMenuList.my_menu')}
        extraStyle={styles.headerContainer}
        isShowIcon={false}
      />
     {isLoading ?<View>
        <Loader/>
      </View> : <>
      <View style={styles.tabMainView}>
        {getCanteenCuisines?.length === 0 ? null :
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { name: 'All', label: strings('myMenuList.all'), page: 0, id: 0 },
              ...getCanteenCuisines,
            ]?.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setTabSelection(tab.name);
                  ref.current?.setPage(index);
                  setCuisineId(tab?.id)
                  if (tab.name === 'All') {
                    getMenuList()
                  } else {
                    getAllCuisinesMenuList(tab?.id)
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
          </ScrollView>}
        <View style={styles.underlineAll} />
      </View>

      <View style={styles.boxContainer} key={'1'}>
        <CartMenuCardList onRefresh={() => {
          onRefresh()
        }} refreshing={refreshing} />
      </View>
      </>
     }
    </View>
  );
};

export default StudentMenuList;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
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
