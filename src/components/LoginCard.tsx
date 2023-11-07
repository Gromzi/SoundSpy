import { View, StyleSheet, useColorScheme, Text, Pressable } from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const LoginCard = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <View
      style={[
        styles.card,
        styles.iosShadow,
        { backgroundColor: colors.contrast },
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="cloud-check"
          size={100}
          color={colors.secondary}
        />
        <Text style={[styles.text, { fontSize: 38, color: colors.cardText }]}>
          Save your data
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: 18, color: colors.cardText, textAlign: 'center' },
          ]}
        >
          Access your predicted genres from any device
        </Text>
      </View>

      {/* <ButtonWithIcon
        text="Log In with Google"
        icon={
          <MaterialCommunityIcons name="google" size={32} color={'black'} />
        }
        color={colors.text}
      />

      <View style={{ height: 30 }}></View>

      <ButtonWithIcon
        text="Log In with email"
        icon={<MaterialCommunityIcons name="email" size={32} color={'black'} />}
        color={colors.secondary}
      /> */}

      <Pressable
        style={[
          styles.button,
          styles.iosShadow,
          { backgroundColor: colors.cardContrast },
        ]}
      >
        <MaterialCommunityIcons
          name="google"
          size={32}
          color={colors.contrast}
        />
        <Text style={[styles.text, { color: colors.contrast }]}>
          Log in with Google
        </Text>
      </Pressable>

      <View style={{ height: 30 }}></View>

      <Pressable
        style={[
          styles.button,
          styles.iosShadow,
          { backgroundColor: colors.secondary },
        ]}
      >
        <MaterialCommunityIcons
          name="email"
          size={32}
          color={colors.contrast}
        />
        <Text style={[styles.text, { color: colors.contrast }]}>
          Log in with email
        </Text>
      </Pressable>
    </View>
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

    paddingTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
  },
  headerContainer: {
    gap: 10,
    alignItems: 'center',
    marginBottom: 55,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  button: {
    height: 44,
    width: 270,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 50,
    borderRadius: 10,
  },
})

export default LoginCard
