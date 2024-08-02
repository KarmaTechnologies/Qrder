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

            <Image style={styles.imageStyle} source={Icons.ellipse} />
            <Image style={styles.imageVector} source={Icons.vector} />
            <View style={[styles.topContainer,{ marginBottom: email ? 25 : 50}]}>
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
    console.log('colors',colors.white);
    
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
            height: hp(45),
            width: wp(45),
            resizeMode: 'contain',
        },
        imageStyle: {
            position: 'absolute',
            height: hp(120),
            width: wp(120),
            top: -5,
            resizeMode: 'contain',
        },
        imageVector: {
            position: 'absolute',
            height: SCREEN_HEIGHT * 0.43,
            width: SCREEN_WIDTH * 0.45,
            right: -50,
            top: -5,
            resizeMode: 'contain',
        },
        topContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        loginText: {
            ...commonFontStyle(700, 30, light_theme.white),
        },
        desText: {
            ...commonFontStyle(400, 16, light_theme.white),
            opacity: 0.8,
            marginTop: 3
        },
        emailText:{
            ...commonFontStyle(700, 16, light_theme.white),
        }
    });
};
