import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import {strings} from '../../i18n/i18n';
import NoDataFound from '../../compoment/NoDataFound';
import Spacer from '../../compoment/Spacer';
import ChefNameCardList from '../../compoment/ChefNameCardList';
import DleleteModal from '../../compoment/DeleteModal';
import {screenName} from '../../navigation/screenNames';
import {Icons} from '../../utils/images';
import {deleteChefAction, getChefsAction} from '../../actions/chefsAction';
import Loader from '../../compoment/Loader';

type Props = {};

const ChefNameList = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const {isDarkTheme} = useAppSelector(state => state.common);
  const {getChefsData} = useAppSelector(state => state.data);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectItem, setSelectItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getAllData, setGetAllData] = useState(getChefsData);

  useFocusEffect(
    React.useCallback(() => {
      getChefsList();
    }, []),
  );
  
  useEffect(() => {
    getChefsList();
  }, [getChefsData?.length]);

  const removeChef = () => {
    let UserInfo = {
      params: selectItem?.id,
      onSuccess: (res: any) => {},
      onFailure: (Err: any) => {},
    };
    dispatch(deleteChefAction(UserInfo));
  };

  const closeModal = () => {
    setVisible(false);
  };
  const onPressDelete = () => {
    setVisible(false);
    removeChef();
  };

  const getChefsList = () => {
    // setLoading(true);
    let obj = {
      data: {
        page: 1,
        limit: 5,
        pagination: false
      },
      onSuccess: (res: any) => {
        setLoading(false);
        setGetAllData(res.data?.data);
      },
      onFailure: (Err: any) => {
        setLoading(false);
      },
    };
    dispatch(getChefsAction(obj));
  };

  const onSearchBar = (text:string) => {
    setSearchQuery(text);
    const filteredItems = getChefsData?.filter((f: any) =>
      f?.name?.toLowerCase()?.match(text?.toLowerCase()),
    );
    setGetAllData(filteredItems);
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
          navigation.navigate(screenName.ChefSignUp);
        }}
        mainShow={true}
        title={strings('ChefNameList.chef_list')}
        extraStyle={styles.headerContainer}
        rightText={strings('ChefNameList.Chef_SignUp')}
        isHideIcon={true}
        rightTextStyle={styles.rightTextStyle}
      />
      <View style={{marginHorizontal: wp(16)}}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={strings('ChefNameList.Search')}
            value={searchQuery}
            onChangeText={text => onSearchBar(text)}
            placeholderTextColor={colors.gray_300}
          />
          <Image source={Icons.search} style={styles.searchIcon} />
        </View>

        {loading ? (
          <Loader size={'small'} />
        ) : (
          <FlatList
            onEndReachedThreshold={0.3}
            data={getAllData}
            ListEmptyComponent={<NoDataFound />}
            renderItem={({item, index}) => {
              return (
                <ChefNameCardList
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
                  <Spacer height={140} />
                </View>
              );
            }}
          />
        )}
      </View>
      <DleleteModal
        title={strings('myMenuList.are_you_sure')}
        rightText={strings('myMenuList.yes')}
        leftText={strings('myMenuList.no')}
        visible={visible}
        closeModal={() => closeModal()}
        onPressDelete={() => onPressDelete()}
      />
    </View>
  );
};

export default ChefNameList;

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
    rightTextStyle: {
      textDecorationLine: 'underline',
    },
    searchInputContainer: {
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: colors.card_bg,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp(10),
      marginBottom: hp(15),
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      color: colors.black,
      paddingVertical: 5,
    },
    searchIcon: {
      width: 14,
      height: 14,
      marginLeft: 10,
      tintColor: colors.black,
    },
  });
};
