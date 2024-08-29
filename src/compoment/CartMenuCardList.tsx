import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle } from '../theme/fonts';
import NoDataFound from './NoDataFound';
import { useAppSelector } from '../redux/hooks';
import Loader from './Loader';
import CartMenuItems from './CartMenuItems';
import { strings } from '../i18n/i18n';

type Props = {
  onRefresh?: () => void;
  refreshing: boolean;
  loadMoreData: () => void;
  loadingMore: boolean;
  onMomentumScrollBegin: () => void;
  loading: boolean
};

const CartMenuCardList = ({ onRefresh, refreshing, loadMoreData, loadingMore, onMomentumScrollBegin, loading }: Props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { getCanteenMenuData } = useAppSelector(state => state.data);
  const currentData = useRef();
  currentData.current = getCanteenMenuData;


  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.itemsText}>
            {currentData.current?.length ? `${strings('CardMenuList.total')} ${currentData.current?.length} ${strings('CardMenuList.items')}` : null}
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0.3}
            data={currentData.current}
            renderItem={({ item }) => (
              <CartMenuItems
                item={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              loadingMore && (
                <ActivityIndicator size={'small'} color={colors.black} />
              )
            )}
            ListEmptyComponent={!loading && (
              <NoDataFound />
            )}
            onEndReached={loadMoreData}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        </>
      )}
    </View>
  );
};

export default CartMenuCardList;

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
