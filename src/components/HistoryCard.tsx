import {
  StyleSheet,
  useColorScheme,
  Text,
  Image,
  Platform,
  View,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AccordionItem from './AccordionItem'
import React, { useEffect } from 'react'
import { GenreIconsEnum } from '../utils/genreIconsEnum'
import GenresPieChart from './GenresPieChart'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'

const HistoryCard = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const serverData = {
    classical: 0.0021,
    jazz: 0.0056,
    blues: 0.0027,
    rock: 99.985,
    pop: 0.0013,
  }

  useFocusEffect(() => {
    console.log('HistoryCard focused')
  })

  const chartData = Object.keys(serverData).map((genre) => {
    const prediction = serverData[genre as keyof typeof serverData].toFixed(3)

    return {
      name: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize the genre name
      prediction: parseFloat(prediction), // Convert percentage to decimal
      color: colors[genre as keyof typeof colors],
      legendFontColor: colors[genre as keyof typeof colors],
      legendFontSize: Platform.OS === 'web' ? 18 : 14,
    }
  })

  const sortedData = chartData.sort((a, b) => b.prediction - a.prediction)

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
              // <Image
              //   source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              //   style={{ width: 50, height: 50 }}
              // />
              <MaterialCommunityIcons
                name={
                  GenreIconsEnum[
                    sortedData[0].name as keyof typeof GenreIconsEnum
                  ]
                }
                size={50}
                color={sortedData[0].color}
              />
            }
          >
            <View style={styles.historyElementBody}>
              <View style={styles.headerOne}>
                <Text
                  style={[
                    styles.text,
                    { color: colors.cardContrast, fontSize: 26 },
                  ]}
                >
                  {'Most likely genre: '}
                </Text>
              </View>
              <View style={styles.headerTwo}>
                <MaterialCommunityIcons
                  name={
                    GenreIconsEnum[
                      sortedData[0].name as keyof typeof GenreIconsEnum
                    ]
                  }
                  size={44}
                  color={sortedData[0].color}
                />
                <Text
                  style={[
                    styles.text,
                    { color: sortedData[0].color, fontSize: 24 },
                  ]}
                >
                  {sortedData[0].name}
                </Text>
              </View>

              <GenresPieChart
                data={sortedData}
                width={Platform.OS === 'web' ? 400 : 350}
                height={230}
              />
            </View>
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
    top: 1,
    width: '100%',
    height: 520,
    maxWidth: 500,
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    elevation: 50,

    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
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
  headerOne: {
    width: 300,
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTwo: {
    flexDirection: 'row',
    width: 300,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontFamily: 'Kanit-Medium',
  },
  historyElementBody: {
    alignItems: 'center',
  },
})

export default HistoryCard
