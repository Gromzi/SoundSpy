import { Platform } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Colors } from '../theme/colors'

const generatePieChart = (data: Array<any>, colors: Colors) => {
  const sortedData = data.sort((a, b) => b.prediction - a.prediction)

  return (
    <PieChart
      data={sortedData}
      width={Platform.OS === 'web' ? 325 : 325}
      height={230}
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

export default generatePieChart
