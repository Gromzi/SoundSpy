import { Text, Modal, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'

type ResultModalProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ResultModal = ({ visible, setVisible }: ResultModalProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType={'fade'}
      transparent
    >
      <Animatable.View
        animation={'fadeInDownBig'}
        style={[styles.modalContainer, { backgroundColor: colors.contrast }]}
      >
        <Text>Result Modal</Text>
      </Animatable.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  modalContainer: {
    height: 400,
    width: '80%',
    maxWidth: 500,
    marginTop: '30%',
    maxHeight: '70%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
})

export default ResultModal
