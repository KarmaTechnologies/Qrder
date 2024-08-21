import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Icons } from '../../utils/images';
import Input from '../../compoment/Input';
import { emailCheck, errorToast } from '../../utils/commonFunction';
import ImageCropPicker from 'react-native-image-crop-picker';
import PrimaryButton from '../../compoment/PrimaryButton';
import { updateLocale } from 'moment';
import { updateProfile } from '../../actions/authAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};

const EditProfile = (props: Props) => {
    const route = useRoute();
    const { userData } = route.params;
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const [names, setName] = useState<string>(userData?.name);
    const [emails, setEmail] = useState<string>(userData.email);
    const [numbers, setNumber] = useState<string>(userData.number);
    const [photoUri, setPhotoUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const selectImage = () => {
        setLoading(true);
        ImageCropPicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        })
            .then(image => {
                setPhotoUri(image.path);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    const onPressEditDone = () => {
        if (names.trim().length === 0) {
            errorToast(strings('login.error_name'));
        } else if (emails.trim().length === 0) {
            errorToast(strings('login.error_email'));
        } else if (!emailCheck(emails)) {
            errorToast(strings('login.error_v_email'));
        } else if (numbers.trim().length === 0) {
            errorToast(strings('login.error_phone'));
        } else if (numbers.trim().length !== 10) {
            errorToast(strings('login.error_v_phone'));
        } else {
            var data = new FormData();
            data.append('name', names);
            data.append('email', emails);
            data.append('number', numbers);
            let obj = {
                data,
                onSuccess: (response: any) => {
                    navigation.goBack();
                    setEmail('');
                    setName('')
                    setNumber('')
                },
                onFailure: (Err: any) => {
                    if (Err != undefined) {
                        Alert.alert(Err?.message);
                    }
                },
            };
            dispatch(updateProfile(obj));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
            <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                mainShow={true}
                title={strings('PersonalInfo.editProfile')}
                isShowIcon={false}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightTextStyle={styles.rightTextStyle}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}>
                <View style={styles.subContainer}>
                    <View style={styles.profileContainer}>
                        <View>
                            <Image
                                source={photoUri ? { uri: photoUri } : Icons.profileImage}
                                style={styles.profilImage}
                            />
                            <TouchableOpacity activeOpacity={0.9} onPress={selectImage} style={styles.editImage}>
                                <Image source={Icons.editPencial} style={styles.profileIcon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.inputView}>
                        <Input
                            value={names}
                            placeholder={strings('sign_up.p_name')}
                            label={strings('sign_up.name')}
                            onChangeText={(t: string) => setName(t)}
                        />
                        <Input
                            value={emails}
                            placeholder={strings('sign_up.p_email')}
                            label={strings('sign_up.email')}
                            onChangeText={(t: string) => setEmail(t)}
                        />

                        <Input
                            value={numbers}
                            placeholder={strings('sign_up.p_enter_number')}
                            keyboardType="number-pad"
                            label={strings('PersonalInfo.phone_number')}
                            onChangeText={(t: string) => setNumber(t)}
                            maxLength={10}
                        />
                    </View>
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPressEditDone}
                        title={strings('PersonalInfo.save')}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View >
    );
};

export default EditProfile;

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
        subContainer: {
            paddingHorizontal: wp(16),
            marginTop: hp(6)
        },
        profileContainer: {
            justifyContent: "center",
            alignItems: 'center',
        },
        profilImage: {
            width: wp(130),
            height: wp(130),
            borderRadius: wp(50),
        },
        editImage: {
            width: wp(41),
            height: wp(41),
            borderRadius: wp(40),
            backgroundColor: colors.Primary_Orange,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0
        },
        profileIcon: {
            width: 16,
            height: 16,
            resizeMode: 'contain',
        },
        inputView: {
            marginTop: hp(6)
        },
        loader: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        uploadText: {
            paddingTop: hp(12),
            ...commonFontStyle(700, 20, colors.Title_Text),
        },
        signupButton: {
            marginTop: hp(47),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        contentContainerStyle: {
            paddingHorizontal: wp(24),
        },
    });
};
