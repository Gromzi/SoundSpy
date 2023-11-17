import { View, Text, Modal, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { colorPalette } from '../theme/colors'

type LoginModalProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ visible, setVisible }: LoginModalProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      transparent
    >
      <View
        style={[styles.modalContainer, { backgroundColor: colors.contrast }]}
      >
        <Text>LoginModal</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  modalContainer: {
    height: 520,
    marginTop: '30%',
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // alignSelf: 'center',
    // marginTop: 'auto',
    // width: '100%',
    // maxWidth: 500,
    // height: 670,
    // padding: 20,
    // borderRadius: 20,
    // alignItems: 'center',
  },
})

export default LoginModal
