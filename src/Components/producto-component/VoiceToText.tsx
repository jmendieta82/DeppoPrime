import {Button} from "primereact/button";
import {useState} from "react";
import {useVoiceToTextStore} from "../../Store/useVoiceToTextStore.ts";

interface IWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}
declare let window: IWindow;

export function VoiceToText({onSubmit}:any) {
  const {transcription,setTranscription} = useVoiceToTextStore();
  const [grabando, setGrabando] = useState<boolean>(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const [loading] = useState(false)

  recognition.onresult = (e: any) => {
    const transcript = Array.from(e.results)
      .map((result: any) => result[0] as SpeechRecognitionResult)
      .map((result: SpeechRecognitionResult) => result[0].transcript || '')
      .join('');
    setTranscription(transcript);
  };
  const startRecording = () => {
    recognition.lang = 'es-MX';
    recognition.start();
    setGrabando(true)
  }
  const stopRecording = () => {
    recognition.stop();
    setGrabando(false)
  }

  return (
    <>
      <div className='flex justify-content-end flex-column align-items-center'>
        <p>{transcription}</p>
        <div>
          <Button onClick={grabando ? stopRecording : startRecording} className='mr-2 p-button-danger p-button-rounded'
                  icon={grabando ? 'fa-solid fa-microphone-slash' : 'fa-solid fa-microphone'}
                  loading={loading}/>

          <Button disabled={!transcription} onClick={onSubmit} icon='fa-solid fa-paper-plane'
                  loading={loading} className='mr-2 p-button-info p-button-rounded'/>

          <Button disabled={!transcription} color='primary' loading={loading} icon='fa-solid fa-trash'
                  onClick={() => {setTranscription('')}} className='p-button-secondary p-button-rounded'/>
        </div>
      </div>
    </>
  );
}