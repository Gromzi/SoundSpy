export const getBase64Web = async (
  uri: string
): Promise<string | ArrayBuffer | null> => {
  const blob = await fetch(uri).then((res) => res.blob())

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      console.log('getBase64Web result: ', reader.result)
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      console.error('getBase64Web error: ', error)
      reject(error)
    }
  })
}
