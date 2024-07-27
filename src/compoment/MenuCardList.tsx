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
import PrimaryButton from './PrimaryButton';
import CCModal from './CCModal';
import { strings } from '../i18n/i18n';
import { deleteMenuAction } from '../actions/menuAction';

type Props = {
  onRefresh?: () => void;
  refreshing: boolean
};

const MenuCardList = ({ onRefresh, refreshing }: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const { getMenuData } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();

console.log('selectItem',selectItem);

  const removeMenuCardList = () => {
    let UserInfo = {
      data: selectItem?.id,
      onSuccess: (res: any) => {
        setRefresh(false);
      },
      onFailure: (Err: any) => {},
    };
    dispatch(deleteMenuAction(UserInfo));
  };

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
        ListEmptyComponent={<NoDataFound />}
        renderItem={({ item, index }) => {
          return (
            <MenuItems
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
      <CCModal
        visible={visible}
        close={setVisible}
        containStyle={{ alignItems: 'center' }}
        contain={
          <View>
            <Text style={styles.containerContain}>
              {strings('myMenuList.are_you_sure')}  
            </Text>
            <View
              style={[
                styles.btnContainer,
                { marginTop: hp(10), gap: wp(20), justifyContent: 'center' },
              ]}>
              <PrimaryButton
                title={strings('myMenuList.no')}
                onPress={() => {
                  setVisible(!visible);
                }}
                extraStyle={{
                  backgroundColor: colors.Primary_Orange,
                  alignSelf: 'center',
                  marginTop: 10,
                  width: wp(80),
                  height: hp(40),
                }}
                titleStyle={{
                  ...commonFontStyle(400, 15, colors.white),
                }}
              />
              <PrimaryButton
                title={strings('myMenuList.yes')}
                onPress={() => {
                  setVisible(!visible);
                  removeMenuCardList();
                }}
                extraStyle={{
                  backgroundColor: colors.Primary_Orange,
                  alignSelf: 'center',
                  marginTop: 10,
                  width: wp(80),
                  height: hp(40),
                }}
                titleStyle={{
                  ...commonFontStyle(400, 15, colors.white),
                }}
              />
            </View>
          </View>
        }
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
