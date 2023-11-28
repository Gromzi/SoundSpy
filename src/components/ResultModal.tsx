import {
  Text,
  Modal,
  StyleSheet,
  useColorScheme,
  Platform,
  View,
} from 'react-native'
import React from 'react'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'
import GenresPieChart from './GenresPieChart'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GenreIconsEnum } from '../utils/genreIconsEnum'
import { Button } from 'react-native-paper'

type ResultModalProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ResultModal = ({ visible, setVisible }: ResultModalProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const serverData = {
    classical: 99.985,
    jazz: 0.0056,
    blues: 0.0027,
    rock: 0.0021,
    pop: 0.0013,
  }

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
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType={'fade'}
      transparent
    >
      <Animatable.View
        animation={'fadeInDownBig'}
        style={[
          styles.modalContainer,
          {
            backgroundColor: colors.contrast,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerOne}>
            <Text
              style={[
                styles.text,
                { color: colors.cardContrast, fontSize: 28 },
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
              size={84}
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

          <Button
            icon="close"
            mode="outlined"
            onPress={() => setVisible(false)}
            buttonColor={colors.secondary}
            textColor={colors.contrast}
            style={{
              width: '100%',
              maxWidth: 400,
              borderRadius: 4,
              marginTop: Platform.OS === 'web' ? 10 : 40,
            }}
          >
            Close modal
          </Button>
        </View>
      </Animatable.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  modalContainer: {
    position: 'absolute',
    margin: 'auto',
    height: 700,
    width: '98%',
    maxWidth: 500,
    marginTop: 120,
    maxHeight: '70%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
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
})

export default ResultModal
