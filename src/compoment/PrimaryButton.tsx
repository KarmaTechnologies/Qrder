import {
    StyleSheet,
    Text,
    ViewStyle,
    TouchableOpacity,
    TextStyle,
    Image,
    ActivityIndicator,
    View
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
    isIconShow?: boolean;
    isLoading?: boolean;
};

const PrimaryButton = ({
    title,
    onPress = undefined,
    extraStyle = {},
    titleStyle,
    isIconShow = false,
    isLoading = false
}: Props) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <TouchableOpacity
            onPress={() => !isLoading && onPress?.()}
            style={[
                styles.buttonView,
                { backgroundColor: colors.Primary_Orange },
                extraStyle,
            ]}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={light_theme.white} />
            ) : (
                <View style={styles.contentContainer}>
                    <Text
                        style={[
                            styles.titleText,
                            titleStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {isIconShow && <Image style={styles.locationIcon} source={Icons.mapPin} />}
                </View>
            )}
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
            alignItems: 'center',
            borderRadius: 12,
            flexDirection: 'row',
        },
        contentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleText: {
            ...commonFontStyle(700, 14, light_theme.white),
            textAlign: 'center',
            textTransform: 'uppercase',
        },
        locationIcon: {
            width: wp(32),
            height: wp(32),
            marginLeft: wp(24),
        },
    });
};
