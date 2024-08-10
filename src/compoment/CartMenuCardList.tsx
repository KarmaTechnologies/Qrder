import {
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
import { deleteMenuAction } from '../actions/menuAction';
import DleleteModal from './DeleteModal';
import Loader from './Loader';
import CartMenuItems from './CartMenuItems';

type Props = {
  onRefresh?: () => void;
  refreshing: boolean
};

const CartMenuCardList = ({ onRefresh, refreshing }: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const { getMenuData } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();

  const removeMenuCardList = () => {
    let UserInfo = {
      data: selectItem?.id,
      onSuccess: (res: any) => {
        setRefresh(false);
      },
      onFailure: (Err: any) => { },
    };
    dispatch(deleteMenuAction(UserInfo));
  };


  const closeModal = () => {
    setVisible(false)
  }
  const onPressDelete = () => {
    setVisible(false)
    removeMenuCardList();
  }

  return (
    <View>
      <Text style={styles.itemsText}>
        {getMenuData?.length ? `Total ${getMenuData?.length} items` : null}
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.3}
        data={getMenuData}
        ListEmptyComponent={getMenuData?.length === 0 ? <Loader/> : <NoDataFound />}
        renderItem={({ item, index }) => {
          return (
            <CartMenuItems
              item={item}
              setDelete={() => {
                setVisible(true);
                setSelectItem(item);
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <View>
              {/* {true && <Loader size={'small'} />} */}
              <Spacer height={90} />
            </View>
          );
        }}
      />

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
