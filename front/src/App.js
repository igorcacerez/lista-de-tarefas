import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {Cadastro} from "./pages/cadastro/Cadastro";
import {Dashboard} from "./pages/auth/dashboard/Dashboard";
import {UsuarioProvider} from "./context/UsuarioContext";
import {LayoutProvider} from "./context/LayoutContext";
import {RotaPrivada} from "./middleware/RotaPrivada";

function App() {
  return (
    <UsuarioProvider>
        <LayoutProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RotaPrivada component={Dashboard} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Routes>
            </BrowserRouter>
        </LayoutProvider>
    </UsuarioProvider>
  );
}

export default App;
