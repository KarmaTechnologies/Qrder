import {
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

type Props = {};

const AddFoodDetails = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View style={styles.container}>
            <Text>AddFoodDetails</Text>
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
    });
};
