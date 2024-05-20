import {useEffect} from "react";
import {useProductosStore} from "../../Store/useProductosStore.tsx";
import {get} from "../shared-components/deppoApi.tsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {useModalStore} from "../../Store/useModalStore.ts";
import {FormUnidad} from "./FormUnidad.tsx";

export function UnidadMedida() {
  const {unidades,setUnidades} = useProductosStore();
  const {modalUnidad,setModalUnidad} = useModalStore();
  const getUnidades = async () => {
    try{
      const response = await get('unidadesmedida/');
      setUnidades(response)
    }catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  }
  useEffect(() => {
    getUnidades()
  }, []);
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Unidades</span>
      <Button icon="fa-solid fa-plus" rounded raised onClick={()=>setModalUnidad(true)} />
    </div>
  );

  return (
    <>
      <Dialog header="Unidades" visible={modalUnidad} onHide={() => setModalUnidad(false)}>
        <FormUnidad getUnidades={getUnidades}/>
      </Dialog>
      <DataTable value={unidades} size='small' header={header}>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="abreviatura" header="Nombre corto"></Column>
      </DataTable>
    </>
  );
}