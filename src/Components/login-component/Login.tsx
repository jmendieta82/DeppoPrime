import {useUserStore} from "../../Store/useUserStore.tsx";
import {useNavigate} from "react-router-dom";
import {User} from "../../Models/User.ts";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

export function Login() {
  const {setUser} = useUserStore();
  const navigate = useNavigate()

  const login = () =>{
    let user:User = {
      nombre:'Javier',
      apellido:'Mendieta',
      rol:'Administrador',
      icon:'fa-solid fa-user-tie',
    }
    setUser(user)
    navigate('/inicio')
  }
  return (
    <>
      <Card>

        <Button color='warning' onClick={login} label='Login'/>
      </Card>
    </>
  );
}