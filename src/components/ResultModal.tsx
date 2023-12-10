import {
  Text,
  Modal,
  StyleSheet,
  useColorScheme,
  Platform,
  View,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import { colorPalette } from '../theme/colors';
import * as Animatable from 'react-native-animatable';
import GenresPieChart from './GenresPieChart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GenreIconsEnum } from '../utils/genreIconsEnum';
import { IPredictedGenres } from '../auth/interfaces/prediction/IPredictedGenres';
import { IPieChartData } from '../auth/interfaces/prediction/IPieChartData';
import { usePredictStore } from '../auth/store/predictStore';
import Loader from './Loader';

type ResultModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultModal = ({ visible, setVisible }: ResultModalProps) => {
  const colorScheme = useColorScheme();
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light'];

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [predictionData, setPredictionData] =
    React.useState<IPredictedGenres | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setPredictionData(usePredictStore.getState().currentPrediction);
    console.log('Result Modal rendered. Prediction data:', predictionData);
    setIsLoading(false);
  }, [usePredictStore.getState().currentPrediction]);

  if (!predictionData) {
    return null;
  }

  const chartData: IPieChartData[] = Object.keys(predictionData).map(
    (genre) => {
      console.log(predictionData[genre as keyof typeof predictionData]);
      console.log(
        'Type: ',
        typeof predictionData[genre as keyof typeof predictionData]
      );

      const prediction =
        predictionData[genre as keyof typeof predictionData]!.toFixed(3);

      return {
        name: genre,
        prediction: parseFloat(prediction),
        color: colors[genre.toLocaleLowerCase() as keyof typeof colors],
        legendFontColor:
          colors[genre.toLocaleLowerCase() as keyof typeof colors],
        legendFontSize: Platform.OS === 'web' ? 18 : 14,
      };
    }
  );

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
        {!isLoading ? (
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
                    chartData[0].name as keyof typeof GenreIconsEnum
                  ]
                }
                size={84}
                color={chartData[0].color}
              />
              <Text
                style={[
                  styles.text,
                  { color: chartData[0].color, fontSize: 24 },
                ]}
              >
                {chartData[0].name}
              </Text>
            </View>
            <GenresPieChart
              data={chartData}
              width={Platform.OS === 'web' ? 400 : 350}
              height={230}
            />

            <Pressable
              android_ripple={{ color: colors.cardContrast }}
              style={{
                backgroundColor: colors.secondary,
                width: '100%',
                maxWidth: 400,
                height: 40,
                borderRadius: 10,
                marginTop: Platform.OS === 'web' ? 10 : 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setVisible(false)}
            >
              <Text
                style={{
                  color: colors.contrast,
                  fontFamily: 'Kanit-Medium',
                  fontSize: Platform.OS === 'web' ? 20 : 16,
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        ) : (
          <Loader color={colors.secondary} size={'large'} centered={true} />
        )}
      </Animatable.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  modalContainer: {
    position: 'absolute',
    width: '95%',
    maxWidth: 500,
    marginTop: 120,
    // maxHeight: '70%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 20,
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
});

export default ResultModal;
