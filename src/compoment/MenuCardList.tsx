import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle } from '../theme/fonts';
import NoDataFound from './NoDataFound';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import MenuItems from './MenuItems';
import { strings } from '../i18n/i18n';
import { deleteMenuAction } from '../actions/menuAction';
import DleleteModal from './DeleteModal';

type Props = {
  onRefresh?: () => void;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  loadMoreData: () => void;
  loadingMore: boolean;
  loading: boolean;
  onMomentumScrollBegin: () => void;
  showChef: any
};

const MenuCardList = ({
  onRefresh,
  refreshing,
  showChef,
  setRefreshing,
  loadMoreData,
  loadingMore,
  onMomentumScrollBegin,
  loading,
}: Props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const { getMenuData, allMenuCount } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();

  const currentData = useRef();
  currentData.current = getMenuData;

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

  const closeModal = () => {
    setVisible(false);
  };
  const onPressDelete = () => {
    setVisible(false);
    removeMenuCardList();
  };

  const hasMoreItems = currentData.current?.length < allMenuCount;
  return (
    <>
      <Text style={styles.itemsText}>
        {currentData.current?.length
          ? `${strings('CardMenuList.total')} ${currentData.current?.length} ${strings('CardMenuList.items')}`
          : null}
      </Text>
      {currentData.current && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={currentData.current}
          onMomentumScrollBegin={onMomentumScrollBegin}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListFooterComponent={() => (
            <View>
              {hasMoreItems && !loadingMore && (
                <TouchableOpacity
                  onPress={loadMoreData}
                  style={[styles.seeMoreButton]}
                >
                  <Text style={styles.seeMoreText}>
                    {strings('CardMenuList.see_more')}
                  </Text>
                </TouchableOpacity>
              )}
              {loadingMore && (
                <View style={styles.seeMoreButton}>
                  <ActivityIndicator size={'small'} color={colors.black} />
                </View>

              )}
              <View style={{ height: 70}} />
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size={'small'} color={colors.black} />
            ) : (
              <NoDataFound />
            )
          }
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
        // onEndReached={loadMoreData}
        />
      )}

      <DleleteModal
        title={strings('myMenuList.are_you_sure')}
        rightText={strings('myMenuList.yes')}
        leftText={strings('myMenuList.no')}
        visible={visible}
        closeModal={() => closeModal()}
        onPressDelete={() => onPressDelete()}
      />
    </>
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
    seeMoreButton: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    seeMoreText: {
      color: colors.black,
    },
  });
};
