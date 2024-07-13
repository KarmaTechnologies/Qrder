 import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import {
    commonFontStyle,
    wp,
    hp,
} from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { infoToast } from '../../utils/commonFunction';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Login_Input from '../../compoment/Login_Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';

type Props = {};
const CELL_COUNT = 4;

const VerificationCode = ({ route }) => {
    const { email } = route.params;
    const { colors } = useTheme();
    const { params } = useRoute<any>();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [otpValue, setOtpValue] = useState<string>(params?.otpNumber);
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        setOtpValue(params?.otpNumber)
    }, [params?.otpNumber]);

    const onSubmitPress = () => {
        if (value.trim().length !== 4) {
            infoToast('Please enter valid OTP');
        } else {
            let data = {
                data: {
                    mobile: params?.listData,
                    otp: value,
                    deviceToken: 'jdjdakak',
                },
                onSuccess: (response: any) => {
                    // dispatchNavigation(screenName.drawerNavigator);
                },
                onFailure: (response: any) => {
                    console.log('Error', response);
                },
            };
            // dispatch(VerifyPhoneCode(data));
        }
    };

    const onResendUpPress = () => {
        let number = {
            data: {
                mobile: params?.listData,
            },
            onSuccess: (res: any) => {
                setOtpValue(res?.data?.otp)
                // Alert.alert('', 'OTP have been sent');
            },
            onFailure: (Err: any) => { },
        };
        //   dispatch(phoneLogin(number));
    };

    const onPressVerify = () => { };

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

            <LoginHeader
                title={strings('Phone_number_verification.verification')}
                description={strings('Phone_number_verification.verification_dec')}
                email={email}
                isBack={true}
                onPress={() => onPressBack()}
            />
            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.bottomView}>
                        <Text style={styles.codeText}>{strings('Phone_number_verification.code')}</Text>
                        <TouchableOpacity style={styles.resendContainer}>
                            <Text style={styles.resendText}>
                                {strings('Phone_number_verification.resend')}
                            </Text>
                            <Text style={styles.secText}>
                                {' '}
                                {strings('Phone_number_verification.in')}{50}{strings('Phone_number_verification.sec')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Login_Input
                        input_container_style={styles.input_con_style}
                        placeholder=""
                        custom_component={
                            <CodeField
                                ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                rootStyle={{ justifyContent: 'space-between' }}
                                renderCell={({ index, symbol, isFocused }) => (
                                    <View
                                        style={{
                                            marginRight: wp(25),
                                            borderRadius: 10,
                                            alignSelf: 'center',
                                        }}>
                                        <Text
                                            key={index}
                                            style={[
                                                styles.cell,
                                            ]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : '')}
                                        </Text>
                                    </View>
                                )}
                            />
                        }
                    />
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPressVerify}
                        title={strings('Phone_number_verification.verify')}
                    />
                    <Text style={styles.otpText}>{otpValue}</Text>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

export default VerificationCode;


const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.Primary_Bg,
            paddingHorizontal: hp(2),
        },
        bottomContainer: {
            flex: 2.5,
            backgroundColor: colors.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24
        },
        contentContainerStyle: {
            paddingHorizontal: wp(24),
        },
        bottomView: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: hp(24)
        },
        codeText: {
            textTransform:'uppercase',
            ...commonFontStyle(400, 13, colors.Title_Text),
        },
        resendContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        resendText: {
            ...commonFontStyle(400, 14, colors.Title_Text),
            textDecorationLine: 'underline',
        },
        secText: {
            ...commonFontStyle(700, 14, colors.Title_Text),
        },
        btnStyle: {
            marginTop: hp(28),
        },
        input_con_style: {
            marginLeft: wp(25),
            marginTop: hp(8),
        },
        cell: {
            lineHeight: hp(55),
            backgroundColor: colors.inputColor,
            textAlign: 'center',
            width: wp(62),
            height: hp(62),
            borderRadius: 10,
            ...commonFontStyle(700, 16, colors.Title_Text),
        },
        signupButton: {
            marginTop: hp(30),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
        },

        otpText: {
            textAlign: 'center',
            ...commonFontStyle(500, 20, colors.black),
        }
    });
};
