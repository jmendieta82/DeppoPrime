import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useForm} from "react-hook-form";
import {useModalStore} from "../../Store/useModalStore.ts";
import {post} from "../shared-components/deppoApi.tsx";

export function FormProveedor({getProveedores}:any) {
  const {register,reset,formState:{errors},
    handleSubmit} = useForm()
  const {setModalUnidad} = useModalStore();
  const onSubmit = async (data:any) => {
    try {
      data['empresa'] = 2
      await post('proveedor/', data);
      getProveedores();
      setModalUnidad(false)
      reset();
    } catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  };
  return (
    <>
      <form className="flex flex-column gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column gap-2">
          <label htmlFor="nombre">Nombre y apellido</label>
          <InputText id="nombre" className="p-inputtext-sm"
                     type="text" {...register('nombre', {required: true})}/>
          {errors.nombre?.type === 'required' &&
              <small className='alerta-formulario'>El nombre corto es requerido</small>}
        </div>
        <div className='flex flex-row gap-2'>
          <div className="flex flex-column w-6 gap-2">
            <label htmlFor="nit">Nit/Cédula</label>
            <InputText id="nit" className="p-inputtext-sm" type="text" {...register('nit', {required: true})}/>
            {errors.nit?.type === 'required' &&
                <small className='alerta-formulario'>El nit es requerido</small>}
          </div>
          <div className="flex flex-column gap-2 w-full">
            <label htmlFor="direccion">Direccion</label>
            <InputText id="direccion" className="p-inputtext-sm"
                       type="text" {...register('direccion', {required: true})}/>
            {errors.direccion?.type === 'required' &&
                <small className='alerta-formulario'>La direccion es requerido</small>}
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <div className="flex flex-column gap-2 w-6">
            <label htmlFor="telefono">Telefono</label>
            <InputText id="telefono" className="p-inputtext-sm"
                       type="text" {...register('telefono', {required: true})}/>
            {errors.telefono?.type === 'required' &&
                <small className='alerta-formulario'>El telefono es requerido</small>}
          </div>
          <div className="flex flex-column gap-2 w-full">
            <label htmlFor="correo">Correo</label>
            <InputText id="correo" className="p-inputtext-sm" type="text" {...register('correo', {required: true})}/>
            {errors.correo?.type === 'required' &&
                <small className='alerta-formulario'>El correo es requerido</small>}
          </div>
        </div>
        <div className='flex justify-content-center align-items-center'>
          <Button type='submit' color="primary" label='Guardar'/>
        </div>
      </form>
    </>
  );
}