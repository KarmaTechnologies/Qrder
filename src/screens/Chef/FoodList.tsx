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
import NoDataFound from '../../compoment/NoDataFound';
import OngoingCardList from '../../compoment/OngoingCardList';
import Loader from '../../compoment/Loader';
import { strings } from '../../i18n/i18n';
import MenuCardList from '../../compoment/MenuCardList';

type Props = {};

const tabs = [
    { key: 'All', label: strings('myMenuList.all'), page: 0 },
    { key: 'Breakfast', label: strings('myMenuList.breakfast'), page: 1 },
    { key: 'Lunch', label: strings('myMenuList.lunch'), page: 2 },
    { key: 'Dinner', label: strings('myMenuList.dinner'), page: 3 },
];

const MyMenuList = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
    const [tabSelectionIndex, setTabSelectionIndex] = useState(0);
    const ref = React.createRef(PagerView);

    const onPageSelected = (event: { nativeEvent: { position: number; } }) => {
        const pageIndex = event.nativeEvent.position;
        setTabSelection(tabs[pageIndex].key);
        setTabSelectionIndex(pageIndex);
    };


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
                title={strings('myMenuList.my_menu')}
                extraStyle={styles.headerContainer}
                isShowIcon={false}
            />
            <View style={styles.tabMainView}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setTabSelection(tab.key);
                            ref.current?.setPage(tab.page);
                            setTabSelectionIndex(index);
                        }}
                        style={styles.tabItemView}>
                        <Text style={[styles[`${tab.key.toLowerCase()}Text`], { color: tabSelection === tab.key ? colors.headerText3 : colors.Title_Text }]}>
                            {tab.label}
                        </Text>
                        {tabSelection === tab.key && <View style={styles.selectUnderline} />}
                    </TouchableOpacity>
                ))}
                <View style={styles.underlineAll} />
            </View>

            <PagerView
                style={{ flex: 1 }}
                initialPage={tabSelectionIndex}
                ref={ref}
                onPageSelected={onPageSelected}
            >
                <View style={styles.boxContainer} key={'1'}>
                    <MenuCardList />
                </View>

                <View style={styles.boxContainer} key={'2'}>
                    <MenuCardList />
                </View>

                <View style={styles.boxContainer} key={'3'}>
                    <MenuCardList />
                </View>

                <View style={styles.boxContainer} key={'4'}>
                    <MenuCardList />
                </View>
            </PagerView>
        </View>
    );
};

export default MyMenuList;

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
            marginBottom: hp(24)
        },
        tabItemView: {
            flex: 1,
            marginTop: hp(14),
            alignItems: 'center',
        },
        ongoingText: {
            ...commonFontStyle(700, 14, colors.gray_200),
        },
        historyText: {
            ...commonFontStyle(700, 14, colors.gray_200),
        },
        selectUnderline: {
            height: 2,
            width: wp(50),
            backgroundColor: colors.headerText3,
            marginTop: hp(16),

        },
        underlineAll: {
            height: 1,
            width: SCREEN_WIDTH,
            backgroundColor: colors.card_bg,
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
