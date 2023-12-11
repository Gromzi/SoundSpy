import { StyleSheet, useColorScheme, Text, Platform, View } from 'react-native'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AccordionItem from './AccordionItem'
import React, { useEffect, useState } from 'react'
import { GenreIconsEnum } from '../utils/genreIconsEnum'
import GenresPieChart from './GenresPieChart'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { usePredictStore } from '../auth/store/predictStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IPredictedGenres } from '../auth/interfaces/prediction/IPredictedGenres'
import Loader from './Loader'
import { IPredictionResponse } from '../auth/interfaces/prediction/IPredictionResponse'
import { IPieChartData } from '../auth/interfaces/prediction/IPieChartData'
import moment from 'moment'

type ServerResponse = {
  id: number
  user_id?: number
  result: string
  created_at: string
  updated_at: string
}

const HistoryCard = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [isLoading, setIsLoading] = useState(false)
  const [historyData, setHistoryData] = useState<IPredictionResponse[] | null>(
    null
  )

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true)
      console.log('HistoryCard rendered')
      AsyncStorage.getItem('history')
        .then((history) => {
          if (history) {
            const parsedServerResponse: Array<ServerResponse> =
              JSON.parse(history)

            const historyData: IPredictionResponse[] = parsedServerResponse.map(
              (element) => {
                return {
                  id: element.id,
                  user_id: element.user_id,
                  result: JSON.parse(element.result),
                  created_at: element.created_at,
                  updated_at: element.updated_at,
                }
              }
            )

            historyData.sort((a, b) => b.id - a.id)
            setHistoryData(historyData)
          } else {
            setHistoryData(null)
          }
        })
        .catch((error) => {
          console.log(
            'Error fetching data from AsyncStorage in HistoryCard: ',
            error
          )
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, [
      usePredictStore.getState().currentPrediction,
      usePredictStore.getState().refreshAfterDelete,
    ])
  )

  const renderAccordionItems = () => {
    console.log('History data in renderAccordionItems: ', historyData)
    if (!historyData || historyData.length === 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
          <Text
            style={[
              styles.text,
              { color: colors.cardContrast, fontSize: 32, textAlign: 'center' },
            ]}
          >
            {'No history yet.'}
          </Text>
          <Text
            style={[
              styles.text,
              { color: colors.cardContrast, fontSize: 32, textAlign: 'center' },
            ]}
          >
            {'Start predicting!'}
          </Text>
        </View>
      )
    }

    return historyData.map((predictionResponse) => {
      const predictedGenres: IPredictedGenres = predictionResponse.result
      const chartData: IPieChartData[] = Object.keys(predictedGenres).map(
        (genre) => {
          const prediction =
            predictedGenres[genre as keyof typeof predictedGenres]!

          return {
            name: genre,
            prediction: prediction,
            color: colors[genre.toLocaleLowerCase() as keyof typeof colors],
            legendFontColor:
              colors[genre.toLocaleLowerCase() as keyof typeof colors],
            legendFontSize: Platform.OS === 'web' ? 18 : 14,
          }
        }
      )

      const topGenreName = chartData.sort(
        (a, b) => b.prediction - a.prediction
      )[0].name
      const topGenreColor = chartData[0].color

      const date = moment
        .utc(predictionResponse.created_at)
        .local()
        .format('DD-MM-YYYY')
      const time = moment
        .utc(predictionResponse.created_at)
        .local()
        .format('HH:mm:ss')

      return (
        <AccordionItem
          key={predictionResponse.id.toString()}
          name={topGenreName}
          date={date}
          time={time}
          picture={
            <MaterialCommunityIcons
              name={GenreIconsEnum[topGenreName as keyof typeof GenreIconsEnum]}
              size={50}
              color={topGenreColor}
            />
          }
        >
          <View style={styles.historyElementBody}>
            <View style={styles.headerOne}>
              <Text style={[styles.text, { color: colors.text, fontSize: 26 }]}>
                {'Most likely genre: '}
              </Text>
            </View>
            <View style={styles.headerTwo}>
              <MaterialCommunityIcons
                name={
                  GenreIconsEnum[topGenreName as keyof typeof GenreIconsEnum]
                }
                size={44}
                color={topGenreColor}
              />
              <Text
                style={[styles.text, { color: topGenreColor, fontSize: 24 }]}
              >
                {topGenreName}
              </Text>
            </View>

            <GenresPieChart
              data={chartData}
              width={Platform.OS === 'web' ? 400 : 330}
              height={230}
            />
          </View>
        </AccordionItem>
      )
    })
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
          {!isLoading ? (
            renderAccordionItems()
          ) : (
            <View style={{ flex: 1, width: '100%' }}>
              <Loader color={colors.secondary} size={'large'} centered={true} />
            </View>
          )}
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
