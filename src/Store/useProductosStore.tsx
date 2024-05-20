import create from 'zustand';
import {IProducto} from "../Models/IProducto.ts";
import {IUnidad} from "../Models/IUnidad.ts";

type ProductoStore = {
  unidades: IUnidad[],
  fields: object,
  productos: IProducto[];
  setFields: (fieldsNew: {}) => void
  setProductos: (productosActualizados: any) => void;
  setUnidades: (unidadesNew: IUnidad[]) => void;
};

export const useProductosStore = create<ProductoStore>((set) => (
  {
    productos:[],
    setProductos: (productosActualizados: IProducto[]) => set({ productos: productosActualizados }),
    fields: {},
    setFields: (fieldsNew:{}) => set({fields: fieldsNew}),
    unidades: [],
    setUnidades: (unidadesNew:IUnidad[]) => set({unidades: unidadesNew}),
  }
));