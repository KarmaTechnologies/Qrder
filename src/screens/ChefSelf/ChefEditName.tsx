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
import PrimaryButton from '../../compoment/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CCDropDown from '../../compoment/CCDropDown';
import Spacer from '../../compoment/Spacer';

type Props = {};

const ChefEditName = (props: Props) => {
    const route = useRoute();
    // const { name, email, number } = route.params;
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const { getCuisines } = useAppSelector(state => state.data);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [quantityValue, setQuantityValue] = useState(0);
    const [number, setNumber] = useState<string>('');
    const [salary, setSalary] = useState(0);
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

    const onPressEditDone = async () => {
        if (name.trim().length === 0) {
          errorToast(strings('login.error_name'));
        } else if (email.trim().length === 0) {
          errorToast(strings('login.error_email'));
        } else if (!emailCheck(email)) {
          errorToast(strings('login.error_v_email'));
        } else if (quantityValue == 0) {
          errorToast(strings('chefSignUp.select_cusine_error'));
        } else if (number.trim().length === 0) {
          errorToast(strings('login.error_phone'));
        } else if (number.trim().length !== 10) {
          errorToast(strings('login.error_v_phone'));
        } else if (salary == 0) {
          errorToast(strings('ChefNameList.error_v_salary'));
        } else {
          var data = new FormData();
        //   const userDetails = await getAsyncUserInfo()
        //   console.log("-->>", userDetails?.parent_id)
    
          data.append('parent_id', userDetails?.id)
          data.append('name', name);
          data.append('email', email);
          data.append('cuisine_id', quantityValue);
          data.append('number', number);
          data.append('salary', salary);
    
          let obj = {
            data,
            onSuccess: (response: any) => {
              setName('');
              setEmail('');
              setQuantityValue(0);
              setNumber('');
              setSalary(0)
    
            },
            onFailure: (Err: any) => {
              if (Err != undefined) {
                Alert.alert(Err?.message);
              }
            },
          };
        //   dispatch(chefsSignUp(obj));
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
                title={strings('ChefNameList.edit_Chef_name')}
                isShowIcon={false}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightTextStyle={styles.rightTextStyle}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
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
                            value={name}
                            placeholder={strings('sign_up.p_name')}
                            label={strings('sign_up.name')}
                            onChangeText={(t: string) => setName(t)}
                        />
                        <Input
                            value={email}
                            placeholder={strings('sign_up.p_email')}
                            label={strings('sign_up.email')}
                            onChangeText={(t: string) => setEmail(t)}
                        />
                        <CCDropDown
                            data={getCuisines}
                            label={strings('chefSignUp.select_cusine')}
                            labelField={'name'}
                            valueField={'id'}
                            placeholder={strings('addFoodList.select_cusine')}
                            DropDownStyle={styles.dropDownStyle}
                            value={quantityValue}
                            setValue={setQuantityValue}
                            extraStyle={styles.extraStyle}
                        />
                        <Input
                            value={number}
                            placeholder={strings('sign_up.p_enter_number')}
                            keyboardType="number-pad"
                            label={strings('PersonalInfo.phone_number')}
                            onChangeText={(t: string) => setNumber(t)}
                            maxLength={10}
                        />
                        <Input
                            value={salary}
                            returnKeyType="next"
                            placeholder={strings('chefSignUp.p_salary')}
                            label={strings('chefSignUp.salary')}
                            keyboardType="number-pad"
                            maxLength={10}
                            onChangeText={(t: string) => setSalary(t.trim())}
                        />
                    </View>
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPressEditDone}
                        title={strings('PersonalInfo.save')}
                    />
                </View>
                <Spacer height={10}/>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ChefEditName;

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
        contentContainerStyle: {
            marginHorizontal: wp(16),
        },
        rightTextStyle: {
            textDecorationLine: 'underline',
            textTransform: 'uppercase'
        },
        subContainer: {
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
            marginTop: hp(24),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dropDownStyle: {
            borderColor: colors.inputColor,
            backgroundColor: colors.inputColor,
            height: hp(60),
            borderRadius: 10,
        },
        extraStyle: {
            marginTop: hp(24),
        },
    });
};
