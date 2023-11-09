import { View, StyleSheet, useColorScheme, Text, Image } from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { login } from '../auth/auth'
import { useRouter } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AccordionItem from './AccordionItem'

const HistoryCard = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const router = useRouter()

  const onLoginPressHandler = () => {
    login()
    router.back()
  }

  return (
    <Animatable.View
      animation={'fadeInUpBig'}
      duration={500}
      style={[
        styles.card,
        styles.iosShadow,
        { backgroundColor: colors.contrast },
      ]}
    >
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.historyContainer}
        >
          <AccordionItem
            date={'2021-05-01'}
            time={'12:00'}
            picture={
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50 }}
              />
            }
          >
            <Text style={styles.textSmall}>
              React Native lets you create truly native apps and doesn't
              compromise your users' experiences. It provides a core set of
              platform agnostic native components{' '}
            </Text>
          </AccordionItem>
          <AccordionItem date={'2021-05-01'} time={'12:00'}>
            <Text style={styles.textSmall}>
              See your changes as soon as you save. With the power of
              JavaScript, React Native lets you iterate at lightning speed.
            </Text>
          </AccordionItem>
          <AccordionItem date={'2021-05-01'} time={'12:00'}>
            <Text style={styles.textSmall}>
              React components wrap existing native code and interact with
              native APIs via React's declarative UI paradigm and JavaScript.
              This enables native app development for whole new teams of
              developers
            </Text>
          </AccordionItem>
        </ScrollView>
      </SafeAreaView>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 520,
    maxWidth: 500,
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    elevation: 50,

    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  historyContainer: {
    margin: 10,
  },
  textBig: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
  },
  textSmall: {
    fontSize: 14,
    fontFamily: 'Kanit-Regular',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
})

export default HistoryCard
