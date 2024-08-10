import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { strings } from '../i18n/i18n';
import { screenName } from '../navigation/screenNames';
import PrimaryButton from './PrimaryButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { decrement, decrementItem, increment, incrementItem } from '../actions/commonAction';
import { useSelector } from 'react-redux';

export interface ListObj {
    title: string;
    iconName?: any;
    images?: string[];
    name?: string;
    cuisine_name?: string;
    price?: number;
}
type ItemProps = {
    item: ListObj;
    setDelete?: any
};


const CartMenuItems = ({ item, setDelete }: ItemProps) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { count } = useAppSelector(state => state.common);
    const [visible, setVisible] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const { getMenuData } = useAppSelector(state => state.data);
    const [addItemData, setAddItemData] = useState([]);

    const onPressedit = () => {
        hideMenu();
        const clear = setTimeout(() => {
            navigation.navigate(screenName.FoodDetails, { itemData: item })
        }, 500);
        return () => {
            clearTimeout(clear);
        };
    };

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const onPressDelete = () => {
        setDelete(true);
    };

    const onPressAddItem = (items) => {
        let tempData = [];
        let existing = false
        if (addItemData.length >= 0) {
            addItemData.map(itm => {
                if(items.id === itm.id){
                      console.log("--",tempData.length)
                    existing = true
                       itm.qty = (itm.qty || 0) + 1;
                }
            })

            if(existing === false){
                setAddItemData(items)
                tempData.push(items) 
            }
        } else {
            console.log("+++++",addItemData)
            setAddItemData([items])
            tempData.push(items)
        }
        console.log("+++++",addItemData)
        // setAddItem(true)
    }

    return (
        <View style={styles.boxView}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                navigation.navigate(screenName.FoodDetails, { itemData: item })
            }} style={styles.subBoxView}>
                {item.images[0] ? (
                    <Image source={{ uri: item.images[0] }} style={[styles.imageView, { backgroundColor: colors.image_Bg_gray }]} />
                ) : (
                    <View
                        style={[
                            styles.imageView,
                            { backgroundColor: colors.image_Bg_gray },
                        ]}
                    />
                )}
                <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Text style={styles.titleText}> {item?.name}</Text>
                        <Text style={styles.priceText}> {`$${item.price}`}</Text>
                    </View>
                    <View style={styles.rateView}>
                        <View style={styles.breakfastView}>
                            <Text style={styles.breakfastText}> {item.cuisine_name}</Text>
                        </View>
                        <Text style={styles.pickUpText}> {'Pick UP'}</Text>
                    </View>
                    <View style={styles.rateView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Icons.star} style={styles.starStyle} />
                            <Text style={styles.rateText}>4.9</Text>
                            <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text>
                        </View>
                        {!addItem ?
                            <PrimaryButton
                                extraStyle={styles.doneBtn}
                                title={strings('CardMenuList.add')}
                                titleStyle={styles.doneText}
                                onPress={() => onPressAddItem(item)}
                            /> :
                            <View style={styles.rightContainers}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.roundView}
                                        onPress={() => {
                                            if (count > 1) {
                                                dispatch(decrement())
                                            }
                                            else {
                                                setAddItem(false)
                                            }

                                        }}>
                                        <Image style={styles.minusIcon} source={Icons.minus} />
                                    </TouchableOpacity>
                                    <Text style={styles.countText}>{count}</Text>
                                    <TouchableOpacity style={styles.roundView}
                                        onPress={() => dispatch(increment())}
                                    >
                                        <Image style={styles.rightIcon} source={Icons.plus} />
                                    </TouchableOpacity>
                                </View>
                            </View>}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CartMenuItems

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        boxView: {
            marginTop: hp(20),
        },
        subBoxView: {
            flexDirection: 'row',
        },
        imageView: {
            width: wp(102),
            height: wp(102),
            borderRadius: 20,
        },
        container: {
            flex: 1,
            marginLeft: wp(12),
            paddingTop: hp(11),
        },
        leftView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        titleText: {
            ...commonFontStyle(700, 14, colors.headerText),
        },
        optionIcon: {
            width: wp(24),
            height: hp(24),
        },
        pickUpText: {
            ...commonFontStyle(400, 14, colors.tabBar),
        },
        breakfastView: {
            backgroundColor: colors.orange_bg,
            alignSelf: 'flex-start',
            paddingHorizontal: wp(12),
            paddingVertical: hp(2),
            borderRadius: 29,
            marginVertical: hp(11),
        },
        priceText: {
            ...commonFontStyle(700, 18, colors.Title_Text),
        },
        breakfastText: {
            ...commonFontStyle(400, 14, colors.Primary_Orange),
        },
        itemsText: {
            ...commonFontStyle(400, 14, colors.gray_400),
        },
        rateView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        starStyle: {
            width: 17,
            height: 17,
        },
        rateText: {
            marginLeft: 4,
            ...commonFontStyle(700, 14, colors.Primary_Orange),
        },
        rateText1: {
            ...commonFontStyle(400, 14, colors.tabBar),
            marginLeft: 9,
        },
        rightContainers: {
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        menuTextStyle: {
            ...commonFontStyle(400, 16, colors.black),
        },
        boxMenu: {
            backgroundColor: colors.card_bg
        },
        roundView: {
            backgroundColor: colors.Primary_Orange,
            borderRadius: wp(24),
            width: wp(24),
            height: wp(24),
            alignItems: 'center',
            justifyContent: 'center'
        },
        minusIcon: {
            width: wp(16),
            height: hp(16),
            resizeMode: 'contain',
            tintColor: colors.white
        },
        rightIcon: {
            width: wp(12),
            height: hp(12),
            resizeMode: 'contain',
            tintColor: colors.white
        },
        countText: {
            paddingHorizontal: wp(10),
            ...commonFontStyle(400, 16, colors.black),
        },
        doneBtn: {
            height: hp(26),
            paddingHorizontal: wp(13),
            borderRadius: 8,
        },
        doneText: {
            ...commonFontStyle(400, 14, colors?.white),
            textTransform: 'none',
        },
    });
};
