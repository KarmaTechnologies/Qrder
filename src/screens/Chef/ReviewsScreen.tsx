import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import { screenName } from '../../navigation/screenNames';
import { strings } from '../../i18n/i18n';
import HomeHeader from '../../compoment/HomeHeader';
import { Icons } from '../../utils/images';
import NoDataFound from '../../compoment/NoDataFound';
import Loader from '../../compoment/Loader';

type Props = {};

const ReviewsScreen = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.subContainer}>
                <View style={styles.imageStyle} />
                <View style={styles.cardCotainer}>
                    <View style={styles.dateView}>
                        <Text style={styles.dateText}>20/12/2020</Text>
                        <Image source={Icons.optionIcon} style={styles.optionIcon} />
                    </View>
                    <Text style={styles.titleText}>Great Food and Service</Text>
                    <View style={styles.starView}>
                        {[1, 2, 3, 4, 5].map((value, index) => {
                            return (
                                <View key={index}>
                                    <Image source={Icons.star} style={styles.starStyle} />
                                </View>

                            )
                        })}
                    </View>
                    <Text style={styles.desText}>This Food so tasty & delicious. Breakfast
                        so fast Delivered in my place. Chef is very
                        friendly. I’m really like chef for Home Food
                        Order. Thanks. </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={strings("reviews.reviews")}
                extraStyle={styles.headerContainer}
                isShowIcon={false}
            />
            <FlatList
                onEndReachedThreshold={0.3}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                ListEmptyComponent={<NoDataFound />}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                    return (
                        <View>
                            {false && <Loader size={'small'} />}
                        </View>
                    )
                }}
            />
        </View>
    );
};

export default ReviewsScreen;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
        },
        headerContainer: {
            backgroundColor: colors.white,
        },
        subContainer: {
            marginTop: hp(20),
            paddingHorizontal: wp(16),
            flexDirection: 'row'
        },
        imageStyle: {
            width: wp(43),
            height: wp(43),
            borderRadius: wp(43),
            backgroundColor: colors.image_Bg_gray,
            resizeMode: 'contain'
        },
        cardCotainer: {
            flex: 1,
            borderRadius: 15,
            backgroundColor: colors.card_bg,
            paddingVertical: hp(15),
            paddingHorizontal: wp(14),
            marginLeft: wp(10)
        },
        dateView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        dateText: {
            ...commonFontStyle(400, 12, colors.dropDownText),
        },
        optionIcon: {
            width: wp(24),
            height: hp(24),
            tintColor: colors.dropDownText,
        },
        titleText: {
            paddingTop: hp(11),
            ...commonFontStyle(700, 14, colors.Title_Text),
        },
        starStyle: {
            width: 17,
            height: 17,
        },
        starView: {
            paddingTop: hp(6),
            flexDirection: 'row',
            alignItems: "center"
        },
        desText: {
            paddingTop: hp(15),
            ...commonFontStyle(400, 12, colors.dropDownText),
        }
    });
};
