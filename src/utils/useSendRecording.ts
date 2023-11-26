type Props = {
  audioUri: string
  setIsWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>
  fileName?: string
}

const useSendRecording = ({
  audioUri,
  setIsWaitingForResponse,
  fileName,
}: Props) => {
  const sendRecording = async () => {
    try {
      let filename: string

      if (!fileName) {
        const extension = audioUri.split('.').pop()
        const timestamp = Date.now()
        filename = `recording_${timestamp}.${extension}`
      } else {
        filename = fileName
      }

      const fileContent = await fetch(audioUri).then((res) => res.blob())

      const formData = new FormData()
      formData.append('audio', fileContent, filename)

      setIsWaitingForResponse(true)
      const serverResponse = await fetch('YOUR_ENDPOINT_URL', {
        method: 'POST',
        body: formData,
      })

      if (serverResponse.ok) {
        setIsWaitingForResponse(false)
        console.log('Recording sent successfully')
        // Handle the server response
      } else {
        console.error('Failed to send recording to the server')
      }
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  return { sendRecording }
}
