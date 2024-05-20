import {useEffect, useState} from "react";
import {deppoApi, get} from "../shared-components/deppoApi.tsx";
import {useMovimientosStore} from "../../Store/useMovimientoStore.ts";
import {FormMovimientos} from "./FormMovimientos.tsx";
import {TabPanel, TabView} from "primereact/tabview";
import {DataTable, DataTableSelectEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {DetalleMovimiento} from "../../Models/DetalleMovimiento.ts";
import {IMovimiento} from "../../Models/IMovimiento.ts";

export function Movimiento() {
  const {movimentos,setMovimentos,setDetalle,detalle} = useMovimientosStore();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() =>  {
    getMovimientos();
  }, []);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day : 'numeric',
      month : 'long',
      year : 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12:true
    });
  }
  function formatCurrency(value:any, currency = 'COP', locale = 'es-CO') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }
  const FechaTemplate = (movimeinto: IMovimiento) => {
    return <span>{formatDate(movimeinto.created_at)}</span>
  }
  const PVTemplate = (detMovimiento: DetalleMovimiento) => {
    return <span>{formatCurrency(detMovimiento.vrUnitario)}</span>
  }
  const TotalTemplate = (detMovimiento: DetalleMovimiento) => {
    return <span>{formatCurrency(detMovimiento.total)}</span>
  }
  const catidadTemplate = (detMovimiento:DetalleMovimiento) => {
    return <>
            <span>{detMovimiento.cantidad}</span>
            <span className='text-sm ml-1 font-bold'>{detMovimiento.unidad}</span>
        </>
  }
  const cantidadAntesTemplate = (detMovimiento:DetalleMovimiento) => {
    return <>
      <span>{detMovimiento.stockAntes}</span>
      <span className='text-sm ml-1 font-bold'>{detMovimiento.unidad}</span>
    </>
  }
  const cantidadDespuesTemplate = (detMovimiento:DetalleMovimiento) => {
    return <>
      <span>{detMovimiento.stockDespues}</span>
      <span className='text-sm ml-1 font-bold'>{detMovimiento.unidad}</span>
    </>
  }
  const getMovimientos = async () => {
    try {
      const response = await deppoApi.get('documentos/');
      setMovimentos(response.data);
    } catch (error) {
      //showMessage('Se produjo un error al obtener los movimientos. '+error,'error','Error')
      // Aquí puedes agregar una gestión de errores más completa.
    }
  };
  const getDetalle = async (event: DataTableSelectEvent) => {
    try{
      const response = await get('detdoc_by_doc/?documento_id='+event.data.id)
      if(response){
        setDetalle(response)
        setActiveIndex(1)
      }else {
        console.log('No hay ningun registro para este documento.')

      }
    }catch (error){
      const message = (error as Error).message;
      console.log(message)
    }
  }
  return(
    <>
      <Card>
        <TabView className='bg-transparent' activeIndex={activeIndex}
                 onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Movimientos">
            <DataTable value={movimentos} tableStyle={{ minWidth: '50rem' }}
                       selectionMode="single"
                       onRowSelect={getDetalle}>
              <Column field="numeroDocumento" header="N.documento"></Column>
              <Column field="nombre_proveedor" header="Proveedor"></Column>
              <Column field="tipoProceso" header="Proceso"></Column>
              <Column field="tipoDocumento" header="Tipo"></Column>
              <Column field="created_at" header="Fecha" body={FechaTemplate}></Column>
            </DataTable>
          </TabPanel>
          <TabPanel disabled={!detalle.length} header="Detalle">
            <div className='flex justify-content-around align-items-start border-round border-1 p-4'>
              <div className='flex justify-content-start flex-column align-items-start'>
                <span className='text-xl font-bold'>Entrada</span>
                <span>Tipo</span>
              </div>
              <div className='flex justify-content-start flex-column align-items-end'>
                <span className='text-xl font-bold'>Carlos Pinto</span>
                <span>Proveedor</span>
              </div>
              <div className='flex justify-content-start flex-column align-items-end'>
                <span className='text-xl font-bold'>23 de marzo de 2024 3:45pm</span>
                <span>Fecha</span>
              </div>
              <div className='flex justify-content-start flex-column align-items-end'>
                <span className='text-xl font-bold'>{detalle.length}</span>
                <span>Registros encontrados</span>
              </div>
            </div>
            <DataTable className='mt-4' value={detalle} tableStyle={{minWidth: '50rem'}}>
              <Column field="producto" header="Producto"></Column>
              <Column field="stockAntes" header="Antes" body={cantidadAntesTemplate}></Column>
              <Column field="cantidad" header="Cantidad" body={catidadTemplate}></Column>
              <Column field="stockDespues" header="Despues" body={cantidadDespuesTemplate}></Column>
              <Column field="vrUnitario" header="Vr.Unitario" body={PVTemplate}></Column>
              <Column field="total" header="Total" body={TotalTemplate}></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Nuevo">
            <FormMovimientos getMovimientos={getMovimientos}/>
          </TabPanel>
        </TabView>
      </Card>
    </>
  );
}