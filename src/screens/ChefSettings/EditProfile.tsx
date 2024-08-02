import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import { useAppSelector } from '../../redux/hooks';
import { Icons } from '../../utils/images';
import Input from '../../compoment/Input';
import { emailCheck, errorToast } from '../../utils/commonFunction';
import ImageCropPicker from 'react-native-image-crop-picker';

type Props = {};

const EditProfile = (props: Props) => {
    const route = useRoute();
    const { name, email, number } = route.params;
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const [names, setName] = useState<string>(name);
    const [emails, setEmail] = useState<string>(email);
    const [numbers, setNumber] = useState<string>(number);
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
            errorToast('');
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
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />

            <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                onRightPress={() => onPressEditDone()}
                mainShow={true}
                title={strings('PersonalInfo.editProfile')}
                rightText={strings('PersonalInfo.save')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightTextStyle={styles.rightTextStyle}
            />
            <View style={styles.subContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        source={photoUri ? { uri: photoUri } : Icons.profileImage}
                        style={styles.profilImage}
                    />
                    <TouchableOpacity onPress={selectImage}>
                        <Text style={styles.uploadText}>{strings('PersonalInfo.upload_Image')}</Text>
                    </TouchableOpacity>
                </View>
                <View>
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
            </View>
        </View>
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
            alignItems: 'center'
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
        uploadText: {
            paddingTop: hp(12),
            ...commonFontStyle(700, 20, colors.Title_Text),
        },
    });
};