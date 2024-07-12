import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';

type Props = {};

const ForgotScreen = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [email, setEmail] = useState('example1232@gmail.com');

    const onPresSendCode = () => {
        navigation.navigate(screenName.VerificationCode, { email: email })
    };

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

            <LoginHeader title={'Forgot Password'} description={'Please sign in to your existing account'} isBack={true} onPress={() => onPressBack()} />

            <View style={styles.bottomContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <Input
                        value={email}
                        placeholder="williams@david.com"
                        label={'Email'}
                        onChangeText={(t: string) => setEmail(t)}
                    />
                    <PrimaryButton
                        extraStyle={styles.signupButton}
                        onPress={onPresSendCode}
                        title={'Send Code'}
                    />
                </KeyboardAwareScrollView>
            </View>

        </View>
    );
};

export default ForgotScreen;

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
        },
    });
};
