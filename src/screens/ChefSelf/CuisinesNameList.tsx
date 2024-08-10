import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
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
import {getChefsAction} from '../../actions/chefsAction';
import CuisinesNameCardList from '../../compoment/CuisinesNameCardList';
import {deleteCuisinesAction, getCuisinesAction} from '../../actions/cuisinesAction';
import AddFolderModal from '../../compoment/AddFolderModal';
import EditFolderModal from '../../compoment/EditFolderModal';

type Props = {};

const CuisinesNameList = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const {isDarkTheme} = useAppSelector(state => state.common);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {getCuisines} = useAppSelector(state => state.data);
  const [getAllData,setGetAllData]=useState(getCuisines)
  const [newFolder, setNewFolder] = useState(false);
  const [editFolder, setEditFolder] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setVisible(false);
  };

  const removeMenuCardList = () => {
    let UserInfo = {
      data: selectItem?.id,
      onSuccess: (res: any) => {
        closeModal()
      },
      onFailure: (Err: any) => {},
    };
    dispatch(deleteCuisinesAction(UserInfo));
  };

  const onPressDelete = () => {
    setVisible(false);
    removeMenuCardList();
  };

  useEffect(() => {
    getCuisinesList();
  }, [newFolder,editFolder]);

  const getCuisinesList = () => {
    let obj = {
      onSuccess: (res: any) => {
        setGetAllData(res?.data)
      },
      onFailure: (Err: any) => {},
    };
    dispatch(getCuisinesAction(obj));
  };

  const onSearchBar=(text)=>{
    setSearchQuery(text)
    const filteredItems = getCuisines?.filter((f: any) =>
      f?.name?.toLowerCase()?.match(text?.toLowerCase()),
    )
    setGetAllData(filteredItems)
  }

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
          setNewFolder(true)
        }}
        mainShow={true}
        title={strings('CuisinesNameList.cuisines_list')}
        extraStyle={styles.headerContainer}
        rightText={strings('CuisinesNameList.new_add')}
        isHideIcon={true}
        rightTextStyle={styles.rightTextStyle}
      />
      <View style={{marginHorizontal: wp(16)}}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={strings('CuisinesNameList.Search')}
            value={searchQuery}
            onChangeText={text => onSearchBar(text)}
            placeholderTextColor={colors.gray_300}
          />
          <Image source={Icons.search} style={styles.searchIcon} />
        </View>

        <FlatList
          onEndReachedThreshold={0.3}
          data={getAllData}
          ListEmptyComponent={<NoDataFound />}
          renderItem={({item, index}) => {
            return (
              <CuisinesNameCardList
                item={item}
                onPressEdit={() => {
                  setEditFolder(true);
                  setSelectItem(item);
                }}
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
      </View>
      <AddFolderModal
        isVisible={newFolder}
        onClose={() => setNewFolder(false)}
      />
      <EditFolderModal
        selectItem={selectItem}
        isVisible={editFolder}
        onClose={() => setEditFolder(false)}
      />
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

export default CuisinesNameList;

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
