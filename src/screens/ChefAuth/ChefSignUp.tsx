import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { screenName } from '../../navigation/screenNames';
import { strings } from '../../i18n/i18n';

type Props = {};

const ChefSignUp = (props: Props) => {
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
    const fullNameRef = useRef<any>(null);
    const phoneRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const rePasswordRef = useRef<any>(null);

    const navigation = useNavigation();

    const onPressLogin = () => {
        // navigation.navigate(screenName.SignInScreen)
    };

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

            <LoginHeader title={strings("sign_up.sign_up")} description={strings("sign_up.sign_dec")} isBack={true} onPress={() => onPressBack()} />

            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <Input
                        value={name}
                        inputRef={fullNameRef}
                        placeholder={strings("sign_up.p_name")}
                        label={strings("sign_up.name")}
                        onChangeText={(t: string) => setName(t)}
                        onSubmitEditing={() => phoneRef?.current.focus()}
                    />
                    <Input
                        value={phone}
                        returnKeyType="next"
                        placeholder={'123456789'}
                        label={strings("sign_up.mobile_Number")}
                        inputRef={phoneRef}
                        keyboardType="number-pad"
                        maxLength={10}
                        onSubmitEditing={() => passwordRef?.current.focus()}
                        onChangeText={(t: string) => setPhone(t.trim())}
                    />
                    <Input
                        value={password}
                        autoCorrect={false}
                        inputRef={passwordRef}
                        isShowEyeIcon={true}
                        secureTextEntry={isShowPassword}
                        placeholder="* * * * * * *"
                        label={strings("sign_up.password")}
                        onChangeText={(t: string) => setPassword(t)}
                        onPressEye={() => setIsShowPassword(!isShowPassword)}
                        onSubmitEditing={() => rePasswordRef?.current.focus()}
                    />
                    <Input
                        value={rePassword}
                        inputRef={rePasswordRef}
                        autoCorrect={false}
                        isShowEyeIcon={true}
                        placeholder="* * * * * * *"
                        secureTextEntry={isShowPassword}
                        label={strings("sign_up.re_type_password")}
                        onChangeText={(t: string) => setRePassword(t)}
                        onPressEye={() => setIsShowPassword(!isShowPassword)}
                    />

                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPressLogin}
                        title={strings("sign_up.sign_up")}
                    />
                </KeyboardAwareScrollView>
            </View>

        </View>
    );
};

export default ChefSignUp;

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
        signupButton: {
            marginTop: hp(47),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });
};
