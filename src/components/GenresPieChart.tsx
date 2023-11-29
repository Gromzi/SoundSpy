import { Platform, useColorScheme } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'
import { colorPalette } from '../theme/colors'
import { IPieChartData } from '../auth/interfaces/prediction/IPieChartData'

type GenresPieChartProps = {
  data: IPieChartData[]
  width: number
  height: number
}

const GenresPieChart = ({ data, width, height }: GenresPieChartProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const sortedData = data.sort((a, b) => b.prediction - a.prediction)

  return (
    <PieChart
      data={sortedData}
      width={width}
      height={height}
      chartConfig={{
        backgroundColor: colors.contrast,
        backgroundGradientFrom: colors.contrast,
        backgroundGradientTo: colors.contrast,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor={'prediction'}
      backgroundColor={'transparent'}
      paddingLeft={'15'}
      absolute
    />
  )
}

export default GenresPieChart
