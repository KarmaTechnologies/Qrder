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
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
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
import { addMenuAction } from '../../actions/menuAction';
import { errorToast } from '../../utils/commonFunction';
import moment = require('moment');
import AddFolderModal from '../../compoment/AddFolderModal';
import Spacer from '../../compoment/Spacer';

const AddFoodDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [basicDetails, setBasicDetails] = useState('');
  const [images, setImages] = useState([]);
  const [quantityValue, setQuantityValue] = useState(0);
  const { getCuisines } = useAppSelector(state => state.data);
  const dispatch = useAppDispatch();
  const [newFolder, setNewFolder] = useState(false);
  const [showAddField, setShowAddField] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];


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

  const onPressAddItem = () => {
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
      data.append('files', {
        uri: images[0]?.uri,
        type: images[0]?.mime,
        name: images[0]?.name,
      });
      let obj = {
        data,
        onSuccess: (response: any) => {
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
      dispatch(addMenuAction(obj));
    }
  };


  const onRightPress = () => {
    setImages('');
    setItemName('');
    setPrice('');
    setQuantityValue(0);
    setBasicDetails('');
  }


  const handlePress = (value: any) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.radioView}>
      <TouchableOpacity
        key={item.value}
        style={styles.radioContainer}
        onPress={() => handlePress(item.value)}>
        <View
          style={[
            styles.checkbox,
            selectedOptions.includes(item.value) && styles.selectedCheckbox,
          ]}>
          {selectedOptions.includes(item.value) && (
            <Image style={styles.checkIcon} source={Icons.checkIcon} />
          )}
        </View>
        <Text
          style={[
            styles.radioText,
            {
              color: selectedOptions.includes(item.value)
                ? colors.Primary_Orange
                : colors.Title_Text,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
      <Spacer width={12} />
    </View>
  );

  if (showAddField) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
      <TouchableOpacity onPress={() => { setNewFolder(true) }} style={styles.boxStyle}>
        <Image source={Icons.cuisine} style={styles.imageStyle} />
        <Text style={styles.boxText}>{strings("addFoodList.add_cuisines")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowAddField(false)} style={styles.boxStyle}>
        <Image source={Icons.addMenu1} style={styles.imageStyle} />

        <Text style={styles.boxText}>{strings("addFoodList.add_menu")}</Text>
      </TouchableOpacity>
      <AddFolderModal
        isVisible={newFolder}
        onClose={() => setNewFolder(false)}
      />
    </View>
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        onBackPress={() => {
          setShowAddField(true)
        }}
        onRightPress={onRightPress}
        mainShow={true}
        title={strings('addFoodList.add_new_items')}
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
          <View>
            <Text style={styles.miscellaneousText}>{strings('addFoodList.miscellaneous')}</Text>
            <FlatList
              data={options}
              renderItem={renderItem}
              horizontal
              keyExtractor={(item) => item.value}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <PrimaryButton
            extraStyle={styles.saveChangeButton}
            onPress={onPressAddItem}
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

export default AddFoodDetails;

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
    },
    miscellaneousText: {
      ...commonFontStyle(400, 13, colors.Title_Text),
      textTransform: 'uppercase',
      paddingTop: hp(20),
    },
    radioView: {
      flexDirection: 'row',
      paddingTop: hp(15),
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioButton: {
      height: 18,
      width: 18,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRadioButton: {
      borderColor: colors.Primary_Orange,
    },
    radioButtonInner: {
      height: 9,
      width: 9,
      borderRadius: 5,
      backgroundColor: colors.Primary_Orange,
    },
    radioText: {
      marginLeft: 10,
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
    checkbox: {
      height: hp(18),
      width: wp(18),
      borderRadius: 2,
      borderWidth: 2,
      borderColor: colors.Border_gray,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedCheckbox: {
      borderColor: colors.Primary_Orange,
    },
    checkboxInner: {
      width: 10,
      height: 10,
      backgroundColor: colors.white
    },
    checkIcon: {
      width: wp(18),
      height: hp(18),
      resizeMode: 'contain',
      tintColor: colors.black,
    },
  });
};
