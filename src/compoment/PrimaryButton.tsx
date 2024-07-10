import {
    StyleSheet,
    Text,
    ViewStyle,
    TouchableOpacity,
    TextStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp } from '../theme/fonts';

type Props = {
    title: string;
    onPress?: () => void;
    isYellow?: boolean;
    extraStyle?: ViewStyle;
    titleStyle?: TextStyle;
};

const PrimaryButton = ({
    title,
    onPress = undefined,
    extraStyle = {},
    titleStyle,
}: Props) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={[
                styles.buttonView,
                {
                    backgroundColor: colors.Primary_Btn
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
        </TouchableOpacity>
    );
};

export default PrimaryButton;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        buttonView: {
            backgroundColor: colors.Primary_Btn,
            height: hp(62),
            justifyContent: 'center',
            borderRadius: 5,
        },
        titleText: {
            ...commonFontStyle(700, 14, colors.white),
            textAlign: 'center',
        },
    });
};
