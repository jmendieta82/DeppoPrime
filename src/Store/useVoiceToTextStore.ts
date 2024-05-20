import create from 'zustand';

type ModalStore = {
  modalVoiceToText: boolean;
  transcription: string;
  setmodalVoiceToText: (modalVoiceToTextNew: boolean) => void;
  setTranscription: (transcriptionNew: string) => void;
};

export const useVoiceToTextStore = create<ModalStore>((set) => (
  {
    modalVoiceToText: false,
    transcription: '',
    setmodalVoiceToText: (modalVoiceToTextNew: boolean) => set({ modalVoiceToText: modalVoiceToTextNew }),
    setTranscription: (transcriptionNew: string) => set({ transcription: transcriptionNew }),
  }
));
