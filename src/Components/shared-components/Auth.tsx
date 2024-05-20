import {useUserStore} from "../../Store/useUserStore.tsx";
import {Navigate} from "react-router-dom";


export function Auth(props : {children:any}) {
  const user = useUserStore();
  if(!user.connectedUser.nombre) return <Navigate to="/login" />
  return (<>{props.children}</>)
}