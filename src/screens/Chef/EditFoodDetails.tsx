import {
    Alert,
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import Input from '../../compoment/Input';
import { commonFontStyle, hp, isIos, wp } from '../../theme/fonts';
import { Icons } from '../../utils/images';
import ImagePicker from 'react-native-image-crop-picker';
import CCDropDown from '../../compoment/CCDropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../compoment/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMenuAction, updateManuAction } from '../../actions/menuAction';
import { errorToast } from '../../utils/commonFunction';
import moment = require('moment');
import AddFolderModal from '../../compoment/AddFolderModal';
import { screenName } from '../../navigation/screenNames';

type Props = {};


const EditFoodDetails = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { itemData } = route.params;
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [itemName, setItemName] = useState(itemData?.name);
    const [price, setPrice] = useState(itemData?.price);
    const [basicDetails, setBasicDetails] = useState(itemData?.description);
    const [images, setImages] = useState([]);
    const [quantityValue, setQuantityValue] = useState(0);
    const { getCuisines } = useAppSelector(state => state.data);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const filteredItem = getCuisines.find((item: any) => item.name === itemData.cuisine_name);
        if (filteredItem) {
            setQuantityValue(filteredItem.id);
        }

    }, [getCuisines, itemData.cuisine_name]);

    const selectAndCropImage = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        })
            .then(selectedImages => {
                const cropPromises = selectedImages.map(image => {
                    return ImagePicker.openCropper({
                        path: image.path,
                        width: 300,
                        height: 300,
                    });
                });

                Promise.all(cropPromises)
                    .then(croppedImages => {
                        const newImages = croppedImages.map(image => ({
                            ...image,
                            name:
                                'image_' + moment().unix() + '_' + image.path.split('/').pop(),
                            uri: image.path,
                            id: image.path,
                        }));
                        setImages([...newImages, ...images]);
                    })
                    .catch(error => {
                        console.log('Error cropping images:', error);
                    });
            })
            .catch(error => {
                console.log('Error selecting images:', error);
            });
    };

    const renderImage = ({ item }: any) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.imageView} />
        </View>
    );

    const onPressEditItem = () => {
        if (itemName.trim().length === 0) {
            errorToast(strings('addFoodList.item_name_error'));
        } else if (price.trim().length === 0) {
            errorToast(strings('addFoodList.price_error'));
        } else if (quantityValue == 0) {
            errorToast(strings('addFoodList.cuisines_error'));
        } else if (basicDetails.trim().length === 0) {
            errorToast(strings('addFoodList.basicDetails'));
        } else {
            setLoading(true)
            let data = new FormData();
            data.append('name', itemName);
            data.append('cuisine_id', quantityValue);
            data.append('price', price);
            data.append('description', basicDetails);
            // data.append('files', {
            //     uri: images[0]?.uri,
            //     type: images[0]?.mime,
            //     name: images[0]?.name,
            // });
            let obj = {
                params: itemData?.id,
                data,
                onSuccess: (response: any) => {
                    navigation.navigate(screenName.tab_bar_name.FoodList)
                    setLoading(false)
                    setImages([]);
                    setItemName('');
                    setPrice('');
                    setQuantityValue(0);
                    setBasicDetails('');
                    // Keyboard.dismiss()
                },
                onFailure: (Err: any) => {
                    setLoading(false)
                    if (Err != undefined) {
                        Alert.alert(Err?.data?.message);
                    }
                },
            };
            dispatch(updateManuAction(obj));
        }
    };


    const onRightPress = () => {
        setImages('');
        setItemName('');
        setPrice('');
        setQuantityValue(0);
        setBasicDetails('');
    }

    return (
        <View style={styles.container}>
            <HomeHeader
                onBackPress={() => {
                    navigation.goBack()
                }}
                onRightPress={onRightPress}
                mainShow={true}
                title={strings('editFoodDetails.editItems')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightText={strings('addFoodList.reset')}
            />
            <View style={styles.subContainer}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <Input
                        value={itemName}
                        placeholder={strings('addFoodList.p_itemName')}
                        label={strings('addFoodList.item_name')}
                        onChangeText={(t: string) => setItemName(t)}
                        extraStyle={styles.inputView}
                        inputStyle={styles.inputStyle}
                    />

                    <Text style={styles.uploadText}>
                        {strings('addFoodList.upload_photo_video')}
                    </Text>

                    <View style={styles.uploadImage}>
                        <TouchableOpacity
                            style={styles.addImage}
                            onPress={selectAndCropImage}>
                            <Image style={styles.addIcon} source={Icons.addImage} />
                            <Text style={styles.addText}>{strings('addFoodList.add')}</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={images}
                            renderItem={renderImage}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={styles.imageList}
                        />
                    </View>
                    <View style={styles.itemPrice}>
                        <Input
                            value={price}
                            placeholder={'$50'}
                            label={strings('addFoodList.price')}
                            onChangeText={(t: string) => setPrice(t)}
                            extraStyle={styles.priceInput}
                            inputStyle={styles.priceInputStyle}
                            keyboardType="number-pad"
                        />
                        <CCDropDown
                            data={getCuisines}
                            label={strings('addFoodList.add_cusine')}
                            labelField={'name'}
                            valueField={'id'}
                            placeholder={strings('addFoodList.select_cusine')}
                            DropDownStyle={styles.dropDownStyle}
                            value={quantityValue}
                            setValue={setQuantityValue}
                        />
                    </View>

                    <Text style={styles.basicText}>
                        {strings('addFoodList.basic_details')}
                    </Text>
                    <TextInput
                        value={basicDetails}
                        onChangeText={(t: string) => setBasicDetails(t)}
                        placeholder={strings('addFoodList.add_basic')}
                        style={styles.basicInput}
                        multiline
                        maxLength={200}
                        placeholderTextColor={colors.gray_300}
                    />
                    <PrimaryButton
                        extraStyle={styles.saveChangeButton}
                        onPress={onPressEditItem}
                        title={strings('addFoodList.save_changes')}
                        titleStyle={styles.saveText}
                        isLoading={loading}
                    />
                    <View style={styles.spacerView} />
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

export default EditFoodDetails;

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
            marginHorizontal: wp(16),
        },
        inputView: {
            marginTop: hp(6),
        },
        inputStyle: {
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.border_line4,
            height: hp(50),
            paddingHorizontal: wp(16),
        },
        uploadText: {
            ...commonFontStyle(400, 13, colors.Title_Text),
            lineHeight: 15,
            textTransform: 'uppercase',
            paddingTop: hp(20),
        },
        uploadImage: {
            paddingTop: hp(16),
            flexDirection: 'row',
        },
        addImage: {
            width: wp(110),
            height: wp(101),
            borderRadius: 20,
            borderColor: colors.border_line4,
            borderWidth: 1,
            borderStyle: 'dashed',
            alignItems: 'center',
            justifyContent: 'center',
        },
        addIcon: {
            width: wp(42),
            height: wp(42),
            resizeMode: 'cover',
        },
        addText: {
            ...commonFontStyle(400, 13, colors.dropDownText),
        },
        imageList: {
            flexGrow: 0,
        },
        itemPrice: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        priceInput: {
            marginTop: hp(40),
        },
        priceInputStyle: {
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.border_line4,
            height: hp(42),
            width: wp(115),
            paddingHorizontal: wp(16),
        },
        dropDownStyle: {
            borderColor: colors.border_line4,
            width: wp(137),
        },
        imageContainer: {
            marginHorizontal: 10,
        },
        imageView: {
            width: wp(110),
            height: wp(101),
            borderRadius: 20,
            backgroundColor: colors.image_Bg_gray,
        },
        basicText: {
            ...commonFontStyle(400, 14, colors.Title_Text),
            paddingTop: hp(40),
        },
        basicInput: {
            height: hp(136),
            borderColor: colors.border_line4,
            borderWidth: 1,
            borderRadius: 8,
            padding: 15,
            textAlignVertical: 'top',
            marginTop: hp(20),
            color: colors.black
        },
        saveChangeButton: {
            marginTop: hp(49),
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        saveText: {
            ...commonFontStyle(400, 18, colors.white),
        },
        spacerView: {
            height: isIos ? hp(210) : hp(170),
        },
        boxStyle: {
            borderWidth: 1,
            height: wp(150),
            width: wp(200),
            borderRadius: 18,
            marginBottom: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.card_bg
        },
        boxText: {
            ...commonFontStyle(400, 18, colors.black),
        },
        imageStyle: {
            height: wp(30),
            width: wp(30),
            marginBottom: 12
        }
    });
};
