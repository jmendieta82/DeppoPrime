import {useNavigate} from "react-router-dom";
import {useNavigationStore} from "../../Store/useNavigationStore.tsx";
export function MenuItem({ruta,titulo,icon} : any) {
  const {setBreadcrumbs} = useNavigationStore();
  const navigate = useNavigate();
  return (
    <>
      <span
        className='p-4 rounded-l-lg transition ease delay-150 cursor-pointer
        hover:bg-gradient-to-r from-pink-500 via-purple-500 to-purple-500 duration-300 '
        onClick={() => {
          navigate(ruta)
          setBreadcrumbs(titulo)
        }}><i className={"mr-3 fa-solid "+ icon}></i>{titulo}</span>
    </>
  );
}