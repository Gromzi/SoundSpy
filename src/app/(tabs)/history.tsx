import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { BackgroundGrandient } from '../../components/BackgroundGrandient'
import TabLabel from '../../components/TabLabel'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colorPalette } from '../../theme/colors'
import HistoryCard from '../../components/HistoryCard'

export default function HistoryScreen() {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <TabLabel
          labelText="History"
          icon={
            <MaterialCommunityIcons
              name="bookshelf"
              size={48}
              color={colors.secondary}
            />
          }
        />
      </View>
      <HistoryCard />
    </BackgroundGrandient>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  inputContainer: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 90,
  },
})
