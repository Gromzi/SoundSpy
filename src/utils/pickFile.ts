import * as DocumentPicker from 'expo-document-picker'

export const pickFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: false,
    })

    if (!result.canceled) {
      if (result.assets.length === 1) {
        // Only one file was selected
        console.log(
          'File URI:',
          result.assets[0].uri,
          'File name:',
          result.assets[0].name
        )

        // Pass the URI to your sendRecording function or update your state accordingly
        // For example, you might call your sendRecording function with the result.uri
        // sendRecording({ audioUri: result.assets[0].uri });
      } else {
        // More than one file was selected, handle this case accordingly
        console.log('Please select only one file')
      }
    } else {
      console.log('Document picking canceled')
    }
  } catch (error) {
    console.error('Error picking document:', error)
  }
}
