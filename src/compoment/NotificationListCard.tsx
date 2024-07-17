import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../theme/fonts';
type Props = {};

const NotificationListCard = (props: Props) => {
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View>
            <View style={styles.subBoxView}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.leftImage} />
                    <View style={{ marginLeft: wp(14) }}>
                        <Text numberOfLines={2} style={styles.firstText}>{'Donald Trump'}
                            <Text style={[styles.firstText, { color: colors.dropDownText }]}>{' ' + 'Placed a new order'}</Text>
                        </Text>
                        <Text style={styles.timeText}>20 min ago</Text>
                    </View>

                </View>
                <View style={styles.rightImage} />
            </View>
            <View style={styles.borderLine} />
        </View>
    );
};

export default NotificationListCard;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        subBoxView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftImage: {
            width: wp(54),
            height: wp(54),
            borderRadius: wp(50),
            backgroundColor: colors.image_Bg_gray
        },
        firstText: {
            width: SCREEN_WIDTH * 0.39,
            ...commonFontStyle(400, 13, colors.Title_Text),
        },
        timeText: {
            paddingTop: hp(8),
            ...commonFontStyle(400, 10, colors.dropDownText),
        },
        rightImage: {
            width: wp(54),
            height: wp(54),
            borderRadius: wp(10),
            backgroundColor: colors.image_Bg_gray
        },
        borderLine: {
            borderColor: colors.border_line2,
            borderWidth: 1,
            marginVertical: hp(16),
        },
    });
};
