import {
  View,
  Text,
  Modal,
  StyleSheet,
  useColorScheme,
  Pressable,
} from 'react-native'
import React from 'react'
import { colorPalette } from '../theme/colors'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AboutModal = ({ visible, setVisible }: Props) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      onDismiss={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={[styles.mainContainer, { backgroundColor: colors.contrast }]}
      >
        <View style={[styles.header]}>
          <Pressable hitSlop={10} onPress={() => setVisible(false)}>
            <AntDesign name="back" size={32} color={colors.cardContrast} />
          </Pressable>

          <Text
            style={{
              fontFamily: 'Kanit-Medium',
              color: colors.cardContrast,
              fontSize: 32,
            }}
          >
            About
          </Text>

          <Pressable hitSlop={10} onPress={() => setVisible(false)}>
            <FontAwesome
              name="question-circle"
              size={32}
              color={colors.primary}
            />
          </Pressable>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <Text
              style={[
                styles.text,
                {
                  color: colors.cardContrast,
                  marginBottom: 40,
                  textAlign: 'center',
                },
              ]}
            >
              SoundSet is an app that uses machine learning to predict the genre
              of a song based on the recorded or provided audio.
            </Text>
            <Text
              style={{
                fontFamily: 'Kanit-Medium',
                fontSize: 22,
                color: colors.cardContrast,
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              How it works
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: colors.cardContrast,
                  marginBottom: 40,
                  textAlign: 'center',
                },
              ]}
            >
              To start recording, press the big button and wait 30 seconds. The
              app will then analyse the audio and provide a prediction. You can
              also upload a song from your device to get a prediction. The
              prediction is then saved to the history tab. If you want to access
              your history on another device, you can sign up for an account and
              log in.
            </Text>
            <Text
              style={{
                fontFamily: 'Kanit-Medium',
                fontSize: 22,
                color: colors.cardContrast,
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Authors
            </Text>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: 'Kanit-Regular',
                  color: colors.cardContrast,
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontFamily: 'Kanit-Medium', fontSize: 16 }}>
                  Michał Gierak{'\n'}
                </Text>
                - UI/UX design, Frontend
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: 'Kanit-Regular',
                  color: colors.cardContrast,
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontFamily: 'Kanit-Medium', fontSize: 16 }}>
                  Konrad Chęciński{'\n'}
                </Text>
                - Backend, Dev-Ops
              </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: 'Kanit-Regular',
                  color: colors.cardContrast,
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontFamily: 'Kanit-Medium', fontSize: 16 }}>
                  Piotr Dyba{'\n'}
                </Text>
                - Machine Learning prediction model
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default AboutModal

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: '100%',
    paddingBottom: 120,
    maxWidth: 600,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  text: {
    fontFamily: 'Kanit-Regular',
  },
})
