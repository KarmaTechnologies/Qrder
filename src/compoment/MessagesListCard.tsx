import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../theme/fonts';
type Props = {};

const MessagesListCard = (props: Props) => {
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View>
            <View style={styles.subBoxView}>
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.dotImage} />
                    <View style={styles.leftImage} />
                    <View style={{ marginLeft: wp(14) }}>
                        <Text numberOfLines={1} style={styles.firstText}>{'Cameron Williamson'}</Text>
                        <Text style={styles.desText}>{'Sounds awesome!'}</Text>
                    </View>
                </View>
                <View>
                <Text style={styles.timeText}>{'19:37'}</Text>
                <View style={styles.numberView}>
                    <Text style={styles.numberText}>1</Text>
                </View>
                </View>
             
            </View>
            <View style={styles.borderLine} />
        </View>
    );
};

export default MessagesListCard;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        subBoxView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftImage: {
            width: wp(32),
            height: wp(32),
            borderRadius: wp(30),
            backgroundColor: colors.image_Bg_gray
        },
        dotImage:{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.image_Bg_gray,
            position:'absolute',
            bottom:0,
            right:0
        },
        firstText: {
            // width: SCREEN_WIDTH * 0.39,
            ...commonFontStyle(400, 16, colors.Title_Text),
        },
        desText: {
            ...commonFontStyle(400, 12, colors.message_text),
        },
        timeText: {
            ...commonFontStyle(400, 9, colors.message_text),
        },
        numberView:{
            width: wp(22),
            height: wp(22),
            borderRadius: wp(22),
            marginTop:hp(5),
            backgroundColor: colors.Primary_Orange,
            alignItems:'center',
            justifyContent:'center'
        },
        numberText:{
            ...commonFontStyle(400, 12, colors.white),
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
