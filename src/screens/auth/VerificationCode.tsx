import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { commonFontStyle, wp, hp } from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { errorToast, infoToast } from '../../utils/commonFunction';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PrimaryButton from '../../compoment/PrimaryButton';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import { useAppDispatch } from '../../redux/hooks';
import { sendEmailOtp, sendForgotEmail } from '../../actions/authAction';
import { screenName } from '../../navigation/screenNames';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';

type Props = {};
const CELL_COUNT = 6;

const VerificationCode = ({ route }) => {
    const { email, otpNumber } = route.params;
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [timer, setTimer] = useState<number>(50);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const onSubmitPress = () => {
        if (value.trim().length !== 6) {
            errorToast(strings('otp_verification.error_otp'));
        } else {
            setLoading(true);
            let data = {
                data: { email, otp: value },
                onSuccess: () => {
                    setValue('');
                    setLoading(false);
                    navigation.navigate(screenName.NewPassword, { emailId: email });
                },
                onFailure: () => {
                    setLoading(false);
                },
            };
            dispatch(sendEmailOtp(data));
        }
    };

    const onResendPress = () => {
        let userInfo = {
            data: { email },
            onSuccess: () => {
                setTimer(50);
                setIsResendDisabled(true);
            },
            onFailure: () => { },
        };
        dispatch(sendForgotEmail(userInfo));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.Primary_Bg} />

            <LoginHeader
                title={strings('Phone_number_verification.verification')}
                description={strings('Phone_number_verification.verification_dec')}
                email={email}
                isBack={true}
                onPress={navigation.goBack}
            />
            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        rootStyle={styles.codeFieldRoot}
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                key={index}
                                style={[
                                    styles.cellRoot,
                                    isFocused && styles.focusedCell,
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                <Text style={styles.cellText}>
                                    {symbol || (isFocused ? <Cursor /> : '')}
                                </Text>
                            </View>
                        )}
                    />
                    {isResendDisabled &&
                        <View style={styles.bottomView}>
                            <Text style={styles.resendText}>{strings('Phone_number_verification.resend')}</Text>
                            <Text style={styles.secText}>{' ' + timer}
                                {strings('Phone_number_verification.sec')}
                            </Text>
                        </View>}

                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onSubmitPress}
                        title={strings('Phone_number_verification.verify')}
                        isLoading={loading}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={onResendPress}
                        disabled={isResendDisabled}>
                        <Text style={styles.sendText}>{strings('Phone_number_verification.send_again')}</Text>
                    </TouchableOpacity>
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
            backgroundColor: colors.bg_white,
            paddingHorizontal: hp(2),
        },
        bottomContainer: {
            flex: 2,
            backgroundColor: colors.bg_white,
        },
        contentContainerStyle: {
            paddingHorizontal: wp(20),
        },
        bottomView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            marginTop: hp(15),
        },
        codeText: {
            textTransform: 'uppercase',
            ...commonFontStyle(400, 13, colors.Title_Text),
        },
        resendContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        resendText: {
            ...commonFontStyle(500, 15, colors.black),
        },
        secText: {
            ...commonFontStyle(500, 14, colors.text_orange),
        },
        codeFieldRoot: {
            marginTop: hp(10),
            width: '100%',
            justifyContent: 'space-between',
        },
        cellRoot: {
            width: wp(45),
            height: wp(55),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: colors.input_bg1,
            borderWidth: 1,
            borderColor: colors.input_border1
        },
        focusedCell: {
            borderWidth: 2,
            borderColor: colors.Primary_Orange,
            backgroundColor: colors.input_bg,
        },
        cellText: {
            ...commonFontStyle(500, 20, colors.defult_white),
            textAlign: 'center',
        },
        signupButton: {
            marginTop: hp(20),
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        sendButton: {
            marginTop: hp(13),
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.defult_white,
            borderColor: colors.input_border1,
            borderWidth: 1,
            height: hp(56),
        },
        sendText: {
            ...commonFontStyle(600, 18, colors.text_gray),
            textAlign: 'center',
        }
    });
};
