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

const StudentNotification = ({ }: Props) => {
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


    const renderItem = ({ item, index }) => {
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
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={strings('notifications.notifications')}
                extraStyle={styles.headerContainer}
                isShowIcon={false}
            />
            <View style={styles.boxContainer}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onEndReachedThreshold={0.3}
                    data={[1, 2, 3, 4, 5, 6, 7, 8]}
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

export default StudentNotification;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        boxContainer: {
            flex: 1,
            marginHorizontal: wp(16),
        },
        headerContainer: {
            backgroundColor: colors.white,
            marginBottom:hp(10)
        },
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
