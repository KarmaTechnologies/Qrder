import { FlatList, Image, StatusBar, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import NoDataFound from '../../compoment/NoDataFound';
import Spacer from '../../compoment/Spacer';
import ChefNameCardList from '../../compoment/ChefNameCardList';
import DleleteModal from '../../compoment/DeleteModal';
import { screenName } from '../../navigation/screenNames';
import { Icons } from '../../utils/images';
import { getChefsAction } from '../../actions/chefsAction';

type Props = {};

const ChefNameList = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const {getChefsData} = useAppSelector(state => state.data);
    const dispatch = useAppDispatch();


    const closeModal = () => {
        setVisible(false)
    }
    const onPressDelete = () => {
        setVisible(false)
        // removeMenuCardList();
    }

    useEffect(() => {
        getChefsList()
      }, []);

    const getChefsList = () => {
        let obj = {
          onSuccess: (res: any) => { },
          onFailure: (Err: any) => { },
        };
        dispatch(getChefsAction(obj));
      };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />

            <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                onRightPress={() => {
                    navigation.navigate(screenName.ChefSignUp)
                }}
                mainShow={true}
                title={strings('ChefNameList.chef_list')}
                extraStyle={styles.headerContainer}
                rightText={strings("ChefNameList.Chef_SignUp")}
                isHideIcon={true}
                rightTextStyle={styles.rightTextStyle}
            />
            <View style={{ marginHorizontal: wp(16) }}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={strings("ChefNameList.Search")}
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        placeholderTextColor={colors.gray_300}
                    />
                    <Image source={Icons.search} style={styles.searchIcon} />
                </View>

                <FlatList
                    onEndReachedThreshold={0.3}
                    data={getChefsData}
                    ListEmptyComponent={<NoDataFound />}
                    renderItem={({ item, index }) => {
                        return (
                            <ChefNameCardList
                                item={item}
                                setDelete={() => {
                                    setVisible(true);
                                    // setSelectItem(item);
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

export default ChefNameList;

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
        rightTextStyle: {
            textDecorationLine: 'underline'
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
            tintColor:colors.black
        },
    });
};
