import {PanelMenu} from "primereact/panelmenu";
import {MenuItem} from "primereact/menuitem";
import {useNavigationStore} from "../../Store/useNavigationStore.tsx";
import {useNavigate} from "react-router-dom";

export function RouteView() {
  const {setBreadcrumbs,setIconBreadcrumbs} = useNavigationStore();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-home',
      command: () => {
        navigate('/inicio');
        setBreadcrumbs('Inicio');
        setIconBreadcrumbs('fa-solid fa-home');
      }
    },
    {
      label: 'Inventario',
      icon: 'fa-solid fa-list',
      items: [
        {
          label: 'Productos',
          icon: 'fa-solid fa-boxes-stacked',
          command: () => {
            navigate('/producto');
            setBreadcrumbs('Productos')
            setIconBreadcrumbs('fa-solid fa-boxes-stacked');
          }
        },
        {
          label: 'Movimientos',
          icon: 'fa-solid fa-dolly',
          command: () => {
            navigate('/movimiento');
            setBreadcrumbs('Movimientos');
            setIconBreadcrumbs('fa-solid fa-dolly');
          }
        },
      ]
    },
    {
      label: 'Configuracion',
      icon: 'fa-solid fa-gear',
      items: [
        {
          label: 'Proveedor',
          icon: 'fa-solid fa-user-tie',
          command: () => {
            navigate('/inicio');
            setBreadcrumbs('Movimientos')
          }
        },
        {
          label: 'Unidades de medida',
          icon: 'fa-solid fa-ruler-combined',
          command: () => {
            navigate('/inicio');
            setBreadcrumbs('Movimientos')
          }
        },
        {
          label: 'Empresa',
          icon: 'fa-solid fa-store'
        }
      ]
    }
  ];
  return (
    <PanelMenu model={items} className="w-full md:w-20rem" />
  );
}