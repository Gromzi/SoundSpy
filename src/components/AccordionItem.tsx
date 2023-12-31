import { PropsWithChildren, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colorPalette } from '../theme/colors'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

type AccordionItemProps = PropsWithChildren<{
  date: string
  time: string
  name: string
  picture?: React.ReactNode
}>

const AccordionItem = ({
  children,
  date,
  time,
  picture,
  name,
}: AccordionItemProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  const body = (
    <View
      style={[styles.accordBody, { backgroundColor: colors.accordionBody }]}
    >
      {children}
    </View>
  )

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity
        style={[
          styles.accordHeader,
          { backgroundColor: colors.primary },
          expanded ? styles.removeBorderRadius : null,
        ]}
        onPress={toggleExpand}
      >
        <View style={styles.leftContainer}>
          <View
            style={[
              styles.pictureContainer,
              { backgroundColor: colors.contrast },
            ]}
          >
            {picture ? picture : null}
          </View>
          <View>
            <Text style={[styles.genreText, { color: colors.cardText }]}>
              {name}
            </Text>
            <View style={styles.datetimeContainer}>
              <Text style={[styles.accordDate, { color: colors.cardText }]}>
                {date}
              </Text>
              <Text style={[styles.accordTime, { color: colors.cardText }]}>
                {time}
              </Text>
            </View>
          </View>
        </View>

        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={48}
          color={colors.cardText}
        />
      </TouchableOpacity>
      {expanded ? body : null}
    </View>
  )
}

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 8,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#666',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  genreText: {
    fontSize: 18,
    fontFamily: 'Kanit-Medium',
  },
  accordDate: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },
  accordTime: {
    fontSize: 14,
    fontFamily: 'Kanit-Regular',
  },
  accordBody: {
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  pictureContainer: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  removeBorderRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  datetimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})

export default AccordionItem
