import {useState} from 'react';
import {deppoApi} from "../shared-components/deppoApi.tsx";
import {useMovimientosStore} from "../../Store/useMovimientoStore.ts";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

interface IWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}
declare let window: IWindow;
const TranscribeAudio = () => {
  const {setRecording,setdetalleMovimiento} = useMovimientosStore();
  const [grabando, setGrabando] = useState<boolean>(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const [transcript, setTranscript] = useState('');
  const [loading,setLoading] = useState(false)
  recognition.onresult = (e: any) => {
    const transcript = Array.from(e.results)
      .map((result: any) => result[0] as SpeechRecognitionResult)
      .map((result: SpeechRecognitionResult) => result[0].transcript || '')
      .join('');

    setTranscript(transcript);
  };
  const startRecording = () => {
    recognition.start();
    setGrabando(true)
  }
  const stopRecording = () => {
    recognition.stop();
    setGrabando(false)
  }
  const enviarTexto = async () => {
    setLoading(true)
    try {
      const response = await deppoApi.post('extract-json/',{'text':transcript});
      setdetalleMovimiento(response.data.data)
      setRecording(false)
      setLoading(false)
    } catch (error) {

      setLoading(false)
      //showMessage('Se produjo un error al procesar la solicitud. '+error,'error','Error')
      // Aquí puedes agregar una gestión de errores más completa.
    }
  };
  return (
    <>
      <Card className='flex justify-content-end flex-column align-items-center w-3'>
        <p>{transcript}</p>
        <div>
          <Button onClick={grabando ? stopRecording : startRecording} className='mr-2 p-button-danger p-button-rounded'
                  icon={grabando ? 'fa-solid fa-microphone-slash' : 'fa-solid fa-microphone'}
                   loading={loading}/>

          <Button disabled={!transcript} onClick={enviarTexto} icon='fa-solid fa-paper-plane'
                  loading={loading} className='mr-2 p-button-info p-button-rounded'/>

          <Button disabled={!transcript} color='primary' loading={loading} icon='fa-solid fa-trash'
                  onClick={() => {setTranscript('')}} className='p-button-secondary p-button-rounded'/>
        </div>
      </Card>
    </>
  );
};
export default TranscribeAudio;