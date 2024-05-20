import create from 'zustand';
import {IMovimiento} from "../Models/IMovimiento.ts";
import {DetalleMovimiento} from "../Models/DetalleMovimiento.ts";
import {IProveedor} from "../Models/IProveedor.ts";

type MovimientoStore = {
  proveedores: IProveedor[];
  movimentos: IMovimiento[];
  detalleMovimiento: DetalleMovimiento[];
  detalle: DetalleMovimiento[];
  tipoDocumento : String;
  verRecording:boolean;
  setProveedor: (ProveedorNew: any) => void;
  setRecording: (RecordingActualizado: any) => void;
  setMovimentos: (movimientosActualizados: any) => void;
  setdetalleMovimiento: (detalleMovimientoActualizado: any) => void;
  setDetalle: (detalleNew: any) => void;
  setTipoDocumento: (tipoDocumentoActualizado: any) => void;
};

export const useMovimientosStore = create<MovimientoStore>((set) => (
  {
    proveedores:[],
    movimentos:[],
    tipoDocumento:'',
    verRecording:false,
    detalleMovimiento:[],
    detalle:[],
    setProveedor: (ProveedorNew: IProveedor[]) => set({ proveedores: ProveedorNew }),
    setMovimentos: (movimientosActualizados: IMovimiento[]) => set({ movimentos: movimientosActualizados }),
    setRecording: (RecordingActualizado: boolean) => set({ verRecording: RecordingActualizado }),
    setdetalleMovimiento: (detalleMovimientoActualizado: []) => set({ detalleMovimiento: detalleMovimientoActualizado }),
    setDetalle: (detalleNew: []) => set({ detalle: detalleNew }),
    setTipoDocumento: (tipoDocumentoActualizado:'') => set({ tipoDocumento: tipoDocumentoActualizado }),
  }
));

