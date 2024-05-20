import create from 'zustand';

type ModalStore = {
  modalProveedor: boolean;
  modalUnidad: boolean;
  modalProducto: boolean;
  setModalUnidad: (modalNew: boolean) => void;
  setModalProducto: (modalProductoNew: boolean) => void;
  setModalProveedor: (modalProveedorNew: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => (
  {
    modalProveedor: false,
    modalUnidad: false,
    modalProducto: false,
    setModalUnidad: (modalNew: boolean) => set({ modalUnidad: modalNew }),
    setModalProducto: (modalProductoNew: boolean) => set({ modalProducto: modalProductoNew }),
    setModalProveedor: (modalProveedorNew: boolean) => set({ modalProveedor: modalProveedorNew }),
  }
));

