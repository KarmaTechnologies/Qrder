import {
    StyleSheet,
    Text,
    ViewStyle,
    TouchableOpacity,
    TextStyle,
    Image,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { light_theme } from '../theme/colors';

type Props = {
    title: string;
    onPress?: () => void;
    isYellow?: boolean;
    extraStyle?: ViewStyle;
    titleStyle?: TextStyle;
    isIconShow?: boolean
};

const PrimaryButton = ({
    title,
    onPress = undefined,
    extraStyle = {},
    titleStyle,
    isIconShow = false
}: Props) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={[
                styles.buttonView,
                {
                    backgroundColor: colors.Primary_Orange
                },
                extraStyle,
            ]}>
            <Text
                style={[
                    styles.titleText,
                    titleStyle,
                ]}>
                {title}
            </Text>
            {isIconShow && <Image style={styles.locationIcon} source={Icons.mapPin} />}

        </TouchableOpacity>
    );
};

export default PrimaryButton;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        buttonView: {
            backgroundColor: colors.Primary_Orange,
            height: hp(62),
            justifyContent: 'center',
            borderRadius: 12,
        },
        titleText: {
            ...commonFontStyle(700, 14, light_theme.white),
            textAlign: 'center',
            textTransform: 'uppercase'
        },
        locationIcon: {
            width: wp(32),
            height: wp(32),
            marginLeft: wp(24),
        }
    });
};
