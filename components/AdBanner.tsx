import { StyleSheet, Text, View } from 'react-native';

export const AdBanner = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Ad Banner (Not available on Web)</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#888',
        fontSize: 12,
    }
});
