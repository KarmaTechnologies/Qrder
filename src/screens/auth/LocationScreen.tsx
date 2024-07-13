import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, SCREEN_HEIGHT, SCREEN_WIDTH, wp } from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { Icons } from '../../utils/images';
import { strings } from '../../i18n/i18n';
import { requestLocationPermission } from '../../utils/loactionHandler';

type Props = {};

const LocationScreen = (props: Props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    const onPressLocation = () => {

        requestLocationPermission()
        navigation.navigate(screenName.BottomTabBar)
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
            <View style={styles.imageStyle}>
                <Image style={styles.locationImage} source={Icons.location} />
            </View>


            <PrimaryButton
                extraStyle={styles.locationButton}
                onPress={onPressLocation}
                title={strings('login.access_location')}
                titleStyle={styles.textStyle}
                isIconShow={true}
            />
            <Text style={styles.locationText}>{strings('login.access_location_dec')}</Text>
        </View>
    );
};

export default LocationScreen;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageStyle: {
            width: SCREEN_WIDTH * 0.526,
            height: SCREEN_HEIGHT * 0.32,
            backgroundColor: colors.image_Bg_gray,
            borderRadius: 90
        },
        locationImage: {
            width: SCREEN_WIDTH * 0.526,
            height: SCREEN_HEIGHT * 0.32
        },
        locationButton: {
            width: SCREEN_WIDTH - wp(48),
            marginTop: hp(90),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center'
        },
        textStyle: {
            ...commonFontStyle(700, 16, colors.white),
            textAlign: 'center',
            textTransform: 'uppercase'
        },
        locationText: {
            marginTop: hp(36),
            paddingHorizontal: wp(26),
            textAlign: 'center',
            ...commonFontStyle(400, 16, colors.Text_Tertiary),
        }
    });
};
