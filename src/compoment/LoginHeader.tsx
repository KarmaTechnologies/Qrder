import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { commonFontStyle, hp, SCREEN_HEIGHT, SCREEN_WIDTH, statusBarHeight, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { useTheme } from '@react-navigation/native';
import { light_theme } from '../theme/colors';

type Props = {
    title?: string,
    description?: string
    isBack?: boolean
    onPress?: () => void;
    email?:string
};

const LoginHeader = ({ title, description = '', isBack = false, onPress = undefined ,email=''}: Props) => {
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    return (
        <View style={styles.topMainView}>
            {isBack ? <TouchableOpacity style={styles.backContainer} onPress={() => onPress()}>
                <Image style={styles.backStyle} source={Icons.back} />
            </TouchableOpacity> : null}

            <View style={[styles.topContainer,{ marginBottom: email ? 25 : 20}]}>
                <Text style={styles.loginText}>{title}</Text>
                <Text style={styles.desText}>{description}</Text>
                {email && <Text style={styles.emailText}>{email}</Text>}
            </View>
        </View>
    );
};

export default LoginHeader;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        topMainView: {
            flex: 1
        },
        backContainer: {
            position: 'absolute',
            top: Platform.OS == "ios" ? SCREEN_HEIGHT*0.06: SCREEN_HEIGHT*0.015,
            left: wp(16),
            zIndex: 1
        },
        backStyle: {
            height: hp(24),
            width: wp(24),
            resizeMode: 'contain',
            tintColor:colors.black
        },
        topContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        loginText: {
            ...commonFontStyle(800, 20, colors.black),
        },
        desText: {
            ...commonFontStyle(400, 14, colors.title_dec),
            marginTop: hp(5),
        },
        emailText:{
            ...commonFontStyle(700, 14, colors.white),
        }
    });
};
