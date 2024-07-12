import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';

type Props = {};

const VerificationScreen = ({ route }) => {
    const { email } = route.params;
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const navigation = useNavigation();

    const handleChangeText = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (text, index) => {
        if (!text && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const onPressVerify = () => { };

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

            <LoginHeader
                title={'Verification'}
                description={'We have sent a code to your email'}
                email={email}
                isBack={true}
                onPress={() => onPressBack()}
            />

            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={styles.contentContainerStyle}>

                    <View style={styles.bottomView}>
                        <Text style={styles.codeText}>Code</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.resendText}>
                                {' Resend'}
                            </Text>
                            <Text style={styles.secText}>
                                {' '}
                                in.50sec
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {otp.map((_, index) => (
                            <TextInput
                                key={index}
                                value={otp[index]}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        handleBackspace(otp[index], index);
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={1}
                                style={styles.input}
                                ref={(ref) => (inputs.current[index] = ref)}
                            />
                        ))}
                    </View>
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPressVerify}
                        title={'Verify'}
                    />
                </KeyboardAwareScrollView>
            </View>

        </View>
    );
};

export default VerificationScreen;

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
            ...commonFontStyle(400, 13, colors.Title_Text),
        },
        resendText: {
            ...commonFontStyle(400, 14, colors.Title_Text),
            textDecorationLine: 'underline',
        },
        secText: {
            ...commonFontStyle(700, 14, colors.Title_Text),
        },
        signupButton: {
            marginTop: hp(30),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            backgroundColor: colors.inputColor,
            textAlign: 'center',
            width: wp(62),
            height: hp(62),
            borderRadius: 10,
            marginTop: hp(8),
            ...commonFontStyle(700, 16, colors.Title_Text),
        },
    });
};
