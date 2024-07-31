import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import NoDataFound from '../../compoment/NoDataFound';
import Loader from '../../compoment/Loader';
import Spacer from '../../compoment/Spacer';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';

type Props = {};

const ProfileMessages = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const renderItem = () => {
        return (
            <>
                <View style={styles.subBoxView}>
                    <View style={styles.boxImageView}>
                        <View style={styles.leftImage}>
                            {/* <Image source={Icons.optionIcon} style={styles.imageStyle} /> */}
                            <View style={styles.indicatorIcon} />
                        </View>
                        <View style={{ marginLeft: wp(14) }}>
                            <Text numberOfLines={1} style={styles.firstText}>{'Cameron Williamson'}</Text>
                            <Text numberOfLines={2} style={styles.desText}>{'Thanks for the awesome food man...!'}</Text>
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
            </>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={strings('notifications.messages')}
                extraStyle={styles.headerContainer}
                isShowIcon={false}
            />
            <View style={styles.boxContainer}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onEndReachedThreshold={0.3}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    ListEmptyComponent={<NoDataFound />}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                {true && <Loader size={'small'} />}
                                <Spacer height={hp(70)} />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default ProfileMessages;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        boxContainer: {
            flex: 1,
            marginHorizontal: wp(16),
        },
        headerContainer: {
            backgroundColor: colors.white,
            marginBottom: hp(10)
        },
        subBoxView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        boxImageView: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        leftImage: {
            width: wp(32),
            height: wp(32),
            borderRadius: wp(30),
            backgroundColor: colors.image_Bg_gray
        },
        indicatorIcon: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.indicator_bg,
            borderColor: colors.white,
            borderWidth: 1.5,
            position: 'absolute',
            bottom: 3,
            right: 0,
            zIndex: 1
        },
        firstText: {
            width: SCREEN_WIDTH * 0.65,
            ...commonFontStyle(400, 16, colors.Title_Text),
        },
        desText: {
            width: SCREEN_WIDTH * 0.65,
            ...commonFontStyle(400, 12, colors.message_text),
        },
        timeText: {
            ...commonFontStyle(400, 9, colors.message_text),
        },
        numberView: {
            width: wp(22),
            height: wp(22),
            borderRadius: wp(22),
            marginTop: hp(5),
            backgroundColor: colors.Primary_Orange,
            alignItems: 'center',
            justifyContent: 'center'
        },
        numberText: {
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
