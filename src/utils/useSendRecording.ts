type Props = {
  audioUri: string
}

const useSendRecording = ({ audioUri }: Props) => {
  const sendRecording = async () => {
    try {
      // Fetch the audio content
      const response = await fetch(audioUri)
      const blob = await response.blob()

      // Generate a unique filename (e.g., timestamp + original filename)
      const timestamp = Date.now()
      const filename = `recording_${timestamp}.wav` //do poprawy rozszerzenie

      // Create FormData and append the Blob
      const formData = new FormData()
      formData.append('audio', blob, filename)

      // Make a POST request to the server
      const serverResponse = await fetch('YOUR_ENDPOINT_URL', {
        method: 'POST',
        body: formData,
      })

      if (serverResponse.ok) {
        console.log('Recording sent successfully')
        // Handle the server response if needed
      } else {
        console.error('Failed to send recording to the server')
      }
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  return { sendRecording }
}
