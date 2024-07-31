import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import PagerView from 'react-native-pager-view';
import PrimaryButton from '../../compoment/PrimaryButton';
import NoDataFound from '../../compoment/NoDataFound';
import OngoingCardList from '../../compoment/OngoingCardList';
import Loader from '../../compoment/Loader';
import { strings } from '../../i18n/i18n';
import { useAppSelector } from '../../redux/hooks';

type Props = {};

const MyOrdersList = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const { isDarkTheme } = useAppSelector(state => state.common);
    const [tabSelection, setTabSelection] = useState('Ongoing');
    const [tabSelectionIndex, setTabSelectionIndex] = useState(0);
    const [isLeftButtonActive, setIsLeftButtonActive] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const ref = React.createRef(PagerView);

    const onPressTrack = () => { }

    const onCancelBtn = () => { }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={strings('ordersList.myOrders')}
                extraStyle={styles.headerContainer}
            />
            <View style={styles.tabMainView}>
                <TouchableOpacity
                    onPress={() => {
                        setTabSelection('Ongoing');
                        setIsLeftButtonActive(true);
                        ref.current?.setPage(0);
                    }}
                    style={styles.tabItemView}>
                    <Text style={[styles.ongoingText, { color: tabSelection === 'Ongoing' ? colors.Primary_Orange : colors.gray_200 }]}>
                        {strings('ordersList.ongoing')}
                    </Text>
                    {tabSelection === 'Ongoing' && <View style={styles.underline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setTabSelection('History');
                        ref.current?.setPage(1);
                        setIsLeftButtonActive(false);
                    }}
                    style={styles.tabItemView}>
                    <Text style={[styles.historyText, { color: tabSelection === 'History' ? colors.Primary_Orange : colors.gray_200 }]}>
                        {strings('ordersList.history')}
                    </Text>
                    {tabSelection === 'History' && <View style={styles.underline} />}
                </TouchableOpacity>
                <View style={styles.underlineAll} />
            </View>

            <PagerView
                style={{ flex: 1 }}
                initialPage={tabSelectionIndex}
                ref={ref}
                onPageSelected={e => {
                    setTabSelection(e?.nativeEvent?.position == 0 ? 'Ongoing' : 'History');
                    setTabSelectionIndex(e?.nativeEvent?.position);
                    setIsLeftButtonActive(e?.nativeEvent?.position == 0 ? true : false);
                }}>
                <View style={styles.boxContainer} key={'1'}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        onEndReachedThreshold={0.3}
                        data={[1, 2, 3, 4, 5, 6]}
                        ListEmptyComponent={<NoDataFound />}
                        renderItem={({ item, index }) => {
                            return (
                                <OngoingCardList onPressTrack={onPressTrack} onCancelBtn={onCancelBtn} />
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    {true && <Loader size={'small'} />}
                                    <View style={{ height: 70 }} />
                                </View>
                            )
                        }}
                    />
                </View>

                <View style={{ flex: 1 }} key={'2'}>
                    <Text style={[
                        { marginHorizontal: wp(16), marginVertical: 8 },
                    ]}> {tabSelection == 'Ongoing' ? 'People you may know' : 'Pages from your area'}</Text>
                </View>
            </PagerView>
        </View>
    );
};

export default MyOrdersList;

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
        tabMainView: {
            flexDirection: 'row',
            marginBottom: hp(8)
        },
        tabItemView: {
            flex: 1,
            marginTop: hp(6),
            alignItems: 'center',
        },
        ongoingText: {
            ...commonFontStyle(700, 14, colors.gray_200),
        },
        historyText: {
            ...commonFontStyle(700, 14, colors.gray_200),
        },
        underline: {
            height: 2,
            width: wp(145),
            backgroundColor: colors.Primary_Orange,
            marginTop: hp(16),

        },
        underlineAll: {
            height: 1,
            width: SCREEN_WIDTH,
            backgroundColor: colors.gray_200,
            marginTop: hp(16),
            position: 'absolute',
            bottom: 0,
            zIndex: -1
        },
        boxContainer: {
            flex: 1,
            marginHorizontal: wp(16),
        },
    });
};
