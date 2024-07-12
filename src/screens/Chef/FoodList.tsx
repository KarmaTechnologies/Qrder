import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

type Props = {};

const FoodList = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />
        </View>
    );
};

export default FoodList;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
        },
    });
};
