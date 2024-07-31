import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { screenName } from '../navigation/screenNames';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import PrimaryButton from './PrimaryButton';
import { strings } from '../i18n/i18n';

type Props = {
    onPressTrack?: () => void;
    onCancelBtn?: () => void;
};

const OngoingCardList = ({ onPressTrack, onCancelBtn }: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View style={styles.boxView}>
            <Text style={styles.titleList}> {'Food'}</Text>
            <View style={styles.borderLine} />

            <View style={styles.subBoxView}>
                <View style={styles.imageView} />
                <View style={styles.rightContainer}>
                    <View style={styles.leftView}>
                        <Text style={styles.titleText}> {'Pizza Hut'}</Text>
                        <Text style={styles.idText}> {'#162432'}</Text>
                    </View>
                    <View style={styles.rightView}>
                        <Text style={styles.priceText}> {'$35.25'}</Text>
                        <View style={styles.borderStyle} />
                        <Text style={styles.itemsText}> {'03 Items'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    extraStyle={styles.trackBtn}
                    title={strings('ordersList.trackOrder')}
                    titleStyle={styles.trackText}
                    onPress={onPressTrack}
                />
                <PrimaryButton
                    extraStyle={styles.cancelBtn}
                    title={strings('ordersList.cancel')}
                    titleStyle={styles.cancelText}
                    onPress={onCancelBtn}
                />
            </View>
        </View>
    );
};

export default OngoingCardList;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        boxView: {
            marginTop: hp(24)
        },
        titleList: {
            ...commonFontStyle(400, 14, colors.headerText),
        },
        borderLine: {
            borderColor: colors.border_line2,
            borderWidth: 1,
            marginVertical: hp(16),
        },
        subBoxView: {
            flexDirection: 'row'
        },
        imageView: {
            width: wp(60),
            height: wp(60),
            borderRadius: 8,
            backgroundColor: colors.image_Bg_gray,
        },
        rightContainer: {
            flex: 1,
            alignSelf: 'center',
            marginLeft: wp(14)
        },
        leftView: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        titleText: {
            ...commonFontStyle(700, 14, colors.headerText),
        },
        idText: {
            ...commonFontStyle(400, 14, colors.gray_400),
        },
        rightView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(10)
        },
        priceText: {
            ...commonFontStyle(700, 14, colors.headerText),
        },
        borderStyle: {
            height: 16,
            width: 1,
            backgroundColor: colors.border_line3,
            marginHorizontal: wp(14)
        },
        itemsText: {
            ...commonFontStyle(400, 12, colors.gray_400),
        },
        btnContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(24)
        },
        trackBtn: {
            height: hp(38),
            paddingHorizontal: wp(13),
            borderRadius: 9,
            width: wp(139),
        },
        trackText: {
            ...commonFontStyle(700, 12, colors.white),
            textTransform: 'none',
        },
        cancelBtn: {
            height: hp(38),
            width: wp(139),
            backgroundColor: colors.white,
            borderColor: colors.Primary_Orange,
            borderWidth: 1,
            borderRadius: 9,
        },
        cancelText: {
            ...commonFontStyle(700, 12, colors?.Primary_Orange),
            textTransform: 'none',
        },
    });
};
