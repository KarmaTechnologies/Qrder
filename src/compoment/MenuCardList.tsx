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
  refreshing: boolean
};

const MenuCardList = ({ onRefresh, refreshing,showChef }: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const { getMenuData,allMenuCount } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();
  const [loading, setloading] = useState(false);

  const removeMenuCardList = () => {
    let UserInfo = {
      data: selectItem?.id,
      onSuccess: (res: any) => {
        setRefresh(false);
      },
      onFailure: (Err: any) => { 
        setRefresh(false);
      },
    };
    dispatch(deleteMenuAction(UserInfo));
  };


  const getPostList = page => {
    let obj = {
      data: {
        page: page,
        limit: 10,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
        setloading(false)
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setloading(false)
      },
    };
    dispatch(getMenuAction(obj));
  };


  const closeModal = () => {
    setVisible(false)
  }
  const onPressDelete = () => {
    setVisible(false)
    removeMenuCardList();
  }


  const fetchMoreData = () => {
      if (getMenuData) {
        if (getMenuData.length < allMenuCount) {
          setloading(true);
          getPostList(page + 1);
        }
      }
    
  };

  return (
    <View>
      <Text style={styles.itemsText}>
        {getMenuData?.length ? `Total ${getMenuData?.length} items` : null}
      </Text>
     {getMenuData&& <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.3}
        data={getMenuData}
        ListFooterComponent={() => {
          return (
            <View>
              {getMenuData && loading && (
                <ActivityIndicator size={'large'} color={colors.black} />
              )}
              <View style={{ height: 50 }} />
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
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return (
            <View>
              {/* {true && <Loader size={'small'} />} */}
              <Spacer height={90} />
            </View>
          );
        }}
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
