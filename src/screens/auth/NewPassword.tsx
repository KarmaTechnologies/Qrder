import {
    Keyboard,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import {
    wp,
    hp,
} from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { errorToast, numberCheck, specialCarCheck, UpperCaseCheck } from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import { useAppDispatch } from '../../redux/hooks';
import Input from '../../compoment/Input';
import { screenName } from '../../navigation/screenNames';
import { updatePassword } from '../../actions/authAction';
import { getAsyncRole } from '../../utils/asyncStorageManager';

type Props = {};

const NewPassword = () => {
    const { params } = useRoute<any>();
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] =
        useState<boolean>(true);

    const passwordRef = useRef<any>(null);

    const onSignUpPress = () => {
        if (password.trim().length === 0) {
            errorToast(strings('login.error_new_password'));
        } else if (password.trim().length < 9) {
            errorToast(strings('login.error_v_password'));
        } else if (confirmPassword.trim().length === 0) {
            errorToast(strings('login.error_v_confirm'));
        } else if (!numberCheck(password)) {
            errorToast(strings('login.error_number_password'));
        } else if (!specialCarCheck(password)) {
            errorToast(strings('login.error_character_password'));
        } else if (!UpperCaseCheck(password)) {
            errorToast(strings('login.error_uppercase_password'));
        } else if (confirmPassword.trim() !== password.trim()) {
            errorToast(strings('login.error_re_tyre_match'));
        } else {
            var data = new FormData();
            data.append('email', params?.emailId);
            data.append('password', password);
            data.append('password_confirmation', confirmPassword);
            

            let obj = {
                data,
                onSuccess: async() => {
                    let isRole = await getAsyncRole();
                    setConfirmPassword('');
                    setPassword('');
                    setTimeout(()=>{
                        navigation.navigate(screenName.SignInScreen, { role: isRole });
                    },1000)
                },
                onFailure: (Err: any) => {
                    if (Err != undefined) {
                        errorToast(Err?.data?.message);
                    }
                },
            };
              dispatch(updatePassword(obj));
        }
    };

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />
            <LoginHeader
                title={strings('login.ressetPassword')}
                description={strings('Phone_number_verification.verification_dec')}
                email={params?.emailId}
                isBack={true}
                onPress={() => onPressBack()}
            />
            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <Input
                        value={password}
                        returnKeyType="done"
                        isShowEyeIcon={true}
                        placeholder="New Password"
                        secureTextEntry={isShowPassword}
                        label={'New Password'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(t: string) => setPassword(t.trim())}
                        onPressEye={() => setIsShowPassword(!isShowPassword)}
                    />
                    <Input
                        value={confirmPassword}
                        returnKeyType="done"
                        isShowEyeIcon={true}
                        inputRef={passwordRef}
                        placeholder="Confirm Password"
                        secureTextEntry={isShowConfirmPassword}
                        label={'Confirm Password'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(t: string) => setConfirmPassword(t.trim())}
                        onPressEye={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                    />
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onSignUpPress}
                        title={strings('orderModal.done')}
                    />
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

export default NewPassword;


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
            marginTop: hp(30),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
};
