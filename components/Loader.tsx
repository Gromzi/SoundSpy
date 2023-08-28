import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface LoaderProps {
  size: number | 'small' | 'large' | undefined
  color: string
  centered?: boolean
}

const Loader = (props: LoaderProps) => {
  return (
    <View style={props.centered && styles.center}>
      <ActivityIndicator size={props.size} color={props.color} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
