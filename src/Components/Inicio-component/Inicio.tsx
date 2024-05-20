import {Card} from "primereact/card";
import {UnidadMedida} from "../unidad-component/UnidadMedida.tsx";
import {ProveerdorInicio} from "../proveedor-component/ProveerdorInicio.tsx";

export function Inicio() {
  return (
    <>
      <div className='flex gap-4 w-full'>
        <Card className='w-6'>
          <UnidadMedida/>
        </Card>
        <Card className='w-full'>
          <ProveerdorInicio/>
        </Card>
      </div>
    </>
  );
}