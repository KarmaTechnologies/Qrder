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
  Image
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import { strings } from '../../i18n/i18n';
import MenuCardList from '../../compoment/MenuCardList';
import { getCuisinesAction } from '../../actions/cuisinesAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getCuisinesMenuListAction,
  getMenuAction,
} from '../../actions/menuAction';
import { GET_EMPTY_MENU_LIST } from '../../redux/actionTypes';


type Props = {};

const MyMenuList = (props: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const isFocuse = useIsFocused();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
  const [refreshing, setRefreshing] = React.useState(false);
  const [cuisineId, setCuisineId] = React.useState(0);
  const dispatch = useAppDispatch();
  const { getCuisines, getMenuData, allMenuCount } =
    useAppSelector(state => state.data);
  const { isDarkTheme } = useAppSelector(state => state.common);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onEndReached, setOnEndReached] = useState(true);
  const refFlatList = useRef();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (tabSelection === 'All') {
      getMenuList(1);
    } else {
      getAllCuisinesMenuList(cuisineId, 1);
    }
  }, [refreshing, tabSelection]);

  useEffect(() => {
    getCuisinesList(1);
    if (tabSelection === 'All') {
      getMenuList(1);
    } else {
      getAllCuisinesMenuList(cuisineId, 1);
    }
  }, [isFocuse]);

  const getCuisinesList = (pages: number) => {
    let obj = {
      data: {
        page: pages,
        limit: 5,
        pagination: false,
      },
      onSuccess: (res: any) => { },
      onFailure: (Err: any) => { },
    };
    dispatch(getCuisinesAction(obj));
  };

  const getMenuList = (pages: number) => {
    let obj = {
      data: {
        page: pages,
        limit: 7,
        pagination: true,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setPage(pages);
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setLoading(false);
      },
    };
    dispatch(getMenuAction(obj));
  };

  const getAllCuisinesMenuList = (id: number, pages: number) => {
    let obj = {
      id: id,
      data: {
        page: pages,
        limit: 7,
        pagination: true,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setPage(pages);
        setLoading(false)
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setLoading(false)
      },
    };
    dispatch(getCuisinesMenuListAction(obj));
  };

  const loadMoreData = () => {
    if (!onEndReached && getMenuData?.length >= 7) {
      if (getMenuData && getMenuData?.length < allMenuCount) {
        setLoadingMore(true);
        if (tabSelection === 'All') {
          getMenuList(page + 1);
        } else {
          getAllCuisinesMenuList(cuisineId, page + 1);
        }
      }
    }
  };

  const onTabChange = (item: any) => {
    setPage(1);
    setTabSelection(item.name);
    setCuisineId(item.id);
    setLoading(true);
    dispatch({ type: GET_EMPTY_MENU_LIST, payload: false });
    setTimeout(() => {
      if (item.name === 'All') {
        getMenuList(1);
      } else {
        getAllCuisinesMenuList(item.id, 1);
      }
    }, 100);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
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

      {getCuisines && getCuisines.length !== 0 && (
        <View style={styles.tabMainView}>
          <FlatList
            data={[
              { name: 'All', label: strings('myMenuList.all'), page: 0, id: 0 },
              ...getCuisines,
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>  onTabChange(item)}
                style={[
                  styles.tabItemView,
                  {
                    // borderBottomWidth: 1,
                    backgroundColor:  tabSelection === item.name
                    ? colors.orange_bg
                    : colors.card_bg,
                    marginBottom: hp(16),
                    // borderColor:
                    //   tabSelection === item.name
                    //     ? colors.headerText3
                    //     : colors.card_bg,
                  },
                ]}>
                   <View
                    style={[
                        styles.imageView,
                        { backgroundColor: tabSelection === item.name
                          ? colors.image_Bg_gray
                          : colors.image_Bg_gray },
                    ]}
                />
                <Text
                  style={{
                    color:
                      tabSelection === item.name
                        ? colors.black
                        : colors.Title_Text,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.underlineAll} />
        </View>
      )}

      <View style={styles.boxContainer} key={'1'}>
        <MenuCardList
          onRefresh={() => {
            onRefresh();
          }}
          loading={loading}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          loadMoreData={() => loadMoreData()}
          loadingMore={loadingMore}
          onMomentumScrollBegin={() => {
            setOnEndReached(false)
          }}
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
      flexDirection:'row',
      paddingVertical:hp(5),
      paddingHorizontal:wp(10),
      borderRadius:50
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
    imageView: {
      width: wp(30),
      height: wp(30),
      borderRadius: wp(30),
      marginRight:wp(8)
  },
  });
};
