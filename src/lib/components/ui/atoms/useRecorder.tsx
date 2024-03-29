/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

const useRecorder = () => {
  const [audioURL, setAudioURL]:any = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder]:any = useState(null)

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error)
      }
      return
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start()
    } else {
      recorder.stop()
    }

    // Obtain the audio when ready.
    const handleData = (e:any) => {
      const reader = new FileReader()
      reader.readAsDataURL(e.data)
      reader.onloadend = function () {
        const base64data = reader.result
        setAudioURL(base64data)
      }
    }
    recorder.addEventListener('dataavailable', handleData)
    return () => recorder.removeEventListener('dataavailable', handleData)
  }, [recorder, isRecording])

  const startRecording = () => {
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  return [audioURL, isRecording, startRecording, stopRecording]
}

async function requestRecorder () {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  return new MediaRecorder(stream)
}
export default useRecorder
