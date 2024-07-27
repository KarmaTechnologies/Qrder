import {
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
import { strings } from '../../i18n/i18n';
import MessagesListCard from '../../compoment/MessagesListCard';
import NotificationListCard from '../../compoment/NotificationListCard';

type Props = {};

const Notification = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [tabSelection, setTabSelection] = useState('Notifications');
    const [tabSelectionIndex, setTabSelectionIndex] = useState(0);
    const [isLeftButtonActive, setIsLeftButtonActive] = useState(true);
    const ref = React.createRef(PagerView);

    const onPressTrack = () => { }

    const onCancelBtn = () => { }


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.white}
            />
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={tabSelection === 'Notifications' ? strings('notifications.notifications') : strings('notifications.messages')}
                extraStyle={styles.headerContainer}
                isShowIcon={false}
            />
            <View style={styles.tabMainView}>
                <TouchableOpacity
                    onPress={() => {
                        setTabSelection('Notifications');
                        setIsLeftButtonActive(true);
                        ref.current?.setPage(0);
                    }}
                    style={styles.tabItemView}>
                    <Text style={[styles.ongoingText, { color: tabSelection === 'Notifications' ? colors.Primary_Orange : colors.gray_200 }]}>
                        {strings('notifications.notifications')}
                    </Text>
                    {tabSelection === 'Notifications' && <View style={styles.underline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setTabSelection('Messages');
                        ref.current?.setPage(1);
                        setIsLeftButtonActive(false);
                    }}
                    style={styles.tabItemView}>
                    <Text style={[styles.historyText, { color: tabSelection === 'Messages' ? colors.Primary_Orange : colors.gray_200 }]}>
                        {`${strings('notifications.review')} (3)`}
                    </Text>
                    {tabSelection === 'Messages' && <View style={styles.underline} />}
                </TouchableOpacity>
                <View style={styles.underlineAll} />
            </View>

            <PagerView
                style={{ flex: 1 }}
                initialPage={tabSelectionIndex}
                ref={ref}
                onPageSelected={e => {
                    setTabSelection(e?.nativeEvent?.position == 0 ? 'Notifications' : 'Messages');
                    setTabSelectionIndex(e?.nativeEvent?.position);
                    setIsLeftButtonActive(e?.nativeEvent?.position == 0 ? true : false);
                }}>
                <View style={styles.boxContainer} key={'1'}>
                    <NotificationListCard />
                </View>

                <View style={styles.boxContainer} key={'2'}>
                    <MessagesListCard />
                </View>

            </PagerView>
        </View>
    );
};

export default Notification;

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
            marginBottom: hp(32)
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
        },
    });
};
