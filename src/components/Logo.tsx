import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorPalette } from '../theme/colors';

const Logo = () => {
    return (
        <View style={styles.circle}>
            <LinearGradient
                colors={[colorPalette.dark.secondary, colorPalette.dark.primary]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>SoundSpy</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        top: -95,
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Kanit-Regular',
    },
});

export default Logo;
