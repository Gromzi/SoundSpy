import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface LoaderProps {
  size: number | 'small' | 'large' | undefined
  color: string
  centered?: boolean
}

const Loader = (props: LoaderProps) => {
  return (
    <View style={[props.centered && styles.center, styles.container]}>
      <ActivityIndicator size={props.size} color={props.color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    opacity: 0.3,
    backgroundColor: 'gray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
