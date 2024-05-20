import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useMovimientosStore} from "../../Store/useMovimientoStore.ts";
import {Button} from "primereact/button";
import {useModalStore} from "../../Store/useModalStore.ts";
import {Dialog} from "primereact/dialog";
import {get} from "../shared-components/deppoApi.tsx";
import {useEffect} from "react";
import {FormProveedor} from "./FormProveedor.tsx";

export function ProveerdorInicio() {
  const{proveedores,setProveedor } = useMovimientosStore()
  const{setModalProveedor,modalProveedor}=useModalStore()
  const getProveedores = async () => {
    try{
      const response = await get('proveedor/');
      setProveedor(response)
    }catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  }
  useEffect(() => {
    getProveedores()
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Proveedores</span>
      <Button icon="fa-solid fa-plus" rounded raised onClick={()=>setModalProveedor(true)} />
    </div>
  );
  return (
    <>
      <Dialog header="Proveedor" style={{ width: '30vw' }}
              visible={modalProveedor} onHide={() => setModalProveedor(false)}>
        <FormProveedor getProveedores={getProveedores}/>
      </Dialog>
      <DataTable value={proveedores} size='small' header={header}>
        <Column field="nit" header="nit"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="direccion" header="Direccion"></Column>
        <Column field="telefono" header="Telefono"></Column>
      </DataTable>
    </>
  );
}