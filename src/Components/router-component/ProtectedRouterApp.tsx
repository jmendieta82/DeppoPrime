import {Route, Routes} from "react-router-dom";
import {RouteView} from "./RouteView.tsx";
import {Inicio} from "../Inicio-component/Inicio.tsx";
import {Producto} from "../producto-component/Producto.tsx";
import {Movimiento} from "../movimiento-component/Movimiento.tsx";
import {useUserStore} from "../../Store/useUserStore.tsx";
import {useNavigationStore} from "../../Store/useNavigationStore.tsx";

export function ProtectedRouterApp() {
  const {connectedUser} = useUserStore();
  const {breadcrumbs,iconBreadcrumbs} = useNavigationStore();

  return (
    <>
      <div className='flex justify-content-between align-items-center flex-row border-bottom-1 p-2'>
        <div className='flex align-items-start gap-2 text-white'>
          <i className={iconBreadcrumbs}></i>{breadcrumbs}
        </div>
        <div className='flex flex-column justify-content-start align-items-start'>
          <span className='text-3xl font-bold text-white'>{connectedUser.nombre + ' ' + connectedUser.apellido}</span>
          <span className='text-white'>Bienvenid@ a Deppo</span>
        </div>
      </div>
      <div className='flex justify-between gap-4 mt-4'>
        <RouteView/>
        <Routes>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/producto" element={<Producto/>}/>
          <Route path="/movimiento" element={<Movimiento/>}/>
          </Routes>
        </div>
    </>
  )
}