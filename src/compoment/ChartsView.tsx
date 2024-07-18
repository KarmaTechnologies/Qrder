import {
  ImageBackground,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../theme/fonts';
import { Icons } from '../utils/images';
import HomeDropDown from './HomeDropDown';
import { LineChart } from 'react-native-gifted-charts';
import { strings } from '../i18n/i18n';
import { screenName } from '../navigation/screenNames';

type Props = {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (params: string) => void;
  isShowEyeIcon?: boolean;
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  onSubmitEditing?: () => void;
  theme?: string;
  autoCorrect?: boolean;
  rest?: TextInputProps[];
  inputRef?: any;
  returnKeyType?: ReturnKeyType;
};

const ptData = [
  { value: 500, label: '10am', frontColor: '#177AD5' },
  { value: 745, label: '11am', frontColor: '#177AD5' },
  { value: 320, label: '12pm' },
  { value: 600, label: '1pm', frontColor: '#177AD5' },
  { value: 256, label: '2pm' },
  { value: 300, label: '3pm' },
  { value: 300, label: '4pm' },
  { value: 300, label: '5pm' },
  { value: 300, label: '6pm' },
];

const ChartsView = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
  onPressEye,
  isShowEyeIcon,
  theme = 'first',
  autoCorrect,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [dropDownValue, setdropDownValue] = useState('Today');
  const [pointerIndex, setpointerIndex] = useState(0);

  const [selectedType, setselectedType] = useState({
    lable: '24 h',
    isSelected: true,
    data: ptData,
  });

  const isFocuse = useIsFocused();
  const data2 = [
    { value: 50 },
    { value: 10 },
    { value: 45 },
    { value: 30 },
    { value: 45 },
    { value: 18 },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ marginRight: 10 }}>
            <Text numberOfLines={1} style={styles.labelTextStyle}>
              {strings("home.total_revenue")}
            </Text>
            <Text numberOfLines={1} style={styles.labelTextStyle1}>
              {'$2,241'}
            </Text>
          </View>
          <HomeDropDown
            value={dropDownValue}
            onChangeText={(text: any) => {
              setdropDownValue(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(screenName.MyOrdersList)}>
          <Text style={styles.seeText}>{strings("home.see_details")}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ left: -8, marginTop: 20 }}>
        <LineChart
          curved
          isAnimated
          animationDuration={1500}
          areaChart
          data={selectedType.data}
          width={SCREEN_WIDTH * 0.82}
          height={SCREEN_HEIGHT * 0.1}
          hideDataPoints
          adjustToWidth={false}
          color={colors.Primary_Orange}
          thickness={2}
          startFillColor="rgba(251, 109, 58, 0)"
          endFillColor="rgba(251, 109, 58, 0)"
          startOpacity={0.2}
          endOpacity={0.1}
          initialSpacing={7}
          hideRules
          hideYAxisText
          hideAxesAndRules
          xAxisLabelTextStyle={{ ...commonFontStyle(400, 11, colors.dropDownText), }}
          pointerConfig={{
            hidePointer1: false,
            pointerStripColor: colors.Primary_Orange,
            pointerStripWidth: 2,
            autoAdjustPointerLabelPosition: false,
            pointerComponent: () => (
              <View
                style={{
                  borderWidth: 3,
                  height: 10,
                  width: 10,
                  borderRadius: 10 / 2,
                  borderColor: colors.Primary_Orange,
                }}
              />
            ),
            pointerLabelComponent: item => {
              return (
                <ImageBackground
                  resizeMode="contain"
                  source={Icons.chartBg}
                  style={{
                    height: 33,
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop:20
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {selectedType?.data[0].value}
                  </Text>
                </ImageBackground>
              );
            },
          }}
          getPointerProps={(e: any) => {
            setpointerIndex(e.pointerIndex == -1 ? 0 : e.pointerIndex);
          }}
        />
      </View>
    </View>
  );
};

export default ChartsView;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      padding: 16,
    },
    labelTextStyle: {
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
    labelTextStyle1: {
      ...commonFontStyle(700, 22, colors.Title_Text),
    },
    seeText: {
      ...commonFontStyle(400, 14, colors.Primary_Orange),
      textDecorationLine: 'underline',
    },
  });
};
