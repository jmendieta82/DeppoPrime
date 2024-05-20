import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";
import {useProductosStore} from "../../Store/useProductosStore.tsx";
import {get, post} from "../shared-components/deppoApi.tsx";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import {useModalStore} from "../../Store/useModalStore.ts";

export function FormProducto({ getProductos }:any) {

  const {register,control,formState:{errors},
    handleSubmit} = useForm()
  const {setUnidades,unidades} = useProductosStore();
  const {setModalProducto} = useModalStore();
  const getUnidadesMedida = async () => {
    try{
      const response = await get('unidadesmedida/');
      setUnidades(response)
    }catch (error) {
      const message = (error as Error).message;
     console.log(message)
    }
  }
  useEffect(() => {
    getUnidadesMedida()
  }, []);
  const onSubmit = async (data:any) => {
    data['empresa'] = 2
    console.log(data)
    try {
      await post('productos/', data);
      getProductos();
      setModalProducto(false)
    } catch (error) {
      const message = (error as Error).message;
     console.log(message)
    }
  };
  return (
    <>
      <form className="flex flex-column gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column gap-2">
          <label htmlFor="codigo">Código</label>
          <InputText id="codigo" {...register('codigo', {required: true})}/>
          {errors.codigo?.type === 'required' &&
              <small className='alerta-formulario'>El código es requerido</small>}
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" {...register('nombre', {required: true})}/>
          {errors.codigo?.type === 'required' &&
              <small className='alerta-formulario'>El nombre es requerido</small>}
        </div>
        <div className='flex flex-row gap-4'>
          <div className="flex flex-column w-full gap-2">
            <label htmlFor="precioCompra">Precio compra</label>
            <InputText id="precioCompra" {...register('precioCompra', {required: true})}/>
            {errors.codigo?.type === 'required' &&
                <small className='alerta-formulario'>El Precio compra es requerido</small>}
          </div>
          <div className="flex flex-column w-full gap-2">
            <label htmlFor="precioVenta">Precio venta</label>
            <InputText id="precioVenta" {...register('precioVenta', {required: true})}/>
            {errors.codigo?.type === 'required' &&
                <small className='alerta-formulario'>El Precio venta es requerido</small>}
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className="flex flex-column w-full gap-2">
            <label htmlFor="unidad">Unidad de medida</label>
            <Controller
              name="unidad"
              control={control}
              rules={{required: 'Unidad es requerida'}}
              render={({field, fieldState}) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionValue='id'
                  optionLabel="nombre"
                  placeholder="Seleccione unidad"
                  options={unidades}
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
            <label htmlFor="stock">En existencia</label>
            <InputText id="stock" {...register('stock', {required: true})}/>
            {errors.codigo?.type === 'required' &&
                <small className='alerta-formulario'>El stock es requerido</small>}
          </div>
        </div>
        <div className='flex justify-content-center p-4'>
          <Button className='border-1 border-b-white' type='submit' size='small' color="primary" label='Guardar'/>
        </div>
      </form>
    </>
  );
}