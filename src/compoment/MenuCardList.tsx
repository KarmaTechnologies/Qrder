import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import NoDataFound from './NoDataFound';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import MenuItems from './MenuItems';
import Spacer from './Spacer';
import { strings } from '../i18n/i18n';
import { deleteMenuAction, getMenuAction } from '../actions/menuAction';
import DleleteModal from './DeleteModal';
import Loader from './Loader';

type Props = {
  onRefresh?: () => void;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  loadMoreData: () => void;
  loadingMore:boolean
};

const MenuCardList = ({ onRefresh, refreshing, showChef, setRefreshing, loadMoreData, loadingMore }: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const { getMenuData, allMenuCount } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();
  // const [page, setPage] = useState(1);
  // const [loadingMore, setLoadingMore] = useState(false);


  const removeMenuCardList = () => {
    let UserInfo = {
      data: selectItem?.id,
      onSuccess: (res: any) => {
        setRefreshing(false);
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
      },
    };
    dispatch(deleteMenuAction(UserInfo));
  };


  // const getPostList = (pages: number) => {
  //   let obj = {
  //     data: {
  //       page: pages,
  //       limit: 6,
  //     },
  //     onSuccess: (res: any) => {
  //       setRefreshing(false);
  //       setLoadingMore(false);
  //     },
  //     onFailure: (Err: any) => {
  //       setRefreshing(false);
  //       setLoadingMore(false);
  //     },
  //   };
  //   dispatch(getMenuAction(obj));
  // };


  const closeModal = () => {
    setVisible(false)
  }
  const onPressDelete = () => {
    setVisible(false)
    removeMenuCardList();
  }


  // const loadMoreData = () => {
  //   console.log('hereeee>>>>>>>')
  //   if (allMenuCount && getMenuData) {
  //     if (getMenuData.length < allMenuCount) {
  //       console.log('+++++++++++')
  //       setLoadingMore(true);
  //       setPage(page + 1);
  //       getPostList(page);
  //     }
  //   }
  // };


  return (
    <View>
      <Text style={styles.itemsText}>
        {getMenuData?.length ? `Total ${getMenuData?.length} items` : null}
      </Text>
      {getMenuData && <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.1}
        data={getMenuData}
        ListFooterComponent={() => {
          return (
            <View>
              {loadingMore && (
                <ActivityIndicator size={'small'} color={colors.black} />
              )}
              <View style={{ height: 110 }} />
            </View>
          );
        }}
        ListEmptyComponent={<NoDataFound />}
        renderItem={({ item, index }) => {
          return (
            <MenuItems
              item={item}
              showChef={showChef}
              setDelete={() => {
                setVisible(true);
                setSelectItem(item);
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
      />}

      <DleleteModal
        title={strings('myMenuList.are_you_sure')}
        rightText={strings('myMenuList.yes')}
        leftText={strings('myMenuList.no')}
        visible={visible} closeModal={() => closeModal()}
        onPressDelete={() => onPressDelete()}
      />
    </View>
  );
};

export default MenuCardList;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    itemsText: {
      ...commonFontStyle(400, 14, colors.gray_400),
    },
    containerContain: {
      alignSelf: 'center',
      ...commonFontStyle(400, 16, colors.black),
    },
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};
