import {useForm} from "react-hook-form";
import {post} from "../shared-components/deppoApi.tsx";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useModalStore} from "../../Store/useModalStore.ts";

export function FormUnidad({ getUnidades }:any) {

  const {register,reset,formState:{errors},
    handleSubmit} = useForm()
  const {setModalUnidad} = useModalStore();
  const onSubmit = async (data:any) => {
    try {
      await post('unidadesmedida/', data);
      getUnidades();
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
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" className="p-inputtext-sm" type="text" {...register('nombre', {required: true})}/>
          {errors.codigo?.type === 'required' &&
              <small className='alerta-formulario'>El nombre es requerido</small>}
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="abreviatura">Nombre corto</label>
          <InputText id="abreviatura" className="p-inputtext-sm" type="text" {...register('abreviatura', {required: true})}/>
          {errors.codigo?.type === 'required' &&
              <small className='alerta-formulario'>El nombre corto es requerido</small>}
        </div>
        <div className='flex justify-content-center align-items-center'>
          <Button type='submit' color="primary" label='Guardar'/>
        </div>
      </form>
    </>
  );
}