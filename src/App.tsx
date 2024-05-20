import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../node_modules/primeflex/primeflex.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth} from "./Components/shared-components/Auth.tsx";
import {ProtectedRouterApp} from "./Components/router-component/ProtectedRouterApp.tsx";
import {Login} from "./Components/login-component/Login.tsx";
import {Error} from "./Components/shared-components/Error.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Auth><ProtectedRouterApp/></Auth>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
