import {Controller, useForm} from "react-hook-form";
import {get, post} from "../shared-components/deppoApi.tsx";
import {useMovimientosStore} from "../../Store/useMovimientoStore.ts";
import AudioTranscript from "./AudioTranscript.tsx";
import {Dropdown} from "primereact/dropdown";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import {useEffect, useState} from "react";
import {IProveedor} from "../../Models/IProveedor.ts";


export function FormMovimientos({ getMovimientos }:any) {
  const {register,
    control,
    reset,
    formState:{errors},
    handleSubmit} = useForm()
  const {detalleMovimiento,setdetalleMovimiento} = useMovimientosStore();
  const{proveedores,setProveedor } = useMovimientosStore()
  const tipoDocumento = [
    { name: 'Entrada', value: 'Entrada' },
    { name: 'Salida', value: 'Salida' },
  ];
  const [selectedProveedor, setSelectedProveedor] = useState<IProveedor>();
  const [filteredCountries, setFilteredCountries] = useState<IProveedor[]>([]);

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
  const search = (event: AutoCompleteCompleteEvent) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredProveedores;

      if (!event.query.trim().length) {
        _filteredProveedores = [...proveedores];
      }
      else {
        _filteredProveedores = proveedores.filter((proveedor) => {
          return proveedor.nombre.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCountries(_filteredProveedores);
    }, 250);
  }

  const onSubmit = async (data:any) => {
    let obj = {
      detalleDocumento:detalleMovimiento,
      proveedor:selectedProveedor?.id,
      empresa:2,
      tipoDocumento:data.tipoDocumento,
      tipoProceso:'Automatico',
      numeroDocumento:data.numeroDocumento
    }
    console.log(obj)
    try {
      await post('save-document/', obj);
      getMovimientos();
      reset();
      setdetalleMovimiento({})
      console.log('Los registros fueron creados existosamente!')
    } catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  };

  return (
    <>
      <div className='flex flex-row gap-4'>
        <AudioTranscript/>
        <form className="flex flex-column gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row gap-4'>
            <div className="flex flex-column w-full gap-2">
              <label htmlFor="unidad">Tipo registro</label>
              <Controller
                name="tipoDocumento"
                control={control}
                render={({field, fieldState}) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionValue='value'
                    optionLabel="name"
                    placeholder="Seleccione tipo"
                    options={tipoDocumento}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className={classNames({'p-invalid': fieldState.error})}
                  />
                )}
              />
              {errors.unidadMedida?.type === 'required' &&
                  <small className='alerta-formulario'>Le Unidad medida es requerido</small>}
            </div>
            <div className="flex flex-column w-full gap-2">
              <label htmlFor="numeroDocumento">Numero Documento</label>
              <InputText id="numeroDocumento" {...register('numeroDocumento', {required: true})}/>
              {errors.numeroDocumento?.type === 'required' &&
                  <small className='alerta-formulario'>El Numero Documento es requerido</small>}
            </div>
            <div className="flex flex-column w-full gap-2">
              <Controller
                name="proveedor"
                control={control}
                render={({ field}) => (
                  <>
                    <label htmlFor={field.name}>Proveedor</label>
                    <AutoComplete field="nombre" value={selectedProveedor} suggestions={filteredCountries} completeMethod={search}
                                  onChange={(e: AutoCompleteChangeEvent) => setSelectedProveedor(e.value)} inputRef={field.ref}/>
                  </>
                )}
              />
            </div>
          </div>
          <Card>
            <DataTable value={detalleMovimiento} tableStyle={{minWidth: '50rem'}}>
              <Column field="encontrado" header="Existe?"></Column>
              <Column field="producto" header="Producto"></Column>
              <Column field="unidad_medida" header="Und"></Column>
              <Column field="cantidad" header="Cantidad"></Column>
              <Column field="cantidad_en_stock" header="Stock"></Column>
            </DataTable>
          </Card>
          <div className='flex justify-content-center p-4'>
            <Button type='submit' color="primary" label='Guardar'/>
          </div>
        </form>
      </div>
    </>
  );
}