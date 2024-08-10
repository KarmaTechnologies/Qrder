import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import { useAppSelector } from '../../redux/hooks';
import TitleList from '../../compoment/TitleListComponent';
import { Icons } from '../../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { dispatchNavigation } from '../../utils/globalFunctions';
import { screenName } from '../../navigation/screenNames';
import { getAsyncUserInfo } from '../../utils/asyncStorageManager';

type Props = {};

const PersonalInfo = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const { params } = useRoute();

    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<string>('');

    useEffect(() => {
        const getUserInfo = async() => {
            const userList = await getAsyncUserInfo()
            setName(userList.name)
            setEmail(userList.email)
            setNumber(userList.number)
        }
        getUserInfo()
    }, [])

    const onRightPress = () => {
        navigation.navigate(screenName.EditProfile, { name, email, number });
    };

    console.log('hideEdit',params?.hideEdit);
    

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />

            <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                onRightPress={onRightPress}
                mainShow={true}
                title={strings('PersonalInfo.personal_Info')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                isShowIcon={params?.hideEdit ? false: true}
                rightText={strings('PersonalInfo.edit')}
                rightTextStyle={styles.rightTextStyle}
            />
            <View style={{ marginHorizontal: wp(16), marginTop: hp(6) }}>
                <View style={styles.profileContainer}>
                    <View>
                        <Image
                            source={Icons.profileImage}
                            style={styles.profilImage}
                        />
                    </View>
                    <View style={styles.userNameView}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.desText}>{strings('PersonalInfo.i_love_fast_food')}</Text>
                    </View>
                </View>
            </View>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
                <TitleList
                    arr_list={[
                        {
                            title: strings('PersonalInfo.full_name'),
                            title1: name,
                            iconName: Icons.profileIcon,
                        },
                        {
                            title: strings('PersonalInfo.email'),
                            title1: email,
                            iconName: Icons.email,
                        },
                        {
                            title: strings('PersonalInfo.phone_number'),
                            title1: number,
                            iconName: Icons.phone,
                        },
                    ]}
                    isSecondText={true}
                />
            </KeyboardAwareScrollView>


        </View>
    );
};

export default PersonalInfo;

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
            textDecorationLine: 'underline',
            textTransform: 'uppercase'
        },
        profileContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: hp(6),
            paddingBottom: hp(32),
        },
        profilImage: {
            width: wp(100),
            height: wp(100),
            borderRadius: wp(50),
            // backgroundColor: '#F88222',
            // opacity: 0.5
        },
        loader: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        userNameView: {
            marginLeft: wp(32),
        },
        nameText: {
            ...commonFontStyle(700, 20, colors.Title_Text),
        },
        desText: {
            marginTop: hp(8),
            ...commonFontStyle(400, 14, colors.gray_300),
        },
        boxCotainer: {
            marginTop: hp(20),
        },
        contentContainerStyle: {
            marginHorizontal: wp(16),
        },
    });
};
